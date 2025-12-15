/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao Responsavel
 * Data:12/12/2025
 * Autor: João Pedro Teodoro Nunes Correia
 * Versão: 1.0
 *******************************************************************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Retorna uma lista de todos os Responsaveis do banco de dados
const getSelectAllResponsaveis = async () => {
    try {
        let sql = 'select * from tbl_responsavel_pet order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    getSelectAllResponsaveis
}