/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a model para o CRUD de Especies 
 * Data:11/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da model do DAO do Especie
const EspecieDAO = require('../../model/DAO/especie.js')


//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos os Especies 
const listarEspecies = async function () {
    //Criando um objeto novo para as mensagens 
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        //Chama a função do DAO para retornar a lista de Especies do BD
        let resultEspecies = await EspecieDAO.getSelectAllEspecies()
        if (resultEspecies) {
            if (resultEspecies.length > 0) {

                //Processamento para adicionar os gêneros aos Especies 
                for (Especie of resultEspecies){
                    let resultEspecies = await controllerEspecie.listarEspeciesIdEspecie(Especie.id)
                    if(resultEspecies.status_code == 200)
                    Especie.Especie = resultEspecies.items.EspecieEspecie

                }
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Especies = resultEspecies

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }


    } catch (error) {
        console.log(error)

        return MESSAGES.ERROR.INTERNAL.SERVER.CONTROLLER //500
    }
}
//Retorna um Especie filtrando pelo ID
const buscarEspecieID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultEspecies = await EspecieDAO.getSelectByIdEspecies(Number(id))

            if (resultEspecies.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Especie = resultEspecies

                return MESSAGES.DEFAULT_HEADER
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }
    
    } catch (error) {
        console.log(error)

    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
}
}

//Insere um Especie
const inserirEspecie = async function (Especie, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Cgana a função de validar todos os dados de Especie
            let validar = await validarDadosEspecie(Especie)
            if (!validar) {


                //Processamento
                //Chama a função para inserir um novo Especie no banco de dados
                let resultEspecies = await EspecieDAO.setInsertEspecies(Especie)
                if (resultEspecies) {
                    //Chama a função para receber o ID gerado no banco de dados
                    let lastID = await EspecieDAO.getSelectLastID()
                    if(lastID){
                        //Adiciona o ID no JSON com os dados do Especie
                    Especie.id = lastID
                        for(especie of especie.especie){
                     // Processar a inserção dos dados na tabela de relação entre Especie e Especie
                    //  Especie.Especie.forEach(async (Especie) => {
                        let EspecieEspecie = { 
                            id_Especie: lastID, 
                            id_Especie: Especie.id
                        }
                        let resultEspeciesEspecie = await controllerEspecie.inserirEspecieEspecie(EspecieEspecie,contentType)
                        if (resultEspeciesEspecie.status_code != 201)
                            return MESSAGES.ERROR.ERROR_RELATION_INSERT
                    }
                    
                    
                    Especie.id = lastID
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message

                    delete Especie.Especie

                    //Pesquisa no BD todos os gêmeros que foram associados ao Especie
                    let resultDadosEspecie = await controllerEspecie.listarEspeciesIdEspecie(lastID)


                    //Cria novamente o atributo Especie e coloca o resultado do BD com os gêneros
                    Especie.Especie = resultDadosEspecie

                    MESSAGES.DEFAULT_HEADER.items = Especie

                   

                    return MESSAGES.DEFAULT_HEADER //201

                    }else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                    MESSAGES.DEFAULT_SEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message

                    return MESSAGES.DEFAULT_HEADER //201
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validar //400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//Atualiza um Especie buscando pelo ID
const atualizarEspecie = async function (Especie, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {


            //Cgana a função de validar todos os dados de Especie
            let validar = await validarDadosEspecie(Especie)
            if (!validar) {

                //Validação de ID válido, chama a função da controller que verifica no db se o id existe e valida o ID
                let validarID = await buscarEspecieID(id)

                if (validarID.status_code == 200) {

                    Especie.id = Number(id)
                    //Validação do ID, se existe no BD 

                    //Validação de ID válido
                    //Processamento
                    //Chama a função para inserir um novo Especie no banco de dados
                    let resultEspecies = await EspecieDAO.setUpdateEspecies(Especie)
                    if (resultEspecies) {
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Especie  = Especie

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //A função buscarEspecieID poderá retornar (400 ou 404 ou 500)
                }
            } else {
                return validar //400 referente a validação dos dados

            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //400 referente a validação do ID
        }

    } catch (error) {
        console.log(error)
        
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//Excluir um Especie buscando pelo ID
const excluirEspecie = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação da chegada do ID
        if(!isNaN(id) && id != '' && id != null && id > 0){

            //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
            let validarID = await buscarEspecieID(id)

            if(validarID.status_code == 200){

                let resultEspecies = await EspecieDAO.setDeleteEspecies(Number(id))

                if(resultEspecies){
                    
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Especie = resultEspecies
                        delete MESSAGES.DEFAULT_HEADER.items
                        return MESSAGES.DEFAULT_HEADER //200
            
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else{
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        }else{
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        console.log(error)

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
//validação dos dados de cadastro e atualização do Especie
const validarDadosEspecie = async function (Especie) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    //Validações de todas entradas de dados

    if (Especie.nome == '' || Especie.nome == undefined || Especie.nome == null || Especie.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Especie.habitat == undefined || Especie.habitat == '' || Especie.habitat == null || Especie.habitat.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Habitat incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Especie.descricao == undefined || Especie.descricao == '' || Especie.descricao == null || Especie.descricao.length > 100) {   
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[descricao incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS


    } else {
        return false
    }
}

module.exports = {
    listarEspecies,
    buscarEspecieID,
    inserirEspecie,
    atualizarEspecie,
    excluirEspecie
}