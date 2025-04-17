const API_BASE = 'http://localhost:3000/api/history';

// Fetch movie history
async function fetchHistory() {
  try {
    const response = await fetch(API_BASE);
    const data = await response.json();
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    data.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span><strong>${item.favorite_movie}</strong> - ${item.favorite_actor}</span>
        <button onclick="deleteMovie(${index})">Delete</button>
      `;
      historyList.appendChild(li);
    });
  } catch (err) {
    console.error('Error fetching history:', err);
  }
}

// Add a new movie to history
async function addMovie() {
  const movieInput = document.getElementById('favoriteMovie');
  const actorInput = document.getElementById('favoriteActor');
  
  const movie = movieInput.value.trim();
  const actor = actorInput.value.trim();

  if (!movie || !actor) return alert("Both fields are required!");

  try {
    await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favorite_movie: movie, favorite_actor: actor })
    });

    movieInput.value = '';
    actorInput.value = '';
    fetchHistory();
  } catch (err) {
    console.error('Error adding movie:', err);
  }
}

// Delete a movie from history
async function deleteMovie(index) {
  try {
    await fetch(`${API_BASE}/${index}`, { method: 'DELETE' });
    fetchHistory();
  } catch (err) {
    console.error('Error deleting movie:', err);
  }
}

// Initial fetch to display history on page load
window.onload = fetchHistory;
