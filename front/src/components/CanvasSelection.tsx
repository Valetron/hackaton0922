import { CurrencyExchange } from '@mui/icons-material'
import React, { useRef, useEffect, useState } from 'react'
import RestrictedArea from './RestrictedArea'

interface Props {
  activeAdding: boolean,
  shapesList: any,
  activeCameraID: number | undefined,
  changed: () => void,
  activeTheme: boolean
}
const CanvasSelection = ({ activeAdding, shapesList, activeCameraID, changed, activeTheme }: Props) => {
  const [activeSelect, setActiveSelect] = useState<boolean>(false)
  const [successAdd, setSuccessAdd] = useState<boolean>(false)
  const [posted, setPosted] = useState<boolean>(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef(canvasRef.current?.getContext('2d'))


  let clickNumbers = 0
  let currentPoints: any = []
  let clicked = false
  let moved = false
  let startX: number;
  let startY: number;
  let numOfClicks: number = 0
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

  const euklidDistance = (x: number, x0: number, x1: number, y: number, y0: number, y1: number) => {
    return (x - x0) * (y1 - y0) - (y - y0) * (x1 - x0)
  }

  const mouseDown = function(event: MouseEvent) {
    if (!activeAdding) return;
    const canvBounds: any = canvasRef.current?.getBoundingClientRect();
    if (canvBounds == undefined) return;
    if (ctxRef.current == null) return;
    if (canvasRef.current == null) return;

    clicked = true
    if (currentPoints.length === 0) {
      startX = parseInt((event.clientX - canvBounds.left).toString());
      startY = parseInt((event.clientY - canvBounds.top).toString());
      currentPoints.push({
        x: startX, y: startY,
        dist: 0
      })
      ctxRef.current.fillStyle = "red"
      console.log('cl')
      ctxRef.current.fillRect(
        startX - 4,
        startY - 4,
        8,
        8,
      )
    }
    else if (currentPoints.length !== 0 && currentPoints.length !== 4) {
      console.log(currentPoints.length)
      startX = parseInt((event.clientX - canvBounds.left).toString());
      startY = parseInt((event.clientY - canvBounds.top).toString());
      if (currentPoints.length === 3) {

        /*
        currentPoints.sort(function(a: any, b: any) {
          return b.dist < a.dist ? 1
            : b.dist > a.dist ? -1 // 
              : 0;
        })
        */
        console.log(currentPoints)
        let xa = currentPoints[0].x
        let xb = currentPoints[1].x
        let xc = currentPoints[2].x
        let xd = startX
        let ya = currentPoints[0].y
        let yb = currentPoints[1].y
        let yc = currentPoints[2].y
        let yd = startY
        let l = euklidDistance(xc, xb, xa, yc, yb, ya);
        let m = euklidDistance(xd, xb, xa, yd, yb, ya);
        if (l * m < 0) {
          alert('Bad rect')
          return;
        }
        let q, w;
        q = euklidDistance(xa, xc, xb, ya, yc, yb);
        w = euklidDistance(xd, xc, xb, yd, yc, yb);
        if (q * w < 0) {
          alert('Bad rect')
          return;
        }
        let p, r;
        p = euklidDistance(xa, xd, xc, ya, yd, yc);
        r = euklidDistance(xb, xd, xc, yb, yd, yc);
        if (p * r < 0) {
          alert('Bad rect')
          return;
        }
        let j, k;
        j = euklidDistance(xb, xa, xd, yb, ya, yd);
        k = euklidDistance(xc, xa, xd, yc, ya, yd);
        if (j * k < 0) {
          alert('Bad rect')
          return;
        }

      }
      currentPoints.push({
        x: startX, y: startY,
        dist: Math.sqrt(Math.pow((currentPoints[0].x - startX), 2) + Math.pow((currentPoints[0].y - startY), 2))
      })

      ctxRef.current.fillStyle = "red"
      console.log('cl')
      ctxRef.current.fillRect(
        /*
        mouseX - startX < 0 ? mouseX : startX,
        mouseY - startY < 0 ? mouseY : startY,
        */
        startX - 4,
        startY - 4,
        8,
        8,
      )
      if (currentPoints.length === 4) {
        setSuccessAdd(true)

        ctxRef.current.strokeStyle = "red"
        ctxRef.current.lineWidth = 5
        ctxRef.current.moveTo(currentPoints[0].x, currentPoints[0].y)
        ctxRef.current.lineTo(currentPoints[1].x, currentPoints[1].y)
        ctxRef.current.moveTo(currentPoints[1].x, currentPoints[1].y)
        ctxRef.current.lineTo(currentPoints[2].x, currentPoints[2].y)
        ctxRef.current.moveTo(currentPoints[2].x, currentPoints[2].y)
        ctxRef.current.lineTo(currentPoints[3].x, currentPoints[3].y)
        ctxRef.current.moveTo(currentPoints[3].x, currentPoints[3].y)
        ctxRef.current.lineTo(currentPoints[0].x, currentPoints[0].y)
        ctxRef.current.stroke()
      }
    }
    console.log('click')
    /*
    if (!posted && clicked) {
      mouseUp(event)
      return
    }
    */
    event.preventDefault();


    console.log('down')


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
      /*
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
      */
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
    // 
    /* 
    if (clicked) {
     moved = true;
      */
    event.preventDefault()
    const canvBounds = canvasRef.current?.getBoundingClientRect();
    if (canvBounds == undefined) return
    if (ctxRef.current == null) return
    mouseX = parseInt((event.clientX - canvBounds.left).toString())
    mouseY = parseInt((event.clientY - canvBounds.top).toString())

    /*
    newShapeWidth = Math.abs(startX - mouseX);
    newShapeHeight = Math.abs(startY - mouseY);
   
    ctxRef.current.strokeStyle = "green";
    ctxRef.current.lineWidth = 4
    */
    if (canvasRef.current == null) return
    /*
    ctxRef.current.clearRect(1, 1, canvasRef.current?.width, canvasRef.current?.height)
    ctxRef.current.strokeRect(
      mouseX - startX < 0 ? mouseX : startX,
      mouseY - startY < 0 ? mouseY : startY,
      newShapeWidth,
      newShapeHeight,
    )
   
    
   
   
   
    */

    if (clicked) {
    }
    draw_shapes(ctxRef.current)
    // }

    // }
  }

  const draw_shapes = (ctx: any) => {
    if (canvasRef.current == null) return
    if (ctxRef.current == null) return
    ctxRef.current.strokeStyle = 'green'
    ctxRef.current.lineWidth = 7
    ctx.strokeRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    for (let sh of shapesList) {
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 5
      ctxRef.current.moveTo(sh.x0, sh.y0)
      ctxRef.current.lineTo(sh.x1, sh.y1)
      ctxRef.current.moveTo(sh.x1, sh.y1)
      ctxRef.current.lineTo(sh.x2, sh.y2)
      ctxRef.current.moveTo(sh.x2, sh.y2)
      ctxRef.current.lineTo(sh.x3, sh.y3)
      ctxRef.current.moveTo(sh.x3, sh.y3)
      ctxRef.current.lineTo(sh.x0, sh.y0)
      ctxRef.current.stroke()
    }
  }

  const clientWidthRef = useRef(window.innerWidth)

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
    ctxRef.current.beginPath()
    draw_shapes(ctxRef.current)
    console.log('rerender canv')
  }, [activeCameraID, posted, mouseUp, successAdd])

  const addZone = (title:string, isRest:boolean) => {
    console.log(currentPoints)
        const newArea =
        {
          x0: currentPoints[0].x, y0: currentPoints[0].y,
          x1: currentPoints[1].x, y1: currentPoints[1].y,
          x2: currentPoints[2].x, y2: currentPoints[2].y,
          x3: currentPoints[3].x, y3: currentPoints[3].y,
          title: title, cam_id: activeCameraID, restricted: isRest 
        }
        fetch('http://localhost:8080/Zones', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newArea)
        })
        setPosted(true)
        changed()
        moved = false
        clicked = false
        currentPoints = []
        setSuccessAdd(false)
      console.log('added')
  }

  return (
    <>
      <canvas ref={canvasRef} id="canvas" width={clientWidthRef.current * 0.55} height={600} className={`h-[600px] z-[2020] fixed top-[50%] translate-y-[-50%]`} />
      {successAdd &&
        <RestrictedArea
          addNewArea={(title, isRest) => addZone(title, isRest)}
          activeTheme={activeTheme}
        />
      }
    </>
  )
}

export default CanvasSelection
