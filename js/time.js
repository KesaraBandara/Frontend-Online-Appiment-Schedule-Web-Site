
getAllTimes()

function addTimePeriod(){


    let timePeriod = $('#exampleFormControlInput1').val();


    $.ajax( {

        method:"POST",
        contentType:"application/json",
        url:"http://localhost:8080/api/v1/time/saveTime",
        async:true,
        data:JSON.stringify({
            // "id":"",
            "time":timePeriod,
        }),
        success: function (data) {
            if (data.code === '00'){
                alert("Added time")
                getAllTimes()
            }else if (data.code === '06'){
                alert("Already added")
            }
        },


        error: function(xhr, exception) {
            console.log(xhr);
            console.log(exception);
            alert("An error occurred");
        }

    })
}

// function getAllTimes() {
//     $.ajax({
//         method:"GET",
//         url:"http://localhost:8080/api/v1/time/getAllTimes",
//         async:true,
//         success: function (data) {
//             if (data.code==="00"){
//                 $('#timePeriod').empty();
//                 localStorage.setItem('timeData', JSON.stringify(data.content));
//                 // Retrieve the stored data from localStorage
// // Retrieve the stored data from localStorage
//                 var storedData = localStorage.getItem('timeData');
//
//                 if (storedData) {
//                     var timeData = JSON.parse(storedData);
//
// // Get a reference to the dropdown
//                     var dropdown = document.getElementById('timeDropdown');
//
// // Add an empty option as the default
//                     var emptyOption = document.createElement('option');
//                     emptyOption.value = "";
//                     // emptyOption.text = "-- Select Time --"; // or any other text you prefer
//                     // dropdown.innerHTML = "";
//                     // dropdown.appendChild(emptyOption);
//
//
//                     // Loop through the data and populate the dropdown
//                     for (let time of timeData) {
//                         var option = document.createElement('option');
//                         option.value = time.id;
//                         option.text = time.time;
//                         // dropdown.appendChild(option);
//                     }
//                 }
//
//                 for (let time of data.content){
//
//                     let timeId= time.id
//                     let timePeriod= time.time
//
//              var set = `<div class="card" style="width: 18rem;">
//
//                <a onclick="" href="" class="btn btn-primary"> ${timePeriod}</a>
//               </div>`
//           $('#timePeriod').append(set);
//
//
//                 }
//             }
//         },
//         error: function (xhr, exception) {
//             alert("Error")
//         }
//     })
//
// }

function getAllTimes() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/time/getAllTimes",
        async: true,
        success: function (data) {
            if (data.code === "00") {
                $('#timePeriod').empty();


                for (let time of data.content) {
                    let timeId = time.id;
                    let timePeriod = time.time;
                    var set = `<div class="card" style="width: 18rem;">
                       <a onclick="handleTimeClick(${timeId})" href="#" class="btn btn-primary">${timePeriod}</a>
                    </div>`;
                    $('#timePeriod').append(set);
                }

                localStorage.setItem('timeData', JSON.stringify(data.content));

                var storedData = localStorage.getItem('timeData');


                if (storedData) {
                    var timeData = JSON.parse(storedData);
                    var dropdown = document.getElementById('timeDropdown');

                    // Clear existing options
                    dropdown.options.length = 0;

                    // Add an empty option as the default
                    var emptyOption = new Option("-- Select Time --", "");
                    dropdown.appendChild(emptyOption);

                    // Loop through the data and populate the dropdown
                    for (let time of timeData) {
                        var option = new Option(time.time, time.time);
                        dropdown.appendChild(option);
                    }
                }


                // for (let time of data.content) {
                //     let timeId = time.id;
                //     let timePeriod = time.time;
                //     var set = `<div class="card" style="width: 18rem;">
                //        <a onclick="handleTimeClick(${timeId})" href="#" class="btn btn-primary">${timePeriod}</a>
                //     </div>`;
                //     $('#timePeriod').append(set);
                // }
            }
        },
        error: function (xhr, exception) {
            alert("Error");
        }
    });
}

// function handleTimeClick(timeId) {
//     // Handle the click event for the time link with the given timeId
//     // You can implement the behavior you want when a time link is clicked
//     // For example, you can display more details about the selected time.
// }


