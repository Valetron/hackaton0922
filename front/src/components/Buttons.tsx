import Button from '@mui/material/Button'

interface Props {
  AddCamera?: () => void,
  ActivateEditor: () => void,
  theme?: boolean
}

let clientWidth: number = window.innerWidth;


const Buttons = ({ AddCamera, ActivateEditor, theme }: Props) => {
  return (
    <div className="w-full flex mt-[15px]">
      {
        /*
        <button className="bg-gradient-to-br from-[#007fff] to-[#0059b2] px-[25px] py-[10px] rounded-[15px] mt-[15px] text-white"
          onClick={AddCamera}>Add cam</button>
        <button className="bg-gradient-to-br from-[#007fff] to-[#0059b2] px-[30.5px] py-[10px] rounded-[15px] mt-[15px] text-white"
          onClick={ActivateEditor}>Edit list</button>
        */
      }
      <Button variant="contained" style={{
        background: theme ? '' : '#222',
        position: 'absolute',
        left: clientWidth * 0.18 * 0.1,
        width: '125px',
        height: '40px',
        borderRadius: '50px',
        borderBottom: theme ? '' : '0.5px solid orange'
      }}
        onClick={AddCamera}>
        Add cam
      </Button>
      <Button variant="contained" style={{
        background: theme ? '' : '#222',
        position: 'absolute',
        right: clientWidth * 0.18 * 0.1,
        width: '125px',
        height: '40px',
        borderRadius: '50px',
        borderBottom: theme ? '' : '0.5px solid orange'
      }}
        onClick={ActivateEditor}>
        Edit list
      </Button>
    </div>
  )
}

export default Buttons
