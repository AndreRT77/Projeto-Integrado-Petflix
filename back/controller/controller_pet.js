/*********************************************************************************************** 
* Objetivo: Arquivo responsável por orquestrar as requisições da API para a entidade Pet
* Data: 06/12/2025
* Autor: João Pedro Teodoro Nunes Correia
* Versão: 1.0
************************************************************************************************/

// Import do arquivo de mensagens
const message = require('../utils/messages.js')

// Função para listar todos os pets
const listarPets = async function() {
    // Lógica da aplicação para listar pets (será implementada aqui)
    // Simulação de retorno de dados
    let dadosPetJSON = {}
    dadosPetJSON.status_code = 200
    dadosPetJSON.pets = [] // Retorna um array vazio por enquanto
    return dadosPetJSON
}

// Função para buscar um pet pelo ID
const buscarPetId = async function(id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        // Simulação de retorno de dados
        let dadosPetJSON = {}
        dadosPetJSON.status_code = 200
        dadosPetJSON.pet = { id: id, nome: "Pet Exemplo" } // Retorna um objeto de exemplo
        return dadosPetJSON
    }
}

// Função para inserir um novo pet
const inserirPet = async function(dadosBody, contentType) {
    // Simulação de retorno
    return message.SUCCESS_CREATED_ITEM
}

// Função para atualizar um pet existente
const atualizarPet = async function(dadosBody, id, contentType) {
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        // Simulação de retorno
        return message.SUCCESS_UPDATED_ITEM
    }
}

// Função para excluir um pet existente
const excluirPet = async function(id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        // Simulação de retorno
        return message.SUCCESS_DELETED_ITEM
    }
}

module.exports = {
    listarPets,
    buscarPetId,
    inserirPet,
    atualizarPet,
    excluirPet
}