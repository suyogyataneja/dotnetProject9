import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

type Props ={
activity?:Activity;
closeForm:()=>void;
    
}

export default function ActivityForm({activity,closeForm}:Props) {
  return (
    <Paper sx={{borderRadius:3, padding:3}}>

        <Typography variant="h5" gutterBottom color="primary">
            CreateActivity
        </Typography>

        <Box component ='form' display='flex' flexDirection='column' gap={3}>
            <TextField label='Title' defaultValue={activity?.title} />
            <TextField label='Description' defaultValue={activity?.description} multiline rows={3} />
            <TextField label='Category' defaultValue={activity?.category} />
            <TextField label='Date' type='date' defaultValue={activity?.date} />
            <TextField label='City' defaultValue={activity?.city}/>
            <TextField label='Venue' defaultValue={activity?.venue}/>

            <Box display='flex' justifyContent='end'gap={3} >
                <Button onClick={closeForm}  color='inherit'>Cancel</Button>
                <Button color='success' variant="contained">Submit</Button>

            </Box>

        </Box>



    </Paper>
  )
}
