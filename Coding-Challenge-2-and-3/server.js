const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const app = express();
const { Sports } = require('./models/sport-model');
const morgan = require('morgan');

app.use(morgan("dev"));
let sports = [
    {
        id: 1,
        name: "futbol",
        num_players: 12
    },
    {
        id: 2,
        name: "basketball",
        num_players: 5
    }
];
let count = 3;
/* Your code goes here */
app.post('/sports/addSport/:sportId', [jsonParser], function (req, res) {
  let {sportId} = req.params;
  let {id, name, num_players} = req.body;
    console.log(id, name, num_players)
  if( !name || !num_players || !id) {
    res.statusMessage = "One of this is missing: name, num_players, id";  
    return res.status(406).end();
  }

  if(Number(sportId) != Number(id)) {
    res.statusMessage = "sportId parameter and id in body didnt match";  
    return res.status(409).end();
  }

  //add 400
  let v = false;
  for (var sport of sports) {
      if(sport.id === Number(sportId)){
        v = true;
        break;
      }
  }
  console.log(v)
  if(v){
      res.statusMessage = "sport already exists"
      return res.status(400).end();
  }

  let newS = {
        id: Number(sportId),
        name: name,
        num_players: num_players
    };
  sports.push(newS);
    count = count + 1;
  res.status(201).json(sports);
})

app.post('/create/:sportId',[jsonParser], function (req, res) {
    let {sportId} = req.params;
    let {id, name, num_players} = req.body;
    
    if( !name || !num_players || !id) {
        res.statusMessage = "One of this is missing: name, num_players, id";  
        return res.status(406).end();
    }

    if(Number(sportId) != Number(id)) {
        res.statusMessage = "sportId parameter and id in body didnt match";  
        return res.status(409).end();
    }

    Sports
    .create(id, name, num_players)
    .then((result) => {
        
        if( result.errmsg ) {
            res.statusMessage = result.errmsg;
            return res.status(400).end();
        }

        return res.status(201).json(result);
    }).catch((err) => {
        res.statusMessage = "Error database problems, comeback later"
        return res.status(500).end();
    });
})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});