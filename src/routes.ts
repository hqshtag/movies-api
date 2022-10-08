import express from 'express';

import moviesRouter from './routes/MovieRouter';

const Router = express.Router();

Router.use('/movies', moviesRouter);

export default Router;