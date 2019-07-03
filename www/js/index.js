/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready'); 

        var usu_passw = recuperaDatosUSU();
        if(usu_passw.startsWith('ERROR'))
        {
            mensajePopup("KO", usu_passw,0);        
        }

        var mostrarDialog = false;

        var valAntAvisos = {
            checkEntrada: null,
            horaEntrada: null,
            checkSortida: null,
            horaSortida: null
        }

        var storeObject = {
            colorFondoConfirmacio: null,  
            usuari: usu_passw.split('|')[0],
            passw: usu_passw.split('|')[1],         
            accion: null,
            dia: null,
            hora: null,
            descans: null
        }

        $.doTimeout(2000, function(){ 
            cordova.getAppVersion.getVersionNumber(function (version) {  //coge la v. del tag version del config.xml
                $("#tdPie").html("v." + version); 

                $.mobile.changePage('#pageSETHORA', { transition: 'flow', changeHash: false });

                cargarCombos();

                /* acceder al combo que hay dentro del radioButton */
                $(document).on('change', '[name="radioENTRADA"]', function(){ 
                    if ($('input[name=radioENTRADA]:checked').val() == 'EHO')
                    {
                        $("input[name='radioENTRADA']:last").attr("checked", "checked");
                        $("input[name='radioENTRADA']").checkboxradio("refresh");
                        $("#selectHoraENTRADA").focus();
                        $("#selectHoraENTRADA").selectmenu("open");
                    }
                });   

                /* acceder al combo que hay dentro del radioButton */
                $(document).on('change', '[name="radioDESCANS"]', function(){ 
                    if ($('input[name=radioDESCANS]:checked').val() == 'DTO')
                    {
                        $("input[name='radioDESCANS']:last").attr("checked", "checked");
                        $("input[name='radioDESCANS']").checkboxradio("refresh");
                        $("#selecTempsDESCANS").focus();
                        $("#selecTempsDESCANS").selectmenu("open");
                    }
                }); 

                /* acceder al combo que hay dentro del radioButton */
                $(document).on('change', '[name="radioSORTIDA"]', function(){ 
                    if ($('input[name=radioSORTIDA]:checked').val() == 'SHO')
                    {
                        $("input[name='radioSORTIDA']:last").attr("checked", "checked");
                        $("input[name='radioSORTIDA']").checkboxradio("refresh");
                        $("#selectHoraSORTIDA").focus();
                        $("#selectHoraSORTIDA").selectmenu("open");
                    }
                }); 

                $("#inputDIA").val(GetDiaFormateado());

            });
        });

        /* FITXAR ENTRADA ······················································ */
        $('#botonENTRADA').click(function() {            
            storeObject.colorFondoConfirmacio = '#D2F1CE';
            storeObject.accion = 'ENTRADA';
            storeObject.dia = $("#inputDIA").val();
            storeObject.hora = GetHoraSel('E');
            $.mobile.changePage('#pageCONFIRMACIO', { transition: 'slideup', changeHash: false });
        });

        /* FITXAR SORTIDA ······················································ */
        $('#botonSORTIDA').click(function() {        
            storeObject.colorFondoConfirmacio = '#FCC6B6';
            storeObject.accion = 'SORTIDA';
            storeObject.dia = $("#inputDIA").val();
            storeObject.hora = GetHoraSel('S');
            storeObject.descans = GetHoraSel('D');            
            $.mobile.changePage('#pageCONFIRMACIO', { transition: 'slideup', changeHash: false });
        });

        /* Al abrir la pagina PRINCIPAL (SETHORA) ······················································ */
        $(document).on('pagebeforeshow', "#pageSETHORA", function (event, data) {
            try
            {    
                /* Hora d'ara */
                var ara = HoraActual5Min();
              
                document.getElementById('labelEHA').innerHTML = "Ara<br/>" + ara;  
                $("#cgTipoHoraENTRADA").controlgroup("refresh");

                document.getElementById('labelSHA').innerHTML = "Ara<br/>" + ara;   
                $("#cgTipoHoraSORTIDA").controlgroup("refresh");

                /* Hores per defecte */
                var defectes = recuperaDatosDEFECTE();
                if(!defectes.startsWith('ERROR'))
                {                    
                    document.getElementById('labelEHD').innerHTML = "Def.<br/>" + defectes.split('|')[0]; 
                    $("#cgTipoHoraENTRADA").controlgroup("refresh");

                    document.getElementById('labelSHD').innerHTML = "Def.<br/>" + defectes.split('|')[1]; 
                    $("#cgTipoHoraSORTIDA").controlgroup("refresh");

                    document.getElementById('labelDTD').innerHTML = "Defecte<br/>" + defectes.split('|')[2];
                    $("#cgTipoHoraDESCANS").controlgroup("refresh");
                }                             

                $("#panelENTRADA .ui-icon-carat-r").parent().find(".ui-btn-text").css('color', "#1C3A6E");
                $("#panelENTRADA .ui-icon-carat-r").parent().find(".ui-btn-text").css('backColor', "#5379BC");

                $("#panelSORTIDA .ui-icon-carat-r").parent().find(".ui-btn-text").css('color', "#1C3A6E");
                $("#panelSORTIDA .ui-icon-carat-r").parent().find(".ui-btn-text").css('backColor', "#5379BC");

                $("#botonMenu .ui-icon-gear").find(".ui-btn-text").css('color', "#1C3A6E");
                $("#botonMenu .ui-icon-gear").find(".ui-btn-text").css('backColor', "#5379BC");
            }
            catch(err)
            {         
                alert(err.toString());       
            }
        });

        //Evento al abrir el acordeón de SORTIDA 
        $(document).on( "collapsibleexpand", "#panelSORTIDA",function( event, ui ) {
            ScrollHastaAbajo();
        });

        /* Eventos de los botones del POPUP CONFIRMAR */
        $('#botonSIconfirma').click( function(e) {e.preventDefault(); RespostaSI(); return false; } );
        $('#botonNOconfirma').click( function(e) {e.preventDefault(); RespostaNO(); return false; } );

        /* Al abrir la pagina de CONFIRMACIÓ ······················································ */
        $(document).on('pagebeforeshow', "#pageCONFIRMACIO", function (event, data) {      
            try
            {                               
                var dia = storeObject.dia.toString();
                var diaFormat = dia.substr(9,2) + "/" + dia.substr(5,2) + "/" + dia.substr(0,4);
                $("#labelAccio").text(storeObject.accion.toString());
                $("#labelUSU").text(storeObject.usuari.toString());
                $("#labelDIA").text(diaFormat);
                $("#labelHORA").text(storeObject.hora.toString());
                if(storeObject.accion.toString() == "SORTIDA")
                {
                    /* document.getElementById("tdACCIO").style.backgroundColor = '#7F0000'; */
                    document.getElementById("tdDescansH").style.display = '';
                    document.getElementById("tdDescansB").style.display = '';
                    $("#labelDESCANS").text(storeObject.descans.toString());  
                    
                    var ultimaEntrada = LS_recuperaUltimaEntrada();
                    var ultimaHoraEntrada = ultimaEntrada.split('|')[0];
                    var ultimoDiaEntrada = ultimaEntrada.split('|')[1];           

                    var sTempsDia = CalculoTempsDia(storeObject.hora.toString() , diaFormat, ultimaHoraEntrada, ultimoDiaEntrada, storeObject.descans.toString() );
                    document.getElementById("tdTempsDiaH").style.display = '';
                    document.getElementById("tdTempsDiaB").style.display = '';
                    $("#labelTEMPSDIA").text(sTempsDia);  
                    
                    //Existeix ja una ENTRADA per avui?        
                    if(ultimoDiaEntrada != diaFormat)
                    {                  
                        mostrarDialog = true;
                    }
                }
                else
                {
                    document.getElementById("tdDescansH").style.display = 'none';
                    document.getElementById("tdDescansB").style.display = 'none';

                    document.getElementById("tdTempsDiaH").style.display = 'none';
                    document.getElementById("tdTempsDiaB").style.display = 'none';  
                }
            }
            catch(err)
            {         
                alert(err.toString());       
            }
        });

        $(document).on('pageshow', "#pageCONFIRMACIO", function (event, data) { 
            if(mostrarDialog)
            {
                mensajeSiNo("Confirmi si us plau", "PREGUNTA_1");
                mostrarDialog = false;
            }
        });

        /* Al abrir la pagina de CONFIGURACIÓ ······················································ */
        $(document).on('pagebeforeshow', "#pageCONFIGURACIO", function (event, data) {
            var usu_passw = recuperaDatosUSU();
            if(!usu_passw.startsWith('ERROR'))
            {
                $("#inputUSUARI").val(usu_passw.split('|')[0]);
                $("#inputPASSW").val(usu_passw.split('|')[1]);
            }
            var defectes = recuperaDatosDEFECTE();
            if(!defectes.startsWith('ERROR'))
            {
                /* $('#selectE_H_Defecte').val("'" + defectes.split('|')[0] + "'").attr('selected', true).siblings('option').removeAttr('selected'); */
                $("#selectE_H_Defecte option[value='"+ defectes.split('|')[0] + "']").attr('selected', 'selected');
                $('#selectE_H_Defecte').selectmenu("refresh", true);

                $("#selectS_H_Defecte option[value='" + defectes.split('|')[1] + "']").attr('selected', 'selected');
                $('#selectS_H_Defecte').selectmenu("refresh", true);

                $("#selecT_Defecte option[value='" + defectes.split('|')[2] + "']").attr('selected', 'selected');
                $('#selecT_Defecte').selectmenu("refresh", true);

                var avisaEntrada = defectes.split('|')[3];
                var avisaSortida = defectes.split('|')[4];

                valAntAvisos.checkEntrada = parseInt(avisaEntrada);                
                valAntAvisos.checkSortida = parseInt(avisaSortida);
                valAntAvisos.horaEntrada = null;
                valAntAvisos.horaSortida = null;
                
                if(avisaEntrada == 1 || avisaEntrada == '1')    
                {
                    valAntAvisos.horaEntrada = $("#selectE_H_Defecte").find(":selected").text();
                    $("#cbE_H_Defecte").prop('checked', true).checkboxradio('refresh');                
                }
                else
                    $("#cbE_H_Defecte").prop('checked', false).checkboxradio('refresh');

                if(avisaSortida == 1 || avisaSortida=='1') 
                {
                    valAntAvisos.horaSortida = $("#selectS_H_Defecte").find(":selected").text();
                    $("#cbS_H_Defecte").prop('checked', true).checkboxradio('refresh');
                }
                else
                    $("#cbS_H_Defecte").prop('checked', false).checkboxradio('refresh');
            }
            else
            {
                mensajePopup("KO", defectes,0);  
            }
        });
        
        /* CANCELAR ENVIAMENT ······················································ */
        $('#botonCancelaCONFIRMAR').click(function() {            
            $.mobile.changePage('#pageSETHORA', { transition: 'slideup', changeHash: false }); 
            $('#panelENTRADA').collapsible( "collapse" );
            $('#panelSORTIDA').collapsible( "collapse" );
            $('#panelENTRADA').trigger('collapse');
            $('#panelSORTIDA').trigger('collapse');
        });

        /* CONFIRMAR ENVIAMENT ····················································· */
        $('#botonEnviaCONFIRMAR').click(function() {               
                if(storeObject.accion == 'ENTRADA')
                {
                    LS_guardaUltimaEntrada(storeObject.hora,  storeObject.dia.substr(9,2).padStart(2,'0') + "/" + storeObject.dia.substr(5,2) + "/" + storeObject.dia.substr(0,4));
                }

                $.mobile.changePage('#pageSETHORA', { transition: 'slideup', changeHash: false });
                $('#panelENTRADA').collapsible( "collapse" );
                $('#panelSORTIDA').collapsible( "collapse" );
                $('#panelENTRADA').trigger('collapse');
                $('#panelSORTIDA').trigger('collapse');                                                            

                $("#pTxtAvis").text("Esperi si us plau, enviant dades ..."); 
                $("#Avis").show();  
                document.getElementById("Avis").style.display='';                                 
                setTimeout(function(){                    
                    $("#pTxtAvis").text("...");
                    $("#Avis").hide();    
                    mensajePopup("OK","El fitxatge s'ha enregistrat correctament", 3);
                }, 4000);
        });

        /* GUARDAR CONFIGURACIÓ ····················································· */
        $('#botonGuardarCONFIGURACIO').click(function() {            
            var usu = $("#inputUSUARI").val();
            var passw = $("#inputPASSW").val();
            var horaEdefecte = $("#selectE_H_Defecte").find(":selected").text();
            var horaSdefecte = $("#selectS_H_Defecte").find(":selected").text();
            var tempsDefecte = $("#selecT_Defecte").find(":selected").text();            
            var avisaEntrada = 0;
            var avisaSortida = 0; 
            if( document.getElementById('cbE_H_Defecte').checked ) { avisaEntrada = 1;  }
            if( document.getElementById('cbS_H_Defecte').checked ) { avisaSortida = 1;  } 

            guardaDatosCONFIGURACIO(usu, passw, horaEdefecte, horaSdefecte, tempsDefecte, avisaEntrada, avisaSortida);          

            if(avisaEntrada==1) 
            {
                if(valAntAvisos.horaEntrada != horaEdefecte)
                    crearNotificacio("ENTRADA",horaEdefecte,"Control horari","Has de fitxar l'entrada!!!");
            }
            else
            {              
                eliminaNotificacio("ENTRADA");
                LS_recuperaIDnotificacio(valAntAvisos.checkEntrada);
                if(valAntAvisos.checkEntrada==1) mensajePopup('OK','Avís per ENTRADA cancel·lat',2); 
            }            

            if(avisaSortida==1) 
            {
                if(valAntAvisos.horaSortida != horaSdefecte)
                    crearNotificacio("SORTIDA",horaSdefecte,"Control horari","Has de fitxar la sortida (i temps descans) !!!");
            }
            else
            {
                eliminaNotificacio("SORTIDA");
                if(valAntAvisos.checkSortida==1) mensajePopup('OK','Avís per SORTIDA cancel·lat',2);
            }
        
            setTimeout(function(){
                $.mobile.changePage('#pageSETHORA', { transition: 'slideup', changeHash: false });  
                $('#acordeonENTRADA_SORTIDA').collapsible( "collapse" );   
            },2000);
   
        });    

        /* SALIR DE LA APP CUANDO SE PULSE LA TECLA BACK ··········································· */
/*         $(window).on("navigate", function (event, data) {            
            var direction = data.state.direction;
            if (direction == 'back') {
                setTimeout(function(){ navigator.app.exitApp(); }, 500);                
            }
        }); */

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');        
    }   
};






