import React, {useState} from 'react'
import CameraItem from './CameraItem'
import CameraEditor from './CameraEditor'

interface Props {
    cameraArray: any,
    getURL: (prop: string) => void,
    getActiveCamera: (prop: number) => void,
}
const CameraList = ({cameraArray, getURL, getActiveCamera}:Props) => {
    const [acitveCamera, setActiveCamera] = useState(cameraArray[0].title)

    return(
        <div className="w-full h-full">
            <ul className="text-white w-full flex flex-col items-center justify-center">
                {
                    cameraArray.map((item: any, index: any) =>(
                        <li key={index} className={`${cameraArray.index !== 0 ? "mt-[5px]" : ""} cursor-pointer`} onClick={() => {setActiveCamera(item.title)
                        getURL(item.link) 
                        getActiveCamera(item.id)}}>
                            <CameraItem title={item.title} cameraLink={item.link} isActive={acitveCamera} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default CameraList
