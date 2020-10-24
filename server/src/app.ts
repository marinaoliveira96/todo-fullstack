require('dotenv').config();

import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes';

const app: Express = express();

const PORT: string | number = process.env.PORT || 40000;

app.use(cors());
app.use(todoRoutes);

const uri: string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const options = { userNewUrlParser: true, useUnifiedTopology: true };
mongoose.set('useFindAndModify', false);

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });

/* mongodb+srv://user__001:<password>@cluster0.ltpr0.mongodb.net/<dbname>?retryWrites=true&w=majority */
