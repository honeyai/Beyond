//* -------------------------------------------------------------Functions

//Creates a random number for alien ship's properties that need a range
  //Returns a 0.n decimal if the range is between 0 and 1
  //Returns a floored integer if the range is beyond 0 and 1
  const randomizer = (min, max) => {
    //if my min and max are less than zero don't floor or ceil just return as is
    if (min < 1 && max < 1) {
      return (Math.random() * (max - min) + min).toFixed(1);
    } else {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }

//* -------------------------------------------------------------Ship Constructor Global Variables

//randomly generated range between 3 and 6
let alienHull = randomizer(3,6);
//randomly generated range between 2 n 4
let alienFP = randomizer(2,4)
//randomly generated range between .6 n .8
let alienACC = randomizer(0.6, 0.8)

//index to hold alien ship names
let index;

//next turn boolean. true for the alien ship to attack. false when the the round needs to ask if the player want's to still attack or retreat. Basically only when the alien ship is destroyed. Relevant lines: 176 and 178
let turnEnds;
//variable to hold the attacker's firepower
let damage;
//variable to hold the difference between the attacked's hull and attacker's firepower
let remainingHull;
//array used to restore the items of array alienShipNames at game restart
let deletedNames = ["The Pisdim", "The Lorin", "The Noro", "The Cabilval", "The Talgis", "The Nusti"];
//used to create unique alien names
let alienShipNames = ["The Pisdim", "The Lorin", "The Noro", "The Cabilval", "The Talgis", "The Nusti"];
//randomize the index of array alienShipName
let getAlienName = () => index = Math.floor(Math.random()*alienShipNames.length);

class Ship {
  constructor(name, hull, firepower, accuracy){ 
  this.name = name[0],
  this.hull = hull,
  this.firepower = firepower,
  this.accuracy = accuracy
}
  attack(attacked, attacker){
    console.log(`${attacker.name} attacks the ${attacked.name}!`)

    //create random number for attack between 0 and 1
    let hitChance = Math.random();   
    (hitChance).toFixed(1);

    if(hitChance < this.accuracy){                                                        
      console.log(`${attacker.name}'s attack misses!`)
      return turnEnds = true;
    } else {                                                                             
      damage = attacker.firepower;
      //if the damage is more or equal to the hull then alien ship is destroyed and a new one is made.
      if (damage >= attacked.hull){                                                       
        if(this.name === "USS Schwarzenegger"){                                           
          console.log(`${attacked.name} takes a hit, hull takes ${damage} damage.`)
          console.log(`${attacked.name}'s hull shatters!`)
          
          alienShipNames.splice(index,1); //removing the ship you just destroyed
          
          //once the length is less thana or equal to 0 stop generating ships
          if(alienShipNames.length <=0){                                                 
            console.log(`As ${attacked.name}'s hull is set ablaze, you speed through the wreckage. The alien fleet as been defeat!\nYou're heading home...`)
            gameEnd();
          } else {                                                                        
            console.log("The fleet deploys a new ship to attack you!")
            alienShip = new Ship(alienShipNames[getAlienName()], randomizer(3,6), randomizer(2,4), randomizer(0.6,0.8)) 
            // console.log(alienShip)
            console.log(`${alienShip.name} approaches.`)
            turnEnds = false;
          }
        } else if (this.name === alienShipNames[index]){
          console.log(`${attacked.name} takes a hit, hull takes ${damage} damage. \nThe ship's alarms begin to blare. The ship is going down! ${attacked.name} never makes it home. \nGame over.`)
          gameEnd();
        }
        turnEnds = false;
      } else {                                                                              
        if(this.name === "player"){                                             
          remainingHull = attacked.hull - damage;
          attacked.hull = remainingHull;
          console.log(`${attacked.name} takes a hit, hull takes ${damage} damage. \nBut it's still standing. You see it's lasers warming up, it fires!`);
          turnEnds = true; 
        } else if (this.name === alienShipNames[index]){                                    
          remainingHull = attacked.hull - damage;
          attacked.hull = remainingHull;
          console.log(`${attacked.name} takes a hit, hull takes ${damage} damage. \nYou're hull is at ${attacked.hull}`)
        }
      }
    }
  }
}

//*------------------------------------------------------------------Generating the Ships

const playerShip = new Ship("player", 20, 5, 0.7)

var alienShip = new Ship(["enemy",alienShipNames[getAlienName()]], alienHull, alienFP, alienACC) 

console.log(alienShip.name)

//*------------------------------------------------------------------Drawing the Stars

//Empty object that maintains the document elements
let gameDraw = {};
let dpi = window.devicePixelRatio;

const runOnLoad = () => {
  //CANVAS
  gameDraw.display = document.querySelector("#canvas");
  gameDraw.context = gameDraw.display.getContext("2d");

  //try to fix blurriness
  gameDraw.dpi = dpi;

  //DRAWING stars
  gameDraw.stars  = [];

  //drawing the rectangle
  let x = gameDraw.display.width/2.30,
      y = gameDraw.display.height/1.5,
      width = 100,
      height = 50;

  //When button is Clicked
  gameDraw.display.addEventListener('click', function(event){
    console.log(x, y, width, height)
    console.log(event.x, event.y, event.width, event.height)

    if (
      event.x > x &&
      event.x < x + width &&
      event.y > y &&
      event.y < y + height
    ) {
      console.log('Clicked!')
    }
  });

  // STARTS THE DRAW FUNCTION IMMEDIATELY ON LOAD
  alwaysDraw();

  // trying to reduce creation load
  popTheStars();
}

const createStars = (point, width, height, dx, dy) => {
  if (dx === undefined) {
    dx = 0;
  }
  if (dy === undefined) {
    dy = 0;
  }
  var star = {
    corner: point,
    width: width,
    height: height,
    dx: dx,
    dy: dy,
    move() {
      this.corner = translatePoint(this.corner, this.dx, this.dy);
    },
    starDraw() {
      gameDraw.context.beginPath();
      gameDraw.context.rect(this.corner.x, this.corner.y, this.width, this.height);
      gameDraw.context.strokeStyle = "#E8E4F0";
      gameDraw.context.stroke();
    }
  };
  return star;
}

const alwaysDraw = () => {
  blurryFix();
  // drawButton();
  let rndStarNum = (Math.random() * (5.5 - 2.5) + 2.5);
  let randomSpeed = (Math.random() * (4.5 - 1.5) + 1.5);
  gameDraw.context.clearRect(0, 0, gameDraw.display.width, gameDraw.display.height);
  gameDraw.stars.push(createStars(starStart(), 1, rndStarNum, 0, 1 + randomSpeed));
  // console.log(starStart()) //this is creating a ridiculous amount of 'stars' maybe i can pop the array so that after a certain amount of time they're junked

  for (i in gameDraw.stars) {
    gameDraw.stars[i].starDraw();
    gameDraw.stars[i].move();
  }
  //========Title of Game=======
  gameDraw.context.font = "15px Pixel";
  gameDraw.context.fillStyle = "#a09f98";
  gameDraw.context.textAlign = "center";
  gameDraw.context.fillText("FROM BEYOND", gameDraw.display.width/2, gameDraw.display.height/2);

  // //====Button===
  // let x = gameDraw.display.width/2.30,
  //     y = gameDraw.display.height/1.5,
  //     width = 100;
  //     height = 50;
  // gameDraw.context.fillStyle = 'red';
  // gameDraw.context.fillRect(x, y, width, height);

  //so that it's drawing it in every 20 milliseconds wile the game state is false
  setTimeout(alwaysDraw, 15);
}

//trying to junk the stars made
const popTheStars = () => {
  // while(gameDraw.stars.length < 100){
    for (i in gameDraw.stars) {
      gameDraw.stars.pop();
      // setTimeout(popTheStars, 8000)
    }
  // }
}

//creating a style object that returns the appropriate w & h
const blurryFix = () => {
  let style = {
    height() {
      //getComputedStyle gives an object of all css properties of element.
      //getPropertyValue is looking for the property of height and is gunna return it.
      // console.log(getComputedStyle(canvas).getPropertyValue('height'))
      return +getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
    },
    width() {
      return +getComputedStyle(canvas).getPropertyValue('width').slice(0,-2)
    }
  }
  //giving the clear image
  gameDraw.display.setAttribute('width', style.width() * dpi);
  gameDraw.display.setAttribute('height', style.height() * dpi);
}

//makes the corner point of each drawn thing
const makePoint = (x, y) => obj = {x:x, y:y};

//moves the corner point of each drawn thing
const translatePoint = (point, dx, dy) => makePoint(point.x + dx, point.y + dy);

//makes them start somewhere randomly at y = 0 and x = random.
const starStart = () => makePoint(Math.random() * gameDraw.display.width, 0);
