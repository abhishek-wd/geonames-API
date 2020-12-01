$("#btnOne").click(function (){
    $.ajax({
        url: "libs/php/getWeatherDetail.php",
        type: "POST",
        dataType: "json",
        
        data: {
            airport: $("#airportIcao").val(),
        },

        success: function(result){

            $("#lbl").html("Weather Details for - \"" + $('#airportIcao option:selected').text() + "\"");

            console.log(result);

            if(result.status.name == "ok") {
                $("#firstRow").html("Station Name:");
                $("#firstData").html(result["data"]["stationName"]);
                $("#secondRow").html("Temperature:");
                $("#secondData").html(result["data"]["temperature"] + " \xB0C");
                $("#thirdRow").html("Humidity:");
                $("#thirdData").html(result["data"]["humidity"] + "%");
                $("#forthRow").html("Wind Speed:");
                $("#forthData").html(result["data"]["windSpeed"] + " mph");
                $("#fifthRow").html("Wind Direction:");
                $("#fifthData").html(result["data"]["windDirection"] + " Degree" );
                $("#sixthRow").html("Clouds:");
                $("#sixthData").html(result["data"]["clouds"]);
            }
        },

        error: function (){
            $("#resultSection").html("Something Went Wrong!<br>Please Refresh and Try Again.").addClass("alert alert-danger");
        },

    });    
});

$("#btnTwo").click(function (){
    $.ajax({
        url: "libs/php/getNeighbours.php",
        type: "POST",
        dataType: "json",
        
        data: {
            country: $('#selCountry').val(),
        },

        success: function(result){
            
            $("#lbl").html("Neighbouring Countries of - \"" + $('#selCountry option:selected').text() + "\"");

            console.log(result);

            if(result.status.name == "ok") {
                $("#firstRow").html("Country:");
                $("#firstData").html(result["data"][0]["name"]);
                $("#secondRow").html("Summary:");
                if(result["data"][0]["summary"]){
                    $("#secondData").html(result["data"][0]["summary"]);
                } else
                {
                    $("#secondData").html("Summary Not Available.");
                }
                $("#thirdRow").html("Wiki URL:");
                $("#thirdData").html(result["data"][0]["wikipediaUrl"]);
                
                result.forEach(element => {
                    $("#thirdRow").append("element");
                });
            }
        },

        error: function (){
            $("#resultSection").html("Something Went Wrong!<br>Please Refresh and Try Again.").addClass("alert alert-danger");
        },

    });    
    
});

$("#btnThree").click(function (){
    $.ajax({
        url: "libs/php/searchWiki.php",
        type: "POST",
        dataType: "json",
        
        data: {
            keyword: $("#searchTerm").val(),
            lang: $("#selLanguage").val(),
        },

        success: function(result){

            $("#lbl").html("Your Search Results...");

            console.log(result);

            if(result.status.name == "ok") {
                $("#firstRow").html("Title:");
                $("#firstData").html(result["data"][0]["title"]);
                $("#secondRow").html("Summary:");
                if(result["data"][0]["summary"]){
                    $("#secondData").html(result["data"][0]["summary"]);
                } else
                {
                    $("#secondData").html("Summary Not Available.");
                }
                $("#thirdRow").html("Wiki URL:");
                $("#thirdData").html(result["data"][0]["wikipediaUrl"]);
                $("#forthRow").hide();
                $("#forthData").hide();
                $("#fifthRow").hide();
                $("#fifthData").hide();
                $("#sixthRow").hide();
                $("#sixthData").hide();
            }
        },

        error: function (){
            $("#resultSection").html("Something Went Wrong!<br>Please Refresh and Try Again.").addClass("alert alert-danger");
        },

    });    
});