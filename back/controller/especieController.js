/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a model para o CRUD de Especies 
 * Data:11/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da model do DAO de Especie
const especieDAO = require('../model/especie.js');

//Import do arquivo de mensagens
const MESSAGES = require('../module/config_messages.js');

//Retorna uma lista de todas as Especies 
const listarEspecies = async function () {
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER));
    try {
        let resultEspecies = await especieDAO.getSelectAllEspecies();
        if (resultEspecies) {
            if (resultEspecies.length > 0) {
                response.status = MESSAGES.SUCCESS_REQUEST.status;
                response.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
                response.items.especies = resultEspecies;
                return response; // 200
            } else {
                return MESSAGES.ERROR_NOT_FOUND; //404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; //500
        }
    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

//Retorna uma Especie filtrando pelo ID
const buscarEspecieID = async function (id) {
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER));
    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultEspecie = await especieDAO.getSelectByIdEspecies(Number(id));

            if (resultEspecie && resultEspecie.length > 0) {
                response.status = MESSAGES.SUCCESS_REQUEST.status;
                response.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
                response.items.especie = resultEspecie;
                return response;
            } else {
                return MESSAGES.ERROR_NOT_FOUND; //404
            }
        } else {
            let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS));
            error.message += '[ID incorreto]';
            return error; //400
        }
    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

//Insere uma Especie
const inserirEspecie = async function (dadosEspecie, contentType) {
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER));
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDadosEspecie(dadosEspecie);
            if (!validar) {
                let resultEspecie = await especieDAO.setInsertEspecies(dadosEspecie);
                if (resultEspecie) {
                    let lastID = await especieDAO.getSelectLastID();
                    if (lastID) {
                        dadosEspecie.id = lastID;
                        response.status = MESSAGES.SUCCESS_CREATED_ITEM.status;
                        response.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code;
                        response.message = MESSAGES.SUCCESS_CREATED_ITEM.message;
                        response.items = dadosEspecie;
                        return response; //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL;
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; //500
                }
            } else {
                return validar; //400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

//Atualiza uma Especie buscando pelo ID
const atualizarEspecie = async function (dadosEspecie, id, contentType) {
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER));
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDadosEspecie(dadosEspecie);
            if (!validar) {
                let validarID = await buscarEspecieID(id);
                if (validarID.status_code == 200) {
                    let resultEspecie = await especieDAO.setUpdateEspecies(id, dadosEspecie);
                    if (resultEspecie) {
                        dadosEspecie.id = Number(id);
                        response.status = MESSAGES.SUCCESS_UPDATED_ITEM.status;
                        response.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code;
                        response.message = MESSAGES.SUCCESS_UPDATED_ITEM.message;
                        response.items.especie = dadosEspecie;
                        return response; //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; //500
                    }
                } else {
                    return validarID;
                }
            } else {
                return validar;
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

//Excluir uma Especie buscando pelo ID
const excluirEspecie = async function (id) {
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER));
    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let validarID = await buscarEspecieID(id);
            if (validarID.status_code == 200) {
                let resultEspecie = await especieDAO.setDeleteEspecies(Number(id));
                if (resultEspecie) {
                    response.status = MESSAGES.SUCCESS_DELETED_ITEM.status;
                    response.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code;
                    response.message = MESSAGES.SUCCESS_DELETED_ITEM.message;
                    delete response.items;
                    return response; //200
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; //500
                }
            } else {
                return validarID;
            }
        } else {
            let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS));
            error.message += ' [ID incorreto]';
            return error; //400
        }
    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

//Validação dos dados de cadastro e atualização da Especie
const validarDadosEspecie = async function (dadosEspecie) {
    let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS));
    let hasError = false;

    if (dadosEspecie.nome == '' || dadosEspecie.nome == undefined || dadosEspecie.nome.length > 100) {
        error.message += '[Nome incorreto]';
        hasError = true;
    } else if (dadosEspecie.habitat == '' || dadosEspecie.habitat == undefined || dadosEspecie.habitat.length > 100) {
        error.message += '[Habitat incorreto]';
        hasError = true;
    } else if (dadosEspecie.descricao == '' || dadosEspecie.descricao == undefined) {
        error.message += '[Descrição incorreta]';
        hasError = true;
    }

    if (hasError) {
        return error;
    } else {
        return false;
    }
};

module.exports = {
    listarEspecies,
    buscarEspecieID,
    inserirEspecie,
    atualizarEspecie,
    excluirEspecie
};