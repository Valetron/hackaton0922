import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import EventClassButtons from './EventClassButt'
import { StyledTextField } from './StyledTextField'
import DetectAreaList from './DetectAreaList'

interface Props {
  theme: boolean,
  isActive: () => void,
  activeCamera: number | undefined,
  camAreas: any,
  handleDeleted: (id: number) => void
}


const NeironSettings = ({ theme, isActive, activeCamera, camAreas, handleDeleted }: Props) => {
  const [activeEvent, setActiveEvent] = useState<boolean>(false)
  const [detectHelmet, setDetectHelmet] = useState<boolean>()
  const [detectPlace, setDetectPlace] = useState<boolean>()
  const [activeArea, setActiveArea] = useState<boolean>(false)
  const [currentActive, setActive] = useState<boolean>(false)
  const [areaDeleted, setDeletedArea] = useState<boolean>(false)



  useEffect(() => {
    if (areaDeleted)
      setDeletedArea((prev) => !prev)
    fetch('http://localhost:8080/neironDetectionStates')
      .then((res) => { return res.json() })
      .then((data) => {
        setDetectHelmet(data[0].helmet)
        setDetectPlace(data[0].place)
      })

  }, [activeCamera, areaDeleted])


  const handleSwitchHelmet = () => {

    setDetectHelmet((prev) => !prev)


    const newProps = { helmet: !detectHelmet }
    fetch('http://localhost:8080/neironDetectionStates/0', {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProps)
    })
  }

  const handleSwitchPlace = () => {

    setDetectPlace((prev) => !prev)

    const newProps = { place: !detectPlace }
    fetch('http://localhost:8080/neironDetectionStates/0', {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProps)
    })
  }

  /*
  const handleWidthAndHeightApply = () => {
    const newProps = { height: detectionHeight, width: detectionWidth }

    fetch('http://localhost:8080/neironDetectionStates/0', {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProps)
    })
  }
  */

  const handleAddArea = () => {
    setActive((prev) => !prev)
    isActive()
  }

  return (
    <div className={`flex flex-col items-center w-full my-[10px] rounded-[15px] bg-opacity-10 text-white transition-all
      ${theme ? 'bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-[rgba(255,255,2550,0)] backdrop-blur-[10px] border-[1px] border-[rgba(255,255,255,0.18)] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.37)]'
        :
        'bg[#0c1928] bg-gradient-to-br from-[rgba(12,25,40,0.45)] to-[rgba(12,25,40,0.2)] backdrop-blur-[8px] border-[1px] border-[rgba(255,255,255,0.18)] shadow-[0px_8px_32px_0px_rgba(255,255,255,0.37)]'} navbar-blur`}>
      <span className="p-[15px] font-bold uppercase">Neiron settings</span>
      <div className="settings-sections">
        <Button className="w-[300px] h-[56px]" variant="contained"
          style={{
            borderRadius: '25px',
            background: theme ? '' : '#333333',
            borderBottom: theme ? '' : '1px solid orange'
          }}
          onClick={() => setActiveEvent((prev) => !prev)}>Event classification</Button>
      </div>
      {activeEvent &&
        <div className="detect-setting-wrapper">
          <span className="mt-[10px] flex justify-center">
            Detect scenes with
          </span>
          <EventClassButtons
            detectHelmet={detectHelmet}
            detectPlace={detectPlace}
            switchHelmet={handleSwitchHelmet}
            switchPlace={handleSwitchPlace}
          />
        </div>
      }
      <span className="mt-[15px]">
        <Button className="w-[300px] h-[56px]" variant="contained"
          style={{
            borderRadius: '25px',
            background: theme ? '' : '#333333',
            borderBottom: theme ? '' : '1px solid orange'
          }}
          onClick={() => setActiveArea((prev) => !prev)}>Detection area</Button>
      </span>
      {activeArea &&
        <div className="mt-[10px]">
          <span className={`flex justify-center font-bold text-white`}>
            Detection areas
          </span>
          <div className="mt-[15px] flex flex-col item-center justify-center">
            <DetectAreaList
              deleteCurrentArea={(id) => handleDeleted(id)}
              currCameraAreas={camAreas}
            />
            <Button variant="contained" onClick={handleAddArea}>{`${!currentActive ? 'Add area' : 'Cancel adding'}`}</Button>
          </div>
        </div>
      }

    </div>
  )

}


export default NeironSettings
