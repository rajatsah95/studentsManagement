import { useState, useEffect } from "react";

export default function StudentForm({ addStudent, updateStudent, editingStudent }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) setForm(editingStudent);
  }, [editingStudent]);

  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name required";

    if (!form.email) err.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Invalid email";

    if (!form.age) err.age = "Age required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (editingStudent) {
      updateStudent(form);
    } else {
      addStudent(form);
    }

    setForm({ name: "", email: "", age: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {errors.name && <span>{errors.name}</span>}

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      {errors.email && <span>{errors.email}</span>}

      <input
        placeholder="Age"
        value={form.age}
        type="number"
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />
      {errors.age && <span>{errors.age}</span>}

      <button type="submit">
        {editingStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}