import os
import sys
import inspect

from flask import Flask

from flask_cors import CORS

from setup import SetupPlugins
from .resources.core.urls import blueprint as core_blueprint
from .resources.user.urls import blueprint as user_blueprint
from .resources.auth.urls import blueprint as auth_blueprint

from extensions import db, jwt, swagger
from config import config

flask_env = os.environ.get("FLASK_ENV", "development")


def create_app():
    app = Flask(__name__)
    app.config = dict(app.config, **config.get('system'))
    CORS(app, supports_credentials=True)
    SetupPlugins().installBlueprint(app)
    configure_extensions(app)
    register_blueprints(app)
    return app


def configure_extensions(app):
    db.init_app(app)
    jwt.init_app(app)
    if flask_env == "development":
        swagger.init_app(app)
    # db.create_all(app=app)


def register_blueprints(app):
    app.register_blueprint(user_blueprint, url_prefix='/user')
    app.register_blueprint(auth_blueprint, url_prefix='/auth')
    app.register_blueprint(core_blueprint, url_prefix='/core')
    # app.register_blueprint(organization_blueprint, url_prefix='/org')



config_name = os.environ.get('API_CONFIG', 'development')
app = create_app()
