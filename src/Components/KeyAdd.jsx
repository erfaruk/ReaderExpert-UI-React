import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import FetchAPI from "../Components/FetchApi.jsx";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const userInputs=[ 
                    {key:'securityId', label:'SecurityId', type:'text', required:true, variant:'standard'},
                    {key:'serialNo', label:'Serial Number', type:'text', required:false, variant:'standard'},
                    {key:'orderNo', label:'Order Number', type:'number', required:false, variant:'standard'},
                    {key:'userId', label:'Select User', type:'text', required:false, variant:'standard'},
                    {key:'startdate', label:'', type:'date', required:false, variant:'standard'},
                    {key:'enddate', label:'', type:'date', required:false, variant:'standard'},]

  return (
    <React.Fragment>
      <Button  sx={{color:'gray', backgroundColor:'orange'}} startIcon={<AddIcon />} onClick={handleClickOpen}>
          Add Key
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
            let data= await FetchAPI("Reader/AddKey", "POST", {
                securityId: formJson.securityId,
                serialNo: formJson.serialNo? formJson.serialNo: null,
                orderNo: formJson.orderNo? formJson.orderNo: null,
                startTime: formJson.startdate? formJson.startdate: null,
                endDate: formJson.endDate?formJson.endDate: null,
                userId:formJson.userId?formJson.userId: null 
              });

              if (data.status === 200) {
                handleClose();
                location.reload()
              }
              else{
                console.log(data)
              }
          },
        }}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new key please fill the blanks.
          </DialogContentText>
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
