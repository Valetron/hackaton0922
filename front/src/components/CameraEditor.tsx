import React, { useState, useEffect } from 'react'
import CameraLowerItem from './CameraLowerItem'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import { StyledTextField } from './StyledTextField'

interface Props {
  cameraArray: any,
  changed: () => void,
  close: () => void,
}

const textFieldNames = ['Camera name', 'Camera link', 'Camera login', 'Camera password']

const CameraEditor = ({ cameraArray, changed, close }: Props) => {
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

  return (
    <div className={`fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[750px] h-[620px] bg-[#101c2c] border-[2px] border-[#1E4976] shadow-[#5cabff] shadow-2xl edit-list`}>
      <div className="absolute top-5 right-5" onClick={close}><CloseIcon color='primary' /></div>
      {cameraSelected && <div className="absolute bottom-[15px] right-[15px]"><Button color='error' variant="contained" onClick={handleRemoveItem}>Remove</Button></div>}
      <div className="flex">
        <div className="">
          <div className="flex flex-col justify-center items-center iteditor-camera-list h-[610px] w-[220px] bg-[#0c1928]">
            <ul className="w-full bg-[#0c1928] h-full mt-[10px] overflow-y-scroll flex flex-col items-center">
              {
                cameraArray.map((item: any, index: any) => (
                  <li key={index} className={`${cameraArray.index !== 0 ? "mt-[5px]" : ""} w-[85%]  h-[52px] cursor-pointer`} onClick={() => {
                    setSelectedCamera(item)
                    setCameraTitle(item.title)
                    setCameraLink(item.link)
                  }}>
                    <CameraLowerItem
                      title={item.title}
                      isActive={cameraSelected?.id === item.id}
                    />
                  </li>
                ))

              }
            </ul>
          </div>
        </div>

        {
          cameraSelected &&
          <div className="flex flex-col w-4/5 h-[700px] justify-center items-center editor-camera-content">
            <div className="mt-[-50px]">
              <ul>
                <li className="">
                  <StyledTextField key={0} label={textFieldNames[0]} value={cameraTitle} onChange={(e) => setCameraTitle(e.target.value)} variant='outlined' />
                </li>
                <li className="mt-[10px]">
                  <StyledTextField key={1} label={textFieldNames[1]} value={cameraLink} onChange={(e) => setCameraLink(e.target.value)} variant='outlined' />
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
  )

}


export default CameraEditor
