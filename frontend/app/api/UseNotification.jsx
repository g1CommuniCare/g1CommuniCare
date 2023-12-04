import axios from "axios";
import { useEffect, useState } from "react";

export default function useNotifications(url, residentId) {
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchNotifications() {
        setIsLoading(true);
        try {
            const res = await axios.get(url);
            const data = res.data;
            setNotifications(data);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchNotifications();
    }, [url, residentId]);

    return { notifications, isLoading, error };
}
