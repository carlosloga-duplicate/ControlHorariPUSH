
/* FAQS : https://github.com/katzer/cordova-plugin-local-notifications/issues?page=4&q=is%3Aissue+is%3Aopen */
/* https://github.com/sitepoint-editors/ReminderApp */


function crearNotificacio(quin, hora, titulo, msg)
{   
    try{
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
          var isAndroid = false;    
          if ( device.platform === "Android" ) {
            isAndroid = true;
          }

/*        RESTA HORAS :    
          var hora1 = ("04:29:01").split(":"),
          hora2 = ("03:28:56").split(":"),
          t1 = new Date(),
          t2 = new Date();       
          t1.setHours(hora1[0], hora1[1], hora1[2]);
          t2.setHours(hora2[0], hora2[1], hora2[2]);       
          //Aquí hago la resta
          t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds()); */

          /* sound: isAndroid ? "file://sounds/notification.mp3" : "file://sounds/notification.caf", */
          /* trigger: { every: { hour: 11, minute: 45 } } */
          /* trigger: { every: 'day' } */

          var nMinDiferencia = 0; 

          var horaDef = parseInt(hora.split(':')[0]);
          var minuDef = parseInt(hora.split(':')[1]);
                   
          var horaAra = parseInt(HoraActual5Min().split(":")[0]);
          var minuAra = parseInt(HoraActual5Min().split(":")[1]);

          var hores = 0;
          var minuts = 1;

          if(horaDef > horaAra)
          {
              minuts = (60 - minuAra) + ((horaDef - (horaAra + 1)) * 60) + minuDef;
          }
          else
          {
              minuts = (-1 * ( minuAra + ((horaAra - (horaDef)) * 60) - minuDef ));
          }
      /* alert(horaAra.toString() + "|" + minuAra.toString() + "  |  " + horaDef.toString() + "|" + minuDef.toString());          
      alert(minuts.toString()); */

          msg += " [" + hora + "]"; 

          /* var so = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beepFichar.m4r';    bee.caf  */
          /* var so = device.platform != 'iOS' ? 'file://audio/beepFichar.mp3' : 'content://audio/beepFichar.m4r';
          vibrate: true, 
          attachments: ['file://img/imgNotif.png'],
          sound: so,
           */

          var so = device.platform == 'Android' ? 'res://beepFichar.mp3' : 'res://beepFichar.m4r';
          var idAleatori = Math.floor(Math.random() * (1000000000 - 1) + 1);

          cordova.plugins.notification.local.schedule({
            id: idAleatori,
            title: titulo,
            text: msg,               
            at: new Date(new Date().getTime() + (60000 * minuts)),
            trigger:{ at: new Date(new Date().getTime() + (60000 * minuts)) },    
            repeat:  'daily', 
            foreground: true,
            icon: "res://iconLogo.png",
            smallIcon: "res://iconLogo.png",
            attachments: ['file://img/imgNotif.png'], 
            sound: so,
            silent: false  
          }); 
                 
          mensajePopup('OK','Rebràs un avís (' + quin + ') cada dia a les ' + hora, 2);          
          eliminaNotificacio(quin, false); //Elimina la anterior notificación si había ...          
          LS_guardaIDnotificacio(quin,idAleatori); //Guarda nueva hora de aviso en LocalStorage           
        }    
      });
    }
    catch(err)
    {
      alert('ERROR (exception): ' + err.message);
    }
}

function eliminaNotificacio(quin, bVerMsg)
{  
  var nId = LS_recuperaIDnotificacio(quin); 
  try
  {
    if(nId >= 0) cancelarNotificacio(nId, quin, bVerMsg);
  }
  catch(err){}
}

function cancelarNotificacio(id, quin, bVerMsg)
{  
    cordova.plugins.notification.local.cancel(id, function() {          
        LS_eliminaIDnotificacio(quin);
        if(bVerMsg) mensajePopup("OK","S'ha eliminat l'avis (" + quin + ") " , 2);  
  });
}

