<template>
    <div >
      <link rel="stylesheet" href="/src/assets/css/intlTelInput.css">
     <link rel="stylesheet" href="/src/assets/css/demo.css">
        <appNavbar></appNavbar>
    <div class="container common_container" id="">
      <div class="alert  inspirage-danger error-sign-up"  v-show="showError" role="alert">
        {{errorMessage}}
      </div>
       <div class="row">
           <div class="col-md-12">
                <div class="inner_div">

                        <!-- left side pannel-->
                        <div class="col-md-6 left_main_signup orange-panel">
                            <h3 class="dev-heading-bg-col">SignUp <small class="dev-heading-bg-col">as a Developer</small></h3>

                            <form class="form border-form" id="signup-form" @submit.prevent="signupForm" >
                                <!-- First input-->
                                <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('firstName') }">
                                  <label class="col-md-12 control-label" for="First Name">First Name</label>
                                  <div class="col-md-12">
                                    <input  name="firstName" type="text" class="form-control" v-model="firstName" v-validate:firstName ="'required'">
                                        <p class="text-danger" v-if="errors.has('firstName')">Please enter your first name</p>
                                  </div>
                                </div>
                                <!-- Last input-->
                                <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('lastName') }">
                                  <label class="col-md-12 control-label" for="Last Name">Last Name</label>
                                  <div class="col-md-12">
                                    <input  name="lastName" type="text" class="form-control" v-model="lastName" v-validate:lastName ="'required'">
                                         <p class="text-danger" v-if="errors.has('lastName')">Please enter your last name</p>
                                  </div>
                                </div>

                                <!-- email input-->
                                <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('email') }">
                                  <label class="col-md-12 control-label" for="email">Email</label>
                                  <div class="col-md-12">
                                    <input  name="email" type="text" class="form-control"  v-model="email" v-validate:email ="'required|email'">
                                        <p class="text-danger" v-if="errors.has('email')">Please enter a valid email</p>
                                  </div>
                                </div>

                                   <!-- Password input-->
                                <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('password') }">
                                  <label class="col-md-12 control-label" for="Password">Password</label>



                                    <div class="col-md-11">
                                      <input v-show="passwordTypePwd" name="password" type="password" class="form-control" v-model="password" v-validate:password ="'required|min:8'" data-vv-delay="600">

                                      <input v-show="textTypePwd" name="password" type="text" class="form-control" v-model="password" v-validate:password ="'required|min:8'" data-vv-delay="600">
                                        <p class="text-danger" v-if="errors.has('password')">Password should have atleast 8 characters</p>
                                    </div>

                                    <div @mouseover="changePasswordType(false)" @mouseleave="changePasswordType(true)" style="font-size: x-large">
                                    <i class="fa fa-eye-slash" aria-hidden="true"></i>
                                    </div>



                                </div>

                                <!-- Conatct Number input-->
                               <div class="row form-group customform-group">
                               <label class="col-md-12 control-label" for="mobileNumber">Mobile Number</label>

                                 <div class="col-md-12">
                                   <input id="phone"   class="form-control" name="mobileNumber" v-model="mobileNumber" type="tel" min="1"  v-validate:mobileNumber ="'required|numeric'"/>
                                          <p class="text-danger" v-if="errors.has('mobileNumber')">Please enter your mobile no.</p>
                                 </div>
                             </div>


                                <!-- terms & conditions -->
                                <div class="row form-group customform-group">
                                 <div class="col-md-12 checkbox" :class="{'checkbox': true, 'is-danger': errors.has('isTermsAndConditionsAccepted') }">
                                    <label><input name="isTermsAndConditionsAccepted" v-model="isTermsAndConditionsAccepted" v-validate.isTermsAndConditionsAccepted ="'required'"  type="checkbox"> I agree to the <span><router-link to="/terms-and-conditions" class="anc-login color-blue">Terms & Conditions.</router-link></span></label>
                                     <p class="text-danger" v-show="errors.has('isTermsAndConditionsAccepted')">Please tick () 'Terms & Conditions' to proceed further.</p>
                                  </div>
                                </div>

                                <div class="row">
                                 <div class="col-md-12">
                                   <button type="submit" class="btn btn-blue btn-getstarted" >Get Started</button>
                                  </div>
                                </div>
                            </form>
                        </div>
                        <!-- left side pannel-->
                        <!-- right side pannel-->
                        <div class="col-md-6 right_main_signup text-center">
                          <div class="row">
                              <!-- <div class="col-md-6 col-md-offset-3">
                                      <button type="button" class="btn btn-google btn-block">
                                      <span><i class="fa fa-google-plus" aria-hidden="true"></i>
                                      </span>
                                      Signup with Google
                                  </button>
                              </div> -->
                              <div class="col-md-6 col-md-offset-3 .btn-facebook">
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
                                    <button type="button" class="btn btn-facebook btn-block">
                                      <span><i class="fa fa-facebook"></i></span>
                                      Signup with Facebook
                                    </button>
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
</template>
<script>
    import Navbar from '../../Navbar.vue';
    export default {
        data(){
          return{
              display:true,
              email:'',
              password:'',
              firstName:'',
              lastName:'',
              passwordTypePwd: true,
              textTypePwd: false,
              companyName:'',
               country:'',
               iso2:'',
               isTermsAndConditionsAccepted:false,
              countryIsoCode:'',
              mobileNumber:'',
              internationalCallingCode:'',
              countryId:'',
              countryList:[],
              errorMessage:'',
              showError:false,
              googleIdToken:'',
              googleSignInParams: {
              client_id: this.$store.state.GOOGLE_CLIENT_ID
              },
          }
        },
        created : function(){
              $.getScript('/src/assets/js/intlTelInput.js'); // calling the wizard js when component load
               $.getScript('/src/assets/js/country.js'); // calling the wizard js when component load
 //               $.ajaxPrefilter(function( options, original_Options, jqXHR ) {
 //     options.async = true;
 // });


 if((this.$cookie.get('X-Authorization') != null) && (this.$cookie.get('role') != null)){
   var app =this;
   app.errors.clear()
     this.$router.push('/post-login');
 }


},
         mounted:function(){
        },
        methods:{
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
             myFunction(){
               console.log( this.country)
                this.countryIsoCode = this.country.isoCode;
                this.countryId = this.country.id;
            },
             changePasswordType: function(show){
            this.passwordTypePwd = show;
            this.textTypePwd = !show;
          },
      googleSignUp(){
            var app = this;
            app.$store.commit('setSpinner',true);
            app.enableButton=true;
            app.$http.post(
              app.$store.state.SERVER_URL + '/new-developer-google-signup',
              app.googleIdToken
          ).then(function(result){
                app.enableButton=false;
                    if (result.data.status === "SUCCESS") {
                        app.$store.commit('setLoggedInUser' , result.data.payLoad);
                        app.$store.commit('setEmail' , result.data.payLoad.email);
                        app.$store.commit('setMobileNumber' , result.data.payLoad.mobileNumber);

                        app.$cookie.set('X-Authorization', result.data.payLoad.xAuth, 1);
                        app.$cookie.set('role', result.data.payLoad.role, 1);
                        app.$router.push('/developer/dashboard');
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

          signupForm: function(e){
              var app = this;
                app.$validator.validateAll();
              if(app.email && app.password){
                var countryCode = $(".selected-dial-code").text();
                app.internationalCallingCode = countryCode;
                app.iso2 = $(".country[class*='highlight']").attr("data-country-code");
                app.$store.commit('setSpinner',false);
                  var dataObj = $('#signup-form').serializeArray().reduce(function(obj, item) {
                    obj[item.name] = item.value;

                    return obj;
                }, {});
        if (!app.errors.any()) {
          dataObj.internationalCallingCode = app.internationalCallingCode;
          dataObj.iso2=app.iso2;
          dataObj.isTermsAndConditionsAccepted = app.isTermsAndConditionsAccepted;
              $.ajax({
               url: this.$store.state.SERVER_URL+'/save-new-developer',
               type: 'POST',
               async : false,
                contentType: "application/json; charset=utf-8",
               data: JSON.stringify(dataObj),
               success: function(result) {
                  if(result.status === "SUCCESS"){
                    console.log('------------------------------------------------------------');
                      console.log(result);
                      app.$cookie.set('X-Authorization',result.payLoad.xAuth, 1);
                      app.$cookie.set('role',result.payLoad.role, 1);
                      app.$cookie.set('isMobileVerified',result.payLoad.isMobileVerified, 1);
                      app.$cookie.set('isEmailVerified',result.payLoad.isEmailVerified, 1);
                      app.$store.commit('setLoggedInUser', result.payLoad);
                      app.$router.push('/verify-user');
                  }
                  else{

                     console.log(result);
                     app.showError = true;
                     app.errorMessage = result.errorMessage;
                     setTimeout(function(){
                         app.showError = false;
                     }, 5000);
                  }
                }
            });
        }
        }

            }
        },
      components:{
          appNavbar:Navbar
      }
    }
</script>
