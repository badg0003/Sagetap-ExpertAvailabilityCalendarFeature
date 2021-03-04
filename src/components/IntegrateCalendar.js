import { useState, useEffect } from 'react'

// Ref: https://ncoughlin.com/posts/react-user-authentication-oauth/

// TODO: Convert to environment variables

// Client ID and API key from the Developer Console
const CLIENT_ID = '12158249262-rj28t5dr2oti2dem0gaefg30un5mtnnf.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAIStaSs6RUsd3GI9kxP1IPrwJ7hyziFms';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar";

const IntegrateCalendar = () => {
    useEffect(() => {
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            }).then(() => {
                setAuth(window.gapi.auth2.getAuthInstance().isSignedIn.get())
                window.gapi.auth2.getAuthInstance().isSignedIn.listen(handleAuth)
            })
        })
    }, [])

    const [auth, setAuth] = useState(false)

    const handleAuth = () => {
        setAuth(window.gapi.auth2.getAuthInstance().isSignedIn.get())
    }

    const handleConnect = () => {
        window.gapi.auth2.getAuthInstance().signIn().then(() => {

            // Get primary calendar
            window.gapi.client.calendar.calendarList.get({
                'calendarId': 'primary'
            }).then((response) => {

                /**
                 * Set Acl for freeBusyReader access
                 * @see https://developers.google.com/calendar/v3/reference/acl/insert
                 */

                window.gapi.client.calendar.acl.insert({
                    'calendarId': 'primary',
                    'role': 'freeBusyReader',
                    'scope': {
                        'type': 'default'
                    }
                }).then((response) => {

                    window.gapi.client.calendar.acl.list({
                        'calendarId': 'primary'
                    }).then((response) => {
                        console.log(response);
                    })

                })
            })

        });
    }

    const handleDisconnect = () => {
        window.gapi.client.calendar.acl.delete({
            'calendarId': 'primary',
            'ruleId': 'default'
        }).then(() => {
            window.gapi.auth2.getAuthInstance().signOut();
        });
    }

    const renderAddCalendarButton = () => {
        if (auth) {
            return (
                <button onClick={handleDisconnect}>
                    Disconnect
                </button>
            )
        } else {
            return (
                <button onClick={handleConnect}>
                    Add calendar account+
                </button>
            )
        }
    }

    return (
        <>
            {renderAddCalendarButton()}
        </>
    )
}

export default IntegrateCalendar
