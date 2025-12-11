/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a model para o CRUD de Pets 
 * Data:03/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da model do DAO do Pet
const PetDAO = require('../model/pet')
const controllerEspecie = require('./especie_controller.js')
const controllerAbrigo = require('./abrigo_controller.js')
const controllerOng = require('./ong_controller.js')


//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos os Pets 
const listarPets = async function () {
    //Criando um objeto novo para as mensagens 
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        //Chama a função do DAO para retornar a lista de Pets do BD
        let resultPets = await PetDAO.getSelectAllPets()
        if (resultPets) {
            if (resultPets.length > 0) {

                //Processamento para adicionar os gêneros aos Pets 
                for (Pet of resultPets){
                    let resultEspecies = await controllerEspecie.listarPetsIdEspecie(Pet.id)
                    if(resultEspecies.status_code == 200)
                    Pet.Especie = resultEspecies.items.PetEspecie

                }
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Pets = resultPets

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
//Retorna um Pet filtrando pelo ID
const buscarPetID = async function (id) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {
            let resultPets = await PetDAO.getSelectByIdPets(Number(id))

            if (resultPets.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.Pet = resultPets

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

//Insere um Pet
const inserirPet = async function (Pet, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            //Cgana a função de validar todos os dados de Pet
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
                        for(Especie of Pet.Especie){
                     // Processar a inserção dos dados na tabela de relação entre Pet e Especie
                    //  Pet.Especie.forEach(async (Especie) => {
                        let PetEspecie = { 
                            id_Pet: lastID, 
                            id_Especie: Especie.id
                        }
                        let resultPetsEspecie = await controllerEspecie.inserirPetEspecie(PetEspecie,contentType)
                        if (resultPetsEspecie.status_code != 201)
                            return MESSAGES.ERROR.ERROR_RELATION_INSERT
                    }
                    
                    
                    Pet.id = lastID
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message

                    delete Pet.Especie

                    //Pesquisa no BD todos os gêmeros que foram associados ao Pet
                    let resultDadosEspecie = await controllerEspecie.listarPetsIdEspecie(lastID)


                    //Cria novamente o atributo Especie e coloca o resultado do BD com os gêneros
                    Pet.Especie = resultDadosEspecie

                    MESSAGES.DEFAULT_HEADER.items = Pet

                   

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

//Atualiza um Pet buscando pelo ID
const atualizarPet = async function (Pet, id, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {


            //Cgana a função de validar todos os dados de Pet
            let validar = await validarDadosPet(Pet)
            if (!validar) {

                //Validação de ID válido, chama a função da controller que verifica no db se o id existe e valida o ID
                let validarID = await buscarPetID(id)

                if (validarID.status_code == 200) {

                    Pet.id = Number(id)
                    //Validação do ID, se existe no BD 

                    //Validação de ID válido
                    //Processamento
                    //Chama a função para inserir um novo Pet no banco de dados
                    let resultPets = await PetDAO.setUpdatePets(Pet)
                    if (resultPets) {
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Pet  = Pet

                        return MESSAGES.DEFAULT_HEADER //200
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
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        //Validação da chegada do ID
        if(!isNaN(id) && id != '' && id != null && id > 0){

            //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
            let validarID = await buscarPetID(id)

            if(validarID.status_code == 200){

                let resultPets = await PetDAO.setDeletePets(Number(id))

                if(resultPets){
                    
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Pet = resultPets
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
//validação dos dados de cadastro e atualização do Pet
const validarDadosPet = async function (Pet) {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    //Validações de todas entradas de dados

    if (Pet.nome == '' || Pet.nome == undefined || Pet.nome == null || Pet.nome.length > 100) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Pet.idade == undefined || Pet.idade == null || Pet.idade.length > 40) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Idade incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Pet.raca == undefined || Pet.raca == '' || Pet.raca == null || Pet.raca.length > 100) {   
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Raça incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Pet.sexo == '' || Pet.sexo == undefined || Pet.sexo == null || Pet.sexo.length > 15) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Sexo incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Pet.tamanho == '' || Pet.tamanho == undefined || Pet.tamanho == null || Pet.tamanho.length > 14) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[tamanho incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }    else if (Pet.status_adocao == undefined || Pet.status_adocao == null || Pet.status_adocao.length > 20) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Status incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }    else if (Pet.nacionalidade == '' || Pet.nacionalidade == undefined || Pet.nacionalidade == null || Pet.nacionalidade.length > 56) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nacionalidade incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }    else if (Pet.necessidades_especiais == '' || Pet.necessidades_especiais == undefined || Pet.necessidades_especiais == null) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Necessidades incorretas]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }    else if (Pet.descricao == '' || Pet.descricao == undefined || Pet.descricao == null) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Descricao incorreta]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (Pet.midia == undefined || Pet.midia == null) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += '[midia incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarPets,
    buscarPetID,
    inserirPet,
    atualizarPet,
    excluirPet
}