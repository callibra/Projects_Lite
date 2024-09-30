import { useEffect, useState } from 'react';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Oval } from 'react-loader-spinner';

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true); // Set loading to true before fetch
      const response = await fetch('/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
      setLoading(false); // Set loading to false after fetch
    };

    if (user) {
      fetchWorkouts();
    } else {
      setLoading(false); // Ensure loading is false if there's no user
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {loading ? ( // Conditional rendering based on loading state
          <div className="loader-container"> {/* Container for centering */}
          <Oval
            visible={true}
            height="155"
            width="155"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          </div>
        ) : (
          workouts && workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        )}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
