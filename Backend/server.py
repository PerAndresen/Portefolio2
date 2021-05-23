# MySQL

from configparser import MAX_INTERPOLATION_DEPTH
import re
from flask import Flask, render_template, request
import flask
from flask.json import jsonify
import mysql.connector
# dfrom flask_mysqldb import MySQL

app = flask.Flask(__name__, static_folder="/var/fullstack/frontend",static_url_path="")
app.config["DEBUG"] = True



# Så enkelt fordi de er i samme docker nettverk, så vi burde få til det samme
# Variables for everything needed to connect to the database
innuser = 'admin'
innpassword= 'password'
innhost = 'mysql1'
inndatabase = 'webshop_database'

# Connect to the database
db = mysql.connector.connect( user = innuser, password = innpassword, host = innhost, database = inndatabase)

# Prints everything from the table 'products'
cursor = db.cursor()
cursor.execute('SELECT * FROM products')
result = cursor.fetchall()

print(result)
"""
for id, name, price, quantity, img in result:
    print("ID: {}, Name: {}, Price: {}, Quantity: {}, Productimg: {}".format(id,name, price, quantity, img))
"""
# Product class
class Product:
    def __init__(self, name, price, description, image):
        self.name = name
        self.price = price
        self.description = description
        self.image = image


@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path>')
def homepage(path):
    return flask.send_from_directory('/var/fullstack/frontend', path) 



# Method for getting a product from the database 
@app.route('/webshop/get/<product_id>', methods=['GET'])
def getProduct(product_id):
    cursor = db.cursor()
    cursor.execute('SELECT * FROM products WHERE productid = {}'.format(product_id))
    result = cursor.fetchall()
    return jsonify(result)

# Method for returning a list of all products in the database
@app.route('/webshop/getall', methods=['GET'])
def getAll():    
    cursor = db.cursor()
    cursor.execute('SELECT * FROM products')
    result = cursor.fetchall()
    return flask.jsonify(result)   
    

#Deleting product from the sql database    
@app.route('/webshop/delete/<product_id>', methods=['GET', 'DELETE'])
def deleteProduct(product_id):
    cursor = db.cursor()
    cursor.execute('DELETE FROM products WHERE productid={}'.format(product_id))
    print(getAll())
    return getAll()

# Method for adding a product to the database
@app.route('/webshop/add/<name>/<price>/<quantity>/<description>/<image>', methods=['GET', 'POST'])
def addProduct(name, price, quantity, description, image):
    cursor = db.cursor()
    sql = 'INSERT INTO products (productname, productprice, productquantity, productdescription, productimage) VALUES (%s, %s, %s, %s, %s)'
    val = (name, price, quantity, description, image)
    cursor.execute(sql, val)
    db.commit()
    print('Inserted: ', cursor.lastrowid, '\n')
    print(getAll())
    return getAll()


if __name__ == '__main__':
    app.run(host='0.0.0.0')
    db.close()    

