import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import AppBar from '../Components/AppBar.jsx'
import DeviceCard from '../Components/DeviceCard.jsx'
import FetchAPI from "../Components/FetchApi.jsx";
import AddIcon from '@mui/icons-material/Add';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Home(){
  const [readers, setReaders] = useState([]);

  useEffect(() => {
    async function fetchReaders() {
    const response = await FetchAPI("Reader/List", "GET") 
    setReaders(response.result);
    }
    fetchReaders();
  })  
    return(
        <>
        <AppBar></AppBar>
        {readers?
        <>
          <Box sx={{borderRadius:2, mr:2, mt:12, justifyContent:'flex-end', display:'flex'}} >
              <Button  sx={{color:'gray', backgroundColor:'orange'}} startIcon={<AddIcon />} onClick={"handleClick"}>
                Add Device
              </Button>
            </Box>
            <Grid container spacing={5} justifyContent='flex-start' alignItems={'center'}  sx={{ml:2}} >
              {readers.map((reader)=>(
                <Grid item lg={3} md={4} sm={6} xs={12} key={reader.name}>
                    <DeviceCard id={reader.id} 
                                ipAddress={reader.ipaddress} 
                                keyIn={reader.isKeyIn} 
                                status={reader.status} 
                                keyId={reader.keyId} 
                                securityId={reader.keySecurityId} 
                                userId={reader.userId} 
                                userName={reader.userName}
                                permission={reader.permission}/>
                    <br />
              </Grid>
              ))}
            </Grid></>
          :
          <>
          <Stack  sx={{marginTop:15}}>
            <Grid container spacing={16} justifyContent='flex-start' alignItems={'center'}  sx={{ml:2}} >
              <Grid item>
                  <Skeleton variant="rounded" width={210} height={490} />
              </Grid>
              <Grid item>
                  <Skeleton variant="rounded" width={210} height={490} />
              </Grid>
              <Grid item>
                  <Skeleton variant="rounded" width={210} height={490} />
              </Grid>
              <Grid item>
                  <Skeleton variant="rounded" width={210} height={490} />
              </Grid>
            </Grid>
          </Stack>
        </> 
          }          
        </>
    );
}