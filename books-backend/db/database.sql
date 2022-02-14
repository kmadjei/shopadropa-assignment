CREATE DATABASE shopadropa_books;

CREATE TABLE books(
    books_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    author VARCHAR(255),
    year_of_publishing INT,
    ISBN VARCHAR(255)
);