import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useEffect, useRef, useState} from "react";
import styles from './DatePicker.module.scss'
import {formatDateForInput} from "../../helpers/formatDate";


export const DatePicker = ({placeholder, getDate, width = 220}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [calendarVisible, setCalendarVisible] = useState(false);
  const calendarRef = useRef();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    getDate(date)
    setCalendarVisible(false);
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setCalendarVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  const minSelectableDate = new Date();
  const maxSelectableDate = new Date();
  minSelectableDate.setDate(minSelectableDate.getDate() + 1);
  maxSelectableDate.setDate(maxSelectableDate.getDate() + 15);


  return (
    <div
      style={{
        width: `${width}px`
      }}
      className={styles.datePicker} ref={calendarRef}>
      <div
        onClick={() => setCalendarVisible(!calendarVisible)}
        className={styles.datePickerInput}
      >
        <input
          type="text"
          value={selectedDate ? formatDateForInput(selectedDate): ''}
          readOnly
          placeholder={placeholder}
        />
        <i
          className="bi bi-calendar-check"
        ></i>
      </div>
        {calendarVisible && (
          <div className={styles.calendarContainer}>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              maxDate={maxSelectableDate}
              minDate={minSelectableDate}
            />
          </div>
        )}
    </div>
  );
}
