CREATE DATABASE webshop_database;
USE webshop_database;

CREATE TABLE products (
    productid INT unsigned NOT NULL AUTO_INCREMENT,
    productname VARCHAR(150) NOT NULL,
    productprice INT NOT NULL,
    productquantity INT NOT NULL,
    productimage VARCHAR(1024) default "https://image.sciencenorway.no/1438480.jpg?imageId=1438480&panow=0&panoh=0&panox=0&panoy=0&heightw=0&heighth=0&heightx=0&heighty=0&width=1200&height=630",
    PRIMARY KEY (productid)
)


INSERT INTO products (productname,productprice,productquantity,productimage) VALUES
('BANANA', 300, 50, "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg"),
('APPLE',150, 35, "https://www.applesfromny.com/wp-content/uploads/2020/05/Jonagold_NYAS-Apples2.png"),
('ORANGE',500, 100,"https://riviste.newbusinessmedia.it/wp-content/uploads/sites/27/2013/12/Fotolia_11313277_M.jpg");

CREATE USER 'adminstrator' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON * . * TO 'adminstrator'; 