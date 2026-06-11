import java.util.*;
import java.util.stream.*;

public class StudentAnalyzer {

    public List<Student> getTopNStudents(List<Student> students, int n) {
        if (students == null || students.isEmpty() || n <= 0) return new ArrayList<>();

        return students.stream()
                       .sorted(Comparator.comparingDouble(Student::getAverageScore).reversed())
                       .limit(n)
                       .collect(Collectors.toCollection(ArrayList::new));
    }


    public Map<String, Double> getAverageScorePerCourse(List<Student> students) {
        if (students == null || students.isEmpty()) return new HashMap<>();

        return students.stream()
                .flatMap(student -> student.getCourses().stream()
                        .map(course -> new AbstractMap.SimpleEntry<>(course, student.getScore(course, 0))))
                .collect(Collectors.groupingBy(
                        Map.Entry::getKey,
                        HashMap::new,
                        Collectors.averagingInt(Map.Entry::getValue)
                ));
    }

 
    public Set<String> getAllUniqueCourses(List<Student> students) {
        if (students == null || students.isEmpty()) return new HashSet<>();

        return students.stream()
                       .flatMap(s -> s.getCourses().stream())
                       .collect(Collectors.toCollection(HashSet::new));
    }
}