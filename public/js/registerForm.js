/**
 * Name: Alex Oladele
 * Date: 1/17/17
 * Course CSE 270e
 * Assignment: //TODO
 */

// Waits until document has finished loading before using Jquery
$(document).ready(function () {
    // Initialize variables to be used in the doc
    var username = null,
        password = null,
        password2 = null,
        email = null,
        formObj = {};
    $($);;;;;;;;;;;;;;;;;;;;;;;;;;

    // ========================================================== Functions
    function isEmpty(str) {
        return (!str || 0 === str.length);
    }


    // ========================================================== End Functions


    // Assigns the values of username and password to their respectful variables when anything is typed in fields
    $("#username, #password, #password2, #email").keyup(function () {
        username = $("#username").val();
        password = $("#password").val();
        password2 = $("#password2").val();
        email = $("#email").val();

        // Just logging out the variables to make sure data is being entered correctly
        console.log("Username = " + username);
        console.log("Password = " + password);
        console.log("Password 2 = " + password2);
        console.log("Email = " + email);

        // Puts the data into an object for the post method and does a rudimentary sanitize
        formObj = {
            "username":  username.replace(/<.*?>/g, ''),
            "password":  password.replace(/<.*?>/g, ''),
            "password2": password2.replace(/<.*?>/g, ''),
            "email":     email.replace(/<.*?>/g, '')
        };

        console.log("form obj: ");
        console.log(formObj);
    });

    // Checks to see if the username field is already filled, if so, then puts focus on the password field
    if ($(".alert-danger").is(":visible")) {
        $("#password").focus();
    } else {
        $("#username").focus();
    }

    $("#loginBtn").click(function (event) {
        if (isEmpty(username) || isEmpty(password) || isEmpty(password2) || isEmpty(email)) {
            alert("One of the required fields is not filled out!");
            event.preventDefault();
        }
    });

    $("#loginform").submit(function (event) {
        // When the form is submitted, prevent the default behavior, and instead make a post request
        event.preventDefault();

        // TODO Come back and fix this
        $.post("http://127.0.0.1:3620/registerform", formObj, function (data, status) {

            // If the status is ok, then print this out to console
            if (status === "ok") {
                console.log("Stats was okay!");
                console.log("Post request went through");
            }
        }, "json").error(function () {
            // If an error occurs, then prints this out to the console
            console.error("Could not submit post data!");
        });
    });

});