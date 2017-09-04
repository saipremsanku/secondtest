<template>
    <header class="main-header">

    <!-- Logo -->
    <router-link to="/home" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>PF</b></span>
        <a class="navbar-brand">
          <img src="/src/assets/images/platform_Asset 7.png" alt="logo image">
          <!-- Workfall -->

           </a>
          <!-- <img src="/src/assets/images/platform_Asset 7.png" alt="logo image"> -->
          <span class="wrokfall-title"><b>Workfall</b></span>
    </router-link>

    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <!-- <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <i class="fa fa-bars" aria-hidden="true"></i>
        <span class="sr-only">Toggle navigation</span>
      </a> -->
      <!-- Navbar Right Menu -->





      <div class="navbar-custom-menu">

        <ul class="server-status" v-if="(isAdmin=='ADMIN')">
          <!-- backend server  is runnign -->
        <li v-tooltip="backendServer" ><span class="server-on" v-if="getStomClientNotification"> </span> <span class="server-down" v-else></span></li>
          <!-- chat server  is runnign -->
          <li v-tooltip="chatServer" ><span class="server-on" v-if="getStomClinet"></span> <span class="server-down" v-else></span></li>


                <!-- file  server  is runnign -->
          <li v-tooltip="fileServer"><span  class="server-on" v-if="getFileServer"> </span> <span  class="server-down" v-else></span></li>




        </ul>



        <ul class="nav navbar-nav">



          <!-- Notifications Menu -->
          <li class="dropdown notifications-menu">
            <!-- Menu toggle button -->
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-bell-o"></i>
              <span class="label label-warning" v-if="this.$store.getters.getNotificationList">{{getUnreadNotificationList}}</span>
              <!-- <span class="label label-warning" v-else>0</span> -->
            </a>
            <ul class="dropdown-menu width-315 notify-box">
              <li class="header text-center fs-12 color-orange" v-if="this.$store.getters.getNotificationList"><b><a class="dev-cursor-pointer" @click="markAllAsRead">Mark All as Read</a></b></li>
              <li class="header text-center color-orange fs-12" v-else><b>No notifications</b></li>
              <li>
                <!-- Inner Menu: contains the notifications -->
                <ul class="menu maxht-300 notifications-on-bar">
                  <li v-for="(notification,index) in this.$store.getters.getNotificationList"><!-- start notification -->
                    <a href="#" class="text-center">
                      <p class="no-margin" @click="markAsRead(notification,index)">
                          <span v-if="notification.isRead">{{notification.message}}</span>
                          <span class="bg-gray" v-else>{{notification.message}}</span>
                      </p>
                      <p class="estValue">{{convertUtcToLocaDateTime(notification.notificationDateInMillis)}}</p>
                    </a>
                  </li>
                  <!-- end notification -->
                </ul>
              </li>
<!--              <li class="footer border-top"><a href="#" class="color-orange"><b>View all</b></a></li>-->
                <router-link class="footer border-top color-orange"  :to="'/all-notification'" tag="li"><a class="color-orange"><b>View all</b></a></router-link>
<!--                 <li class="footer border-top"><router-link to="/all-notification" class="color-orange">View all</router-link></li>-->
            </ul>
          </li>

          <!-- User Account Menu -->
          <li class="dropdown user user-menu">
            <!-- Menu Toggle Button -->
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <!-- The user image in the navbar-->
              <img :src="getFileUrl+getProfilePic" class="user-image" v-if="profilePicDocumentId != null">
              <img :src="imageURL" class="user-image" alt="User Image" v-else>
              <!-- hidden-xs hides the username on small devices so only the image appears. -->
              <span class="hidden-xs">{{firstName}} {{lastName}}</span>
            </a>
            <ul class="dropdown-menu">
              <!-- The user image in the menu -->
              <li class="user-header">
                <!-- <img :src="imageURL" class="img-circle" alt="User Image"> -->
                <img :src="getFileUrl+getProfilePic" class="img-circle" v-if="profilePicDocumentId != null">
                <img :src="imageURL" class="img-circle" alt="User Image" v-else>

                <p>
                  {{firstName}} {{lastName}}
                </p>
              </li>
              <!-- Menu Body -->

              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left">
                  <!--<a href="#" class="btn btn-default btn-flat">Profile</a>-->
                    <router-link class="btn btn-default btn-flat"  to="/developer/profile" v-if="role=='DEVELOPER'">Profile</router-link>
                    <router-link class="btn btn-default btn-flat" v-if="role === 'PRODUCT_OWNER'" to="/profile">Profile</router-link>
                    <router-link class="btn btn-default btn-flat" v-if="role === 'PROJECT_MANAGER'" to="/profile">Profile</router-link>
                    <router-link class="btn btn-default btn-flat" v-if="role === 'FINANCE_USER'" to="/profile">Profile</router-link>

                </div>
                <div class="pull-right">
                  <button type="button"  class="btn btn-default btn-flat" @click="logout">Log out</button>
                </div>
              </li>
            </ul>
          </li>
          <!-- Control Sidebar Toggle Button -->
        </ul>




      </div>
    </nav>
  </header>
</template>

<script>
    export default {
        data(){
          return{
              firstName: this.$store.getters.getLoggedInUser.firstName,
              lastName :this.$store.getters.getLoggedInUser.lastName,
              imageURL: 'https://api.adorable.io/avatars/200/'+this.$store.getters.getLoggedInUser.email,
              role:this.$cookie.get('role'),
               profilePicDocumentId:'',
             getFileUrl:this.$store.state.SERVER_URL +'/get-file/',
             isAdmin:'',
             chatServer: 'chat Server',
             backendServer: 'back end server',
             fileServer: 'File Server'

          }
        },
        created: function () {
          this.profilePicDocumentId = this.$store.getters.getLoggedInUser.profilePicDocumentId;
          this.isAdmin =this.$store.getters.getLoggedInUser.role;
          //do something after creating vue instance

        },
        computed:{
          getStomClinet:function(){
            // console.log();

            if(this.$root.stompClient &&this.$root.stompClient.connected){
                return true;
            }else{
              return false;
            }

          },
          getStomClientNotification: function(){
            if(this.$root.stompClientNotifications && this.$root.stompClientNotifications.connected){
              return true;
            }else{
              return false;
            }
          },
          getFileServer:function(){
            if(this.$store.getters.getFileServer){

              return true;
            }else{
              return false;
            }
            // return this.$store.getters.getFileServer
          },
          getProfilePic: function(){
            return this.$store.getters.getLoggedInUser.profilePicDocumentId;
          },
          getUnreadNotificationList : function(){
            var app = this;
            var count = '';
            for (var notification of this.$store.getters.getNotificationList) {
              if(!notification.isRead){
                count++;
              }
            }
            return count;
          }
        },
        methods:{

           markAsRead(notification,index){
             var app = this;
             //console.log(app.$store.getters.getLoggedInUser.xAuth)
             if(!notification.isRead){
               app.$http.get(
                 app.$store.state.SERVER_URL+'/api/po-dev-pm-admin/mark-as-read-notification/'+notification.notificationId,
                 {
                   headers: {
                     "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
                   },
                 },
               ).then(function(response){
                 console.log(response);
                 if(response.data.status === 'SUCCESS'){
                   app.$store.commit('updateNotificationList' ,index);
                   if(notification.url){
                     app.$router.push(notification.url);
                   }
                 }else{
                   console.log("something went wrong")
                 }
               });
             }else{
                app.$router.push(notification.url);
             }

           },
            logout:function(){
								var app = this;
                app.$store.commit('setSpinner', true);
                app.$http.get(
                  app.$store.state.SERVER_URL+'/logout',
                  {
                    headers: {
                      "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
                    },
                  },
                ).then(function(response){
                    app.$store.commit('setSpinner',false);
										if(response.data.status === "SUCCESS"){

                      app.$cookie.delete('X-Authorization');
                      app.$cookie.delete('role');
                      app.$cookie.delete('isMobileVerified');
                      app.$cookie.delete('isEmailVerified');

                      app.$store.commit('clearState');

                      //Clearing localstorage, sessionStorage and cookies
      								localStorage.clear();
      								sessionStorage.clear();
      								var cookies = document.cookie;
      								for (var i = 0; i < cookies.split(";").length; ++i){
      									var myCookie = cookies[i];
      									if(myCookie!=null){
      										var pos = myCookie.indexOf("=");
      										var name = pos > -1 ? myCookie.substr(0, pos) : myCookie;
      										document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      									}
      								}
      								if(app.$root.stompClient){
      									app.$root.stompClient.disconnect(function() {
      										console.log("Chat Socket Disconnected !");
      									});
      								}
      								if(app.$root.stompClientNotifications){
      									app.$root.stompClientNotifications.disconnect(function() {
      										console.log("Notifications Socket Disconnected !");
      									});
      								}
											app.$router.push('/login');
										}
							});

						},
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
                }else{
                  console.log("something went wrong")
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
<style scoped>
.container {
    padding-bottom: 3px;
}
.main-header .logo {
    -webkit-transition: width 0.3s ease-in-out;
    -o-transition: width 0.3s ease-in-out;
    transition: width 0.3s ease-in-out;
    display: block;
    float: left;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    text-align: left;
    width: 230px;
    font-family: 'Muli', sans-serif;
    padding: 0 15px;
    font-weight: 300;
    overflow: hidden;
    margin-top: -8px;
}
</style>
