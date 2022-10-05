
interface Props {
  AddCamera: () => void
  ActivateEditor: () => void
}


const Buttons = ({ AddCamera, ActivateEditor }: Props) => {
  return (
    <>
      <button className="bg-gradient-to-br from-[#007fff] to-[#0059b2] px-[25px] py-[10px] rounded-[15px] mt-[15px] text-white"
        onClick={AddCamera}>Add cam</button>
      <button className="bg-gradient-to-br from-[#007fff] to-[#0059b2] px-[30.5px] py-[10px] rounded-[15px] mt-[15px] text-white"
        onClick={ActivateEditor}>Edit list</button>
    </>
  )
}

export default Buttons
