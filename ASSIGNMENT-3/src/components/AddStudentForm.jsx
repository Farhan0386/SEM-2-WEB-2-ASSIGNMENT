import React, { useState } from 'react';

function AddStudentForm({ onAddStudent }) {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && score) {
      onAddStudent(name, Number(score));
      setName('');
      setScore('');
    } else {
      alert("Please enter both name and score");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit} className="form-layout">
        <div className="input-group">
          <label>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter student name"
          />
        </div>
        
        <div className="input-group">
          <label>Score</label>
          <input 
            type="number" 
            value={score} 
            onChange={(e) => setScore(e.target.value)} 
            placeholder="E.g., 85"
          />
        </div>

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudentForm;
