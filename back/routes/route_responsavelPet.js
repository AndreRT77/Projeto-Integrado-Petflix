/*********************************************************************************************** 
* Objetivo: Arquivo responsável por definir as rotas da API para a entidade responsavel
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

// Import da controller que lida com as regras de negócio para responsaveis
const responsavelController = require('../controller/responsavelController.js')

// EndPoints para a rota de responsavel

// Retorna todos os responsaveis do banco de dados
router.get('/v1/petflix/responsavel', cors(), async function (request, response) {
    // Chama a função para listar os responsaveis do banco de dados
    let dadosResponsavel = await responsavelController.listarresponsaveis()

    response.status(dadosResponsavel.status_code)
    response.json(dadosResponsavel)
})

// Retorna um responsavel filtrando pelo seu ID
router.get('/v1/petflix/responsavel/:id', cors(), async function (request, response) {
    // Recebe o ID encaminhado via parâmetro na requisição
    let idResponsavel = request.params.id

    // Chama a função para buscar o responsavel pelo ID
    let dadosResponsavel = await responsavelController.buscarresponsavelId(idResponsavel)

    response.status(dadosResponsavel.status_code)
    response.json(dadosResponsavel)
})

// Insere um novo responsavel no banco de dados
router.post('/v1/petflix/responsavel', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body (corpo) da requisição
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para inserir um novo responsavel
    let dadosResponsavel = await responsavelController.inserirresponsavel(dadosBody, contentType)

    response.status(dadosResponsavel.status_code)
    response.json(dadosResponsavel)
})

// Atualiza um responsavel existente no banco de dados
router.put('/v1/petflix/responsavel/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o id do responsavel
    let idResponsavel = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar o responsavel, e encaminha os dados, o id e o contentType
    let dadosResponsavel = await controller_responsavel.atualizarresponsavel(dadosBody, idResponsavel, contentType)

    response.status(dadosResponsavel.status_code)
    response.json(dadosResponsavel)
})

// Deleta um responsavel existente no banco de dados
router.delete('/v1/petflix/responsavel/:id', cors(), async function (request, response) {
    // Recebe o id do responsavel
    let idResponsavel = request.params.id

    // Chama a função para deletar o responsavel
    let dadosResponsavel = await responsavelController.excluirresponsavel(idResponsavel)

    response.status(dadosResponsavel.status_code)
    response.json(dadosResponsavel)
})

module.exports = router