import { Box, Button, Paper, TextField, Typography } from "@mui/material";

export default function ActivityForm() {
  return (
    <Paper sx={{borderRadius: 3, padding: 2}}>
        <Typography variant="h5" gutterBottom color="primary" >  
        Create Activity
        </Typography>

        <Box component="form" display="flex" flexDirection="column" gap={3}>
            <TextField label="Title" />

            <TextField label="Description" multiline rows={3} />
            <TextField label="Category"  />
            <TextField label="Date" type="date" />
            <TextField label="City"/>
            <TextField label="Venue" />

            <Box display='flex' justifyContent='space-between' alignItems='center' gap={2}>

                <Button  color="inherit" fullWidth>
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