// Import dependencies.
import 'dotenv/config';
import express from 'express';
import * as exercises from './model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());


// CREATE controller 
app.post('/exercises', (req, res) => {
    if (req.body.name && req.body.reps > 0
        && req.body.weight > 0) {
        exercises.createExercise(
            req.body.name,
            req.body.reps,
            req.body.weight,
            req.body.unit,
            req.body.date
        )
            .then(exercises => {
                res.status(201).json(exercises);
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({ Error: 'Invalid request.' });
            });
    }
    else {
        res.status(400).json({ Error: "Invalid Request" });
    }
});

// GET all exercises
app.get('/exercises', (req, res) => {
    console.log("Message");
    exercises.findExercises()
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to retrieve documents failed' });
        });

});

// RETRIEVE controller using GET
// GET Exercises by ID
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExercisesById(exerciseId)
        .then(exercise => {
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ error: 'Request to retrieve document failed' });
        });

});

// UPDATE controller using PUT
app.put('/exercises/:_id', (req, res) => {
    if (req.body.name && req.body.reps
        && req.body.weight && req.body.unit && req.body.date) {
        exercises.replaceExercise(
            req.params._id,
            req.body.name,
            req.body.reps,
            req.body.weight,
            req.body.unit,
            req.body.date
        )

            .then(Updated => {
                if (Updated === 1) {
                    res.json({
                        _id: req.params._id,
                        name: req.body.name,
                        reps: req.body.reps,
                        weight: req.body.weight,
                        unit: req.body.unit,
                        date: req.body.date
                    })
                } else {
                    res.status(404).json({ Error: 'Not found' });
                }
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({ Error: "Invalid Request" });
            });
    }
    else {
        res.status(400).json({ Error: "Invalid Request" });
    }
});


// DELETE Controller using DELETE 
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});