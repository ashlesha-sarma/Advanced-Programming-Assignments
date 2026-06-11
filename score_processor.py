class ScoreProcessor:
    def process_score_file(self, file_path: str) -> int:
        result = None
        try:
            with open(file_path, "r") as f:
                content = f.read().strip()
                score = int(content)
                result = score * 10
        except FileNotFoundError:
            print(f"Error: File not found: '{file_path}'")
            raise
        except ValueError:
            print("Error: File does not contain a valid integer.")
            raise
        else:
            print("Data processed successfully")
        finally:
            print("File cleanup completed")
        return result
    
