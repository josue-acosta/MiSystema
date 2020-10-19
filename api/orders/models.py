from api import db
from datetime import datetime

# mongo document schema for Order
class Orders(db.Document):
    # contact info
    order_number    = db.IntField()
    name            = db.StringField(maxlength=255)
    phone_number    = db.StringField(maxlength=10)

    # cake info
    cake_info       = db.ListField()
    cake_size       = db.StringField(maxlength=255)
    price           = db.IntField()
    flavor_1        = db.StringField(maxlength=255)
    flavor_2        = db.StringField(maxlength=255)
    filling         = db.StringField(maxlength=255)
    sales_category  = db.StringField(maxlength=255, default="cake")

    # delivery info
    date_time       = db.DateTimeField(default=datetime.utcnow())

    # decoration info
    decoration      = db.StringField(maxlength=255)
    print_out       = db.BooleanField(default=False)
    celebrated_name = db.StringField(maxlength=255)
    celebrated_age  = db.IntField()
    celebrated_text = db.StringField(maxlength=255)

    def __repr__(self):
        return "<MongoEngine Document: Orders :: New Cake Order>"


class Global(db.Document):
    count           = db.IntField()
    message         = db.StringField()

    def __repr__(self):
        return "<MongoEngine Document: Global :: Order Number Counter>"