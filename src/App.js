import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
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
          <Link to="/">
            <Logo className="app__logo" />
          </Link>

          <NavLink to="/book-meeting">
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 8.75C4.66 8.75 0 9.92 0 12.25V14H14V12.25C14 9.92 9.34 8.75 7 8.75ZM2.34 12C3.18 11.42 5.21 10.75 7 10.75C8.79 10.75 10.82 11.42 11.66 12H2.34ZM7 7C8.93 7 10.5 5.43 10.5 3.5C10.5 1.57 8.93 0 7 0C5.07 0 3.5 1.57 3.5 3.5C3.5 5.43 5.07 7 7 7ZM7 2C7.83 2 8.5 2.67 8.5 3.5C8.5 4.33 7.83 5 7 5C6.17 5 5.5 4.33 5.5 3.5C5.5 2.67 6.17 2 7 2ZM14.04 8.81C15.2 9.65 16 10.77 16 12.25V14H20V12.25C20 10.23 16.5 9.08 14.04 8.81ZM13 7C14.93 7 16.5 5.43 16.5 3.5C16.5 1.57 14.93 0 13 0C12.46 0 11.96 0.13 11.5 0.35C12.13 1.24 12.5 2.33 12.5 3.5C12.5 4.67 12.13 5.76 11.5 6.65C11.96 6.87 12.46 7 13 7Z" />
            </svg>
            Book Meeting
          </NavLink>

          <NavLink to="/availability">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" />
            </svg>
            Availability
          </NavLink>

          <NavLink to="/calendar">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M15.45 4.4H3.55C3.08 4.4 2.7 4.78 2.7 5.25V15.45C2.7 15.92 3.08 16.3 3.55 16.3H15.45C15.92 16.3 16.3 15.92 16.3 15.45V5.25C16.3 4.78 15.92 4.4 15.45 4.4ZM3.55 2.7C2.142 2.7 1 3.842 1 5.25V15.45C1 16.858 2.142 18 3.55 18H15.45C16.858 18 18 16.858 18 15.45V5.25C18 3.842 16.858 2.7 15.45 2.7H3.55Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M7.7999 9.5C7.3299 9.5 6.9499 9.88 6.9499 10.35C6.9499 10.82 7.3299 11.2 7.7999 11.2H13.7499C14.2199 11.2 14.5999 10.82 14.5999 10.35C14.5999 9.88 14.2199 9.5 13.7499 9.5H7.7999ZM5.2499 12.9C4.7799 12.9 4.3999 13.28 4.3999 13.75C4.3999 14.22 4.7799 14.6 5.2499 14.6H10.3499C10.8199 14.6 11.1999 14.22 11.1999 13.75C11.1999 13.28 10.8199 12.9 10.3499 12.9H5.2499ZM5.2499 1C4.7799 1 4.3999 1.38 4.3999 1.85V5.25C4.3999 5.72 4.7799 6.1 5.2499 6.1C5.7199 6.1 6.0999 5.72 6.0999 5.25V1.85C6.0999 1.38 5.7199 1 5.2499 1ZM13.7499 1C13.2799 1 12.8999 1.38 12.8999 1.85V5.25C12.8999 5.72 13.2799 6.1 13.7499 6.1C14.2199 6.1 14.5999 5.72 14.5999 5.25V1.85C14.5999 1.38 14.2199 1 13.7499 1Z" />
            </svg>
            Calendar
          </NavLink>
        </nav>

        <main className="app__body">
          <div className="app__body__layout">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/availability">
                <h1 className="o-text-h1">Availability</h1>
                <p className="o-text-lead" style={{ marginTop: 0, marginBottom: '60px' }}>We only allow bookings within your availability that you set below, and at least 16 hours away to give you time to accept new requests.</p>

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
              <Route exact path="/book-meeting">
                <Calendar uid="8d2e8185-9ebf-4a6c-a7d1-020c5fe343ce" />
              </Route>
            </Switch>
          </div>
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
