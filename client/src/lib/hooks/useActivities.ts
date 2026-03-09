import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities = () => {

const queryClient = useQueryClient();

  const { data: activities, isPending } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      
    //   const response = await axios.get<Activity[]>('https://localhost:5001/api/Activities');

    const response = await agent.get<Activity[]>('/Activities');
      
      return response.data;
    }
  }); // Initialize the query client

  
  const updateActivity =  useMutation({
    mutationFn : async (activity: Activity) => {

      await agent.put(`/Activities/${activity.id}`, activity);
    },
    onSuccess: async () => {      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ['activities'] });


    }

  })



    return {
        activities,
        isPending,
        updateActivity
    }

}