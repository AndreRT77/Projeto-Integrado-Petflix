/*********************************************************************************************** 
* Objetivo: Arquivo responsável por definir as rotas da API para a entidade abrigo
* Data: 11/12/2025
* Autor: André Roberto Tavares
* Versão: 1.0
************************************************************************************************/

const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')

//Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

// Import da controller que lida com as regras de negócio para abrigos
const abrigoController = require('../controller/abrigoController.js')

// EndPoints para a rota de abrigo

// Retorna todos os abrigos do banco de dados
router.get('/v1/petflix/abrigo', cors(), async function (request, response) {
    // Chama a função para listar os abrigos do banco de dados
    let dadosAbrigo = await abrigoController.listarabrigos()

    response.status(dadosAbrigo.status_code)
    response.json(dadosAbrigo)
})

// Retorna um abrigo filtrando pelo seu ID
router.get('/v1/petflix/abrigo/:id', cors(), async function (request, response) {
    // Recebe o ID encaminhado via parâmetro na requisição
    let idAbrigo = request.params.id

    // Chama a função para buscar o abrigo pelo ID
    let dadosAbrigo = await abrigoController.buscarabrigoId(idAbrigo)

    response.status(dadosAbrigo.status_code)
    response.json(dadosAbrigo)
})

// Insere um novo abrigo no banco de dados
router.post('/v1/petflix/abrigo', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body (corpo) da requisição
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para inserir um novo abrigo
    let dadosAbrigo = await abrigoController.inserirabrigo(dadosBody, contentType)

    response.status(dadosAbrigo.status_code)
    response.json(dadosAbrigo)
})

// Atualiza um abrigo existente no banco de dados
router.put('/v1/petflix/abrigo/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o id do abrigo
    let idAbrigo = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar o abrigo, e encaminha os dados, o id e o contentType
    let dadosAbrigo = await controller_abrigo.atualizarAbrigo(dadosBody, idAbrigo, contentType)

    response.status(dadosabrigo.status_code)
    response.json(dadosabrigo)
})

// Deleta um abrigo existente no banco de dados
router.delete('/v1/petflix/abrigo/:id', cors(), async function (request, response) {
    // Recebe o id do abrigo
    let idabrigo = request.params.id

    // Chama a função para deletar o abrigo
    let dadosAbrigo = await abrigoController.excluirAbrigo(idAbrigo)

    response.status(dadosAbrigo.status_code)
    response.json(dadosAbrigo)
})

module.exports = router