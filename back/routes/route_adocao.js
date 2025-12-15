/*********************************************************************************************** 
* Objetivo: Arquivo responsável por definir as rotas da API para a entidade adocao
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

// Import da controller que lida com as regras de negócio para adoções
const adocaoController = require('../controller/adocaoController.js')

// EndPoints para a rota de adocao

// Retorna todos os adoções do banco de dados
router.get('/v1/petflix/adocao', cors(), async function (request, response) {
    // Chama a função para listar os adoções do banco de dados
    let dadosAdocao = await adocaoController.listaradoções()

    response.status(dadosAdocao.status_code)
    response.json(dadosAdocao)
})

// Retorna um adocao filtrando pelo seu ID
router.get('/v1/petflix/adocao/:id', cors(), async function (request, response) {
    // Recebe o ID encaminhado via parâmetro na requisição
    let idAdocao = request.params.id

    // Chama a função para buscar o adocao pelo ID
    let dadosAdocao = await adocaoController.buscaradocaoId(idAdocao)

    response.status(dadosAdocao.status_code)
    response.json(dadosAdocao)
})

// Insere um novo adocao no banco de dados
router.post('/v1/petflix/adocao', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body (corpo) da requisição
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para inserir um novo adocao
    let dadosAdocao = await adocaoController.inseriradocao(dadosBody, contentType)

    response.status(dadosAdocao.status_code)
    response.json(dadosAdocao)
})

// Atualiza um adocao existente no banco de dados
router.put('/v1/petflix/adocao/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o id do adocao
    let idAdocao = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar o adocao, e encaminha os dados, o id e o contentType
    let dadosAdocao = await controller_adocao.atualizaradocao(dadosBody, idAdocao, contentType)

    response.status(dadosAdocao.status_code)
    response.json(dadosAdocao)
})

// Deleta um adocao existente no banco de dados
router.delete('/v1/petflix/adocao/:id', cors(), async function (request, response) {
    // Recebe o id do adocao
    let idAdocao = request.params.id

    // Chama a função para deletar o adocao
    let dadosAdocao = await adocaoController.excluiradocao(idAdocao)

    response.status(dadosAdocao.status_code)
    response.json(dadosAdocao)
})

module.exports = router