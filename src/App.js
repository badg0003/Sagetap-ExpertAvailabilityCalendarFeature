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
import { useState } from "react";

function App() {

  const [tab, setTab] = useState(0)

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
              <h1>Availability</h1>
              <p>We only allow bookings within your availability that you set below, and at least 16 hours away to give you time to accept new requests.</p>

              <div className="c-tabs">
                <nav className="c-tabs__nav">
                  <button className={`c-tabs__nav__tab${tab === 0 ? " c-tabs__nav__tab--active" : ""}`} type="button" onClick={() => setTab(0)}>Availability</button>
                  <button className={`c-tabs__nav__tab${tab === 1 ? " c-tabs__nav__tab--active" : ""}`} type="button" onClick={() => setTab(1)}>Unavailability</button>
                </nav>
                <div className={`c-tabs__panel${tab === 0 ? " c-tabs__panel--active" : ""}`}>
                  <Availability uid="8d2e8185-9ebf-4a6c-a7d1-020c5fe343ce" />
                </div>
                <div className={`c-tabs__panel${tab === 1 ? " c-tabs__panel--active" : ""}`}>
                  <Unavailability uid="8d2e8185-9ebf-4a6c-a7d1-020c5fe343ce" />
                </div>
              </div>
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
