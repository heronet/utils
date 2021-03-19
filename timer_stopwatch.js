/// WARNING: Single line printing will not work on browsers

// Curly braces for browser compatibility
{
    console.clear();
    
    // Initial time values
    let secs = 60;
    let mins = 0;
    let hours = 0;

    // Progressbar Parameters
    let total_seconds;
    let hash_count = 0;
    let hash_delay;
    let counter = 0;

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

    // Printing method
    let currentMode = null;

    // Check if ran with Node.js. In which case window would be undefined
    if(typeof window === 'undefined') {
        // Check additional argument and use multiline printing if -m was provided
        currentMode = (process.argv[2] === '-m') ? printModes.multiLine : printModes.singleLine;
    } else {
        // The runtime is a browser
        currentMode = printModes.multiLine;
    }

    const progressBar = () => {
        ++counter;
        if(counter === hash_delay) {
            ++hash_count;
            counter = 0;
        }
        let bar = "[";
        for(let i = 1; i <= hash_count; ++i) {
            bar += '#';
        }
        for(let j = 0; j !== 10 - hash_count; ++j)
            bar += '.';
        bar += ']'
        return bar;
    }

    /// Our Time Calculator
    const timeCalculations = () => {
        // Exit when over
        if(hours === 0 && mins === 0 && secs <= 1)
            setTimeout(() => process.exit(), 1000);
        
        --secs;
        // Increase hour when we hit 60 minutes. Reset minutes afterwards.
        if(mins === 0) {
            if(hours >= 1) {
                --hours;
                mins = 60;
            }
        }
        // Increase minute when we hit 60 seconds. Reset seconds afterwards.
        if(secs === 0) {
            if(mins != 0 && hours != 0) {
                --mins;
                secs = 60;
            }
        }

        let bar = progressBar();
        let progress_completion = `${colors.underscore}${colors.fg.red}${hash_count * 10}%${colors.reset}`;

        // This will be our output
        const output = `${colors.fg.blue}Time Remaining =>${colors.reset} ${colors.fg.red}${hours}${colors.reset} ${colors.fg.blue}${colors.blink}:${colors.reset} ${colors.fg.red}${mins}${colors.reset} ${colors.fg.blue}${colors.blink}:${colors.reset} ${colors.fg.red}${secs}${colors.reset} ${colors.underscore}${colors.fg.blue}[HH:MM:SS]${colors.reset}${colors.fg.yellow} ${bar}${colors.reset} ${progress_completion}`;
        log(output, currentMode);
    }

    
    // Check if ran with Node.js. In which case window would be undefined
    if(typeof window === 'undefined') {
            const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(`Enter time in minute: `,  (time) => {
            mins = +time - 1;

            // Calculate progressbar params
            total_seconds = secs + mins * 60 + hours * 3600;
            hash_delay = total_seconds / 10;

            // Calculate time after every second
            setInterval(timeCalculations, 1000);
            readline.close();
        })
    } else { // Only runs in a browser
        // Set time by yourself.
        mins = 2 - 1;

        // Calculate progressbar params
        total_seconds = secs + mins * 60 + hours * 3600;
        hash_delay = total_seconds / 10;

        // Calculate time after every second
        setInterval(timeCalculations, 1000);
    }
    
}
