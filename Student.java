import java.util.*;

public class Student {

    private int id;          
    private String name;
    private List<String> courses;          
    private Map<String, Integer> scores;   

    public Student(int id, String name, List<String> courses, Map<String, Integer> scores) {
        this.id      = id;
        this.name    = name;
        this.courses = new ArrayList<>(courses);       
        this.scores  = new HashMap<>(scores);
    }

    public int getId()                          { return id;      }
    public String getName()                     { return name;    }
    public List<String> getCourses()            { return Collections.unmodifiableList(courses); }
    public Map<String, Integer> getScores()     { return Collections.unmodifiableMap(scores);  }

    public int getScore(String course, int def) {
        return scores.getOrDefault(course, def);
    }

    public double getAverageScore() {
        if (courses.isEmpty()) return 0.0;

        return courses.stream()
                      .mapToInt(c -> scores.getOrDefault(c, 0))
                      .average()
                      .orElse(0.0);
    }


}