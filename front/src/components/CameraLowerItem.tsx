import Button from '@mui/material/Button'


interface Props {
  theme: boolean | undefined,
  title: string,
  isActive: boolean
}

const CameraLowerItem = ({theme, title, isActive }: Props) => {
  return (
    <>
      <Button className="w-[190px] h-[52px] underline" variant="contained"
        style={{
          background: theme ? isActive ? '' : '#214379' : isActive ? '#214268' : '#222',
          borderRadius: '20px',
          textTransform: 'none',
          borderBottom: isActive ? '3px solid #647b95' : '',
          padding: 0,
          fontSize: 16,
          overflow: 'hidden'
        }}>
        {title}
      </Button>
    </>
  )
}


export default CameraLowerItem
