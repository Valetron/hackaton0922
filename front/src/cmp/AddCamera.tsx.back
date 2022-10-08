import React, { useState, useEffect } from 'react'
import {StyledTextField} from './' 
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ErrorIcon from '@mui/icons-material/Clear'
import { styled } from '@mui/material/styles'

interface Props {
  theme?: boolean,
  currCameraList: any,
  close: () => void,
  addCamera: (title:string, link:string) => void
}

const AddCamera = ({theme, currCameraList, close, addCamera}:Props) => {
  const [cameraTitle, setCameraTitle] = useState<string>('')
  const [cameraLink, setCameraLink] = useState<string>('http://')
  const [hasError, setError] = useState<boolean>(false)

  useEffect(() => {
   currCameraList?.filter((item:any) => item.title.toLowerCase() === cameraTitle.toLowerCase()).length === 0 || cameraTitle === '' ? 
      setError(false) 
      : 
      setError(true)
  },[cameraTitle])

const StyledButton = styled(Button)({
  "& .MuiButton-root": {
    color: "black",
    fontWeight: 700
  }
})

  return (
    <div className={`fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] 
      w-[550px] h-[350px] bg-opacity-10 rounded-[15px] add-camera-wrapper
      ${theme ? 'bg-gradient-to-br from-[rgba(33,66,104, 1)] to-[rgba(33,66,104,1)] backdrop-blur-[8px] border-[1px] border-[rgba(255,255,255,0.18)] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.37)] [#fff] [#3e5dd2]'
        :
        'bg[#0c1928] bg-gradient-to-br from-[rgba(12,25,40,0.45)] to-[rgba(12,25,40,0.2)] backdrop-blur-[8px] border-[1px] border-[rgba(255,255,255,0.18)] shadow-[0px_8px_32px_0px_rgba(255,255,255,0.37)]'} navbar-blur`}
      >
      <div className="flex justify-center p-[10px] text-white add-camera-title">
        Add new camera
        <IconButton onClick={close} style={{
          marginLeft: '500px',
          position: 'absolute',
          background: 'red',
          width:'15px',
          height:'15px',
          justifySelf: 'flex-end'
        }}>

        <ErrorIcon style={{
            width:'15px',
            height:'15px'
          }}/>
        </IconButton>
      </div>
        {
        <div className="flex justify-center items-center flex-col gap-5 mt-[-25px] h-full add-camra-content">
          <StyledTextField 
            value={cameraTitle}
            focused={cameraTitle == '' ? true : false}
            style={{
              width:'250px',
            }}
            onChange={(e) => setCameraTitle(e.target.value)}
            variant="outlined"
            error={ hasError ? true : false }
            helperText={ hasError ? 'Name is already used' : '' }
            key={0}
            label={ hasError ? 'Error' :'NEW CAMERA NAME' } 
          />
          <StyledTextField 
            key={1}
            style={{
              width:'250px',
              fontWeight: 500
            }}
            label={'NEW CAMERA LINK'} 
            value={cameraLink}
            onChange={(e) => setCameraLink(e.target.value)}
            variant="outlined"/>
          <StyledButton disabled={hasError} 
          onClick={() => addCamera(cameraTitle, cameraLink)}
          variant="contained">Add camera</StyledButton>
        </div>
        }

    </div>

  )
}

export default React.memo(AddCamera)
