import React, { useState } from 'react';

function StudentRow({ student, onUpdateScore }) {
  const [newScore, setNewScore] = useState('');

  const isPass = student.score >= 40;
  const statusClass = isPass ? 'status-pass' : 'status-fail';
  const statusText = isPass ? 'Pass' : 'Fail';

  const handleUpdate = () => {
    if (newScore !== '') {
      onUpdateScore(student.id, Number(newScore));
      setNewScore('');
    }
  };

  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.score}</td>
      <td>
        <span className={`status-badge ${statusClass}`}>
          {statusText}
        </span>
      </td>
      <td className="action-cell">
        <input 
          type="number" 
          value={newScore} 
          onChange={(e) => setNewScore(e.target.value)} 
          placeholder="New score"
        />
        <button onClick={handleUpdate}>Update</button>
      </td>
    </tr>
  );
}

export default StudentRow;
