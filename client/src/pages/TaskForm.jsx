import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { api } from '../utils/api'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const TaskForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  })

  // Fetch task data for editing
  const { data: taskData, isLoading: taskLoading } = useQuery(
    ['task', id],
    () => api.get(`/tasks/${id}`).then(res => res.data),
    {
      enabled: isEdit,
      onSuccess: (data) => {
        setFormData({
          title: data.title,
          description: data.description,
          status: data.status
        })
      }
    }
  )

  const createMutation = useMutation(
    (taskData) => api.post('/tasks', taskData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks')
        toast.success('Task created successfully')
        navigate('/dashboard')
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to create task')
      }
    }
  )

  const updateMutation = useMutation(
    (taskData) => api.put(`/tasks/${id}`, taskData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks')
        queryClient.invalidateQueries(['task', id])
        toast.success('Task updated successfully')
        navigate('/dashboard')
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update task')
      }
    }
  )

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    if (isEdit) {
      updateMutation.mutate(formData)
    } else {
      createMutation.mutate(formData)
    }
  }

  const handleCancel = () => {
    navigate('/dashboard')
  }

  if (isEdit && taskLoading) {
    return <LoadingSpinner />
  }

  const isLoading = createMutation.isLoading || updateMutation.isLoading

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            {isEdit ? 'Edit Task' : 'Create New Task'}
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="input-field resize-none"
              placeholder="Enter task description"
              required
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input-field"
            >
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading 
                ? (isEdit ? 'Updating...' : 'Creating...') 
                : (isEdit ? 'Update Task' : 'Create Task')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm
