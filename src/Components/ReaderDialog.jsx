import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import MonitorIcon from '@mui/icons-material/Monitor';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Collapse from '@mui/material/Collapse';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('body');
  const [listopen1, setListOpen1] = React.useState(true);
  const [listopen2, setListOpen2] = React.useState(true);

  const handleClickOpen =  () => {
    setOpen(true);
    setScroll('body');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick1 = () => {
    setListOpen1(!listopen1);
  };

  const handleClick2 = () => {
    setListOpen2(!listopen2);
  };

  return (
    <React.Fragment>
      <Button size="small" onClick={handleClickOpen} sx={{color:'gray'}} startIcon={<MonitorIcon sx={{color:'gray'}} />}>Details</Button>
      <Dialog
        scroll={scroll}
        fullScreen  
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', backgroundColor:'gray' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Device Settings
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
        <ListItemButton onClick={handleClick1}>
            <ListItemText
              primary="Device Information"
            />
            {listopen1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={listopen1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <ListItemText 
                primary="IP Address"
                secondary={<Link href="https://192.168.0.12/" target="_blank" color='inherit' variant='inherit'>192.168.0.12</Link>}  
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                primary="Name"
                secondary="pitreader"  
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                primary="API Token"
                secondary="IlJU7GRSba6lQO8jWIs6bA=="  
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                primary="Firmaware Version"
                secondary="02.02.00"  
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                primary="Fingerprint"
                secondary="C2:BC:57:43:28:63:DC:8F:83:1B:87:85:93:02:B2:41:4C:E0:F5:98:DA:DC:B3:9E:C5:9E:BA:76:F7:87:13:72"  
                />
              </ListItem>
            </List>
        </Collapse>
          <Divider />
          <ListItemButton onClick={handleClick2}>
            <ListItemText
              primary="Status Messages"
            />
            {listopen2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={listopen2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItem>
                <ListItemText 
                primary="Fingerprint"
                secondary="C2:BC:57:43:28:63:DC:8F:83:1B:87:85:93:02:B2:41:4C:E0:F5:98:DA:DC:B3:9E:C5:9E:BA:76:F7:87:13:72"  
                />
              </ListItem>
            </List>
        </Collapse>
        </List>
      </Dialog>
    </React.Fragment>
  );
}
