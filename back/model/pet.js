/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao Pet
 * Data:03/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/
/*
    Exemplos de dependencias para conexão com o BD
        Bancos de Dados relacionais
            Sequelize -> Foi utilizado em muitos projetos desde o inicio do node
            Prisma    -> É uma dependencia atual que trabalha com BD (MYSQL, PostgreSQL, SQL Server) (SQL ou ORM)
                npm install prisma ---save              -> instalar prisma (Conexão com o database) 
                npm install @prisma/client --save       -> instalar o cliente do prisma (Executar scripts SQL no banco)
                npx prisma init                         -> promt de comando para inicializar o prisma
                npx prisma migrate dev                  -> Realiza o sincronismo entre o prisma e o BD (CUIDADO, nesse processo você poderá perder dados reais do BD, pois ele pega e cria as tabelas programadas no ORM schema.prisma)
                npx prisma generate                     -> Apenas realiza o sncronismo entre o prisma e o BD, geralmente usamos para rodar o projeto em um PC novo 
            Knex      -> É uma dependencia atual que trabalha com MYSQl
        Banco de Dados não Relacional
            Mongoose  -> É uma dependencia para o Mongo DB (Não Relacional)

    // $queryRawUnsafe *() -> permite executar um script SQl de uma variável e que retorna valores do banco (SELECT)
    // $ExecuteRawUnsafe *() -> permite executar um script SQl de uma variável e que não retorna dados do banco (INSERT, UPDATE E DELETE)
    // $queryRaw *() -> permite executar um script SQl Sem estar em uma variável e que retorna valores do banco (SELECT) e faz tratametos de segurança contra SQL Injection
*/
//Import da dependencua do Prisma que permite a execução de script sql no banco de dados
const {PrismaClient} = require('../../generated/prisma')

//Cria uma novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os Pets do banco de dados
const getSelectAllPets = async() =>{

    try{
    //Sricpt SQL
    let sql =  'select * from tbl_Pet order by id desc'

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

//Retorna um Pet filtrando pelo id do banco de dados
const getSelectByIdPets = async function(id){
    try{
        //Sricpt SQL
        let sql =  `select * from tbl_Pet where id= ${id}`
    
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
        let sql = `select id from tbl_Pet order by id desc limit 1`
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

//Insere um Pet no banco de dados
const setInsertPets = async function(Pet){
    try {
        let sql = `INSERT INTO tbl_Pet (
            nome,
            idade,
            sexo,
            tamanho,
            status_adocao,
            nacionalidade,
            necessidades_especiais,
            descricao,
            midia
        ) VALUES
        (
            '${Pet.nome}',
            ${Pet.idade},
            '${Pet.sexo}',
            '${Pet.tamanho}',
            '${Pet.status_adocao}',
            '${Pet.nacionalidade}',
            '${Pet.necessidades_especiais}',
            '${Pet.descricao}',
            '${Pet.midia}'
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

//Altera um Pet no banco de dados
const setUpdatePets = async function(Pet){
    try {
        let sql = `UPDATE tbl_Pet SET
            nome='${Pet.nome}',
            idade=${Pet.idade},
            sexo='${Pet.sexo}',
            tamanho='${Pet.tamanho}',
            nacionalidade='${Pet.nacionalidade}',
            necessidades_especiais=${Pet.necessidades_especiais},
            descricao='${Pet.descricao}',
            midia='${Pet.midia}'
            WHERE id=${Pet.id};
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

//Exclui um Pet pelo ID no banco de dados
const setDeletePets = async function(id){
    try {
        //Script SQL
        let sql = `delete from tbl_Pet where id=${id}`
        
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
    getSelectAllPets,
    getSelectByIdPets,
    getSelectLastID,
    setInsertPets,
    setUpdatePets,
    setDeletePets
}