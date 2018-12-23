from flask_app import app
import requests

def process_input(request):
    '''
    :param requests: request object
    :return: processed image url
    '''
    image_url = ''
    if request.method == 'POST':
        image = request.files['image']
        image.save(app.config['INPUT_IMAGE_NAME'])
    else:
        download_image(request.args.get('image_url'))
    return app.config['INPUT_IMAGE_NAME']

def download_image(image_url):
    r = requests.get(image_url, allow_redirects=True)
    open(app.config['INPUT_IMAGE_NAME'], 'wb').write(r.content)