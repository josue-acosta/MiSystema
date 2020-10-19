from api import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_wtf import FlaskForm
from wtforms import TextField, PasswordField
from wtforms.validators import InputRequired, EqualTo


# MongoEngine document schema for User
class User(db.Document):
    username = db.StringField(maxlength=255, required=True)
    password_hash = db.StringField(maxlength=255, required=True)

    def __init__(self, password=None, **data):
        if password is not None:
            data["password_hash"] = generate_password_hash(password)
        super(User, self).__init__(**data)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)


# WTForm schema for login form
class LoginForm(FlaskForm):
    username = TextField("Username", [InputRequired()])
    password = PasswordField("Password", [InputRequired()])


# WTForm schema for register form
# class RegistrationForm(FlaskForm):
#     username = TextField("Username", [InputRequired()])
#     password = PasswordField("Password", [
#         InputRequired(),
#         EqualTo("confirm", message="Passwords must match")
#     ])
#     confirm = PasswordField("Confim Password", [InputRequired()])