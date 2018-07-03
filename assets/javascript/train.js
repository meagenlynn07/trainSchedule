$( document ).ready(function() {

    
    
    var config = {
        apiKey: "AIzaSyBC0w2Hf54GHwgbkREmefR4mZYhN9v1UZ0",
        authDomain: "meagenlynn-33b23.firebaseapp.com",
        databaseURL: "https://meagenlynn-33b23.firebaseio.com",
        projectId: "meagenlynn-33b23",
        storageBucket: "meagenlynn-33b23.appspot.com",
        messagingSenderId: "273801837868"
      };
     
      firebase.initializeApp(config);
    
    
     var database = firebase.database();
    
   
    $("#trainInfoBtn").on("click", function(event) {
        event.preventDefault(); 
    
        
        var trainName = $("#name").val().trim();
        var destination = $("#dest").val().trim();
    
        
        var firstTime = moment($("#firstTime").val().trim(), "hh:mm").subtract(1, "years").format("X");
    
        var frequency = $("#freq").val().trim();
        
       
        var currentTime = moment();
        console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));
    
        console.log(trainName);
        console.log(destination);
        console.log(firstTime);
        console.log(frequency);
        console.log(currentTime);
    
    
    
        //gathers all new train info
        var newTrain = {
    
            train: trainName,
            trainGoing: destination,
            trainComing: firstTime,
            everyXMin: frequency
        };
    
    
        
        database.ref().push(newTrain);
       
        
        
        $("#name").val("");
        $("#dest").val("");
        $("#firstTime").val("");
        $("#freq").val("");
    
        //supposed to prevent from moving to a new page... not really sure how haha Found this code as a suggestion on stack overflow
        return false;
    
    }); 
    
    
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    
            console.log(childSnapshot.val());
            
            var trainName = childSnapshot.val().train;
            var destination =childSnapshot.val().trainGoing;
            var firstTime = childSnapshot.val().trainComing;
            var frequency = childSnapshot.val().everyXMin;
    
    		console.log(trainName);
    		console.log(destination);
    		console.log(firstTime);
    		console.log(frequency);
    
            
            var trainTime = moment.unix(firstTime).format("hh:mm");
            
            var difference =  moment().diff(moment(trainTime),"minutes");
    
            
            var trainRemain = difference % frequency;
    
            
            var minUntil = frequency - trainRemain;
    
            
            var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');
    
             
            $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");
    
    });
    });
    
    