inventory = [ 
    {"name": "Apples", "stock": 4}, 
    {"name": "Bananas", "stock": 50}, 
    {"name": "Oranges", "stock": 2}, 
    {"name": "Milk", "stock": 18}, 
    {"name": "Bread", "stock": 20}, 
    {"name": "Cheese", "stock": 5} 
] 
 
print("Low Stock Alert (Less than 10)") 
 
low_stock_found = False 
 
for product in inventory: 
    if product["stock"] < 10: 
        print(f" {product['name']} is low on stock! Current: {product['stock']}") 
        low_stock_found = True 
 
if not low_stock_found: 
    print("All products are well-stocked.")

    