/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a Raca
 * Data:09/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da dependencia do Prisma que permite a execução de script sql no banco de dados
const {PrismaClient} = require('@prisma/client')

//Cria uma novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os Racas do banco de dados
const getSelectAllRacas = async() =>{
    try{
        let sql =  'select * from tbl_raca order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

//Retorna um Raca filtrando pelo id do banco de dados
const getSelectByIdRacas = async function(id){
    try{
        let sql =  `select * from tbl_raca where id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)
    
        if(result)
            return result
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

//Retorna o último ID gerado no BD
const getSelectLastID = async function(){
    try {
        let sql = `select id from tbl_raca order by id desc limit 1`
        let result = await prisma.$queryRawUnsafe(sql)
    
        if(result && result.length > 0)
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

//Insere um Raca no banco de dados
const setInsertRacas = async function(dadosRaca){
    try {
        let sql = `
            INSERT INTO tbl_raca (
                nome, expectativa_de_vida, saude, peso_medio, porte, capacidades, id_especie
            ) VALUES (
                '${dadosRaca.nome}',
                ${dadosRaca.expectativa_de_vida},
                '${dadosRaca.saude}',
                ${dadosRaca.peso_medio},
                '${dadosRaca.porte}',
                '${dadosRaca.capacidades}',
                ${dadosRaca.id_especie}
            );
        `
       let result = await prisma.$executeRawUnsafe(sql)
       if(result) 
        return true
       else
        return false
    } catch (error) {
        console.log(error)
        return false
    }
}

//Altera um Raca no banco de dados
const setUpdateRacas = async function(id, dadosRaca){
    try {
        let sql = `
            UPDATE tbl_raca SET
                nome = '${dadosRaca.nome}',
                expectativa_de_vida = ${dadosRaca.expectativa_de_vida},
                saude = '${dadosRaca.saude}',
                peso_medio = ${dadosRaca.peso_medio},
                porte = '${dadosRaca.porte}',
                capacidades = '${dadosRaca.capacidades}',
                id_especie = ${dadosRaca.id_especie}
            WHERE id = ${id};
        `
       let result = await prisma.$executeRawUnsafe(sql)
       if(result) 
        return true
       else
        return false
    } catch (error) {
        console.log(error)
        return false
    }
}

//Exclui um Raca pelo ID no banco de dados
const setDeleteRacas = async function(id){
    try {
        let sql = `delete from tbl_raca where id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    getSelectAllRacas,
    getSelectByIdRacas,
    getSelectLastID,
    setInsertRacas,
    setUpdateRacas,
    setDeleteRacas
}