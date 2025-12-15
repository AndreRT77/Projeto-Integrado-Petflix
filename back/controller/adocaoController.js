/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados para realizar o CRUD de adoção de PETs
 * Data: 04/12/2025
 * Nome: João Pedro Teodoro Nunes Correia
 * Versão 1.0:
 *******************************************************************************************************/

// Import do DAO para interagir com o banco de dados
const adocaoDAO = require('../model/adocao.js');

// Import do arquivo de mensagens
const MESSAGES = require('../module/config_messages.js');

//Função que retorna uma lista de pedidos de adoção
const listarPedidosAdocao = async function(){

    //chamando o DAO para buscar os dados de pedidos de adoção no BD
    let resultPedidos = await adocaoDAO.selectAllPedidosAdocao();

    // Criando um objeto para as mensagens
    let pedidosMESSAGES = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER));

    try {
        if (resultPedidos){
            if (resultPedidos.length > 0) {
                pedidosMESSAGES.status = MESSAGES.SUCCESS_REQUEST.status;
                pedidosMESSAGES.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
                pedidosMESSAGES.items.pedidos = resultPedidos;
                return pedidosMESSAGES; // 200
            } else {
                return MESSAGES.ERROR_NOT_FOUND; // 404
            }
        }else{
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
        }
    }catch(error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

//Função responsável por criar um pedido de adoção
const criarPedidoAdocao = async function(dadosPedido, contentType){
    let pedidoMESSAGES = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER));

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let erroValidacao = await validarPedido(dadosPedido);

            if (!erroValidacao) {
                let resultDadosPedido = await adocaoDAO.insertPedidoAdocao(dadosPedido);

                if (resultDadosPedido) {
                    let lastID = await adocaoDAO.selectLastId();
                    if (lastID) {
                        pedidoMESSAGES.status = MESSAGES.SUCCESS_CREATED_ITEM.status;
                        pedidoMESSAGES.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code;
                        pedidoMESSAGES.message = MESSAGES.SUCCESS_CREATED_ITEM.message;
                        dadosPedido.id = lastID;
                        pedidoMESSAGES.items.pedido = dadosPedido;
                        return pedidoMESSAGES; // 201
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
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

//Função que retorna um pedido ao ser buscado por um ID específico
const listarPedidoID = async function (id) {
    let pedidoMESSAGES = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER));

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultPedido = await adocaoDAO.selectByIdPedidoAdocao(Number(id));

            if (resultPedido) {
                if (resultPedido.length > 0) {
                    pedidoMESSAGES.status = MESSAGES.SUCCESS_REQUEST.status;
                    pedidoMESSAGES.status_code = MESSAGES.SUCCESS_REQUEST.status_code;
                    pedidoMESSAGES.items.pedido = resultPedido;
                    return pedidoMESSAGES; // 200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND; // 404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
            }
        } else {
            let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS));
            error.message += ' [ID Inválido]';
            return error; // 400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

//Função que atualiza o pedido específico
const atualizarPedido = async function (dadosPedido, id, contentType){
    let pedidoMESSAGES = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER));

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            if (!isNaN(id) && id != '' && id != null && id > 0) {
                let erroValidacao = await validarPedido(dadosPedido);

                if (!erroValidacao) {
                    dadosPedido.id = Number(id);
                    let resultDadosPedido = await adocaoDAO.updatePedidoAdocao(dadosPedido);

                    if (resultDadosPedido) {
                        pedidoMESSAGES.status = MESSAGES.SUCCESS_UPDATED_ITEM.status;
                        pedidoMESSAGES.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code;
                        pedidoMESSAGES.message = MESSAGES.SUCCESS_UPDATED_ITEM.message;
                        pedidoMESSAGES.items.pedido = dadosPedido;
                        return pedidoMESSAGES; // 200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
                    }
                } else {
                    return erroValidacao; // 400
                }
            } else {
                let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS));
                error.message += ' [ID Inválido]';
                return error; // 400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

//Função responsável por excluir um pedido
const deletarPedido = async function(id){
    let pedidoMESSAGES = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER));

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let result = await adocaoDAO.deletePedidoAdocao(Number(id));

            if (result) {
                return MESSAGES.SUCCESS_DELETED_ITEM; // 200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL; // 500
            }
        } else {
            let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS));
            error.message += ' [ID Inválido]';
            return error; // 400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
    }
}

//Função que valida um pedido
const validarPedido = async function(dadosPedido){
    let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS));
    let message = ' [Campos inválidos:';
    let hasError = false;

    if (!dadosPedido.id_pet || isNaN(dadosPedido.id_pet)) { message += ' id_pet'; hasError = true; }
    if (!dadosPedido.id_responsavel_pet || isNaN(dadosPedido.id_responsavel_pet)) { message += ' id_responsavel_pet'; hasError = true; }
    
    if (hasError) {
        error.message += message + ']';
        return error;
    }
    return false;
}

module.exports = {
    listarPedidosAdocao,
    criarPedidoAdocao,
    listarPedidoID,
    atualizarPedido,
    deletarPedido,
    validarPedido
}