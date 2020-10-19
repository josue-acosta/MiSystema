from flask import request, render_template, redirect, url_for,  g, Blueprint
from flask_login import current_user, login_user, logout_user, login_required
from api import login_manager
from api.auth.models import User, LoginForm
import time


auth_blueprint = Blueprint("auth", __name__)


@login_manager.user_loader
def load_user(id):
    return User.objects.get_or_404(id=id)


@auth_blueprint.before_request
def get_current_user():
    g.user = current_user


@auth_blueprint.route("/", methods=["GET", "POST"])
def login():
    form = LoginForm(meta={'csrf': False})

    if current_user.is_authenticated:
        print("user is already authenticated")

    if form.validate_on_submit():
        username = request.form.get("username")
        password = request.form.get("password")

        try:
            existing_user = User.objects.get(username=username)

            if not (existing_user and existing_user.check_password(password)):
                print("Invalid username or password. Please try again.")

                return render_template("login.html", form=form)

            login_user(existing_user)

            return { "Message": "Successfully logged in" } 

        except User.DoesNotExist:
            pass

    return render_template("login.html", form=form)


@auth_blueprint.route("/logout")
@login_required
def logout():
    logout_user()

    return { "Message": "Successfully logged out" } 