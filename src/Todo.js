import './Todo.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from "react";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('incomplete');
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (event) => {
    setTask(event.target.value);
  }

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setTasks([...tasks, { text: task, completed: status === 'complete' }]);
    setTask("");
    setStatus('incomplete');
    setIsModalOpen(false);
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'complete') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="Todo container">
      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-primary" onClick={openModal}style={{marginLeft: '250px'}}>Add TODO</button>
        <select id="filter" value={filter} onChange={handleFilterChange} className="form-control" style={{ width: '100px',marginRight: '270px' }}>
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
                <h5 className="modal-title">Add TODO</h5>
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
                    <button type="submit" className="btn btn-primary">Add Task</button>
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="list-group">
        {filteredTasks.map((task, index) => (
            <p  onClick={() =>(index)} >
              {task.text} - <span>{task.completed ? "Completed" : "Incomplete"}</span>
            </p>
        ))}
      </div>
    </div>
  );
}
export default Todo;