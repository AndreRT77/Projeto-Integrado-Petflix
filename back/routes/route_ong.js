/*********************************************************************************************** 
* Objetivo: Arquivo responsável por definir as rotas da API para a entidade Ong
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

// Import da controller que lida com as regras de negócio para Ongs
const ongController = require('../controller/ongController.js')

// EndPoints para a rota de Ong

// Retorna todos os Ongs do banco de dados
router.get('/v1/petflix/ong', cors(), async function (request, response) {
    // Chama a função para listar os Ongs do banco de dados
    let dadosOng = await ongController.listarOngs()

    response.status(dadosOng.status_code)
    response.json(dadosOng)
})

// Retorna um Ong filtrando pelo seu ID
router.get('/v1/petflix/ong/:id', cors(), async function (request, response) {
    // Recebe o ID encaminhado via parâmetro na requisição
    let idOng = request.params.id

    // Chama a função para buscar o Ong pelo ID
    let dadosOng = await ongController.buscarOngId(idOng)

    response.status(dadosOng.status_code)
    response.json(dadosOng)
})

// Insere um novo Ong no banco de dados
router.post('/v1/petflix/ong', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body (corpo) da requisição
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para inserir um novo Ong
    let dadosOng = await ongController.inserirOng(dadosBody, contentType)

    response.status(dadosOng.status_code)
    response.json(dadosOng)
})

// Atualiza um Ong existente no banco de dados
router.put('/v1/petflix/Ong/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o id do Ong
    let idOng = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar o Ong, e encaminha os dados, o id e o contentType
    let dadosOng = await controller_Ong.atualizarOng(dadosBody, idOng, contentType)

    response.status(dadosOng.status_code)
    response.json(dadosOng)
})

// Deleta um Ong existente no banco de dados
router.delete('/v1/petflix/ong/:id', cors(), async function (request, response) {
    // Recebe o id do Ong
    let idOng = request.params.id

    // Chama a função para deletar o Ong
    let dadosOng = await ongController.excluirOng(idOng)

    response.status(dadosOng.status_code)
    response.json(dadosOng)
})

module.exports = router