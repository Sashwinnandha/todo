import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Filter({dialog,setDialog}){

  const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

   const handleClose = (event,reason) => {
    if(reason!="backdropClick"){
      setDialog(false);
    }
    
  };
    return(
        <Dialog
        open={dialog}
        onClose={(event,reason)=>handleClose(event,reason)}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
            },
          },
        }}
      >
        <DialogTitle>Search Date</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To track the work list on the particular date.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="date"
            type="date"
            fullWidth
            variant="standard"
            inputProps={{
        max: today, 
        min:"2025-05-08"
      }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Search</Button>
        </DialogActions>
      </Dialog>
    )
}

export default Filter;