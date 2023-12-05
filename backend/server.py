from flask import Flask,jsonify,request
from flask_mail import Mail, Message
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
import json

config = 'config.json'

app = Flask(__name__)
UPLOAD_FOLDER = '.'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'vellankiindeevar@gmail.com'
app.config['MAIL_PASSWORD'] = 'ahlypuehnsatgmod' # should not be pushed here 
app.config['MAIL_USE_TLS'] = True

mail = Mail(app)

CORS(app)

@app.route('/create', methods=['POST'])
def create():
    filename = request.json.get("filename")
    key = request.json.get("key")
    with open(config, 'r') as config_file:
        conf = json.load(config_file)
        conf['database'] = './'+filename+'.keysentry'

    with open(config, 'w') as config_file:
        json.dump(conf, config_file)

    with open('template', 'r') as template:
        template_content = template.read()

    template_content = template_content.replace('{"key":""}', '{"key":"' + key + '"}')

    with open(filename + '.keysentry', 'w') as new_file:
        new_file.write(template_content)

    # Return a JSON response
    return jsonify(key)       

@app.route('/issetup')
def issetup():
    try:
        with open(config, "r") as file:
            config_file = json.load(file)
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON in config file: {e}")
        return None
    database = config_file.get("database")
    if database:
        with open(database,'r') as file:
            lines = file.readlines()
            Keyy= json.loads(lines[1])["key"]
        return jsonify(Keyy)
    else: 
        return jsonify(False)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part in the request', 400

    file = request.files['file']

    if file.filename == '':
        return 'No selected file', 400

    if file:
        filename = secure_filename(file.filename)

        with open(config, 'r') as config_file:
            conf = json.load(config_file)
            conf['database'] = filename

        with open(config, 'w') as config_file:
            json.dump(conf, config_file)

        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    with open(config, 'r') as config_file:
        conf = json.load(config_file)
        database = conf['database']

    if database:
        with open(database,'r') as file:
            lines = file.readlines()
            Keyy= json.loads(lines[1])["key"]
        return jsonify(Keyy),200


@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    email = data['email']
    body = data['body']

    msg = Message('OTP from Keysentry', sender='vellankiindeevar@gmail.com', recipients=[email])
    msg.html = body

    mail.send(msg)

    return {'success': True},200

@app.route('/database')
def get_database():
    with open(config, 'r') as config_file:
        conf = json.load(config_file)
        database = conf['database']

    with open(database,'r') as file:
        lines = file.readlines()
        try:
            data = lines[3].strip()  # Changed from json.loads(lines[3]) to lines[3].strip()
        except IndexError:
            data = ''

    return jsonify({'data': data}),200

@app.route('/update', methods=['POST'])
def update():
    data = request.json.get("database")

    with open(config, 'r') as config_file:
        conf = json.load(config_file)
        database = conf['database']

    with open(database,'r') as file:
        lines = file.readlines()

    lines.append(data)

    with open(database, "w") as file:
        file.writelines(lines)   

    return jsonify('database is updated'),200


if __name__ == '__main__':
    app.run()


