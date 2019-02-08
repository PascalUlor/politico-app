import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import YAML from 'yamljs';
import winston from './server/config/winston';
import routes from './server/routes/routes';


const app = express();

const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);

app.use(cors({ credentials: true, origin: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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


// Home page route
app.use('/api/v1/', routes);
app.use('/', express.static(path.join(__dirname, 'client')));

app.use('/api/v1/', routes);

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'Invalid routes',
  });
});


app.listen(port, () => winston.info(`Application started on port ${port}, ${process.cwd()}`));
export default app;
