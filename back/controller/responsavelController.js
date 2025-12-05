/********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados para realizar o CRUD de responsáveis
 * Data: 05/12/2025
 * Nome: João Pedro Teodoro Nunes Correia
 * Versão 1.0:
 *******************************************************************************************/

//import da model do dao do responsavel do pet
const responsavelPetDAO = require('../model/DAO/responsavelPetDAO')

//Import dos arquivos de mensagens
const MESSAGES = require('../modulo/messages')

//Função que retorna uma lista de todos os responsáveis cadastrados no BD
const listarResponsaveis = async function () {

    //chama a função do DAO para retornar a lista de responsáveis no BD
    let resultResponsaveis = await responsavelPetDAO.getSelectAllResponsaveis()

    //criando um objeto para as mensagens
    let responsaveisMESSAGES = JSON.parse(JSON.stringify(MESSAGES.RESPONSAVEL_PET))

    try {
        if (resultResponsaveis){
            responsaveisMESSAGES.status = MESSAGES.SUCCESS_REQUEST.status
            responsaveisMESSAGES.status_code = MESSAGES.SUCCESS_REQUEST.status_code
            responsaveisMESSAGES.responsaveis = resultResponsaveis


            return responsaveisMESSAGES
        } else {
            return MESSAGES.ERROR_NOT_FOUND //404
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER //500
    }

}

//buscando responsavel pesquisando por ID
const buscarResponsavelPorID = async function (id) {

    try {

        //Criando um objeto novo para as mensagens
        let responsavelMESSAGES = JSON.parse(JSON.stringify(MESSAGES.RESPONSAVEL_PET))

        //Validação do id
        if (!isNaN(id) && id != '' && id != null && id > 0){

            let resultResponsavel = await responsavelPetDAO.selectByIdResponsavel(Number(id))

            if (resultResponsavel){
                if (resultResponsavel.lenght > 0){
                    responsavelMESSAGES.status = MESSAGES.SUCCESS_REQUEST.status
                    responsavelMESSAGES.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    responsavelMESSAGES.responsavel = resultResponsavel

                    return responsavelMESSAGES //200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER //500
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Inválido]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}