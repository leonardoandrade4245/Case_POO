CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE livro (
    id INT NOT NULL AUTO_INCREMENT primary key,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    editora VARCHAR(255) NOT NULL,
    ano_publicacao INT NOT NULL
);

insert into livro (titulo, autor, editora, ano_publicacao, capa) values
("Perto do Fim", "Mário Silva", "Editora Company", 2015, "./web/img/Capa_Livro.jpg"),
("Tempos Passados", "Sandra Oliveira", "Editora Company", 2012, "./web/img/Capa_Livro.jpg"),
("Avante", "Roger Andrade", "Editora Deluxe", 2005, "./web/img/Capa_Livro.jpg"),
("Uma Bela Vida", "Rita de Castro", "Editora Deluxe", 2001, "./web/img/Capa_Livro.jpg"),
("Imaginação", "Paulo Santos", "Editora Santos", 1980, "./web/img/Capa_Livro.jpg"),
("Uma Vingança", "Marieta Santos", "Editora Santos", 1972, "./web/img/Capa_Livro.jpg");

select * from livro;

ALTER TABLE livro
ADD COLUMN capa VARCHAR(500);

TRUNCATE TABLE livro;

UPDATE livro
SET capa = '/src/main/resources/templates/img/Capa_Livro.jpg';

SET SQL_SAFE_UPDATES = 1;

TRUNCATE TABLE livro;

ALTER TABLE livro
ADD COLUMN descricao TEXT;

INSERT INTO livro (titulo, autor, editora, ano_publicacao, capa, descricao) VALUES
("Perto do Fim", "Mário Silva", "Editora Company", 2015, "./web/img/Capa_Livro.jpg",
"O suspense de um homem que, após perder tudo, busca redenção nos últimos dias de sua vida."),

("Tempos Passados", "Sandra Oliveira", "Editora Company", 2012, "./web/img/Capa_Livro.jpg",
"Uma emocionante viagem ao passado, onde memórias e segredos de família vêm à tona."),

("Avante", "Roger Andrade", "Editora Deluxe", 2005, "./web/img/Capa_Livro.jpg",
"Uma história de superação e coragem, onde um jovem enfrenta seus maiores medos para conquistar seus sonhos."),

("Uma Bela Vida", "Rita de Castro", "Editora Deluxe", 2001, "./web/img/Capa_Livro.jpg",
"Relato inspirador de uma mulher que, mesmo após inúmeros desafios, encontra a verdadeira felicidade."),

("Imaginação", "Paulo Santos", "Editora Santos", 1980, "./web/img/Capa_Livro.jpg",
"Um mergulho no mundo da fantasia e criatividade, onde tudo é possível e os limites não existem."),

("Uma Vingança", "Marieta Santos", "Editora Santos", 1972, "./web/img/Capa_Livro.jpg",
"Em busca de justiça, uma mulher enfrenta seu passado sombrio para acertar as contas com aqueles que a feriram.");
