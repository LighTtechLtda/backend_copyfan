import { Request, Response} from "express"
import { PagamentoService } from "../services/pagamentoService"

const service = new PagamentoService()


export class PagamentoController {
    async createPagamento (req: Request, res: Response) {
        // Captura informações do formulário
        const { valortotal, meiopagamento } = req.body
        // tudo que esta vindo esta vindo pelo body // e o que estive pela URL e parâmetro
        const result =  await service.createPagamento({valortotal, meiopagamento})
    if (result instanceof Error) {
        // Retorna a mensagem de erro
        return res.status(500).json(result.message)
    }
    // Do contrario, se for uma nova Pagamento, retorne-a para o usúario
    return res.status(204).json(result)
    }

    async readAllPagamento (req: Request, res: Response) {
       const result = await service.readAllPagamento ()
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
    async readOnePagamento (req: Request, res: Response) {
        const {id} = req.params
        const result = await service.readOnePagamento({id})
        if (result instanceof Error) {
            res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }
    async updatePagamento (req: Request, res: Response) {
        const {id} = req.params
        const { valortotal, meiopagamento} = req.body
        const result = await service.updatePagamento({id})
        if (result instanceof Error) {
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }

    async deletePagamento (req: Request, res: Response) {
        const {id} = req.params
        const result = await service.deletePagamento({ id})
        if (result instanceof Error) {
            return res.status(404).json(result.message)
        }
        return res.status(200).json(result)
    }

}