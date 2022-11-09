import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import routes from './settings/routes.js';

const app = express();
const port = process.env.PORT || 8080;

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
routes(app);

app.listen(port, () => {
    console.log(`listening http://localhost:${port}/`);
});

