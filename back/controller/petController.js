/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a model para o CRUD de Pets 
 * Data:03/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da model do DAO do Pet
const PetDAO = require('../model/pet')
const especieDAO = require('../model/especie.js')
// const responsavelPetDAO = require('../model/responsavel_pet.js')
// const controllerAbrigo = require('./abrigo_controller.js')
// const controllerOng = require('./ong_controller.js')


//Import do arquivo de mensagens
const MESSAGES = require('../module/config_messages.js')

//Retorna uma lista de todos os Pets 
const listarPets = async function () {
    //Criando um objeto novo para as mensagens
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))
    try {
        //Chama a função do DAO para retornar a lista de Pets do BD
        let resultPets = await PetDAO.getSelectAllPets()
        if (resultPets) {
            if (resultPets.length > 0) {

                //Processamento para adicionar os gêneros aos Pets 
                for (Pet of resultPets){

                    // Busca as espécies associadas a este pet
                    let especiesDoPet = await especieDAO.listarEspeciesPorPet(Pet.id);
                    // Adiciona a lista de espécies ao objeto do pet
                    Pet.especies = especiesDoPet;
                }
                response.status = MESSAGES.SUCCESS_REQUEST.status
                response.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                response.items.Pets = resultPets

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
//Retorna um Pet filtrando pelo ID
const buscarPetID = async function (id) {
    //Cria uma cópia do header padrão para a resposta
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultPets = await PetDAO.getSelectByIdPets(Number(id))

            if (resultPets.length > 0) {
                response.status = MESSAGES.SUCCESS_REQUEST.status
                response.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                response.items.Pet = resultPets

                return response
            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }
        } else {
            // Retorna uma cópia para não modificar o objeto original
            let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS));
            error.message += '[ID incorreto]'
            return error //400
        }
    
    } catch (error) {
        console.log(error)

    return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
}
}

//Insere um Pet
const inserirPet = async function (Pet, contentType) {
    //Cria uma cópia do header padrão para a resposta
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Chama a função de validar todos os dados de Pet
            let validar = await validarDadosPet(Pet)
            if (!validar) {


                //Processamento
                //Chama a função para inserir um novo Pet no banco de dados
                let resultPets = await PetDAO.setInsertPets(Pet)
                if (resultPets) {
                    //Chama a função para receber o ID gerado no banco de dados
                    let lastID = await PetDAO.getSelectLastID()
                    if(lastID){
                        //Adiciona o ID no JSON com os dados do Pet
                    Pet.id = lastID
                        for(const Especie of Pet.Especie){
                     // Processar a inserção dos dados na tabela de relação entre Pet e Especie
                        let PetEspecie = { 
                            id_Pet: lastID, 
                            id_Especie: Especie.id
                        }
                        let resultPetsEspecie = await especieDAO.setInsertEspecies(PetEspecie);
                        if (!resultPetsEspecie)
                            return MESSAGES.ERROR_RELATION_INSERT
                    }
                    
                    
                    Pet.id = lastID
                    response.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    response.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    response.message = MESSAGES.SUCCESS_CREATED_ITEM.message

                    delete Pet.Especie

                    //Pesquisa no BD todos os gêneros que foram associados ao Pet
                    let resultDadosEspecie = await especieDAO.listarEspeciesPorPet(lastID)


                    //Cria novamente o atributo Especie e coloca o resultado do BD com os gêneros
                    Pet.especies = resultDadosEspecie

                    response.items = Pet

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

//Atualiza um Pet buscando pelo ID
const atualizarPet = async function (Pet, id, contentType) {
    //Cria uma cópia do header padrão para a resposta
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {


            //Chama a função de validar todos os dados de Pet
            let validar = await validarDadosPet(Pet)
            if (!validar) {

                //Validação de ID válido, chama a função da controller que verifica no db se o id existe e valida o ID
                let validarID = await buscarPetID(id)

                if (validarID.status_code == 200) {

                    //Processamento
                    //Chama a função para inserir um novo Pet no banco de dados
                    let resultPets = await PetDAO.setUpdatePets(id, Pet)
                    if (resultPets) {
                        Pet.id = Number(id)
                        response.status      = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        response.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        response.message     = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        response.items.Pet  = Pet

                        return response //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //A função buscarPetID poderá retornar (400 ou 404 ou 500)
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

//Excluir um Pet buscando pelo ID
const excluirPet = async function (id) {
    //Cria uma cópia do header padrão para a resposta
    let response = JSON.parse(JSON.stringify(MESSAGES.DEFAULT_HEADER))

    try {

        //Validação da chegada do ID
        if(!isNaN(id) && id != '' && id != null && id > 0){

            //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
            let validarID = await buscarPetID(id)

            if(validarID.status_code == 200){

                let resultPets = await PetDAO.setDeletePets(Number(id))

                if(resultPets){
                    
                        response.status      = MESSAGES.SUCCESS_DELETED_ITEM.status
                        response.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                        response.message     = MESSAGES.SUCCESS_DELETED_ITEM.message
                        delete response.items
                        return response //200
            
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else{
                // O erro original era not found, mas o buscarPetID pode retornar outros erros
                return validarID
            }
        }else{
            let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS));
            error.message += ' [ID incorreto]'
            return error //400
        }

    } catch (error) {
        console.log(error)

        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
//validação dos dados de cadastro e atualização do Pet
const validarDadosPet = async function (Pet) {
    let error = JSON.parse(JSON.stringify(MESSAGES.ERROR_REQUIRED_FIELDS))
    let hasError = false;

    //Validações de todas entradas de dados
    if (Pet.nome == '' || Pet.nome == undefined || Pet.nome == null || Pet.nome.length > 100) {
        error.message += '[Nome incorreto]'
        hasError = true;
    } else if (Pet.idade === undefined || Pet.idade === null || isNaN(Pet.idade)) {
        error.message += '[Idade incorreta]'
        hasError = true;
    } else if (Pet.sexo == '' || Pet.sexo == undefined || Pet.sexo == null || Pet.sexo.length > 15) {
        error.message += '[Sexo incorreto]'
        hasError = true;
    } else if (Pet.tamanho == '' || Pet.tamanho == undefined || Pet.tamanho == null || Pet.tamanho.length > 20) {
        error.message += '[tamanho incorreto]'
        hasError = true;
    }    else if (Pet.status_adocao == undefined || Pet.status_adocao == null || Pet.status_adocao.length > 50) {
        error.message += '[Status incorreto]'
        hasError = true;
    }    else if (Pet.nacionalidade == '' || Pet.nacionalidade == undefined || Pet.nacionalidade == null || Pet.nacionalidade.length > 56) {
        error.message += '[Nacionalidade incorreta]'
        hasError = true;
    }    else if (Pet.necessidades_especiais === undefined || Pet.necessidades_especiais === null) {
        error.message += '[Necessidades incorretas]'
        hasError = true;
    }    else if (Pet.descricao == '' || Pet.descricao == undefined || Pet.descricao == null) {
        error.message += '[Descricao incorreta]'
        hasError = true;
    } else if (Pet.midia === undefined || Pet.midia === null) {
        error.message += '[midia incorreto]'
        hasError = true;
    }

    if (hasError) {
        return error;
    } else {
        return false;
    }
}

module.exports = {
    listarPets,
    buscarPetID,
    inserirPet,
    atualizarPet,
    excluirPet
}