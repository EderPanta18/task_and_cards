import React, { useEffect, useState } from "react";
import Section from "./Section";

function ListTasks({ tasks, setTasks }) {
    const [todo, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [closed, setClosed] = useState([]);
    useEffect(() => {
        const todosA = tasks.filter((task) => task.status === "todo");
        const inProgressA = tasks.filter((task) => task.status === "inProgress");
        const closedA = tasks.filter((task) => task.status === "closed");
        setTodos(todosA);
        setInProgress(inProgressA);
        setClosed(closedA);
    }, [tasks]);
    const states = ["todo", "inProgress", "closed"];
    return (
        <div className="flex flex-wrap justify-center gap-7 mx-5">
            {states.map((status, index) => {
                return (
                    <div key={index} className="flex justify-center">
                        <Section
                            status={status}
                            tasks={tasks}
                            setTasks={setTasks}
                            todo={todo}
                            inProgress={inProgress}
                            closed={closed}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default ListTasks;


