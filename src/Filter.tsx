import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createDateFilter } from './Helper';

function Filter({dialog,setDialog,setDate}){

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedTomorrow = tomorrow.toISOString().split('T')[0]; // "YYYY-MM-DD"

   const handleClose = () => {
      setDialog(false);
  };
    return(
        <Dialog
        open={dialog}
        onClose={(event,reason)=>{
          if(reason!=="backdropClick"){
      setDialog(false);
    }
        }}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const date = formJson.date;
              const newDate=createDateFilter(date)
              setDate(newDate)
              handleClose()
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
              max:formattedTomorrow,
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