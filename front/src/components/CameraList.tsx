import React, { useState } from 'react'
import CameraItem from './CameraItem'
import CameraEditor from './CameraEditor'

interface Props {
  cameraArray: any,
  getURL: (prop: string) => void,
  getActiveCamera: (prop: number) => void,
  theme: boolean
}
const CameraList = ({ cameraArray, getURL, getActiveCamera, theme }: Props) => {
  const [activeCamera, setActiveCamera] = useState(cameraArray[0])

  return (
    <div className="w-full h-full">
      <ul className="text-white w-full flex flex-col items-center justify-center">
        {
          cameraArray.map((item: any, index: any) => (
            <li key={index} className={`${cameraArray.index !== 0 ? "mt-[5px]" : ""} cursor-pointer`} onClick={() => {
              setActiveCamera(item)
              getURL(item.link)
              getActiveCamera(item.id)
            }}>
              <CameraItem 
              title={item.title} 
              theme={theme} 
              hasLink={item.link == '' ? false : true}
              isActive={activeCamera.id === item.id}
              />
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default React.memo(CameraList)
