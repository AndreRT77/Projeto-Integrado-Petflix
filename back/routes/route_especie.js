/*********************************************************************************************** 
* Objetivo: Arquivo responsável por definir as rotas da API para a entidade especie
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

// Import da controller que lida com as regras de negócio para especies
const especieController = require('../controller/especieController.js')

// EndPoints para a rota de especie

// Retorna todos os especies do banco de dados
router.get('/v1/petflix/especie', cors(), async function (request, response) {
    // Chama a função para listar os especies do banco de dados
    let dadosEspecie = await especieController.listarespecies()

    response.status(dadosEspecie.status_code)
    response.json(dadosEspecie)
})

// Retorna um especie filtrando pelo seu ID
router.get('/v1/petflix/especie/:id', cors(), async function (request, response) {
    // Recebe o ID encaminhado via parâmetro na requisição
    let idEspecie = request.params.id

    // Chama a função para buscar o especie pelo ID
    let dadosEspecie = await especieController.buscarEspecieID(idEspecie)

    response.status(dadosEspecie.status_code)
    response.json(dadosEspecie)
})

// Insere um novo especie no banco de dados
router.post('/v1/petflix/especie', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body (corpo) da requisição
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para inserir um novo especie
    let dadosEspecie = await especieController.inserirEspecie(dadosBody, contentType)

    response.status(dadosEspecie.status_code)
    response.json(dadosEspecie)

    
})

// Atualiza um especie existente no banco de dados
router.put('/v1/petflix/especie/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o id do especie
    let idEspecie = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar o especie, e encaminha os dados, o id e o contentType
    let dadosEspecie = await especieController.atualizarEspecie(dadosBody, idEspecie, contentType)

    response.status(dadosEspecie.status_code)
    response.json(dadosEspecie)
})

// Deleta um especie existente no banco de dados
router.delete('/v1/petflix/especie/:id', cors(), async function (request, response) {
    // Recebe o id do especie
    let idEspecie = request.params.id

    // Chama a função para deletar o especie
    let dadosEspecie = await especieController.excluirEspecie(idEspecie)

    response.status(dadosEspecie.status_code)
    response.json(dadosEspecie)
})

module.exports = router