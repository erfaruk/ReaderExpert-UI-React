import * as React from 'react';
import AppBar from '../Components/AppBar.jsx'
import { DataGrid, GridRowModes, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import {AddIcon, EditIcon, DeleteIcon, SaveIcon, CancelIcon} from '@mui/icons-material';
import { useEffect, useState } from "react";
import FetchAPI from "../Components/FetchApi.jsx";
import KeyAdd from '../Components/KeyAdd.jsx'

const columns = [
    { field: 'id', 
    headerName: 'ID', 
    width: 90 
    },
    {
      field: 'securityid',
      headerName: 'Security Id',
      width: 250,
      editable: false,
    },
    {
      field: 'serialNo',
      headerName: 'Serial No',
      description: 'This column has a value getter and is not sortable.',
      editable: false,
      sortable: false,
      width: 250,
    },
    {
        field: 'orderNo',
        headerName: 'Order No',
        width: 260,
        editable: false,
        align:'left'
        
    },
    {
        field: 'userId',
        headerName: 'User Id',
        width: 250,
        editable: false,
        align:'left'
        
      },
  ];


  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
  
  
    return (
      <GridToolbarContainer sx={{ display:'flex' ,justifyContent:'flex-end', mb:2}} >
        <KeyAdd></KeyAdd>
      </GridToolbarContainer>
    );
  }

export default function Users(){

    const [keys, setKeys] = useState([]);  
    useEffect(() => {
        async function fetchReaders() {
        const response = await FetchAPI("Reader/Keys", "GET") 
        setKeys(response.result);
        console.log(keys)
        }
        fetchReaders();
      },[])

    return(
    <>
    <AppBar></AppBar>
    <Box sx={{ height: '100%', width: '100%', mt:15, backgroundColor:'ButtonShadow'}}>
        <DataGrid rows={keys.map((key)=>({
            id: key.keyId, 
            securityid: key.securityId, 
            serialNo: key.serialNo, 
            orderNo: key.orderNo,
            userId:key.userId,}))} 
            columns={columns}
            slots={{
                toolbar: EditToolbar,
              }}
            sx={{
                boxShadow: 6,
                border: 1,
                borderColor: 'gray',
                '& .MuiDataGrid-row:hover': {
                color: 'primary.light',},}}
            />
    </Box>
    </>
    );
}