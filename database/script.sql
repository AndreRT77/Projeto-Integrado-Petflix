CREATE SCHEMA db_pet;

CREATE TABLE tbl_responsavel_pet(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR (100) NOT NULL,
    cpf VARCHAR (100) NOT NULL,
    contato VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE tbl_abrigo(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR (100) NOT NULL,
    cnpj VARCHAR (20) NOT NULL,
	informacoes TEXT NOT NULL,
	contato VARCHAR(20) NOT NULL,
    email VARCHAR (100) NOT NULL
);

CREATE TABLE tbl_tutor_interessado(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR (100) NOT NULL,
    cpf VARCHAR (100) NOT NULL,
    contato VARCHAR (20) NOT NULL,
    email VARCHAR (100) NOT NULL,
    data_nascimento DATE NULL,
    lista_de_interesse TEXT NOT NULL,
    preferencias TEXT NULL
);

CREATE TABLE tbl_ong(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR (100) NOT NULL,
    cnpj VARCHAR (20) NOT NULL,
	informacoes TEXT NOT NULL,
	email VARCHAR (100) NOT NULL,
	contato VARCHAR(20) NOT NULL
);

CREATE TABLE tbl_especie(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    habitat VARCHAR (100) NOT NULL,
    descricao TEXT NULL
);
CREATE TABLE tbl_raca(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome  VARCHAR (100) NOT NULL,
    expectativa_de_vida INT (3) NOT NULL,
    saude TEXT NOT NULL,
    peso_medio INT (4) NULL,
	porte ENUM ('Pequeno', 'Médio', 'Grande', 'Gigante') NOT NULL,
    capacidades TEXT NULL,
	id_especie INT NOT NULL,
	FOREIGN KEY (id_especie) REFERENCES tbl_especie(id) ON DELETE CASCADE
);
CREATE TABLE tbl_pet(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    sexo ENUM ('Macho', 'Fêmea') NOT NULL,
	tamanho DOUBLE(4,2) NOT NULL,
    status_adocao ENUM ('Disponível', 'Em processo de adoção', 'Já foi Adotado') NOT NULL,
    nacionalidade VARCHAR(200) NOT NULL,
    necessidades_especiais TEXT NULL,
    descricao TEXT NULL,
    midia VARCHAR (255) NOT NULL,
    id_especie INT NOT NULL,
	id_responsavel_pet INT NOT NULL,
    id_abrigo INT NOT NULL,
	FOREIGN KEY (id_responsavel_pet) REFERENCES tbl_responsavel_pet(id) ON DELETE CASCADE,
	FOREIGN KEY (id_abrigo) REFERENCES tbl_abrigo(id) ON DELETE CASCADE,
	FOREIGN KEY (id_especie) REFERENCES tbl_especie(id) ON DELETE CASCADE
);

CREATE TABLE tbl_endereco_responsavel_pet(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    logradouro VARCHAR (100) NOT NULL,
    numero VARCHAR (20) NOT NULL,
	bairro VARCHAR (100) NOT NULL,
    cidade VARCHAR (100) NOT NULL,
    uf VARCHAR (2) NOT NULL,
    cep VARCHAR (9) NOT NULL,
    id_responsavel_pet INT NOT NULL,
	FOREIGN KEY (id_responsavel_pet) REFERENCES tbl_responsavel_pet(id) ON DELETE CASCADE
);

CREATE TABLE tbl_endereco_abrigo(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    logradouro VARCHAR (100) NOT NULL,
    numero VARCHAR (20) NOT NULL,
	bairro VARCHAR (100) NOT NULL,
    cidade VARCHAR (100) NOT NULL,
    uf VARCHAR (2) NOT NULL,
    cep VARCHAR (9) NOT NULL,
    id_abrigo INT NOT NULL,
	FOREIGN KEY (id_abrigo) REFERENCES tbl_abrigo(id) ON DELETE CASCADE
);

CREATE TABLE tbl_endereco_tutor_interessado(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    logradouro VARCHAR (100) NOT NULL,
    numero VARCHAR (20) NOT NULL,
	bairro VARCHAR (100) NOT NULL,
    cidade VARCHAR (100) NOT NULL,
    uf VARCHAR (2) NOT NULL,
    cep VARCHAR (9) NOT NULL,
    id_tutor_interessado INT NOT NULL,
	FOREIGN KEY (id_tutor_interessado) REFERENCES tbl_tutor_interessado(id) ON DELETE CASCADE
);

CREATE TABLE tbl_endereco_ong(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    logradouro VARCHAR (100) NOT NULL,
    numero VARCHAR (20) NOT NULL,
	bairro VARCHAR (100) NOT NULL,
    cidade VARCHAR (100) NOT NULL,
    uf VARCHAR (2) NOT NULL,
    cep VARCHAR (9) NOT NULL,
    id_ong INT NOT NULL,
	FOREIGN KEY (id_ong) REFERENCES tbl_ong(id) ON DELETE CASCADE
);

CREATE TABLE tbl_abrigo_ong(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    status_patrocinio ENUM ('Ativo', 'Desfeita', 'Em processo') NOT NULL,
    tipo_paceria TEXT NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NULL,
    id_ong INT NOT NULL,
    id_abrigo INT NOT NULL,
	FOREIGN KEY (id_ong) REFERENCES tbl_ong(id) ON DELETE CASCADE,
	FOREIGN KEY (id_abrigo) REFERENCES tbl_abrigo(id) ON DELETE CASCADE
);

CREATE TABLE tbl_pedido_adocao(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	status_processo ENUM('Em análise', 'Aprovado', 'Negado') NOT NULL,
    informacoes TEXT NOT NULL,
    data_pedido DATE NULL,
    id_tutor_interessado INT NOT NULL,
    id_responsavel_pet INT NOT NULL,
    id_pet INT NOT NULL,
	FOREIGN KEY (id_tutor_interessado) REFERENCES tbl_tutor_interessado(id) ON DELETE CASCADE,
	FOREIGN KEY (id_responsavel_pet) REFERENCES tbl_responsavel_pet(id) ON DELETE CASCADE,
    FOREIGN KEY (id_pet) REFERENCES tbl_pet(id) ON DELETE CASCADE
);

CREATE TABLE tbl_historico_adocao(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	pet VARCHAR (100)  NULL,
    informacoes TEXT NULL,
    data_adocao DATE NULL,
    observacoes TEXT NULL,
    id_tutor_interessado INT NOT NULL,
	FOREIGN KEY (id_tutor_interessado) REFERENCES tbl_tutor_interessado(id) ON DELETE CASCADE
);
