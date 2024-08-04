import './Todo.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from "react";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('incomplete');
  const [filter, setFilter] = useState('all');
  const [action, setAction] = useState('create');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (event) => {
    setTask(event.target.value);
  }

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentTime = new Date().toLocaleString();
    if (action === 'update') {
      const updatedTasks = tasks.map((t, index) =>
        index === editingIndex ? { ...t, text: task, completed: status === 'complete', time: currentTime } : t
      );
      setTasks(updatedTasks);
      setAction('create');
    } else {
      setTasks([...tasks, { text: task, completed: status === 'complete', time: currentTime }]);
    }
    setTask("");
    setStatus('incomplete');
    setIsModalOpen(false);
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setTask("");
    setStatus('incomplete');
    setAction('create');
  }

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'complete') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const editTask = (currentTask, index) => {
    setTask(currentTask.text);
    setStatus(currentTask.completed ? "complete" : "incomplete");
    openModal();
    setAction('update');
    setEditingIndex(index);
  }

  return (
    <div className="Todo container">
      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-primary" onClick={openModal} style={{ marginLeft: '250px' }}>Add TODO</button>
        <select id="filter" value={filter} onChange={handleFilterChange} className="form-control" style={{ width: '100px', marginRight: '270px' }}>
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Completed</option>
        </select>
      </div>
      {isModalOpen && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{action === 'create' ? 'Add TODO' : 'Edit TODO'}</h5>
                <button type="button" className="close" onClick={closeModal}>&times;</button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" value={task} onChange={handleChange} required id="title" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select id="status" value={status} onChange={handleStatusChange} className="form-control">
                      <option value="incomplete">Incomplete</option>
                      <option value="complete">Completed</option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">{action === 'create' ? 'Add Task' : 'Update Task'}</button>
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="list-group">
        {filteredTasks.length === 0 ? (
          <p className="list-group-item" style={{ width: '933px', marginLeft: '180px' }}>No Todos</p>
        ) : (
          filteredTasks.map((task, index) => (
            <p className="list-group-item" key={index} style={{ width: '933px', marginLeft: '180px' }}>
              <span onClick={() => toggleTaskCompletion(index)} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text} - <span>{task.completed ? "Completed" : "Incomplete"}</span>
              </span>
              <span className="task-time">{task.time}</span>
              <div>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)} style={{ marginLeft: '10px' }}>Delete</button>
                <button className="btn btn-warning btn-sm" onClick={() => editTask(task, index)} style={{ marginLeft: '10px' }}>Edit</button>
              </div>
            </p>
          ))
        )}
      </div>
    </div>
  );
}

export default Todo;
