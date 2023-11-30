// useFetch.js

import { useEffect, useState } from "react";

export default function useFetch(url, delay = 0) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {
                // Simulate a delay before fetching the data
                await new Promise((resolve) => setTimeout(resolve, delay));

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Could not fetch the data for that resource");
                }

                const fetchedData = await response.json();

                setData(fetchedData);
                setError(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            // Cleanup if needed
        };
    }, [url, delay]);

    return { data, isLoading, error };
}
