<template>
    <div >
      <link rel="stylesheet" href="/src/assets/css/intlTelInput.css">
     <link rel="stylesheet" href="/src/assets/css/demo.css">
        <appNavbar></appNavbar>
    <div class="container common_container" id="">
          <div class="content">

      <div class="alert  error-sign-up mht-50"  v-show="showError" role="alert">
        {{errorMessage}}
      </div>

       <div class="row po-signup">
           <div class="col-md-12">
                <div class="inner_div">

                        <!-- left side pannel-->
                        <div class="col-md-6 left_main_signup orange-panel">
                            <h3>Do you have <i>any</i> software requirement?</h3>

                            <h4 style="color: #e7714d">Your CEO just can't wait to help you!</h4>


                            <form class="form border-form" id="signup-form" @submit.prevent="signupForm" >
                                <!-- First input-->
                                <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('firstName') }">

                                  <!-- <label class="col-md-12 control-label" for="firstName">Name</label> -->

                                  <div class="col-md-12">
                                    <input placeholder="Name" name="firstName" type="text" class="form-control" v-model="firstName" v-validate:firstName ="'required'">
                                        <p class="text-danger" v-if="errors.has('firstName')">Please enter your name</p>
                                  </div>
                                </div>
                                <!-- Last input-->

                                <!-- company input-->
                                <!-- <div class="row form-group customform-group" >
                                  <label class="col-md-12 control-label" for="company Name">Company Name</label>
                                  <div class="col-md-12">
                                    <input  name="companyName" type="text" class="form-control" v-model="companyName">
                                  </div>
                                </div> -->

                                <!-- email input-->
                                <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('email') }">

                                  <!-- <label class="col-md-12 control-label" for="email">Email</label> -->

                                  <div class="col-md-12">
                                    <input placeholder="Email" name="email" type="text" class="form-control"  v-model="email" v-validate:email ="'required|email'" data-vv-delay="600">
                                        <p class="text-danger" v-if="errors.has('email')">Please enter a valid email</p>
                                  </div>
                                </div>
                                <!-- Password input-->
                                <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('password') }">

                                  <!-- <label class="col-md-12 control-label" for="password">Password</label> -->

                                  <div class="col-md-11 ">
                                    <span v-if="passwordTypePwd"> <input placeholder="Password (atleast 8 characters)" name="password" type="password" class="form-control" v-model="password" v-validate:password ="'required|min:8'"></span>
                                    <span v-else-if="textTypePwd">  <input  name="password" type="text" class="form-control" v-model="password" v-validate:password ="'required|min:8'"></span>
                                      <p class="text-danger" v-if="errors.has('password')">Password should have atleast 8 characters</p>
                                </div>
                                <div class="col-md-1 eye-left"><span @mouseover="changePasswordType(false)" @mouseleave="changePasswordType(true)" style="font-size: x-large">
                                <i class="fa fa-eye-slash" aria-hidden="true"></i>
                              </span></div>
                                </div>

                                 <!-- Conatct Number input-->
                                <!-- <div class="row form-group customform-group">
                                <label class="col-md-12 control-label" for="mobileNumber">Mobile No.</label>

                                  <div class="col-md-12">
                                    <input id="phone"   class="form-control" name="mobileNumber" v-model="mobileNumber" type="tel"  min="1" v-validate:mobileNumber ="'required|numeric'"/>
                                           <p class="text-danger" v-if="errors.has('mobileNumber')">Please enter your mobile no.</p>
                                  </div>
                              </div> -->


                                <!-- terms & conditions -->

                                <!-- <div class="row form-group customform-group">
                                 <div class="col-md-12 checkbox">
                                    <label class="checkbox"><input v-validate.isTermsAndConditionsAccepted ="'required'"  v-model="isTermsAndConditionsAccepted"  type="checkbox"  name="isTermsAndConditionsAccepted"> I agree to the <span>
                                      <router-link to="/terms-and-conditions" class="anc-login color-blue">Terms & Conditions.</router-link></span>
                                    </label>
                                      <p class="text-danger" v-show="errors.has('isTermsAndConditionsAccepted')">Please tick () 'Terms & Conditions' to proceed further.</p>
                                  </div>
                                </div> -->


                                  <div class="row">
                                    <div class="col-md-12">
                                       <vue-recaptcha
                                           @verify="onVerify"
                                           @expired="onExpired"
                                           ref="recaptcha"
                                            :sitekey="sitekey"
                                           class="">
                                       </vue-recaptcha>
                                  </div>
                                  <!-- <div class="col-md-3">
                                     <button type="button" name="button" @click="resetRecaptcha">Reset Captcha</button>
                                </div> -->
                                  <p class="text-danger" v-if="isCaptchaChecked">Please verify you're a human !</p>
                                  </div>
                               <div class="row">
                                 <br>
                                 <div class="col-md-12">
                                   <button type="submit" class="cursor-pointer btn btn-orange btn-getstarted" v-touch-ripple> Create your project </button>
                                  </div>
                                </div>
                            </form>
                        </div>
                        <!-- left side pannel-->
                        <!-- right side pannel-->
                        <div class="col-md-6 right_main_signup text-center">
                          <div class="row">
                              <div class="col-md-6 col-md-offset-3">

                                  <g-signin-button
                                       :params="googleSignInParams"
                                       @success="onSignInSuccess"Sign in with GoogleSign in with Google
                                       Sign in with Google
                                       @error="onSignInError"  class="loginBtn loginBtn--google login-text-center g-border-r">
                                       Signup with Google
                                  </g-signin-button>

                              </div>
                          </div>
                                <h4 class="header-or">or</h4>
                                <div class="row">
                                  <div class="col-md-6 col-md-offset-3">
                                    <!-- <button type="button" class="btn btn-facebook btn-block">
                                      <span><i class="fa fa-facebook"></i></span>
                                      Signup with Facebook
                                    </button> -->
                                    <fb-signin-button
                                       :params="fbSignInParams"
                                       @success="onSignInFbSuccess"
                                       @error="onSignInFbError"  class="loginBtn loginBtn--facebook  login-text-center g-border-r">
                                        Signup with Facebook
                                     </fb-signin-button>
                                  </div>
                                </div>

                        </div>
                        <!-- right side pannel-->

                    <div class="row ">
                        <div class="col-md-12 div_topmargin text-center">
                            <p>Signedup Already? <span><router-link to="/login" class="anc-login color-blue">Login</router-link></span></p>
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
    import VueRecaptcha from 'vue-recaptcha';

    export default {
        data() {
            return {
                isCaptchaChecked:false,
                captchaResponse:'',
                sitekey:this.$store.state.GOOGLE_CAPTCHA_ID,
                display: true,
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                companyName: '',
                country: '',
                mobileNumber: '',
                internationalCallingCode:'',
                iso2:'',
                countryId: '',
                isTermsAndConditionsAccepted: true,
                passwordTypePwd: true,
                textTypePwd: false,
                countryList: [],
                imageUrl:'',
                showError:false,
                errorMessage:'',
                loading:false,
                enableButton:false,
                googleSignInParams: {
                client_id: this.$store.state.GOOGLE_CLIENT_ID
                },
                fbSignInParams: {
                       scope: 'email,public_profile',
                      return_scopes: true
                }
            }

        },
        created : function(){
              // $.getScript('/src/assets/js/intlTelInput.js');
              // $.getScript('/src/assets/js/country.js');


              if((this.$cookie.get('X-Authorization') != null) && (this.$cookie.get('role') != null)){
                var app =this;
                app.errors.clear()
                  this.$router.push('/post-login');
              }


        },

        methods: {

          onSignInFbSuccess (response) {

           this.facebookSignUp(response.authResponse.accessToken);
          },
          onSignInFbError (error) {
            console.log('OH NOES', error)
          },

          onSubmit: function () {
             console.log("on submit executing------------")
             this.$refs.invisibleRecaptcha.execute()
           },
           onVerify: function (response) {
             console.log(response)
             var app = this;
             app.isCaptchaChecked = false;
             app.captchaResponse = response;
           },
           onExpired: function () {
             console.log('Expired')
           },
           resetRecaptcha () {
             var app = this;
             app.$refs.recaptcha.reset() // Direct call reset method
           },
          onSignInSuccess (googleUser) {

            var app = this;
            app.googleIdToken = googleUser.getAuthResponse().id_token;
            console.log(app.googleIdToken);
            if(app.googleIdToken && app.googleIdToken.length != 0){
              app.googleSignUp();
            }
          },

             onSignInError (error) {
               // `error` contains any error occurred.
               console.log("googleSignInParams == "+app.googleSignInParams)
               console.log('OH NOES', error)
             },
            changePasswordType: function(show) {
                this.passwordTypePwd = show;
                this.textTypePwd = !show;
            },

            facebookSignUp(accessToken){
              var app = this;
              app.$store.commit('setSpinner',true);
              app.enableButton=true;
              app.$http.post(
                app.$store.state.SERVER_URL + '/new-po-facebook-signup',
                accessToken
            ).then(function(result){
                  app.enableButton=false;
                      if (result.data.status === "SUCCESS") {
                          app.$store.commit('setLoggedInUser' , result.data.payLoad);
                          app.$store.commit('setEmail' , result.data.payLoad.email);
                          app.$store.commit('setMobileNumber' , result.data.payLoad.mobileNumber);

                          app.$cookie.set('X-Authorization', result.data.payLoad.xAuth, 1);
                          app.$cookie.set('role', result.data.payLoad.role, 1);
                          app.$router.push('/product-owner/dashboard');
                      } else {
                        app.showError = true;
                        app.errorMessage = result.data.errorMessage
                        setTimeout(()=>{
                            app.showError = false;
                        },2000)
                      }
                      app.$store.commit('setSpinner',false);
            })
          },

            googleSignUp(){
              var app = this;
              app.$store.commit('setSpinner',true);
              app.enableButton=true;
              app.$http.post(
                app.$store.state.SERVER_URL + '/new-po-google-signup',
                app.googleIdToken
            ).then(function(result){
                  app.enableButton=false;
                      if (result.data.status === "SUCCESS") {
                          app.$store.commit('setLoggedInUser' , result.data.payLoad);
                          app.$store.commit('setEmail' , result.data.payLoad.email);
                          app.$store.commit('setMobileNumber' , result.data.payLoad.mobileNumber);

                          app.$cookie.set('X-Authorization', result.data.payLoad.xAuth, 1);
                          app.$cookie.set('role', result.data.payLoad.role, 1);
                          app.$router.push('/product-owner/dashboard');
                      } else {
                        app.showError = true;
                        app.errorMessage = result.data.errorMessage
                        setTimeout(()=>{
                            app.showError = false;
                        },2000)
                      }
                      app.$store.commit('setSpinner',false);
            })
          },
            signupForm: function(e) {
                e.preventDefault();
                var app = this;
                app.$validator.validateAll();
                if(app.captchaResponse != '' && app.captchaResponse != null){

                if (this.email && this.password) {

                    // var countryCode = $(".selected-dial-code").text();

                    // app.internationalCallingCode = countryCode;
                    // app.iso2 = $(".country[class*='highlight']").attr("data-country-code");
                    if (!app.errors.any()) {
                      app.loading = true;
                        app.$store.commit('setSpinner',true);
                        app.enableButton=true;
                        app.$http.post(
                          app.$store.state.SERVER_URL + '/new-po',
                          app.$data
                      ).then(function(result){
                            app.loading = false;
                            app.enableButton=false;
                               console.log(result);
                                if (result.data.status === "SUCCESS") {
                                    app.$store.commit('setSpinner',false);
                                    app.$store.commit('setLoggedInUser' , result.data.payLoad);
                                    app.$store.commit('setEmail' , result.data.payLoad.email);
                                    app.$store.commit('setMobileNumber' , result.data.payLoad.mobileNumber);

                                    app.$cookie.set('X-Authorization', result.data.payLoad.xAuth, 1);
                                    app.$cookie.set('role', result.data.payLoad.role, 1);
                                    // app.$cookie.set('isMobileVerified', result.data.payLoad.isMobileVerified, 1);
                                    // app.$cookie.set('isEmailVerified', result.data.payLoad.isEmailVerified, 1);
                                    app.$store.commit('setLoggedInUser', result.data.payLoad);
                                    app.$router.push('/product-owner/dashboard');
                                } else {
                                    app.showError = true;
                                    app.enableButton=false;

                                  app.$store.commit('setSpinner',false);
                                  app.errorMessage = result.data.errorMessage;
                                  setTimeout(function(){
                                      app.showError = false;
                                  }, 5000);
                                }
                                app.captchaResponse = '';
                                // app.isCaptchaChecked = false;
                        });
                    }

                }
              }else{
                app.isCaptchaChecked = true;
            }
            }
        },
        components: {
            appNavbar: Navbar,
            VueRecaptcha
        }
    }

</script>


<style scoped>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}
.eye-left{
  margin-left: -14px;
  color:#000000;
  background-color: #fff;
  background-image: none;
}
.inner_div{
  margin-top: 168px;
}
.right_main_signup{
  margin-top: 11%;
}

/*.container {
padding-bottom: 15px !important;
}*/
.common_container{
  margin-top: -2px !important;
}
.content{
    min-height: calc(97vh - 101px)!important;
}
</style>
