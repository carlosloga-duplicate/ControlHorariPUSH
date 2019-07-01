
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

function guardaIDnotificacio(quin, id)
{
    alert('guardaIDnotificacio: ' + id.toString());
    localStorage.setItem("ID_" + quin, id.toString());
}

function recuperaIDnotificacio(quin)
{
    var nID = -1;
    try
    {
        var sID = localStorage.getItem("ID_" + quin);
        nID = parseInt(sID);
        alert('ID de la notificació recuperat: ' + sID + " | " + nID.toString()) ; 
    }
    catch(err)
    {       
        alert('ID de la notificació no recuperat!'); 
    }
    return nID;
}

function eliminaIDnotificacio(quin)
{
    localStorage.removeItem("ID_" + quin);
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

