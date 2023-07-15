import express from 'express';
import cors from 'cors';
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3001;

//import { Pool } from 'pg';
const app = express();
app.use(express.json());
app.use(cors());


const { Pool } = pg;
//const db_conn = new Pool({
//  connectionString: process.env.DATABASE_URL,
//});


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todos',
  password: '4545',
  port: 5432,
});

/*let todos = [
    { id: 1, text: 'First todo', completed: false },
    { id: 2, text: 'Second todo', completed: false },
  ];
*/
  function generateId() {
    return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }

 // Create
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  const newTodo = {  text, completed: false };

  pool.query(
    'INSERT INTO todos (text, completed) VALUES ($1, $2)',
    [newTodo.text, newTodo.completed],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.json(newTodo);
      }
    }
  );
});

// Read
app.get('/api/todos', (req, res) => {
  pool.query('SELECT * FROM todos', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.json(result.rows);
    }
  });
});

// Read one
app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params;

  pool.query(
    'SELECT * FROM todos WHERE id = $1',
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      } else if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    }
  );
});

// Update
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  pool.query(
    'UPDATE todos SET text = $1, completed = $2 WHERE id = $3',
    [text, completed, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      } else if (result.rowCount > 0) {
        const updatedTodo = { id, text, completed };
        res.json(updatedTodo);
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    }
  );
});

// Delete
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;

  pool.query(
    'DELETE FROM todos WHERE id = $1',
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      } else if (result.rowCount > 0) {
        res.json({ message: 'Todo was deleted!' });
      } else {
        res.status(404).json({ message: 'Todo not found' });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});