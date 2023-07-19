import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import trashcan from '../assets/trashcan.svg'
const WorkoutDetails = ({workout}) => {
    const {dispatch} = useWorkoutsContext();

    const handleDelete = async () => {
        
        const response = await fetch('https://workout-pal-mern-backend.vercel.app/api/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const json = await response.json();
        if(response.ok)
        {dispatch({type: 'DELETE_WORKOUT', payload: json})}
    }
    return ( 
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleDelete}><img src={trashcan} alt="" /></span>
        </div>
     );
}
 
export default WorkoutDetails;