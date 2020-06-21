-- Allow connect docker phpmyadmin connect
CREATE USER IF NOT EXISTS 'root'@'172.17.0.%' IDENTIFIED BY 'password';
GRANT ALL ON *.* TO 'root'@'172.17.0.%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

USE bitnami_opencart;
ALTER TABLE `oc_product_description` ADD FULLTEXT(name,description,meta_title,meta_description,meta_keyword);
SELECT * FROM `oc_product_description` WHERE MATCH(name,description,meta_title,meta_description,meta_keyword) AGAINST ('a' IN NATURAL LANGUAGE MODE);