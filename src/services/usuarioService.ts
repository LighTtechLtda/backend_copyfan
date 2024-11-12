import { DevDataSource } from "../connections/dbDev";
import { Usuario }  from "../models/usuario"

// 1) Estabele conexão com a tabela alvo no banco de dados através de um cursos. Um cursor é um objeto que permite fazer consultas ao banco de dados via aplicação.
// essas consultas são feitas na tabela do Repository que esta na conexão do DataSource.

const cursor = DevDataSource.getRepository(Usuario)

// 2)  Cria interfaces para receber dados do CONTROLLER, que por sua vez vieram da Requisição HTTP lá dp FRONTEND

type newUsuarioRequest = {
    matricula: string
    perfil_id: string
}

type findUsuarioRequest = {
    id: string
}

type updateUsuarioRequest = {
    id: string
}

export class UsuarioService {
    async createUsuario ({matricula, perfil_id}: newUsuarioRequest) : Promise< Usuario | Error> {
       try {
        // Insert into perfils VALUES( meioperfil, valorTotal)
        const  perfil = cursor.create({
            matricula, perfil_id
       
        })
        //A função cursor.save() executa a instrução INSERT na tabela
        await cursor.save(perfil)
        return perfil
    }

     catch(err){
        return new Error("Unexpected error saving perfil") 

      }
     }
    
    async readOneUsuario ({id}: findUsuarioRequest) : Promise <Usuario | Error> {
        try {
            //SELECT * From perfil where id = id LIMIT 1
            const perfil = await cursor.findOne({ where : {id}})
            if (!perfil) {
             return new Error("Usuario not Found!")
         }
         return perfil 
        }
        catch(err) {
            return new Error ("Unexpected error reading perfil!")
        }
    
    }
    
    async readAllUsuario (): Promise <Usuario[] | Error> {
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
    
    
    async updateUsuario ({id }: updateUsuarioRequest) : Promise <Usuario | Error> {
        try {
            // SELECT * FROM perfils WHERE id = id LIMIT 1
        const perfil = await cursor.findOne({ where : {id}})
        if (!perfil) {
            return new Error("Usuario not Found!")
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
      


    async  deleteUsuario ({id}: findUsuarioRequest): Promise <String | Error > {
        try{
       //SELECT * FROM Usuario WHERE id = id LIMIT 1
        const perfil = await cursor.findOne({ where : {id}})
        if (!perfil) {
            return new Error("Usuario not Found!")
        }
    await cursor.delete(perfil.id)
    return "Usuario removed successfully"
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