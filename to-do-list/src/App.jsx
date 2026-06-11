import React, { useState } from "react";
import "../style.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [showCompleted, setShowCompleted] = useState(true);

  const addTodo = (e) => {
    e.preventDefault(); // Prevent form submission refresh
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now() + Math.random(), // Ensure unique ID
        text: inputValue,
        completed: false,
        priority: priority,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isEditing: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (e, id) => {
    e.stopPropagation();
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (e, id) => {
    e.stopPropagation();
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : todo
      )
    );
  };

  const saveEdit = (id, newText) => {
    if (newText.trim() === "") {
      // If the new text is empty, delete the task
      setTodos(todos.filter((todo) => todo.id !== id));
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
        )
      );
    }
  };

  const pendingTasks = todos.filter((t) => !t.completed);
  const completedTasks = todos.filter((t) => t.completed);

  return (
    <div className="container">
      <div className="glass-card">
        <h1>📌 My Tasks</h1>

        {/* Form handling for better UX and accessibility */}
        <form className="input-section" onSubmit={addTodo}>
          <div className="input-group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What's next? 📝"
              aria-label="New task input"
            />
            <select
              className="priority-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              aria-label="Select priority"
            >
              <option value="High">🟥 High</option>
              <option value="Medium">🟨 Medium</option>
              <option value="Low">🟩 Low</option>
            </select>
          </div>
          <button type="submit" className="add-btn clay-button">
            Add Task
          </button>
        </form>

        <button
          className="toggle-btn clay-button"
          onClick={() => setShowCompleted(!showCompleted)}
          aria-label={showCompleted ? "Hide completed tasks" : "Show completed tasks"}
        >
          {showCompleted ? "Hide Completed" : "Show Completed"}
        </button>

        <div className="scroll-area">
          <section>
            <h3 className="section-title">Pending ⏳ ({pendingTasks.length})</h3>
            {pendingTasks.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                startEdit={startEdit}
                saveEdit={saveEdit}
              />
            ))}
          </section>

          {showCompleted && (
            <section>
              <h3 className="section-title">Completed ✅</h3>
              {completedTasks.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                  startEdit={startEdit}
                  saveEdit={saveEdit}
                />
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

// Sub-component for better organization
function TodoItem({ todo, toggleComplete, deleteTodo, startEdit, saveEdit }) {
  return (
    <div
      className={`todo-item clay-card priority-${todo.priority.toLowerCase()} ${todo.completed ? "completed" : ""
        }`}
    >
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="clay-checkbox"
          aria-label={`Mark "${todo.text}" as ${todo.completed ? "incomplete" : "complete"}`}
        />

        {todo.isEditing ? (
          <div className="edit-mode-group" style={{ display: "flex", gap: "5px", flex: 1 }}>
            <input
              autoFocus
              className="edit-input"
              defaultValue={todo.text}
              onBlur={(e) => {
                // Only save on blur if we aren't clicking the save button
                // This is tricky with onBlur, so we might want to rely on the button or Enter key primarily.
                // For now, keeping onBlur but we need to be careful it doesn't conflict with the button click.
                // Actually, standard behavior is often just Enter or Button. User explicitly asked for a button.
                // Let's remove onBlur auto-save to allow the user to use the button, 
                // OR keep it but ensure the button works too.
                // A common pattern is to save on blur, but if the user clicks the button, that also saves.
                // To avoid double-save or race conditions, we can keep it simple.
                // Let's REMOVE onBlur to force user to confirm or press Enter, as requested "Confirm option is not shown".
                // This gives them control.
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveEdit(todo.id, e.currentTarget.value);
                }
              }}
              aria-label="Edit task text"
            />
            <button
              className="action-btn"
              onMouseDown={(e) => {
                // Use onMouseDown to prevent input blur from firing first if we kept it
                const input = e.currentTarget.previousElementSibling;
                saveEdit(todo.id, input.value);
              }}
              aria-label="Save changes"
            >
              ✅
            </button>
          </div>
        ) : (
          <div className="text-info" onClick={() => toggleComplete(todo.id)}>
            <span className="todo-text">{todo.text}</span>
            <span className="todo-time">{todo.time}</span>
          </div>
        )}
      </div>

      <div className="actions">
        {!todo.isEditing && (
          <button
            className="action-btn"
            onClick={(e) => startEdit(e, todo.id)}
            aria-label={`Edit task "${todo.text}"`}
          >
            ✏️
          </button>
        )}
        <button
          className="action-btn"
          onClick={(e) => deleteTodo(e, todo.id)}
          aria-label={`Delete task "${todo.text}"`}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default App;