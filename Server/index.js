import app from './app.js';
import process from 'process';

import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(3000, () => {
    console.log('Server listening on port 3000', 'http://localhost:3000');
  });
}).catch((err) => {
  console.log('Failed to connect to MongoDB', err);
})

