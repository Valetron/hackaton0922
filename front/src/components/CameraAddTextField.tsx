import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

interface Props {
  activeTheme: boolean | undefined
  error?: boolean | undefined
}

export const CameraAddTextField = styled(TextField)(({ activeTheme, error }: Props) => ({
  "& label": {
    color: activeTheme ? error ? "red" : 'white' : error ? 'red' : '#2a79cd',
    fontWeight: 700
  },
  "& helper": {
    fontWeight: 700
  },
  "& label.Mui-focused": {
    color: activeTheme ? error ? "red" : 'white' : error ? 'red' : '#2a79cd',
    fontWeight: 700
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#2a79cd"
  },
  "& .MuiInputBase-root": {
    color: "#e5e5e5",
    fontWeight: 700
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: activeTheme ? error ? "red" : '#f45f00' : error ? 'red' : '#2a79cd',
      borderWidth: 2,
    },
    "&:hover fieldset": {
      borderColor: activeTheme ? error ? "red" : "#f45f00" : error ? 'red' : '#2a79cd',
      borderWidth: 2
    },
    "&.Mui-focused fieldset": {
      borderColor: activeTheme ? error ? "red" : "#f45f00" : error ? 'red' : '#2a79cd',
    }
  }
}))

export const StyledButton = styled(Button)({
  "& .MuiButton-root": {
    color: "black",
    fontWeight: 700
  }
})
