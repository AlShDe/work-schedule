import React, { useState } from 'react';
import { format, addMonths } from 'date-fns';
import './Calendar.css';

function Calendar({ onUnavailableDatesChange, unavailableDates }) {
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);
  const today = new Date();

  // פונקציה לבחירת תאריך
  const handleDateClick = (date) => {
    const dateFormatted = format(date, 'yyyy-MM-dd');
    const monthKey = format(date, 'yyyy-MM');

    // אם התאריך כבר חסום, נבצע ביטול חסימה
    if (unavailableDates[monthKey]?.includes(dateFormatted)) {
      const newUnavailableDates = {
        ...unavailableDates,
        [monthKey]: unavailableDates[monthKey].filter(date => date !== dateFormatted),
      };
      onUnavailableDatesChange(newUnavailableDates);
      alert("Date unblocked: " + dateFormatted);
    } else {
      // אם התאריך לא חסום, נחסום אותו
      if (!unavailableDates[monthKey]) {
        unavailableDates[monthKey] = [];
      }

      const newUnavailableDates = {
        ...unavailableDates,
        [monthKey]: [...unavailableDates[monthKey], dateFormatted],
      };
      onUnavailableDatesChange(newUnavailableDates);
      alert("Date blocked: " + dateFormatted);
    }
  };

  // פונקציה ליצירת לוח השנה
  const renderCalendar = (monthOffset = 0) => {
    const dates = [];
    const currentMonth = addMonths(today, monthOffset);

    for (let i = 1; i <= 30; i++) {
      let date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const monthKey = format(date, 'yyyy-MM');

      dates.push(
        <button
          key={`${monthOffset}-${i}`}
          onClick={() => handleDateClick(date)}
          className={`date-button ${unavailableDates[monthKey]?.includes(format(date, 'yyyy-MM-dd')) ? 'unavailable' : ''}`}
        >
          {i}
        </button>
      );
    }

    return dates;
  };

  // שינוי החודש המוצג
  const handlePreviousMonth = () => {
    setCurrentMonthOffset((prev) => Math.max(prev - 1, 0)); // חזרה לחודש קודם
  };

  const handleNextMonth = () => {
    setCurrentMonthOffset((prev) => Math.min(prev + 1, 2)); // עד שלושה חודשים קדימה
  };

  // הצגת החודש הנוכחי
  const getCurrentMonthName = () => {
    const currentMonth = addMonths(today, currentMonthOffset);
    return format(currentMonth, 'MMMM yyyy');
  };

  // פונקציה לשמירה במסד הנתונים
  const handleSave = () => {
    // כאן תוכל להוסיף את הקוד לשמירה במסד הנתונים
    // לדוגמה: Firebase.firestore().collection('yourCollection').doc('yourDocId').set(unavailableDates)
    console.log("Saving unavailable dates to database:", unavailableDates);
    alert("Unavailable dates have been saved!");
  };

  return (
    <div className="calendar-container">
      <h2>Select Unavailable Dates</h2>
      <div className="calendar-header">
        <button onClick={handlePreviousMonth} disabled={currentMonthOffset === 0}>
          Previous Month
        </button>
        <h3>{getCurrentMonthName()}</h3>
        <button onClick={handleNextMonth} disabled={currentMonthOffset === 2}>
          Next Month
        </button>
      </div>
      <div className="calendar-grid">{renderCalendar(currentMonthOffset)}</div>

      <button onClick={handleSave}>Save Unavailable Dates</button>

      <h2>Your History</h2>
      <div className="history">
        {Object.keys(unavailableDates).map((month) => (
          <div key={month}>
            <h4>{month}</h4>
            <p>{unavailableDates[month].join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
