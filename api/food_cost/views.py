from flask import Blueprint, request
from flask_login import login_required
from api.data.menu_items import cake_menu_items, pastry_menu_items, bread_menu_items
from api.food_cost.models import FoodCost, get_ingredient_list
from api.generic_urls.models import set_default
import json


food_cost_blueprint = Blueprint("food_cost", __name__)


@food_cost_blueprint.route("/add-food-cost", methods=["GET", "POST"])
# @login_required
def add_food_cost():

    if request.method == "POST":

        food_cost_item = FoodCost(
            category            = "bread",
            menu_item           = "Pan de Trigo",
            url                 = "pan-de-trigo",
            created_on_date     = "Oct. 12, 2020",
            last_updated_on     = "Oct. 20, 2020",
            portions_size       = "1",
            cost_per_portion    = 0.15,
            sales_price         = 0.95,
            food_cost_percent   = "15.78",
            recipe_quantity     = 100,
            total_recipe_cost   = 15,
            total_gross_sales   = 95,
            ingredients         = [
                { 
                    "ingredient": "Flour",
                    "recipe_quantity": "8 oz",
                    "apc_unit": 0.05,
                    "yield_ratio": 1,
                    "epc_unit": 0.05,
                    "total_cost": 0.40
                },
                {
                    "ingredient": "Sugar",
                    "recipe_quantity": "8 oz",
                    "apc_unit": 0.01,
                    "yield_ratio": 1,
                    "epc_unit": 0.01,
                    "total_cost": 0.08
                },
                {
                    "ingredient": "Egg",
                    "recipe_quantity": "6 ct",
                    "apc_unit": 0.25,
                    "yield_ratio": 1,
                    "epc_unit": 0.25,
                    "total_cost": 1.50
                },
                {
                    "ingredient": "Vanilla Extract",
                    "recipe_quantity": ".5 T",
                    "apc_unit": 0.25,
                    "yield_ratio": 1,
                    "epc_unit": 0.25,
                    "total_cost": 0.06
                }
            ]
        )

        food_cost_item.save()

        return {"message" : "save succeful"}




@food_cost_blueprint.route("/food-cost")
def get_food_cost():
    # get all of the food items

    # separate food items by category

    # create a dictionary to export as JSON
    categories = { 
        "cakes": cake_menu_items,
        "pastries": pastry_menu_items,
        "bread": bread_menu_items
    }


    # export dictionary as JSON
    json_categories = json.dumps(categories, default=set_default)


    return json_categories



@food_cost_blueprint.route("/food-cost/<string:category_item>")
def get_food_cost_category_item(category_item):
    # get all of the menu items from url
    all_food_cost_items = FoodCost.objects(url = category_item).exclude("ingredients")


    # build React itemData model
    menu_items   = [
        {
            "id": str(item.id),
            "createdOnDate": item.created_on_date,
            "lastUpdatedOn": item.last_updated_on,
            "portionSize": item.portions_size,
            "costPerPortion": float(item.cost_per_portion),
            "salesPrice": float(item.sales_price),
            "foodCostPercent": item.food_cost_percent
        } 
        for item in all_food_cost_items
    ]


    # create a dictionary to export as JSON
    category_items_list = { 
        "foodItem": all_food_cost_items[0]["menu_item"],
        "itemData": menu_items
    }


    # export dictionary as JSON
    json_category_items_list = json.dumps(category_items_list, default=set_default)


    return json_category_items_list



@food_cost_blueprint.route("/food-cost/<string:category_item>/<string:menu_item_id>")
def get_food_cost_item(category_item, menu_item_id):
    # call database for item based on id
    food_cost_item = FoodCost.objects(pk = menu_item_id)


    menu_item_data = [
        {
            "foodItem": item["menu_item"],
            "createdOnDate": item["created_on_date"],
            "lastUpdatedOn": item["last_updated_on"],
            "portionSize": item["portions_size"],
            "costPerPortion": float(item["cost_per_portion"]),
            "salesPrice": float(item["sales_price"]),
            "foodCostPercent": item["food_cost_percent"],
            "recipeQuantity": item["recipe_quantity"],
            "totalRecipeCost": float(item["total_recipe_cost"]),
            "totalGrosSales": float(item["total_gross_sales"])
        } 
        for item in food_cost_item
    ]


    food_cost_item_description = {
        "itemData": menu_item_data[0],
        "ingredients": get_ingredient_list(food_cost_item)
    }


    # export dictionary as JSON
    json_food_cost_item_description = json.dumps(food_cost_item_description)


    return json_food_cost_item_description