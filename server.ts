import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5002;
const MONGO_URI: string = process.env.MONGO_URL as string;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
