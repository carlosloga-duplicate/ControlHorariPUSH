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
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
/*         console.log('Received Device Ready Event');
        console.log('calling setup push'); */
        app.setupPush();

        setTimeout("$.mobile.changePage('#pageSETHORA', { transition: 'slideup', changeHash: false });", 2000);
        
        /* Informar data actual */
        var today = new Date();   
 /*        var dd = today.getDate().toString();
        var mm = (today.getMonth()+1).toString(); //January is 0!
        var yyyy = today.getFullYear().toString(); */  
        var queryDate = new Date(today.getFullYear(),today.getMonth(),today.getDate());  
        $('#DIA').val(queryDate);  /* yyyy-MM-dd  */

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

    },
    setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "XXXXXXXX"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);

            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function(data) {
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
       });
    }
};
