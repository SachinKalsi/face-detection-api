import face_recognition
import numpy as np
import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from PIL import Image
from flask_app import app

def detect_faces(image_url):
    image = face_recognition.load_image_file(image_url)
    return face_recognition.face_locations(image)

def draw_rect_faces(face_locations, image_url, ip):
    img = np.array(np.array(Image.open(image_url), dtype=np.uint8), dtype=np.uint8)
    fig, ax = plt.subplots(figsize=(20, 10))
    ax.imshow(img)
    for face_location in face_locations:
        top, right, bottom, left = face_location
        rect = patches.Rectangle((left, bottom), right - left, top - bottom, linewidth=1, edgecolor='r',
                                 facecolor='none')
        ax.add_patch(rect)
    ax.set_yticklabels([])
    ax.set_xticklabels([])
    fig.savefig(app.config['OUTPUT_IMAGE_NAME'] + str(ip) + '.jpg', transparent=True)
    plt.close(fig)