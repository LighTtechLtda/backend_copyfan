import { DevDataSource } from "../connections/dbDev";
import { Pagamento } from "../models/pagamento";
import { Timestamp } from "typeorm"

// 1) Estabele conexão com a tabela alvo no banco de dados através de um cursos. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação.
// essas consultas são feitas na tabela do Repository que esta na conexão do DataSource.

const cursor = DevDataSource.getRepository(Pagamento)

// 2)  Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá dp FRONTEND

type newPagamentoRequest = {
    valortotal: number
    meiopagamento: string,
    
}

type findPagamentoRequest = {
    id: string
}

type updatePagamentoRequest = {
    id: string
}

export class PagamentoService {
    async createPagamento ({meiopagamento, valortotal}: newPagamentoRequest) : Promise< Pagamento | Error> {
       try {
        // Insert into pagamentos VALUES( meiopagamento, valorTotal)
        const  pagamento = cursor.create({
            meiopagamento, valortotal
       
        })
        //A função cursor.save() executa a instrução INSERT na tabela
        await cursor.save(pagamento)
        return pagamento
    }

     catch(err){
        return new Error("Unexpected error saving pagamento") 

      }
     }
    
    async readOnePagamento ({id}: findPagamentoRequest) : Promise <Pagamento | Error> {
        try {
            //SELECT * From pagamento where id = id LIMIT 1
            const pagamento = await cursor.findOne({ where : {id}})
            if (!pagamento) {
             return new Error("Pagamento not Found!")
         }
         return pagamento 
        }
        catch(err) {
            return new Error ("Unexpected error reading pagamento!")
        }
    
    }
    
    async readAllPagamento (): Promise <Pagamento[] | Error> {
        try {
            console.log("passei aqui")
        // SELECT * FROM pagamentos ( Ele acha a tabela)
        const pagamentos = await cursor.find()
        console.log("passei aqui 2")
        if (!pagamentos){
            console.log("vazio")
        }
        console.log(pagamentos)
        return pagamentos

    }
    catch(err){
        return new Error("Unexpected error reading pagamento!")
      }
    }
    
    
    async updatePagamento ({id }: updatePagamentoRequest) : Promise <Pagamento | Error> {
        try {
            // SELECT * FROM pagamentos WHERE id = id LIMIT 1
        const pagamento = await cursor.findOne({ where : {id}})
        if (!pagamento) {
            return new Error("Pagamento not Found!")
        }
         // Se houver uma nova descrição e/ou data informadors pelo usuario vindos da requisição    
        // UPDATE pagamentos WHERE ID = id set description = description, date_pagamento = date_pagamento
        await cursor.save(pagamento)
        return pagamento
    
    }
    catch(err) {
        return new  Error("Unexpected error reading pagamento!")
     }
    }
      


    async  deletePagamento ({id}: findPagamentoRequest): Promise <String | Error > {
        try{
       //SELECT * FROM Pagamento WHERE id = id LIMIT 1
        const pagamento = await cursor.findOne({ where : {id}})
        if (!pagamento) {
            return new Error("Pagamento not Found!")
        }
    await cursor.delete(pagamento.id)
    return "Pagamento removed successfully"
    }
    catch (err) {
        return new Error ("Unexpected error reading pagamento!")
    }
 }
}


// Operador Ternario
// if (x % 2 == 0) {
// console.log ("par")
//}
// else {
//} 
//(x % 2 == 0) ? console.log("par" : console.log ("impar"))