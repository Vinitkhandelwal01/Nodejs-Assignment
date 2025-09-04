const { initDb } = require('./config/db');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const PORT = process.env.PORT || 3000;

const express = require('express');
const app=express();
const cors = require('cors');
const schoolsRouter = require('./routes/schools');

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/', schoolsRouter);


(async () => {
  try {
    await initDb();
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
})();

