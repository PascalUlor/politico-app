import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import winston from './server/config/winston';
import routes from './server/routes/routes';


const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined', { stream: winston.stream }));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(err.status || 500);
  res.render('error');
  next();
});


app.use('/api/v1/', routes);

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Invalid routes',
  });
});


app.listen(port, () => winston.info(`Application started on port ${port}, ${process.cwd()}, ${__dirname}`));
export default app;
