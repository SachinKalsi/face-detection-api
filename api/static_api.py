from flask import Blueprint, render_template, send_file

from flask_app import app
static_api = Blueprint('static_api', __name__)

# @static_api.route('/', methods=['GET'])
# def index():
#     return render_template('index.html')

@static_api.route('/<image_id>', methods=['GET'])
def get_image(image_id):
    return send_file('static/' +image_id + '.jpg')