DROP DATABASE realestate;
CREATE DATABASE realestate;

USE realestate;

CREATE TABLE Login(
    username varchar(50) PRIMARY KEY,
    password varchar(100) NOT NULL
);

CREATE TABLE Seller(
    seller_id varchar(25) PRIMARY KEY,
    f_name varchar(100) NOT NULL,
    l_name varchar(100),
    aadhar_number int NOT NULL,
    username varchar(50),
    UNIQUE(aadhar_number),
    CONSTRAINT F_seller_key FOREIGN KEY(username) REFERENCES Login(username)
);

CREATE TABLE Buyer(
    buyer_id varchar(25) PRIMARY KEY,
    f_name varchar(100) NOT NULL,
    l_name varchar(100),
    username varchar(50),
    CONSTRAINT F_buyer_key FOREIGN KEY(username) REFERENCES Login(username)
);

CREATE TABLE Registration(
    r_id varchar(25) PRIMARY KEY,
    r_seller varchar(25),
    r_type varchar(10),
    r_for varchar(3),
    CONSTRAINT Seller_unique FOREIGN KEY(r_seller) REFERENCES Seller(seller_id)
);

CREATE TABLE Property(
    p_id varchar(25) PRIMARY KEY,
    p_address varchar(100),
    p_size DOUBLE PRECISION,
    p_area varchar(100),
    p_nearby varchar(200),
    p_facility varchar(255),
    r_id varchar(25),
    b_id varchar(25),
    Description varchar(2000),
    shortDescription varchar(500),
    UNIQUE(p_address),
    CONSTRAINT Registration_connection FOREIGN KEY(r_id) REFERENCES Registration(r_id),
    CONSTRAINT Buyer_connection FOREIGN KEY(b_id) REFERENCES Buyer(buyer_id)
);

CREATE TABLE Rent(
    p_id varchar(25) NOT NULL,
    rating int,
    rent_per_month int,
    PRIMARY KEY (p_id, rent_per_month),
    CONSTRAINT Rent_connection FOREIGN KEY(p_id) REFERENCES Property(p_id) 
);

CREATE TABLE Buy(
    p_id varchar(25) NOT NULL,
    rating int,
    amount_per_month int,
    PRIMARY KEY (p_id, amount_per_month),
    CONSTRAINT Buy_connection FOREIGN KEY(p_id) REFERENCES Property(p_id) 
);

CREATE TABLE Invest(
    p_id varchar(25) NOT NULL,
    rating int,
    amount int,
    growth_rate DOUBLE PRECISION,
    other_invest varchar(255),
    PRIMARY KEY (p_id, growth_rate),
    CONSTRAINT Invest_connection FOREIGN KEY(p_id) REFERENCES Property(p_id) 
);

CREATE TABLE Seller_contact(
    seller_id varchar(25) NOT NULL,
    phone bigint,
    PRIMARY KEY (seller_id, phone),
    CONSTRAINT Seller_cont FOREIGN KEY(seller_id) REFERENCES Seller(seller_id)
);

CREATE TABLE Buyer_contact(
    buyer_id varchar(25) NOT NULL,
    phone bigint,
    PRIMARY KEY (buyer_id, phone),
    CONSTRAINT Buyer_cont FOREIGN KEY(buyer_id) REFERENCES Buyer(buyer_id)
);

CREATE TABLE Buyer_favs(
    buyer_id varchar(25) NOT NULL,
    p_id varchar(25),
    PRIMARY KEY (buyer_id, p_id),
    CONSTRAINT Buyer_fav_connect FOREIGN KEY(buyer_id) REFERENCES Buyer(buyer_id),
    CONSTRAINT Property_connect FOREIGN KEY(p_id) REFERENCES Property(p_id) 
);