import java.util.*;

public class Main {

    public static void main(String[] args) {
        List<Student> batch = buildBatch();
        StudentAnalyzer analyzer = new StudentAnalyzer();

        System.out.println("Top 3 Students:");
        List<Student> top = analyzer.getTopNStudents(batch, 3);
        for (Student s : top) {
            System.out.println(s.getId() + " " + s.getName() + " " +
                    String.format("%.2f", s.getAverageScore()));
        }

        System.out.println("\nAverage Score Per Course:");
        Map<String, Double> avg = analyzer.getAverageScorePerCourse(batch);
        for (Map.Entry<String, Double> e : avg.entrySet()) {
            System.out.println(e.getKey() + " " +
                    String.format("%.2f", e.getValue()));
        }

        System.out.println("\nUnique Courses:");
        Set<String> courses = analyzer.getAllUniqueCourses(batch);
        for (String c : courses) {
            System.out.println(c);
        }
    }

    private static List<Student> buildBatch() {
        List<Student> students = new ArrayList<>();

        students.add(makeStudent(101, "Alice",
                Arrays.asList("DSA", "DBMS"),
                makeScores("DSA", 90, "DBMS", 85)));

        students.add(makeStudent(102, "Bob",
                Arrays.asList("DSA", "ML"),
                makeScores("DSA", 75, "ML", 88)));

        students.add(makeStudent(103, "Clara",
                Arrays.asList("OS", "DBMS"),
                makeScores("OS", 70, "DBMS", 80)));

        return students;
    }

    private static Student makeStudent(int id, String name,
                                       List<String> courses,
                                       Map<String, Integer> scores) {
        return new Student(id, name, courses, scores);
    }

    private static Map<String, Integer> makeScores(Object... pairs) {
        Map<String, Integer> map = new HashMap<>();
        for (int i = 0; i < pairs.length - 1; i += 2) {
            map.put((String) pairs[i], (Integer) pairs[i + 1]);
        }
        return map;
    }
}