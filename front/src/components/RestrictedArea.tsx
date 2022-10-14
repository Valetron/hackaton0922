import { CameraAddTextField, StyledButton } from './CameraAddTextField'
import React, { useState } from 'react'
import Switch from '@mui/material/Switch'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { setRef } from '@mui/material'

interface Props {
  activeTheme: boolean
  addNewArea: (name:string, rest: boolean) => void
}

const RestrictedArea = ({ activeTheme, addNewArea }: Props) => {
  const [areaName, setAreaName] = useState<string>('')
  const [isRestricted, setRestricted] = useState<boolean>(false)
  return (
    <div className={` fixed flex flex-col items-center w-[400px] my-[10px] rounded-[15px] bg-opacity-10 text-white transition-all
      ${activeTheme ? 'bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-[rgba(255,255,2550,0)] backdrop-blur-[8px] border-[1px] border-[rgba(255,255,255,0.18)] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.37)] [#fff] [#3e5dd2]'
        :
        'bg[#0c1928] bg-gradient-to-br from-[rgba(12,25,40,0.45)] to-[rgba(12,25,40,0.2)] backdrop-blur-[8px] border-[1px] border-[rgba(255,255,255,0.18)] shadow-[0px_8px_32px_0px_rgba(255,255,255,0.37)]'} navbar-blur`}>

      <span className="">Area properties</span>

      <CameraAddTextField
        value={areaName}
        onChange={(e: any) => setAreaName(e.target.value)}
        activeTheme={activeTheme}
        label="Area name" />

      <FormControlLabel control={<Checkbox onChange={() => setRestricted((prev) => !prev)}/>}
        label="Is area restricted?" />

      <StyledButton style={{

      }} variant="contained" onClick={() => addNewArea(areaName, isRestricted)}>Add area</StyledButton>
    </div>

  )
}

export default RestrictedArea
