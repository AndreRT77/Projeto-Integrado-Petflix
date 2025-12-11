/*********************************************************************************************** 
* Objetivo: Arquivo responsável por definir as rotas da API para a entidade raca
* Data: 06/12/2025
* Autor: André Roberto Tavares
* Versão: 1.0
************************************************************************************************/

const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')

//Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

// Import da controller que lida com as regras de negócio para racas
const racaController = require('../controller/racaController.js')

// EndPoints para a rota de raca

// Retorna todos os racas do banco de dados
router.get('/v1/petflix/raca', cors(), async function (request, response) {
    // Chama a função para listar os racas do banco de dados
    let dadosRaca = await racaController.listarRacas()

    response.status(dadosRaca.status_code)
    response.json(dadosraca)
})

// Retorna um raca filtrando pelo seu ID
router.get('/v1/petflix/raca/:id', cors(), async function (request, response) {
    // Recebe o ID encaminhado via parâmetro na requisição
    let idRaca = request.params.id

    // Chama a função para buscar o raca pelo ID
    let dadosRaca = await racaController.buscarRacaId(idRaca)

    response.status(dadosRaca.status_code)
    response.json(dadosRaca)
})

// Insere um novo raca no banco de dados
router.post('/v1/petflix/raca', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body (corpo) da requisição
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para inserir um novo raca
    let dadosRaca = await racaController.inserirRaca(dadosBody, contentType)

    response.status(dadosRaca.status_code)
    response.json(dadosRaca)
})

// Atualiza um raca existente no banco de dados
router.put('/v1/petflix/raca/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o id do raca
    let idRaca = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar o raca, e encaminha os dados, o id e o contentType
    let dadosRaca = await controller_raca.atualizarraca(dadosBody, idRaca, contentType)

    response.status(dadosRaca.status_code)
    response.json(dadosRaca)
})

// Deleta um raca existente no banco de dados
router.delete('/v1/petflix/raca/:id', cors(), async function (request, response) {
    // Recebe o id do raca
    let idRaca = request.params.id

    // Chama a função para deletar o raca
    let dadosRaca = await racaController.excluirRaca(idRaca)

    response.status(dadosRaca.status_code)
    response.json(dadosRaca)
})

module.exports = router