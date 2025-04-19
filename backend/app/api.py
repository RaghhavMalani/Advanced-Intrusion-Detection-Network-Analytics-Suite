from flask import Flask
from flask_socketio import SocketIO
from app.sniffer import start_sniffer

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return "Backend is running"

@socketio.on('start_sniffer')
def handle_start_sniffer():
    print("[+] Sniffer requested from frontend.")
    start_sniffer(socketio)

if __name__ == "__main__":
    print("[*] Starting backend...")
    socketio.run(app, host="0.0.0.0", port=5000)
