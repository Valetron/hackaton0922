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
    <div className={`flex flex-col items-center w-full my-[10px] rounded-[15px] bg-opacity-10 text-white transition-all
      ${theme ? 'bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-[rgba(255,255,2550,0)] backdrop-blur-[8px] border-[1px] border-[rgba(255,255,255,0.18)] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.37)] [#fff] [#3e5dd2]'
        :
        'bg[#0c1928] bg-gradient-to-br from-[rgba(12,25,40,0.45)] to-[rgba(12,25,40,0.2)] backdrop-blur-[8px] border-[1px] border-[rgba(255,255,255,0.18)] shadow-[0px_8px_32px_0px_rgba(255,255,255,0.37)]'} navbar-blur`}>
      <CustomThemeSwitch currTheme={true} defaultChecked={false} onClick={changeTheme} />
      <span className="p-[15px] font-bold uppercase">
        List of available cameras
      </span>
      <div className="w-full overflow-y-scroll cameras-list">
        {cameras && <CameraList theme={theme} getURL={getURL} cameraArray={cameras} getActiveCamera={getActiveCamera} />}
      </div>
      <div className="button-section flex justify-around w-full">
        {children}
      </div>
    </div>
  )
}

export default React.memo(Navbar)
