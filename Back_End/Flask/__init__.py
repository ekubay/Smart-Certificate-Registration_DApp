"""Start Flask app."""
from flask import Flask
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from Flask.routes import init_routes


db = MongoEngine()
jwt = JWTManager()
cors = CORS()

def init_app():
    """Construct core Flask application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.ApplicationConfig')

    # Initialize Plugins
    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)


    with app.app_context():
        from Flask.models import User
        app = init_routes(app, User)

    return app
