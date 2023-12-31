import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = {title, load, reps}
        console.log(workout);
        
        const response = await fetch('https://workout-pal-mern-backend.vercel.app/api/workouts', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(workout)
        })
        const json = await response.json();
        if(!response.ok){
            setError(json.msg);
        }
        else{
            setTitle('');
            setLoad(''); setReps('');
            console.log("New workout added.");
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }
    
    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>

            <label>Exercise title:</label>
            <input type="text" onChange={(e) => {setTitle(e.target.value)} } value={title}/>
            
            <label>Load ( in KG):</label>
            <input type="number" onChange={(e) => {setLoad(e.target.value)} } value={load}/>
            
            <label>Number of Reps:</label>
            <input type="number" onChange={(e) => {setReps(e.target.value)} } value={reps}/>

            <button >Add Workout</button>
            {error && <div className="error">{error}</div>}

        </form>
     );
}
 
export default WorkoutForm;