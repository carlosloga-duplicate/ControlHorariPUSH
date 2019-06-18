
function Ahora() 
{
    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString(); 
    var h = x.getHours().toString();
    var mi = x.getMinutes().toString();
    var s = x.getSeconds().toString();
    var mil = x.getMilliseconds().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    (h.length == 1) && (h = '0' + h);
    (mi.length == 1) && (mi = '0' + mi);
    (s.length == 1) && (s = '0' + s);
    var ahora = y + m + d + h + mi + s + mil;
    return ahora;
}

function GetDiaFormateado() {
    var todayTime = new Date();    
    var dia = todayTime.getDate().toString().padStart(2,'0');
    var mes = (todayTime.getMonth() + 1).toString().padStart(2,'0');
    var anyo = todayTime.getFullYear().toString();
    /* return dia + "/" + mes + "/" + anyo;  */
    return anyo + "-" + mes + "-" + dia; 
}

function GetHoraSel(sAccion)
{
    var radioSelec = '';
    var sHora = '';
alert('sAccion: ' + sAccion);    
    switch(sAccion) {
        case 'E':  /* entrada */
            radioSelec = $("#tipoHoraENTRADA :radio:checked").val().toString();
alert('radioSelec: ' + radioSelec);
            switch(radioSelec)  
            {
                case 'EHA':  /* hora actual */
                    sHora = $("#labelEHA").text().substring($("#labelEHA").text().length - 5);
                    break;
                case 'EHD':  /* hora por defecto */
                    sHora = $("#labelEHD").text().substring($("#labelEHD").text().length - 5);
                    break;
                case 'EHO':  /* otra hora (manual) */
                    sHora = $("#selectHoraENTRADA").find(":selected").text();
                    break;
            }
            return sHora;
          break;

        case 'D':  /* descans */
          
          break;

        case 'S':  /* sortida */

          break;
    }
}

function constants(sCual)
{
    var dict = {};
    var sRet = "";
    try
    {
        dict['urlServeiREST'] = "http://...";

        dict['ERRORGenerico'] = "S´ha produit un error ";
        dict['ERROREnviant'] = "ERROR enviant les dades ";
        dict['ERRORRevent'] = "ERROR rebent dades ";    
        dict['ERRORConfig'] = "ERROR recuperant l´usuari d´aquest mòvil ";
        dict['ERRORtimeOut'] = "S'ha excedit el temps d'enviament";

        dict['OKEnviant'] = "Les dades s´han enviat correctament";
        dict['OKRebent'] = "Les dades s´han rebut correctament";    
        
        dict['WAITRebent'] = "Rebent dades del servidor";
        dict['WAITEnviant'] = "Enviant dades al servidor";
        dict['WAITTancant'] = "tancant l'aplicació";

        dict['NOConfig'] = "Mòvil no configurat. Informi al menys l'usuari i el password si us plau";
        
        sRet = dict[sCual].toString();
    }
    catch(err){
        sRet = "constants: " + err.message; 
    };

    return sRet;
}

function mensajePopup(cual, txtMsg, esperar)
{
    $('#Avis').hide();
    if(cual=='OK')
    {
        $("#AvisEnvioOK").popup();    
        $("#txtOK").html(txtMsg);
        $("#AvisEnvioOK").popup("open");         
        if(esperar > 0) setTimeout(function(){  $("#AvisEnvioOK").popup("close"); }, esperar);
    }
    else
    {
        $("#AvisEnvioKO").popup();    
        $("#txtKO").html(txtMsg);
        $("#AvisEnvioKO").popup("open"); 
        if(esperar > 0) setTimeout(function(){  $("#AvisEnvioKO").popup("close"); }, esperar);
    }
}

function linkWebsite()
{
    location.href='http://www.SettingConsultoria.com';
}

