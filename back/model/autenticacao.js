/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD para a autenticação
 * Data: 11/12/2025
 * Autor: João Pedro Teodoro Nunes Correia
 * Versão: 1.0
 *******************************************************************************************/

// Import da biblioteca do Prisma Client
const { PrismaClient } = require('@prisma/client')
// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Função para autenticar um usuário (tutor)
const autenticarTutor = async function(email, senha) {
    try {
        // Script SQL para buscar o tutor pelo email e senha
        // ATENÇÃO: Armazenar senhas em texto plano é uma falha de segurança grave.
        // O ideal é usar hashes de senha (ex: bcrypt).
        let sql = `SELECT * FROM tbl_tutor_interessado WHERE email = '${email}' AND senha = '${senha}'`
 
        // Executa o script no banco de dados
        let result = await prisma.$queryRawUnsafe(sql)
 
        // Retorna o resultado da busca
        return result

    } catch (error) {
        return false
    }
}

module.exports = {
    autenticarTutor
}