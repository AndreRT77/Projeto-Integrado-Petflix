/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao Pet
 * Data:03/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da dependencia do Prisma que permite a execução de script sql no banco de dados
const {PrismaClient} = require('@prisma/client')

//Cria uma novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os Pets do banco de dados
const getSelectAllPets = async() =>{

    try{
    //Sricpt SQL
    let sql =  'select * from tbl_pet order by id desc'

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
        let sql =  `select * from tbl_pet where id= ${id}`
    
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
        let sql = `select id from tbl_pet order by id desc limit 1`
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
const setInsertPets = async function(dadosPet){
    try {
        let sql = `
        INSERT INTO tbl_pet (
            nome, idade, sexo, tamanho, status_adocao, nacionalidade, necessidades_especiais, descricao, midia, id_especie, id_responsavel_pet, id_abrigo
        ) VALUES (
            '${dadosPet.nome}',
            ${dadosPet.idade},
            '${dadosPet.sexo}',
            ${dadosPet.tamanho},
            '${dadosPet.status_adocao}',
            '${dadosPet.nacionalidade}',
            '${dadosPet.necessidades_especiais}',
            '${dadosPet.descricao}',
            '${dadosPet.midia}',
            ${dadosPet.id_especie},
            ${dadosPet.id_responsavel_pet},
            ${dadosPet.id_abrigo}
        );
        `
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false

    } catch (error) {
        console.log(error)
        return false
    }
}


//Altera um Pet no banco de dados
const setUpdatePets = async function(id, dadosPet){
    try {
        
        let sql = `
            UPDATE tbl_pet SET
                nome = '${dadosPet.nome}',
                idade = ${dadosPet.idade},
                sexo = '${dadosPet.sexo}',
                tamanho = ${dadosPet.tamanho},
                status_adocao = '${dadosPet.status_adocao}',
                nacionalidade = '${dadosPet.nacionalidade}',
                necessidades_especiais = '${dadosPet.necessidades_especiais}',
                descricao = '${dadosPet.descricao}',
                midia = '${dadosPet.midia}',
                id_especie = ${dadosPet.id_especie},
                id_responsavel_pet = ${dadosPet.id_responsavel_pet},
                id_abrigo = ${dadosPet.id_abrigo}
            WHERE id = ${id};
        `;

        let result = await prisma.$executeRawUnsafe(sql);

        return result ? true : false;

    } catch (error) {
        console.log(error);
        return false;
    }
}

//Exclui um Pet pelo ID no banco de dados
const setDeletePets = async function(id){
    try {
        // ATENÇÃO: Esta query é vulnerável a SQL Injection.
        let sql = `DELETE FROM tbl_pet WHERE id = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);

        return result ? true : false;
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