import React, { useState } from "react";
import ReactModal from "react-modal";

function Info() {
    const [showInfo, setShowInfo] = useState(false)
    const handleInfoOpen = () => {
        setShowInfo(true)
    }
    const handleInfoClose = () => {
        setShowInfo(false)
    }
    return (
        <div>
            <button onClick={handleInfoOpen} className="text-[#39FF14] bg-black px-2 py-0 text-md font-extrabold rounded-3xl border-2 border-[#39FF14] hover:scale-110 duration-300">
                I N F O R M A C I O N
            </button>
            <ReactModal
                isOpen={showInfo}
                onRequestClose={handleInfoClose}
                shouldCloseOnOverlayClick={false}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.5)",
                    },
                    content: {
                        backgroundColor: "#1F2938",
                        color: "#39FF14",
                        fontFamily: "monospace",
                        fontSize: "20px",
                        padding: "10px",
                        margin: "auto",
                        maxWidth: "25%",
                        minWidth: "350px",
                        maxHeight: "35%",
                        minHeight: "270px",
                        border: "none",
                    },
                }}
            >
                <div className="flex gap-3 font-mono">
                    <button onClick={handleInfoClose} className="absolute top-1 right-1 hover:scale-110 duration-200" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                    <ul className="space-y-5 mx-5 mt-5">
                        <div className="flex">
                            <p>✅</p>
                            <li>El arrastre de tareas no funciona en dispositivos tactiles</li>
                        </div>
                        <div className="flex">
                            <p>✅</p>
                            <li>Utiliza almacenamento local</li>
                        </div>
                    </ul>
                    <span className="absolute bottom-1 " >- Eder Panta</span>
                    <a href="https://github.com/EderPanta18" target="_blank" className="absolute bottom-1 right-1">
                        <img src="src\assets\githubLogo.png" className="w-8 h-8 bg-white p-[0.5px] rounded-full border-0" alt="github" />
                    </a>
                </div>
            </ReactModal>
        </div >
    );
}

export default Info;
