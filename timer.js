// Initial time values
let secs = 0;
let mins = 0;
let hours = 0;

// Our colors
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    
    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m" // Scarlet
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m"
    }
}

// This function handles the printing job
const log = (string, mode) => {
    if(mode === printModes.singleLine) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(string);
    } else {
        console.log(string);
    }
}

// Printing modes
const printModes = {
    singleLine: 0,
    multiLine: 1
}

// Check additional argument and use multiline printing if -m was provided
const currentMode = (process.argv[2] === '-m') ? printModes.multiLine : printModes.singleLine;

setInterval(() => {
    ++secs;

    // Increase hour when we hit 60 minutes. Reset minutes afterwards.
    if(mins === 60) {
        ++hours;
        mins = 0;
    }
    // Increase minute when we hit 60 seconds. Reset seconds afterwards.
    if(secs === 60) {
        ++mins;
        secs = 0;
    }

    // This will be our output

    const output = `${colors.fg.blue}Working For =>${colors.reset} ${colors.fg.red}${hours}${colors.reset} ${colors.fg.blue}${colors.blink}:${colors.reset} ${colors.fg.red}${mins}${colors.reset} ${colors.fg.blue}${colors.blink}:${colors.reset} ${colors.fg.red}${secs}${colors.reset} ${colors.underscore}${colors.fg.blue}[HH:MM:SS]${colors.reset}`;
    log(output, currentMode);

}, 1000);
