import React, { useState } from 'react';
import Header from './components/Header';
import StudentTable from './components/StudentTable';
import AddStudentForm from './components/AddStudentForm';
import Watermark from './components/Moin';
import './index.css';

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Moin Khan", score: 85 },
    { id: 2, name: "Jesse Pinkman", score: 38 },
    { id: 3, name: "Walter White", score: 92 },
    { id: 4, name: "Saul Goodman", score: 78 },
    { id: 5, name: "Hank Schrader", score: 65 },
  ]);

  const addStudent = (name, score) => {
    const newStudent = {
      id: students.length + 1,
      name: name,
      score: score
    };
    setStudents([...students, newStudent]);
  };

  const updateScore = (id, newScore) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, score: newScore } : student
    ));
  };

  return (
    <div className="container">
      <Header />
      <AddStudentForm onAddStudent={addStudent} />
      <StudentTable students={students} onUpdateScore={updateScore} />
      <Watermark />
    </div>
  );
}

export default App;
