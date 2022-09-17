// Importing dependencies
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

// Edit exercise data
export const EditExercisePage = ({ exercise }) => {

    const [name, setName] = useState(exercise.name);
    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [unit, setUnit] = useState(exercise.unit);
    const [date, setDate] = useState(exercise.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: name,
                reps: reps,
                weight: weight,
                unit: unit,
                date: date
            }),
            headers: { 'Content-Type': 'application/json', },
        });

        if (response.status === 200) {
            alert("Successfully edited!");
        } else {
            alert(`Failed to update data. Status code=${response.status} `);
        }
        navigate("/");
    }

    return (
        <div>
            <article className='App-article'>
                <h2>Edit the exercise data</h2>
                <p>On this page you can modify the related data.</p>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    
                    <fieldset>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="name" required />
                        <label htmlFor="reps">Reps</label>
                        <input
                            type="number"
                            min={1}
                            value={reps}
                            onChange={e => setReps(e.target.value)}
                            id="reps" required />

                        <label htmlFor="weight">Weight</label>
                        <input
                            type="number"
                            min={1}
                            value={weight}
                            onChange={e => setWeight(e.target.value)}
                            id="weight" required />

                        <label htmlFor="unit">Unit</label>
                        <select id="unit" value={unit}
                            onChange={e => setUnit(e.target.value)} required>
                            <option value={"lbs"}>lbs</option>
                            <option value={"kgs"}>kgs</option>
                            <option value={"miles"}>miles</option>
                        </select>

                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            id="date" required />

                        <div className='form-row'>
                            <label htmlFor="submit">
                                <button
                                    type="submit"
                                    onClick={editExercise}
                                    id="submit"
                                >Save</button></label>
                        </div>
                    </fieldset>
                </form>
            </article>
        </div>
    );
}
export default EditExercisePage;