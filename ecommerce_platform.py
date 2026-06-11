from abc import ABC, abstractmethod

# order types
class Order:
    def __init__(self, customer_name, items):
        self.customer_name = customer_name
        self.items = items   #{"name": ..., "price": ...}

    def calculate_total(self):
        return sum(item["price"] for item in self.items)

    def get_order_type(self):
        return "Regular Order"

class DiscountedOrder(Order):
    def calculate_total(self):
        return super().calculate_total() * 0.9   

    def get_order_type(self):
        return "Discounted Order"

class PriorityOrder(Order):
    def calculate_total(self):
        return super().calculate_total() + 100   

    def get_order_type(self):
        return "Priority Order"

# payment methods
class PaymentProcessor(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass

class CreditCardPayment(PaymentProcessor):
    def process_payment(self, amount):
        print(f"  Credit Card payment of Rs.{amount} processed.")

class UPIPayment(PaymentProcessor):
    def process_payment(self, amount):
        print(f"  UPI payment of Rs.{amount} processed.")

class WalletPayment(PaymentProcessor):
    def process_payment(self, amount):
        print(f"  Wallet payment of Rs.{amount} processed.")

# notification methods
class NotificationSender(ABC):
    @abstractmethod
    def send_notification(self, customer_name):
        pass

class EmailNotification(NotificationSender):
    def send_notification(self, customer_name):
        print(f"  Email sent to {customer_name}.")

class SMSNotification(NotificationSender):
    def send_notification(self, customer_name):
        print(f"  SMS sent to {customer_name}.")

class PushNotification(NotificationSender):
    def send_notification(self, customer_name):
        print(f"  Push notification sent to {customer_name}.")

# storage methods
class Storage(ABC):
    @abstractmethod
    def save_order(self, order):
        pass

class DatabaseStorage(Storage):
    def save_order(self, order):
        print(f"  Order for {order.customer_name} saved to Database.")

class FileStorage(Storage):
    def save_order(self, order):
        print(f"  Order for {order.customer_name} saved to File.")

#controls flow of ordering process
class OrderService:
    def __init__(self, payment, notifiers, storage):
        self.payment   = payment      
        self.notifiers = notifiers    
        self.storage   = storage      

    def place_order(self, order):
        print(f"\nOrder Type : {order.get_order_type()}")
        print(f"Customer   : {order.customer_name}")
        total = order.calculate_total()
        print(f"Total      : Rs.{total}")

        self.payment.process_payment(total)

        for notifier in self.notifiers:         
            notifier.send_notification(order.customer_name)

        self.storage.save_order(order)
        print("Status     : Order placed successfully!\n")

# main
if __name__ == "__main__":
    items1 = [{"name": "Keyboard", "price": 3000},
              {"name": "Mouse",    "price": 1000}]
    items2 = [{"name": "Laptop",   "price": 75000}]

    order1   = Order("Asha", items1)
    service1 = OrderService(
        payment   = CreditCardPayment(),
        notifiers = [EmailNotification(), SMSNotification()],
        storage   = DatabaseStorage()
    )
    service1.place_order(order1)

    order2   = DiscountedOrder("Rohan", items2)
    service2 = OrderService(
        payment   = UPIPayment(),
        notifiers = [PushNotification()],
        storage   = FileStorage()
    )
    service2.place_order(order2)

    order3   = PriorityOrder("Ananya", items1)
    service3 = OrderService(
        payment   = WalletPayment(),
        notifiers = [EmailNotification(), PushNotification()],
        storage   = DatabaseStorage()
    )
    service3.place_order(order3)