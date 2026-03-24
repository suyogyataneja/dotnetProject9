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

      await agent.put('/Activities', activity);
    },
    onSuccess: async () => {      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ['activities'] });


    }

  })

  const createActivity = useMutation({

    mutationFn : async (activity: Activity) => {
      await agent.post('/Activities', activity);
    },
    onSuccess: async () => {      // Invalidate and refetch

      await queryClient.invalidateQueries({ 
        queryKey: ['activities']

       })
      }
  });

  
  const deleteActivity = useMutation({ 
    mutationFn : async (id: string) => {
    await agent.delete(`/Activities/${id}`);
  },
  onSuccess: async () => {      // Invalidate and refetch
    await queryClient.invalidateQueries({
       queryKey: ['activities'] });
  }
});
      
  



    return {
        activities,
        isPending,
        updateActivity,
        createActivity,
        deleteActivity
    }

}