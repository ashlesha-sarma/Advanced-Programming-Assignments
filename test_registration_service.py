import pytest
from registration_service import RegistrationService, InvalidEmailError, UnderageError

@pytest.fixture
def service():
    return RegistrationService()

def test_successful_registration(service):
    result = service.register_user("ash@example.com", 20)
    assert result is True

def test_valid_email_minimum_age(service):
    result = service.register_user("user.name+tag@domain.co", 18)
    assert result is True

def test_empty_email_raises_invalid_email_error(service):
    with pytest.raises(InvalidEmailError):
        service.register_user("", 25)

def test_none_email_raises_invalid_email_error(service):
    with pytest.raises(InvalidEmailError):
        service.register_user(None, 25)

def test_malformed_email_no_at_symbol(service):
    with pytest.raises(InvalidEmailError):
        service.register_user("notanemail.com", 25)

def test_malformed_email_no_domain(service):
    with pytest.raises(InvalidEmailError):
        service.register_user("user@", 25)

def test_malformed_email_short_tld(service):
    with pytest.raises(InvalidEmailError):
        service.register_user("user@domain.c", 25)

def test_underage_user_raises_underage_error(service):
    with pytest.raises(UnderageError):
        service.register_user("ash@example.com", 17)

def test_age_zero_raises_underage_error(service):
    with pytest.raises(UnderageError):
        service.register_user("ash@example.com", 0)

def test_underage_error_message(service):
    with pytest.raises(UnderageError, match="17"):
        service.register_user("ash@example.com", 17)

def test_invalid_email_error_message(service):
    with pytest.raises(InvalidEmailError, match="bademail"):
        service.register_user("bademail", 22)