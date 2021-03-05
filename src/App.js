// import { useEffect, useState } from 'react'
import IntegrateCalendar from './components/IntegrateCalendar'
import Calendar from './components/Calendar'
// import Firebase from './components/Firebase'

function App() {

  /**
   * Expert profile (via Firebase)
   */
  // useEffect(() => {
  //   const db = Firebase.firestore()

  //   db.collection("experts").where("uid", "==", "8d2e8185-9ebf-4a6c-a7d1-020c5fe343ce").onSnapshot((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       setProfile(doc.data())
  //     })
  //   })
  // }, [])

  // const [profile, setProfile] = useState()

  return (
    <div className="App">
      <IntegrateCalendar />
      <Calendar uid="8d2e8185-9ebf-4a6c-a7d1-020c5fe343ce" />
    </div>
  );
}

export default App;
