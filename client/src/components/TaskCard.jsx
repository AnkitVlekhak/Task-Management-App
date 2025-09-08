import { useNavigate } from 'react-router-dom'

const TaskCard = ({ task, onDelete }) => {
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate(`/tasks/${task._id}/edit`)
  }

  const getStatusColor = (status) => {
    return status === 'done' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {task.title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {task.description}
      </p>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Created: {formatDate(task.createdAt)}
        </span>
        
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
