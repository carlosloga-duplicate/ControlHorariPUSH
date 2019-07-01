
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

/* alert('granted OK');     */
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
          var d = new Date(new Date().getTime() + (60000*minuts));

/* alert(horaAra.toString() + "|" + minuAra.toString() + "  |  " + horaDef.toString() + "|" + minuDef.toString());          
alert(minuts.toString()); */

          var idAleatori = Math.floor(Math.random() * (1000000000 - 1) + 1);
          cordova.plugins.notification.local.schedule({
              id: idAleatori,
              title: titulo,
              text: msg, 
              at: new Date(new Date().getTime() + (60000 * minuts))                            
          }); 
                  
          mensajePopup('OK','Rebràs un avís (' + quin + ') cada dia a les ' + hora, 3);
          
          eliminaNotificacio(quin); //Elimina la anterior notificación si había ... 

          guardaIDnotificacio(quin,idAleatori); //Guarda nueva hora de aviso en LocalStorage 
          
        }    
      });
    }
    catch(err)
    {
      alert('ERROR (exception): ' + err.message);
    }
}

function eliminaNotificacio(quin)
{  
    var nId = LS_recuperaIDnotificacio(quin);
alert(nID.toString());    
    if(nId >= 0) cancelarNotificacio(nId, quin);
}

function cancelarNotificacio(id, quin)
{
alert('en cancelarNotificacio');  
    cordova.plugins.notification.local.cancel(id, function() {
        //alert("Els avisos diaris per '" + quin + "' s'han eliminat"); 
alert('cancelada');        
        LS_eliminaIDnotificacio(quin);
  });
}

