CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE livro (
    id INT NOT NULL AUTO_INCREMENT primary key,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    editora VARCHAR(255) NOT NULL,
    ano_publicacao INT NOT NULL
);

insert into livro (titulo, autor, editora, ano_publicacao) values
("Perto do Fim", "Mário Silva", "Editora Company", 2015),
("Tempos Passados", "Sandra Oliveira", "Editora Company", 2012),
("Avante", "Roger Andrade", "Editora Deluxe", 2005),
("Uma Bela Vida", "Rita de Castro", "Editora Deluxe", 2001),
("Imaginação", "Paulo Santos", "Editora Santos", 1980),
("Uma Vingança", "Marieta Santos", "Editora Santos", 1972);

select * from livro;

ALTER TABLE livro
ADD COLUMN capa VARCHAR(500);

