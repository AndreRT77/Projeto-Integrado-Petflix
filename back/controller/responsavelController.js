/********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados para realizar o CRUD de responsáveis
 * Data: 05/12/2025
 * Nome: João Pedro Teodoro Nunes Correia
 * Versão 1.0:
 *******************************************************************************************/

//import da model do dao do responsavel do pet
const responsavelPetDAO = require('../model/DAO/responsavelPet.js')

//Import dos arquivos de mensagens
const MESSAGES = require('../modulo/messages')

//Função que retorna uma lista de todos os responsáveis cadastrados no BD
const listarResponsaveis = async function () {
    //chama a função do DAO para retornar a lista de responsáveis no BD
    let resultResponsaveis = await responsavelPetDAO.getSelectAllResponsaveis()

    //criando um objeto para as mensagens
    let responsaveisMESSAGES = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))

    try {
        if (resultResponsaveis){
            if (resultResponsaveis.length > 0) {
                responsaveisMESSAGES.status = MESSAGES.SUCCESS_REQUEST.status
                responsaveisMESSAGES.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                responsaveisMESSAGES.items.responsaveis = resultResponsaveis
                return responsaveisMESSAGES // 200
            } else {
                return MESSAGES.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//buscando responsavel pesquisando por ID
const buscarResponsavelPorID = async function (id) {
    let responsavelMESSAGES = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))

    try {

        //Validação do id
        if (!isNaN(id) && id != '' && id != null && id > 0){
            let resultResponsavel = await responsavelPetDAO.selectByIdResponsavel(Number(id))

            if (resultResponsavel){
                if (resultResponsavel.length > 0){
                    responsavelMESSAGES.status = MESSAGES.SUCCESS_REQUEST.status
                    responsavelMESSAGES.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    responsavelMESSAGES.items.responsavel = resultResponsavel

                    return responsavelMESSAGES //200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS))
            error.message += ' [ID Inválido]'
            return error //400
        }
    } catch (error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função que insere um responsável
const inserirResponsavel = async function (dadosResponsavel, contentType) {
    //criando um objeto para as mensagens
    let responsavelMESSAGES = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validar = await validarDadosResponsavel(dadosResponsavel)

            if(!validar){
                //Processamento
                //chama a função do DAO para inserir o responsavel no BD
                let resultDadosResponsavel = await responsavelPetDAO.setInsertResponsavel(dadosResponsavel)

                if (resultDadosResponsavel){
                    //chama a função para retornar o último ID inserido no BD
                    let lastID = await responsavelPetDAO.selectLastID()

                    if (lastID){
                        dadosResponsavel.id = lastID
                        responsavelMESSAGES.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        responsavelMESSAGES.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        responsavelMESSAGES.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        responsavelMESSAGES.items.responsavel = dadosResponsavel

                        return responsavelMESSAGES //201

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                return validar //400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função para atualizar um responsável
const atualizarResponsavel = async function (dadosResponsavel, id, contentType) {
    let responsavelMESSAGES = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            if (!isNaN(id) && id != '' && id != null && id > 0){
                let validar = await validarDadosResponsavel(dadosResponsavel)

                if(!validar){
                    dadosResponsavel.id_responsavel_pet = id
                    //chama a função do DAO para atualizar o responsavel no BD
                    let resultDadosResponsavel = await responsavelPetDAO.setUpdateResponsavel(dadosResponsavel)

                    if (resultDadosResponsavel){
                        responsavelMESSAGES.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        responsavelMESSAGES.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        responsavelMESSAGES.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        responsavelMESSAGES.items.responsavel = dadosResponsavel

                        return responsavelMESSAGES //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validar //400
                }
            } else {
                let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS))
                error.message += ' [ID Inválido]'
                return error //400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função responsável por excluir um responsável
const deletarResponsavel = async function(id){
    let responsavelMESSAGES = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            //Verifica se o responsável existe antes de deletar
            let buscaResponsavel = await buscarResponsavelPorID(id)
            if(buscaResponsavel.status_code == 404){
                return buscaResponsavel // Retorna 404 se não encontrar
            }

            let result = await responsavelPetDAO.setDeleteResponsavel(Number(id))

            if (result) {
                return MESSAGES.SUCCESS_DELETED_ITEM // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS))
            error.message += ' [ID Inválido]'
            return error // 400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Função que valida os dados de um responsável
const validarDadosResponsavel = async function(dadosResponsavel){
    let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS))
    let message = ' [Campos inválidos:'
    let hasError = false

    if (!dadosResponsavel.nome || dadosResponsavel.nome.length > 100) { 
        message += ' nome'
        hasError = true
    }
    if (!dadosResponsavel.cpf || dadosResponsavel.cpf.length > 14) { 
        message += ' cpf'
        hasError = true
    }
    if (!dadosResponsavel.contato || dadosResponsavel.contato.length > 15) { 
        message += ' contato'
        hasError = true
    }
    if (!dadosResponsavel.email || dadosResponsavel.email.length > 255) { 
        message += ' email'
        hasError = true
    }
    
    if (hasError) {
        error.message += message + ']'
        return error
    }
    return false
}

module.exports = {
    listarResponsaveis,
    buscarResponsavelPorID,
    inserirResponsavel,
    atualizarResponsavel,
    deletarResponsavel
}