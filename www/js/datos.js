
function guardaDatosUSU(sUsu, sPassw)
{
    localStorage.setItem('USU', sUsu);
    localStorage.setItem('PASSW', sPassw);
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

function cargarCombos()
{
    var dHora = new Date(2019,1,1,0,0,0); 
    /* Hora de entrada */ 
    $('#mySelect').find('option').remove().end();    
    for (i=0; i<(24*12); i+=5) {    
        dHora = new Date(dHora + i * 60000);
        sHora = dHora.getHours.toString() + ":" + dHora.getMinutes.toString();
        $("#selectHoraENTRADA").append('<option value="' + i + '">' + sHora + '</option>');
    }    

    /* Tiempo de descanso */ 

    /* Hora de salida */ 

}

function historicoUsuSector()
{
    $('#pTxtAvis').html(constants("WAITRebent"));
    $('#Avis').show();

/*  var datosUsu = recuperaDatosUSU();
    var sUsu = datosUsu.split("|")[0]; 
    var sSector = datosUsu.split("|")[1];  */

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

