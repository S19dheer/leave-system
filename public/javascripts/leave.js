 /*var datepicker1 = document.getElementById('datepicker1');
                      var datepicker2 = document.getElementById('datepicker2');
                     */

 // datepicker1.datepicker();
 // datepicker2.datepicker();

 var publicHoliday = ['Mon Jan 26 2015 00:00:00 GMT+0530 (IST)', 'Fri Mar 06 2015 00:00:00 GMT+0530 (IST)', 'Fri Apr 03 2015 00:00:00 GMT+0530 (IST)', 'Sat Aug 15 2015 00:00:00 GMT+0530 (IST)', 'Thu Sep 24 2015 00:00:00 GMT+0530 (IST)', 'Fri Oct 02 2015 00:00:00 GMT+0530 (IST)', 'Thu Oct 22 2015 00:00:00 GMT+0530 (IST)', 'Tue Nov 10 2015 00:00:00 GMT+0530 (IST)', 'Fri Dec 25 2015 00:00:00 GMT+0530 (IST)'];

 $(document).ready(function() {
     $("#datepicker1").datepicker({
         dateFormat: 'yy-mm-dd',
         onSelect: function() {
             console.log("Start");
             var StartDate = $("#datepicker1").datepicker('getDate');
             StartDate.setDate(StartDate.getDate() + 15);
             //$("#datepicker2").datepicker('setDate',EndDate);
             $("#datepicker2").datepicker('option', 'maxDate', StartDate);
         }
     });

     $("#datepicker2").datepicker({
         dateFormat: 'yy-mm-dd',
         onSelect: function() {
             var sdate = $("#datepicker1").datepicker('getDate');
             var edate = $("#datepicker2").datepicker('getDate');
             excludeLeaveAndWeekEnd(sdate, edate);
         }
     });

     $("#showApplydate").click(function() {
         $.ajax({
             url: '/showdate',
             type: 'GET',
             success: function(data) {
                 console.log(data);
                 var html = "";
                 for (var i = 0; i < data.result.length; i++) {
                     html += '<div data-index="[' + i + ']" style="background: #4679BD;margin: 20px;">' + new Date(data.result[0].leaveData.date) + '<button onclick="clickCancil();" data-date="' + new Date(data.result[0].leaveData.date) + '" data-apply="' + data.result[0].leaveData.leave + '" style="margin-left: 200px;">Cancil</button></div>';
                 }
                 $('#userdate').html(html);
             },
             error: function(err) {
                 console.log("err", err);
             }
         });
     });

     $("#userlogin").click(function() {
         var html = '<form action="/login" method="post">' + '<div><label>UserName:</label><input type="text" name="username"/><br/></div>' + '<div><label>Password:</label><input type="password" name="password"/><br/></div>' + '<div><input type="submit" value="submit"/></div></form>';
         $("#login").html(html);
     });
     $("#adminlogin").click(function() {
         var html = '<form action="/login" method="post">' + '<div><label>AdminName:</label><input type="text" name="adminname"/><br/></div>' + '<div><label>Password:</label><input type="password" name="password"/><br/></div>' + '<div><input type="submit" value="submit"/></div></form>';
         $("#login").html(html);
     });

     function excludeLeaveAndWeekEnd(startdate, enddate) {
         var count = 0;
         var totalWorkDay = [];
         while (startdate <= enddate) {
             if (startdate.getDay() == 6 || startdate.getDay() == 0) {
                 console.log("weekend");
             } else if (startdate.getDay() > 0 && startdate.getDay() < 6) {
                 // for loop and if condition
                 totalWorkDay.push(startdate.toString());
                 count++;
             }

             startdate.setDate(startdate.getDate() + 1);
         }

         excludePublicHolyDay(totalWorkDay, count);
     }


     function excludePublicHolyDay(workDay, countDay) {
         console.log(workDay);

         for (var i = 0; i < publicHoliday.length; i++) {

             for (var j = 0; j < workDay.length; j++) {
                 if (publicHoliday[i] == workDay[j]) {
                     workDay.splice(j, 1);
                     countDay--;
                 }
             }
         }

         var html = "";
         for (var i = 0; i < workDay.length; i++) {
             html += '<div data-index="[' + i + ']" style="background: #4679BD;margin: 20px;">' + new Date(workDay[i]) + '<button onclick="clickApply();" data-date="' + new Date(workDay[i]) + '" data-apply="true" style="margin-left: 200px;">Apply</button></div>';
         }

         $('#dateshow').html(html);

     }

 });

 function clickApply() {
     debugger;
     var leaveDate = {
         date: event.target.getAttribute("data-date"),
         leave: event.target.getAttribute("data-apply")
     };
     $.ajax({
         url: 'http://localhost:3000/apply',
         data: JSON.stringify(leaveDate),
         type: 'POST',
         contentType: 'application/json',
         success: function(data) {
             console.log(data);
         },
         error: function(err) {
             console.log("err", err);
         }
     });
 }
