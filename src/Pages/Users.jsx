import * as React from 'react';
import AppBar from '../Components/AppBar.jsx'
import UserAdd from '../Components/UserAdd.jsx'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { DataGrid, GridRowModes, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';

// import {AddIcon, EditIcon, DeleteIcon, SaveIcon, CancelIcon} from '@mui/icons-material';
import { useEffect, useState } from "react";
import FetchAPI from "../Components/FetchApi.jsx";
import { Visibility } from '@mui/icons-material';

const handleDeleteClick = (id) => () => {
  console.log(id);
};


const columns = [
    { field: 'id', 
    headerName: 'ID', 
    width: 90, 
    Visibility: false
    },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 180,
      editable: false,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 140,
      editable: false,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 210,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 260,
        editable: false,
        align:'left'
        
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
        editable: false,
        align:'left'
        
      },
      {
        field: 'phone',
        headerName: 'Phone Number',
        width: 150,
        editable: false,
        align:'left'
      },
      {
        field: 'isActive',
        headerName: 'IsActive',
        width: 100,
        editable: false,
        align:'center',
        type:'boolean'
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              // onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
               onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
      
  ];


  function EditToolbar(props) {
    return (
      <GridToolbarContainer sx={{ display:'flex' ,justifyContent:'flex-end', mb:2}} >
        <UserAdd/>
      </GridToolbarContainer>
    );
  }

export default function Users(){

    const [users, setUsers] = useState([]);  
    useEffect(() => {
        async function fetchReaders() {
        const response = await FetchAPI("Reader/Users", "GET") 
        setUsers(response.result);
        console.log(users)
        }
        fetchReaders();
      },[])

    return(
    <>
    <AppBar></AppBar>
    <Box sx={{ height: '100%', width: '100%', mt:15, backgroundColor:'ButtonShadow'}}>
        <DataGrid rows={users.map((user)=>({
            id: user.userId, 
            lastName: user.surname, 
            firstName: user.name, 
            email: user.email,
            role:user.role,
            phone:user.phoneNumber,
            isActive:user.active}))} 
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