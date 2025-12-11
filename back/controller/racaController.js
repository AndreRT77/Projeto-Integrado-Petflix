/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a model para o CRUD de Racas 
 * Data:09/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da model do DAO do Raca
const RacaDAO = require('../../model/DAO/Raca.js')
const controllerEspecie = require('./especie_controller.js')
const controllerAbrigo = require('./abrigo_controller.js')
const controllerOng = require('./ong_controller.js')


//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos os Racas 
const listarRacas = async function () {
    //Criando um objeto novo para as mensagens 
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        //Chama a função do DAO para retornar a lista de Racas do BD
        let resultRacas = await RacaDAO.getSelectAllRacas()
        if (resultRacas) {
            if (resultRacas.length > 0) {

                //Processamento para adicionar os gêneros aos Racas 
                for (Raca of resultRacas){
                    let resultEspecies = await controllerEspecie.listarRacasIdEspecie(Raca.id)
                    if(resultEspecies.status_code == 200)
                    Raca.Especie = resultEspecies.items.RacaEspecie

                }
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Racas = resultRacas

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
//Retorna um Raca filtrando pelo ID
const buscarRacaID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultRacas = await RacaDAO.getSelectByIdRacas(Number(id))

            if (resultRacas.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Raca = resultRacas

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

//Insere um Raca
const inserirRaca = async function (Raca, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Cgana a função de validar todos os dados de Raca
            let validar = await validarDadosRaca(Raca)
            if (!validar) {


                //Processamento
                //Chama a função para inserir um novo Raca no banco de dados
                let resultRacas = await RacaDAO.setInsertRacas(Raca)
                if (resultRacas) {
                    //Chama a função para receber o ID gerado no banco de dados
                    let lastID = await RacaDAO.getSelectLastID()
                    if(lastID){
                        //Adiciona o ID no JSON com os dados do Raca
                    Raca.id = lastID
                        for(Especie of Raca.Especie){
                     // Processar a inserção dos dados na tabela de relação entre Raca e Especie
                    //  Raca.Especie.forEach(async (Especie) => {
                        let RacaEspecie = { 
                            id_Raca: lastID, 
                            id_Especie: Especie.id
                        }
                        let resultRacasEspecie = await controllerEspecie.inserirRacaEspecie(RacaEspecie,contentType)
                        if (resultRacasEspecie.status_code != 201)
                            return MESSAGES.ERROR.ERROR_RELATION_INSERT
                    }
                    
                    
                    Raca.id = lastID
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message

                    delete Raca.Especie

                    //Pesquisa no BD todos os gêmeros que foram associados ao Raca
                    let resultDadosEspecie = await controllerEspecie.listarRacasIdEspecie(lastID)


                    //Cria novamente o atributo Especie e coloca o resultado do BD com os gêneros
                    Raca.Especie = resultDadosEspecie

                    MESSAGES.DEFAULT_HEADER.items = Raca

                   

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

//Atualiza um Raca buscando pelo ID
const atualizarRaca = async function (Raca, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {


            //Cgana a função de validar todos os dados de Raca
            let validar = await validarDadosRaca(Raca)
            if (!validar) {

                //Validação de ID válido, chama a função da controller que verifica no db se o id existe e valida o ID
                let validarID = await buscarRacaID(id)

                if (validarID.status_code == 200) {

                    Raca.id = Number(id)
                    //Validação do ID, se existe no BD 

                    //Validação de ID válido
                    //Processamento
                    //Chama a função para inserir um novo Raca no banco de dados
                    let resultRacas = await RacaDAO.setUpdateRacas(Raca)
                    if (resultRacas) {
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Raca  = Raca

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //A função buscarRacaID poderá retornar (400 ou 404 ou 500)
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

//Excluir um Raca buscando pelo ID
const excluirRaca = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação da chegada do ID
        if(!isNaN(id) && id != '' && id != null && id > 0){

            //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
            let validarID = await buscarRacaID(id)

            if(validarID.status_code == 200){

                let resultRacas = await RacaDAO.setDeleteRacas(Number(id))

                if(resultRacas){
                    
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Raca = resultRacas
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
//validação dos dados de cadastro e atualização do Raca
//******************************************FALTA ACABAR ISSO, VER QND CHEGAR*****************************************
const validarDadosRaca = async function (Raca) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    //Validações de todas entradas de dados

    if (Raca.nome == '' || Raca.nome == undefined || Raca.nome == null || Raca.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Raca.idade == undefined || Raca.idade == null || Raca.idade.length > 40) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Idade incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Raca.Raca == undefined || Raca.Raca == '' || Raca.Raca == null || Raca.Raca.length > 100) {   
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Raça incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Raca.sexo == '' || Raca.sexo == undefined || Raca.sexo == null || Raca.sexo.length > 15) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Sexo incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Raca.tamanho == '' || Raca.tamanho == undefined || Raca.tamanho == null || Raca.tamanho.length > 14) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[tamanho incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }    else if (Raca.status_adocao == undefined || Raca.status_adocao == null || Raca.status_adocao.length > 20) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Status incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }    else if (Raca.nacionalidade == '' || Raca.nacionalidade == undefined || Raca.nacionalidade == null || Raca.nacionalidade.length > 56) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nacionalidade incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }    else if (Raca.necessidades_especiais == '' || Raca.necessidades_especiais == undefined || Raca.necessidades_especiais == null) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Necessidades incorretas]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }    else if (Raca.descricao == '' || Raca.descricao == undefined || Raca.descricao == null) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Descricao incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Raca.midia == undefined || Raca.midia == null) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[midia incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarRacas,
    buscarRacaID,
    inserirRaca,
    atualizarRaca,
    excluirRaca
}