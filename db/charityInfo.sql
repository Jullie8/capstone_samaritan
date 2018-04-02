DROP DATABASE IF EXISTS charity_info;
CREATE DATABASE charity_info;

CREATE TABLE charity_info (
    ID SERIAL PRIMARY KEY,
    charityname VARCHAR
);