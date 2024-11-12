import { DevDataSource } from "../connections/dbDev";
import { Perfil } from "../models/perfil";

// 1) Estabele conexão com a tabela alvo no banco de dados através de um cursos. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação.
// essas consultas são feitas na tabela do Repository que esta na conexão do DataSource.

const cursor = DevDataSource.getRepository(Perfil)

// 2)  Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá dp FRONTEND

type newPerfilRequest = {
    descricao: string
    criar_usuario: boolean
    excluir_usuario: boolean
    ler_boolean: boolean
    
}

type findPerfilRequest = {
    id: string
}

type updatePerfilRequest = {
    id: string
}

export class PerfilService {
    async createPerfil ({descricao, criar_usuario, excluir_usuario, ler_boolean}: newPerfilRequest) : Promise< Perfil | Error> {
       try {
        // Insert into perfils VALUES( meioperfil, valorTotal)
        const  perfil = cursor.create({
            descricao, criar_usuario, excluir_usuario, ler_boolean
       
        })
        //A função cursor.save() executa a instrução INSERT na tabela
        await cursor.save(perfil)
        return perfil
    }

     catch(err){
        return new Error("Unexpected error saving perfil") 

      }
     }
    
    async readOnePerfil ({id}: findPerfilRequest) : Promise <Perfil | Error> {
        try {
            //SELECT * From perfil where id = id LIMIT 1
            const perfil = await cursor.findOne({ where : {id}})
            if (!perfil) {
             return new Error("Perfil not Found!")
         }
         return perfil 
        }
        catch(err) {
            return new Error ("Unexpected error reading perfil!")
        }
    
    }
    
    async readAllPerfil (): Promise <Perfil[] | Error> {
        try {
            console.log("passei aqui")
        // SELECT * FROM perfils ( Ele acha a tabela)
        const perfils = await cursor.find()
        console.log("passei aqui 2")
        if (!perfils){
            console.log("vazio")
        }
        console.log(perfils)
        return perfils

    }
    catch(err){
        return new Error("Unexpected error reading perfil!")
      }
    }
    
    
    async updatePerfil ({id }: updatePerfilRequest) : Promise <Perfil | Error> {
        try {
            // SELECT * FROM perfils WHERE id = id LIMIT 1
        const perfil = await cursor.findOne({ where : {id}})
        if (!perfil) {
            return new Error("Perfil not Found!")
        }
         // Se houver uma nova descrição e/ou data informadors pelo usuario vindos da requisição    
        // UPDATE perfils WHERE ID = id set description = description, date_perfil = date_perfil
        await cursor.save(perfil)
        return perfil
    
    }
    catch(err) {
        return new  Error("Unexpected error reading perfil!")
     }
    }
      


    async  deletePerfil ({id}: findPerfilRequest): Promise <String | Error > {
        try{
       //SELECT * FROM Perfil WHERE id = id LIMIT 1
        const perfil = await cursor.findOne({ where : {id}})
        if (!perfil) {
            return new Error("Perfil not Found!")
        }
    await cursor.delete(perfil.id)
    return "Perfil removed successfully"
    }
    catch (err) {
        return new Error ("Unexpected error reading perfil!")
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