import Button from '@mui/material/Button'


interface Props {
    title:string,
    cameraLink:string
}

const CameraLowerItem = ({title}:Props) => {
    return(
        <>
        <Button className="w-[190px] h-[52px] underline" variant="contained">{title}</Button>
        </>
    )
}


export default CameraLowerItem