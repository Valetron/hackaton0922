import React, { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import ErrorIcon from '@mui/icons-material/Clear'
import {CameraAddTextField, StyledButton} from './CameraAddTextField'

interface Props {
  theme?: boolean,
  currCameraList: any,
  close: () => void,
  addCamera: (title: string, link: string) => void
}


const AddCamera = ({ theme, currCameraList, close, addCamera }: Props) => {
  const [cameraTitle, setCameraTitle] = useState<string>('')
  const [cameraLink, setCameraLink] = useState<string>('http://')
  const [hasError, setError] = useState<boolean>(false)

  useEffect(() => {
    currCameraList?.filter((item: any) => item.title.toLowerCase() === cameraTitle.toLowerCase()).length === 0 || cameraTitle === '' ?
      setError(false)
      :
      setError(true)
  }, [cameraTitle])

  return (
    <div className={`fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] 
      w-[550px] h-[350px] bg-opacity-10 rounded-[15px] add-camera-wrapper
      ${theme ? 'bg-gradient-to-br from-[rgba(33,66,104, 1)] to-[rgba(33,66,104,1)] backdrop-blur-[8px] border-[1px] border-[rgba(255,255,255,0.18)] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.37)] [#fff] [#3e5dd2]'
        :
        'bg[#0c1928] bg-gradient-to-br from-[rgba(12,25,40,0.45)] to-[rgba(12,25,40,0.2)] backdrop-blur-[8px] border-[1px] border-[rgba(255,255,255,0.18)] shadow-[0px_8px_32px_0px_rgba(255,255,255,0.37)]'} navbar-blur`}
    >
      <div className="flex justify-center p-[10px] text-white add-camera-title font-bold">
        Add new camera
        <IconButton onClick={close} style={{
          right:'15px',
          position: 'absolute',
          background: '#de423f',
          width: '20px',
          height: '20px',
          justifyContent: 'center',
          alignItems: 'center'
        }}>

          <ErrorIcon style={{
            width: '17px',
            height: '17px'
          }} />
        </IconButton>
      </div>
      {
        <div className="flex justify-center items-center flex-col gap-5 mt-[-25px] h-full add-camra-content">
          <CameraAddTextField
            activeTheme={theme}
            error={hasError}
            value={cameraTitle}
            style={{
              width: '250px',
              fontWeight: 700,
              fontSize: 32
            }}
            onChange={(e) => setCameraTitle(e.target.value)}
            variant="outlined"
            helperText={hasError ? 'Name is already exists' : ''}
            key={0}
            label={hasError ? 'Error' : 'NEW CAMERA NAME'}
          />
          <CameraAddTextField
            activeTheme={theme}
            key={1}
            style={{
              width: '250px',
              fontWeight: 500
            }}
            label={'NEW CAMERA LINK'}
            value={cameraLink}
            onChange={(e) => setCameraLink(e.target.value)}
            variant="outlined" />
          <StyledButton disabled={hasError}
            onClick={() => {
              cameraTitle !== '' ?
                addCamera(cameraTitle, cameraLink)
                :
                alert('Name must be entered')
            }}
            variant="contained">Add camera</StyledButton>
        </div>
      }

    </div>

  )
}

export default React.memo(AddCamera)
