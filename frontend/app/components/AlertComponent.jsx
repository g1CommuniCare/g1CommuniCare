import React, { useEffect, useState } from 'react';

const AlertComponent = () => {
  const [alert, setAlert] = useState(null);
  const [seen, setSeen] = useState([]); // new state variable to track the alerts that are seen and closed

  useEffect(() => {
    let isMounted = true;

    const fetchLatestAlert = async () => {
      try {
        console.log('Fetching latest alert...');
        const response = await fetch('http://localhost:8080/alerts/getLatestAlert');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data && data.alertTimestamp) {
          const currentTimestamp = new Date().getTime();
          const alertTimestamp = new Date(data.alertTimestamp).getTime();

          if (currentTimestamp - alertTimestamp <= 10000 && !seen.includes(alertTimestamp)) { // check if the alert is not seen before setting the alert state
            setAlert(data);
          }
        } else {
          setAlert(null);
        }
      } catch (error) {
        console.error('Error fetching latest alert:', error);
      }
    };

    const intervalId = setInterval(() => {
      if (isMounted) { // fetch the latest alert regardless of the alert state
        fetchLatestAlert();
      }
    }, 1000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [seen]); // add seen as a dependency to the useEffect hook

  const closeAlert = () => {
    setAlert(null);
    setSeen([...seen, alert.alertTimestamp]); // add the alert timestamp to the seen array when the alert is closed
  };

  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-white shadow-md rounded-md ${alert ? '' : 'hidden'}`}>
      {alert && (
        <div className="text-lg font-semibold text-blue-600">
          {alert.alertTitle}
          <p className="text-gray-800">{alert.alertDescription}</p>
          <button
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={closeAlert}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AlertComponent;
