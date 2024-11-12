import { Request, Response} from "express"
import { UsuarioService } from "../services/usuarioService" 

const service = new UsuarioService()


export class UsuarioController {
    async createUsuario (req: Request, res: Response) {
        // Captura informações do formulário
        const { matricula, perfil_id} = req.body
        // tudo que esta vindo esta vindo pelo body // e o que estive pela URL e parâmetro
        const result =  await service.createUsuario({matricula, perfil_id})
    if (result instanceof Error) {
        // Retorna a mensagem de erro
        return res.status(500).json(result.message)
    }
    // Do contrario, se for uma nova Usuario, retorne-a para o usúario
    return res.status(204).json(result)
    }

    async readAllUsuario (req: Request, res: Response) {
       const result = await service.readAllUsuario ()
       if (result instanceof Error) {
        return res.status(500).json (result.message)
       }
       //Se a lista estiver vazia
        if (result.length == 0) {
            // Mostre a seguinte mensagem para usuario
            return res.status(200).json("No pagamentos found")
        }
        // Do contrario, devolva a lista para o usuario
        return res.status(200).json(result)
    }
    async readOneUsuario (req: Request, res: Response) {
        const {id} = req.params
        const result = await service.readOneUsuario({id})
        if (result instanceof Error) {
            res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }
    async updateUsuario (req: Request, res: Response) {
        const {id} = req.params
        const { valortotal, meiopagamento} = req.body
        const result = await service.updateUsuario({id})
        if (result instanceof Error) {
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }

    async deleteUsuario (req: Request, res: Response) {
        const {id} = req.params
        const result = await service.deleteUsuario({ id})
        if (result instanceof Error) {
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }

}