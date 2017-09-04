<template>
    <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
      <app-adminSidebar></app-adminSidebar>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">

        </section>

        <!-- Main content -->
        <section class="content">
            <div >
        <div class="alert  inspirage-danger" style="display:none" v-show="errorMessage" role="alert">
                <strong>Error</strong> Please Check your the Verification Code
        </div>
        <div class="">
                <div class="row">


                <div class="col-md-6">
                    <div class="panel panel-default verify-panel">
                        <div class="panel-body verify-body">
                            <div class="text-center img-div-padding">
                                <img src="./assets/images/emailicon.png" class="img-responsive img-inline" alt="mobile">
                            </div>
                            <h5 class="header-mobile text-center">Email Verification</h5>
                            <div class="text-center email-verify-padding">
                                <div v-if="isEmailVerified">
                                <p class="header-para" style="color: #90EE90; font-size: 40px;"><i class="fa fa-check" aria-hidden="true"></i></p>
                                </div>
                                <div v-else>
                                  <span v-if="this.$store.getters.getLoggedInUser.role=='DEVELOPER'">
                                    <span  v-if="this.$store.getters.getLoggedInUser.developerType=='INTERNAL'">
                                    </span>
                                    <span v-else>
                                       <p class="header-para">Please click on the verification link mailed to <b>{{this.$store.getters.getLoggedInUser.email}}</b>
                                       </p>
                                    </span>

                              </span>
                              <span v-else>
                            <p class="header-para">Please click on the verification link mailed to <b>{{this.$store.getters.getLoggedInUser.email}}</b>
                            </p>
                          </span>
                                <p class="header-para">
                                <a style="cursor: pointer;" @click="resendEmailVerfication" v-if="!isEmailVerified">resend email</a>
                                |
                                <router-link to="/developer/profile">change email</router-link>
                                </p>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>

                    <div class="col-md-6">
                        <div class="panel panel-default verify-panel">
                            <div class="panel-body verify-body moble-verify-padding">
                                <div class="text-center img-div-padding">
                                    <img src="./assets/images/verificaction_mobile.png" class="img-responsive img-inline" alt="mobile">
                                </div>
                                  <h5 class="header-mobile text-center header-mobile-padding">Mobile Verification</h5>
                                <div class="text-center emailVerifyPadd">

                                <div v-if="isMobileVerified">
                                <p class="header-para" style="color: #90EE90; font-size: 49px; "><i class="fa fa-check" aria-hidden="true"></i></p>
                                </div>
                                <div v-else>
                                    <span v-if="this.$store.getters.getLoggedInUser.role=='DEVELOPER'">
                                      <p class="header-para">Please enter the verification code messaged to <b>{{this.$store.getters.getLoggedInUser.internationalCallingCode+this.$store.getters.getLoggedInUser.mobileNumber}}</b>  <router-link to="/developer/profile">Change</router-link></p>
                                    </span>
                                    <span v-else>
                                        <p class="header-para">
                                        Please enter the verification code messaged to <b>{{this.$store.getters.getLoggedInUser.internationalCallingCode+this.$store.getters.getLoggedInUser.mobileNumber}}</b>
                                        </p>
                                      </span>


                                </div>

                                </div>

                                <div v-if="!isMobileVerified">
                                <form class="" id="verify_mobile"   @submit.prevent="verifymobileForm('verifymobile-form')" role="form" data-vv-scope="verifymobile-form">
                                          <div class="row">
                                            <div class="col-md-12">
                                            <div class="form-group verifyEmail">
                                                <div class="col-md-5 col-md-offset-2" :class="{'input': true, 'is-danger': errors.has('verifymobile-form.verifymobile')}">
                                                    <input type="text" class="form-control"  name="verifymobile" v-model="verifymobile" placeholder="Verification Code"  v-validate:verifymobile ="'required'">
                                                    <p class="text-danger" v-if="errors.has('verifymobile-form.verifymobile')">Please enter verification code</p>
                                                </div>
                                                <div class="col-md-3">
                                                    <button type="submit" class="btn btn-orange form-control" >Verify</button>
                                                </div>
                                            </div>
                                          </div>
                                          </div>


                                </form>

                                  <div class="col-md-offset-4">
                                  <p class="header-para">

                                    <a style="cursor: pointer;" @click="resendMobileCode()" v-show="!isMobileVerified">resend code</a>
                                    |
                                    <router-link style="cursor: pointer;" to="/profile">change number</router-link>

                                  </p>
                                  </div>

                                </div>


                            </div>
                        </div>
                    </div>


                </div>



            </div>

                </div>
          <!-- Your Page Content Here -->
        </section>
        <!-- /.content -->
      </div>
      <!-- /.content-wrapper -->





      <!-- Add the sidebar's background. This div must be placed
           immediately after the control sidebar -->
      <div class="control-sidebar-bg"></div>
    </div>
</template>


<script>
import  adminHeader  from "./adminHeader.vue"
import  adminSidebar  from "./adminSidebar.vue"

    export default {
        data(){
          return{
              errorMessage:false,
              verifymobile:''
          }
        },
        mounted:function(){

                //  this.isEmailVerified();
                //  this.isMobileVerified();

        },
        created:function(){
          if(!(this.$store.getters.getLoggedInUser && this.$store.getters.getLoggedInUser.isEmailVerified && this.$store.getters.getLoggedInUser.isMobileVerified)){
            this.checkUserVerification()
          }
        },
        computed:{

          // isEmailVerified: function(){
          //   if(this.$cookie.get('isEmailVerified') && this.$cookie.get('isEmailVerified').localeCompare('true')==0){
          //     return true;
          //   }
          //   else{
          //     return false;
          //   }
          // },

          isEmailVerified: function(){
            return this.$store.getters.getLoggedInUser.isEmailVerified;
          },

          isMobileVerified: function(){
            return this.$store.getters.getLoggedInUser.isMobileVerified;

            // if(this.$cookie.get('isMobileVerified') && this.$cookie.get('isMobileVerified').localeCompare('true')==0){
            //   return true;
            // }else{
            //   return false;
            // }
          },

        },
        methods:{

          // isEmailVerified: function(){
          //   if(this.$cookie.get('isEmailVerified') && this.$cookie.get('isEmailVerified').localeCompare('true')==0){
          //     return true;
          //   }
          //   else{
          //     return false;
          //   }
          // },
          //
          // isMobileVerified: function(){
          //   if(this.$cookie.get('isMobileVerified') && this.$cookie.get('isMobileVerified').localeCompare('true')==0){
          //     return true;
          //   }else{
          //     return false;
          //   }
          // },

          resendMobileCode: function(){

              var app = this;
                app.$store.commit('setSpinner',true);
              app.$http.get(
              this.$store.state.SERVER_URL+'/resend-mobile-confirmation-key' ,
                  {
                    headers:{
                        'X-Authorization':app.$cookie.get('X-Authorization')
                    }
                  }
              ).then(function(response){
                  console.log(response);
                  if(response.data.status === "SUCCESS"){
                      app.$store.commit('setSpinner',false);
                    app.$swal("Message has been Resent!")
                     }else{
                          app.$swal("Something went wrong")
                     }
              })

          },

              resendEmailVerfication: function(){

              var app = this;
                app.$store.commit('setSpinner',true);
              app.$http.get(
              this.$store.state.SERVER_URL+'/resend-email-confirmation-key' ,
                  {
                    headers:{
                        'X-Authorization':app.$cookie.get('X-Authorization')
                    }
                  }
              ).then(function(response){
                  console.log(response);
                  if(response.data.status === "SUCCESS"){
                      app.$store.commit('setSpinner',false);
                      app.$swal("Email has been Resent!")
                     }else{
                          app.$swal("Something went wrong")
                     }
              })

          },

  // methods call for moblie verfication
          verifymobileForm(scope){
              var app = this;

              app.$validator.validateAll(scope)
              console.log(app.errors.any()+"   "+app.$cookie.get('X-Authorization'))
               if(!app.errors.any()){

                   app.$store.commit('setSpinner',true);
                app.$http.get(
                 app.$store.state.SERVER_URL+'/verify-mobile-confirmation-key/'+app.verifymobile ,

                  {
                    headers: {
                      "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
                    },
                  },
               ).then(function(response) {
                 console.log(response)
                   if(response.data.status === "SUCCESS"){
                       app.$store.commit('setSpinner',false);
                      //  var AppUser = app.$store.getters.getLoggedInUser;
                      //  AppUSer.isMobileVerified = response.data.payLoad.isMobileVerified;
                      //   app.$store.commit('setLoggedInUser',AppUser);
                      //console.log("data.payLoad.isMobileVerified"+response.data.payLoad.isMobileVerified);
                      app.$cookie.set('isMobileVerified',response.data.payLoad.isMobileVerified, 1);
                      app.$store.commit('setLoggedInUserMobileStatus', response.data.payLoad.isMobileVerified);

                      if(app.isEmailVerified){
                        app.$router.push('/post-login');
                      }

                      //app.$router.push('/verify-user');
                      //location.href = '/verify-user';
                   }else{
                       app.$store.commit('setSpinner',false);
                       app.errorMessage = true;
                        setTimeout(function(){
                           app.errorMessage = false;
                       }, 3000);
                    }
               });
             }
      } ,

            //method for Resent EmailVerificationCode
            checkUserVerification(){
            var app = this;
            app.$http.get(app.$store.state.SERVER_URL+'/verifyUser',
            {
              headers:{
                  'X-Authorization':app.$cookie.get('X-Authorization')
              }
            }
          ).then(function(response){
            app.$cookie.set('X-Authorization',response.data.payLoad.xAuth, 1);
            app.$cookie.set('role',response.data.payLoad.role, 1);
            app.$cookie.set('isMobileVerified',response.data.payLoad.isMobileVerified, 1);
            app.$cookie.set('isEmailVerified',response.data.payLoad.isEmailVerified, 1);
            app.$store.commit('setLoggedInUser', response.data.payLoad);
          //  app.$cookie.set('isDeveloperEligible',response.data.payLoad.isDeveloperEligible, 1);

            if(response.data.payLoad.isEmailVerified && response.data.payLoad.isMobileVerified){

              if(response.data.payLoad.role === 'PRODUCT_OWNER'){
                   app.$router.push('/product-owner/dashboard');
             }
             else if(response.data.payLoad.role === 'PROJECT_MANAGER'){
                      app.$router.push('/ceo/dashboard');
             }
             else if(response.data.payLoad.role === 'ADMIN'){
                  app.$router.push('/admin/dashboard');
             }
             else if(response.data.payLoad.role === 'DEVELOPER'){
                  app.$router.push('/developer/dashboard');
             }
         }
          })
        },



        },
      components:{
            "app-adminHeader":adminHeader,
            "app-adminSidebar":adminSidebar
        }
    }
</script>
