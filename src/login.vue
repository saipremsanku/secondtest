
<template>
<div>
  <appNavbar></appNavbar>
  <div class="container">
    <div class="content">
        <div class="row loginMain" id="loginForm">
            <div class="alert  inspirage-danger" style="display:none" v-show="message" role="alert">
            {{errorMessage}}
            </div>
            <div class="logincontent text-center" >
                <div class="col-md-12 logincontent-right login-inner" >
                  <!-- <h3>Workfall</h3> -->
                    <img src="/src/assets/images/platform_Artboard 5.png" class="img-responsive login-logo" alt="logo image">
                  <!-- <img src="./assets/images/login.png" alt="platform" class="img-responsive login-logo"> -->
                    <div class="form-horizontal">

                        <div class="form-group" :class="{'input': true, 'is-danger': errors.has('email') }">
                          <div class="col-md-12" >
                              <input id="prependedtext" name="email" class="form-control" placeholder="Email" type="text" v-model="email" v-validate:email ="'required'" >
                              <p class="text-danger" v-if="errors.has('email')">Please enter your email</p>
                          </div>
                        </div>

                        <div class="form-group" :class="{'input': true, 'is-danger': errors.has('password') }">
                          <div class="col-md-12" >
                              <input id="" name="password" class="form-control" placeholder="Password" type="password" v-model="password" @keyup.enter="login" v-validate:password ="'required'">
                               <p class="text-danger" v-if="errors.has('password')">Please enter your password</p>
                          </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <button type="submit" class="btn btn-login btn-block" :disabled="enableButton" v-touch-ripple @click="login()">Login</button>
                                <!-- <button v-touch-ripple>check me!</button> -->
                            </div>
                        </div>

                        <div class="row login-head">
                          <div class="col-md-12">
                          <h2><span class="login-or">OR</span></h2>
                        </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                          <g-signin-button
                               :params="googleSignInParams"
                               @success="onSignInSuccess" Sign in with GoogleSign in with Google
                               Sign in with Google
                               @error="onSignInError"  class="loginBtn loginBtn--google login-text-center">
                               Login with Google
                          </g-signin-button>
                        </div>
                        <!-- <div class="row login-head">
                          <div class="col-md-12">
                          <h2><span class="login-or">OR</span></h2>
                        </div>
                        </div> -->
                        <div class="col-md-6">
                        <fb-signin-button
                           :params="fbSignInParams"
                           @success="onSignInFbSuccess"
                           @error="onSignInFbError"  class="loginBtn loginBtn--facebook  login-text-center g-border-r">
                            Login with Facebook
                         </fb-signin-button>
                        </div>
                        </div>


                        <div class="row">
                            <div class="col-md-6 hidden">
                              <div class="checkbox margintop-0">
                                <label for="checkboxes-0">
                                  <input type="checkbox" name="checkboxes" id="checkboxes-0" value="1">
                                  Remember Me
                                </label>
                                </div>
                              </div>
                            <div class="col-md-6 col-xs-6 text-left">
                                <router-link to="/product-owner/sign-up" class="anc-frtpassword" >Sign Up</router-link>
                             </div>
                            <div class="col-md-6 col-xs-6 text-right">
                                <router-link to="/forgot-password" class="anc-frtpassword" v-on:click=''>Forgot Password</router-link>
                              </div>

                        </div>



                    </div>
                </div>
            </div>
        </div>
      </div>
     </div>
</div>

</template>






<script>


    import Navbar from './Navbar.vue';


    export default {
        data(){
          return{
            enableButton:false,
              message:false,
              errorMessage:'',
              email:'',
              password:'',
              googleIdToken:'',
              googleSignInParams: {
              client_id: this.$store.state.GOOGLE_CLIENT_ID
           },
           fbSignInParams: {
                  scope: 'email,public_profile',
                 return_scopes: true
           }
          }
        },
        created: function () {
              // $.getScript('/src/assets/js/scroll.js');
            //  console.log("coll the login vue--------------");
            if((this.$cookie.get('X-Authorization') != null) && (this.$cookie.get('role') != null)){
              var app =this;
              app.errors.clear()
                this.$router.push('/post-login');
            }
            this.$store.commit('setForgotEmail','');

        },
        methods:{
          onSignInFbSuccess (response) {

           this.facebookLogin(response.authResponse.accessToken);
          },
          onSignInFbError (error) {
            console.log('OH NOES', error)
          },

          onSignInSuccess (googleUser) {

              //console.log("===========================")
              var app = this;
             app.googleIdToken = googleUser.getAuthResponse().id_token;
            // console.log(app.googleIdToken);
             app.googleLogin()
             },
             onSignInError (error) {
              //  console.log("googleSignInParams == "+app.googleSignInParams)
              //  console.log('OH NOES', error)
             },
             facebookLogin(accessToken){
               var app =this;
                app.$store.commit('setSpinner',true);
               app.$http.post(
                 app.$store.state.SERVER_URL+'/facebook-login',
                 accessToken,
               ).then(function(response){
                app.settingLoginData(response)
               });
             },
             googleLogin(){
               var app =this;
                app.$store.commit('setSpinner',true);
               app.$http.post(
                 app.$store.state.SERVER_URL+'/google-login',
                 app.$data,
               ).then(function(response){
                //   console.log("google login ==================")
                //  console.log(response)
                app.settingLoginData(response)
               });
             },
            login: function(){
                $.getScript('/src/assets/js/scroll.js');
                var app = this;
              //  console.log('entger')

               app.$validator.validateAll();
        if (!app.errors.any()) {
                app.$store.commit('setSpinner',true);
                app.enableButton=true;
                app.$http.post(
                  app.$store.state.SERVER_URL+'/login',
                  app.$data,
                ).then(function(response){
                //  console.log(response)
                  app.settingLoginData(response)
                });
                }
            },
            settingLoginData(response){
              var app = this;
              if(response.data.status === "SUCCESS"){
                if(response.data.payLoad.role=='DEVELOPER'){
                         app.$store.commit('setDeveloperWizardStep', 1);
                }
                   //app.$store.commit('setSpinner',false);
                   app.enableButton=false;
                  app.$cookie.set('X-Authorization',response.data.payLoad.xAuth, 1);
                  app.$cookie.set('role',response.data.payLoad.role, 1);
                  app.$cookie.set('isMobileVerified',response.data.payLoad.isMobileVerified, 1);
                  app.$cookie.set('isEmailVerified',response.data.payLoad.isEmailVerified, 1);
                  app.$store.commit('setLoggedInUser', response.data.payLoad);
                  app.$store.commit('setChatUser', {'id':'', 'firstName':'', 'lastName':'', 'email':''});
                  app.$store.commit('setNotificationList' ,response.data.payLoad.notificationList);
                  // app.$cookie.set('isDeveloperEligible',response.data.payLoad.isDeveloperEligible, 1);
                  if(response.data.payLoad.role=='PRODUCT_OWNER'){
                           app.$store.commit('setIsPoHavingManagerForProjectLead',response.data.payLoad.isPoHavingManagerForProjectLead);
                           console.log("having PO-----",response.data.payLoad.isPoHavingManagerForProjectLead);
                           if(response.data.payLoad.isPoHavingManagerForProjectLead){
                            //  drift.on('ready',function(api){
                       		// 		api.widget.hide();
                       		// 	});
                           }
                          app.$router.push('/product-owner/dashboard');

                  }else{
                      app.$router.push('/post-login');
                  }

              } else {
                  app.message = true;
                  app.errorMessage = response.data.errorMessage;
                  setTimeout(function(){
                      app.message = false;
                      app.enableButton=false;
                  }, 4000);
              }
              app.$store.commit('setSpinner',false);
            }


        },
      components:{
            appNavbar:Navbar
        }
    }
</script>

<style scoped="true">
    .text-danger {
    color: #a94442 !important;
}
.loginBtn{
  width: 101%;
}
.login-inner{
  width:501px;
}
.login-logo, .register-logo {
    font-size: 35px;
    text-align: center;
    margin-bottom: 12px;
    font-weight: 300;
}

.container {
padding-bottom:0px !important;
}
.container{
  margin-top: 0px !important;
}
.content{
    min-height: calc(96vh - 79px)!important;
}

</style>
