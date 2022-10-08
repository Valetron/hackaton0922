import React from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import OkayIcon from '@mui/icons-material/Check'
import ErrorIcon from '@mui/icons-material/Clear'
import { styled } from '@mui/material/styles'

interface Props {
  title: string,
  theme: boolean,
  hasLink: boolean,
  isActive: boolean
}

const StyledButton = styled(Button)({
  "& .MuiButton-root": {
    color: "black",
    fontWeight: 700
  }
})

const CameraItem = ({ title, theme, hasLink, isActive }: Props) => {
  return (
    <>
      <StyledButton className="w-[300px] h-[52px] underline" variant="contained" style={{
        background: theme ? '' : '#222222',
        textTransform: 'none',
        borderBottom: theme ? '' : '2px solid #fb7200',
        textDecoration: isActive ? 'underline' : '',
        width: '275px',
        padding: 0,
        fontSize: 16,
        overflow: 'hidden'

      }}>{title}

        <IconButton className="absolute"
          style={{
            position: 'absolute',
            marginLeft: '225px',
            background: hasLink ? 'green' : 'red',
            borderRadius: '5px',
            width: '20px',
            height: '20px',
          }}
        >
          {hasLink &&
            <OkayIcon style={{
              height: '20px',
              width: '20px'
            }} />
          }
          {!hasLink &&
            <ErrorIcon style={{
              height: '20px',
              width: '20px'
            }} />
          }
        </IconButton>
      </StyledButton>
    </>
  )
}

export default React.memo(CameraItem)
