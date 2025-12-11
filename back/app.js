/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API da locadora de pets
 * Data: 06/12/2025
 * Autor: André Roberto Tavares / João Pedro Teodoro Nunes Correia
 * Versão: 1.0
 *******************************************************************************************/


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

//Retorna a porta do servidor atual ou colocamos uma porta local
const PORT = process.env.PORT || 8080

//Criando uma instancia do express
const app = express()

//Configuração de permissões 
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*') //Servidor de origem da API
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') //Verbos permitidos
    //Carrega as configurações no CORS da API
    app.use(cors())
    next()  //Próximo, carregar os próximos EndPoints
})

// parsear o corpo das requisições no formato JSON
app.use(bodyParserJSON);

// Import e configuração das rotas
const route_pet = require('./routes/route_pet.js');
const route_raca = require('./routes/route_raca.js');
const route_especie = require('./routes/route_especie.js');
const route_responsavelPet = require('./routes/route_responsavelPet.js');
const route_tutorinteressado = require('./routes/route_tutorinteressado.js');
const route_adocao = require('./routes/route_adocao.js');
const route_abrigo = require('./routes/route_abrigo.js');
const route_ong = require('./routes/route_ong.js');

app.use(route_pet);
app.use(route_raca);
app.use(route_especie);
app.use(route_responsavelPet);
app.use(route_tutorinteressado);
app.use(route_adocao);
app.use(route_abrigo);
app.use(route_ong);

// Inicializa o servidor e o faz escutar na porta definida
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))