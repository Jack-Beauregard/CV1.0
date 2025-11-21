from flask import Flask, render_template, request, redirect, url_for, session
from functools import wraps
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Véletlenszerű titkosítási kulcs

# Jelszó (később config.py-ból töltjük be)
PASSWORD = "user@321"

# Session ellenőrző decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

# Login oldal
@app.route('/', methods=['GET', 'POST'])
@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['password'] == PASSWORD:
            session['logged_in'] = True
            return redirect(url_for('home'))
        else:
            error = 'Helytelen jelszó!'
    return render_template('login.html', error=error)

# Kijelentkezés
@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))

# Főoldal és menüpontok
@app.route('/home')
@login_required
def home():
    return render_template('home.html', active_page='home')

@app.route('/etc')
@login_required
def etc():
    return render_template('etc.html', active_page='etc')

@app.route('/learn')
@login_required
def learn():
    return render_template('learn.html', active_page='learn')

@app.route('/workx')
@login_required
def workx():
    return render_template('workx.html', active_page='workx')

@app.route('/hobby')
@login_required
def hobby():
    return render_template('hobby.html', active_page='hobby')

@app.route('/po')
@login_required
def po():
    return render_template('po.html', active_page='po')

@app.route('/lan')
@login_required
def lan():
    return render_template('lan.html', active_page='lan')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
