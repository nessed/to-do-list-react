return (
  <div className="todo-container">
    <h1 className="todo-title">Todo List</h1>
    <div className="todo-input-container">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task..."
        className="todo-input"
      />
      <button onClick={addTodo} className="todo-button">
        Add Task
      </button>
    </div>
    
    <div className="todo-section active-todos">
      <h2 className="section-title">Active Tasks</h2>
      <ul className="todo-list">
        {todos.filter(todo => !todo.completed).map((todo, index) => (
          <li key={index} className="todo-item">
            <span className="todo-text">
              {todo.text}
            </span>
            <div className="todo-actions">
              <button
                onClick={() => toggleTodo(index)}
                className="todo-toggle-btn"
                title="Mark as completed"
              >
                ✓
              </button>
              <button
                onClick={() => deleteTodo(index)}
                className="todo-delete-btn"
                title="Delete task"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>

    <div className="todo-section completed-todos">
      <h2 className="section-title">Completed Tasks</h2>
      <ul className="todo-list">
        {todos.filter(todo => todo.completed).map((todo, index) => (
          <li key={index} className="todo-item">
            <span className="todo-text completed">
              {todo.text}
            </span>
            <div className="todo-actions">
              <button
                onClick={() => toggleTodo(index)}
                className="move-back-btn"
                title="Move back to active tasks"
              >
                Move Back ↩️
              </button>
              <button
                onClick={() => deleteTodo(index)}
                className="todo-delete-btn"
                title="Delete task"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
        {todos.filter(todo => todo.completed).length === 0 && (
          <p style={{ color: '#e2e8f0', textAlign: 'center', padding: '1rem' }}>
            No completed tasks yet
          </p>
        )}
      </ul>
    </div>
  </div>
) 