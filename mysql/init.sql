CREATE DATABASE IF NOT EXISTS alan_db;
GRANT ALL PRIVILEGES ON *.* TO 'ualan'@'%' IDENTIFIED BY 'secret' WITH GRANT OPTION;
FLUSH PRIVILEGES;