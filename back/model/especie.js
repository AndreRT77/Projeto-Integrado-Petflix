/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a especie
 * Data:11/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da dependencia do Prisma que permite a execução de script sql no banco de dados
const {PrismaClient} = require('../../generated/prisma')

//Cria uma novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os Especies do banco de dados
const getSelectAllEspecies = async() =>{

    try{
    //Sricpt SQL
    let sql =  'select * from tbl_especie order by id desc'

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

//Retorna um Especie filtrando pelo id do banco de dados
const getSelectByIdEspecies = async function(id){
    try{
        //Sricpt SQL
        let sql =  `select * from tbl_Especie where id= ${id}`
    
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
        let sql = `select id from tbl_especie order by id desc limit 1`
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

//Insere um Especie no banco de dados
const setInsertEspecies = async function(Especie){
    try {
        let sql = `INSERT INTO tbl_especie (
           
        ) VALUES
        (
            '${Especie.nome}',
            ${Especie.habitat},
            '${Especie.descricao}'
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

//Altera uma especie no banco de dados
const setUpdateEspecies = async function(Especie){
    try {
        let sql = `UPDATE tbl_Especie SET
            nome='${Especie.nome}',
            habitat=${Especie.habitat},
            descricao='${Especie.descricao}'
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

//Exclui um Especie pelo ID no banco de dados
const setDeleteEspecies = async function(id){
    try {
        //Script SQL
        let sql = `delete from tbl_Especie where id=${id}`
        
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
    getSelectAllEspecies,
    getSelectByIdEspecies,
    getSelectLastID,
    setInsertEspecies,
    setUpdateEspecies,
    setDeleteEspecies
}