// Importing dependencies
import React from 'react';
import Table from '../Components/Table';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

// Function for Home Page
function HomePage({ setExercise }) {

    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);


    //RETRIEVE the list of exercises
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    }

    // UPDATE the exercises
    const onEditExercise = async (exercise) => {
        setExercise(exercise);
        navigate("/edit-exercise");
    }


    // DELETE an exercise  
    const onDeleteExercises = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`)
        }
    }

    // LOAD the exercises
    useEffect(() => {
        loadExercises();
    }, []);

    //DISPLAY the exercises
    return (
        <>
            <article className='App-article'>
                <h2>List of Exercises</h2>
                <p>On this page you can find the statistics and options to Add, Edit and Delete records.</p>
                <Table
                    exercises={exercises}
                    onEdit={onEditExercise}
                    onDelete={onDeleteExercises}
                />
            </article>
        </>
    );
}

export default HomePage;