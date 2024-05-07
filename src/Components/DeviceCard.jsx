import * as React from 'react';
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import FetchAPI from "../Components/FetchApi.jsx";
import ReaderDialog from '../Components/ReaderDialog.jsx'
import pitreader from '../Media/pitreader.png'
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import { lightGreen,red, grey, amber, lightBlue } from '@mui/material/colors';

const onlinecolor = lightGreen[100];
const onlineolorBorder = lightGreen.A400;
const offlineneolor = red[100];
const offlineolorBorder = red[600];
const cgrey =grey[200];
const camber =amber[100];
const lblue =lightBlue[50];


export default function MediaCard({id, status, ipAddress, keyIn, keyId, securityId, userId, userName, permission}) {
  const [statusColor, setStatusColor] = useState(null);
  const [statusBorder, setStatusBorder] = useState(null);

  if(status==true){
    useEffect(()=>{setStatusColor(onlinecolor)})
    useEffect(()=>{setStatusBorder(onlineolorBorder)})
  }
  else{
    useEffect(()=>{setStatusColor(offlineneolor)})
    useEffect(()=>{setStatusBorder(offlineolorBorder)})
  }
  
  const drawBox= function BoxDefine(){
      if (status==true) {
        if(keyIn==true){
          return(
            <>
            <Box  sx={{height:65, display:'flex', justifyContent:'space-around', alignItems:'center',backgroundColor:lblue, borderRadius:2, mb:2,pl:1,pr:2}}>
                <PersonIcon sx={{flexGrow:0}}/>
                <Box sx={{ display:'flex',justifyContent:'center', flexDirection:'column', gap:0.2}}>
                  <Typography textAlign={'center'} variant='caption' display="block" sx={{flexGrow:1}} >
                      {userName? userName:securityId}
                  </Typography>
                  <Typography textAlign={'center'} variant='caption' display="block" sx={{flexGrow:1}} >
                      Permission: {permission}
                  </Typography>
                  <Link component="button" variant="caption" underline="always" sx={{color:'gray'}}>Details</Link>
                </Box>
            </Box>
            </>
            );
        }
        else{
          return(
            <Box  sx={{height:65, display:'flex', justifyContent:'space-around', alignItems:'center',backgroundColor:cgrey, borderRadius:2, mb:2,pl:1,pr:2}}>
                <KeyOffIcon sx={{flexGrow:0}}/>
                <Typography textAlign={'center'} variant='caption' display="block" sx={{flexGrow:1}} >
                    No transponder inserted
                </Typography>
            </Box>
            );
        }
          
      } else {
        return(<Box sx={{height:65, display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:cgrey, borderRadius:2, mb:2,pl:1,pr:2}}>
              <CloudOffIcon fontSize='large'/>
        </Box>);
        
        
      }
  }


    return (
    <Card sx={{ maxWidth:230, maxheight: 470, position: "relative", boxShadow:`0 1px 10px 1px ${statusColor}`  , mt:5, mb:2 }}>
      <CardMedia
        component="img"
        height="150"
        image={pitreader}
        title="green iguana"
        sx={{objectFit: 'scale-down', mt:2, mb:1, mr:1 }}
      />
      <CardContent sx={{justifyContent:'center'}}>
        <Typography gutterBottom textAlign={'center'} variant="inherit" component="div" color={'darkgrey'} sx={{mb:2}}>
            {ipAddress}
        </Typography>
        <Box sx={{display:'flex', justifyContent:'space-around', alignItems:'center',backgroundColor:camber, borderRadius:2, mb:2.5, pl:1,pr:2,pt:1,pb:1}}>
            <SecurityIcon sx={{flexGrow:0}}/>
            <Typography textAlign={'center'} variant='caption' display="block" sx={{flexGrow:1}} >
                Transponder
            </Typography>
        </Box>
        <Box  sx={{border:2, backgroundColor:statusColor, borderColor:statusBorder, borderRadius:6, boxShadow:4, mb:2.5, p:0.2}}>
            <Typography textAlign={'center'} variant='caption' display="block" >
                {status==true?"Online":"Offline"}
            </Typography>
        </Box>

        {drawBox()}
      
        <Typography gutterBottom variant="caption" component="div" textAlign={'left'}>
          Device Group
        </Typography>
        <Box sx={{backgroundColor:camber, borderRadius:2, mb:2, pt:1, pb:1}}>
            <Typography textAlign={'center'} variant='caption' display="block" >
                Device1
            </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{display:'flex', justifyContent:'center'}}>
        <ReaderDialog/>
      </CardActions>
    </Card>
  );
}