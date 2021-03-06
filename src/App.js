import IntegrateCalendar from './components/IntegrateCalendar'
import Calendar from './components/Calendar'
import Availability from './components/Availability'

function App() {
  return (
    <div className="App">
      <IntegrateCalendar />
      <Calendar uid="8d2e8185-9ebf-4a6c-a7d1-020c5fe343ce" />
      <Availability uid="8d2e8185-9ebf-4a6c-a7d1-020c5fe343ce" />
    </div>
  );
}

export default App;
