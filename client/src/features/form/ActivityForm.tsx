import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { type FormEvent } from "react";
import { useActivities } from "../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

export default function ActivityForm() {

const {id}= useParams(); // Get the activity id from the URL using the usePagination hook
const {updateActivity, createActivity,activity, isLoadingActivity} = useActivities(id); // Custom hook to fetch activities using react-query
const navigate = useNavigate(); // Hook to programmatically navigate to different routes


const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {

    // Handle form submission logic here
    // You can access the form values using the state or refs
    // For example, you can create a new activity object and pass it to a parent component or make an API call to save it
    // const newActivity = {}
    event.preventDefault(); // Prevent the default form submission behavior
    // console.log(event);
    const formData = new FormData(event.currentTarget);

    const data:{[key: string]: FormDataEntryValue} = {}
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // if(activity) {
    //     data.id = activity.id; // If editing an existing activity, include the id in the data object
    // }

    if(activity){

        data.id = activity.id; // If editing an existing activity, include the id in the data object
        await updateActivity.mutateAsync(data as unknown as Activity); // Call the updateActivity mutation function with the form data
        
        navigate(`/activities/${activity.id}`); // Navigate to the activity details page after successful update


    }else{

        await createActivity.mutate(data as unknown as Activity, {
            onSuccess: (id) => {
                navigate(`/activities/${id}`);
            }
    }); // Call the createActivity mutation function with the form data
        // Close the form after successful creation
    }

    if(isLoadingActivity) return <Typography variant="h5" color="primary">Loading...</Typography> // Display a loading message while the activity details are being fetched 
    // console.log(data);
    // submitForm(data as unknown as Activity); // Call the submitForm function passed from the parent component with the form data
}


  return (
    <Paper sx={{borderRadius: 3, padding: 2}}>
        <Typography variant="h5" gutterBottom color="primary" >  
            {activity?'Edit Activity':'Create Activity'} {/* Display "Edit Activity" if an activity is being edited, otherwise display "Create Activity" */}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
            <TextField name='title' label="Title" defaultValue={activity?.title}/>

            <TextField name='description' label="Description" defaultValue={activity?.description} multiline rows={3} />
            <TextField name='category' label="Category" defaultValue={activity?.category} />
            <TextField name='date' label="Date" type="date" 
            defaultValue={activity?.date 
                ? new Date(activity.date).toISOString().split('T')[0] // Format the date to 'YYYY-MM-DD' for the input field
                :  new Date().toISOString().split('T')[0]// If no date is provided, use the current date as default value
            } 
            
            
            />
            <TextField name='city' label="City" defaultValue={activity?.city} />
            <TextField name='venue' label="Venue" defaultValue={activity?.venue} />

            <Box display='flex' justifyContent='space-between' alignItems='center' gap={2}>

                <Button  color="inherit" fullWidth>
                    Cancel
                </Button>

                <Button  
                type="submit"
                color="success"
                variant="contained" 
                disabled={updateActivity.isPending || createActivity.isPending}
                fullWidth>
                
                    Submit
                </Button>

            </Box>

          {/* Form fields would go here */}
        </Box>  
    </Paper>
  )
}