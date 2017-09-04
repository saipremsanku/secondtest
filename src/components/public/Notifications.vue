<template>
<div>

  <app-adminHeader></app-adminHeader>
  <div class="container">

    <section class="content mgt-40">
                <div><h4>All Notifications <span><button type="button" class="btn btn-md btn-blue pull-right" @click="markAllAsRead">Mark All as Read</button></span></h4></div>
                <br>

          <!-- table data for the pm list -->
               <table class="table table-bordered  table-fixed platform-table-color">
                <tbody>
                    <tr class="notification-table">
                        <th width="20%">Date &amp; Time</th>
                        <th width="80%">Messages</th>
                    </tr>
                    <tr v-for="notification in notificationList">
                        <td class="text-center">{{convertUtcToLocaDateTime(notification.notificationDateInMillis)}}</td>
                        <td v-if="notification.isRead">{{notification.message}}</td>
                        <td v-else>{{notification.message}}<span class="badge badge-cst bg-blue">&nbsp;&nbsp;New</span></td>
                    </tr>
                </tbody>
            </table>
           <!-- table data for the pm list -->

        </section>
  </div>
</div>



</template>
<script>
   import adminHeader  from "../../adminHeader.vue"
   export default{
   data(){
   return{
      notificationList:[],
    }
  },
     components: {
    'appAdminHeader':adminHeader
  },
  created:function(){
    this.getLatestNotification();
  },
    methods:{
        markAllAsRead(){
          var app = this;
          console.log(app.$store.getters.getLoggedInUser.xAuth)
          app.$http.get(
            app.$store.state.SERVER_URL+'/api/po-dev-pm-admin/mark-all-as-read-notification',
            {
              headers: {
                "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
              },
            },
          ).then(function(response){
            console.log(response);
            if(response.data.status === 'SUCCESS'){
              app.$store.commit('setNotificationList' ,[]);
              var notifications = [];
               notifications = app.notificationList;
              app.notificationList = [];
              for (var notification of notifications) {
                notification.isRead = true;
                app.notificationList.push(notification)
              }
            //  window.location.href="";//refreshing the page
            }else{
              console.log("something went wrong")
            }
          })
        },
        getLatestNotification(){
          var app = this;
          app.$http.get(
            app.$store.state.SERVER_URL+'/api/po-dev-pm-admin/get-notification' ,
          {
            headers: {
              "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
            },
          },
          ).then(function(response){
            console.log(response)
            if(response.data.status === 'SUCCESS'){
              app.notificationList = response.data.payLoad;
            }else{
              console.log("something went wrong --")
            }
          })
        },
        convertUtcToLocaDateTime(date){
         //console.log("convertStringtoDate------------------------>")
         var moment = require('moment-timezone');
         var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
         return moment(date).tz(timeZone).format('DD-MM-YYYY HH:mm')
        },

        }
     }
</script>
