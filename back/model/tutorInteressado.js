/********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados para realizar o CRUD de responsáveis
 * Data: 09/12/2025
 * Nome: João Pedro Teodoro Nunes Correia
 * Versão 1.0:
 *******************************************************************************************/

//Import da dependência do Prisma que permite a execução de script SQL no banco de dados
const { PrismaClient } = require('../../back/node_modules/@prisma/client')
//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//função para retornar todos os interessados cadastrados no banco de dados
const getSelectAllTutorInteressado = async function () {

    try {
        //script sql
        //utilizando o método seguro $queryRaw
        let result = await prisma.$queryRaw`SELECT * FROM tbl_tutor_interessado`

        if (result.length > 0)
            return result
        else
            return false
    } catch (error) {
        //console log abaixo feito para debugar em caso de erro
        //console.log(error)
        return false
    }

}

//Retornar um interessado específico (buscando por algum id)
const selectByIdTutorInteressado = async function (id) {

    try {
        //script sql
        //utilizando o método seguro $queryRaw
        let result = await prisma.$queryRaw`SELECT * FROM tbl_tutor_interessado WHERE id = ${id}`

        if (result.length > 0)
            return result
        else
            return false

    } catch (error) {
        //console log abaixo feito para debugar em caso de erro
        // console.log(error)
        return false
    }

}




//POR ENQUANTO NÃO IREI INSERIR NENHUMA FUNÇÃO DE INSERÇÃO, 
//POIS O TUTOR INTERESSADO SERÁ "CRIADO" COM UMA FUNÇÃO DE PROCEDURE

module.exports = {
    getSelectAllTutorInteressado,
    selectByIdTutorInteressado
}