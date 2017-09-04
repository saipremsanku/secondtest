<template>
<div>
  <appNavbar></appNavbar>
  <div class="container">
  <div class="content">
    <div class="row loginMain" id="loginForm">
       <div class="alert  inspirage-danger" style="display:none" v-show="message" role="alert">
        <!-- <strong>Error</strong> Please Check your the Credientials -->
      {{this.errorMessage}}
      </div>
      <div class="forgot-password-content reset-password-design">
       <div class="email-service">
        <p class="text-center reset-password-heading">Forgot Password </p>
            <!-- <div class="email-service-content">
             <span class="">Enter your registered ID to reset your password.</span>
          </div> -->
          <form class="form-horizontal" @submit.prevent="forgoetPassword">
            <div class="rest-password">
            <div class="text-center">
            <p>Please enter your email address.The reset link will be emailed to you if Workfall recognizes your email.</p>
            </div>
            <div class="form-group" :class="{'input': true, 'is-danger': errors.has('email') }">
              <div class="col-md-12">
                <input id="prependedtext" name="email" class="form-control" placeholder="Email" type="text" v-model="email" v-validate:email="'required|email'">
                <p class="text-danger" v-if="errors.has('email')">Please enter your email</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <button type="submit" class="btn btn-login btn-block" v-touch-ripple>Continue</button>
                <!-- <button v-touch-ripple>check me!</button> -->
              </div>
            </div>
           </div>
          </form>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</template>
<script>
import Navbar from "../../Navbar.vue"
export default {
  data() {
    return {
      email: '',
      dummyObject: {},
      errorMessage: '',
      message:false,
    }
  },
  components: {
    appNavbar: Navbar
  },
  methods: {
    forgoetPassword: function(email) {
      var app = this;
      console.log(app.$cookie.get('X-Authorization'));
      app.$validator.validateAll();
       if(!app.errors.any()){
      app.$http.post(
      app.$store.state.SERVER_URL + '/forgotPassword',
      app.$data, {
      headers: {
      "X-Authorization": app.$cookie.get('X-Authorization')
          },
        }
      ).then(function(response) {
      console.log(response.data);
      if (response.data.status == "SUCCESS") {
      app.$router.push('/reset-password-message/' + app.email);
      } else {
        app.message = true;
        app.errorMessage =response.data.errorMessage;
        setTimeout(function(){
        app.message = false;
              }, 3000);
        }
      }, function(response) {

      });
    }
  }
  }
}
</script>
<style scoped>
.content{
min-height: calc(97vh - 101px)!important;
}
</style>
