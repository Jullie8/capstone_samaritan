DROP DATABASE IF EXISTS charityinfo;
CREATE DATABASE charityinfo;

\c charityinfo;

DROP TABLE IF EXISTS charities;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_history;


CREATE TABLE charities (
    ID SERIAL PRIMARY KEY,
    charityname VARCHAR
);

CREATE TABLE users (
    ID SERIAL PRIMARY KEY
);

CREATE TABlE user_history (
    WebURL VARCHAR,
    charity_name VARCHAR,
    USERID INTEGER,
    Create_Time TIMESTAMP
);

-- psql -f charityInfo.sql