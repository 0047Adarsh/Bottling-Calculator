import express from "express";
import bodyParser from "body-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

let orders = [];
let volume = 0;

app.post('/volume', (req,res)=>{
    let vdata = req.body.volume;
    volume += parseInt(vdata)   ;
    res.redirect('/');
});

app.post('/order', (req,res)=>{
    let data = req.body;
    orders.push(data);
    console.log(orders);
    res.render('index.ejs', {all_orders: orders, f_volume: volume})
});

app.listen(`${port}`, ()=>{
    console.log(`The website is hosted on port ${port}`);
});