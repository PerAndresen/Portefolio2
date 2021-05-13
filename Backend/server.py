import flask
from pymongo import MongoClient
import jsonpickle


# Creating the "app" with flask, to be able to use routes
app = flask.Flask(__name__)
app.config["DEBUG"] = True

# Connecting to the MongoDB using the connection string
connection = MongoClient('mongodb+srv://dbUser1:dbUser1pw@portfolio2cluster.wtvrn.mongodb.net/Portfolio2db?retryWrites=true&w=majority')

# Creating/switching to the database and the collection
db = connection.Products
collection = db.Food

# Base URL for the webshop
base = 'http://127.0.0.1:5000/webshop/'

# Product class
class Product:
    def __init__(self, name, price, product_id):
        self.name = name
        self.price = price
        self.product_id = product_id

# Method for getting a product from the database 
@app.route(base + 'products/get/<product_id>', methods=['GET'])
def getProduct(product_id):
    return None

# Method for adding a product to the database
@app.route(base, 'products/add/<name>/<price>/<product_id>', methods=['POST', 'GET'])
def addProduct(name, price, product_id):
    #newProduct = Product(name, price, product_id)
    # Can use jsonpickle here
    product = {
        'Name':name,
        'Price':price,
        'Product ID':product_id
    }
    

