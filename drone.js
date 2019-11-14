class Drone {
  constructor() {
    this.coords = [0, 0];
    this.facing = 0;
  }

  navigate(directions) {
    // the individual turns and steps are seperated by spaces
    directions = directions.split(" ");

    for (let step of directions) this.move(step);

    return this.coords;
  }

  move(direction) {
    // first we turn
    if (direction[0] === "R") {
      this.facing += Math.PI * 0.5;
    } else {
      this.facing -= Math.PI * 0.5;
    }

    // then we calculate how many steps we take
    const numSteps = this.countSteps(direction);

    // now we update the coordinates by
    // doing some trigonometry with numsteps
    // and coords and facing.
  }

  countSteps(direction) {
    let numSteps = 0;

    // nb: we want to omit the first character as
    // that is the direction to turn in
    for (let i = 1; i < direction.length; i++) {
      if (direction[i] === "+") numSteps++;
      else numSteps--;
    }

    return numSteps;
  }
}

const main = () => {
  let drone = new Drone();

  // read input from filesystem
  // and convert to string
  // just hardcode for now
  let directions = "R+ L-- R+ R-- L++";

  const coords = drone.navigate(directions);
  console.log(coords);
};

main();
