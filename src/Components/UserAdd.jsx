import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FetchAPI from "../Components/FetchApi.jsx";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = React.useState({
    activeuser: true,
  });

  const handleChange = (event) => {
    setState({...state,[event.target.name]: event.target.checked,});
  };
  const { activeuser } = state;

  const userInputs=[ 
                    {key:'firstname', label:'First Name', type:'text', required:true, variant:'standard'},
                    {key:'surname', label:'Surname', type:'text', required:true, variant:'standard'},
                    {key:'mail', label:'Email', type:'email', required:false, variant:'standard'},
                    {key:'role', label:'Role', type:'text', required:false, variant:'standard'},
                    {key:'startdate', label:'', type:'date', required:false, variant:'standard'},
                    {key:'enddate', label:'', type:'date', required:false, variant:'standard'},
                    {key:'tel', label:'Telephone', type:'number', required:false, variant:'standard'},
                    {key:'company', label:'Company', type:'text', required:false, variant:'standard'},
                    {key:'comment', label:'Comment', type:'text', required:false, variant:'standard'}]

  return (
    <React.Fragment>
      <Button  sx={{color:'gray', backgroundColor:'orange'}} startIcon={<AddIcon />} onClick={handleClickOpen}>
          Add User
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);
            let data= await FetchAPI("Reader/AddUser", "POST", {
                userId: parseInt(formJson.userId),
                name: formJson.firstname,
                surname: formJson.surname,
                role: formJson.role?  formJson.role : null,
                email: formJson.mail? formJson.mail : null,
                phoneNumber: formJson.tel? formJson.tel: null ,
                company: formJson.company? formJson.company : null,
                description: formJson.comment? formJson.comment : null,
                active: formJson.activeuser? true : false
              });
              if (data.status === 200) {
                handleClose();
                location.reload()
              }
              else{
                console.log(data)
              }
          },
        }}
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>

          <DialogContentText>
            To add a new user please fill the blanks.
          </DialogContentText>
          <FormControl
            component="fieldset"
            sx={{ mt: 3 }}
            variant="standard">
                    <FormControlLabel
                    control={
                    <Checkbox checked={activeuser} onChange={handleChange}  name="activeuser" id='activeuser' />
                    }
                    label="Active User"/>
          </FormControl>
          
          {userInputs.map((input)=>
            <TextField
            autoFocus
            required={input.required}
            margin="dense"
            id={input.key}
            name={input.key}
            label={input.label}
            type={input.type}
            fullWidth={true}
            variant={input.variant}
          />
            )}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
