import { Request, Response} from "express"
import { PerfilService } from "../services/perfilService" 

const service = new PerfilService()


export class PerfilController {
    async createPerfil (req: Request, res: Response) {
        // Captura informações do formulário
        const { descricao, criar_usuario, excluir_usuario, ler_boolean } = req.body
        // tudo que esta vindo esta vindo pelo body // e o que estive pela URL e parâmetro
        const result =  await service.createPerfil({descricao, criar_usuario, excluir_usuario, ler_boolean})
    if (result instanceof Error) {
        // Retorna a mensagem de erro
        return res.status(500).json(result.message)
    }
    // Do contrario, se for uma nova Perfil, retorne-a para o usúario
    return res.status(204).json(result)
    }

    async readAllPerfil (req: Request, res: Response) {
       const result = await service.readAllPerfil ()
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
    async readOnePerfil (req: Request, res: Response) {
        const {id} = req.params
        const result = await service.readOnePerfil({id})
        if (result instanceof Error) {
            res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }
    async updatePerfil (req: Request, res: Response) {
        const {id} = req.params
        const { valortotal, meiopagamento} = req.body
        const result = await service.updatePerfil({id})
        if (result instanceof Error) {
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }

    async deletePerfil (req: Request, res: Response) {
        const {id} = req.params
        const result = await service.deletePerfil({ id})
        if (result instanceof Error) {
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }

}