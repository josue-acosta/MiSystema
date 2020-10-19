chart_info = {
    "colors": {
        "cake": "rgba(114, 9, 183)",
        "pastry": "rgba(76, 201, 240)",
        "bread": "rgba(242, 92, 162)",
        "none": "rgba(0, 0, 0, 0)"
    }
}


def sales_by_weekday(category_sales):
    """
    Args:
        category_sales (list): list of dictionaries.
            [{
                'price': 100 (int),
                'sales_category': 'cake' (str),
                'date': (2020, 41, 6) (date.isocalendar)}
            }]

    Returns:
        [0, 0, 0, 0, 0, 0, 0]

    Note:
        For date.isocalendar() the ISO code for days are that Monday is 1 and Sunday is 7.
        For cake_sales in the example below, Monday's cake sales is 37, Tuesday's 139, ..., Sunday's 742

    Example:
        cake_sales = sales_by_weekday(category_sales)
        cake_sales
        >>> [37, 139, 139, 139, 486, 972, 742]
    """

    sales_by_iso_weekday = [0, 0, 0, 0, 0, 0, 0]
    
    for item in category_sales:
        item_sale_day = item["date"][2]
        
        for index in range(7):
            if item_sale_day == index + 1:
                weekday_update = sales_by_iso_weekday[index] + item["price"]
                sales_by_iso_weekday[index] = weekday_update

    return sales_by_iso_weekday



def weekly_gross_sales(category_sales):
    """
    Args:
        category_sales (list): list of dictionaries.
            [{
                'price': 100 (int),
                'sales_category': 'cake' (str),
                'date': (2020, 41, 6) (date.isocalendar)}
            }]

    Returns:
        int
        >>> 100

    Example:
        cake_gross_sales = weekly_gross_sales(category_sales)
        cake_gross_sales
        >>> 750
    """

    sales_collection = [sale['price'] for sale in category_sales]
    sales_sum = sum(sales_collection)
 
    return sales_sum



def set_default(obj):
    """ 
    I need to to return JSON 
    
    Args:
        category_sales (list): list of dictionaries.
            [{
                'price': 100 (int),
                'sales_category': 'cake' (str),
                'date': (2020, 41, 6) (date.isocalendar)}
            }]

    Returns:
        [0, 0, 0, 0, 0, 0, 0]

    Note:
        I'm not sure how this works but I need it to generate nested dictionaries into JSON

    Example:
        json_sales = json.dumps(sale_categories, default=set_default)
        json_sales
        >>> [
        >>>     {
        >>>         "label": "Cake Sales",
        >>>         "data": weekday_cake_sales
        >>>     }
        >>> ]
    
    """
    if isinstance(obj, set):
        return list(obj)
    raise TypeError("Item is not a 'set' type")

# TODO create a function that fetches the weekly gross sales
# # get all of the sales
# orders = Orders.objects.only("date", "price", "sales_category")

# # filter for this week
# this_week = datetime.today().isocalendar()
# weekly_sales = [{"price": int(order.price), "sales_category": order.sales_category, "date": order.date.isocalendar()} for order in orders if order.date.isocalendar()[1] == this_week[1]]

# # separate sales by category
# cake_sales   = [item for item in weekly_sales if item['sales_category'] == "cake"]
# pastry_sales = [item for item in weekly_sales if item['sales_category'] == "pastry"]
# bread_sales  = [item for item in weekly_sales if item['sales_category'] == "bread"]