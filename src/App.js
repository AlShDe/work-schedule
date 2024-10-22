import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import { db } from './firebase'; // ייבוא Firestore
import { doc, setDoc, getDoc } from 'firebase/firestore';
import './App.css';

function App() {
  const [user, setUser] = useState(null); // ניהול המשתמש המחובר
  const [unavailableDatesByUser, setUnavailableDatesByUser] = useState({}); // תאריכים לא זמינים של המשתמשים

  // פונקציה לשמירת תאריכים ב-Firestore
  const saveUnavailableDates = async (username, newUnavailableDates) => {
    await setDoc(doc(db, 'users', username), {
      unavailableDates: newUnavailableDates,
    });
  };

  // פונקציה לשליפת תאריכים מ-Firestore
  const fetchUnavailableDates = async (username) => {
    const docRef = doc(db, 'users', username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().unavailableDates;
    } else {
      return {};
    }
  };

  // שימוש ב-useEffect לטעינת התאריכים כשהמשתמש מחובר
  useEffect(() => {
    if (user) {
      fetchUnavailableDates(user.username).then((data) => {
        setUnavailableDatesByUser((prev) => ({
          ...prev,
          [user.username]: data,
        }));
      });
    }
  }, [user]);

  // טיפול בהתחברות המשתמש
  const handleLogin = (username) => {
    setUser({ username });
  };

  // טיפול בשינויים בתאריכים לא זמינים
  const handleUnavailableDatesChange = (newUnavailableDates) => {
    setUnavailableDatesByUser((prev) => ({
      ...prev,
      [user.username]: newUnavailableDates,
    }));

    saveUnavailableDates(user.username, newUnavailableDates); // שמירת תאריכים ב-Firebase
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <h1 className="welcome">Welcome, {user.username}</h1>
          {user.username === 'admin' ? (
            <AdminDashboard unavailableDatesByUser={unavailableDatesByUser} />
          ) : (
            <Calendar
              onUnavailableDatesChange={handleUnavailableDatesChange}
              unavailableDates={unavailableDatesByUser[user.username] || {}}
            />
          )}
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
