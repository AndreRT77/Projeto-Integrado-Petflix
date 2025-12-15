/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao Ong
 * Data:11/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/















//IMPLEMENTAÇÃO FUTURA (MAS TEM COISA PRA BAIXO)





































//Import da dependencia do Prisma que permite a execução de script sql no banco de dados
const { PrismaClient } = require('../../back/node_modules/@prisma/client')

//Cria uma novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os Ongs do banco de dados
const getSelectAllOngs = async() =>{

    try{
    //Sricpt SQL
    let sql =  'select * from tbl_ong order by id desc'

    //Encaminhe para o BD o script SQL
    let result = await prisma.$queryRawUnsafe(sql)

    if(Array.isArray(result))
        return result
    else
        return false
}
catch (error) {
    console.log(error)

    return false
}

}

//Retorna um Ong filtrando pelo id do banco de dados
const getSelectByIdOngs = async function(id){
    try{
        //Sricpt SQL
        let sql =  `select * from tbl_ong where id= ${id}`
    
        //Encaminhe para o BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)
    
        if(Array.isArray(result))
            return result
        else
            return false
    }
    catch (error) {
        console.log(error)

        return false
    }
}
//Retorna o último ID gerado no BD
const getSelectLastID = async function(){
    try {
        //Script SQL para retornar apenas o último ID do BD
        let sql = `select id from tbl_ong order by id desc limit 1`
        let result = await prisma.$queryRawUnsafe(sql)
    
        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        console.log(error)

        return false
    }
}

//Insere um Ong no banco de dados
const setInsertOngs = async function(Ong){
    try {
        let sql = `INSERT INTO tbl_Ong (
            nome,
            cnpj,
            informacoes,
            email,
            contato
        ) VALUES
        (
            '${Ong.nome}',
            ${Ong.cnpj},
            '${Ong.informacoes}',
            '${Ong.email}',
            ${Ong.contato}
        )`
        //executeRawUnsafe() -> Executa o scipt SQL que não tem retorno de valores
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

//Altera um Ong no banco de dados
const setUpdateOngs = async function(Ong){
    try {
        let sql = `UPDATE tbl_Ong SET
            nome='${Ong.nome}',
            cnpj=${Ong.cnpj},
            informacoes='${Ong.informacoes}',
            email='${Ong.email}',
            contato=${Ong.contato}
            `

        //executeRawUnsafe() -> Executa o scipt SQL que não tem retorno de valores
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

//Exclui um Ong pelo ID no banco de dados
const setDeleteOngs = async function(id){
    try {
        //Script SQL
        let sql = `delete from tbl_ong where id=${id}`
        
        //Encaminha para o BD o srcipt SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //console.log(Array.isArray(result))
        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    getSelectAllOngs,
    getSelectByIdOngs,
    getSelectLastID,
    setInsertOngs,
    setUpdateOngs,
    setDeleteOngs
}