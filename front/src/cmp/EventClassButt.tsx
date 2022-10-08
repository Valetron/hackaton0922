import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'

interface Props {
  detectHelmet: boolean | undefined,
  detectPlace: boolean | undefined,
  switchHelmet: () => void,
  switchPlace: () => void
}
interface Detect {
  isActive: boolean | undefined
}

const CustomSwitch = styled(Switch)(({ isActive }: Detect) => ({
  '& .MuiSwitch-thumb': {
    backgroundColor: isActive ? 'green' : 'red',
  },
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: 'orange',
      },
    },
  },
}))

const EventClassButtons = ({ detectHelmet, detectPlace, switchHelmet, switchPlace }: Props) => {
  return (
    <div className="mt-[10px] w-[200px] flex justify-between">
      <div className="flex flex-col">
        <span>Helmet</span>
        <CustomSwitch isActive={detectHelmet} checked={detectHelmet ? true : false}
          onChange={switchHelmet} />
      </div>
      <div className="flex flex-col">
        <span>Place</span>
        <CustomSwitch isActive={detectPlace} checked={detectPlace ? true : false}
          onChange={switchPlace} />
      </div>
    </div>
  )
}

export default EventClassButtons
