/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados para a autenticação de usuários
 * Data: 11/12/2025
 * Autor: João Pedro Teodoro Nunes Correia
 * Versão: 1.0
 *******************************************************************************************/

// Import da model de autenticação
const autenticacaoDAO = require('../model/autenticacao.js')

// Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../module/config_messages.js')

// Função que realiza o login
const login = async function(dadosLogin, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() !== 'APPLICATION/JSON') {
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }

        // Validação de campos obrigatórios
        if (!dadosLogin.email || !dadosLogin.senha || dadosLogin.email == '' || dadosLogin.senha == '') {
            let erro = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS))
            erro.message += ' [email, senha]'
            return erro // 400
        }

        // Chama a função do DAO para autenticar o usuário
        let resultLogin = await autenticacaoDAO.autenticarTutor(dadosLogin.email, dadosLogin.senha)

        if (resultLogin && resultLogin.length > 0) {
            // Se encontrou o usuário, retorna sucesso
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
            MESSAGES.DEFAULT_HEADER.message = 'Login realizado com sucesso.'
            MESSAGES.DEFAULT_HEADER.items.usuario = resultLogin[0]
            // Por segurança, não retorne a senha
            delete MESSAGES.DEFAULT_HEADER.items.usuario.senha
            return MESSAGES.DEFAULT_HEADER // 200
        } else {
            // Se não encontrou, retorna não autorizado
            return MESSAGES.ERROR_UNAUTHORIZED // 401
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

module.exports = {
    login
}