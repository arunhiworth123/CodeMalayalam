import React, { useRef, useState } from 'react';

const getLocalRandom = () => {
  return Math.floor(Math.random() * 10) + 1; // 1–10
};
export function Increment() {
  // Declare a state variable "count" with initial value 0
  const [count, setCount] = useState(0);

  return (
    <div  className="todo-fetcher">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click Me
      </button>
    </div>
  );
}


export function TodoFetcher() {
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
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${getLocalRandom()}`, {
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
        {status === 'idle' && (
        <button onClick={fetchTodo} type="button">
          This is caption only button
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
          <p>īīī
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

