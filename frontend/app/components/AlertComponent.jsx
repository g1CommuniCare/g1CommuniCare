import React, { useEffect, useState } from "react";

const AlertComponent = () => {
  const [alert, setAlert] = useState(null);
  const [seen, setSeen] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchLatestAlert = async () => {
      try {
        console.log("Fetching latest alert...");
        const response = await fetch(
          "http://localhost:8080/alerts/getLatestAlert"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data && data.alertTimestamp) {
          const currentTimestamp = new Date().getTime();
          const alertTimestamp = new Date(data.alertTimestamp).getTime();

          if (
            currentTimestamp - alertTimestamp <= 10000 &&
            !seen.includes(alertTimestamp)
          ) {
            setAlert(data);
          }
        } else {
          setAlert(null);
        }
      } catch (error) {
        console.error("Error fetching latest alert:", error);
      }
    };

    const intervalId = setInterval(() => {
      if (isMounted) {
        fetchLatestAlert();
      }
    }, 1000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [seen]);

  const closeAlert = () => {
    setAlert(null);
    setSeen([...seen, alert.alertTimestamp]);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-gray-200 bg-opacity-40 ${
        alert ? "block" : "hidden"
      }`}
    >
      <div className="w-96 md:w-1/3 mx-auto bg-white rounded-lg shadow p-5 border border-red-200">
        {alert && (
          <div className="relative flex flex-col items-center text-center">
            <div className="inline-block p-4 bg-red-50 rounded-full mb-2">
              <svg
                className="w-12 h-12 fill-current text-red-500 "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
              </svg>
            </div>
            <h2 className="mt-2 font-bold text-gray-800">
              {alert.alertTitle}!
            </h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed text-left mb-2">
              {alert.alertDescription}
            </p>
          </div>
        )}

        <div className="flex items-center mt-3">
          <button
            className="flex-1 px-4 py-2 bg-red-50 hover:bg-red-200 text-gray-800 text-sm font-medium rounded-md"
            onClick={closeAlert}
          >
            Mark as Read
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertComponent;
