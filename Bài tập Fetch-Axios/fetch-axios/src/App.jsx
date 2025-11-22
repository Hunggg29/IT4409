import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'https://jsonplaceholder.typicode.com/users'
function App() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const usersPerPage = 5

  //fetch users 
  useEffect(() => {
    fetchUsers()
  }, [])

  //filter users
  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(filtered)
    setCurrentPage(1)
  }, [searchTerm, users])

  // Fetch all users (READ)
  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setUsers(data)
      setFilteredUsers(data)
    } catch (err) {
      setError('Failed to fetch users: ' + err.message)
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  // Create new user (CREATE)
  const createUser = async (userData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const newUser = await response.json()
      setUsers([newUser, ...users])
      setShowModal(false)
      resetForm()
    } catch (err) {
      setError('Failed to create user: ' + err.message)
      console.error('Error creating user:', err)
    } finally {
      setLoading(false)
    }
  }

  // Update user (UPDATE)
  const updateUser = async (id, userData) => {
    setLoading(true)
    setError(null)
    try {
      // Check if this is a newly created user (id 11 from JSONPlaceholder)
      // For newly created users, only update UI without API call
      const isNewUser = users.find(user => user.id === id && id === 11)
      
      if (isNewUser) {
        // Only update UI for newly created users
        setUsers(users.map(user => 
          user.id === id ? { ...user, ...userData, id: id } : user
        ))
        setShowModal(false)
        setEditingUser(null)
        resetForm()
        setLoading(false)
        return
      }

      // For original users (id 1-10), call the API
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const updatedUser = await response.json()
      setUsers(users.map(user => 
        user.id === id ? { ...user, ...userData } : user
      ))
      setShowModal(false)
      setEditingUser(null)
      resetForm()
    } catch (err) {
      setError('Failed to update user: ' + err.message)
      console.error('Error updating user:', err)
    } finally {
      setLoading(false)
    }
  }

  // Delete user (DELETE)
  const deleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return
    }
    
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      setUsers(users.filter(user => user.id !== id))
    } catch (err) {
      setError('Failed to delete user: ' + err.message)
      console.error('Error deleting user:', err)
    } finally {
      setLoading(false)
    }
  }

  // Form handlers
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all fields')
      return
    }
    
    if (editingUser) {
      updateUser(editingUser.id, formData)
    } else {
      createUser(formData)
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone
    })
    setShowModal(true)
  }

  const handleAddNew = () => {
    setEditingUser(null)
    resetForm()
    setShowModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: ''
    })
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingUser(null)
    resetForm()
  }

  // Pagination 
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="app-container">
      <h1>User Management System</h1>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Search and Add Button */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleAddNew} className="btn-add">
          Add New User
        </button>
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td className="actions">
                      <button 
                        onClick={() => handleEdit(user)} 
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteUser(user.id)} 
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">No users found</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn-page"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`btn-page ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn-page"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Enter phone"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Saving...' : editingUser ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={closeModal} className="btn-cancel">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
