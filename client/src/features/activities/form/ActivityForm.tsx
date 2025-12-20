import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { type FormEvent } from 'react'
import { useActivities } from '../../../lib/hooks/useActivities';
import { useNavigate } from 'react-router';

// type Props ={
// activity?:Activity;
// closeForm:()=>void;
// // submitForm:(activity:Activity)=> void;
// }

export default function ActivityForm() {

    const {updateActivity,createActivity,activity} = useActivities();

    //use navigate
    const navigate = useNavigate();

    // const activity ={} as Activity;
    // helper function for event
    // on submit handlesumit function is called.
    const handleSubmit = async (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();// prevents from using the browser submission which
                               // which is going to cause our page to reload and we lose 
                               // anything ot any of the data inside that form. We dont want to submit our browser
                               // form. we want to prevent that behaviour
        // console.log(event)

        // getting formdata 
        const formData = new FormData(event.currentTarget);
        
        //FormDataEntryValue
        const data:{[key:string]:FormDataEntryValue} ={}
        formData.forEach((value,key)=>{
            data[key]= value;
        });
        console.log("suyogya")
        // console.log(data);
        if(activity) {
            data.id = activity.id;
            await updateActivity.mutateAsync(data as unknown as Activity);
            // closeForm();
        }else{

            await createActivity.mutateAsync(data as unknown as Activity);
            // closeForm();
        }

        // submitForm(data as unknown as Activity);
    }


  return (
    <Paper sx={{borderRadius:3, padding:3}}>

        <Typography variant="h5" gutterBottom color="primary">
            CreateActivity
        </Typography>

        <Box component ='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
            <TextField name='title' label='Title' defaultValue={activity?.title} />
            <TextField name='description' label='Description' defaultValue={activity?.description} multiline rows={3} />
            <TextField name='category' label='Category' defaultValue={activity?.category} />
            <TextField name='date' label='Date' type='date' 
            
            defaultValue={activity?.date
                ? new Date(activity.date).toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0]
            }            
            />
            <TextField name='city' label='City' defaultValue={activity?.city}/>
            <TextField name='venue' label='Venue' defaultValue={activity?.venue}/>

            <Box display='flex' justifyContent='end'gap={3} >
                <Button   color='inherit'>Cancel</Button>
                <Button 
                    type="submit" 
                    color='success'
                    variant="contained"
                    disabled={updateActivity.isPending || createActivity.isPending}     
                >Submit</Button>

            </Box>

        </Box>



    </Paper>
  )
}
