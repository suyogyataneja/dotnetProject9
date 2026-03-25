import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities = (id?:string) => {

const queryClient = useQueryClient();

  const { data: activities, isPending } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      
    //   const response = await axios.get<Activity[]>('https://localhost:5001/api/Activities');

    const response = await agent.get<Activity[]>('/Activities');
      
      return response.data;
    }
  }); // Initialize the query client

  const {data : activity, isLoading: isLoadingActivity} = useQuery({

    queryKey: ['activities', id], // Unique key for the query, including the activity id
    queryFn: async () => {
      const response = await agent.get<Activity>(`/Activities/${id}`); // Fetch a single activity by id
      return response.data;
    },
    enabled: !!id // Only run this query if an id is provided
  })

  
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
        deleteActivity,
        activity,
        isLoadingActivity
    }

}