/**
 * Name: Alex Oladele
 * Date: 1/15/17
 * Course CSE 270e
 * Assignment: Timer v1.0
 */

// Waits until document is finished loading before any javascript occurs
$(document).ready(function () {

    // Used variables
    var timeToAdd = 0,
        curTime = 0,
        reset = 0,
        hours = [],
        timers = [], timer1 = {
            hrs:  0,
            min:  0,
            sec:  0,
            name: ""
        }, timer2 = {
            hrs:  0,
            min:  0,
            sec:  0,
            name: ""

        }, timer3 = {
            hrs:  0,
            min:  0,
            sec:  0,
            name: ""
        };

    // Loop to populate timers array
    for (var i = 0; i < 3; i++) {
        var newTimer = {timerName: "", doneTime: 0, state: 0};
        timers.push(newTimer)
    }

    // =============================================================== Start Functions
    /**
     *
     * @returns int - Time in seconds
     */
    function getNow() {
        var today = new Date(),
            h = twoDigits(today.getHours()),
            m = twoDigits(today.getMinutes()),
            s = twoDigits(today.getSeconds());
        // Converts Nums to seconds to do easier math and stuff
        return convertToSeconds(h, m, s)
    }

    /**
     *
     * @param secs - Number in seconds which you want to convert
     * @returns {{hour: Number, min: Number, sec: Number}} - Object
     */
    function convertFromSeconds(secs) {
        var a = secs / 3600;
        var hour = parseInt(a, 10);
        var b = a - hour;
        var minute = parseInt((b * 60), 10);
        var c = (b * 60) - minute;
        var sec = parseInt(Math.round(c * 60), 10);

        return {
            hrs: hour,
            min: minute,
            sec: sec
        }
    }

    /**
     *
     * @param num
     * @returns int
     */
    function twoDigits(num) {
        if (num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    }

    /**
     *
     * @param h - Hours
     * @param m - Minutes
     * @param s - seconds
     * @returns int - time in seconds format
     */
    function convertToSeconds(h, m, s) {
        return (h * 3600) + (m * 60) + +s;
    }

    // Called every second to decrement display time
    /**
     * State: 0 = Not Running,  1 = Running,   2 = Paused,   3 = Done
     */
    function decrementTimers() {
        for (var i = timers.length - 1; i >= 0; i--) {
            var state = timers[i].state;
            var timeLeft = timers[i].doneTime - getNow();

            if (state == 1 && timeLeft < 0) {
                timers[i].state = 3;
                if (timeLeft <= -500) {
                    reset = 1;
                } else {
                    reset = 2;
                }
                updateTimerDisplay(i);
            } else if (timers[i].state == 1) {
                updateTimerDisplay(i);
            } else if (timers[i].state == 2) {
                timers[i].doneTime++;
            }
        }
        // To update visuals with page
        window.setTimeout(decrementTimers, 1000);
    }

    /**
     *
     * @param timerNum - the Timer whose display is going to be updated
     */
    function updateTimerDisplay(timerNum) {
        timeElement = "#timer" + (timerNum + 1);
        timeLeft = timers[timerNum].doneTime - getNow();
        var q = convertFromSeconds(timers[timerNum].doneTime);
        q.hrs = q.hrs % 12;
        $(timeElement + " .timerdonetime").html(twoDigits(q.hrs) + ":" + twoDigits(q.min) + ":" + twoDigits(q.sec));

        if (timeLeft >= 0) {
            hms = convertFromSeconds(timeLeft);
            $(timeElement + " .seconds").val(twoDigits(hms.sec));
            $(timeElement + " .minutes").val(twoDigits(hms.min));
            $(timeElement + " .hours").val(twoDigits(hms.hrs));
            reset = 0;
        } else {
            if (reset === 2) {
                $(timeElement).css("background-color", "#FF0000");
            }
            $(timeElement).find(".reset").text("DONE");
            $(timeElement + " .timername").val("");
        }
    }

    /**
     *
     * @param timer - Timer object who's values to update
     * @returns Object - Returns object with updates values
     */
    function updateTimerVal(timer, context) {
        timer.hrs = $(context).find(".hours").val();
        timer.min = $(context).find(".minutes").val();
        timer.sec = $(context).find(".seconds").val();
        timer.name = $(context).find(".timername").val();

        return timer
    }

    // Checks to see which timer you're in
    function isTimer1(context) {
        return $(context).closest(".timers").attr('id') === "timer1";
    }

    // Checks to see which timer you're in
    function isTimer2(context) {
        return $(context).closest(".timers").attr('id') === "timer2";
    }

    // Checks to see which timer you're in
    function isTimer3(context) {
        return $(context).closest(".timers").attr('id') === "timer3";
    }

    // Hides the reset and done button
    function deleteBtn(context) {
        var startBtn = $(context).siblings(".btn-js");
        startBtn.switchClass("btn-info", "btn-success").switchClass("btn-warning", "btn-success");
        startBtn.text("Start");
        $(context).hide();
    }

    // Removes Red background when done buttong clicked
    function switchToDoneBtn(context) {
        if ($(context).closest(".timers").css("background-color")) {
            $(context).closest(".timers").css("background-color", "");
        }
        deleteBtn(context);
    }

    // Updates the tiemr objects to reflect the form
    function updateTimerObj(context) {
        if ($(context).is(".hours")) {

            // Checks to make sure that values are valid for hours
            if ($(context).val() > 9 || $(context).val() < 0 || $(context).val() === undefined) {
                $(context).val("");
            }
        } else if ($(context).is(".minutes")) {

            // Checks to make sure that values are valid for minutes
            if ($(context).val() > 59 || $(context).val() < 0 || $(context).val() === undefined) {
                $(context).val("");
            }
        } else if ($(context).is(".seconds")) {

            // Checks to make sure that values are valid for seconds
            if ($(context).val() > 59 || $(context).val() < 0 || $(context).val() === undefined) {
                $(context).val("");
            }
        } else if ($(context).is(".timername")) {
            $(context).val().replace("<script>", "").replace("</script>", "");
        }

        // Updates the Timer objects with the values from the input
        if ($(context).closest(".timers").attr('id') === "timer1") {

            timer1 = updateTimerVal(timer1, $(context).closest(".timers"));
        } else if ($(context).closest(".timers").attr('id') === "timer2") {
            timer2 = updateTimerVal(timer2, $(context).closest(".timers"));
        } else if ($(context).closest(".timers").attr('id') === "timer3") {
            timer3 = updateTimerVal(timer3, $(context).closest(".timers"));
        } else {
            console.log("Didn't get nothing, try different selectors");
        }
    }

// =============================================================== End Functions

    /**
     * Timer Page logic - Not necessarily related to timer itself, but more-so the page
     */

// Disable scroll when focused on a number input.
    $('form-group').on('focus', 'input[type=number]', function (e) {
        $(this).on('wheel', function (e) {
            e.preventDefault();
        });
    });

// Checks that there are numbers being input into the number boxes NUM-CONTENT
    $("#timer1").find(".hours, .minutes, .seconds, .timername").keyup(function () {
        updateTimerObj($(this));
    });
    $("#timer2").find(".hours, .minutes, .seconds, .timername").keyup(function () {
        updateTimerObj($(this));
    });
    $("#timer3").find(".hours, .minutes, .seconds, .timername").keyup(function () {
        updateTimerObj($(this));
    });

    /**
     * TIMER CORE LOGIC
     */
// The processes that occur when start button clicked!
    $(".btn-js").click(function () {
        // Loophole var that tricks js into not displaying red on reset blick
        reset = 0;

        // Switch statement that changes the Buttons and colors when clicked
        switch ($(this).text()) {
            // Start button is clicked, then it changes the color and adds the reset button next to it
            case "Start":
                var tempTimer;
                // Calculates the Time to add onto the cur time depending on the timer
                if ($(this).closest(".timers").attr('id') === "timer1") {
                    timeToAdd = convertToSeconds(timer1.hrs, timer1.min, timer1.sec);
                    curTime = getNow();
                    tempTimer = timers[0];
                    tempTimer.timerName = $(this).closest(".timername").val();
                    tempTimer.doneTime = timeToAdd + curTime;
                    tempTimer.state = 1;
                    decrementTimers();

                } else if ($(this).closest(".timers").attr('id') === "timer2") {
                    timeToAdd = convertToSeconds(timer2.hrs, timer2.min, timer2.sec);
                    curTime = getNow();
                    tempTimer = timers[1];
                    tempTimer.timername = $(this).find(".timername").val();
                    tempTimer.doneTime = timeToAdd + curTime;
                    tempTimer.state = 1;
                    decrementTimers();

                } else if ($(this).closest(".timers").attr('id') === "timer3") {
                    timeToAdd = convertToSeconds(timer3.hrs, timer3.min, timer3.sec);
                    curTime = getNow();
                    tempTimer = timers[2];
                    tempTimer.timername = $(this).find(".timername").val();
                    tempTimer.doneTime = timeToAdd + curTime;
                    tempTimer.state = 1;
                    decrementTimers();

                } else {
                    console.log("Selector Wasn't found, try to experiment");
                }
                $(this).switchClass("btn-success", "btn-warning");
                $(this).text("Pause");
                $(".buttons").css("display", "inline-block");
                $("<button type=\"button\" class=\"btn btn-danger reset\">Reset</button>").insertAfter(this).addClass("btn-reset");
                break;
            //    If Pause button clicked, then changes color and text to Resume and starts timer
            case "Pause":
                $(this).text("Resume").switchClass("btn-warning", "btn-info");
                if (isTimer1($(this))) {
                    tempTimer = timers[0];
                    tempTimer.state = 2;
                } else if (isTimer2($(this))) {
                    tempTimer = timers[0];
                    tempTimer.state = 2;
                } else if (isTimer3($(this))) {
                    tempTimer = timers[0];
                    tempTimer.state = 2;
                }
                break;
            //    If Resume clicked, changes btn color and text to pause
            case "Resume":
                $(this).text("Pause").switchClass("btn-info", "btn-warning");
                if (isTimer1($(this))) {
                    tempTimer = timers[0];
                    tempTimer.state = 1;
                } else if (isTimer2($(this))) {
                    tempTimer = timers[0];
                    tempTimer.state = 1;
                } else if (isTimer3($(this))) {
                    tempTimer = timers[0];
                    tempTimer.state = 1;
                }
                break;
            //    Default case that should really never be gotten to
            default:
                console.log("Hit Default statement for some reason");
        }
        // Checks to make sure reset btn has been created
        if ($(".reset").length) {
            $(".reset").click(function () {
                switch ($(this).text()) {
                    // Reset button clears timers
                    case "Reset":
                        reset = 1;
                        if (isTimer1($(this))) {
                            timers[0].doneTime = 0;
                            $("#timer1").find(".hours, .minutes, .seconds").val("");
                            updateTimerDisplay(0);
                            deleteBtn($(this));
                        } else if (isTimer2($(this))) {
                            timers[1].doneTime = 0;
                            $("#timer2").find(".hours, .minutes, .seconds").val("");
                            updateTimerDisplay(0);
                            deleteBtn($(this));
                        } else if (isTimer3($(this))) {
                            timers[2].doneTime = 0;
                            $("#timer3").find(".hours, .minutes, .seconds").val("");
                            updateTimerDisplay(0);
                            deleteBtn($(this));
                        }
                        break;
                    //    Done clears red background and resets forms
                    case "DONE":
                        switchToDoneBtn($(this));
                        break;

                    default:
                        console.log("Shouldn't reach here!")
                }
            })
        }
    });
});
