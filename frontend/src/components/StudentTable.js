import { useState } from "react";
import * as XLSX from "xlsx";

export default function StudentTable({ students, setEditingStudent, deleteStudent }) {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const exportExcel = (data) => {
    if (data.length === 0) {
      alert("No data to download");
      return;
    }

    const formattedData = data.map((s) => ({
      ID: s.id,
      Name: s.name,
      Email: s.email,
      Age: s.age,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(workbook, "students.xlsx");
  };

  return (
    <div>

      <input
        type="text"
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />

      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => exportExcel(filteredStudents)}>
          Download Filtered
        </button>

        <button
          onClick={() => exportExcel(students)}
          style={{ marginLeft: "10px" }}
        >
          Download All
        </button>
      </div>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>

              <td>
                <button onClick={() => setEditingStudent(student)}>
                  Edit
                </button>

                <button
                  onClick={() => deleteStudent(student.id)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredStudents.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}