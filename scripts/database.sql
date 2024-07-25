create database dbcontrolgenios;

CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ip VARCHAR(255) NOT NULL,
    imgUrl VARCHAR(500) NOT NULL,
    idImgUrl VARCHAR(255) NOT NULL,
    status TINYINT(1) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO services (name, ip, imgUrl, status) VALUES ('Monarca', '93.188.165.184:3600', '/src/img', 1);
