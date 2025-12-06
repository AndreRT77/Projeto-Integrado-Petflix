/********************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD para o CRUD de Adoções
 * Data: 04/12/2025
 * Autor: João Pedro Teodoro Nunes Correia
 * Versão: 1.0
 *******************************************************************************************************/

// Import da biblioteca do Prisma Client
const { PrismaClient } = require('@prisma/client')
// Instância da classe PrismaClient
const prisma = new PrismaClient()

// Retorna todos os pedidos de adoção do banco de dados
const selectAllPedidosAdocao = async function() {
    try {
        // Script SQL para buscar todos os pedidos
        let sql = 'SELECT * FROM tbl_pedido_adocao'

        // Executa o script no banco de dados e armazena o resultado
        let rsPedidos = await prisma.$queryRawUnsafe(sql)

        // Retorna a lista de pedidos
        return rsPedidos

    } catch (error) {
        return false
    }
}

// Retorna um pedido de adoção do banco de dados filtrando pelo ID
const selectByIdPedidoAdocao = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_pedido_adocao WHERE id = ${id}`
        let pedidoAdocao = await prisma.$queryRawUnsafe(sql)
        return pedidoAdocao
    } catch (error) {
        return false
    }
}

// Insere um novo pedido de adoção no banco de dados
const insertPedidoAdocao = async function(dadosPedido) {
    try {
        let sql = `
            INSERT INTO tbl_pedido_adocao (id_pet, id_responsavel_pet)
            VALUES (${dadosPedido.id_pet}, ${dadosPedido.id_responsavel_pet})
        `
        let result = await prisma.$executeRawUnsafe(sql)
        return !!result
    } catch (error) {
        return false
    }
}

// Atualiza um pedido de adoção existente no banco de dados
const updatePedidoAdocao = async function(dadosPedido) {
    try {
        let sql = `
            UPDATE tbl_pedido_adocao
            SET 
                id_pet = ${dadosPedido.id_pet},
                id_responsavel_pet = ${dadosPedido.id_responsavel_pet}
            WHERE id = ${dadosPedido.id}
        `
        let result = await prisma.$executeRawUnsafe(sql)
        return !!result
    } catch (error) {
        return false
    }
}

// Deleta um pedido de adoção do banco de dados
const deletePedidoAdocao = async function(id) {

    try {
        let sql = `DELETE FROM tbl_pedido_adocao WHERE id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        return !!result
    } catch (error) {
        return false
    }
}

// Retorna o último ID inserido na tabela de pedidos de adoção
const selectLastId = async function() {

    try {
        
        let sql = 'SELECT id FROM tbl_pedido_adocao ORDER BY id DESC LIMIT 1'
        let rsPedido = await prisma.$queryRawUnsafe(sql)

        if (rsPedido && rsPedido.length > 0) {
            return rsPedido[0].id
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

module.exports = {
    selectAllPedidosAdocao,
    selectByIdPedidoAdocao,
    insertPedidoAdocao,
    updatePedidoAdocao,
    deletePedidoAdocao,
    selectLastId
}
