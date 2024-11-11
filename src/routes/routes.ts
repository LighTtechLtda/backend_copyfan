import { Router} from "express"
import { PagamentoController} from "../controllers/pagamentoController"
import { PerfilController} from "../controllers/perfilController"

const router = Router()
const controllerPagamento = new PagamentoController()
const controllerPerfil = new PerfilController()

router.get("/", (request, response) => {
    response.json("home page")
})

// Rota Read All
router.get("/pagamento", controllerPagamento.readAllPagamento) 
// Rota Read One
router.get("/pagamento/:id",controllerPagamento.readOnePagamento)

router.post("/pagamento", controllerPagamento.createPagamento)
//
router.put("pagamento/:id", controllerPagamento.updatePagamento)

router.delete("/pagamento/:id" , controllerPagamento.deletePagamento)

// Rota Read All
router.get("/perfil", controllerPerfil.readAllPerfil) 
// Rota Read One
router.get("/perfil/:id",controllerPerfil.readOnePerfil)

router.post("/perfil", controllerPerfil.createPerfil)
//
router.put("perfil/:id", controllerPerfil.updatePerfil)

router.delete("/perfil/:id" , controllerPerfil.deletePerfil)


export default router