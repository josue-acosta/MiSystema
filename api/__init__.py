from flask import Flask
from flask_mongoengine import MongoEngine
from flask_login import LoginManager


# app config
app = Flask(__name__)
app.config.from_object("api.configuration.DevelopmentConfig")


# initiate MongoDB
db = MongoEngine(app)


# authentication config
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "auth.login"


# register blueprints
from api.auth.views import auth_blueprint
app.register_blueprint(auth_blueprint)

from api.generic_urls.views import generic_urls_blueprint
app.register_blueprint(generic_urls_blueprint)

from api.orders.views import orders_blueprint
app.register_blueprint(orders_blueprint)

from api.food_cost.views import food_cost_blueprint
app.register_blueprint(food_cost_blueprint)