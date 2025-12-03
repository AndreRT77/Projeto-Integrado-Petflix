/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API da locadora de pets
 * Data:03/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

const express    = require('express') //Responsável pela API
const cors       = require('cors') //Responsável pelas Permissões da API (APP)
const bodyParser = require('body-parser') //Responsável por Gerenciar a chegada dos dados da API com o front 

//Cria um objeto especialista do formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

//retorna a porta do servidor atual ou colocamos um porta local 
const PORT = process.PORT || 8080

//Criando uma instancia de uma classe do express 
const app = express()

//Configuração de permissões
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*') //Servidor de origem da API
    response.header('Access-Control-Allow-Methods', 'GET') //Verbos permitidos na API
    //Carrega as configurações no CORS da API
    app.use(cors())
    next() //Próximo, carregar os próximos endpoints
})

const route_pet = require('./routes/route_pet.js')


app.use(route_pet)


app.listen(PORT, function(){
    console.log('API aguardando requisições !!!')
})