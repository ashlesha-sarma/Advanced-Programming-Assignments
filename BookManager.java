import java.util.ArrayList; 
import java.util.Scanner; 
 
public class BookManager { 
    public static void main(String[] args) { 
        ArrayList<String> books = new ArrayList<>(); 
        books.add("The Great Gatsby"); 
        books.add("To Kill a Mockingbird"); 
        books.add("The Catcher in the Rye"); 
        books.add("Brave New World"); 
        books.add("The Hobbit"); 
        books.add("Great Expectations"); 
 
        Scanner scanner = new Scanner(System.in); 
        System.out.print("Enter a word to search for in book titles: "); 
        String searchWord = scanner.nextLine(); 
 
        System.out.println("\nSearch Results:"); 
        boolean found = false; 
 
     //Search 
        for (String title : books) { 
            // Case-insensitive search 
            if (title.toLowerCase().contains(searchWord.toLowerCase())) { 
                System.out.println("- " + title); 
                found = true; 
            } 
        } 
 
        if (!found) { 
            System.out.println("No books found containing: " + searchWord); 
        } 
 
        scanner.close(); 
    } 
}