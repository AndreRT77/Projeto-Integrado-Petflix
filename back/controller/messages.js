/******************************************************************************************************************
 * Objetivo: Arquivo responsável pela padronização de mensagens de Erro, Sucesso e etc.
 * Data: 06/12/2025
 * Autor: João Pedro Teodoro Nunes Correia
 * Versão: 1.0
 *****************************************************************************************************************/

const ERROR_INVALID_ID = { status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido.' };
const ERROR_NOT_FOUND = { status: false, status_code: 404, message: 'Nenhum item foi encontrado na requisição.' };
const ERROR_INTERNAL_SERVER = { status: false, status_code: 500, message: 'Ocorreram erros no processamento de dados no servidor. Contate o administrador da API.' };
const ERROR_INVALID_CONTENT_TYPE = { status: false, status_code: 415, message: 'O tipo de mídia (Content-Type) da requisição não é compatível com o servidor. Esperado: application/json' };
const ERROR_REQUIRED_FIELDS = { status: false, status_code: 400, message: 'Existem campos obrigatórios que não foram preenchidos ou foram preenchidos incorretamente.' };

const SUCCESS_CREATED_ITEM = { status: true, status_code: 201, message: 'Item criado com sucesso.' };
const SUCCESS_UPDATED_ITEM = { status: true, status_code: 200, message: 'Item atualizado com sucesso.' };
const SUCCESS_DELETED_ITEM = { status: true, status_code: 200, message: 'Item deletado com sucesso.' };

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER,
    ERROR_INVALID_CONTENT_TYPE,
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATED_ITEM,
    SUCCESS_UPDATED_ITEM,
    SUCCESS_DELETED_ITEM
};