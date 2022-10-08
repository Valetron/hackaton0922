import Button from '@mui/material/Button'


interface Props {
  title: string,
  isActive: boolean
}

const CameraLowerItem = ({ title, isActive }: Props) => {
  return (
    <>
      <Button className="w-[190px] h-[52px] underline" variant="contained"
        style={{
          textDecoration: isActive ? 'underline' : '',
        }}>
        {title}
      </Button>
    </>
  )
}


export default CameraLowerItem
