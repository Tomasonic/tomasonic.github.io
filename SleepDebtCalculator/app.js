const getSleepHours = (day) => {
      if (day === "monday") {
            return 8;
      } else if (day === "tuesday") {
            return 7;
      } else if (day === "wednesday") {
            return 9;
      } else if (day === "thursday") {
            return 6;
      } else if (day === "friday") {
            return 7;
      } else if (day === "saturday") {
            return 10;
      } else if (day === "sunday") {
            return 10;
      } else {
            console.log("Day impossible");
      }
};

/* After we written a function above that get sleep hours for each day of the week , we need to do three more things. 
1. Get the total sleep hours that the user actually slept
2. Get the ideal sleep hours that the user prefers
3. Calculate the sleep debt, if any.
We need another function called getActualSleepHours */

const getActualSleepHours = () => {
      return (
            getSleepHours("monday") +
            getSleepHours("tuesday") +
            getSleepHours("wednesday") +
            getSleepHours("thursday") +
            getSleepHours("friday") +
            getSleepHours("saturday") +
            getSleepHours("sunday")
      );
};

const getIdealSleepHours = () => {
      let idealHours = 8;
      return idealHours * 7;
};

const calculateSleepDebt = () => {
      const actualSleepHours = getActualSleepHours();
      const idealSleepHours = getIdealSleepHours();

      if (actualSleepHours === idealSleepHours) {
            console.log("You've got the perfect amount of sleep");
      } else if (actualSleepHours > idealSleepHours) {
            console.log(
                  "You got " +
                        (actualSleepHours - idealSleepHours) +
                        " more sleep than needed."
            );
      } else if (actualSleepHours < idealSleepHours) {
            console.log(
                  "You should get more sleep, you only slept " +
                        (idealSleepHours - actualSleepHours) +
                        " hours less this week."
            );
      } else {
            console.log("Error! Something went wrong, check your code.");
      }
};

console.log(getSleepHours("monday"));
console.log(getActualSleepHours());

calculateSleepDebt();
