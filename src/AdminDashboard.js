import React from 'react';
import './AdminDashboard.css';

function AdminDashboard({ unavailableDatesByUser }) {
  return (
    <div className="admin-dashboard">
      <h2>All Employees' Unavailable Dates</h2>
      {Object.keys(unavailableDatesByUser).length === 0 ? (
        <p>No data available</p>
      ) : (
        <ul>
          {Object.keys(unavailableDatesByUser).map((username) => (
            <li key={username}>
              <strong>{username}:</strong> 
              <ul>
                {Object.keys(unavailableDatesByUser[username]).map((month) => (
                  <li key={month}>
                    {month}: {unavailableDatesByUser[username][month].join(', ')}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminDashboard;
