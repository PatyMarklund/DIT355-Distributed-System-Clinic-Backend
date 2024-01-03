const Clinic = require("../models/clinics");
const Booking = require("../models/booking");
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
const getClinicByClinicId = async (message) => {
    return await Clinic.findOne({id: message}).catch(error => console.log(error))
}

async function processTimeslots(arr){
    const days = arr;
    const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    let date = new Date()
    let current = date.getDay()
    const dates = []
    let number = 0
    for (let i = 0; i < 7; i++){
        current = date.getDay()
        if (current > 0 && current <= 5) {
            let openTime = days[weekday[current]].start
            let closeTime = days[weekday[current]].end
            let interval = 30
            const result = await createTimeslots(openTime, closeTime, interval, number)
            dates.push(result)
        }
        date.setDate(date.getDate() + 1)
        number++;
    }
    return dates
}
async function createTimeslots(openTime, closeTime, interval, number){
    let settings = {
        openTime, closeTime, interval
    }
    let startTime = moment(settings.openTime, "HH:mm").add(number, 'days');
    let endTime = moment(settings.closeTime, "HH:mm").add(number, 'days')
    let allTimes = [];
    while (startTime < endTime) {
        if (startTime.valueOf() < moment().valueOf()){
            startTime.add(settings.interval, 'minutes');
            continue
        }
                if (startTime.format("HH:mm") === "12:00"){
                    startTime.add(60, 'minutes');
                }
        const findbooking = await Booking.findOne({date: startTime.toLocaleString()}).then((res, err) => {
            return res;
        })

        if(!findbooking)
            allTimes.push({'date': startTime.toLocaleString()});

        //Add interval of 30 minutes
        startTime.add(settings.interval, 'minutes');
    }
    return allTimes
}
function arraysToJson(dates){
    let arr = []
    for (let i = 0; i < dates.length; i++){
        if (dates[i].valueOf() < moment().valueOf()){
            continue
        }
        let jsonDates = {
            "date": dates[i][0].date,
            "slots": dates[i]
        }
        arr.push(jsonDates)
    }
    return arr
}

module.exports = {getClinicByClinicId: getClinicByClinicId, processTimeslots: processTimeslots, arraysToJson: arraysToJson}