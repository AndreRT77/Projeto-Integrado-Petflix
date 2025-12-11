/*********************************************************************************************** 
* Objetivo: Arquivo responsável por definir as rotas da API para a entidade ong
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

// Import da controller que lida com as regras de negócio para ongs
const ongController = require('../controller/ongController.js')

// EndPoints para a rota de ong

// Retorna todos os ongs do banco de dados
router.get('/v1/petflix/ong', cors(), async function (request, response) {
    // Chama a função para listar os ongs do banco de dados
    let dadosong = await ongController.listarongs()

    response.status(dadosong.status_code)
    response.json(dadosong)
})

// Retorna um ong filtrando pelo seu ID
router.get('/v1/petflix/ong/:id', cors(), async function (request, response) {
    // Recebe o ID encaminhado via parâmetro na requisição
    let idOng = request.params.id

    // Chama a função para buscar o ong pelo ID
    let dadosong = await ongController.buscarongId(idOng)

    response.status(dadosong.status_code)
    response.json(dadosong)
})

// Insere um novo ong no banco de dados
router.post('/v1/petflix/ong', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body (corpo) da requisição
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para inserir um novo ong
    let dadosong = await ongController.inserirong(dadosBody, contentType)

    response.status(dadosong.status_code)
    response.json(dadosong)
})

// Atualiza um ong existente no banco de dados
router.put('/v1/petflix/ong/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o id do ong
    let idOng = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar o ong, e encaminha os dados, o id e o contentType
    let dadosong = await controller_ong.atualizarong(dadosBody, idOng, contentType)

    response.status(dadosong.status_code)
    response.json(dadosong)
})

// Deleta um ong existente no banco de dados
router.delete('/v1/petflix/ong/:id', cors(), async function (request, response) {
    // Recebe o id do ong
    let idOng = request.params.id

    // Chama a função para deletar o ong
    let dadosong = await ongController.excluirOng(idOng)

    response.status(dadosong.status_code)
    response.json(dadosong)
})

module.exports = router