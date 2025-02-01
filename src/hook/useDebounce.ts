import { useState, useEffect } from "react";

// Custom hook to debounce a value
export const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value); // State to store the debounced value
    useEffect(() => {
        // Set up a timeout to update the debounced value after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value); // Update the debounced value
        }, delay);

        // Cleanup function to clear the timeout if the component unmounts or value/delay changes
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Re-run the effect if the value or delay changes

    return debouncedValue; // Return the debounced value
};
