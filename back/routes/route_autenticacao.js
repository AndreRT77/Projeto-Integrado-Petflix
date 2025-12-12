/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas rotas da API de autenticação
 * Data: 11/12/2025
 * Autor: João Pedro Teodoro Nunes Correia
 * Versão: 1.0
 *******************************************************************************************/

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

//Cria um objeto no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

//import do controller da autenticação
const controllerAutenticacao = require('../controller/autenticacaoController.js')

// Endpoint para realizar login
router.post('/v1/petflix/login', bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDadosLogin = await controllerAutenticacao.login(dadosBody, contentType)

    response.status(resultDadosLogin.status_code)
    response.json(resultDadosLogin)
})

module.exports = router