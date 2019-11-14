const fs = require("fs");

class Drone {
  constructor() {
    this.coords = [0, 0];
    this.facing = 0;
  }

  navigate(directions) {
    // the individual steps, e.g. "R+", are seperated by spaces
    directions = directions.split(" ");

    for (let step of directions) {
      this.move(step);
    }

    return this.coords;
  }

  move(direction) {
    // turn the drone
    this.turn(direction[0]);

    // calculate how many steps we take
    const numSteps = this.countSteps(direction);

    // some trigonometry to amend x and y coords
    if (direction[0] === "R" || direction[0] === "L") {
      this.coords[0] += numSteps * Math.round(Math.sin(this.facing));
      this.coords[1] += numSteps * Math.round(Math.cos(this.facing));
    }

    // translations in cardinal direction for complex case
    this.translate(direction[0], numSteps);
  }

  turn(direction) {
    if (direction === "R") {
      this.facing += Math.PI * 0.5;
    }
    if (direction === "L") {
      this.facing -= Math.PI * 0.5;
    }
  }

  translate(direction, numSteps) {
    // method for translation in complex case
    switch (direction) {
      case "N":
        this.coords[1] += numSteps;
        break;
      case "E":
        this.coords[0] += numSteps;
        break;
      case "S":
        this.coords[1] -= numSteps;
        break;
      case "W":
        this.coords[0] -= numSteps;
        break;
    }
  }

  countSteps(steps) {
    let numSteps = 0;

    for (let i = 1; i < steps.length; i++) {
      if (steps[i] === "+") {
        numSteps++;
      } else {
        numSteps--;
      }
    }
    return numSteps;
  }
}

function navigateDrone(directions) {
  let drone = new Drone();

  const coords = drone.navigate(directions);

  return coords;
}

function main() {
  const simpleDirections = fs
    .readFileSync("problem-basic-input.txt")
    .toString();
  const complexDirections = fs
    .readFileSync("problem-complex-input.txt")
    .toString();

  const simpleCoords = navigateDrone(simpleDirections);
  const complexCoords = navigateDrone(complexDirections);

  // log coordinates to console
  console.log(`Simple case: ${simpleCoords}`);
  console.log(`Complex case: ${complexCoords}`);
}

main();
