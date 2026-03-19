import React, { useRef, useState } from 'react';
import './App.css';
import List from './List.js';

const defaultUser = {
  imageSize: 90,
  borderRadius: '20px'
};

const genderedImages = {
  male: 'https://i.pravatar.cc/150?img=3',
  female: 'https://i.pravatar.cc/150?img=5',
  unknown: 'https://i.pravatar.cc/150?img=12'
};

const nameToGender = {
  Sara: 'female',
  Arun: 'male',
  Ratheesh: 'male',
  Sunil: 'male',
  Kumar: 'male'
};

const arr = ['Sara 0', 'Arun 1', 'Ratheesh 2', 'Sunil 3', 'Kumar 4'];

function getImageForName(name) {
  const gender = nameToGender[name] || 'unknown';
  return genderedImages[gender] || genderedImages.unknown;
}

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

    // Add an artificial delay so cancel/abort can be tested more easily.
    await new Promise((resolve) => setTimeout(resolve, 4000));

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
      {arr.map((Item, index) => {
        const name = Item.split(' ')[0];
        const imageUrl = getImageForName(name);

        return (
          <div key={index} className="item">
            <List />
            <h1>{name}</h1>
            <img
              className="avatar"
              src={imageUrl}
              alt={'Photo of ' + name}
              style={{
                width: defaultUser.imageSize,
                height: defaultUser.imageSize,
                borderRadius: defaultUser.borderRadius
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
