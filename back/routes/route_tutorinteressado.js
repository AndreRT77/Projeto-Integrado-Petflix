/*********************************************************************************************** 
* Objetivo: Arquivo responsável por definir as rotas da API para a entidade tutor
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

// Import da controller que lida com as regras de negócio para tutores
const tutorController = require('../controller/tutorController.js')

// EndPoints para a rota de tutor

// Retorna todos os tutores do banco de dados
router.get('/v1/petflix/tutor', cors(), async function (request, response) {
    // Chama a função para listar os tutores do banco de dados
    let dadosTutor = await tutorController.listartutores()

    response.status(dadosTutor.status_code)
    response.json(dadosTutor)
})

// Retorna um tutor filtrando pelo seu ID
router.get('/v1/petflix/tutor/:id', cors(), async function (request, response) {
    // Recebe o ID encaminhado via parâmetro na requisição
    let idTutor = request.params.id

    // Chama a função para buscar o tutor pelo ID
    let dadosTutor = await tutorController.buscartutorId(idTutor)

    response.status(dadosTutor.status_code)
    response.json(dadosTutor)
})

// Insere um novo tutor no banco de dados
router.post('/v1/petflix/tutor', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body (corpo) da requisição
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para inserir um novo tutor
    let dadosTutor = await tutorController.inserirtutor(dadosBody, contentType)

    response.status(dadosTutor.status_code)
    response.json(dadosTutor)
})

// Atualiza um tutor existente no banco de dados
router.put('/v1/petflix/tutor/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o id do tutor
    let idTutor = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar o tutor, e encaminha os dados, o id e o contentType
    let dadosTutor = await controller_tutor.atualizartutor(dadosBody, idTutor, contentType)

    response.status(dadosTutor.status_code)
    response.json(dadosTutor)
})

// Deleta um tutor existente no banco de dados
router.delete('/v1/petflix/tutor/:id', cors(), async function (request, response) {
    // Recebe o id do tutor
    let idTutor = request.params.id

    // Chama a função para deletar o tutor
    let dadosTutor = await tutorController.excluirtutor(idTutor)

    response.status(dadosTutor.status_code)
    response.json(dadosTutor)
})

module.exports = router