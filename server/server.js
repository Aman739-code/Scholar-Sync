require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
// We will uncomment these as we implement them
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/squads', require('./routes/squads'));
app.use('/api/community', require('./routes/community'));
app.use('/api/quests', require('./routes/quests'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/support', require('./routes/support'));
app.use('/api/leaderboard', require('./routes/leaderboard'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
