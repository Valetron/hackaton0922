import { useState, useEffect, useRef } from 'react'
import { Navbar, CameraEditor, Buttons, NeironSettings, CanvasSelection } from './components'
import ReactPlayer from 'react-player';

function App() {
  const [active_Theme, setActiveTheme] = useState<boolean>(true)
  const [activeCamera, setActiveCamera] = useState<number>()
  const [cameraArray, setCameraArray] = useState<any>(null)
  const [activeEditor, setAcitveEditor] = useState<boolean>(false)
  const [activeCanvas, setActiveCanvas] = useState<boolean>(false)
  const [addedCamera, setAddedCamera] = useState<boolean>(false)
  const [changedProps, setChangedProps] = useState<boolean>(false)
  const [activeLinkVideoURL, setActiveLinkVideoURL] = useState<string>('')
  const [activeCameraShapes, setCameraShapes] = useState<any>([])
  const [canvasPosted, setCanvasPosted] = useState<boolean>(false)
  const [activeCanvasSelect] = useState<boolean>(false)


  let clientWidth: number = window.innerWidth;
  let currentHost = 'localhost'

  const clientWidthRef = useRef(window.innerWidth)

  useEffect(() => {

    fetch(`http://${currentHost}:8080/camerasList`)
      .then(res => { return res.json() })
      .then(data => { setCameraArray(data) })

    if (addedCamera)
      setAddedCamera(false)
    if (changedProps)
      setChangedProps(false)

    fetch(`http://${currentHost}:8080/camerasAreas`)
      .then(res => { return res.json() })
      .then(data => { setCameraShapes(data.filter((item: any) => item.cam_id == activeCamera)) })

    setCanvasPosted(false)
  }, [addedCamera, changedProps, activeLinkVideoURL, canvasPosted, activeCamera, activeCanvas])

  const handleAddCamera = () => {
    const newCamera = { title: `Camera ${cameraArray[cameraArray.length - 1].id}`, link: "", login: "", password: "" }

    fetch('http://localhost:8080/camerasList', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCamera)
    })

    setAddedCamera((prev) => !prev)
  }

  const handleDeleteArea = (id: number) => {
    fetch('http://localhost:8080/camerasAreas/' + id, {
      method: 'DELETE'
    })
    setCanvasPosted((prev) => !prev)
  }
  return (
    <div className={`w-screen h-screen page-wrapper`}>
      <main className="overflow-hidden">
        <div className={`w-screen flex h-screen  ${active_Theme ? "bg-[url('../public/backgrounds/bg-light.jpg')]" : "bg-[url('../public/backgrounds/bg-dark.jpg')]"} body-wrapper`}>
          <div className={`flex flex-grow-[1] ml-[5px] h-screen w-[${clientWidthRef.current * 0.18}] navbar`}>
            <Navbar
              theme={active_Theme}
              changeTheme={() => setActiveTheme((prev) => !prev)}
              getURL={(url) => setActiveLinkVideoURL(url)}
              cameras={cameraArray}
              getActiveCamera={(title) => setActiveCamera(title)}
              children={
                <Buttons
                  AddCamera={handleAddCamera}
                  ActivateEditor={() => { setAcitveEditor((prev) => !prev) }}
                />
              }
            />
          </div>
          <div className={`w-[${clientWidthRef.current * 0.6}] h-screen flex flex-grow-[2] justify-center items-center content`}>
            <div className="player-wrap ">
              <div className={`min-w-[${clientWidthRef.current * 0.6}]}`}>
                {!activeEditor &&
                  <ReactPlayer width={900} height={600} playing={true} muted url={activeLinkVideoURL} />
                }
                {activeEditor && <div className="w-[900px] h-[900px]"></div>}
              </div>
              {!activeEditor && activeCanvas && <CanvasSelection
                changed={() => setChangedProps((prev) => !prev)}
                hasPosted={() => {
                  fetch(`http://${currentHost}:8080/camerasAreas`)
                    .then(res => { return res.json() })
                    .then(data => { setCameraShapes(data.filter((item: any) => item.cam_id == activeCamera)) })
                }}
                activeAdding={activeCanvasSelect}
                shapesList={activeCameraShapes}
                activeCameraID={activeCamera} />}
            </div>
          </div>
          <div className={`flex flex-grow-[1] w-[${clientWidth * 0.18}] mr-[5px] h-screen neiron-settings`}>
            <NeironSettings
              handleDeleted={(id) => handleDeleteArea(id)}
              camAreas={activeCameraShapes}
              activeCamera={activeCamera}
              isActive={() => { setActiveCanvas((prev) => !prev) }}
              theme={active_Theme}
            />
          </div>
        </div>
        {activeEditor && <CameraEditor
          changed={() => setChangedProps((prev) => !prev)}
          close={() => setAcitveEditor((prev) => !prev)}
          cameraArray={cameraArray}
        />}
      </main >
    </div >
  )
}

export default App
