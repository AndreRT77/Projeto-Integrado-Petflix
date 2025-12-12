/********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados para realizar o CRUD de responsáveis
 * Data: 05/12/2025
 * Nome: João Pedro Teodoro Nunes Correia
 * Versão 1.0:
 *******************************************************************************************/

//Import da dependência do Prisma que permite a execução de script SQL no banco de dados
const { PrismaClient } = require('../../back/node_modules/@prisma/client')
//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Função para retornar todos os responsáveis cadastrados no banco de dados
const getSelectAllResponsaveis = async function () {

    try {
        //script sql
        //utilizando o método seguro $queryRaw
        let result = await prisma.$queryRaw`SELECT * FROM tbl_responsavel_pet`

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

//Retornar um responsável específico (buscando por algum id)
const selectByIdResponsavel = async function (id) {

    try {
        //script sql
        //utilizando o método seguro $queryRaw
        let result = await prisma.$queryRaw`SELECT * FROM tbl_responsavel_pet WHERE id_responsavel_pet = ${id}`

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

//Retornar o último ID gerado no BD
const selectLastID = async function () {

    try {
        //script para retornar somente o ultimo ID
        let sql = `select id from tbl_responsavel_pet order by id desc limit 1`

        //encaminha para o bd com o script
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }

}

//função para criar/inserir um novo responsável
const setInsertResponsavel = async function (dadosResponsavel) {


    try {
        //método seguro $executeRaw com template para evitar sql injection (injeção de dados)
        let result = await prisma.$executeRaw`
        INSERT INTO tbl_responsavel_pet (
        nome,
        cpf,
        contato,
        email    
    )   VALUES
        (${dadosResponsavel.nome},
        ${dadosResponsavel.cpf},
        ${dadosResponsavel.contato},
        ${dadosResponsavel.email}
        )`;

        if (result)
            return true
        else
            return false

    } catch (error){
        //console log abaixo feito para debugar em caso de erro
        //console.log(error)
        return false
    }



}

//Altera dados de um responsável no banco d edados
const setUpdateResponsavel = async function (dadosResponsavel) {

    try {
        //método seguro $executeRaw com template para evitar sql injection (injeção de dados)
        let result = await prisma.$executeRaw`
        UPDATE tbl_responsavel_pet SET
            nome = ${dadosResponsavel.nome},
            cpf = ${dadosResponsavel.cpf},
            contato = ${dadosResponsavel.contato},
            email = ${dadosResponsavel.email}
        WHERE id_responsavel_pet = ${dadosResponsavel.id_responsavel_pet}
        `;

        if (result)
            return true
        else
            return false

    } catch (error) {
        //console log abaixo feito para debugar em caso de erro
        //console.log(error)
        return false
    }

}

//deletar um responsável
const setDeleteResponsavel = async function(id) {

    try {
        //usando metodo seguro para delete
        let result = await prisma.$executeRaw`DELETE FROM tbl_responsavel_pet WHERE id_responsavel_pet = ${id}`

        if (result)
            return true
        else
            return false

    } catch (error){
        //console log abaixo feito para debugar em caso de erro
        //console.log(error)
        return false
    }

}


module.exports = {
    getSelectAllResponsaveis,
    selectByIdResponsavel,
    selectLastID,
    setInsertResponsavel,
    setUpdateResponsavel,
    setDeleteResponsavel
}