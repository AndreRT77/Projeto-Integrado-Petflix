/*********************************************************************************************** 
* Objetivo: Arquivo responsável por definir as rotas da API para a entidade Pet
* Data: 06/12/2025
* Autor: João Pedro Teodoro Nunes Correia
* Versão: 1.0
************************************************************************************************/

const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')

//Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

// Import da controller que lida com as regras de negócio para Pets
const controller_pet = require('../controller/controller_pet.js')


// EndPoints para a rota de Pet

// Retorna todos os pets do banco de dados
router.get('/v1/petflix/pet', cors(), async function (request, response) {
    // Chama a função para listar os pets do banco de dados
    let dadosPet = await controller_pet.listarPets()

    response.status(dadosPet.status_code)
    response.json(dadosPet)
})

// Retorna um pet filtrando pelo seu ID
router.get('/v1/petflix/pet/:id', cors(), async function (request, response) {
    // Recebe o ID encaminhado via parâmetro na requisição
    let idPet = request.params.id

    // Chama a função para buscar o pet pelo ID
    let dadosPet = await controller_pet.buscarPetId(idPet)

    response.status(dadosPet.status_code)
    response.json(dadosPet)
})

// Insere um novo pet no banco de dados
router.post('/v1/petflix/pet', cors(), bodyParserJSON, async function (request, response) {
    // Recebe os dados do body (corpo) da requisição
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para inserir um novo pet
    let dadosPet = await controller_pet.inserirPet(dadosBody, contentType)

    response.status(dadosPet.status_code)
    response.json(dadosPet)
})

// Atualiza um pet existente no banco de dados
router.put('/v1/petflix/pet/:id', cors(), bodyParserJSON, async function (request, response) {
    // Recebe o id do pet
    let idPet = request.params.id

    // Recebe os dados a serem atualizados
    let dadosBody = request.body

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Chama a função para atualizar o pet, e encaminha os dados, o id e o contentType
    let dadosPet = await controller_pet.atualizarPet(dadosBody, idPet, contentType)

    response.status(dadosPet.status_code)
    response.json(dadosPet)
})

// Deleta um pet existente no banco de dados
router.delete('/v1/petflix/pet/:id', cors(), async function (request, response) {
    // Recebe o id do pet
    let idPet = request.params.id

    // Chama a função para deletar o pet
    let dadosPet = await controller_pet.excluirPet(idPet)

    response.status(dadosPet.status_code)
    response.json(dadosPet)
})

module.exports = router