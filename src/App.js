import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import IntegrateCalendar from './components/IntegrateCalendar'
import Calendar from './components/Calendar'
import Availability from './components/Availability'
import Unavailability from './components/Unavailability'

import { ReactComponent as Logo } from './logo.svg';

function App() {
  return (
    <Router>

      <div className="app">
        <nav className="app__nav">
          <Logo className="app__logo" />
          <Link to="/book-meeting">Book Meeting</Link>
          <Link to="/availability">Availability</Link>
          <Link to="/calendar">Calendar</Link>
        </nav>

        <main className="app__body">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/availability">
              <Availability uid="8d2e8185-9ebf-4a6c-a7d1-020c5fe343ce" />
              <Unavailability uid="8d2e8185-9ebf-4a6c-a7d1-020c5fe343ce" />
            </Route>
            <Route path="/calendar">
              <IntegrateCalendar />

            </Route>
            <Route path="/book-meeting">
              <Calendar uid="8d2e8185-9ebf-4a6c-a7d1-020c5fe343ce" />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

const Home = () => {
  return (
    <h1>Home</h1>
  )
}
