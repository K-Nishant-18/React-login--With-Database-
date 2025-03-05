import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
  }, [username, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  // State for time, greeting, quote, weather, and to-do list
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quote, setQuote] = useState("");
  const [weather, setWeather] = useState({ temperature: "22°C", condition: "Sunny" });
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  };

  // Fetch a random quote
  useEffect(() => {
    const quotes = [
      "The best way to predict the future is to create it.",
      "Every moment is a fresh beginning.",
      "Believe you can and you’re halfway there.",
      "Happiness depends upon ourselves.",
      "Do what you can, with what you have, where you are.",
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // Add a new to-do
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  // Toggle to-do completion
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a to-do
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>MyApp</h2>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Greeting and Weather Card */}
        <div style={styles.card}>
          <h1 style={styles.title}>{getGreeting()}, {username}!</h1>
          <p style={styles.text}>Today is {currentTime.toLocaleDateString()}</p>
          <p style={styles.text}>Current Time: {currentTime.toLocaleTimeString()}</p>
          <div style={styles.weather}>
            <p style={styles.weatherText}>🌡️ {weather.temperature}</p>
            <p style={styles.weatherText}>☁️ {weather.condition}</p>
          </div>
        </div>

        {/* Quote Card */}
        <div style={styles.card}>
          <div style={styles.quoteContainer}>
            <p style={styles.quote}>✨ {quote} ✨</p>
          </div>
        </div>

        {/* To-Do List Card */}
        <div style={styles.card}>
          <h2 style={styles.subtitle}>Your To-Do List</h2>
          <div style={styles.todoInputContainer}>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              style={styles.todoInput}
            />
            <button style={styles.addButton} onClick={addTodo}>
              Add
            </button>
          </div>
          <ul style={styles.todoList}>
            {todos.map((todo) => (
              <li key={todo.id} style={styles.todoItem}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  style={styles.checkbox}
                />
                <span
                  style={{
                    ...styles.todoText,
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </span>
                <button
                  style={styles.deleteButton}
                  onClick={() => deleteTodo(todo.id)}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>

      
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right, #1e3c72, #2a5298)",
    color: "white",
    fontFamily: "'Poppins', sans-serif",
    padding: "70px",
  },
  navbar: {
    width: "90vw",
    background: "rgba(19, 19, 19, 0.61)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "0 0 10px 10px",
    padding: "15px 60px",
    position: "fixed",
    marginRight: "50px",
    marginLeft: "50px",
    top: 0,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "white",
  },
  logoutButton: {
    background: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "10px 18px",
    fontSize: "14px",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "0.3s ease",
    ":hover": {
      background: "#ff1a1a",
    },
  },
  content: {
    width: "100%",
    maxWidth: "800px",
    marginTop: "80px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.9)",
    color: "#333",
    padding: "25px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
    marginBottom: "20px",
    backdropFilter: "blur(10px)",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#1e3c72",
  },
  text: {
    fontSize: "16px",
    marginBottom: "10px",
    color: "#555",
  },
  weather: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "15px",
  },
  weatherText: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#1e3c72",
  },
  quoteContainer: {
    margin: "20px 0",
    background: "#f4f4f4",
    padding: "15px",
    borderRadius: "10px",
  },
  quote: {
    fontSize: "18px",
    fontStyle: "italic",
    color: "#333",
  },
  subtitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#1e3c72",
  },
  todoInputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  todoInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  addButton: {
    background: "#1e3c72",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.3s ease",
    ":hover": {
      background: "#2a5298",
    },
  },
  todoList: {
    listStyle: "none",
    padding: 0,
  },
  todoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  checkbox: {
    marginRight: "10px",
  },
  todoText: {
    flex: 1,
    fontSize: "16px",
  },
  deleteButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    color: "#ff4d4d",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
  },
};

export default Home;