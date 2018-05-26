var botui = new BotUI('lady-bird');

function initBotApp () {
    var userInfo = {};
    let availableTimes = [];
    let rawDates = [];
    var request = new XMLHttpRequest();
    var token = "8a2fd9e0-95f5-4bcf-b405-1904ac269e52";
    
     var getTimes = function(requestedTime, firstpass){//firstpass==true then getTime preceeds showTime
        var timezone = jstz.determine(); 
        console.log(timezone.name());
        if(!requestedTime){
           
            request.open("GET", "https://prjladybird.herokuapp.com/api/timeslots/list?timezone="+timezone.name());
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    console.log(request.responseText);
                    console.log(JSON.parse(request.response).data);
                    rawDates = JSON.parse(request.response).data;
                    availableTimes = convertor(rawDates.slice(0, 4));
                    if(firstpass){
                        showTimes();
                    }
                }
            }
            request.setRequestHeader("X-Client-Token", "8a2fd9e0-95f5-4bcf-b405-1904ac269e52");
            request.send(null);
        } else {
            request.open("GET", "https://prjladybird.herokuapp.com/api/timeslots/ask?message="+requestedTime+"&timezone="+timezone.name());
               request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    console.log(request.response);
                    if(JSON.parse(request.response).can_book){
                        var dateObject = new Date(JSON.parse(request.response).requested_time);
                        var singleDate = {};
                        singleDate.text = dateObject.toDateString() + " at " + dateObject.toLocaleTimeString();
                        singleDate.value = JSON.parse(request.response).requested_time;
                        confirm(singleDate);
                    } else {
                        rawDates = JSON.parse(request.response).data;
                        availableTimes = convertor(rawDates.slice(0, 4));
                         return botui.message.add({ 
                            human: false,
                            delay: 2000,
                            content: "Sorry, the time slot you selected isn't available, here are some other time slots closest to your selection"
                        }).then(function () { 
                            showTimes();
                        })
                    }
                }
            }
            request.setRequestHeader("X-Client-Token", "8a2fd9e0-95f5-4bcf-b405-1904ac269e52");
            request.send(null);
            
        }  
    };
    
  var showTimes= function() {
      return botui.action.button({
          delay: 1000,   
          action: availableTimes
      }).then(function (res) {
          if(res.value !== 'none'){
              confirm(res)
          } else {
              noneOption();
          }
      })
  }
  
  var getLocalData = function(){
      if(JSON.parse(localStorage.getItem('data'))!==null){
          userInfo = JSON.parse(localStorage.getItem('data'));
      }
  };    
    
    var getInfo = function(){
        botui.message.add({ 
            human: false,
            delay: 1000,
            content: "Hey 👋 I am Lucy, Awesome University's AI Assistant. What is your name?"
        }).then(function () { 
            return botui.action.text({ 
                delay: 1000,
                action: {
                    placeholder: 'First Name'
                }
            });
        }).then(function (res) {
            userInfo.firstName = res.value;
            return botui.message.add({
                loading: true,
                delay: 2000,
                content: 'Hi ' + res.value + '! Nice to meet you. What is your email id?'
            });
        }).then(function () { 
            return botui.action.text({ 
                delay: 1000,
                sub_type: 'email',
                action: {
                    placeholder: 'Email Id'
                }
            });
        }).then(function (res) { 
            userInfo.emailId = res.value;
            localStorage.setItem('data', JSON.stringify(userInfo));
            return botui.message.add({
                loading: true,
                delay: 2000,
                content: "Got it 👍"
            });
        }).then(function () { 
            afterPleasantries();
        })
    }
    
    var greetings = function(){
        botui.message.add({ 
            human: false,
            delay: 1000,
            content: "Hey " + userInfo.firstName + " 👋 I am Lucy, Awesome University's AI Assistant."
        }).then(function () { 
            afterPleasantries();
        });
    }
    
    var convertor = function(dates){
        var convertedTimes = [];
        for (var i = 0; i < dates.length; i++){
            var dateObject = new Date(dates[i]);
            var singleDate = {};
            singleDate.text = dateObject.toDateString() + " at " + dateObject.toLocaleTimeString();
            singleDate.value = dates[i];
            convertedTimes.push(singleDate);
        }
        convertedTimes.push({ text: 'None of the above works for me', value: 'none'});
        return convertedTimes;
    };
    
    var confirm = function(confirmTime){
      return botui.message.add({
           loading: true,
           delay: 2000,
           content: "You selected " + confirmTime.text
       }).then(function () { // get the result
           return botui.message.add({
               loading: true,
               delay: 3000,
               content: "Should I book an appointement?"
           });
       }).then(function(){
          return botui.action.button({
              delay: 500,   
              action: [
                  { 
                      text: 'Yes',
                      value: 1
                  },
                  { 
                      text: 'Nope',
                      value: 0
                  }
              ]
          }).then(function (res) {
              if (res.value){
                  sendBooking(confirmTime);
              } else {
                  return botui.message.add({
                      loading: true,
                      delay: 3000,
                      content: "Oh, no worries. What other time suits you best?"
                  }).then(function(){
                      return showTimes(availableTimes);
                  })
              }
          })
      });
  };
    
  var noneOption = function(){
      return botui.message.add({
          loading: true,
          delay: 2000,
          content: 'What other time suits you best?'
      }).then(function () { 
          return botui.action.text({ 
              delay: 1000,
              action: {
                  placeholder: 'Tomorrow at 4pm, Next Wednesday at 2pm...'
              }
          });
      }).then(function (res) {
          getTimes(res.value, false);
      });
  }
  
  
  var sendBooking = function(res){  
       request.open("POST", "https://prjladybird.herokuapp.com/api/timeslots/book");
          request.onreadystatechange = function(){
              if(request.readyState == 4 && request.status == 200 && JSON.parse(request.response).booked){
                      return botui.message.add({
                          loading: true,
                          delay: 2000,
                          content: 'Your appointement has been booked ' + userInfo.firstName + '!(check). Looking forward to talking with you!'
                      }).then(function(){
                          return botui.message.add({
                              loading: true,
                              delay: 2000,
                              content: 'In the meantime, please dont forget to connect with us over [Facebook](https://www.facebook.com/YorkvilleUniversity/)^ & [Twitter](https://twitter.com/yorkvilleu?lang=en)^'
                      });
                      });     
              }  else if (request.readyState == 4 && request.status != 200) {
                        return botui.message.add({
                          loading: true,
                          delay: 2000,
                          content: 'Something went wrong 😞, please check the internet connection or try to book another time slot'
                      }).then(function (res) {
                            showTimes(availableTimes);
                        });
                  }
          }
          request.setRequestHeader("X-Client-Token", "8a2fd9e0-95f5-4bcf-b405-1904ac269e52");
         request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      console.log(res.value)
      request.send("request_time="+res.value+"&email="+userInfo.emailId);
  };
    

    
    var afterPleasantries = function () { 
        return botui.message.add({
            loading: true,
            delay: 2000,
            content: "Thank you for showing interest in Awesome University. I'll help you get in touch with our Admission Advisor."
        }).then(function () { 
            return botui.message.add({
                loading: true,
                delay: 3000,
                content: "They will guide you step by step through the admission process."
            });
        }).then(function () { 
            return botui.message.add({
                loading: true,
                delay: 3000,
                content: "When are you available to jump on a quick phone call?"
            });
        }).then(function () {
            getTimes(false, true);
        }); 
    }
    
    getLocalData();
    getTimes(); 
    if(JSON.parse(localStorage.getItem('data'))!==null){
        greetings();
    } else {
        getInfo();
    }
}

initBotApp ()

/*botui.message.add({
  content: 'Hello World from bot!<br/>line break.<a href="https://moin.im">link</a>'
});

botui.message.add({
  human: true,
  content: 'Hello World from human!'
});*/
