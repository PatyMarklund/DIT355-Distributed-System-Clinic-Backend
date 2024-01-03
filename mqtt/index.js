const client = require('../mqttClient/')
const {ClinicController} = require('../controllers/clinicController')   //temporary for testing
const dentists = require('../dentists/')
const clinicFunctions = require("../clinicFunctions")
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
const {processTimeslots, getClinicByClinicId, arraysToJson} = clinicFunctions.controller
const shared = "$share/A/"
client.subscribe(shared+'clinic/clinicBookings/#', {qos:2})
let booked = {}
booked[1] = []
booked[2] = []
booked[3] = []
booked[4] = []

client.publish("booking/dentists", JSON.stringify(dentists), {retain: true, qos:2}) // Retain means that new subscribers will receive the latest message published on this topic
const clinicController = new ClinicController();

async function publishAvailableTimes(){
    for (let i = 1; i <= 4; i++){
        const clinic = await getClinicByClinicId(i)
        const result = await processTimeslots(clinic.appointments, i)
        let filteredDates = result.map(arr => arr.filter(dateObject => !booked[i].includes(dateObject.date)))
        const finalResult = arraysToJson(filteredDates)
        client.publish(`booking/available/${i}`, JSON.stringify(finalResult), {retain: true, qos:2})
    }
}
setInterval(() => {
publishAvailableTimes().then(() => console.log("Published timeslots!"))
}, 3000)

const options = {
    qos: 2 //received exactly once : Same as QoS 1 but there is no duplicates.
}
/* This can be used to populate the database with clinics
clinicController.createClinics(dentists)
*/

// once connected...
client.on('connect', () => {
    console.log('Connected')
    client.subscribe(shared+'clinics/search/all');
    client.subscribe(shared+'clinic/find', () => {
    console.log(`Subscribed to topic clinic/find`)
  })
  client.subscribe(shared+'clinic/create', () => {
    console.log(`Subscribed to topic clinic/create`)
  })
  client.subscribe(shared+'clinic/search-clinic/id/request', () => {
    console.log(`Subscribed to topic clinic/search-clinic/id/request`)
  })
})

// display all incoming messages
client.on('message', function(topic, message){
    topic = topic.replace("$share/A/" , "")
    switch(topic){
        case 'clinics/search/all':
            clinicController.findAllClinics();
        break;
        case 'clinic/find':
            console.log("Clinic founded " + message);
            clinicController.findClinicByName(message);
            break;
        case 'clinic/search-clinic/id/request':
            console.log("message:" + message);
            clinicController.findClinicByID(message);
            break;
        case 'clinic/clinicBookings/1':
            booked[1] = JSON.parse(message.toString())
      /*      console.log(message.toString())*/
            break
        case 'clinic/clinicBookings/2':
            booked[2] = JSON.parse(message.toString())
         /*   console.log(message.toString())*/
            break
        case 'clinic/clinicBookings/3':
            booked[3] = JSON.parse(message.toString())
      /*      console.log(message.toString())*/
            break
        case 'clinic/clinicBookings/4':
            booked[4] = JSON.parse(message.toString())
 /*           console.log(message.toString())*/
            break
        default: console.log("default")
    }
})

module.exports = client;