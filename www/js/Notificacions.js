
/* https://github.com/sitepoint-editors/ReminderApp */

function configurarNotificacio(titol, missatge, quan, cadaMinutos, id)
{
    var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
    var date = new Date();

    cordova.plugins.notification.local.schedule({
        id: id,
        title: titol,
        message: missatge,
        at: quan,
        sound: sound,
        icon: "http://domain.com/icon.png"
    });

    cordova.plugins.notification.local.schedule({
        id: id,
        title: titol,
        message: missatge,
        firstAt: date,
        every: cadaMinutos,
        sound: sound,
        icon: "http://domain.com/icon.png"
    });
}

function creaNotificacio(id, date, time, title, message)
{
    cordova.plugin.notification.local.hasPermission(function (granted) {

        alert("Testing permission");
    
        if( granted == false ) {
    
          alert("No permission");
          // If app doesnt have permission request it
          cordova.plugin.notification.local.registerPermission(function (granted) {
    
            alert("Ask for permission");
            if( granted == true ) {
    
              alert("Permission accepted");
              // If app is given permission try again
              testNotifications();
    
            } else {
              alert("We need permission to show you notifications");
            }
    
          });
        } else {
    
          var pathArray = window.location.pathname.split( "/www/" ),
              secondLevelLocation = window.location.protocol +"//"+ pathArray[0],
              now = new Date();
        
          alert("sending notification");
    
          var isAndroid = false;    
          if ( device.platform === "Android" ) {
            isAndroid = true;
          }
    
            alert(Date( new Date().getTime() + 10 ).toString());

          cordova.plugin.notification.local.schedule({
              id: 9,
              title: "Test notification 9",
              text: "This is a test notification",
              sound: isAndroid ? "file://sounds/notification.mp3" : "file://sounds/notification.caf",
              at: new Date( new Date().getTime() + 10 )
              // data: { secret:key }
          });    
        }    
      });
    
}

function crearNotificacio(id, date, time, title, message)
{
//alert('en crearNotificacio: ' + date + '|' + time + '|' + title + '|' + message);  
    if(date == "" || time == "" || title == "" || message == "")
    {         
      mensajePopup("ERROR", "No s'han rebut tots els paràmetres necessaris per crear l'avis",0);    
      return;
    }

/*     var schedule_time = new Date((date + " " + time).replace(/-/g, "/")).getTime();
alert('schedule_time = ' + schedule_time.toString());    
    schedule_time = new Date(schedule_time);
alert('schedule_time = ' + schedule_time.toString()); 
 */

    var now = new Date().getTime();
    var schedule_time = new Date(now + 60*2000); //2 mi. más 
alert('schedule_time = ' + schedule_time.toString()); 

/*     cancelarNotificacio(1);
    cancelarNotificacio(2); */

    cordova.plugins.notification.local.hasPermission(function(granted){
      if(granted == true)
      {
        schedule(id, title, message, schedule_time);
      }
      else
      {
        cordova.plugins.notification.local.registerPermission(function(granted) {
            if(granted == true)
            {
              //schedule(id, title, message, schedule_time);
              cordova.plugins.notification.local.schedule({
                    id: id,
                    title: title,
                    message: message,
                    at: schedule_time
                });
                alert("L'avís s'ha creat correctament pel dia " + schedule_time.getDay.toString() + "/" + (schedule_time.getMonth + 1).toString() + "/" + schedule_time.getFullYear.toString() + " a les " + schedule_time.getHours.toString() + ":" + schedule_time.getMinutes.toString());
            }
            else
            {
              mensajePopup("ERROR", "No s'han pogut crear l'avis perquè aquesta app no té permís",0); 
            }
        });
      }
    });
}

function schedule(id, title, message, schedule_time)
{
alert('en shedule');  
    cordova.plugins.notification.local.schedule({
        id: id,
        title: title,
        message: message,
        at: schedule_time
    });

/*     var array = [id, title, message, schedule_time];
    info.data[info.data.length] = array;
    localStorage.setItem("rp_data", JSON.stringify(info)); */
    alert("L'avís s'ha creat correctament");
    mensajePopup("OK", "L'avís s'ha creat correctament",2000); 
}

function cancelarNotificacio(id)
{
    cordova.plugins.notification.local.cancel(id, function () {
        // Notification was cancelled
    }, scope);
}