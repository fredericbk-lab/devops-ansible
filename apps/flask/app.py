from flask import Flask
app = Flask(__name__)

@app.get("/")
def home():
    return "Flask Docker - Déployé par Ansible 🚀"
