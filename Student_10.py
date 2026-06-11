class Address:
    def __init__(self, street, city, zip_code):
        self.street = street
        self.city = city
        self.zip_code = zip_code

    def __str__(self):
        return f"{self.street}, {self.city} - {self.zip_code}"


class Student:
    def __init__(self, name, age, address):
        self.name = name
        self.age = age
        self.address = address
        self._courses = []

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if not isinstance(value, int) or value <= 0:
            raise ValueError("Invalid age")
        self._age = value

    def add_course(self, course):
        self._courses.append(course)

    def display(self):
        print(f"Name    : {self.name}")
        print(f"Age     : {self.age}")
        print(f"Address : {self.address}")
        print("Courses :", self._courses if self._courses else "None")


class ScholarshipStudent(Student):
    def __init__(self, name, age, address, scholarship_amount):
        super().__init__(name, age, address)
        self.scholarship_amount = scholarship_amount

    def display(self):
        super().display()
        print(f"Scholarship : {self.scholarship_amount}")

#main
addr1 = Address("12 MG Road", "Tezpur", "784001")
s1 = Student("Alice", 20, addr1)
s1.add_course("Data Structures")
s1.add_course("DBMS")
s1.display()

addr2 = Address("45 NH-15", "Guwahati", "781001")
s2 = ScholarshipStudent("Bob", 21, addr2, 50000)
s2.add_course("Machine Learning")
s2.display()