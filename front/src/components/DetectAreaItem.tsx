import Button from '@mui/material/Button'


const DetectAreaItem = (props: any) => {
  return (
    <Button variant="contained" style={{
      background: 'green',
      width:200
    }}>{props.title}</Button> 
  )
}

export default DetectAreaItem
