import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import Config from './lib/Config';
import DutyModel from './db/models/duty';

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

// duty
app.post('/duty', DutyModel.createDuty);
app.get('/duty', DutyModel.getDuties);
app.get('/duty/:id', DutyModel.getDutyById);
app.put('/duty/:id', DutyModel.updateDuty);
app.delete('/duty/:id', DutyModel.deleteDuty);

app.listen(Config.port, () => {
  console.log(`Server is running at ${Config.port}`);
});
