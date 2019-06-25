
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

function crearNotificacio(date, time, title, message)
{
alert('en crearNotificacio: ' + date + '|' + time + '|' + title + '|' + message);  
    if(date == "" || time == "" || title == "" || message == "")
    {      
alert('falta algo');      
      mensajePopup("ERROR", "No s'han rebut tots els paràmetres necessaris per crear l'avis",0);    
      return;
    }

/*     var schedule_time = new Date((date + " " + time).replace(/-/g, "/")).getTime();
alert('schedule_time = ' + schedule_time.toString());    
    schedule_time = new Date(schedule_time);
alert('schedule_time = ' + schedule_time.toString()); 
 */
    var schedule_time = new Date();
alert('schedule_time = ' + schedule_time.toString()); 
    var id = 1; //info.data.length;

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
              schedule(id, title, message, schedule_time);
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

    navigator.notification.alert("Reminder added successfully");
    mensajePopup("OK", "L'avís s'ha creat correctament",2000); 
}

function cancelarNotificacio(id)
{
    cordova.plugins.notification.local.cancel(id, function () {
        // Notification was cancelled
    }, scope);
}