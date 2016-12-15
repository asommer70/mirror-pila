from flask import Flask, request, url_for, render_template

app = Flask(__name__)

@app.route('/')
def index():
  name = 'Beans...'
  return render_template('index.html', name=name)
