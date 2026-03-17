import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { type FormEvent } from "react";
import { useActivities } from "../../lib/hooks/useActivities";

type Props = {
     // property name 'closeForm' of type function that takes no arguments and returns void: type of data we expect to receive from parent component
    activity?: Activity; // property name 'activity' of type Activity object: type of data we expect to receive from parent component
    closeForm: () => void;
}

export default function ActivityForm({ activity, closeForm }: Props) {

const {updateActivity, createActivity} = useActivities(); // Custom hook to fetch activities using react-query

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
        closeForm(); // Close the form after successful update
    }else{

        await createActivity.mutateAsync(data as unknown as Activity); // Call the createActivity mutation function with the form data
        closeForm(); // Close the form after successful creation
    }

    // console.log(data);
    // submitForm(data as unknown as Activity); // Call the submitForm function passed from the parent component with the form data
}


  return (
    <Paper sx={{borderRadius: 3, padding: 2}}>
        <Typography variant="h5" gutterBottom color="primary" >  
        Create Activity
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

                <Button onClick={closeForm} color="inherit" fullWidth>
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