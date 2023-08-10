/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AxiosError } from "axios";
import { useAxiosWithInterceptor } from "../../utils";

// Define the Props type for the useCrud hook
type Props<T> = {
  apiUrl: string;       // The API endpoint URL
  initialData: T[];    // Initial data to populate the state
};

// Define the interface for the useCrud return object
interface IuseCrud<T> {
  data: T[];                       // Data fetched from the API
  error: AxiosError<unknown, any> | null; // Error object if API request fails
  isLoading: boolean;              // Loading state indicator
  fetchData: () => Promise<T[]>;   // Function to fetch data from the API
}

// The main useCrud hook
export const useCrud = <T>({ apiUrl, initialData }: Props<T>): IuseCrud<T> => {
  // Initialize the Axios instance with interceptor
  const jwtAxios = useAxiosWithInterceptor();

  // State management for fetched data, error, and loading indicator
  const [data, setData] = useState<T[]>(initialData);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to fetch data from the API
  const fetchData = async () => {
    setIsLoading(true);  // Set loading state to true
    try {
      // Make a GET request using jwtAxios and await the response
      const response = await jwtAxios.get(apiUrl);
      setData(response.data);  // Update data state with fetched data
      setError(null);  // Clear any previous error
      setIsLoading(false); // Set loading state to false
      return data;  // Return the fetched data
    } catch (err: any) {
      // Handle API errors
      if (err.response && err.response.status === 400) {
        setError(new AxiosError("Bad request", err.response?.status || "")); // Set error state for 400 status
      }
      setIsLoading(false); // Set loading state to false
      throw err;  // Rethrow the error for further handling
    }
  };

  // Additional CRUD operations (create, update, delete) can be added here

  // Return an object with data, error, loading, and fetchData function
  return { data, error, isLoading, fetchData };
};
