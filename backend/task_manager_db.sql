-- Database: task_manager_db

-- DROP DATABASE task_manager_db;

CREATE DATABASE task_manager_db
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'English_India.1252'
       LC_CTYPE = 'English_India.1252'
       CONNECTION LIMIT = -1;

SELECT * FROM users;

SELECT datname FROM pg_database;