import { Router} from "express"
import { PagamentoController} from "../controllers/pagamentoController"
import { PerfilController} from "../controllers/perfilController"
import { UsuarioController} from "../controllers/usuarioController"


const router = Router()
const controllerPagamento = new PagamentoController()
const controllerPerfil = new PerfilController()
const controllerUsuario = new UsuarioController()

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

// Rota Read All
router.get("/usuario", controllerUsuario.readAllUsuario) 
// Rota Read One
router.get("/usuario/:id",controllerUsuario.readOneUsuario)

router.post("/usuario", controllerUsuario.createUsuario)
//
router.put("usuario/:id", controllerUsuario.updateUsuario)

router.delete("/usuario/:id" , controllerUsuario.deleteUsuario)

