//pseudocode 

//locations
let locations = ["planet1", "planet2", "planet3"];
let eventName = {
  [
    {

    },

  ],
} 

//constructs the event.
class events {
  constructor(randEvent,randResources){
    this.nameOfEvent = randEvent,
    this.effectResources = randResources
  }
  gameText(){
    if (this.nameOfEvent === "event1"){
      console.log('This is the game text for this event')
    } else if (this.nameOfEvent === "event2" ){
      console.log('This is the game text for this event')

    }
  }
}