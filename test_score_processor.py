import pytest
from score_processor import ScoreProcessor

@pytest.fixture
def processor():
    return ScoreProcessor()

@pytest.fixture
def valid_score_file(tmp_path):
    file = tmp_path / "score.txt"
    file.write_text("25")
    return str(file)

@pytest.fixture
def invalid_score_file(tmp_path):
    file = tmp_path / "bad_score.txt"
    file.write_text("abc")
    return str(file)

def test_successful_calculation(processor, valid_score_file):
    result = processor.process_score_file(valid_score_file)
    assert result == 250

def test_missing_file_raises_error(processor):
    with pytest.raises(FileNotFoundError):
        processor.process_score_file("nonexistent_file.txt")

def test_invalid_content_raises_error(processor, invalid_score_file):
    with pytest.raises(ValueError):
        processor.process_score_file(invalid_score_file)

def test_missing_file_prints_error(processor, capsys):
    with pytest.raises(FileNotFoundError):
        processor.process_score_file("no_such_file.txt")
    captured = capsys.readouterr()
    assert "File not found" in captured.out

def test_invalid_content_prints_error(processor, invalid_score_file, capsys):
    with pytest.raises(ValueError):
        processor.process_score_file(invalid_score_file)
    captured = capsys.readouterr()
    assert "valid integer" in captured.out

def test_finally_always_prints(processor, capsys):
    with pytest.raises(FileNotFoundError):
        processor.process_score_file("no_such_file.txt")
    captured = capsys.readouterr()
    assert "File cleanup completed" in captured.out

def test_else_prints_on_success(processor, valid_score_file, capsys):
    processor.process_score_file(valid_score_file)
    captured = capsys.readouterr()
    assert "Data processed successfully" in captured.out