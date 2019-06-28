
/* FAQS : https://github.com/katzer/cordova-plugin-local-notifications/issues?page=4&q=is%3Aissue+is%3Aopen */

/* https://github.com/sitepoint-editors/ReminderApp */

/* function configurarNotificacio(titol, missatge, quan, cadaMinutos, id)
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
} */

function crearNotificacio(id, dia, hora, titulo, msg)
{   

    try{
/*       var unTime = new Date();
      unTime.setHours(parseInt(hora.split(':')[0]));
      unTime.setMinutes(parseInt(hora.split(':')[1]));
      unTime.setSeconds(0);

      alert(hora.split(':')[0] + "|" + hora.split(':')[1]); 
      var schedule_time = new Date(unTime);
      alert(schedule_time.toString());

      var h = parseInt(hora.split(':')[0]);
      var m = parseInt(hora.split(':')[1]); */

//alert('schedule_time = ' + schedule_time.toString());    

    cordova.plugins.notification.local.hasPermission(function (granted) {
        if( granted == false ) {
    
          alert("No hi ha permís per mostrar notificacions!");
          // If app doesnt have permission request it
          cordova.plugins.notification.local.registerPermission(function (granted) {
    
            alert("Demanant permís per mostrar notificacions");
            if( granted == true ) {
    
              // If app is given permission try again
              crearNotificacio(id, date, hora, title, message);
    
            } else {
              alert("No hi ha permís per mostrar notificacions!");
            }
    
          });
        } 
        else 
        {

alert('granted OK');    
          var isAndroid = false;    
          if ( device.platform === "Android" ) {
            isAndroid = true;
          }
    
/*           cordova.plugins.notification.local.setDefaults({
            led: { color: '#FF00FF', on: 500, off: 500 },
            vibrate: true 
          }); */

/*           var nId = parseInt(id); */
/*           var h = parseInt(hora.split(':')[0]);
          var m = parseInt(hora.split(':')[1]); */
/* 
          var hoy = new Date()
          hoy.setDate(date.getDate());
          hoy.setHours(h);
          hoy.setMinutes(m);
          hoy.setSeconds(0);  */


/* 
          let notification = {
            id: 1,
            title: 'Control Horari',
            text: 'Informa la hora',
            trigger: { every: { hour: 14, minute: 5 } }
           };
           alert('notif creada');
           cordova.plugins.notification.local.schedule(notification); */


/*            cordova.plugins.notification.local.schedule({
            title: titulo,
            trigger: {
              every: {
              hour: 14,
              minute: 10
            },
            before: new Date(8640000000000000),
            foreground: true
            }
          });
 */
 
          /* sound: isAndroid ? "file://sounds/notification.mp3" : "file://sounds/notification.caf", */
          /* trigger: { every: { hour: 11, minute: 45 } } */
          /* trigger: { every: 'day' } */
          

/*        RESTA HORAS :    
          var hora1 = ("04:29:01").split(":"),
          hora2 = ("03:28:56").split(":"),
          t1 = new Date(),
          t2 = new Date();       
          t1.setHours(hora1[0], hora1[1], hora1[2]);
          t2.setHours(hora2[0], hora2[1], hora2[2]);       
          //Aquí hago la resta
          t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds()); */

          var nMinDiferencia = 0; 

          var horaDef = parseInt(hora.split(':')[0]);
          var minuDef = parseInt(hora.split(':')[1]);
                   
          var horaAra = HoraActual5Min().split(":")[0];
          var minuAra = HoraActual5Min().split(":")[1];

          var hores = 0;
          var minuts = 1;

          if(horaDef > horaAra)
          {
              minuts = (60 - minuAra) + ((horaDef - (horaAra + 1)) * 60) + minuAra;
          }
          else
          {
              minuts = -1 * ( minuAra + ((horaAra - (horaDef)) * 60) - minuDef ) ;
          }
          var d = new Date(new Date().getTime() + (60*1000*minuts));

alert(d.toDateString());


          cordova.plugins.notification.local.schedule({
              id: Math.floor(Math.random() * (1000000000 - 1) + 1),
              title: "Control Horari",
              text: "Informa la hora", 
              at: new Date(new Date().getTime() + (60*1000*minuts))                            
          }); 
          
          alert('notificació/ns activada/es');

        }    
      });
    }
    catch(err)
    {
      alert('ERROR (exception): ' + err.message);
    }
}

/* function ____crearNotificacio(id, date, time, title, message)
{
//alert('en crearNotificacio: ' + date + '|' + time + '|' + title + '|' + message);  
    if(date == "" || time == "" || title == "" || message == "")
    {         
      mensajePopup("ERROR", "No s'han rebut tots els paràmetres necessaris per crear l'avis",0);    
      return;
    }

//     var schedule_time = new Date((date + " " + time).replace(/-/g, "/")).getTime();
//  alert('schedule_time = ' + schedule_time.toString());    
//    schedule_time = new Date(schedule_time);
// alert('schedule_time = ' + schedule_time.toString()); 


    var now = new Date().getTime();
    var schedule_time = new Date(now + 60*2000); //2 mi. más 
alert('schedule_time = ' + schedule_time.toString()); 

   // cancelarNotificacio(1);
   // cancelarNotificacio(2); 

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
} */

/* function schedule(id, title, message, schedule_time)
{
alert('en shedule');  
    cordova.plugins.notification.local.schedule({
        id: id,
        title: title,
        message: message,
        at: schedule_time
    }); */

/*     var array = [id, title, message, schedule_time];
    info.data[info.data.length] = array;
    localStorage.setItem("rp_data", JSON.stringify(info)); 
    alert("L'avís s'ha creat correctament");
    mensajePopup("OK", "L'avís s'ha creat correctament",2000); 
}  */

/* function cancelarNotificacio(id)
{
    cordova.plugins.notification.local.cancel(id, function () {
        // Notification was cancelled
    }, scope);
} */

