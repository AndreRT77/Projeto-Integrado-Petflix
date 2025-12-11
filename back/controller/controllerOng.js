/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a model para o CRUD de Ongs 
 * Data:03/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da model do DAO do Ong
const OngDAO = require('../../model/DAO/Ong.js')
const controllerEspecie = require('./especie_controller.js')
const controllerAbrigo = require('./abrigo_controller.js')
const controllerOng = require('./ong_controller.js')


//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos os Ongs 
const listarOngs = async function () {
    //Criando um objeto novo para as mensagens 
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        //Chama a função do DAO para retornar a lista de Ongs do BD
        let resultOngs = await OngDAO.getSelectAllOngs()
        if (resultOngs) {
            if (resultOngs.length > 0) {

                //Processamento para adicionar os gêneros aos Ongs 
                for (Ong of resultOngs){
                    let resultEspecies = await controllerEspecie.listarOngsIdEspecie(Ong.id)
                    if(resultEspecies.status_code == 200)
                    Ong.Especie = resultEspecies.items.OngEspecie

                }
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Ongs = resultOngs

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
//Retorna um Ong filtrando pelo ID
const buscarOngID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultOngs = await OngDAO.getSelectByIdOngs(Number(id))

            if (resultOngs.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Ong = resultOngs

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

//Insere um Ong
const inserirOng = async function (Ong, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Cgana a função de validar todos os dados de Ong
            let validar = await validarDadosOng(Ong)
            if (!validar) {


                //Processamento
                //Chama a função para inserir um novo Ong no banco de dados
                let resultOngs = await OngDAO.setInsertOngs(Ong)
                if (resultOngs) {
                    //Chama a função para receber o ID gerado no banco de dados
                    let lastID = await OngDAO.getSelectLastID()
                    if(lastID){
                        //Adiciona o ID no JSON com os dados do Ong
                    Ong.id = lastID
                        for(Especie of Ong.Especie){
                     // Processar a inserção dos dados na tabela de relação entre Ong e Especie
                    //  Ong.Especie.forEach(async (Especie) => {
                        let OngEspecie = { 
                            id_Ong: lastID, 
                            id_Especie: Especie.id
                        }
                        let resultOngsEspecie = await controllerEspecie.inserirOngEspecie(OngEspecie,contentType)
                        if (resultOngsEspecie.status_code != 201)
                            return MESSAGES.ERROR.ERROR_RELATION_INSERT
                    }
                    
                    
                    Ong.id = lastID
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message

                    delete Ong.Especie

                    //Pesquisa no BD todos os gêmeros que foram associados ao Ong
                    let resultDadosEspecie = await controllerEspecie.listarOngsIdEspecie(lastID)


                    //Cria novamente o atributo Especie e coloca o resultado do BD com os gêneros
                    Ong.Especie = resultDadosEspecie

                    MESSAGES.DEFAULT_HEADER.items = Ong

                   

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

//Atualiza um Ong buscando pelo ID
const atualizarOng = async function (Ong, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {


            //Cgana a função de validar todos os dados de Ong
            let validar = await validarDadosOng(Ong)
            if (!validar) {

                //Validação de ID válido, chama a função da controller que verifica no db se o id existe e valida o ID
                let validarID = await buscarOngID(id)

                if (validarID.status_code == 200) {

                    Ong.id = Number(id)
                    //Validação do ID, se existe no BD 

                    //Validação de ID válido
                    //Processamento
                    //Chama a função para inserir um novo Ong no banco de dados
                    let resultOngs = await OngDAO.setUpdateOngs(Ong)
                    if (resultOngs) {
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Ong  = Ong

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //A função buscarOngID poderá retornar (400 ou 404 ou 500)
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

//Excluir um Ong buscando pelo ID
const excluirOng = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação da chegada do ID
        if(!isNaN(id) && id != '' && id != null && id > 0){

            //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
            let validarID = await buscarOngID(id)

            if(validarID.status_code == 200){

                let resultOngs = await OngDAO.setDeleteOngs(Number(id))

                if(resultOngs){
                    
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Ong = resultOngs
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
//validação dos dados de cadastro e atualização do Ong
const validarDadosOng = async function (Ong) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES));
    // Validações de todas entradas de dados

    if (Ong.nome == '' || Ong.nome == undefined || Ong.nome == null || Ong.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]';
        return MESSAGES.ERROR_REQUIRED_FIELDS;

    } else if (Ong.cnpj == '' || Ong.cnpj == undefined || Ong.cnpj == null || Ong.cnpj.length > 20) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[CNPJ incorreto]';
        return MESSAGES.ERROR_REQUIRED_FIELDS;

    } else if (Ong.informacoes == '' || Ong.informacoes == undefined || Ong.informacoes == null) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Informações incorretas]';
        return MESSAGES.ERROR_REQUIRED_FIELDS;

    } else if (Ong.email == '' || Ong.email == undefined || Ong.email == null || Ong.email.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Email incorreto]';
        return MESSAGES.ERROR_REQUIRED_FIELDS;

    } else if (Ong.contato == '' || Ong.contato == undefined || Ong.contato == null || Ong.contato.length > 20) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Contato incorreto]';
        return MESSAGES.ERROR_REQUIRED_FIELDS;

    } else {
        return false;
    }
};

module.exports = {
    listarOngs,
    buscarOngID,
    inserirOng,
    atualizarOng,
    excluirOng
}