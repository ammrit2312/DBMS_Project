SELECT * FROM Property
WHERE b_id IS NOT NULL;

SELECT p_id, p_address, p_size, b_id
FROM Property
WHERE p_size>1000;

SELECT r_id, r_seller, r_for 
FROM Registration
WHERE r_for='R';

SELECT DISTINCT(p_id)
FROM Buyer_favs;

SELECT * FROM Login 
WHERE username='jhonny';

-- SELECT CONCAT(f_name, l_name) as Name, seller_id as s_id, Login.username 
-- FROM Seller, Login   
-- WHERE Seller.username = Login.username;

SELECT CONCAT(f_name, l_name) as Name, seller_id as s_id, Login.username 
FROM Seller   
INNER JOIN Login On Seller.username = Login.username;

-- SELECT * 
-- FROM Seller, Registration 
-- Where seller_id= r_seller;

SELECT * FROM Seller 
JOIN Registration ON seller_id= r_seller;

SELECT COUNT(*), f_name, l_name 
FROM Registration
JOIN Seller ON r_seller = seller_id
GROUP BY r_seller;

-- COMPLEX

SELECT DISTINCT p_id FROM Buyer_favs
WHERE p_id IN
(SELECT p_id FROM Property WHERE p_size>800);


SELECT r_seller, COUNT(*)
FROM Registration WHERE
r_seller IN (SELECT 
seller_id FROM Login, Seller WHERE Login.username = Seller.username)
GROUP BY r_seller;

SELECT * FROM Seller
WHERE seller_id = (SELECT r_seller FROM
Registration WHERE r_id IN 
(SELECT r_id FROM Property 
WHERE b_id IS NOT NULL));

CREATE USER ADMIN;
GRANT ALL PRIVILEGES ON * . * TO ADMIN;
CREATE USER Buyer;
CREATE USER Seller;

GRANT SELECT ON Property TO Buyer;
GRANT SELECT ON Rent TO Buyer;
GRANT SELECT ON Buy TO Buyer;
GRANT SELECT ON Invest TO Buyer;
GRANT SELECT ON Seller TO Buyer;
GRANT SELECT ON Buyer TO Buyer;
GRANT SELECT ON seller_contact TO Buyer;
GRANT SELECT ON bUYER_contact TO Buyer;

GRANT SELECT ON Property TO Seller;
GRANT SELECT ON Rent TO Seller;
GRANT SELECT ON Buy TO Seller;
GRANT SELECT ON Invest TO Seller;
GRANT SELECT ON Seller TO Seller;
GRANT SELECT ON Buyer TO Seller;
GRANT SELECT ON bUYER_contact TO seller;
GRANT SELECT ON seller_contact TO Seller;

GRANT UPDATE ON Login TO Buyer;
GRANT UPDATE ON Buyer_contact TO Buyer;
GRANT UPDATE ON Buyer TO Buyer;

GRANT UPDATE ON Invest TO Seller;
GRANT UPDATE ON Buy TO Seller;
GRANT UPDATE ON Rent TO Seller;
GRANT UPDATE ON Registration TO Seller;
GRANT UPDATE ON Property TO Seller;
GRANT UPDATE ON Properties TO Seller;
GRANT UPDATE ON Seller TO Seller;
GRANT UPDATE ON Seller_contact TO Seller;
GRANT UPDATE ON Login TO Seller;

GRANT INSERT ON Buyer TO Buyer;
GRANT INSERT ON Buyer_Contact TO Buyer;
GRANT INSERT ON Login TO Buyer;

GRANT INSERT ON Seller TO Seller;
GRANT INSERT ON Seller_Contact TO Seller;
GRANT INSERT ON Login TO Seller;
GRANT INSERT ON Property TO Seller;
GRANT INSERT ON Registration TO Seller;
GRANT INSERT ON Rent TO Seller;
GRANT INSERT ON Buy TO Seller;
GRANT INSERT ON Invest TO Seller;

GRANT DELETE ON buYER_CONTACT TO Buyer;
GRANT DELETE ON buYER TO Buyer;
GRANT DELETE ON Login TO Buyer;

GRANT DELETE ON Login TO Seller;
GRANT DELETE ON Seller TO Seller;
GRANT DELETE ON Seller_Contact TO Seller;
GRANT DELETE ON Registration TO Seller;
GRANT DELETE ON Property TO Seller;
GRANT DELETE ON Rent TO Seller;
GRANT DELETE ON Buy TO Seller;
GRANT DELETE ON Invest TO Seller;