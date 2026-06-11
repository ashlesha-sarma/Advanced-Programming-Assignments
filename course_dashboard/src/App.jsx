import { useState } from "react";

function App(){

  const names = [
    "Aarav","Vivaan","Aditya","Vihaan","Arjun",
    "Reyansh","Sai","Krishna","Ishaan","Rohan",
    "Ananya","Diya","Saanvi","Aadhya","Riya",
    "Priya","Neha","Kavya","Meera","Ira"
  ];

  const gpas = [
    3.8,3.5,3.9,3.2,3.7,
    3.6,3.4,3.1,3.3,3.0,
    3.9,3.8,3.7,3.6,3.5,
    3.4,3.3,3.2,3.1,3.0
  ];

  const courses = [
    ["Math","Physics"],["Algorithms","DBMS"],["AI","ML"],
    ["OS","Networks"],["Math","AI"],["DBMS","OS"],
    ["Physics","Chemistry"],["ML","AI"],["Networks","Security"],
    ["Math","DBMS"],["AI","UI"],["Graphics","ML"],
    ["Physics","Math"],["OS","DBMS"],["Security","AI"],
    ["ML","Data Science"],["Math","Statistics"],
    ["Networks","Cloud"],["AI","Robotics"],["DBMS","Big Data"]
  ];

  const initialStudents = names.map((name,i)=>({
    id: i+1,
    name,
    enrolledCourses: new Set(courses[i]),
    gpa: gpas[i]
  }));

  const [students,setStudents] = useState(initialStudents);

  const [studentMap,setStudentMap] = useState(
    new Map(initialStudents.map(s=>[s.id,s]))
  );

  const [name,setName] = useState("");
  const [course,setCourse] = useState("");
  const [gpa,setGpa] = useState("");
  const [removeId,setRemoveId] = useState("");

 
  const [filterInput,setFilterInput] = useState("");
  const [applyFilter,setApplyFilter] = useState(false);

  function addStudent(){
    const id = students.length>0
      ? Math.max(...students.map(s=>s.id))+1
      : 1;

    const courseList = course
      .split(",")
      .map(c=>c.trim())
      .filter(c=>c!=="");

    const newStudent={
      id,
      name,
      enrolledCourses:new Set(courseList),
      gpa:Number(gpa)
    };

    setStudents(prev=>[...prev,newStudent]);

    const newMap=new Map(studentMap);
    newMap.set(id,newStudent);
    setStudentMap(newMap);

    setName("");
    setCourse("");
    setGpa("");
  }

  function removeStudent(id){
    setStudents(prev=>prev.filter(s=>s.id!==id));

    const newMap=new Map(studentMap);
    newMap.delete(id);
    setStudentMap(newMap);

    setRemoveId("");
  }

  const sortedStudents=[...students].sort((a,b)=>b.gpa-a.gpa);

  const uniqueCourses=new Set();
  students.forEach(s=>s.enrolledCourses.forEach(c=>uniqueCourses.add(c)));

  function filterByCourse(){
    if (!applyFilter || !filterInput.trim()) return sortedStudents;

    return students
      .filter(s => s.enrolledCourses.has(filterInput.trim()))
      .sort((a, b) => b.gpa - a.gpa);
  }

  const avgGPA =
  students.reduce((sum, s) => sum + s.gpa, 0) / students.length;

  return(
    <div>

      <h1>Course Enrollment Dashboard</h1>

      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
      <input placeholder="Courses" value={course} onChange={e=>setCourse(e.target.value)}/>
      <input placeholder="GPA" value={gpa} onChange={e=>setGpa(e.target.value)}/>
      <button onClick={addStudent}>Add Student</button>

      <hr/>

      <h3 style={{textAlign:"center"}}>Students (Sorted by GPA)</h3>
     

      <table border="1" cellPadding="5" style={{margin:"0 auto"}}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>GPA</th><th>Courses</th>
          </tr>
        </thead>

        <tbody>
          {filterByCourse().map(s=>(
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.gpa}</td>
              <td>{[...s.enrolledCourses].join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr/>

  
      <div style={{display:"flex",justifyContent:"space-between"}}>


        <div>
          <h3>Unique Courses</h3>
          {[...uniqueCourses].map(c=>(<div key={c}>{c}</div>))}
        </div>
        <div>
          <h3>Average GPA: {avgGPA.toFixed(2)}</h3>
        </div>

        <div>
          <h3>Filter by Course</h3>
          <input
            placeholder="Enter course"
            value={filterInput}
            onChange={e=>setFilterInput(e.target.value)}
          />
          <br/>
          <button onClick={()=>setApplyFilter(true)}>Filter</button>
          <button onClick={()=>setApplyFilter(false)}>Reset</button>
        </div>

        <div>
          <h3>Remove Student</h3>
          <input
            placeholder="Enter ID"
            value={removeId}
            onChange={e=>setRemoveId(e.target.value)}
          />
          <br/>
          <button onClick={()=>removeStudent(Number(removeId))}>
            Remove
          </button>
        </div>

      </div>

    </div>
  );
}

export default App;