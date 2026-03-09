import { useQuery } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities = () => {
  const { data: activities, isPending } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      
    //   const response = await axios.get<Activity[]>('https://localhost:5001/api/Activities');

    const response = await agent.get<Activity[]>('/Activities');
      
      return response.data;
    }
  }); // Initialize the query client

    return {
        activities,
        isPending
    }

}