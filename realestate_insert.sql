USE realestate;

-- Example 1

INSERT INTO Login VALUES ("smith", "Smith123");
INSERT INTO Login VALUES("robin429", "Rorobin12");
INSERT INTO Seller VALUES("s_12345", "Will", "Smith", 12345678, "smith");
INSERT INTO Buyer VALUES("b_67890", "Robin", "Bumbins", "robin429");
INSERT INTO Registration VALUES("r_12345", "s_12345", "flat", "R");
INSERT INTO Property VALUES("p_12345", "A304, Skyline Ambrosia", "2000", "Dwarka Nagar", "PESU, Gym", "Swimming Pool", "r_12345", NULL);
INSERT INTO Rent VALUES("p_12345", 3, 21000);
INSERT INTO Seller_contact VALUES("s_12345", 9856473820);
INSERT INTO Buyer_contact VALUES("b_67890", 8493029230);
INSERT INTO Buyer_favs VALUES("b_67890", "p_12345");

-- Example 2

INSERT INTO Login VALUES("jiraiya", "Jiraiya106");
INSERT INTO Seller VALUES("s_10600", "Suge", "Jiraiya", 34345678, "jiraiya");
INSERT INTO Registration VALUES("r_64932", "s_10600", "plot", "B");
INSERT INTO Property VALUES("p_76121", "MidTown East", "1000", "Center of Manhattan", "Manhattan Subway", "Gym", "r_64932", "b_67890");
INSERT INTO Buy VALUES("p_76121", 5, 200000);
INSERT INTO Seller_contact VALUES("s_10600", 8856473845);
INSERT INTO Buyer_favs VALUES("b_67890", "p_76121");

-- Example 3
INSERT INTO Login VALUES("jhonny", "jhonny123");
INSERT INTO Buyer VALUES("b_27891", "Jhonny", "Kim", "jhonny");
INSERT INTO Registration VALUES("r_64573", "s_10600", "Apartment", "I");
INSERT INTO Property VALUES("p_23141", "Rocke Man, 5th Avenue", "50000", "Park Lane", "Times Square", "Game Room", "r_64573", NULL);
INSERT INTO Invest VALUES("p_23141", 5, 3000000, 14.5, "Prestige");
INSERT INTO Buyer_contact VALUES("b_27891", 7493024230);
INSERT INTO Buyer_contact VALUES("b_27891", 6498008230);
INSERT INTO Buyer_favs VALUES("b_27891", "p_23141");
INSERT INTO Buyer_favs VALUES("b_27891", "p_76121");