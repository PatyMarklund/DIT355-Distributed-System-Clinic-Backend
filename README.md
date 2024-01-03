# DIT355 - Distributed Systems - Clinic Backend Repository

 
 
## Description
The component Clinic Backend is a core part of DENS CURA, which is a distributed system with five parts. It is responsible for everything related to the dentist clinics, for example, publishing available time slots and their information. For a more detailed view of the DENS CURA system, please view the [Main Repository](https://github.com/PatyMarklund/DIT355-Distributed-System-Main). 

***  

## Component responsibilities

* Generate and publish timeslots for the frontent calendar, this includes:
    * Exclude booked times based on data sent from Booking Backend
    * Exclude lunch times
    * Exclude fika breaks
    * Generate 7 days from today excluding weekends
    * Exclude timesslots too late to book on the current days
* Publish clinic information for the frontent map
* Generate clinic entries in the database based on a JSON input



*** 

 
 

## Installing and running 

### Prerequisits:


**Node** 

* The following versions were used by our team during development, newer versions might also work: Windows v16.17.0 - Linux v12.22.9 - MacOS 14.20.0 - [Download](https://nodejs.org/en/download/) 


*** 
### Instructions:

| Step: | Instruction: |
| ------ | ------ |
| Clone this project on your machine | `git clone < SSH address or HTTPS address >` |
| Install necessary dependencies  | `npm i` |
| Start the system from the repo by running the following  | `npm start` |
 
 Make sure to also start the other systems since they are dependant on each other to work properly.
 

#
