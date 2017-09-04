<template>
<div>
  <appNavbar></appNavbar>
  <div class="container">
    <div class="alert  inspirage-danger" style="display:none" v-show="message" role="alert">
            <!-- New password & confirm password do not match, please try again. -->
            {{errorMessage}}
    </div>
      <div class="forgot-password-content reset-password-design">

       <div class="email-service">

        <p class="text-center reset-password-heading">Reset Password </p>
         <form @submit.prevent="resetPassword">
          <div class="rest-password">
            <div class="text-center">
             <span class="">Enter a new password for {{this.$store.getters.getForgotEmail}}</span>
          </div>

           <div class="form-group" :class="{'input': true, 'is-danger': errors.has('password') }">
            <div class="col-md-12 reset-pwd-marg">
              <input  name="password" class="form-control reset-pwd-input-padding" placeholder="New Password" type="password" v-model="password"  v-validate:password ="'required|min:8'">
               <p class="text-danger" v-if="errors.has('password')" >Password should have atleast 8 characters</p>
          </div>
        </div>
          <div class="form-group" :class="{'input': true, 'is-danger': errors.has('password') }">
           <div class="col-md-12 reset-pwd-marg" >
            <input  name="confirmPassword" class="form-control reset-pwd-input-padding" placeholder="Confirm Password" type="password" v-model="confirmPassword"  v-validate:confirmPassword ="'required|min:8'">
              <p class="text-danger" v-if="errors.has('confirmPassword')" >Please re-enter new password</p>
          </div>
        </div>
            <div class="col-md-12 text-center reset-pwd-marg reset-pwd-margin-bottom">
              <button type="submit" class="btn  btn-block btn-login"  v-touch-ripple >Reset</button>
            </div>
        </div>
      </form>
    </div>
  </div>
</div>
</div>
</template>
   <script>
           import Navbar  from "../../Navbar.vue"
           export default{
           data(){
           return{
              email:this.$store.getters.getForgotEmail,
              password:'',
              confirmPassword:'',
              emailConfirmationKey:'',
              appUserId:'',
              message:false,
              errorMessage:'',
               }
              },
             components:{
             appNavbar:Navbar
            },
            created : function(){
            email=this.$store.getters.getForgotEmail;
            },
            methods:{
            resetPassword: function(email) {
            var app = this;
            app.$validator.validateAll();
            if(!app.errors.any()){
            console.log(app.$cookie.get('X-Authorization'));
            console.log("--------"+app.$route.params.email);
            app.appUserId = app.$route.params.id;
            app.emailConfirmationKey = app.$route.params.emailConfirmationKey;
            app.email = app.$route.params.email;
            console.log(app.$data);

            if(app.password === app.confirmPassword){
            app.$http.post(
            app.$store.state.SERVER_URL+'/reset-password',
            app.$data,
            {
              headers: {
              "X-Authorization": app.$cookie.get('X-Authorization')
              },
            }
             ).then(function (response) {
              console.log(response.data.status);
              if(response.data.status=="SUCCESS"){
              app.$router.push('/forgot-password-success-msg/'+app.email);
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

     }
    }
  }
}
</script>
