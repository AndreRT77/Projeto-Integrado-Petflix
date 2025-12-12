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
const setInsertPets = async function(dadosPet){
    try {
        const novoPet = await prisma.tbl_Pet.create({
            data: {
                nome: dadosPet.nome,
                idade: dadosPet.idade,
                sexo: dadosPet.sexo,
                tamanho: dadosPet.tamanho,
                status_adocao: dadosPet.status_adocao,
                nacionalidade: dadosPet.nacionalidade,
                necessidades_especiais: dadosPet.necessidades_especiais,
                descricao: dadosPet.descricao,
                midia: dadosPet.midia
            }
        });

        // Se a criação deu certo, o novo pet vai existir
        // checa se ele existe pra retornar se a operação foi um sucesso
       let result = !!novoPet;
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
const setUpdatePets = async function(id, dadosPet){
    try {
        const petAtualizado = await prisma.tbl_Pet.update({
            where: {
                id: Number(id)
            },
            data: {
                nome: dadosPet.nome,
                idade: dadosPet.idade,
                sexo: dadosPet.sexo,
                tamanho: dadosPet.tamanho,
                nacionalidade: dadosPet.nacionalidade,
                necessidades_especiais: dadosPet.necessidades_especiais,
                descricao: dadosPet.descricao,
                midia: dadosPet.midia
            }
        });

        // O método update retorna o objeto atualizado se tiver sucesso
        // A gente checa se ele existe pra confirmar que a operação deu certo
        return !!petAtualizado;

    } catch (error) {
        console.log(error)

        return false
        
    }
}

//Exclui um Pet pelo ID no banco de dados
const setDeletePets = async function(id){
    try {
        // Usa o método 'delete' do Prisma, que é seguro contra SQL Injection
        const petDeletado = await prisma.tbl_Pet.delete({
            where: {
                id: Number(id)
            }
        });
        return !!petDeletado;
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