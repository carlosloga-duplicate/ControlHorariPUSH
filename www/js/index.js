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

        $.doTimeout(2000, function(){ 
            cordova.getAppVersion.getVersionNumber(function (version) {  //coge la v. del tag version del config.xml
                $("#tdPie").html("v." + version); 

                $.mobile.changePage('#pageSETHORA', { transition: 'slideup', changeHash: false });

                /* Informar data actual */
                var today = new Date().toString();    
                $("input[type=date]").val(today);              /* yyyy-MM-dd  */

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
            });
        });

        $('#botonENTRADA').click(function() {
            alert('Button ENTRADA has been clicked');
            $.mobile.changePage('#pageCONFIRMACIO', { dataUrl : "pageCONFIRMACIO?color=D2F1CE", data : { 'color' : 'D2F1CE' }, reloadPage : true, changeHash : true });
        });

        $('#botonSORTIDA').click(function() {
            alert('Button SORTIDA has been clicked');
            $.mobile.changePage('#pageCONFIRMACIO', { dataUrl : "pageCONFIRMACIO?color=FCC6B6", data : { 'color' : 'FCC6B6' }, reloadPage : true, changeHash : true });
        });

/*         $(document).on('pagebeforeshow', "#pageCONFIRMACIO", function (event, data) {
            alert('en pagebeforeshow de pageCONFIRMACIO');
            var parameters = $(this).data("url").split("?")[1];;
            parameter = parameters.replace("color=","");  
            alert(parameter);
            $("#divConfirmar").css( "background-color", parameter);
        }); */

        /* SALIR DE LA APP CUANDO SE PULSE LA TECLA BACK */
        $(window).on("navigate", function (event, data) {            
            var direction = data.state.direction;
            if (direction == 'back') {
                setTimeout(function(){ navigator.app.exitApp(); }, 1500);                
            }
        });

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

function Confirmar(sQue)
{
    alert(sQue);

    if(sQue == "ENTRADA")
    {   
        $.mobile.changePage('#pageCONFIRMACIO', { transition: 'slideup', changeHash: false });
        $("#divConfirmar").css( "background-color", "#D2F1CE");
    }
    else
    {
        $.mobile.changePage('#pageCONFIRMACIO', { transition: 'slideup', changeHash: false });
        $("#divConfirmar").css( "background-color", "#FCC6B6");
    }
}




