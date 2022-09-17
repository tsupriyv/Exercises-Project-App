// Importing dependencies
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Create page to add exercises
export const CreatePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        navigate("/");
    };


    return (
        <>
            <article>
                <h2>Enter the exercise statistics</h2>
                <p>On this page you can input the data to keep track of your exercises.</p>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <fieldset className='form-border'>
                        <div className='form-row'>
                            <label htmlFor="name">Name</label>
                            <br />
                            <input
                                type="text"
                                placeholder=" "
                                value={name}
                                onChange={e => setName(e.target.value)}
                                id="name" required />
                        </div>
                        <div className='form-row'>
                            <label htmlFor="reps">Reps</label>
                            <br />
                            <input
                                type="number"
                                min={1}
                                value={reps}
                                placeholder=" "
                                onChange={e => setReps(e.target.value)}
                                id="reps" required />
                        </div>
                        <div className='form-row'>
                            <label htmlFor="weight">Weight</label>
                            <br />
                            <input
                                type="number"
                                min={1}
                                placeholder=" "
                                value={weight}
                                onChange={e => setWeight(e.target.value)}
                                id="weight" required />
                        </div>
                        <div className='unit'>
                            <label htmlFor="unit">Unit</label>
                            <select id="unit" value={unit}
                                onChange={e => setUnit(e.target.value)} required>
                                <option value={"lbs"}>lbs</option>
                                <option value={"kgs"}>kgs</option>
                                <option value={"miles"}>miles</option>
                            </select>
                        </div>
                        <div className='date'>
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                placeholder=" "
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                id="date" required />
                        </div>
                        <div className='form-row'>
                            <label htmlFor="add">
                                <button
                                    type="submit"
                                    onClick={addExercise}
                                    id="add"
                                >Add</button></label>
                        </div>
                    </fieldset>
                </form>
            </article>
        </>
    );
}

export default CreatePage;