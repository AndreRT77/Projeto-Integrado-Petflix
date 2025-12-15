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
        
        if (id && !isNaN(id) && Number(id) > 0) {

            let resultResponsavel = await responsavelDAO.selectByIdResponsavel(Number(id))

            if (resultResponsavel && resultResponsavel.length > 0) {
                response.status = MESSAGES.SUCCESS_REQUEST.status
                response.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                response.items.responsavel = resultResponsavel[0]
                return response
            } else {
                return MESSAGES.ERROR_NOT_FOUND // 404
            }

        } else {

            let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS))
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

    if (!dadosResponsavel.nome || dadosResponsavel.nome.trim() === '' || dadosResponsavel.nome.length > 100) {
        error.message += '[Nome incorreto]';
        hasError = true;
    }
    if (!dadosResponsavel.cpf || dadosResponsavel.cpf.trim() === '' || dadosResponsavel.cpf.length > 20) {
        error.message += '[CPF incorreto]';
        hasError = true;
    }
    if (!dadosResponsavel.contato || dadosResponsavel.contato.trim() === '' || dadosResponsavel.contato.length > 20) {
        error.message += '[Contato incorreto]';
        hasError = true;
    }
    if (!dadosResponsavel.email || dadosResponsavel.email.trim() === '' || dadosResponsavel.email.length > 255) {
        error.message += '[Email incorreto]';
        hasError = true;
    }

    if (hasError) {
        return error;
    } else {
        return false;
    }
};

// Insere um novo Responsável
const inserirResponsavel = async function (dadosResponsavel, contentType) {
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER));
    try {
        if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
            let erroValidacao = await validarDadosResponsavel(dadosResponsavel);
            if (!erroValidacao) {
                let resultNovoResponsavel = await responsavelDAO.setInsertResponsavel(dadosResponsavel);
                if (resultNovoResponsavel) {
                    let lastID = await responsavelDAO.selectLastID();
                    if (lastID) {
                        dadosResponsavel.id = lastID;
                        response.status = MESSAGES.SUCCESS_CREATED_ITEM.status;
                        response.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code;
                        response.message = MESSAGES.SUCCESS_CREATED_ITEM.message;
                        response.items.responsavel = dadosResponsavel;
                        return response; // 201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
                }
            } else {
                return erroValidacao; // 400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Atualiza um Responsável buscando pelo ID
const atualizarResponsavel = async function (dadosResponsavel, id, contentType) {
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER));
    try {
        if (String(contentType).toUpperCase() === 'APPLICATION/JSON') {
            let erroValidacao = await validarDadosResponsavel(dadosResponsavel);
            if (!erroValidacao) {
                let idValido = await buscarResponsavelID(id);
                if (idValido.status_code === 200) {
                    dadosResponsavel.id = Number(id);
                    let resultResponsavelAtualizado = await responsavelDAO.setUpdateResponsavel(dadosResponsavel);
                    if (resultResponsavelAtualizado) {
                        response.status = MESSAGES.SUCCESS_UPDATED_ITEM.status;
                        response.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code;
                        response.message = MESSAGES.SUCCESS_UPDATED_ITEM.message;
                        response.items.responsavel = dadosResponsavel;otas
                        return response; // 200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
                    }
                } else {
                    return idValido; // 400 ou 404
                }
            } else {
                return erroValidacao; // 400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

// Excluir um Responsável buscando pelo ID
const excluirResponsavel = async function (id) {
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER));
    try {
        if (!isNaN(id) && id > 0) {
            let idValido = await buscarResponsavelID(id);
            if (idValido.status_code === 200) {
                let resultExclusao = await responsavelDAO.setDeleteResponsavel(Number(id));
                if (resultExclusao) {
                    response.status = MESSAGES.SUCCESS_DELETED_ITEM.status;
                    response.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code;
                    response.message = MESSAGES.SUCCESS_DELETED_ITEM.message;
                    delete response.items;
                    return response; // 200
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
                }
            } else {
                return idValido; // 404 ou 400
            }
        } else {
            let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS));
            error.message += ' [ID incorreto]';
            return error; // 400
        }
    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
};

module.exports = {
    listarResponsaveis,
    buscarResponsavelID,
    inserirResponsavel,
    atualizarResponsavel,
    excluirResponsavel
};