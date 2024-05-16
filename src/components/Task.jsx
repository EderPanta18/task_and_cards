import React, { useState, useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import ReactModal from "react-modal";
import toast from "react-hot-toast";

ReactModal.setAppElement("#root");

const Task = ({ task, tasks, setTasks }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.name);
    const inputRef = useRef(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [isEditing]);
    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setEditedText(task.name);
    };
    const handleRemove = (id) => {
        const updateTasks = tasks.filter((task) => task.id !== id);
        setTasks(updateTasks);
        localStorage.setItem("tasks", JSON.stringify(updateTasks));
        toast("Tarea eliminada", { icon: "💀" });
        setShowModal(false);
    };
    const handleDoubleClick = () => {
        setIsEditing(true);
    };
    const handleInputChange = (event) => {
        setEditedText(event.target.value);
        if (inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    };
    const handleInputBlur = () => {
        setIsEditing(false);
        saveChanges();
    };
    const saveChanges = () => {
        if (editedText === "") {
            setShowModal(true);
            return;
        }
        if (editedText === task.name) {
            return;
        }
        if (editedText.length > 200) {
            toast.error("Demasiado texto");
            setEditedText(task.name);
            return;
        }
        const updatedTasks = tasks.map((t) =>
            t.id === task.id ? { ...t, name: editedText } : t
        );
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        toast("Cambios guardados", { icon: "✅" });
    };
    const handleInputKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            setIsEditing(false);
            saveChanges();
        }
    };
    return (
        <div
            ref={drag}
            className="bg-slate-700 relative p-2 rounded-md transform transition duration-300 cursor-grab hover:scale-105"
            style={{
                opacity: isDragging ? 0 : 1,
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.5)",
                padding: isEditing ? "0px" : "",
            }}
        >
            {isEditing ? (
                <textarea
                    ref={inputRef}
                    className="break-words leading-4 pr-4 mt-2 p-2 resize-none w-full overflow-hidden bg-[#3e4a63]  text-yellow-300 outline-none border-none" // Evita que se pueda redimensionar manualmente
                    value={editedText}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputKeyDown}
                    autoFocus
                />
            ) : (
                <p
                    className="break-words leading-4 pr-2"
                    onDoubleClick={handleDoubleClick}
                >
                    {editedText}
                </p>
            )}
            <button
                className="absolute bottom-0.5 right-0.5"
                onClick={handleOpenModal}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                </svg>
            </button>
            <ReactModal
                isOpen={showModal || editedText === ""}
                onRequestClose={handleCloseModal}
                shouldCloseOnOverlayClick={false}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.5)",
                    },
                    content: {
                        backgroundColor: "#1F2938",
                        color: "#39FF14",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "monospace",
                        fontSize: "20px",
                        padding: "10px",
                        margin: "auto",
                        maxWidth: "30%",
                        minWidth: "350px",
                        maxHeight: "35%",
                        minHeight: "270px",
                        border: "none",
                    },
                }}
            >
                <div className="flex flex-col items-center gap-3">
                    <h2 className="font-bold text-2xl text-center">
                        CONFIRMAR ELIMINACION
                    </h2>
                    <p className="text-center">
                        ¿Estas seguro de eliminar la tarea?, no habra forma de recuperar
                    </p>
                    <hr />
                    <div className="flex gap-20">
                        <button
                            onClick={handleCloseModal}
                            className="hover:scale-110 duration-300 hover:text-red-500"
                        >
                            CANCELAR
                        </button>
                        <button
                            onClick={() => handleRemove(task.id)}
                            className="hover:scale-110 duration-300 hover:text-red-500"
                        >
                            CONFIRMAR
                        </button>
                    </div>
                </div>
            </ReactModal>
        </div>
    );
};

export default Task