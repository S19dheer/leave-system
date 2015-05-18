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
             html += '<div style="background: #4679BD;margin: 20px;">' + new Date(workDay[i]) + '<button id="applyleave" style="margin-left: 200px;">Apply</button></div>';
         }

         $('#dateshow').html(html);

     }

 });
