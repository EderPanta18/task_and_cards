import React, { useState } from "react";
import { v4 as uuid } from "uuid"
import toast from "react-hot-toast";

function CreateTask({ setTasks }) {

    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "todo"
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (task.name.trim().length < 3) {
            return toast.error("Ingrese mas texto")
        }
        if (task.name.trim().length > 100) {
            return toast.error("Demasiado texto")
        }
        setTasks((prev) => {
            const list = [...prev, { ...task, id: uuid() }]
            localStorage.setItem("tasks", JSON.stringify(list))
            return list
        })
        toast.success("Tarea creada")
        setTask({
            id: "",
            name: "",
            status: "todo"
        })
    }
    return (
        <div className="mx-10 w-au flex items-center justify-center ">
            <form action="" onSubmit={handleSubmit} className="flex font-mono border-2 border-green-500 rounded-2xl md:w-[50%]">
                <input
                    placeholder="Nueva tarea"
                    type="text"
                    value={task.name}
                    className="placeholder:text-lime-400 placeholder:opacity-50 rounded-tl-2xl rounded-bl-2xl py-1 px-3 bg-slate-700 border-green-400 text-2xl text-lime-400 focus:outline-none sm:mb-0 sm:w-[100%]"
                    onChange={e => setTask({ ...task, name: e.target.value })}
                />
                <button className="bg-slate-700 text-green-400 p-1 border-green-400 rounded-tr-2xl rounded-br-2xl w-full sm:w-auto font-extrabold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 hover:scale-105 hover:text-[#39FF14] duration-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </form>
        </div>


    );
}

export default CreateTask;
