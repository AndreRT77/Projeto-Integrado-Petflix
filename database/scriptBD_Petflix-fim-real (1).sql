CREATE TABLE tbl_usuário(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR (100) NOT NULL,
    cpf VARCHAR (100) NOT NULL,
    contato VARCHAR (20) NOT NULL,
    email VARCHAR (100) NOT NULL,
    data_nascimento DATE NULL,
    preferencias TEXT NULL,
    lista_de_interesse TEXT NULL
);


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
	informacoes TEXT NOT NULL,
	contato VARCHAR(20) NOT NULL
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
	informacoes TEXT NOT NULL,
	email VARCHAR (100) NOT NULL,
	contato VARCHAR(20) NOT NULL
);

CREATE TABLE tbl_pet(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    sexo ENUM ('Macho', 'Fêmea') NOT NULL,
    porte ENUM ('Pequeno', 'Médio', 'Grande') NOT NULL,
    status ENUM ('Disponível', 'Em processo de adoção', 'Já foi Adotado') NOT NULL,
    nacionalidade VARCHAR(200) NOT NULL,
    necessidades_especiais TEXT NOT NULL,
    descricao TEXT NULL,
    midia VARCHAR (255) NOT NULL,
	id_responsavel_pet INT NOT NULL,
    id_abrigo INT NOT NULL,
	FOREIGN KEY (id_responsavel_pet) REFERENCES tbl_responsavel_pet(id) ON DELETE CASCADE,
	FOREIGN KEY (id_abrigo) REFERENCES tbl_abrigo(id) ON DELETE CASCADE
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
    nome_ong VARCHAR (100) NOT NULL,
    nome_abrigo VARCHAR(100) NOT NULL,
    status_patrocinio ENUM ('Ativo', 'Desfeita', 'Em processo') NOT NULL,
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



