#! /usr/bin/env node
import inquirer from 'inquirer';
import { differenceInSeconds } from 'date-fns';
import chalk from 'chalk';
const res = await inquirer.prompt({
    type: "number",
    name: "userInput",
    message: chalk.yellowBright("Enter The Duration In Seconds"),
    validate: (input) => {
        if (isNaN(input)) {
            return chalk.red("Please enter a valid number of seconds");
        }
        else if (input > 60) {
            return chalk.red("Please enter seconds within the range of 1 to 60");
        }
        else {
            return true;
        }
    }
});
let input = res.userInput;
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date(); //timeDifference
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.magenta('Time is up!'));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(chalk.greenBright(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`));
    }, 1000);
}
startTime(input);
