/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados para realizar o CRUD de adoção de PETs
 * Data: 04/12/2025
 * Nome: João Pedro Teodoro Nunes Correia
 * Versão 1.0:
 *******************************************************************************************************/

const PetDAO = require('../../model/DAO/pet.js')
const controllerEspecie = require('./especie_controller.js')
const controllerAbrigo = require('./abrigo_controller.js')
const controllerOng = require('./ong_controller.js')

//Função que retorna uma lista de pedidos de adoção
const listarPedidosAdocao = async function(){

    //chamando o DAO para buscar os dados de pedidos de adoção no BD
    let result = await PetDAO.selectAllPedidosAdocao()
    //criando mensagem de retorno
    let MESSAGE_SUCCESS = require('../modulo/messages.js').SUCCESS_REQUEST

    try {

        if(result){

            MESSAGE_SUCCESS.items = result
            return MESSAGE_SUCCESS

        }else{
            return require('../modulo/messages.js').ERROR_NOT_FOUND
        }


    }catch(error){

    }

}

//Função responsável por criar um pedido de adoção
const criarPedidoAdocao = async function(){


}

//Função que retorna um pedido ao ser buscado por um ID específico
const listarPedidoID = async function () {


}

//Função que atualiza o pedido específico
const atualizarPedido = async function (){


}

//Função responsável por excluir um pedido
const deletarPedido = async function(){


}

//Função que valida um pedido
const validarPedido = async function(){


}

module.exports = {

    listarPedidosAdocao,
    criarPedidoAdocao,
    listarPedidoID,
    atualizarPedido,
    deletarPedido,
    validarPedido

}