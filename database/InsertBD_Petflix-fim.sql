-- INSERTS 

INSERT INTO tbl_usuário (nome, cpf, contato, email, data_nascimento, lista_de_interesse, preferencias) VALUES 
('Beatriz Mendes', '111.222.333-44', '11955554444', 'bia.mendes@email.com', '1995-05-20', 'Cães médios', 'Animais agitados');

INSERT INTO tbl_responsavel_pet (nome, cpf, contato, email) VALUES 
('Ana Souza', '123.456.789-00', '11999998888', 'ana.souza@email.com'),     -- ID 1
('Carlos Lima', '987.654.321-11', '11988887777', 'carlos.lima@email.com'); -- ID 2

INSERT INTO tbl_abrigo (nome, cnpj, informacoes, contato, email) VALUES 
('Abrigo Patinhas Felizes', '12.345.678/0001-90', 'Especializado em cães idosos.', '1133334444', 'contato@patinhas.com'), -- ID 1
('Recanto dos Bichos', '98.765.432/0001-10', 'Resgate de animais de rua.', '1133335555', 'adm@recanto.com');            -- ID 2

INSERT INTO tbl_ong (nome, cnpj, informacoes, email, contato) VALUES 
('ONG Amigos de 4 Patas', '11.222.333/0001-44', 'Campanhas de castração.', 'fale@amigos4patas.org', '11977776666'), -- ID 1
('SOS Vida Animal', '55.666.777/0001-88', 'Resgate de emergência.', 'sos@vidaanimal.org', '11966665555');           -- ID 2

INSERT INTO tbl_tutor_interessado (nome, cpf, contato, email, data_nascimento, lista_de_interesse, preferencias) VALUES 
('Beatriz Mendes', '111.222.333-44', '11955554444', 'bia.mendes@email.com', '1995-05-20', 'Cães médios', 'Animais agitados'), -- ID 1
('João Paulo', '555.666.777-88', '11944443333', 'joao.paulo@email.com', '1988-12-10', 'Gatos', '');         -- ID 2

INSERT INTO tbl_abrigo_ong(status_patrocinio, tipo_paceria, data_inicio, id_ong, id_abrigo)
VALUES ('Ativo', 'Financeira', 31/10/2013, 1, 1);

-- 5. Espécies
INSERT INTO tbl_especie (nome, habitat) VALUES 
('Cachorro', 'Doméstico'), 
('Gato', 'Doméstico');     

INSERT INTO tbl_raca (nome, expectativa_de_vida, saude, peso_medio, porte, capacidades, id_especie)
VALUES ('Husky Siberiano', 15, 'Saudável', 27, 'Grande', 'Carregar trenó, ficar em lugares extramente frios', 1);

INSERT INTO tbl_pet (nome, idade, sexo, tamanho, status_adocao, nacionalidade, descricao, midia, id_especie, id_responsavel_pet, id_abrigo)
VALUES ('Aenocyon', 3, 'Macho', 60, 'Disponível', 'Brasil', 'Amigável e agitado', 'https://www.petz.com.br/blog/wp-content/uploads/2023/07/husky-siberiano-e-bravo.jpg', 1, 1, 1 );
INSERT INTO tbl_pet (nome, idade, sexo, tamanho, status_adocao, nacionalidade, descricao, midia, id_especie, id_responsavel_pet, id_abrigo)
VALUES ('Cleito', 2, 'Macho', 40, 'Disponível', 'Brasil', 'Inteligente, antipático e reservado', 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Photograph_of_Socks_the_Cat-_07-13-1994_%286461517483%29.jpg', 8, 4, 4 );

INSERT INTO tbl_endereco_abrigo (logradouro, numero, bairro, cidade, uf, cep, id_abrigo)
VALUES (' R Benedito Pereira Leite', 14,'Centro', 'Jandira', 'SP', '06600055', 1);

INSERT INTO tbl_endereco_ong (logradouro, numero, bairro, cidade, uf, cep, id_ong)
VALUES (' Rua Albino Imparato', 320,'Vila Guanabara', 'Duque de Caxias', 'RJ', '25080000', 1);

INSERT INTO tbl_endereco_responsavel_pet (logradouro, numero, bairro, cidade, uf, cep, id_responsavel_pet)
VALUES ('Rua Barão de Vitória', 102,'Casa Grande', 'Diadema', 'SP', '09961660', 1);

INSERT INTO tbl_endereco_tutor_interessado (logradouro, numero, bairro, cidade, uf, cep, id_tutor_interessado)
VALUES ('Rua Serra de Bragança', 391,'Vila Gomes Cardim', 'São Paulo', 'SP', '03318000', 1);

INSERT INTO tbl_pedido_adocao (status_processo, informacoes, data_pedido, id_tutor_interessado, id_responsavel_pet, id_pet)
VALUES ('Em análise', 'Cachorro adotado', 20/11/2025, 4, 4, 16);

INSERT INTO tbl_historico_adocao (pet, informacoes, data_adocao, observacoes, id_tutor_interessado)
VALUES ('Lunos', 'Corvo adotado', 07/09/2017, 'Está até hoje com a Ave', 1);

INSERT INTO tbl_pedido_adocao (status_processo, informacoes, data_pedido, id_tutor_interessado, id_responsavel_pet, id_pet )
VALUES ('Em análise', 'Pedido para adoção do gato Ludwig', 09/12/2025, 2, 2, 17)

UPDATE tbl_pedido_adocao
SET status_processo = 'Aprovado',
    informacoes = 'O pedido foi aprovado com sucesso',
    data_pedido = current_date()
    WHERE  id = 11