import React, { useState, useEffect } from 'react'
import CameraLowerItem from './CameraLowerItem'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import {CameraAddTextField} from './CameraAddTextField'
import { StyledTextField } from './StyledTextField'
import IconButton from '@mui/material/IconButton'
import ErrorIcon from '@mui/icons-material/Clear'

interface Props {
  cameraArray: any | null | undefined,
  changed: () => void,
  close: () => void,
  theme?: boolean | undefined
}

const textFieldNames = ['Camera name', 'Camera link', 'Camera login', 'Camera password']

const CameraEditor = ({ cameraArray, changed, close, theme }: Props) => {
  const [cameraSelected, setSelectedCamera] = useState<any>()
  const [cameraTitle, setCameraTitle] = useState<any>()
  const [cameraLink, setCameraLink] = useState<any>()

  const handleRemoveItem = () => {
    fetch('http://localhost:8080/camerasList/' + cameraSelected.id, {
      method: 'DELETE'
    })
    changed()
    setSelectedCamera('')
  }
  const handleApplyChanges = () => {
    const newProps = { title: cameraTitle, link: cameraLink }

    fetch('http://localhost:8080/camerasList/' + cameraSelected.id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProps)
    })
    changed()
  }

  console.log(cameraArray)

  let backup = ' bg-[#101c2c] border-[2px] border-[#1E4976] shadow-[#5cabff] shadow-2xl'

  return (
    <div className={`fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[750px] h-[620px] rounded-[25px] 
      ${theme ? 'bg-gradient-to-br from-[rgba(33,66,104, 1)] to-[rgba(33,66,104,1)] backdrop-blur-[8px] border-[1px] border-[rgba(255,255,255,0.18)] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.37)] [#fff] [#3e5dd2]'
        :
        'bg[#0c1928] bg-gradient-to-br from-[rgba(12,25,40,0.45)] to-[rgba(12,25,40,0.2)] backdrop-blur-[8px] border-[1px] border-[rgba(255,255,255,0.18)] shadow-[0px_8px_32px_0px_rgba(255,255,255,0.37)]'}
edit-list`}>
        <IconButton onClick={close} style={{
          top: '12px',
          right: '20px',
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
      {cameraSelected && <div className="absolute bottom-[15px] right-[15px]"><Button color='error' variant="contained" onClick={handleRemoveItem}>Remove</Button></div>}
      <div className="flex w-full h-full">
        <div className={`h-full 
          ${theme ? 'border-r-[1px] border-r-[rgba(255,255,255,0.18)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.1)]'
          :
          'border-r-[1px] border-r-[rgba(255,255,255,0.18)] shadow-[0px_2px_2px_0px_rgba(255,255,255,0.1)]'}`}>
          <div className="flex flex-col justify-center items-center iteditor-camera-list h-[610px] w-[220px] ">
            <ul className="w-full h-full mt-[10px] overflow-y-scroll flex flex-col items-center">
              {cameraArray.length === 0 && cameraArray === undefined && cameraArray === null &&
                <div>No connection</div>
              }
              {cameraArray.length !== 0 && cameraArray !== undefined &&
                cameraArray.map((item: any, index: any) => (
                  <li key={index} className={`${cameraArray.index !== 0 ? "mt-[5px]" : ""} w-[85%]  h-[52px] cursor-pointer`} onClick={() => {
                    setSelectedCamera(item)
                    setCameraTitle(item.title)
                    setCameraLink(item.link)
                  }}>
                    <CameraLowerItem
                      theme={theme}
                      title={item.title}
                      isActive={cameraSelected?.id === item.id}
                    />
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
          <div className="w-full h-full camera-content">
          <div className="flex justify-center items-center h-[40px] text-white font-bold w-full">Edit camera property</div>
        {cameraSelected &&
          <div className="flex flex-col w-full h-[600px] justify-center items-center editor-camera-content">
            <div className="mt-[-50px]">
              <ul>
                <li>
                </li>
                <li className="">
                  <CameraAddTextField key={0} activeTheme={theme} label={textFieldNames[0]} value={cameraTitle} onChange={(e) => setCameraTitle(e.target.value)} variant='outlined' />
                </li>
                <li className="mt-[10px]">
                  <CameraAddTextField key={1} activeTheme={theme} label={textFieldNames[1]} value={cameraLink} onChange={(e) => setCameraLink(e.target.value)} variant='outlined' />
                </li>
              </ul>
            </div>
            <div>
              <button className="mt-[15px] px-[15px] py-[5px] w-full h-full bg-gradient-to-br from-[#007fff] to-[#0059b2] rounded-[15px] text-white"
                onClick={handleApplyChanges}>Apply changes</button>
            </div>
          </div>
        }
      </div>
      </div>
    </div>
  )

}


export default CameraEditor
