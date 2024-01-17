import { useState, useEffect } from "react";
import axios from "axios";


export default function GoalController() {

    // const [resultModifiers, setResultModifiers] = useState({ category: '', sort: 'description', complete: false });
    const resultModifiers = { category: '', sort: 'description', complete: false };

    const handleHome = async () => {
        const category = '';
        const response = await axios.get(`/api/goalSelect`);
        return response;
    };

    const handleBooks = async () => {
        const category = 'book';
        const params = { ...resultModifiers, category: category };
        const response = await axios.get(`/api/goalSelect`, { params },);
        return response;
    };

    const handleStuff = async () => {
        const category = "books";
        const response = await axios.get(`/api/${indexToSave}`);
        return response;
    };

    return(
        <>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary active">
                    <input type="radio" name="options" id="option1" checked/> Home
                </label>
                <label class="btn btn-secondary">
                    <input type="radio" name="options" id="option2"/> Books
                </label>
                <label class="btn btn-secondary">
                    <input type="radio" name="options" id="option3"/> Games
                </label>
                <label class="btn btn-secondary">
                    <input type="radio" name="options" id="option3"/> Movies
                </label>
                <label class="btn btn-secondary">
                    <input type="radio" name="options" id="option3"/> Projects
                </label>
            </div>
            <div>
                <button>Home</button>
                <button onClick={ handleBooks }>Books</button>
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
            <div>.. result table with State ..</div>
        </>
    );
}