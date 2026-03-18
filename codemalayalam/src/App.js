import React, { useRef, useState } from 'react';
import './App.css';
import List from './List.js';

const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
  borderRadius: '20px'
};

const arr = ['Sara 0', 'Arun 1', 'Ratheesh 2', 'Sunil 3', 'Kumar 4'];

function TodoFetcher() {
  const [todo, setTodo] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const fetchTodo = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setStatus('loading');
    setError(null);
    setTodo(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();
      setTodo(data);
      setStatus('success');
    } catch (err) {
      if (err.name === 'AbortError') {
        setStatus('canceled');
      } else {
        setError(err.message);
        setStatus('error');
      }
    } finally {
      abortControllerRef.current = null;
    }
  };

  const cancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <div className="todo-fetcher">
      <h2>Fetch /todos/1</h2>

      {status === 'idle' && (
        <button onClick={fetchTodo} type="button">
          Load Todo
        </button>
      )}

      {status === 'loading' && (
        <div>
          <span>Loading…</span>
          <button onClick={cancel} type="button">
            Cancel
          </button>
        </div>
      )}

      {status === 'success' && todo && (
        <div className="todo-result">
          <p>
            <strong>ID:</strong> {todo.id}
          </p>
          <p>
            <strong>Title:</strong> {todo.title}
          </p>
          <p>
            <strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}
          </p>
          <button onClick={fetchTodo} type="button">
            Refresh
          </button>
        </div>
      )}

      {status === 'error' && (
        <div>
          <p style={{ color: 'red' }}>Error: {error}</p>
          <button onClick={fetchTodo} type="button">
            Retry
          </button>
        </div>
      )}

      {status === 'canceled' && (
        <div>
          <p>Request canceled.</p>
          <button onClick={fetchTodo} type="button">
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

export default function Profile() {
  return (
    <div className="App">
        <TodoFetcher className="item" />
      {arr.map((Item, index) => (
        <div key={index} className="item">
          <List />
          <h1>{Item.split(' ')[0]}</h1>
          <img
            className="avatar"
            src={user.imageUrl}
            alt={'Photo of ' + user.name}
            style={{
              width: user.imageSize,
              height: user.imageSize,
              borderRadius: user.borderRadius
            }}
          />
        </div>
      ))}
    </div>
  );
}
