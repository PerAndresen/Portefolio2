import flask
from pymongo import MongoClient
import jsonpickle
import json

# Creating the "app" with flask, to be able to use routes
app = flask.Flask(__name__)
app.config["DEBUG"] = True

# Connecting to the MongoDB using the connection string
connection = MongoClient('mongodb+srv://dbUser1:dbUser1pw@portfolio2cluster.wtvrn.mongodb.net/Portfolio2db?retryWrites=true&w=majority')

# Creating/switching to the database and the collection that stores the product information
db = connection.Products
collection = db.Food

# Method for giving us the next sequential ID for a collection by name, by creating a new collection to store the ID's
# def get_sequence(name):
#     idCollection = db.sequences
#     if idCollection.estimated_document_count == 0:
#         idCollection.insert_one({"_id" : "Food", "value" : 0})
#     else:
#         document = idCollection.find_one_and_update({'_id':name}, {'$inc':{'value':1}}, return_document=True)
#     return document['value']


# Base URL for the webshop
base = 'http://127.0.0.1:5000/webshop'

# Product class
class Product:
    def __init__(self, name, price, description, image):
        self.name = name
        self.price = price
        self.description = description
        self.image = image

# Method for getting a product from the database 
@app.route('/webshop/products/get/<product_id>', methods=['GET'])
def getProduct(product_id):
    # Finds and returns a document with specidic product_id
    product = collection.find({'product_id':product_id})
    print('Returned product: ', product)
    return product

# Method for adding a product to the database
@app.route('/webshop/products/add/<name>/<price>/<description>/<image>', methods=['POST', 'GET'])
def addProduct(name, price, description, image):
    newProduct = Product(name, price, description, image)
    print('Object product: ', newProduct)
    # Parsing the Product-Object into JSON compatible with jsonpickle -> to be able to insert it into MongoDB
    productJSON = jsonpickle.encode(newProduct, unpicklable=False)
    # Parsing it into proper JSON
    jsonDict = json.loads(productJSON)
    print('JSON inserted: ', jsonDict)
    # Inserting the JSON product into MongoDB
    collection.insert_one(jsonDict)
    #nextId = {"_id": get_sequence('Food')}

print('SJEKKER OM PROGRAMMET FUNKER SOM DET SKAL NÅ')
addProduct('TestProdukt',  69, 'Dette er et testprodukt for å teste om programmet funker', 'https://www.applesfromny.com/wp-content/uploads/2020/05/Jonagold_NYAS-Apples2.png')
# {"_id": get_sequence("Food")}
