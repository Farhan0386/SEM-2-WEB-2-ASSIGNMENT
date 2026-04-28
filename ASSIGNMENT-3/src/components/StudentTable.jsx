import React from 'react';
import StudentRow from './StudentRow';

function StudentTable({ students, onUpdateScore }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentRow 
              key={student.id} 
              student={student} 
              onUpdateScore={onUpdateScore} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
