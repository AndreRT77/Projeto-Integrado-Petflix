/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao Raca
 * Data:03/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da dependencua do Prisma que permite a execução de script sql no banco de dados
const {PrismaClient} = require('../../generated/prisma')

//Cria uma novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os Racas do banco de dados
const getSelectAllRacas = async() =>{

    try{
    //Sricpt SQL
    let sql =  'select * from tbl_Raca order by id desc'

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

//Retorna um Raca filtrando pelo id do banco de dados
const getSelectByIdRacas = async function(id){
    try{
        //Sricpt SQL
        let sql =  `select * from tbl_Raca where id= ${id}`
    
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
        let sql = `select id from tbl_Raca order by id desc limit 1`
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

//Insere um Raca no banco de dados
const setInsertRacas = async function(Raca){
    try {
        let sql = `INSERT INTO tbl_Raca (
           
        ) VALUES
        (
            '${Raca.nome}',
            ${Raca.expectativa_de_vida},
            '${Raca.saude}',
            ${Raca.peso_medio},
            '${Raca.porte}',
            '${Raca.capacidades}'
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

//Altera um Raca no banco de dados
const setUpdateRacas = async function(Raca){
    try {
        let sql = `UPDATE tbl_Raca SET
            nome='${Raca.nome}',
            expectativa_de_vida =${Raca.expectativa_de_vida},
            saude='${Raca.saude}',
            peso_medio= ${Raca.peso_medio},
            porte='${Raca.porte}',
            capacidades=${Raca.capacidades}
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

//Exclui um Raca pelo ID no banco de dados
const setDeleteRacas = async function(id){
    try {
        //Script SQL
        let sql = `delete from tbl_Raca where id=${id}`
        
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
    getSelectAllRacas,
    getSelectByIdRacas,
    getSelectLastID,
    setInsertRacas,
    setUpdateRacas,
    setDeleteRacas
}