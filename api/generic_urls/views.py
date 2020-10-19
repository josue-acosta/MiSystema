from flask import Blueprint
from flask_login import login_required
from api.orders.models import Orders
from api.generic_urls.models import sales_by_weekday, weekly_gross_sales, set_default, chart_info

import json
from datetime import date, datetime


generic_urls_blueprint = Blueprint("generic_urls", __name__)


@generic_urls_blueprint.route("/weekday-sales")
def weekday_gross_sales():
    """Gets all the orders and returns a JSON object"""
    # get all of the sales
    orders = Orders.objects.only("date", "price", "sales_category")

    # filter for this week
    this_week = datetime.today().isocalendar()
    weekly_sales = [{"price": int(order.price), "sales_category": order.sales_category, "date": order.date.isocalendar()} for order in orders if order.date.isocalendar()[1] == this_week[1]]

    # separate sales by category
    cake_sales   = [item for item in weekly_sales if item['sales_category'] == "cake"]
    pastry_sales = [item for item in weekly_sales if item['sales_category'] == "pastry"]
    bread_sales  = [item for item in weekly_sales if item['sales_category'] == "bread"]

    # create an list of sales by the dictionary
    weekday_cake_sales   = [item for item in sales_by_weekday(cake_sales)]
    weekday_pastry_sales = [item for item in sales_by_weekday(pastry_sales)]
    weekday_bread_sales  = [item for item in sales_by_weekday(bread_sales)]

    # create a dictionary to export as JSON
    line_tension = .1
    sale_categories = [
        {
            "label": "Cake Sales",
            "lineTension": line_tension,
            "borderColor": chart_info["colors"]["cake"],
            "backgroundColor": chart_info["colors"]["none"],
            "data": weekday_cake_sales
        },
        {
            "label": "Pastry Sales",
            "lineTension": line_tension,
            "borderColor": chart_info["colors"]["pastry"],
            "backgroundColor": chart_info["colors"]["none"],
            "data": weekday_pastry_sales
        },
        {
            "label": "Bread Sales",
            "lineTension": line_tension,
            "borderColor": chart_info["colors"]["bread"],
            "backgroundColor": chart_info["colors"]["none"],
            "data": weekday_bread_sales
        }
    ]

    # export dictionary as JSON
    json_sales = json.dumps(sale_categories, default=set_default)

    return json_sales


@generic_urls_blueprint.route("/weekly-gross-sales")
def get_weekly_gross_sales():
    # get all of the sales
    orders = Orders.objects.only("date", "price", "sales_category")

    # filter for this week
    this_week = datetime.today().isocalendar()
    weekly_sales = [{"price": int(order.price), "sales_category": order.sales_category, "date": order.date.isocalendar()} for order in orders if order.date.isocalendar()[1] == this_week[1]]

    # separate sales by category
    cake_sales   = [item for item in weekly_sales if item['sales_category'] == "cake"]
    pastry_sales = [item for item in weekly_sales if item['sales_category'] == "pastry"]
    bread_sales  = [item for item in weekly_sales if item['sales_category'] == "bread"]

    # create a dictionary to export as JSON
    dataset = [
            {
                "data": [
                    weekly_gross_sales(cake_sales), 
                    weekly_gross_sales(pastry_sales), 
                    weekly_gross_sales(bread_sales)
                ],
                "backgroundColor": [
                    chart_info["colors"]["cake"],
                    chart_info["colors"]["pastry"],
                    chart_info["colors"]["bread"]
                ]
            }
        ]

    # export dictionary as JSON
    json_dataset = json.dumps(dataset, default=set_default)

    return json_dataset