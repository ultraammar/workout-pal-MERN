import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

//components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();
    //const [workouts, setWorkouts] = useState(null);

    useEffect(() =>{
        const fetchWorkouts = async () => {
            const response = await fetch('https://workout-pal-mern-backend.vercel.app/api/workouts')
            const json = await response.json();
            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
                //setWorkouts(json);
            }
        }
        fetchWorkouts();
    }, [])

    return ( 
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => {
                    return(
                        <WorkoutDetails key={workout._id} workout={workout}/>
                    )
                })}
            </div>
            <WorkoutForm />
        </div>
     );
}
 
export default Home;