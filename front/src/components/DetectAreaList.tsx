import React from 'react'
import DetectAreaItem from "./DetectAreaItem";
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

interface Props {
  currCameraAreas: any,
  deleteCurrentArea: (id: number) => void
}

const DetectAreaList = ({ currCameraAreas, deleteCurrentArea }: Props) => {
  return (
    <ul className="flex flex-col">
      {currCameraAreas.length === 0 &&
        <div>No areas on current camera</div>
      }
      {currCameraAreas.length !== 0 &&
        currCameraAreas.map((item: any, index: number) => (
          <li key={index} className="mb-[5px] flex">
            <DetectAreaItem title={item.title} />
            <IconButton
              style={{
                background: 'red',
                borderRadius: '5px'
              }}
              onClick={() => deleteCurrentArea(item.id)}
            >
              <DeleteIcon style={{ color: 'black' }} />
            </IconButton>
          </li>
        ))
      }
    </ul>
  )
}

export default React.memo(DetectAreaList)
