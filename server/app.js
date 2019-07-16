import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import bodyParser from 'body-parser';
import route from './router/route';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const swaggerdoc = yaml.load(`${__dirname}/../swagger.yaml`);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerdoc));

app.use('/api/v1', route);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App is on port ${port}`);
});

export default app;
