$(document).ready(function () {

    console.log("linked")

    var state = "";
    var city = "";

    $("select").change(function () {
        console.log("selected");
        state = $("select option:selected").text();
        console.log(state);
    });

    $("#search").on("click", function () {
        event.preventDefault();
        var city = "charlotte"//$("#city-input");
        var state = "north_carolina"//$("#state-input");



        var city = "charlotte"//$("#city-input");
        var state = "north_carolina"//$("#state-input");
        $("#results").show();

        city = $("#city-input");
        //state =$("#state-input");
        console.log($("#state-input").attr("selected"))
        var queryurl = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&by_state=" + state;

        $.ajax({
            url: queryurl,
            method: "GET"
        })

            .then(function (response) {
                var results = response;
                var longAnswer = [];
                var latAnswer = [];

                for (var i = 0; i < results.length; i++) {
                    // retrieve first lat/lon and push into array
                    if (results[i].longitude === null || results[i].longitude === "") {
                        i++
                    } else {
                        longAnswer.push(results[0].longitude);
                        latAnswer.push(results[0].latitude);
                        var queryurl = "https://api.tomtom.com/search/2/categorySearch/company,brewery.json?key=Ab4s6zW0kUp03AlC2DusRDhwK6rkp5Ap&lat=" + latAnswer + "&lon=" + longAnswer + "&radius=13094"
                        $.ajax({
                            url: queryurl,
                            method: "GET"
                        })
                            .then(function (response) {

                            })
                    }



                }



                //console.log(results[i].longitude)
                console.log("long answer" + longAnswer[0])
                console.log("lat answer" + latAnswer[0])

            })

    });

    $("#getLocation").on("click", function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
        }
    })

    function showPosition(position) {
        var latCoord = position.coords.latitude;
        var longCoord = position.coords.longitude;
        console.log(latCoord);
        console.log(longCoord);

        var queryurl = "https://api.tomtom.com/search/2/categorySearch/company,brewery.json?key=Ab4s6zW0kUp03AlC2DusRDhwK6rkp5Ap&lat=" + latCoord + "&lon=" + longCoord + "&radius=13094"
        $.ajax({
            url: queryurl,
            method: "GET"
        })
            .then(function (response) {

            })
        console.log(response)
    }




})
