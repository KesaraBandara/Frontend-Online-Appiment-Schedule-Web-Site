getAllConsultant()
getAllAppointments()
function getAllConsultant() {

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/consultant/getAllConsultants",
        async: true,
        success: function (data) {
            if (data.code === "00") {
                $('#conTable').empty();
                for (let Consultant of data.content) {
                    let conID = Consultant.id
                    let fName = Consultant.fName
                    let lName = Consultant.lName
                    let gender = Consultant.gender
                    let email = Consultant.email
                    let contactNumber = Consultant.contactNumber
                    let password = Consultant.password

                    var row = `<tr><td>${conID}</td><td>${fName}</td><td>${lName}</td><td>${gender}</td><td>${email}</td><td>${contactNumber}</td><td>${password}</td></tr>`;
                    $('#conTable').append(row);
                }
            }
        },
        error: function (xhr, exception) {
            alert("Error")
        }
    })
}

$(document).ready(function () {
    $(document).on('click', '#conTable tr', function () {
        var col0 = $(this).find('td:eq(0)').text();
        var col1 = $(this).find('td:eq(1)').text();
        var col2 = $(this).find('td:eq(2)').text();
        var col3 = $(this).find('td:eq(3)').text();
        var col4 = $(this).find('td:eq(4)').text();
        var col5 = $(this).find('td:eq(5)').text();
        var col6 = $(this).find('td:eq(6)').text();

        $('#input7').val(col0);
        $('#input1').val(col1);
        $('#input2').val(col2);
        $('#input3').val(col3);
        $('#input4').val(col4);
        $('#input5').val(col5);
        $('#input6').val(col6);
    })
})
function getAllAppointments() {

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/appointment/getAllAppointments",
        async: true,
        success: function (data) {
            if (data.code === "00") {
                $('#apTable').empty();
                for (let Appointment of data.content) {
                    let id = Appointment.id
                    console.log(id);
                    let time = Appointment.time
                    console.log(time);
                    let date = Appointment.date
                    console.log(date);
                    let day = Appointment.day
                    console.log(day);
                    let country = Appointment.country
                    console.log(country);
                    let jobType = Appointment.jobType
                    let user = Appointment.userDTO;
                    let userFName = user.fName; // Extract the fName from userDTO
                    console.log(userFName);

                    let consultant = Appointment.consultant;
                    let consultantFName = consultant.fName; // Extract the fName from consultant
                    console.log(consultantFName);


                    var row = `<tr><td>${id}</td><td>${time}</td><td>${date}</td><td>${day}</td><td>${country}</td><td>${jobType}</td><td>${userFName}</td><td>${consultantFName}</td></tr>`;
                    $('#apTable').append(row);
                }
            }
        },
        error: function (xhr, exception) {
            alert("Error")
        }
    })
}