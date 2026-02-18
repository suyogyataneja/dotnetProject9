import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import type { FormEvent } from "react";

type Props = {
     // property name 'closeForm' of type function that takes no arguments and returns void: type of data we expect to receive from parent component
    activity?: Activity; // property name 'activity' of type Activity object: type of data we expect to receive from parent component
    closeForm: () => void;
}

export default function ActivityForm({ activity, closeForm }: Props) {

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

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
    console.log(data);
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
            <TextField name='date' label="Date" type="date" defaultValue={activity?.date} />
            <TextField name='city' label="City" defaultValue={activity?.city} />
            <TextField name='venue' label="Venue" defaultValue={activity?.venue} />

            <Box display='flex' justifyContent='space-between' alignItems='center' gap={2}>

                <Button onClick={closeForm} color="inherit" fullWidth>
                    Cancel
                </Button>

                <Button  type="submit" color="success"  variant="contained" fullWidth>
                    Submit
                </Button>

            </Box>

          {/* Form fields would go here */}
        </Box>  
    </Paper>
  )
}