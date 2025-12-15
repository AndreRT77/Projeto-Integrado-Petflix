/*******************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a especie
 * Data:11/12/2025
 * Autor: André Roberto Tavares
 * Versão: 1.0
 *******************************************************************************************/

//Import da dependencia do Prisma que permite a execução de script sql no banco de dados
const {PrismaClient} = require('@prisma/client')

//Cria uma novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna uma lista de todos os Especies do banco de dados
const getSelectAllEspecies = async () => {
    try {
        let sql = 'select * from tbl_especie order by id desc';
        let result = await prisma.$queryRawUnsafe(sql);

        if (result) {
            return result;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

//Retorna um Especie filtrando pelo id do banco de dados
const getSelectByIdEspecies = async function (id) {
    try {
        let sql = `select * from tbl_Especie where id = ${id}`;
        let result = await prisma.$queryRawUnsafe(sql);

        if (result) {
            return result;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

//Retorna o último ID gerado no BD
const getSelectLastID = async function () {
    try {
        //Script SQL para retornar apenas o último ID do BD
        let sql = `select id from tbl_especie order by id desc limit 1`;
        let result = await prisma.$queryRawUnsafe(sql);

        if (result && result.length > 0) {
            return Number(result[0].id);
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

//Insere um Especie no banco de dados
const setInsertEspecies = async function (dadosEspecie) {
    try {
        let sql = `INSERT INTO tbl_especie (nome, habitat, descricao) VALUES ('${dadosEspecie.nome}', '${dadosEspecie.habitat}', '${dadosEspecie.descricao}')`;
        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

//Altera uma especie no banco de dados
const setUpdateEspecies = async function (id, dadosEspecie) {
    try {
        let sql = `UPDATE tbl_Especie SET nome='${dadosEspecie.nome}', habitat='${dadosEspecie.habitat}', descricao='${dadosEspecie.descricao}' WHERE id = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

//Exclui um Especie pelo ID no banco de dados
const setDeleteEspecies = async function (id) {
    try {
        let sql = `delete from tbl_Especie where id = ${id}`;
        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};


// Busca a espécie associada a um Pet 
const listarEspeciesPorPet = async function (idPet) {
    try {
        // Esta query assume que a tabela 'tbl_pet' tem uma coluna 'id_especie'
        // Usando $queryRaw para passar o parâmetro de forma segura
        let result = await prisma.$queryRaw`
            SELECT
                tbl_especie.id,
                tbl_especie.nome,
                tbl_especie.habitat,
                tbl_especie.descricao
            FROM tbl_pet
            INNER JOIN tbl_especie ON tbl_pet.id_especie = tbl_especie.id
            WHERE tbl_pet.id = ${idPet}
        `;

        // Como um pet só tem uma espécie, retornamos o primeiro (e único) resultado
        if (result && result.length > 0) {
            return result[0];
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports = {
    getSelectAllEspecies,
    getSelectByIdEspecies,
    getSelectLastID,
    setInsertEspecies,
    setUpdateEspecies,
    setDeleteEspecies,
    listarEspeciesPorPet
};