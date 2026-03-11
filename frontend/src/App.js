import { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

const initialData = [
  { id: 1, name: "John Doe", email: "john@gmail.com", age: 21 },
  { id: 2, name: "Emma Smith", email: "emma@gmail.com", age: 22 },
];

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setStudents(initialData);
      setLoading(false);
    }, 1000);
  }, []);

const addStudent = (student) => {
  const newId =
    students.length > 0
      ? Math.max(...students.map((s) => s.id)) + 1
      : 1;

  setStudents([...students, { ...student, id: newId }]);
};

  const updateStudent = (updated) => {
    setStudents(
      students.map((s) => (s.id === updated.id ? updated : s))
    );
    setEditingStudent(null);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading Students...</h2>;

  return (
    <div style={{ width: "800px", margin: "auto", marginTop: "40px" }}>
      <h2>Students Management</h2>

      <StudentForm
        addStudent={addStudent}
        updateStudent={updateStudent}
        editingStudent={editingStudent}
      />

      <StudentTable
        students={students}
        setEditingStudent={setEditingStudent}
        deleteStudent={deleteStudent}
      />
    </div>
  );
}