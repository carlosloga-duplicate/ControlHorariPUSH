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

        setTimeout("$.mobile.changePage('#pageSETHORA', { transition: 'slideup', changeHash: false });", 2000);

        $('body').on('click','imgENTRADA',function(){Confirmar('ENTRADA');})
        $('body').on('click','imgSORTIDA',function(){Confirmar('SORTIDA');})

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

    }   
};

function Confirmar(sQue)
{
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




