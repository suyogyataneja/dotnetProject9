import { responsiveFontSizes } from "@mui/material";
import axios from "axios";


const sleep= (delay:number) =>{
return new Promise(resolve =>{

    setTimeout(resolve, delay)
});

}
const agent = axios.create(
{
// baseURL:'https://localhost:5001/api'
baseURL: import.meta.env.VITE_API_URL
});

// interceptors

agent.interceptors.response.use(async response => {

    try{

        await sleep(1000);

        return response;

    }catch(error) {
        console.log(error);
        return Promise.reject(error)

    }
})

export default agent;