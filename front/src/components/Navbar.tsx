import React, { useEffect, useState } from 'react'
import CameraList from './CameraList'
import Switch from '@mui/material/Switch'
import CustomThemeSwitch from './CustomThemeSwitch'

interface Props {
  cameras: any,
  children: React.ReactNode,
  getURL: (prop: string) => void,
  changeTheme: () => void,
  theme: boolean,
  getActiveCamera: (prop: number) => void
}

const Navbar = ({ cameras, children, getURL, theme, changeTheme, getActiveCamera }: Props) => {
  return (
    <div className={`flex flex-col items-center w-full my-[10px] 
      ${theme ? 'bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-[rgba(255,255,2550,0)] backdrop-blur-[8px] border-[1px] border-[rgba(255,255,255,0.18)] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.37)] [#fff] [#3e5dd2] rounded-[15px] bg-opacity-10 text-black'
        :
        'bg-[#0c1928] text-white'} navbar-blur`}>
      <CustomThemeSwitch currTheme={true} defaultChecked={false} onClick={changeTheme} />
      <span className="p-[15px]">
        List of available cameras
      </span>
      <div className="w-full overflow-y-scroll cameras-list">
        {cameras && <CameraList getURL={getURL} cameraArray={cameras} getActiveCamera={getActiveCamera} />}
      </div>
      <div className="button-section flex justify-around w-full">
        {children}
      </div>
    </div>
  )
}

export default Navbar
