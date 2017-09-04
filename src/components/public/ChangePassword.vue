<template>
<div>
  <app-adminHeader></app-adminHeader>
  <app-pm-sidebar v-if="this.$store.getters.getLoggedInUser.role=='PROJECT_MANAGER'"></app-pm-sidebar>
    <app-product-owner-sidebar v-if="this.$store.getters.getLoggedInUser.role=='PRODUCT_OWNER'"></app-product-owner-sidebar>
    <span v-if="this.$store.getters.getLoggedInUser.role=='DEVELOPER'">
      <dev-sidebar v-if="this.$store.getters.getLoggedInUser.isDeveloperEligible"></dev-sidebar>
    </span>

  <div class="container">
    <div class="content">
    <div class="alert  inspirage-danger" style="display:none" v-show="message" role="alert">
            {{errorMessage}}
    </div>
    <div class="alert  inspirage-successPassword " style="display:none" v-show="errorMessage1" role="alert">

      <div class="reset-password-icon text-center">
        <i class="fa fa-check success-fa-icon-reset-pwd" aria-hidden="true"></i>
      </div>
          your password has been reset successfully
    </div>
    <div class="forgot-password-content reset-password-design">
    <div class="email-service">
      <p class="text-center reset-password-heading">Change Password </p>
         <form @submit.prevent="changePassword">
      <div class="rest-password">
        <div class="form-group" :class="{'input': true, 'is-danger': errors.has('oldPassword') }">
          <div class="col-md-12 reset-pwd-marg">
              <input  name="oldPassword" class="form-control reset-pwd-input-padding remove-padding" placeholder="Current Password" type="password" v-model="oldPassword"  v-validate:oldPassword ="'required|min:8'">
               <p class="text-danger" v-if="errors.has('oldPassword')">Please enter old password</p>
          </div>
        </div>
          <div class="form-group" :class="{'input': true, 'is-danger': errors.has('password') }">
            <div class="col-md-12 reset-pwd-marg">
               <input  name="password" class="form-control reset-pwd-input-padding remove-padding" placeholder="New Password" type="password" v-model="password"  v-validate:password ="'required|min:8'">
                <p class="text-danger" v-if="errors.has('password')">Password should have atleast 8 characters</p>
           </div>
         </div>
           <div class="form-group" :class="{'input': true, 'is-danger': errors.has('confirmPassword') }">
             <div class="col-md-12 reset-pwd-marg" >
               <input  name="confirmPassword" class="form-control reset-pwd-input-padding remove-padding" placeholder="Confirm New Password" type="password" v-model="confirmPassword"  v-validate:confirmPassword ="'required|min:8'">
                 <p class="text-danger" v-if="errors.has('confirmPassword')">Please re-enter new password </p>
           </div>
         </div>
            <div class="col-md-12 text-center reset-pwd-marg reset-pwd-margin-bottom">
                <button type="submit" class="btn  btn-block btn-login" v-touch-ripple>Update</button>
            </div>
         </div>
       </form>
     </div>
    </div>
  </div>
</div>
</div>


</template>

<script>
   import adminHeader  from "../../adminHeader.vue"
   import  PMSideBar  from "../../PMSideBar.vue";
   import ProductOwnerSidebar from "../../ProductOwnerSidebar.vue";
     import DeveloperSidebar from "../developer/DeveloperSidbar.vue";
   export default{
   data(){
   return{
      password:'',
      confirmPassword:'',
      oldPassword:'',
      errorMessage:'',
      errorMessage1:false,
      email:'',
      message:false,
    }
  },
     components: {
    'appAdminHeader':adminHeader,
    "app-pm-sidebar": PMSideBar,
    "app-product-owner-sidebar":ProductOwnerSidebar,
    "dev-sidebar":DeveloperSidebar
  },
    methods:{
    changePassword:function(){
                var app=this;
                app.$validator.validateAll();

               if(!app.errors.any()){


           if(app.password===app.oldPassword){
                  app.message = true;
                  app.errorMessage = "New password cannot be same as current password, please try again.";
                  setTimeout(function(){
                  app.message = false;
                   }, 3000);

                }
              else  if(app.password === app.confirmPassword){
                app.$http.post(app.$store.state.SERVER_URL+'/change-password',app.$data ,
                {
                headers: {
                "X-Authorization": app.$cookie.get('X-Authorization')
                },
                }).then(function(response){
                 console.log(response);

                 if(response.data.status === "SUCCESS"){
                   app.errorMessage1 = true;
                   setTimeout(function(){
                   app.errorMessage1 = false;
                   app.logout();
                 }, 5000);
                 }else{
                   app.message = true;
                   app.errorMessage = response.data.errorMessage;
                   setTimeout(function(){
                   app.message = false;
                    }, 3000);

               }
                  });
                  } else{
                  app.message = true;
                  app.errorMessage = 'New password & confirm password do not match, please try again.';
                  setTimeout(function(){
                  app.message = false;
                        }, 3000);
                }


              //  "Incorrect current password, please try again. ";
          }

          },
          logout(){
          var app = this;
           app.$store.commit('setDeveloperWizardStep', 1);
          var xAuth = app.$cookie.get('X-Authorization');
          app.$cookie.delete('X-Authorization');
          app.$cookie.delete('role');
          app.$cookie.delete('isMobileVerified');
          app.$cookie.delete('isEmailVerified');

           app.$store.commit('setLoggedInUser', {});
           app.$store.commit('setMobileNumber', {});
           app.$store.commit('setEmail', {});
           app.$store.commit('setWhiteListedChatUsers', []);
           app.$store.commit('setProjectInfo', {});

           app.$store.commit('setProjectTaskList', {});
           app.$store.commit('setBacklogList', {});
           app.$store.commit('setWorkInProgressList', {});
           app.$store.commit('setCompletedByDeveloperList', {});
           app.$store.commit('setVerifiedList', {});

           app.$store.commit('setDeveloperTaskList', {});
           app.$store.commit('setDeveloperBacklogList', {});
           app.$store.commit('setDeveloperWorkInProgressList', {});
           app.$store.commit('setDeveloperCompletedByDeveloperList', {});
           app.$store.commit('setDeveloperVerifiedList', {});



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

          $.ajax({
            url: this.$store.state.SERVER_URL+'/logout',
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            headers: {
              "X-Authorization": xAuth
            },
            dataType: "json",
            success: function(data){
              if(data.status === "SUCCESS"){
                app.$router.push('/login');
              }
            }
        });

      }

        }
     }
</script>
<style scoped>
.remove-padding{
  padding: inherit !important;
}
.content{
min-height: calc(100vh - 66px) !important;
}
</style>
