$(document).ready(function(){

    $("#btnOneRow, #btnTwoRow, #btnThreeRow").hide();
    
    $("#btnOne").click(function (){
        $.ajax({
            url: "libs/php/getWeatherDetail.php",
            type: "POST",
            dataType: "json",
            
            data: {
                airport: $("#airportIcao").val(),
            },

            success: function(result){

                $("#lbl").html("Weather Details for - \"" + $('#airportIcao option:selected').text() + "\"<br><br>");

                // console.log(result);

                if(result.status.name == "ok") {
        
                    $("#stationName").html(result["data"]["stationName"]);
                    $("#temperature").html(result["data"]["temperature"] + " \xB0C");
                    $("#humidity").html(result["data"]["humidity"] + "%");
                    $("#windSpeed").html(result["data"]["windSpeed"] + " mph");
                    $("#windDirection").html(result["data"]["windDirection"] + " Degree" );
                    $("#clouds").html(result["data"]["clouds"]);

                    $("#btnTwoRow, #btnThreeRow").hide();
                    $("#btnOneRow").show();
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

                // console.log(result);

                let countryNum = "<br>";
                let countryName = "<br>";

                if(result.status.name == "ok") {
                    
                    for (var i = 0; i < result.data.length; i++){
                        countryNum += "<div>" + (i+1) + ":" + "</div>";
                        countryName += "<div>" + result.data[i].countryName + "</div>";
                    }

                    $("#countryNum").html(countryNum);
                    $("#countryName").html(countryName);
                    
                    $("#btnOneRow, #btnThreeRow").hide();
                    $("#btnTwoRow").show();
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

                // console.log(result);

                if(result.status.name == "ok") {
                    
                    if(result["data"][0]["title"]){
                        $("#title").html(result["data"][0]["title"]); 
                    } else {
                        $("#title").html("Unable to find ");
                    }

                    if(result["data"][0]["summary"]){
                        $("#summary").html(result["data"][0]["summary"]);
                    } else {
                        $("#summary").html("Summary Not Available.");
                    }

                    $("#wiki").html('<a href="https://' + result["data"][0]["wikipediaUrl"] + '">' + result["data"][0]["wikipediaUrl"] + '</a>');

                    $("#btnOneRow, #btnTwoRow").hide();
                    $("#btnThreeRow").show();
                }
            },

            error: function (){
                $("#resultSection").html("Something Went Wrong!<br>Please Refresh and Try Again.").addClass("alert alert-danger");
            },

        });    
    });
});