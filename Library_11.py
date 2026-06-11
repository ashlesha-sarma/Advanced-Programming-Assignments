from abc import ABC, abstractmethod

class LibraryItem(ABC):
    _total_items = 0

    def __init__(self, title, year):
        self._title = title
        self._year = year
        LibraryItem._total_items += 1

    @staticmethod
    def get_total_items():
        return LibraryItem._total_items

    @abstractmethod
    def displayInfo(self):
        pass


class Book(LibraryItem):
    def __init__(self, title, author, year=0):
        super().__init__(title, year)
        self._author = author

    def displayInfo(self):
        year_str = str(self._year) if self._year else "Unknown"
        print(f"[Book] '{self._title}' by {self._author} | Year: {year_str}")


class DVD(LibraryItem):
    def __init__(self, title, year, duration, genre):
        super().__init__(title, year)
        self._duration = duration
        self._genre = genre

    def displayInfo(self):
        print(f"[DVD] '{self._title}' | Genre: {self._genre} | {self._duration} min | Year: {self._year}")


def search_by_year(library, year):
    return [item for item in library if item._year == year]

#main
library = [
    Book("Clean Code", "Robert C. Martin", 2008),
    Book("The Pragmatic Programmer", "Andrew Hunt"),
    DVD("Interstellar", 2014, 169, "Sci-Fi"),
    DVD("The Social Network", 2010, 120, "Drama"),
]

print("Library Catalogue")
for item in library:
    item.displayInfo()

print(f"\nTotal items: {LibraryItem.get_total_items()}")

results = search_by_year(library, 2014)
print("\nItems from 2014")
for item in results:
    item.displayInfo()