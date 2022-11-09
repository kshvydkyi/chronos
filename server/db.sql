CREATE DATABASE IF NOT EXISTS chronos;
use chronos;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';


CREATE TABLE IF NOT EXISTS roles(
	 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
     role_name VARCHAR(255) NOT NULL
); 

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    about_me TEXT,
    photo VARCHAR(255) NOT NULL DEFAULT 'default_avatar.png',
    email VARCHAR(255) NOT NULL,
    role INT NOT NULL,
    FOREIGN KEY (role) REFERENCES roles (id) ON DELETE CASCADE
);

SELECT * FROM roles;
SELECT * FROM users;