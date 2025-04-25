from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import os
from pathlib import Path

app = Flask(__name__)
CORS(app)

# ================================================================================ #
@app.route('/api/neofetch', methods=['GET'])
def get_neofetch():
    try:
        result = subprocess.run(['neofetch', '--stdout'], 
                               capture_output=True, 
                               text=True, 
                               check=True)
        
        return jsonify({
            'status': 'success',
            'output': result.stdout
        })
    except subprocess.CalledProcessError as e:
        return jsonify({
            'status': 'error',
            'message': f'Помилка команди neofetch: {str(e)}',
            'stderr': e.stderr
        }), 500
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Щось пішло не так: {str(e)}'
        }), 500
# ================================================================================ #
@app.route('/api/transcribe', methods=['POST'])
def transcribe_audio():
    data = request.json
    method = data.get('method', '')
    audio_path = data.get('audioPath', '')
    
    if not audio_path:
        return jsonify({
            'status': 'error',
            'message': 'Не вказаний шлях до медіафайлу'
        }), 400
    
    if not os.path.isfile(audio_path):
        return jsonify({
            'status': 'error',
            'message': f'Файл не знайдений: {audio_path}'
        }), 404
    
    try:
        if method.lower() == 'whisper':
            cmd = ['whisper-cli', '-m', '/home/jzinferno/Projects/DiplomProject/server/ggml-tiny.bin', '-l', 'auto', '--no-prints', '--no-timestamps', '-f', audio_path]
        else:
            return jsonify({
                'status': 'error',
                'message': f'Помилка методу: {method}'
            }), 400
        
        result = subprocess.run(cmd, 
                               capture_output=True, 
                               text=True, 
                               check=True)
        
        return jsonify({
            'status': 'success',
            'transcription': result.stdout,
            'method': method
        })
    except subprocess.CalledProcessError as e:
        return jsonify({
            'status': 'error',
            'message': f'Помилка транскрибації: {str(e)}',
            'stderr': e.stderr
        }), 500
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Щось пішло не так: {str(e)}'
        }), 500
# ================================================================================ #

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)