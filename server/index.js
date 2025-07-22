const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Import routes
app.use('/donate', require('./routes/donate'));
app.use('/blogs', require('./routes/blogs'));
app.use('/programs', require('./routes/programs'));

app.listen(5000, () => console.log('Server running on port 5000'));
