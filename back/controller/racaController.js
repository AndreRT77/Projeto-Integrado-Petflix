/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a model para o CRUD de Racas 
 * Data:09/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da model do DAO do Raca
const racaDAO = require('../model/raca.js')
// const controllerraca = require('./raca_controller.js') // Removido para evitar dependência circular



//Import do arquivo de mensagens
const MESSAGES = require('../module/config_messages.js');

//Retorna uma lista de todos os Racas 
const listarRacas = async function () {
    //Cria uma cópia do header padrão para a resposta
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))
    try {
        //Chama a função do DAO para retornar a lista de Racas do BD
        let resultRacas = await racaDAO.getSelectAllRacas()
        if (resultRacas) {
            if (resultRacas.length > 0) {

                //Processamento para adicionar os gêneros aos Racas 
                for (Raca of resultRacas){
                    // let resultracas = await controllerraca.listarRacasIdraca(Raca.id) // Lógica com erro, comentada por enquanto
                    // if(resultracas.status_code == 200)
                    // Raca.raca = resultracas.items.Racaraca

                }
                response.status = MESSAGES.SUCCESS_REQUEST.status
                response.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                response.items.racas = resultRacas

                return response // 200
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }


    } catch (error) {
        console.log(error)

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
//Retorna um Raca filtrando pelo ID
const buscarRacaID = async function (id) {
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))
    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultRacas = await racaDAO.getSelectByIdRacas(Number(id))

            if (resultRacas.length > 0) {
                response.status = MESSAGES.SUCCESS_REQUEST.status
                response.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                response.items.raca = resultRacas

                return response
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS));
            error.message += '[ID incorreto]';
            return error; //400
        }
    
    } catch (error) {
        console.log(error)

    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
}
}

//Insere um Raca
const inserirRaca = async function (Raca, contentType) {
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Cgana a função de validar todos os dados de Raca
            let validar = await validarDadosRaca(Raca)
            if (!validar) {


                //Processamento
                //Chama a função para inserir um novo Raca no banco de dados
                let resultRacas = await racaDAO.setInsertRacas(Raca)
                if (resultRacas) {
                    //Chama a função para receber o ID gerado no banco de dados
                    let lastID = await racaDAO.getSelectLastID()
                    if(lastID){
                        //Adiciona o ID no JSON com os dados do Raca
                    Raca.id = lastID
                        for(raca of Raca.raca){
                     // Processar a inserção dos dados na tabela de relação entre Raca e raca
                    //  Raca.raca.forEach(async (raca) => {
                        let Racaraca = { 
                            id_Raca: lastID, 
                            id_raca: raca.id
                        }
                        // let resultRacasraca = await controllerraca.inserirRacaraca(Racaraca,contentType) // Lógica com erro, comentada por enquanto
                        // if (resultRacasraca.status_code != 201)
                        //     return MESSAGES.ERROR.ERROR_RELATION_INSERT
                    }
                    
                    
                    Raca.id = lastID
                    response.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    response.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    response.message = MESSAGES.SUCCESS_CREATED_ITEM.message

                    delete Raca.raca

                    //Pesquisa no BD todos os gêmeros que foram associados ao Raca
                    // let resultDadosraca = await controllerraca.listarRacasIdraca(lastID) // Lógica com erro, comentada por enquanto


                    //Cria novamente o atributo raca e coloca o resultado do BD com os gêneros
                    Raca.raca = resultDadosraca

                    response.items = Raca

                    return response //201

                    }else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
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
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))
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
                    let resultRacas = await racaDAO.setUpdateRacas(Raca)
                    if (resultRacas) {
                        response.status      = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        response.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        response.message     = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        response.items.raca  = Raca

                        return response //200
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
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))

    try {

        //Validação da chegada do ID
        if(!isNaN(id) && id != '' && id != null && id > 0){

            //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
            let validarID = await buscarRacaID(id)

            if(validarID.status_code == 200){

                let resultRacas = await racaDAO.setDeleteRacas(Number(id))

                if(resultRacas){
                    
                        response.status      = MESSAGES.SUCCESS_DELETED_ITEM.status
                        response.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                        response.message     = MESSAGES.SUCCESS_DELETED_ITEM.message
                        delete response.items
                        return response //200
            
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else{
                return validarID; //404 ou 400
            }
        }else{
            let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS));
            error.message += ' [ID incorreto]';
            return error; //400
        }

    } catch (error) {
        console.log(error)

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
//validação dos dados de cadastro e atualização do Raca
const validarDadosRaca = async function (Raca) {
    let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS));
    let hasError = false;
    // Validações de todas entradas de dados

    if (Raca.nome == '' || Raca.nome == undefined || Raca.nome == null || Raca.nome.length > 100) {
        error.message += '[Nome incorreto]';
        hasError = true;

    } else if (Raca.expectativa_de_vida == undefined || Raca.expectativa_de_vida == null || isNaN(Raca.expectativa_de_vida) || Raca.expectativa_de_vida <= 0) {
        error.message += '[Expectativa de vida incorreta]';
        hasError = true;

    } else if (Raca.saude == '' || Raca.saude == undefined || Raca.saude == null) {
        error.message += '[Saúde incorreta]';
        hasError = true;

    } else if (Raca.peso_medio == undefined || Raca.peso_medio == null || isNaN(Raca.peso_medio) || Raca.peso_medio <= 0) {
        error.message += '[Peso médio incorreto]';
        hasError = true;

    } else if (Raca.porte == '' || Raca.porte == undefined || Raca.porte == null || !['Pequeno', 'Médio', 'Grande', 'Gigante'].includes(Raca.porte)) {
        error.message += '[Porte incorreto]';
        hasError = true;

    } else if (Raca.capacidades == '' || Raca.capacidades == undefined || Raca.capacidades == null) {
        error.message += '[Capacidades incorretas]';
        hasError = true;

    } else if (Raca.id_especie == undefined || Raca.id_especie == null || isNaN(Raca.id_especie) || Raca.id_especie <= 0) {
        error.message += '[ID da espécie incorreto]';
        hasError = true;
    }

    if (hasError) {
        return error;
    } else {
        return false;
    }
};

module.exports = {
    listarRacas,
    buscarRacaID,
    inserirRaca,
    atualizarRaca,
    excluirRaca
}