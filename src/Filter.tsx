import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { checkValidDate, createDateFilter } from './Helper';
import {useState} from "react"

function Filter({dialog,setDialog,setDate}){

  const[textdate,setTextdate]=useState("");

  const[view,setView]=useState("Calender");

  const[error,SetError]=useState("");

  const tomorrow = new Date();
  // tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedTomorrow = tomorrow.toISOString().split('T')[0]; // "YYYY-MM-DD"

   const handleClose = () => {
      setDialog(false);
  };

  const handleView=()=>{
    if(view==="Calender") setView("Date")
    else setView("Calender")
  SetError("")
  }
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
              if(checkValidDate(newDate)){
                setDate(newDate)
                handleClose()
              }else{
                SetError("Valid date 2025-05-08 to current date.")
              }
            },
          },
        }}
      >
        <DialogTitle>Search Date</DialogTitle>
            <FormControl sx={{px:3}}>
      <RadioGroup
      row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Calender"
        name="radio-buttons-group"
        onChange={handleView}
      >
        <FormControlLabel value="Calender" control={<Radio />} label="Calender" />
        <FormControlLabel value="Date" control={<Radio />} label="Text Date" />
      </RadioGroup>
    </FormControl>
        <DialogContent sx={{pb:0}}>
          <DialogContentText>
            To track the work list on the particular date.
          </DialogContentText>
          {view==="Calender"?<TextField
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
          />:<TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="date"
            type="text"
            value={textdate}
            fullWidth
            variant="standard"
            onChange={(e)=>{
              setTextdate(e.currentTarget.value)
              SetError("")
            }}
            placeholder='yyyy-mm-dd'
          />}
          {error && <DialogContentText sx={{color:"red"}}>
            {error}
          </DialogContentText>}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Search</Button>
        </DialogActions>
      </Dialog>
    )
}

export default Filter;