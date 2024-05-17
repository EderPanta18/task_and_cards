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
                    <a href="https://github.com/EderPanta18" target="_blank" className="absolute bottom-0 right-0 w-9 h-9 hover:scale-110 duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                        </svg>
                    </a>
                </div>
            </ReactModal>
        </div >
    );
}

export default Info;
