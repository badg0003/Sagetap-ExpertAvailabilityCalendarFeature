import { useEffect, useState } from 'react'
import IntegrateCalendar from './components/IntegrateCalendar'
import Firebase from './components/Firebase'

// https://github.com/wojtekmaj/react-calendar
import Calendar from 'react-calendar'

function App() {
  useEffect(() => {

    const db = Firebase.firestore()

    db.collection("experts").where("uid", "==", "8d2e8185-9ebf-4a6c-a7d1-020c5fe343ce").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        setAvailability(data.availability)
      })
    });

  }, [])

  const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  
  const [value, onClick] = useState(new Date());
  const [availability, setAvailability] = useState();

  /**
   * Disable date that fall outside the availability window
   * @param {object} data 
   */
  const handleTileDisabled = (data) => {
    const dayAbbr = weekdays[data.date.getDay()]
    return !availability[dayAbbr].enabled
  }

  return (
    <div className="App">
      <IntegrateCalendar />
      <Calendar
        calendarType="US"
        minDate={new Date()}
        tileDisabled={handleTileDisabled}
        onClickDay={onClick}
        value={value} />
    </div>
  );
}

export default App;
