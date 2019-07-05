
function guardaDatosCONFIGURACIO(sUsu, sPassw, horaEdefecte, horaSdefecte, tempsDefecte,AvisEntrada,AvisSortida)
{
    localStorage.setItem('USU', sUsu);
    localStorage.setItem('PASSW', sPassw);
    localStorage.setItem('ENTRADA_DEFECTE', horaEdefecte);
    localStorage.setItem('SORTIDA_DEFECTE', horaSdefecte);
    localStorage.setItem('DESCANS_DEFECTE', tempsDefecte);
    localStorage.setItem('AVISA_ENTRADA', AvisEntrada);
    localStorage.setItem('AVISA_SORTIDA', AvisSortida);
   
}

function recuperaDatosUSU()
{
    try{
        var sUsu = localStorage.getItem('USU');
        var sPassw = localStorage.getItem('PASSW');
        if(sUsu == null || sPassw == null)
            return constants('NOConfig');
        else
            return sUsu + "|" + sPassw;
    }
    catch(err)
    {
        return constants('ERRORConfig') + err.message;
    }
}

function recuperaDatosDEFECTE()
{
    try{
        var horaEdefecte = localStorage.getItem('ENTRADA_DEFECTE');
        var horaSdefecte = localStorage.getItem('SORTIDA_DEFECTE');
        var tempsDefecte = localStorage.getItem('DESCANS_DEFECTE');
        var avisaEntrada = localStorage.getItem('AVISA_ENTRADA');
        var avisaSortida = localStorage.getItem('AVISA_SORTIDA');
  
        return horaEdefecte + "|" + horaSdefecte + "|" + tempsDefecte + "|" + avisaEntrada + "|" + avisaSortida;
    }
    catch(err)
    {
        return constants('ERRORConfig') + err.message;
    }
}

function LS_guardaIDnotificacio(quin, id)
{
    LS_eliminaIDnotificacio(quin);
    localStorage.setItem("ID_" + quin, id.toString());
}

function LS_recuperaIDnotificacio(quin)
{
    var nID = -1;
    try
    {
        var sID = localStorage.getItem("ID_" + quin);
        nID = parseInt(sID);
    }
    catch(err)
    {       
    }
    return nID;
}

function LS_eliminaIDnotificacio(quin)
{
    try
    {       
        localStorage.removeItem("ID_" + quin);
    }
    catch(err)
    {}
}

function LS_guardaUltimaEntrada(hora, dia)
{   
    localStorage.setItem('ULTIMA_HORA_ENTRADA', hora);
    localStorage.setItem('ULTIMO_DIA_ENTRADA', dia);
}

function LS_recuperaUltimaEntrada()
{
    var ultimaHoraEntrada = localStorage.getItem('ULTIMA_HORA_ENTRADA');
    var ultimoDiaEntrada = localStorage.getItem('ULTIMO_DIA_ENTRADA');    
    return ultimaHoraEntrada + "|" + ultimoDiaEntrada;
}

function CalculoTempsDia(horaS, diaS, horaE, diaE, minDescans)
{
    var nMinDescans = 0;
    try
    {
        nMinDescans = parseInt(minDescans);
    }
    catch(err)
    {nMinDescans = 0;};

    var sTemps = '';
    var dEntrada = new Date(parseInt(diaE.split('/')[2]) , parseInt(diaE.split('/')[1]) - 1, parseInt(diaE.split('/')[0]), parseInt(horaE.split(":")[0]), parseInt(horaE.split(":")[1]) , 0);   
    var dSortida = new Date(parseInt(diaS.split('/')[2]) , parseInt(diaS.split('/')[1]) - 1, parseInt(diaS.split('/')[0]), parseInt(horaS.split(":")[0]), parseInt(horaS.split(":")[1]) , 0);   
    var nRestaMin = (dSortida.getTime() - dEntrada.getTime()) / 60000; 

    nRestaMin = nRestaMin - nMinDescans;
  
    if(nRestaMin > 60) 
    {
        var horas = Math.floor(nRestaMin/60);
        sTemps = horas.toString().padStart(2,'0') + ":" + (nRestaMin - (horas * 60)).toString().padStart(2,'0');
    }
    else
        sTemps = nRestaMin.toString().padStart(2,'0'); 
    
    return sTemps;
}

function historicoUsuSector()
{
    $('#pTxtAvis').html(constants("WAITRebent"));
    $('#Avis').show();

    var sUsu = $('#txtCampUSU').val(); 
    var sSector = $('#txtCampSECTOR').val(); 

    $.ajax({
        url: constants("urlServeiREST"),
        data: {"usu": escape(sUsu), "sector": escape(sSector) },
        type: "GET",
        dataType: "json",
        headers: {"Accept": "application/json"},
        success: function(response, status) {
            response = JSON.stringify(response); 
            $('#pTxtAvis').html("");    //ocultar mensaje Descargando
            $('#Avis').hide();          //ocultar mensaje Descargando
            //mensajePopup('OK', constants('OKRebent'), 4000);
            var sResp = "";
            alert(response);
            var aRegistros = response.split("#");
            alert("length: " + aRegistros.lenght.toString());
            for(var x=0; x<aRegistros.lenght; x++)
            {
                sResp += aRegistros[x].replace("|"," / ") + "<br/>";
            }
            alert(sResp);
            $('#txtCampOBS').prop('disabled', false);
            $('#txtCampOBS').css('overflow', 'hidden').autogrow();
            $("#txtCampOBS").val(sResp);
            $('#txtCampOBS').focus();            
        },
            error: function(request, status, error) { 
                $('#pTxtAvis').html("");
                $('#Avis').hide();
                mensajePopup('KO', constants('ERRORRevent') + status + "\n" + request.statusText + "\n" + request.status + "\n" + request.responseText + "\n" + request.getAllResponseHeaders(), 0);
        }
    });

}

function enviaFichaje(tipo,dia,hora,descans)
{
    $("#pTxtAvis").text("Esperi si us plau, enviant dades ..."); 
    document.getElementById("imgComunica").src="img/enviant.png";
    document.getElementById("Avis").style.display='';
    $("#Avis").show();                               
    setTimeout(function(){                    
        $("#pTxtAvis").text("...");
        $("#Avis").hide();    
        IrPantallaInicio();
        mensajePopup("OK","El fitxatge s'ha enregistrat correctament", 2);
    }, 4000);

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    // Cuando esté publicado el web service que recibe los datos:
    //   - descomentar esto siguiente y comentar lo anterior !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //   - Informar el valor correcto en 'urlServeiREST'
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    /*  
    $('#pTxtAvis').html(constants("WAITEnviant"));
    $('#Avis').show();

    var usuPsw = recuperaDatosUSU();
    var sUsu = usuPsw.split('|')[0];
    var sPsw = usuPsw.split('|')[1];

    $.ajax({
        url: constants("urlServeiREST"),
        data: {"usu": escape(sUsu), "psw": escape(sPsw), "tipo": escape(tipo), "dia": escape(dia), "hora": escape(hora), "descans": escape(descans) },
        type: "POST",
        dataType: "json",
        headers: {"Accept": "application/json"},
        success: function(response, status) {
            response = JSON.stringify(response); 
            $('#pTxtAvis').html("");    
            $('#Avis').hide();       
            var estat = response;
            mensajePopup("OK",estat,3);
        },
            error: function(request, status, error) { 
                $('#pTxtAvis').html("");
                $('#Avis').hide();
                mensajePopup('KO', constants('ERROREnviant') + status + "\n" + request.statusText + "\n" + request.status + "\n" + request.responseText + "\n" + request.getAllResponseHeaders(), 0);
        }
    }); */    
}

function recuperaFichajesMes(tipo,dia,hora,descans)
{
    $("#pTxtAvis").text("Esperi si us plau, rebent dades ..."); 
    document.getElementById("imgComunica").src="img/rebent.png";
    document.getElementById("Avis").style.display='';  
    $("#Avis").show();                                     
    setTimeout(function(){                    
        $("#pTxtAvis").text("...");
        $("#Avis").hide();    
        mensajePopup("OK","Els fitxatges del darrer mes s'han rebut correctament", 3);
    }, 4000);

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    // Cuando esté publicado el web service que recibe los datos:
    //   - descomentar esto siguiente y comentar lo anterior !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //   - Informar el valor correcto en 'urlServeiREST'
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
  
/*     
    $('#pTxtAvis').html(constants("WAITRebent"));
    $('#Avis').show();

    var marcajesMes = '';
    var usuPsw = recuperaDatosUSU();
    var sUsu = usuPsw.split('|')[0];
    var sPsw = usuPsw.split('|')[1];

    $.ajax({
        url: constants("urlServeiREST"),
        data: {"usu": escape(sUsu), "psw": escape(sPsw) },
        type: "GET",
        dataType: "json",
        headers: {"Accept": "application/json"},
        success: function(response, status) {
            response = JSON.stringify(response); 
            $('#pTxtAvis').html("");    
            $('#Avis').hide();       
            marcajesMes = response;
            mensajePopup("OK","Els fitxatges del darrer mes s'han rebut correctament",3);
        },
            error: function(request, status, error) { 
                $('#pTxtAvis').html("");
                $('#Avis').hide();
                mensajePopup('KO', constants('ERRORRebent') + status + "\n" + request.statusText + "\n" + request.status + "\n" + request.responseText + "\n" + request.getAllResponseHeaders(), 0);
        }
    }); 
    
    return marcajesMes;

    */
}

function ActualitzarLlistaMarcatges()
{
    //Cuando esté publicado el webService que devuelve los marcajes del mes :
    //  - Eliminar el contenido de prueba del div divHistoric
    //  - descomentar esto:
    
     var marcatgesMes = recuperaFichajesMes();

/*
    var htmlTable = "";

    if(marcatgesMes != null)
    {
        var nFilas = 0; 
        var horasACUMULAT = 0;
    
        htmlTable += "<table style='padding:0 2px 0 0;' width='100%'>";
        htmlTable += "    <thead><tr style='text-align: left;'><th>Dia</th><th>ENTR</th><th>DESC</th><th>SORT</th><th>JORN</th></tr></thead>";
        htmlTable += "    <tfoot>";
        htmlTable += "        <tr><td colspan='5'></td></tr>";
        htmlTable += "    </tfoot>";
        htmlTable += "    <tbody>";
        for(var x=0; x<nFilas; x++)
        {
            var dia = '';
            var hEntrada = '';
            var hSortida = '';
            var descans  = '';
            var horasDIA = '';
            htmlTable += "        <tr><td>" + dia + "</td><td>" + hEntrada + "</td><td>" + descans + "</td><td>" + hSortida + "</td><td>" + horasDIA + "</td></tr>";    
            horasACUMULAT += 0;
        }
        htmlTable += "        <tr><td colspan='4' style='text-align: right; font-weight: bold;'>Temps acumulat&nbsp;</td><td style='font-weight: bold;'>" + horasACUMULAT + "</td></tr>";
        htmlTable += "    </tbody>";
        htmlTable += "</table>";
    }

    $("#divHistoric").html(htmlTable);  */

}