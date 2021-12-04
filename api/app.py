# from flask import Flask, request
# import pymysql


# # https://stackoverflow.com/questions/9845102/using-mysql-in-flask

from flask import Flask, request
from flask_cors import CORS
from flaskext.mysql import MySQL

app = Flask(__name__)
CORS(app)
mysql = MySQL()

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'amritesh'
app.config['MYSQL_DATABASE_DB'] = 'realestate'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
conn = mysql.connect()
cursor =conn.cursor()


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json(force=True)['data']
    print("This is called data", data)
    username = data['username']
    password = data['password']
    type_user = ''
    if(cursor.execute("SELECT * FROM Login WHERE username=% s", username)!=0):
        tempdata = cursor.fetchone()
        print(tempdata)
        if(password==tempdata[1]):
            if(cursor.execute("SELECT * FROM buyer WHERE username=% s", username)!=0):
                type_user = 'buyer'
            elif(cursor.execute("SELECT * FROM seller WHERE username=% s", username)!=0):
                type_user = 'seller'
            return {'mssg': "Success", 'type': type_user}
        else:
            return "Wrong Password"
    else:
        return "Wrong Credentials"
    # return "Hi"
    # cursor.execute("SELECT * FROM Login WHERE username=% s", )

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json(force=True)['data']
    username = data['username']
    password = data['password']
    type_user = data['type']
    firstName = data['firstName']
    lastName = data['lastName']
    aadharNum = data['aadharNum']
    phone = data['phone']
    # print("Yeh mera phone hai ", type(phone))
    if(cursor.execute("SELECT * FROM Login WHERE username=% s", username)!=0):
        print(username)
        return {'mssg': 'User Already Exists'}
    cursor.execute("INSERT INTO Login (username, password) VALUES (% s, % s)", (username, password))
    if(type_user=='buyer'):
        count = cursor.execute("SELECT * FROM Buyer")
        count = "b_"+str(count)
        cursor.execute("INSERT INTO buyer (buyer_id, f_name, l_name, username) VALUES (% s, % s, % s, % s)", (count, firstName, lastName, username))
        cursor.execute("INSERT INTO Buyer_Contact (buyer_id, phone) VALUES (% s, % s)", (count, phone))
    elif(type_user=='seller'):
        count = cursor.execute("SELECT * FROM Seller")
        count = "s_"+str(count)
        cursor.execute("INSERT INTO seller (seller_id, f_name, l_name, aadhar_number, username) VALUES (% s, % s, % s, % s, % s)", (count,firstName, lastName, aadharNum, username))
        cursor.execute("INSERT INTO Seller_Contact (seller_id, phone) VALUES (% s, % s)", (count, phone))
    conn.commit()
    return {"mssg": "Success"}
    

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json(force=True)['data']
    shortDes = data['shortDes']
    desc = data['des']
    registrationType = data['registrationType']
    registrationFor = data['registrationFor']
    propertyAddr = data['propertyAddr']
    propertySize = data['propertySize']
    propertyPrice = data['propertyPrice']
    propertyArea = data['propertyArea']
    propertyNearby = data['propertyNearby']
    facility = data['facility']
    username = data['username']
    r_id = cursor.execute("SELECT * FROM Registration")
    r_id = "r_"+str(r_id)
    p_id = cursor.execute("SELECT * FROM Property")
    p_id = "p_"+str(p_id)
    cursor.execute("SELECT seller_id FROM Seller WHERE username=%s", username)
    tempdata = cursor.fetchone()
    seller_id = tempdata[0]
    if(registrationFor.lower() == 'rent'):
        registrationFor = 'R'
    elif(registrationFor.lower() == 'buy'):
        registrationFor = 'B'
    elif(registrationFor.lower() == 'invest'):
        registrationFor = 'I'
    cursor.execute("INSERT INTO Registration (r_id, r_seller, r_type, r_for) VALUES (% s, % s, % s, % s)", (r_id, seller_id, registrationType, registrationFor))
    cursor.execute("INSERT INTO Property (p_id, p_address, p_size, p_area, p_nearby, p_facility, r_id, b_id, Description, shortDescription) VALUES (% s, % s, % s, % s, % s, % s, % s, % s, % s, % s)", (p_id, propertyAddr, propertySize, propertyArea, propertyNearby, facility, r_id, None, desc, shortDes))
    if(registrationFor.lower() == 'r'):
        cursor.execute("INSERT INTO Rent (p_id, rating, rent_per_month) VALUES (% s, % s, % s)", (p_id, 3, propertyPrice))
    elif(registrationFor.lower() == 'b'):
        cursor.execute("INSERT INTO Buy (p_id, rating, amount_per_month) VALUES (% s, % s, % s)", (p_id, 3, propertyPrice))
    elif(registrationFor.lower() == 'i'):
        cursor.execute("INSERT INTO Invest (p_id, rating, amount, growth_rate, other_invest) VALUES (% s, % s, % s, % s, % s)", (p_id, 3, propertyPrice, 10, None))
    conn.commit()
    return {"mssg": "Success"}


@app.route('/property/getAll', methods=['GET'])
def getAll():
    cursor.execute("SELECT * FROM property")
    data = cursor.fetchall()
    out = []
    for i in data:
        rent = 0.0
        rating = 0.0
        print("Main hooon man ", cursor.execute("SELECT * FROM rent WHERE p_id=% s", i[0]))
        if(cursor.execute("SELECT * FROM rent WHERE p_id=% s", i[0]))!=0:
            tempdata = cursor.fetchone()
            rent = tempdata[2]
            rating = tempdata[1]
        elif(cursor.execute("SELECT * FROM buy WHERE p_id=% s",i[0]))!=0:
            tempdata = cursor.fetchone()
            rent = tempdata[2]
            rating = tempdata[1]
        elif(cursor.execute("SELECT * FROM invest WHERE p_id=% s", i[0]))!=0:
            tempdata = cursor.fetchone()
            rent = tempdata[2]
            rating = tempdata[1]
        out.append({"p_id":i[0], "p_address":i[1], "p_size":i[2], "p_area":i[3], "p_nearby":i[4], "p_facility":i[5], "shortDes": i[-1], "r_id": i[6], "b_id": i[7], "rating": rating, "rent": rent})
    return {"data":out}
    # print("This is data", type(data))
    # return str(data)

# print(cursor.execute("SELECT * from Login"))

@app.route('/property/info', methods=['POST'])
def detail():
    data = request.get_json(force=True)['id']
    cursor.execute("SELECT * FROM property WHERE p_id=% s", data)
    detail = cursor.fetchone()
    out = {}
    cursor.execute("SELECT r_seller FROM registration WHERE r_id=% s", detail[6])
    r_seller = cursor.fetchone()[0]
    cursor.execute("SELECT phone FROM Seller_Contact WHERE seller_id=% s", r_seller)
    phone = cursor.fetchone()[0]
    if(cursor.execute("SELECT * FROM rent WHERE p_id=% s", data)):
        tempdata = cursor.fetchone()
        
        out = {"p_id": detail[0], "p_address": detail[1], "p_size": detail[2], "p_area": detail[3], "p_nearby": detail[4], "p_facility": detail[5], "r_id": detail[6], "b_id": detail[7], "shortDes": detail[9], "des": detail[8], "rating": tempdata[1], "rent": tempdata[2], "type_property": "rent", "seller_phone": phone}
    elif(cursor.execute("SELECT * FROM buy WHERE p_id=% s", data)):
        tempdata = cursor.fetchone()

        out = {"p_id": detail[0], "p_address": detail[1], "p_size": detail[2], "p_area": detail[3], "p_nearby": detail[4], "p_facility": detail[5], "r_id": detail[6], "b_id": detail[7], "shortDes": detail[9], "des": detail[8], "rating": tempdata[1], "rent": tempdata[2], "type_property": "buy", "seller_phone": phone}
    else:
        cursor.execute("SELECT * FROM invest WHERE p_id=% s", data)
        tempdata = cursor.fetchone()
        out = {"p_id": detail[0], "p_address": detail[1], "p_size": detail[2], "p_area": detail[3], "p_nearby": detail[4], "p_facility": detail[5], "r_id": detail[6], "b_id": detail[7], "shortDes": detail[9], "des": detail[8], "rating": tempdata[1], "amount": tempdata[2], "growth_rate": tempdata[3], "other_invest": tempdata[4], "type_property": "invest", "seller_phone": phone}
    cursor.execute("SELECT r_seller FROM registration WHERE r_id=%s", detail[6])
    r_seller = cursor.fetchone()[0]
    cursor.execute("SELECT username FROM Seller WHERE seller_id=%s", r_seller)
    username = cursor.fetchone()[0]
    return {"mssg": "Success", "data": out, "username": username}

@app.route('/add/favourites/<string:username>/<string:p_id>', methods=['GET'])
def addFavs(username, p_id):
    print("This is username", username, p_id)
    cursor.execute("SELECT buyer_id FROM Buyer WHERE username=%s", username)
    buyer_id = cursor.fetchone()[0]
    if(cursor.execute('SELECT p_id from Buyer_favs WHERE buyer_id=% s', buyer_id)):
        tempdata = cursor.fetchall()
        print("This is temp", tempdata, p_id)
        for k in tempdata:
            if p_id in k:
                return {"mssg": "Already in favourites"}
        else:
            cursor.execute("INSERT INTO Buyer_favs (buyer_id, p_id) VALUES (% s, % s)", (buyer_id, p_id))
            conn.commit()
            return {"mssg": "Success"}
    else:
        cursor.execute("INSERT INTO Buyer_favs (buyer_id, p_id) VALUES (% s, % s)", (buyer_id, p_id))
        conn.commit()
        return {"mssg": "Success"}

@app.route('/find/favourites/<string:username>', methods=['GET'])
def findFavs(username):
    cursor.execute("SELECT buyer_id FROM Buyer WHERE username=%s", username)
    buyer_id = cursor.fetchone()[0]
    print(buyer_id)
    cursor.execute("SELECT * from Buyer_Favs WHERE buyer_id=% s", buyer_id)
    data = cursor.fetchall()
    print(data)
    out = []
    for i in data:
        rent = 0.0
        rating = 0.0
        cursor.execute("SELECT * FROM property WHERE p_id=% s", i[1])
        detail = cursor.fetchone()
        if(cursor.execute("SELECT * FROM rent WHERE p_id=% s", i[1])):
            tempdata = cursor.fetchone()
            rent = tempdata[2]
            rating = tempdata[1]
        elif(cursor.execute("SELECT * FROM buy WHERE p_id=% s",i[1]))!=0:
            tempdata = cursor.fetchone()
            rent = tempdata[2]
            rating = tempdata[1]
        elif(cursor.execute("SELECT * FROM invest WHERE p_id=% s", i[1]))!=0:
            tempdata = cursor.fetchone()
            rent = tempdata[2]
            rating = tempdata[1]
        out.append({"p_id":detail[0], "p_address":detail[1], "p_size":detail[2], "p_area":detail[3], "p_nearby":detail[4], "p_facility":detail[5], "shortDes": detail[-1], "r_id": detail[6], "b_id": detail[7], "rating": rating, "rent": rent})
    print(out)
    return {"data":out}

@app.route('/find/listings/<string:username>', methods=['GET'])
def findListing(username):
    cursor.execute("SELECT seller_id FROM Seller WHERE username=%s", username)
    seller_id = cursor.fetchone()[0]
    print(seller_id)
    cursor.execute("SELECT r_id from registration WHERE r_seller=% s", seller_id)
    data = cursor.fetchall()
    print(data)
    out = []
    for i in data:
        rent = 0.0
        rating = 0.0
        cursor.execute("SELECT * FROM property WHERE r_id=% s", i[0])
        detail = cursor.fetchone()
        p_id = detail[0]
        if(cursor.execute("SELECT * FROM rent WHERE p_id=% s", p_id)):
            tempdata = cursor.fetchone()
            rent = tempdata[2]
            rating = tempdata[1]
        elif(cursor.execute("SELECT * FROM buy WHERE p_id=% s",p_id))!=0:
            tempdata = cursor.fetchone()
            rent = tempdata[2]
            rating = tempdata[1]
        elif(cursor.execute("SELECT * FROM invest WHERE p_id=% s", p_id))!=0:
            tempdata = cursor.fetchone()
            rent = tempdata[2]
            rating = tempdata[1]
        out.append({"p_id":detail[0], "p_address":detail[1], "p_size":detail[2], "p_area":detail[3], "p_nearby":detail[4], "p_facility":detail[5], "shortDes": detail[-1], "r_id": detail[6], "b_id": detail[7], "rating": rating, "rent": rent})
    print(out)
    return {"data":out}
    # return "Hi"

@app.route('/edit/property', methods=['POST'])
def editProperty():
    data = request.get_json(force=True)['data']
    print("tHIS IS property DATA", data)
    shortDes = data['shortDes']
    des = data['des']
    propertyAddr = data['propertyAddr']
    propertySize = data['propertySize']
    propertyPrice = data['propertyPrice']
    propertyArea = data['propertyArea']
    propertyNearby = data['propertyNearby']
    facility = data['facility']
    username = data['username']
    p_id = data['p_id']
    if(cursor.execute("SELECT * FROM Rent WHERE p_id=%s", p_id)):
        cursor.execute("UPDATE Rent SET rent_per_month=%s WHERE p_id=%s", (propertyPrice,p_id))
    elif(cursor.execute("SELECT * FROM Buy WHERE p_id=%s", p_id)):
        cursor.execute("UPDATE Buy SET amount_per_month=%s WHERE p_id=%s", (propertyPrice,p_id))
    elif(cursor.execute("SELECT * FROM Invest WHERE p_id=%s", p_id)):
        cursor.execute("UPDATE Invest SET amount=%s WHERE p_id=%s", (propertyPrice,p_id))
    cursor.execute("UPDATE Property SET p_address=%s, p_size=%s, p_area=%s, p_nearby=%s, p_facility=%s, Description=%s, shortDescription=%s WHERE p_id=%s", (propertyAddr,propertySize,propertyArea,propertyNearby,facility,des,shortDes,p_id))
    conn.commit()
    return {"mssg": "Success"}

if __name__ == '__main__':
    app.run(debug=True)