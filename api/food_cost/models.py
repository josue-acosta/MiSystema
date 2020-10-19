from api import db



def get_ingredient_list(food_cost_item):
    ingredient_list = []

    for item in food_cost_item[0]["ingredients"]:
        temp_dict = {}

        for key, value in item.items():
            temp_dict[key] = value.id

        ingredient_list.append(temp_dict)

    return ingredient_list


# mongo document schema to embed in FoodCost.ingredients
class Ingredient(db.Document):
    ingredient      = db.StringField(maxlength=225)
    recipe_quantity = db.StringField(maxlength=225)
    apc_unit        = db.DecimalField(precision=2)
    yield_ratio     = db.DecimalField(precision=2)
    epc_unit        = db.DecimalField(precision=2)
    total_cost      = db.DecimalField(precision=2)

    def __repr__(self):
        return "<MongoEngine Document: Ingredient>"



# mongo document schema for FoodCost
class FoodCost(db.Document):
    category            = db.StringField(maxlength=255)
    menu_item           = db.StringField(maxlength=255)
    url                 = db.StringField(maxlength=255)
    created_on_date     = db.StringField(maxlength=255)
    last_updated_on     = db.StringField(maxlength=255)
    portions_size       = db.StringField(maxlength=255)
    cost_per_portion    = db.DecimalField(precision=2)
    sales_price         = db.DecimalField(precision=2)
    food_cost_percent   = db.StringField()
    recipe_quantity     = db.IntField()
    total_recipe_cost   = db.DecimalField(precision=2)
    total_gross_sales   = db.DecimalField(precision=2)
    ingredients         = db.ListField(db.DictField(db.ReferenceField(Ingredient)))

    def __repr__(self):
        return "<MongoEngine Document: FoodCost>"