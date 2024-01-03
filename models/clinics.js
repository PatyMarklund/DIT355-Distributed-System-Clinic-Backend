var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clinicSchema = new Schema(
    {
        id: {type: Number, unique: true},
        name: {type: String, unique: true},
        owner: {firstName: {type: String}, lastName: {type: String}},
        dentists: {type: Number},
        address: {type: String},
        city: {type: String, default: "Gothenburg"},
        coordinate: {longitude: {type: Number}, latitude: {type: Number}},
        appointments: {
            monday: {
                start: {type: Number, min: 6},
                end: {type: Number, max: 20}
            },
            tuesday: {
                start: {type: Number, min: 6},
                end: {type: Number, max: 20}
            },
            wednesday: {
                start: {type: Number, min: 6},
                end: {type: Number, max: 20}
            },
            thursday: {
                start: {type: Number, min: 6},
                end: {type: Number, max: 20}
            },
            friday: {
                start: {type: Number, min: 6},
                end: {type: Number, max: 20}
            }
        }
    }
);

module.exports = mongoose.model("clinics", clinicSchema);