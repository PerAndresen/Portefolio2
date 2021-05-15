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
    def __init__(self, name, price, product_id, image):
        self.name = name
        self.price = price
        self.product_id = product_id
        self.image = image

# Method for getting a product from the database 
@app.route(base + 'products/get/<product_id>', methods=['GET'])
def getProduct(product_id):
    # Finds and returns a document with specidic product_id
    product = collection.find({'product_id':product_id})
    print('Returned product: ', product)
    return product

# Method for adding a product to the database
@app.route(base, 'products/add/<name>/<price>/<product_id>/<image>', methods=['POST', 'GET'])
def addProduct(name, price, product_id, image):
    newProduct = Product(name, price, product_id, image)
    print('Object product: ', newProduct)
    # Parsing the Product-Object into JSON with jsonpickle -> to be able to insert it into MongoDB
    productJSON = jsonpickle.encode(newProduct, unpicklable=False)
    print('JSON product:', productJSON)
    # Inserting the JSON product into MongoDB
    collection.insert_one(productJSON)

    

