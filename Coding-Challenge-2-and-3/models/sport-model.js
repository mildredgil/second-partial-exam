const mongoose = require( 'mongoose' );

/* Your code goes here */
const sportSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    num_players: {
        type: Number,
        required: true
    }
})

let SportsCollection = mongoose.model('sports', sportSchema);

Sports = {
    create: function (id, name, num_players) {
        return SportsCollection
        .create({id: id, name: name, num_players: num_players})
        .then((result) => {
            return result;
        }).catch((err) => {
            return err;
        });
    }
}

module.exports = {
    Sports
};