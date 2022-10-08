import React, { useRef, useEffect, useState } from 'react'
interface Props {
  activeAdding: boolean,
  shapesList: any,
  activeCameraID: number | undefined,
  hasPosted: () => void,
  changed: () => void
}
const CanvasSelection = ({ activeAdding, shapesList, activeCameraID, hasPosted, changed }: Props) => {
  const [activeSelect, setActiveSelect] = useState<boolean>(false)
  const [posted, setPosted] = useState<boolean>(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef(canvasRef.current?.getContext('2d'))


  let clicked = false
  let moved = false
  let startX: number;
  let startY: number;
  let mouseX: number;
  let mouseY: number;
  let newShapeWidth: number = 0;
  let newShapeHeight: number = 0;

  const isMouseInShape = (x: number, y: number, shape: any) => {
    let shapeLeft = shape.x
    let shapeRigth = shape.x + shape.width
    let shapeTop = shape.y
    let shapeBottom = shape.y + shape.height

    if (x > shapeLeft && x < shapeRigth && y > shapeTop && y < shapeBottom)
      return true

    return false

  }
  const mouseDown = function(event: MouseEvent) {
    console.log('click')
    if (!posted && clicked) {
      mouseUp(event)
      return
    }
    event.preventDefault();
    const canvBounds: any = canvasRef.current?.getBoundingClientRect();
    if (canvBounds == undefined) return;
    startX = parseInt((event.clientX - canvBounds.left).toString());
    startY = parseInt((event.clientY - canvBounds.top).toString());


    console.log('down')

    clicked = true
    /*
    let index = 0;

    for(let sh of shapes) {
      if(isMouseInShape(startX, startY, sh)) {
        currentShapeIndex = index;
        isDragging = true
        return
      } 
      index++
    }
    */
  }
  const mouseUp = function(event: MouseEvent) {
    //if(!isDragging) return;
    //

    event.preventDefault()
    if (clicked && moved) {
      const newArea =
      {
        cam_id: activeCameraID,
        x: mouseX - startX < 0 ? mouseX : startX,
        y: mouseY - startY < 0 ? mouseY : startY,
        width: newShapeWidth,
        height: newShapeHeight,
        title: "Area 1"
      }
      fetch('http://localhost:8080/camerasAreas', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArea)
      })
      setPosted(true)
      hasPosted()
      changed()
      console.log('posted')
      moved = false
      clicked = false
    }

    //isDragging = false



  }
  const mouseOut = function(event: MouseEvent) {
    //if(!isDragging) return;
    event.preventDefault()
    if (clicked) {
      clicked = false
      mouseUp(event)
    }

  }

  const mouseMove = function(event: MouseEvent) {
    //if(!clicked)
    // return
    if (clicked) {
      moved = true;
      event.preventDefault()
      const canvBounds = canvasRef.current?.getBoundingClientRect();
      if (canvBounds == undefined) return
      if (ctxRef.current == null) return
      mouseX = parseInt((event.clientX - canvBounds.left).toString())
      mouseY = parseInt((event.clientY - canvBounds.top).toString())

      newShapeWidth = Math.abs(startX - mouseX);
      newShapeHeight = Math.abs(startY - mouseY);

      ctxRef.current.strokeStyle = "green";
      ctxRef.current.lineWidth = 4
      if (canvasRef.current == null) return
      ctxRef.current.clearRect(1, 1, canvasRef.current?.width, canvasRef.current?.height)
      ctxRef.current.strokeRect(
        mouseX - startX < 0 ? mouseX : startX,
        mouseY - startY < 0 ? mouseY : startY,
        newShapeWidth,
        newShapeHeight,
      )



      draw_shapes(ctxRef.current)
    }

    // }
  }

  const draw_shapes = (ctx: any) => {
    if (canvasRef.current == null) return
    ctx.strokeStyle = 'green'
    ctx.strokeRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    console.log(shapesList)
    for (let sh of shapesList) {
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 5
      ctx.strokeRect(sh.x, sh.y, sh.width, sh.height);
    }
  }

  useEffect(() => {
    if (posted)
      setPosted(false)
    if (canvasRef.current == null) return;
    canvasRef.current.onmousedown = mouseDown
    canvasRef.current.onmouseup = mouseUp
    canvasRef.current.onmousemove = mouseMove
    canvasRef.current.onmouseout = mouseOut
    ctxRef.current = canvasRef.current?.getContext('2d')
    if (ctxRef.current == null) return;
    ctxRef.current.clearRect(1, 1, canvasRef.current.width, canvasRef.current.height)
    draw_shapes(ctxRef.current)
  }, [activeCameraID, posted, mouseUp])

  return (
    <canvas ref={canvasRef} id="canvas" width={900} height={600} className="w-[900px] h-[600px] z-[2020] fixed top-[11.4rem] left-50%" />
  )
}

export default CanvasSelection
