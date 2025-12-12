/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a model para o CRUD de Responsaveis
 * Data:12/12/2025
 * Autor: João Pedro Teodoro Nunes Correias
 * Versão: 1.0
 *******************************************************************************************/

// Import da model do DAO de Responsavel
const responsavelDAO = require('../model/responsavelPet.js');

// Import do arquivo de mensagens
const MESSAGES = require('../module/config_messages.js');

// Retorna uma lista de todos os Responsaveis
const listarResponsaveis = async function () {
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER));
    try {
        let resultResponsaveis = await responsavelDAO.getSelectAllResponsaveis();
        if (resultResponsaveis && resultResponsaveis.length > 0) {
            response.status = MESSAGES.SUCCESS_REQUEST.status;
            response.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
            response.items.responsaveis = resultResponsaveis;
            return response;
        } else {
            return MESSAGES.ERROR_NOT_FOUND;
        }
    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

//buscar responsavel por seu ID
const buscarResponsavelID = async function (id) {

    //cria um objeto de resposta padronizado
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))

    try {
        
        if (!isNaN(id) && id != '' && id != null && id > 0) {

            let resultResponsavel = await responsavelDAO.selectByIdResponsavel(Number(id))

            if (resultResponsavel && resultResponsavel.length > 0) {
                response.status = MESSAGES.SUCCESS_REQUEST.status
                response.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                response.items.responsavel = resultResponsavel
                return response
            } else {
                return MESSAGES.ERROR_NOT_FOUND // 404
            }

        } else {

            let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_INVALID_ID))
            error.message += '[ID do responsável inválido]'
            return error //400

        }

    } catch (error) {
        
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500

    }



}

// Validação dos dados de cadastro e atualização do Responsavel
const validarDadosResponsavel = async function (dadosResponsavel) {
    let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS));
    let hasError = false;

    if (!dadosResponsavel.nome || dadosResponsavel.nome.length > 100) {
        error.message += '[Nome incorreto]';
        hasError = true;
    }
    if (!dadosResponsavel.email || dadosResponsavel.email.length > 255) {
        error.message += '[Email incorreto]';
        hasError = true;
    }
    if (!dadosResponsavel.telefone || dadosResponsavel.telefone.length > 20) {
        error.message += '[Telefone incorreto]';
        hasError = true;
    }

    if (hasError) {
        return error;
    } else {
        return false;
    }
};

module.exports = {
    listarResponsaveis,
    buscarResponsavelID
};