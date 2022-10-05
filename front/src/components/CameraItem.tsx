import React, { useMemo } from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

interface Props {
  title: string,
  cameraLink: string
  isActive: string
}

const StyledButton = styled(Button)({
  "& .MuiButton-root": {
    color: "black",
    fontWeight: 700
  }
})

const CameraItem = ({ title, cameraLink, isActive }: Props) => {
  return (
    /*<div className={`w-[98%] h-[52px] bg-gradient-to-br from-[#007fff] to-[#0059b2] border-[1px] border-[#1E4976] rounded-[5px] flex justify-center items-center camera-item 
    hover:underline ${isActive == title? "underline animate-pulse-once" : ""}`}>
        <h2 className="">{title}</h2>
    </div> */
    <StyledButton className="w-[300px] h-[52px] underline" variant="contained">{title}</StyledButton>

  )
}

export default React.memo(CameraItem)
