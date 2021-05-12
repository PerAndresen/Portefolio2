import flask

app = flask.Flask(__name__)
app.config["DEBUG"] = True

base = 'http://127.0.0.1:5000/webshop/'

class Product:
    def __init__(self, name, price, id):
        self.name = name
        self.price = price
        self.id = id

@app.route(base + 'products/get/<product_id>', methods=['GET'])
def getProduct(product_id):
    return None

@app.route(base, 'products/add/<product_id>', methods=['POST', 'GET'])
def addProduct(product_id):
    return None

