import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import WorkoutUpdateForm from './WorkoutUpdateForm'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const [isEditing, setIsEditing] = useState(false)

  const handleDelete = async () => {
    if (!user) return
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  const toggleEdit = () => {
    setIsEditing((prev) => !prev) // Toggle the editing state
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>

      {isEditing && ( // Show the delete button only when the form is open
        <>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
          <WorkoutUpdateForm 
            workout={workout} 
            onClose={() => setIsEditing(false)} // Close form handler
          />
        </>
      )}

      {!isEditing && ( // Show the Edit button only when the form is closed
        <button 
          className="edit-button" 
          onClick={toggleEdit} // Click to toggle
        >
          Edit
        </button>
      )}
    </div>
  )
}

export default WorkoutDetails

