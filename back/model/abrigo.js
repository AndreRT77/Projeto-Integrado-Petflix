/*********************************************************************************************** 
* Objetivo: Arquivo responsável pela manipulação de dados com o BD para o CRUD de Abrigos
* Data: 09/12/2025
* Autor: João Pedro Teodoro Nunes Correia
* Versão: 1.0
************************************************************************************************/

// Import da biblioteca do Prisma Client
const { PrismaClient } = require('@prisma/client')
// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Retorna todos os abrigos do banco de dados
const selectAllAbrigos = async function() {
    try {

        // script sql
        let result = await prisma.$queryRaw`SELECT * FROM tbl_abrigo`

        if (result.length > 0)
            return result
        else
            return false

    } catch (error){
        return false
    }

}

// Retorna um abrigo específico ao buscar pelo ID
const selectAbrigoById = async function (id){

    try {
        // script sql
        // método seguro $queryRaw
        let result = await prisma.$queryRaw`SELECT * FROM tbl_abrigo WHERE id = ${id}`

        if (result.length > 0)
            return result
        else
            return false
    } catch (error){
        return false
    }

}

//retorna o ultimo id que foi gerado no bd
const selectLastID = async function () {

    try {
        //script que retorna somente o ultimo id
        let sql = `select id_abrigo from tbl_abrigo order by id desc limit 1`

        //encaminha para o bd com o script
        let resul = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error){
        return false
    }

}

//função que cria/insere um novo abrigo
const setInsertAbrigo = async function (abrigo) {

    try {
        let result = await prisma.$executeRaw`
            INSERT INTO tbl_abrigo (
                nome,
                cnpj,
                informacoes,
                contato,
                email
            ) VALUES (
                ${abrigo.nome},
                ${abrigo.cnpj},
                ${abrigo.informacoes},
                ${abrigo.contato},
                ${abrigo.email}
            )`;

        if (result)
            return true
        else
            return false

    } catch (error){
        return false
    }

}

//função que atualiza um abrigo
const setUpdateAbrigo = async function (abrigo, id) {

    try {
        let result = await prisma.$executeRaw`
            UPDATE tbl_abrigo SET
                nome = ${abrigo.nome},
                cnpj = ${abrigo.cnpj},
                informacoes = ${abrigo.informacoes},
                contato = ${abrigo.contato},
                email = ${abrigo.email}
            WHERE id_abrigo = ${id}`;

        if (result)
            return true
        else
            return false

    } catch (error){
        return false
    }

}

//função para excluir um abrigo
const setDeleteAbrigo = async function (id) {

    try {
        
        let result = await prisma.$executeRaw`DELETE FROM tbl_abrigo WHERE id = ${id}`;

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}


module.exports = {
    selectAllAbrigos,
    selectAbrigoById,
    selectLastID,
    setInsertAbrigo,
    setUpdateAbrigo,
    setDeleteAbrigo
}