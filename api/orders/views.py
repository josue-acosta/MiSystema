from flask import render_template, request, redirect, url_for, Blueprint
from flask_login import login_required
from api.orders.models import Orders, Global
from api.generic_urls.models import set_default

import json
from datetime import date, datetime


orders_blueprint = Blueprint("orders", __name__)


@orders_blueprint.route("/orders")
def orders():
    """Gets all the orders and returns a JSON object"""
    orders = Orders.objects.only("id", "order_number", "name", "flavor_1", "flavor_2", "cake_size", "date_time", "price")

    # create a dictionary to export as JSON
    all_orders = [
        {
            "id": str(order.id),
            "order_number": order.order_number, 
            "name": order.name, 
            "flavor_1": order.flavor_1,
            "flavor_2": order.flavor_2,
            "cake_size": order.cake_size,
            "iso_week": str(order.date_time.isocalendar()[1]),
            "date_time": order.date_time.strftime("%A %-d, %-I%p"),
            "price": int(order.price)
        } 
        for order in orders
    ]


    # export dictionary to export as JSON
    json_orders = json.dumps(all_orders, default=set_default)


    return json_orders



@orders_blueprint.route("/add-order", methods=["POST"])
def add_order():
    """Creates a new Order object from NewCakeOrder component"""
    # Decodes byte data from form into JSON
    requestData = json.loads(request.data.decode('utf-8'))

    # Retrieves and increments 'count' from Global collection
    order_count = Global.objects(pk="5f69f6e0ff79e0b681fb9c0a")
    order_count.update_one(inc__count=1)

    # Converts 'date_time' string field from form into valid DateTimeField format
    date_time_iso = datetime.strptime(requestData["date_time"], "%Y-%m-%dT%H:%M")

    # Create new Order document
    order = Orders(
        # contact info
        order_number    = order_count[0].count,
        name            = requestData["name"],
        phone_number    = requestData["phone_number"],

        # cake info
        cake_size       = requestData["cake_size"],
        price           = requestData["price"],
        flavor_1        = requestData["flavor_1"],
        flavor_2        = requestData["flavor_2"],
        filling         = requestData["filling"],

        # delivery info
        date_time       = date_time_iso,

        # decoration info
        decoration      = requestData["decoration"],
        print_out       = requestData["print_out"],
        celebrated_name = requestData["celebrated_name"],
        celebrated_age  = requestData["celebrated_age"],
        celebrated_text = requestData["celebrated_text"]
    )

    # Saves newly created Order document to 'orders' collection
    order.save()

    return {"message" : "order saved successfully"}



@orders_blueprint.route("/orders/view/<string:order_id>")
# @login_required
def view_order(order_id):
    order = Orders.objects.get_or_404(id=order_id)

    cake_order = {
        "id": str(order.id),
        "order_number": order.order_number,
        "name": order.name,
        "phone_number": order.phone_number,
        "cake_size": order.cake_size,
        "price": order.price,
        "flavor_1": order.flavor_1,
        "flavor_2": order.flavor_2,
        "filling": order.filling,
        "date_time": order.date_time.strftime("%A %-d, %-I%p"),
        "decoration": order.decoration,
        "print_out": order.print_out,
        "celebrated_name": order.celebrated_name,
        "celebrated_age": order.celebrated_age,
        "celebrated_text": order.celebrated_text
    }

    # export dictionary to export as JSON
    json_cake_order = json.dumps(cake_order, default=set_default)

    return json_cake_order



@orders_blueprint.route("/order/edit/<string:order_id>", methods=["GET", "POST"])
# @login_required
def edit_order(order_id):
    order = Orders.objects.get_or_404(id=order_id)

    if request.method == "POST":
        # Decodes byte data from form into JSON
        requestData = json.loads(request.data.decode('utf-8'))

        # Converts 'date_time' string field from form into valid DateTimeField format
        date_time_iso = datetime.strptime(requestData["date_time"], "%Y-%m-%dT%H:%M")

        # Updates new Order document
        order.update(
            # contact info
            name            = requestData["name"],
            phone_number    = requestData["phone_number"],

            # cake info
            cake_size       = requestData["cake_size"],
            price           = requestData["price"],
            flavor_1        = requestData["flavor_1"],
            flavor_2        = requestData["flavor_2"],
            filling         = requestData["filling"],

            # delivery info
            date_time       = date_time_iso,

            # decoration info
            decoration      = requestData["decoration"],
            print_out       = requestData["print_out"],
            celebrated_name = requestData["celebrated_name"],
            celebrated_age  = requestData["celebrated_age"],
            celebrated_text = requestData["celebrated_text"]
        )

        return {"messgae":"POST Edit Order"}

    cake_order = {
        "id": str(order.id),
        "order_number": order.order_number,
        "name": order.name,
        "phone_number": order.phone_number,
        "cake_size": order.cake_size,
        "price": order.price,
        "flavor_1": order.flavor_1,
        "flavor_2": order.flavor_2,
        "filling": order.filling,
        "date_time": order.date_time.strftime("%Y-%m-%dT%H:%M"),
        "decoration": order.decoration,
        "print_out": order.print_out,
        "celebrated_name": order.celebrated_name,
        "celebrated_age": order.celebrated_age,
        "celebrated_text": order.celebrated_text
    }

    # export dictionary to export as JSON
    json_cake_order = json.dumps(cake_order, default=set_default)

    return json_cake_order

    # return {"messgae":"GET Edit Order"}

# @orders_blueprint.route("/edit/<id>", methods=["GET", "POST"])
# # @login_required
# def edit_order(id):
#     order = Orders.objects.get_or_404(id=id)
#     form = OrderForm(meta={'csrf': False})

#     if request.method == "POST":

#         order.update(
#             date=form.date.data,
#             time=form.time.data,
#             name=form.name.data,
#             phone_number=form.phone_number.data,
#             cake_size=form.cake_size.data,
#             price=form.price.data,
#             flavor_1=form.flavor_1.data,
#             flavor_2=form.flavor_2.data,
#             filling=form.filling.data
#         )

#         return redirect(url_for("order.view_order", id=id))

#     return render_template("edit-order.html", order=order, form=form)



@orders_blueprint.route("/orders/delete/<string:order_id>")
# @login_required
def delete_order(order_id):
    order = Orders.objects.get_or_404(id = order_id)

    order.delete()

    return {"message":"Order deleted"}