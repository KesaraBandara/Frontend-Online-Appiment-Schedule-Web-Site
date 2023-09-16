getAllCounties()
getAllJobs()

let userID;


function getUserByToken(callback) {
    const token = localStorage.getItem("tokenUser");

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/user/getUserByToken/" + token,
        async: true,
        success: function (data) {
            if (data.code === "00") {
                // Call the callback function with the consultant ID
                callback(data.content);
            }
        },
        error: function (xhr, exception) {
            alert("Error");
        }
    });
}

// function registerUser() {
//
//     let fName = $('#input1').val();
//     let lName = $('#input2').val();
//     let gender = $('#input3').val();
//     let email = $('#input4').val();
//     let mNumber = $('#input5').val();
//     let password = $('#input6').val();
//     let cPassword = $('#input8').val();
//
//
//     if (password === cPassword) {
//         // Passwords match
//         console.log("Passwords match.");
//
//
//         $.ajax({
//             method: "POST",
//             contentType: "application/json",
//             url: "http://localhost:8080/api/v1/user/signUpUser",
//             async: true,
//             data: JSON.stringify({
//                 // "id":"",
//                 // "id": "",
//                 "fName": fName,
//                 "lName": lName,
//                 "gender": gender,
//                 "email": email,
//                 "contactNumber": mNumber,
//                 "password": password,
//             }),
//
//             success: function (data) {
//                 if (data.code === '00') {
//
//                     // clearTextField();
//                     alert("Added")
//                     window.location.href = "userSignIn.html";
//                 } else if (data.code === '06') {
//                     alert("Already added")
//                 }
//             },
//             error: function (xhr, exception) {
//                 console.log(xhr);
//                 console.log(exception);
//                 alert("An error occurred");
//             }
//         })
//     } else {
//         // Passwords do not match
//         // console.log("Passwords do not match.");
//         alert("Passwords do not match.")
//
//     }
//
// }

function registerUser() {
    // Get input values
    let fName = $('#input1').val();
    let lName = $('#input2').val();
    let gender = $('#input3').val();
    let email = $('#input4').val();
    let mNumber = $('#input5').val();
    let password = $('#input6').val();
    let cPassword = $('#input8').val();

    // Check if all fields are filled
    if (!fName || !lName || !gender || !email || !mNumber || !password || !cPassword) {
        alert("Please fill in all required fields.");
        return;
    }

    // Check if the password and confirm password match
    if (password !== cPassword) {
        alert("Passwords do not match.");
        return;
    }

    // All input fields are filled correctly, proceed with registration
    $.ajax({
        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/user/signUpUser",
        async: true,
        data: JSON.stringify({
            "fName": fName,
            "lName": lName,
            "gender": gender,
            "email": email,
            "contactNumber": mNumber,
            "password": password,
        }),

        success: function (data) {
            if (data.code === '00') {
                alert("Registration successful.");
                window.location.href = "userSignIn.html";
            } else if (data.code === '06') {
                alert("User already registered.");
            }
        },
        error: function (xhr, exception) {
            console.log(xhr);
            console.log(exception);
            alert("An error occurred during registration.");
        }
    });
}


function userSignIn() {


    // event.preventDefault();

    let email = $('#email').val();
    let password = $('#password').val();

    // console.log("User ID:", id);
    // console.log("Password:", password);

    $.ajax({
        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/user/signIn",
        async: true,
        data: JSON.stringify({
            "email": email,
            "password": password
        }),
        success: function (data) {

            if (data.code === "00") {

                localStorage.setItem("tokenUser", data.userToken);
                window.location.href = "userAppoinmentDashboard.html";

            } else {
                alert("Invalid credentials");
            }
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
            alert("An error occurred");
        }
    });
}

function getAllScheduleByCountryAndJobType() {
    let country = $('#SelectCountry').val();
    let job = $('#SelectJob').val();

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/schedule/getAllScheduleByCountryAndJobType/" + country + "/" + job,
        async: true,
        success: function (data) {
            if (data.code === "00") {
                for (let schedule of data.content) {

                    let id = schedule.id;
                    let country = schedule.country;
                    let jobType = schedule.jobType;
                    let day = schedule.day;
                    let time = schedule.time;
                    let consultant = schedule.consultantId;
                    console.log(consultant)

                    console.log("hhhh"+country)

                    var set = `<div class="card" style="width: 18rem;">

                            <div class="card-body">
                                <h5 class="card-title" id="country1">${country}</h5>
                                <h5 class="card-title" id="jobType1">${jobType}</h5>
                                <h5 class="card-title" id="day1">${day}</h5>
                                <h5 class="card-title" id="time1">${time}</h5>
                                <h5 class="card-title" id="consultant1">${consultant}</h5>

                                <div class="col-md-8 mt-5">
                                    <label for="countries">Enter Your date according to the above day</label>
                                    <input type="text" class="form-control" id="date1" placeholder="MM/DD">
                                </div>                                 
                                </div>

                    <div class="col-md-6">
                        <!-- Two horizontal buttons (red and gray) -->
                        <button class="btn btn-secondary" onclick ="saveAppointment()">Apply Appointment</button>
                    </div>
                            </div>
                        </div>`;

                    $('#scheduleContainer').append(set);
                }}},
        error: function (xhr, exception) {
            alert("Error");
        }
    });
}
// function getAllScheduleByCountryAndJobType() {
//     let country = $('#SelectCountry').val();
//     let job = $('#SelectJob').val();
//
//     $.ajax({
//         method: "GET",
//         url: "http://localhost:8080/api/v1/schedule/getAllScheduleByCountryAndJobType/" + country + "/" + job,
//         async: true,
//         success: function (data) {
//             if (data.code === "00") {
//                 for (let schedule of data.content) {
//                     let id = schedule.id;
//                     let country = schedule.country;
//                     let jobType = schedule.jobType;
//                     let day = schedule.day;
//                     let time = schedule.time;
//
//                     var set = `<div class="card" style="width: 18rem;">
//             <div class="card-body">
//               <h5 class="card-title" id="country">${country}</h5>
//               <h5 class="card-title" id="jobType">${jobType}</h5>
//               <h5 class="card-title" id="day">${day}</h5>
//               <h5 class="card-title" id="time">${time}</h5>
//               <button class="" onclick="window.location.href='calender.html'">Select date</button>
//               <h5 class="card-title" id="date"></h5>
//               <div class="card-body" id="dat">
//                 Selected Date: <span id="selectedDate"></span>
//               </div>
//               <div class="col-md-6">
//                 <!-- Two horizontal buttons (red and gray) -->
//                 <button class="btn btn-secondary" onclick="saveAppointment()">Apply Appointment</button>
//               </div>
//             </div>
//           </div>`;
//
//                     $('#scheduleContainer').append(set);
//                 }
//
//                 // Insert the JavaScript code here to update the selected date
//                 const urlParams = new URLSearchParams(window.location.search);
//                 const selectedDate = urlParams.get("date");
//                 const dateElement = document.getElementById("selectedDate");
//                 dateElement.innerText = selectedDate;
//             }
//         },
//         error: function (xhr, exception) {
//             alert("Error");
//         }
//     });
// }

function getAllCounties() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/country/getAllCountries",
        async: true,
        success: function (data) {
            if (data.code === "00") {
                var countryData = data.content;
                console.log("Received data:", countryData);
                var dropdown = $('#SelectCountry');

                // Clear existing options
                dropdown.empty();

                // Add an empty option as the default
                dropdown.append($('<option>', {
                    value: "",
                    text: "-- Select country  --"
                }));

                // Loop through the data and populate the dropdown
                for (let country of countryData) {
                    dropdown.append($('<option>', {
                        value: country.country,
                        text: country.country // Corrected property name
                    }));
                }
            }
        },
        error: function (xhr, exception) {
            alert("Error");
        }
    });
}
function getAllJobs() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/jobType/getAllJobs",
        async: true,
        success: function (data) {
            if (data.code === "00") {
                var jobData = data.content;
                console.log("Received data:", jobData);
                var dropdown = $('#SelectJob');

                // Clear existing options
                dropdown.empty();

                // Add an empty option as the default
                dropdown.append($('<option>', {
                    value: "",
                    text: "-- Select job type --"
                }));

                // Loop through the data and populate the dropdown
                for (let job of jobData) {
                    dropdown.append($('<option>', {
                        value: job.jobType,
                        text: job.jobType // Corrected property name
                    }));
                }
            }
        },
        error: function (xhr, exception) {
            alert("Error");
        }
    });
}

function saveAppointment() {
    // Call the getConsultantByToken function to retrieve the consultant ID
    getUserByToken(function(userID) {
        console.log(userID);

        let country = $('#country1').text();
        let job = $('#jobType1').text();
        let day = $('#day1').text();
        let time = $('#time1').text();
        let date = $('#date1').val();
        let consultant = $('#consultant1').text();


        // <div className="card-body">
        //     <h5 className="card-title" id="country1">${country}</h5>
        //     <h5 className="card-title" id="jobType1">${jobType}</h5>
        //     <h5 className="card-title" id="day1">${day}</h5>
        //     <h5 className="card-title" id="time1">${time}</h5>
        //     <h5 className="card-title" id="consultant1">${consultant}</h5>
        //
        //     <div className="col-md-8 mt-5">
        //         <label htmlFor="countries">Enter Your date according to the above day</label>
        //         <input type="text" className="form-control" id="date1" placeholder="MM/DD">
        //     </div>
        // </div>


    console.log("id"+userID);
        console.log("coun"+country);
        console.log("job"+job);
        console.log("time"+time);
        console.log("date"+date);
        console.log("day"+day);
        console.log("consultant"+consultant);





        // Use the consultantId variable obtained from getConsultantByToken
        $.ajax({
            method: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/api/v1/appointment/saveAppointment",
            async: true,
            data: JSON.stringify({
                "id": "",
                // "userId": "1",
                "time": time,
                "date": date,
                "day": day,
                "country": country,
                "jobType": job,
                "userDTO": {
                    "id": userID
                },
                "consultant": {
                    "id": consultant
                }
            }),
            success: function (data) {
                if (data.code === '00') {
                    alert("Added Appointment")

                } else if (data.code === '06') {
                    alert("Already added")
                }
            },
            error: function (xhr, exception) {
                alert("Error");
            }
        });
    });
}
function logout() {
    $.ajax({
        method: "POST", // You can change this to "GET" if your server's logout endpoint is a GET request
        url: "http://localhost:8080/api/v1/user/logout", // Replace with the actual logout endpoint URL
        success: function (response) {
            // Handle a successful logout response from the server
            console.log(response);

            // Clear any local storage or session data (if needed)
            localStorage.clear();

            // Redirect the user to the login page or perform any other desired action
            window.location.href = "userSignIn.html"; // Replace with the login page URL
        },
        error: function (xhr, status, error) {
            // Handle any errors that occur during logout
            console.error(xhr, status, error);

            // Optionally, display an error message or take appropriate action
            alert("Logout failed. Please try again.");
        }
    });
}