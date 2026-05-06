const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const FOOTBALL_KEY = process.env.FOOTBALL_API_KEY;
const CRICKET_KEY = process.env.CRICKET_API_KEY;
const PORT = process.env.PORT || 3000;

// Live football scores
app.get('/football/matches', async (req, res) => {
  try {
    const response = await fetch('https://api.football-data.org/v4/matches?status=IN_PLAY,PAUSED,FINISHED&limit=9', {
      headers: { 'X-Auth-Token': FOOTBALL_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch football data' });
  }
});

// Premier League standings
app.get('/football/standings', async (req, res) => {
  try {
    const response = await fetch('https://api.football-data.org/v4/competitions/PL/standings', {
      headers: { 'X-Auth-Token': FOOTBALL_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch standings' });
  }
});

// Live cricket scores
app.get('/cricket/matches', async (req, res) => {
  try {
    const response = await fetch(`https://api.cricketdata.org/cricket/?apikey=${CRICKET_KEY}&offset=0`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cricket data' });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'SportsRush TV API is running!' });
});

app.listen(PORT, () => {
  console.log(`SportsRush TV server running on port ${PORT}`);
});
