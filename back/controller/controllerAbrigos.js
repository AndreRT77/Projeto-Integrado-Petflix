/*********************************************************************************************** 
* Objetivo: Arquivo responsável por orquestrar as requisições da API para os abrigos
* Data: 09/12/2025
* Autor: João Pedro Teodoro Nunes Correia
* Versão: 1.0
************************************************************************************************/

// Import do arquivo de mensagens
const message = require('../utils/messages.js')

// Função para listar todos os Abrigos
const listarAbrigos = async function() {
    // Lógica da aplicação para listar Abrigos
    // Simulação de retorno de dados
    let dadosAbrigosJSON = {}
    dadosAbrigosJSON.status_code = 200
    dadosAbrigosJSON.Abrigoss = [] // Retorna um array vazio por enquanto
    return dadosAbrigosJSON
}

// Função para buscar um Abrigos pelo ID
const buscarAbrigosId = async function(id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        // Simulação de retorno de dados
        let dadosAbrigosJSON = {}
        dadosAbrigosJSON.status_code = 200
        dadosAbrigosJSON.Abrigos = { id: id, nome: "Abrigos Exemplo" } // Retorna um objeto de exemplo
        return dadosAbrigosJSON
    }
}

// Função para inserir um novo Abrigos
const inserirAbrigos = async function(dadosBody, contentType) {
    // Simulação de retorno
    return message.SUCCESS_CREATED_ITEM
}

// Função para atualizar um Abrigos existente
const atualizarAbrigos = async function(dadosBody, id, contentType) {
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        // Simulação de retorno
        return message.SUCCESS_UPDATED_ITEM
    }
}

// Função para excluir um Abrigos existente
const excluirAbrigos = async function(id) {
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        // Simulação de retorno
        return message.SUCCESS_DELETED_ITEM
    }
}

module.exports = {
    listarAbrigos,
    buscarAbrigosId,
    inserirAbrigos,
    atualizarAbrigos,
    excluirAbrigos
}