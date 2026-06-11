import re

class InvalidEmailError(ValueError):
    def __init__(self, email):
        super().__init__(f"Invalid email address: '{email}'")

class UnderageError(ValueError):
    def __init__(self, age):
        super().__init__(f"Applicant must be at least 18 years old. Provided age: {age}")

class RegistrationService:
    def register_user(self, email: str, age: int) -> bool:
        if not email or not email.strip():  #empty email check
            raise InvalidEmailError(email)

        regex = r"^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
        if not re.match(regex, email):
            raise InvalidEmailError(email)

        assert type(age) is int, "Age must be an integer"

        if age < 18:
            raise UnderageError(age)

        return True