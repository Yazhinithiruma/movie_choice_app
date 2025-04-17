const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Enable CORS to allow frontend to make requests to backend
app.use(cors());
app.use(bodyParser.json());

// Path to the local JSON file that will store movie data
const dataFile = 'movies.json';

// Read the existing data from the JSON file
function readData() {
  if (fs.existsSync(dataFile)) {
    const rawData = fs.readFileSync(dataFile);
    return JSON.parse(rawData);
  }
  return [];
}

// Write updated data back to the JSON file
function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// API route to get movie history
app.get('/api/history', (req, res) => {
  const history = readData();
  res.json(history);
});

// API route to add a new movie
app.post('/api/history', (req, res) => {
  const { favorite_movie, favorite_actor } = req.body;
  if (!favorite_movie || !favorite_actor) {
    return res.status(400).json({ message: 'Both fields are required' });
  }

  const history = readData();
  const newMovie = { favorite_movie, favorite_actor };
  history.push(newMovie);
  writeData(history);

  res.status(201).json({ message: 'Movie added to history' });
});

// API route to delete a movie by index (for simplicity)
app.delete('/api/history/:index', (req, res) => {
  const { index } = req.params;
  const history = readData();
  if (history[index]) {
    history.splice(index, 1);
    writeData(history);
    return res.json({ message: 'Movie deleted from history' });
  }
  res.status(404).json({ message: 'Movie not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
