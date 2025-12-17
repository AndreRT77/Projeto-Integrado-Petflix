-- Triggers
DELIMITER $$
CREATE TRIGGER trg_pedido_atualiza_status_pet
AFTER UPDATE ON tbl_pedido_adocao
FOR EACH ROW
BEGIN
	IF NEW.status_processo = 'Aprovado' THEN
	UPDATE tbl_pet SET status_adocao = 'Em processo de adoção' where old.id = id;
    END IF;
END$$
DELIMITER ;

DELIMITER $$

DELIMITER $$

CREATE TRIGGER trg_pedido_atualiza_status_pet
AFTER UPDATE ON tbl_pedido_adocao
FOR EACH ROW
BEGIN
    -- Só executa se o status do processo foi alterado
    IF NEW.status_processo <> OLD.status_processo THEN
        
        IF NEW.status_processo = 'Aprovado' THEN
            UPDATE tbl_pet
            SET status_adocao = 'Já foi adotado'
            WHERE id = NEW.id_pet;

        ELSEIF NEW.status_processo = 'Negado' THEN
            UPDATE tbl_pet
            SET status_adocao = 'Disponível'
            WHERE id = NEW.id_pet;
        END IF;

    END IF;
END$$

DELIMITER $$

CREATE TRIGGER trg_pedido_insert_pet_em_processo
AFTER INSERT ON tbl_pedido_adocao
FOR EACH ROW
BEGIN
    UPDATE tbl_pet
    SET status_adocao = 'Em processo de adoção'
    WHERE id = NEW.id_pet;
END$$

DELIMITER ;


DROP TRIGGER trg_pedido_update_pet_status
DROP TRIGGER trg_pedido_insert_pet_em_processo

-- Teste 


-- Assim que colocar um pet na lista de interesses ele se torna um tutor interessado e ao colocar um pet para adoção ele se torna um responsável pet
-- Procedure ou trigger para atualizar a lista de interesses e para atualizar o histórico de adoção, conforme for adicionado 


UPDATE tbl_pedido_adocao
SET status_processo = 'Aprovado',
    informacoes = 'O pedido foi aprovado com sucesso',
    data_pedido = current_date()
    WHERE  id = 9
    
    
    DELIMITER $$

CREATE TRIGGER trg_pedido_insert_pet_em_processo
AFTER INSERT ON tbl_pedido_adocao
FOR EACH ROW
BEGIN
    UPDATE tbl_pet
    SET status_adocao = 'Em processo de adoção'
    WHERE id = NEW.id_pet;
END$$

CREATE TRIGGER trg_pedido_update_pet_status
AFTER UPDATE ON tbl_pedido_adocao
FOR EACH ROW
BEGIN
    IF NEW.status_processo <> OLD.status_processo THEN

        IF NEW.status_processo = 'Aprovado' THEN
            UPDATE tbl_pet
            SET status_adocao = 'Já foi Adotado'
            WHERE id = NEW.id_pet;

        ELSEIF NEW.status_processo = 'Negado' THEN
            UPDATE tbl_pet
            SET status_adocao = 'Disponível'
            WHERE id = NEW.id_pet;
        END IF;

    END IF;
END$$

DELIMITER ;


-- TRIGGER PARA ADICIONAR O PET ADOTADO NO HISTÓRICO DE ADOÇÃO

DELIMITER $$

CREATE TRIGGER trg_adicionar_pet_historico_adocao
AFTER UPDATE ON tbl_pet
FOR EACH ROW
BEGIN
	IF NEW.status_adocao <> OLD.status_adocao THEN
    
		IF NEW.status_adocao = 'Já foi adotado' then
        update tbl_historico_adocao
        SET pet = pet_nome,
        data_adocao = current_date()
	
end if;
end if;
end$$
delimiter ;

DROP TRIGGER trg_adicionar_pet_historico_adocao
DELIMITER $$

CREATE TRIGGER trg_adicionar_pet_historico_adocao
AFTER UPDATE ON tbl_pet
FOR EACH ROW
BEGIN
    -- Só executa se o status mudou para ADOTADO
    IF NEW.status_adocao <> OLD.status_adocao
       AND NEW.status_adocao = 'Já foi Adotado' THEN

        INSERT INTO tbl_historico_adocao (
            id_pet,
            id_tutor_interessado,
            pet,
            data_adocao
        )
        SELECT 
			p.nome,
            p.id_pet,
            p.id_tutor_interessado,
            CURRENT_DATE()
        FROM tbl_pedido_adocao pa join tbl_pet p
        on p.nome = pa.pet
        WHERE pa.id_pet = NEW.id
          AND p.status_processo = 'Aprovado'
        LIMIT 1;

    END IF;
END$$

DELIMITER ;
CREATE VIEW view_lista_funcionarios_cargos AS
Select f.id_funcionario, f.nome, fc.id_cargo, c.nome as cargo, fc.salario_atual, fc.data_fim
	From tb_funcionario f join tb_funcionario_cargo fc 
		on f.id_funcionario = fc.id_funcionario
			JOIN tb_cargo c
				on c.id_cargo = fc.id_cargo;


DROP TRIGGER trg_adicionar_pet_historico_adocao;



DELIMITER $$

CREATE TRIGGER trg_adicionar_pet_historico_adocao
AFTER UPDATE ON tbl_pet
FOR EACH ROW
BEGIN
    -- Executa apenas se o status mudou para "Já foi Adotado"
    IF NEW.status_adocao <> OLD.status_adocao
       AND NEW.status_adocao = 'Já foi Adotado' THEN

        INSERT INTO tbl_historico_adocao (
            pet,
            id_pet,
            id_tutor_interessado,
            data_adocao
        )
        SELECT
            p.nome,                    -- nome do pet
            p.id,                      -- id do pet
            pa.id_tutor_interessado,   -- tutor adotante
            CURRENT_DATE()
        FROM tbl_pedido_adocao pa
        JOIN tbl_pet p ON p.id = pa.id_pet
        WHERE pa.id_pet = NEW.id
          AND pa.status_processo = 'Aprovado'
        LIMIT 1;

    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_usuario_para_tutor_interessado
AFTER INSERT ON tbl_pedido_adocao
FOR EACH ROW
BEGIN
    DECLARE v_existe INT;

    -- verifica se já é tutor_interessado
    SELECT COUNT(*) INTO v_existe
    FROM tbl_tutor_interessado
    WHERE id = NEW.id_tutor_interessado;

    -- se não existir, insere usando dados do usuário
    IF v_existe = 0 THEN
        INSERT INTO tbl_tutor_interessado (
            id,
            nome,
            cpf,
            contato,
            email,
            data_nascimento,
            lista_de_interesse,
            preferencias
        )
        SELECT
            u.id,
            u.nome,
            u.cpf,
            u.contato,
            u.email,
            u.data_nascimento,
            u.lista_de_interesse,
            u.preferencias
        FROM tbl_usuario u
        WHERE u.id = NEW.id_tutor_interessado;
    END IF;
END$$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER trg_usuario_para_responsavel_pet
AFTER INSERT ON tbl_pet
FOR EACH ROW
BEGIN
    DECLARE v_existe INT;

    -- verifica se já é responsável
    SELECT COUNT(*) INTO v_existe
    FROM tbl_responsavel_pet
    WHERE id = NEW.id_responsavel_pet;

    -- se não existir, cria o responsável
    IF v_existe = 0 THEN
        INSERT INTO tbl_responsavel_pet (
            id,
            nome,
            cpf,
            contato,
            email
        )
        SELECT
            u.id,
            u.nome,
            u.cpf,
            u.contato,
            u.email
        FROM tbl_usuario u
        WHERE u.id = NEW.id_responsavel_pet;
    END IF;
END$$

DELIMITER ;

	







