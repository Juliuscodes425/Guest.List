import React, { useState, useEffect } from "react";

const baseURL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2505-ftb-et-web-ft";
const GuestsURL = `${baseURL}/guests`;

const App = () => {
  const [eventList, setEventList] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const getEventList = async () => {
      try {
        const response = await fetch(GuestsURL);
        const data = await response.json();
        setEventList(data.data); // or adjust according to API response
      } catch (error) {
        console.error("Failed to fetch event list:", error);
      }
    };
    getEventList();
  }, []);
  console.log(GuestsURL);
  const getEventDetails = async (detailsURL) => {
    try {
      const response = await fetch(detailsURL);
      const data = await response.json();
      setEventDetails(data.data); // again adjust if needed
    } catch (error) {
      console.error("Failed to fetch event details:", error);
    }
  };
  console.log(GuestsURL);
  return (
    <div>
      <h1>Events</h1>
      <ul>
        {eventList.map((event) => (
          <li
            key={event.id}
            onClick={() => getEventDetails(`${GuestsURL}/${event.id}`)}
          >
            {event.name}
          </li>
        ))}
      </ul>
      {eventDetails && (
        <div>
          <h2>Event Details</h2>
          <p>{eventDetails.name}</p>
          <p>{eventDetails.details}</p>
          <p>{eventDetails.email}</p>
          <p>{eventDetails.phone}</p>
          <p>{eventDetails.bio}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

export default App;
