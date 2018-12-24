from flask_app import app
from api.face_api import api
from api.static_api import static_api
from flask import render_template

app.register_blueprint(api, url_prefix='/api/v1')
app.register_blueprint(static_api, url_prefix='/')

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')