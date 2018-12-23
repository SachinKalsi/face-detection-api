from flask import Blueprint, request, jsonify, send_file
from utils.read_io import process_input
#
from utils.face import detect_faces, draw_rect_faces


api = Blueprint('api', __name__)

@api.route('/detect_face', methods=['POST'])
def detect_face():
    image_url = process_input(request)
    ip = request.remote_addr
    face_locations = detect_faces(image_url)
    if request.args.get('json'):
        return jsonify({
            'success': True,
            'face_locations': face_locations
        });
    draw_rect_faces(face_locations, image_url, ip)
    return jsonify({
        'success': True,
        'image_id': ip,
        'face_count': len(face_locations)
    })