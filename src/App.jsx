import { useEffect, useState } from 'react'
import CreateTask from './components/CreateTask'
import ListTasks from './components/ListTasks'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Toaster } from 'react-hot-toast'
import Info from './components/Info'

function App() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks([]);
    }
  }, [])

  return (
    <div>
      <div className='flex flex-col space-y-5 mt-5' style={{ justifyContent: "center" }}>
        <CreateTask setTasks={setTasks} />
        <DndProvider backend={HTML5Backend}>
          <ListTasks tasks={tasks} setTasks={setTasks} />
          <Toaster position='top-right' toastOptions={{
            style: {
              fontFamily: "monospace",
              fontSize: "25px",
              backgroundColor: "#1F2933",
              borderRadius: "20px",
              color: "#39FF14",
              marginTop: "-20px",
              marginBottom: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
              padding: "5px"
            },
            duration: 1500,
          }} />
        </DndProvider>
      </div>
      <div className='flex mt-4 justify-center '>
        <Info />
      </div>
    </div>
  )
}

export default App
