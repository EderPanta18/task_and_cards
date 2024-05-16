import React, { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";
import Header from "./Header";
import toast from "react-hot-toast";

const Section = ({ status, tasks, setTasks, todo, inProgress, closed }) => {
    const [sortedTasks, setSortedTasks] = useState([]);
    const [titleSection, setTitleSection] = useState("");
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));
    useEffect(() => {
        switch (status) {
            case "todo":
                setSortedTasks(todo);
                setTitleSection("Tareas por hacer");
                break;
            case "inProgress":
                setSortedTasks(inProgress);
                setTitleSection("Tareas en proceso");
                break;
            case "closed":
                setSortedTasks(closed);
                setTitleSection("Tareas finalizadas");
                break;
            default:
                break;
        }
    }, [status, todo, inProgress, closed]);
    const addItemToSection = (id) => {
        setTasks((prev) => {
            const taskActual = prev.find((t) => t.id === id);
            if (taskActual && taskActual.status === status) {
                return prev;
            }
            const newTaks = prev.map((t) => {
                if (t.id === id) {
                    return { ...t, status: status };
                } else {
                    return t;
                }
            });
            localStorage.setItem("tasks", JSON.stringify(newTaks));
            toast("Tarea movida", { icon: "✅" });
            return newTaks;
        });
    };
    return (
        <div className="flex-col space-y-3 border-green-400 border-2 px-2 bg-slate-800 text-green-400 font-mono py-3 w-[450px] rounded-t-xl rounded-b-xl ">
            <Header title={titleSection} count={sortedTasks.length} />
            <hr className="border-2 border-green-500 mb-2" />
            <div
                ref={drop}
                className="px-3 h-[420px] overflow-y-auto space-y-4 text-lime-400"
                style={{
                    backgroundColor: isOver ? "#181F2F" : "",
                }}
            >
                {sortedTasks.length > 0 &&
                    sortedTasks.map((task) => {
                        return (
                            <Task
                                key={task.id}
                                task={task}
                                tasks={tasks}
                                setTasks={setTasks}
                            />
                        );
                    })}
            </div>
            <hr className="border-2 border-green-500 mb-2" />
        </div>
    );
};

export default Section