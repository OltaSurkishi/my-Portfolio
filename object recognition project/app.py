# Importon Flask dhe render_template nga flask per te krijuar aplikacionin web
# Importon SocketIO dhe send nga flask_socketio per komunikim ne kohe reale
from flask import Flask, render_template
from flask_socketio import SocketIO, send

# Krijon nje objekt Flask per aplikacionin
app = Flask(__name__)
# Konfiguron nje celes sekret per sesionet e Flask
app.config['SECRET_KEY'] = 'secret!'
# Inicon SocketIO me aplikacionin Flask
socketio = SocketIO(app)

# Definon rrugen per faqen kryesore
@app.route('/')
def index():
    # Shfaq faqen index.html kur vizitohet faqja kryesore
    return render_template('index.html')

# Definon nje handler per ngjarjen 'message' te SocketIO
@socketio.on('message')
def handle_message(msg):
    # Printon mesazhin e marre ne terminal
    print('Message: ' + msg)
    # Dergon mesazhin te gjithe klientet (broadcast)
    send(msg, broadcast=True)

# Kontrollon nese skedari ekzekutohet direkt dhe nese po, niset aplikacioni
if __name__ == '__main__':
    socketio.run(app)
