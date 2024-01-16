import { useState, useEffect } from "react";
import axios from "axios";


export default function GoalController() {

    const [resultModifiers, setResultModifiers] = useState({ category: "", sort: "", complete: false });
    //


    const handleHome = async () => {
        const category = "";
        const response = await axios.get(`/api/goalSelect`, resultModifiers);
        return response;
    }

    const handleBooks = async () => {
        const category = "books";
        const response = await axios.get(`/api/${indexToSave}`, pixelGrid);
        return response;
    }

    return(
        <>
            <div>
                <button>Home</button>
                <button>Books</button>
                <button>Games</button>
                <button>Movies</button>
                <button>Projects</button>
            </div>
            <div>
                <div>
                    <button>Pri</button>
                    <button>Perct</button>
                    <button>Size</button>
                    <button>Age</button>
                </div>
                <div>
                    <button>Alert</button>
                    <button>Compl</button>
                </div>
            </div>
            <div>.. result table ..</div>
        </>
    );
}