getAllJobs()
getAllCounties()
getAllScheduleByToken()
getAllAppointmentById()

let consultantID;

function getConsultantByToken(callback) {
    const token = localStorage.getItem("token");

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/consultant/getConsultantByToken/" + token,
        async: true,
        success: function (data) {
            if (data.code === "00") {
                localStorage.setItem("userId", data.content);

                // Call the callback function with the consultant ID
                callback(data.content);


            }
        },
        error: function (xhr, exception) {
            // alert("Error");
        }
    });
}


function addConsultant() {

    let fName = $('#input1').val();
    let lName = $('#input2').val();
    let gender = $('#input3').val();
    let email = $('#input4').val();
    let mNumber = $('#input5').val();
    let password = $('#input6').val();
    if (!fName || !lName || !gender || !email || !mNumber || !password) {
        alert("Please fill in all required fields.");
        return;
    }

    $.ajax({
        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/consultant/saveConsultant",
        async: true,
        data: JSON.stringify({
            // "id":"",
            // "id": "",
            "fName": fName,
            "lName": lName,
            "gender": gender,
            "email": email,
            "contactNumber": mNumber,
            "password": password,
        }),

        success: function (data) {
            if (data.code === '00') {
                getAllConsultant();
                clearTextField();
                alert("Added Consultant")
            } else if (data.code === '06') {
                alert("Already added")
            }
        },
        error: function (xhr, exception) {
            console.log(xhr);
            console.log(exception);
            alert("An error occurred");
        }
    })
}

// function getAllConsultant() {
//
//     $.ajax({
//         method: "GET",
//         url: "http://localhost:8080/api/v1/consultant/getAllConsultants",
//         async: true,
//         success: function (data) {
//             if (data.code === "00") {
//                 $('#conTable').empty();
//                 for (let Consultant of data.content) {
//                     let conID = Consultant.id
//                     let fName = Consultant.fName
//                     let lName = Consultant.lName
//                     let gender = Consultant.gender
//                     let email = Consultant.email
//                     let contactNumber = Consultant.contactNumber
//                     let password = Consultant.password
//
//                     var row = `<tr><td>${conID}</td><td>${fName}</td><td>${lName}</td><td>${gender}</td><td>${email}</td><td>${contactNumber}</td><td>${password}</td></tr>`;
//                     $('#conTable').append(row);
//                 }
//             }
//         },
//         error: function (xhr, exception) {
//             alert("Error")
//         }
//     })
// }

// function consultantLogin(event) {
function consultantLogin() {


    // event.preventDefault();

    let email = $('#email').val();
    let password = $('#password').val();

    // console.log("User ID:", id);
    // console.log("Password:", password);

    $.ajax({
        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/consultant/signIn",
        async: true,
        data: JSON.stringify({
            "email": email,
            "password": password
        }),
        success: function (data) {
            // console.log(data.message);

            // data.token = undefined;
            if (data.code === "00") {
                localStorage.setItem("token", data.token);

// Store the token in local storage
                window.location.href = "consultantSetScheduleDashBoard.html";


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

function logout() {
    $.ajax({
        method: "POST", // You can change this to "GET" if your server's logout endpoint is a GET request
        url: "http://localhost:8080/api/v1/consultant/logout", // Replace with the actual logout endpoint URL
        success: function (response) {
            // Handle a successful logout response from the server
            console.log(response);

            // Clear any local storage or session data (if needed)
            localStorage.clear();

            // Redirect the user to the login page or perform any other desired action
            window.location.href = "consultantSignIn.html"; // Replace with the login page URL
        },
        error: function (xhr, status, error) {
            // Handle any errors that occur during logout
            console.error(xhr, status, error);

            // Optionally, display an error message or take appropriate action
            alert("Logout failed. Please try again.");
        }
    });
}

function updateConsultant() {

    let id = $('#input7').val();
    let fName = $('#input1').val();
    let lName = $('#input2').val();
    let Gender = $('#input3').val();
    let email = $('#input4').val();
    let cNumber = $('#input5').val();
    let password = $('#input6').val();

    $.ajax({
        method: "PUT",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/consultant/updateConsultant",
        async: true,
        data: JSON.stringify({
            "id": id,
            "fName": fName,
            "lName": lName,
            "gender": Gender,
            "email": email,
            "contactNumber": cNumber,
            "password": password,

        }),
        success: function (data) {
            alert("Updated")
            getAllConsultant()
            clearTextField();
        },
        error: function (xhr, exception) {
            alert("error")
        }
    })
}

function deleteConsultant() {
    let id = $('#input7').val();
    $.ajax({
        method: "DELETE",
        url: "http://localhost:8080/api/v1/consultant/deleteConsultant/" + id,
        async: true,
        success: function (data) {
            alert("Deleted")

        },
        error: function (xhr, exception) {
            alert("Error")
        }
    })

}

function addJobs() {

    let jobType = $('#Jobs').val();

    $.ajax({

        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/jobType/saveJobType",
        async: true,
        data: JSON.stringify({
            // "id":"",
            "jobType": jobType,
        }),
        success: function (data) {
            if (data.code === '00') {
                alert("Added Jobs")
                getAllJobs()
            } else if (data.code === '06') {
                alert("Already added")
            }
        },
        error: function (xhr, exception) {
            console.log(xhr);
            console.log(exception);
            alert("An error occurred");
        }})}
// $(document).ready(function () {
//     $(document).on('click', '#conTable tr', function () {
//         var col0 = $(this).find('td:eq(0)').text();
//         var col1 = $(this).find('td:eq(1)').text();
//         var col2 = $(this).find('td:eq(2)').text();
//         var col3 = $(this).find('td:eq(3)').text();
//         var col4 = $(this).find('td:eq(4)').text();
//         var col5 = $(this).find('td:eq(5)').text();
//         var col6 = $(this).find('td:eq(6)').text();
//
//         $('#input7').val(col0);
//         $('#input1').val(col1);
//         $('#input2').val(col2);
//         $('#input3').val(col3);
//         $('#input4').val(col4);
//         $('#input5').val(col5);
//         $('#input6').val(col6);
//     })
// })

function clearTextField() {

    $('#input1').val('');
    $('#input2').val('');
    $('#input3').val('');
    $('#input4').val('');
    $('#input5').val('');
    $('#input6').val('');
    $('#input7').val('');
    $('#userId').val('');
    $('#password').val('');

}

function addCountry() {

    let country = $('#countries').val();


    $.ajax({

        method: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/country/saveCountry",
        async: true,
        data: JSON.stringify({

            "country": country,
        }),
        success: function (data) {
            if (data.code === '00') {
                getAllConsultant();
                clearTextField();
                alert("Added country")
            } else if (data.code === '06') {
                alert("Already added")
            }
        },
        error: function (xhr, exception) {
            console.log(xhr);
            console.log(exception);
            alert("An error occurred");
        }
    })
}


function getAllJobs() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/jobType/getAllJobs",
        async: true,
        success: function (data) {
            if (data.code === "00") {
                var jobData = data.content;
                var dropdown = $('#SelectJob');

                dropdown.empty();

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

function getAllCounties() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/country/getAllCountries",
        async: true,
        success: function (data) {
            if (data.code === "00") {
                var countryData = data.content;
                // console.log("Received data:", countryData);
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
function setSchedule() {
    // Call the getConsultantByToken function to retrieve the consultant ID
    getConsultantByToken(function(consultantID) {
        console.log(consultantID);

        let country = $('#SelectCountry').val();
        let job = $('#SelectJob').val();
        let day = $('#day').val();
        let time = $('#timeDropdown').val();

        // Use the consultantId variable obtained from getConsultantByToken
        $.ajax({
            method: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/api/v1/schedule/saveSchedule",
            async: true,
            data: JSON.stringify({
                "country": country,
                "time": time,
                "day": day,
                "jobType": job,
                "consultant": {
                    "id": consultantID
                }
            }),
            success: function (data) {
                if (data.code === '00') {
                    alert("Added Schedule")
                    getAllTimes()
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

function getAllScheduleByToken() {
    // Call getConsultantByToken and provide a callback function
    getConsultantByToken(function (consultantID) {
        console.log(consultantID);

        // Use consultantID here
        $.ajax({
            method: "GET",
            url: "http://localhost:8080/api/v1/schedule/getAllScheduleById/" + consultantID,
            async: true,
            success: function (data) {
                if (data.code === "00") {
                    // Clear the scheduleContainer before appending new data
                    $('#scheduleContainer').empty();
                    for (let schedule of data.content) {
                        let id = schedule.scheduleId;
                        let country = schedule.country;
                        let jobType = schedule.day;
                        let day = schedule.jobType;
                        let time = schedule.time;

                        console.log("hhhh"+country)
                        console.log("hhhh"+id)



                        var set = `<div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title" id="country">${country}</h5>
                                <h5 class="card-title" id="jobType">${jobType}</h5>
                                <h5 class="card-title" id="day">${day}</h5>
                                <h5 class="card-title" id="time">${time}</h5>
                                <div class="col-md-6">
                                    <!-- Two horizontal buttons (red and gray) -->
                                    <button class="btn btn-danger mr-2 mb-4" onclick="deleteSchedule('${id}')">DELETE</button>
                                    <button class="btn btn-secondary" onclick="updateSchedule()">UPDATE</button>
                                </div>
                            </div>
                        </div>`;
                        $('#scheduleContainer').append(set);
                    }
                }
            },
            error: function (xhr, exception) {
                alert("Error");
            }
        });
    });
}

function deleteSchedule(id) {
    $.ajax({
        method: "DELETE",
        url: "http://localhost:8080/api/v1/schedule/deleteSchedule/" + id,
        async: true,
        success: function (data) {
            if (data.code === "00") {
                alert("Deleted successfully");
                // Optionally, update the UI to remove the deleted schedule
            } else {
                alert("Deletion failed: " + data.message);
            }
        },
        error: function (xhr, exception) {
            alert("Error occurred during deletion: " + xhr.statusText);
        }
    });
}


function updateSchedule() {


    let id = $('#input7').val();
    let fName = $('#input1').val();
    let lName = $('#input2').val();
    let Gender = $('#input3').val();
    let email = $('#input4').val();
    let cNumber = $('#input5').val();
    let password = $('#input6').val();

    $.ajax({
        method: "PUT",
        contentType: "application/json",
        url: "http://localhost:8080/api/v1/schedule/updateSchedule",
        async: true,
        data: JSON.stringify({
            "id": id,
            "fName": fName,
            "lName": lName,
            "gender": Gender,
            "email": email,
            "contactNumber": cNumber,
            "password": password,

        }),
        success: function (data) {
            alert("Updated")
            getAllConsultant()
            clearTextField();
        },
        error: function (xhr, exception) {
            alert("error")
        }
    })
}

function getAllAppointmentById() {
    const user = localStorage.getItem("userId");

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/appointment/getAllAppointmentById/" + user,
        async: true,
        success: function (data) {
            if (data.code === "00") {
                $('#appointmentTable').empty();
                for (let appointment of data.content) {
                    let appID = appointment.id;
                    let time = appointment.time;
                    let date = appointment.date;
                    let day = appointment.day;
                    let country = appointment.country;
                    let jobType = appointment.jobType;
                    // Assuming 'password' should be 'userDTO'
                    let userDTO = appointment.userDTO;


                    var row2 = `<tr><td>${appID}</td><td>${time}</td><td>${date}</td><td>${day}<td>${country}</td><td>${jobType}</td><td>${userDTO}</td><td> 
                        <button class="btn btn-success" id="confirmButton" onclick="confirmAppointment('${appID}')">CONFIRM</button>
                        <button class="btn btn-danger" id="cancelButton" onclick="deleteAppointment('${appID}')">DELETE</button></td></tr>`;
                    $('#appointmentTable').append(row2);
                    // <button className="btn btn-primary" id="confirmButton">Confirm Appointment</button>
                    // <button className="btn btn-danger" id="cancelButton">Cancel Appointment</button>
                    // onclick="deleteProduct('${ID}')"
                }
            }
        },
        error: function (xhr, exception) {
            // alert("Error");
        }
    });
}

function confirmAppointment(appID){


    $.ajax( {
    method:"PUT",
    contentType:"application/json",
    url:"http://localhost:8080/api/v1/appointment/appointmentConfirmation/" + appID,
    async:true,
    data:JSON.stringify({
        "confirm": true,
        "nonConfirm": false
    }),
    success: function (data) {
        $('#confirmButton').empty();
        $('#cancelButton').empty();
        alert("Updated")

    },
    error: function (xhr, exception) {
        alert("error")
    }
})}
    function deleteAppointment(appID){

        $.ajax( {
        method:"PUT",
        contentType:"application/json",
        url:"http://localhost:8080/api/v1/appointment/appointmentConfirmation/" + appID,
        async:true,
        data:JSON.stringify({
            "confirm": false,
            "nonConfirm": true
        }),
        success: function (data) {
            alert("delete")

        },
        error: function (xhr, exception) {
            alert("error")
        }
    })}


    // $.ajax( {
    //     method:"PUT",
    //     contentType:"application/json",
    //     url:"http://localhost:8080/api/v1/appointment/appointmentConfirmation/" + apId,
    //     async:true,
    //     data:JSON.stringify({
    //         "confirm": true,
    //         "nonConfirm": false
    //     }),
    //     success: function (data) {
    //         alert("Updated")
    //         getAllEmployee();
    //         clearTextField();
    //     },
    //     error: function (xhr, exception) {
    //         alert("error")
    //     }
    // })


// function callAppointmentConfirmation(appointmentId, appointmentVerifyDTO) {
//     $.ajax({
//         method: "PUT",
//         contentType: "application/json",
//         url: `/api/v1/appointment/appointmentConfirmation/${appointmentId}`,
//         async: true,
//         data: JSON.stringify(appointmentVerifyDTO),
//         success: function (data) {
//             if (data.code === '00') {
//                 alert("Appointment confirmed successfully.");
//                 // Handle success as needed, e.g., update UI or redirect
//             } else if (data.code === '06') {
//                 alert("Appointment not found.");
//                 // Handle appointment not found
//             } else {
//                 alert("An error occurred.");
//                 // Handle other errors
//             }
//         },
//         error: function (xhr, exception) {
//             alert("An error occurred.");
//             // Handle AJAX error
//         }
//     });
// }
// // Assuming you have buttons with IDs "confirmButton" and "nonConfirmButton"
// document.getElementById("confirmButton").addEventListener("click", function () {
//     const appointmentId = 123; // Replace with the actual appointment ID
//     const appointmentVerifyDTO = {
//         confirm: true,
//         nonConfirm: false
//     };
//     callAppointmentConfirmation(appointmentId, appointmentVerifyDTO);
// });
//
// document.getElementById("nonConfirmButton").addEventListener("click", function () {
//     const appointmentId = 123; // Replace with the actual appointment ID
//     const appointmentVerifyDTO = {
//         confirm: false,
//         nonConfirm: true
//     };
//     callAppointmentConfirmation(appointmentId, appointmentVerifyDTO);
// });
//
