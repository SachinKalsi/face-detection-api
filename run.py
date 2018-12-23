from app import app

@app.route('/', methods=['GET'])
def index():
    return "<h3>Sachin Kalsi awesome</h3>"

if __name__ == '__main__':
    app.run(debug=True)
#
#
# from flask import Flask
#
# app = Flask(__name__)
#
# @app.route('/')
# def index():
#     return "<h3>Sachin Kalsig</h3>"