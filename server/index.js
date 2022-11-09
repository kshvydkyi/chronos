import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";


const app = express();
const port = process.env.PORT || 8080;




app.listen(port, () => {
    console.log(`listening http://localhost:${port}/`);
});