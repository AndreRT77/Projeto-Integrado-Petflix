/********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados para realizar o CRUD de tutor (o que será o novo responsável pelo pet após a adoção, serve como tutor interessado)
 * Data: 09/12/2025
 * Nome: João Pedro Teodoro Nunes Correia
 * Versão 1.0:
 *******************************************************************************************/

//import da model do dao do tutor
const tutorDAO = require('../model/tutorInteressado.js')

//import dos arquivos de mensagens
const MESSAGES = require('../modulo/messages')

//listar novo(s) responsavel(is) (tutores interessados) pelo pet
const listarTutoresInteressados = async function () {
    //chama a função do DAO para retornar a lista de tutores interessados no BD
    let resultTutores = await tutorDAO.getSelectAllTutoresInteressados()

    //criando um objeto para as mensagens
    let tutoresMESSAGES = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))

    try {
        if (resultTutores){
            if (resultTutores.length > 0) {
                tutoresMESSAGES.status = MESSAGES.SUCCESS_REQUEST.status
                tutoresMESSAGES.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                tutoresMESSAGES.items.tutores = resultTutores
                return tutoresMESSAGES // 200
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

//buscar novo responsavel (tutor interessado) pesquisando por ID
const buscarTutorInteressadoPorID = async function (id) {
    let tutorMESSAGES = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))

    try {

        //Validação do id
        if (!isNaN(id) && id != '' && id != null && id > 0){
            let resultTutor = await tutorDAO.selectByIdTutorInteressado(Number(id))

            if (resultTutor){
                if (resultTutor.length > 0){
                    tutorMESSAGES.status = MESSAGES.SUCCESS_REQUEST.status
                    tutorMESSAGES.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    tutorMESSAGES.items.tutor = resultTutor

                    return tutorMESSAGES //200
                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return MESSAGES.ERROR_INVALID_ID //400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//função que insere um novo responsável (tutor interessado)
const inserirNovoResponsavel = async function (dadosTutor, contentType) {
    //criando um objeto para as mensagens
    let tutorMESSAGES = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))

    try {

        if (String(contentType).toUpperCase() == 'application/json') {

            //Validação dos campos obrigatórios
            if (dadosTutor.nome == '' || dadosTutor.nome == null || dadosTutor.nome == undefined ||
                dadosTutor.email == '' || dadosTutor.email == null || dadosTutor.email == undefined ||
                dadosTutor.telefone == '' || dadosTutor.telefone == null || dadosTutor.telefone == undefined) {

                let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS))
                error.message += ' [nome, email, telefone]'
                return error //400

            } else {

                //chama a função do DAO para inserir um novo tutor interessado
                let resultDadosTutor = await tutorDAO.insertNovoResponsavel(dadosTutor)

                if (resultDadosTutor) {

                    tutorMESSAGES.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    tutorMESSAGES.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    tutorMESSAGES.items.tutor = resultDadosTutor
                    return tutorMESSAGES //201

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//função que atualiza o novo responsavel (tipo algum dado dele, por exemplo cidade ou coisa do tipo)
const atualizarNovoResponsavel = async function (dadosTutor, contentType) {

    //objeto de mensagens
    let tutorMESSAGES = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Validação dos campos obrigatórios
            if (dadosTutor.id == '' || dadosTutor.id == null || dadosTutor.id == undefined ||
                dadosTutor.nome == '' || dadosTutor.nome == null || dadosTutor.nome == undefined ||
                dadosTutor.email == '' || dadosTutor.email == null || dadosTutor.email == undefined ||
                dadosTutor.telefone == '' || dadosTutor.telefone == null || dadosTutor.telefone == undefined) {

                let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS))
                error.message += ' [id, nome, email, telefone]'
                return error //400

            } else {

                //chama a função do DAO para atualizar o tutor interessado
                let resultDadosTutor = await tutorDAO.updateNovoResponsavel(dadosTutor)

                if (resultDadosTutor) {

                    tutorMESSAGES.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                    tutorMESSAGES.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                    tutorMESSAGES.items.tutor = dadosTutor

                    return tutorMESSAGES //200

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } 

        }

    } catch (error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//deletar responsável (não acho que seja uma boa essa função, mas tá aqui caso precise)
const deletarNovoResponsavel = async function (id) {
    let tutorMESSAGES = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))

    try {
        //Validação do id
        if (!isNaN(id) && id != '' && id != null && id > 0){
            let resultTutor = await tutorDAO.deleteNovoResponsavel(Number(id))

            if (resultTutor){
                tutorMESSAGES.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                tutorMESSAGES.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                tutorMESSAGES.message = MESSAGES.SUCCESS_DELETED_ITEM.message

                return tutorMESSAGES //200
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return MESSAGES.ERROR_INVALID_ID //400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//validar dados do tutor interessado
// const validarDadosTutorInteressado = function (dadosNovoResponsavel) {

//     let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS))
//     let status = true
//     let hasError = false

//     if (!dadosNovoResponsavel.nome || dadosNovoResponsavel.nome == '' ||
//         !dadosNovoResponsavel.email || dadosNovoResponsavel.email == '' ||
//         !dadosNovoResponsavel.telefone || dadosNovoResponsavel.telefone == '') {
//         hasError = true
//         error.message += ' [nome, email, telefone]'

//     } else {
//         status = false
//     }


// }

module.exports = {
    listarTutoresInteressados,
    buscarTutorInteressadoPorID,
    inserirNovoResponsavel,
    atualizarNovoResponsavel,
    deletarNovoResponsavel

}