import { useState, useEffect } from 'react'
import Firebase from './Firebase'

// Ref: https://ncoughlin.com/posts/react-user-authentication-oauth/

// Client ID and API key from the Developer Console
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar";

const IntegrateCalendar = () => {
    const uid = '8d2e8185-9ebf-4a6c-a7d1-020c5fe343ce' // hard-coding for now
    const [auth, setAuth] = useState(false)
    const [calendar, setCalendar] = useState()

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

        const db = Firebase.firestore()

        db.collection("experts").where("uid", "==", uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setCalendar(doc.data().calendarId)
                })
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }, [])


    const handleAuth = () => {
        setAuth(window.gapi.auth2.getAuthInstance().isSignedIn.get())
    }

    const handleConnect = () => {
        window.gapi.auth2.getAuthInstance().signIn().then((response) => {
            const responseToken
                = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token

            // Get primary calendar
            window.gapi.client.calendar.calendarList.get({
                'calendarId': 'primary'
            }).then((response) => {


                // Write calendar ID to Firebase
                const db = Firebase.firestore()

                db.collection("experts").where("uid", "==", uid)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            setCalendar(response.result.id)
                            doc.ref.update({
                                "calendarId": response.result.id,
                                "responseToken": responseToken
                            })
                        })
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    })

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

            // Remove entries from DB
            const db = Firebase.firestore()

            db.collection("experts").where("uid", "==", uid)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // setCalendar(response.result.id)
                        doc.ref.update({
                            "calendarId": '',
                            "responseToken": ''
                        })
                    })
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                })
        });
    }

    const renderAddCalendarButton = () => {
        if (auth) {
            return (
                <div className="IntegrateCalendar__head">
                    <div>
                        <h2 className="o-text-h2">My calendar accounts</h2>
                        <p style={{ margin: 0 }}>{calendar}</p>
                    </div>
                    <div>
                        <button className="o-button o-button--link" type="button" onClick={handleDisconnect}>
                            Disconnect
                        </button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="IntegrateCalendar__head">
                    <div>
                        <h2 className="o-text-h2">My calendar accounts</h2>
                        <p style={{ margin: 0 }}>Add your Google Calendar</p>
                    </div>
                    <div>
                        <button className="o-button o-button--link" type="button" onClick={handleConnect}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#008CF5" />
                            </svg>
                            Add calendar account
                        </button>
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            <h1 className="o-text-h1">Calendar</h1>
            <p className="o-text-lead" style={{ marginTop: 0, marginBottom: '60px' }}>Connect your Google Calendar to let us know when you are available, and update your calendar as you get bookings and host streams.</p>
            <div className="well">
                {renderAddCalendarButton()}
            </div>
        </>
    )
}

export default IntegrateCalendar
