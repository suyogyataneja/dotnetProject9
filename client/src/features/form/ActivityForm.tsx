import { Box, Button, Paper, TextField, Typography } from "@mui/material";

type Props = {
     // property name 'closeForm' of type function that takes no arguments and returns void: type of data we expect to receive from parent component
    activity?: Activity; // property name 'activity' of type Activity object: type of data we expect to receive from parent component
    closeForm: () => void;
}

export default function ActivityForm({ activity, closeForm }: Props) {
  return (
    <Paper sx={{borderRadius: 3, padding: 2}}>
        <Typography variant="h5" gutterBottom color="primary" >  
        Create Activity
        </Typography>

        <Box component="form" display="flex" flexDirection="column" gap={3}>
            <TextField label="Title" defaultValue={activity?.title}/>

            <TextField label="Description" defaultValue={activity?.description} multiline rows={3} />
            <TextField label="Category" defaultValue={activity?.category} />
            <TextField label="Date" type="date" defaultValue={activity?.date} />
            <TextField label="City" defaultValue={activity?.city} />
            <TextField label="Venue" defaultValue={activity?.venue} />

            <Box display='flex' justifyContent='space-between' alignItems='center' gap={2}>

                <Button onClick={closeForm} color="inherit" fullWidth>
                    Cancel
                </Button>

                <Button  color="success"  variant="contained" fullWidth>
                    Submit
                </Button>

            </Box>

          {/* Form fields would go here */}
        </Box>  
    </Paper>
  )
}