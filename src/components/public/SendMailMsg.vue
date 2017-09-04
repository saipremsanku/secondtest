<template>
<div>
  <appNavbar></appNavbar>
   <div class="container">
     <div class="forgot-password-content">
       <div class="email-service">
        <p class="text-center reset-password-heading">Reset Password </p>
         <div class="reset-password-icon text-center">
          <i class="fa fa-check Follow the
          directions in the email to reset your password." aria-hidden="true"></i>
        </div>
          <div class="email-service-content text-center">
           <span class="">"If Workfall recognizes your email
           {{this.$route.params.email}},a reset link has been mailed. </span>
       </div>
       <!-- Follow the
       directions in the email to reset your password. -->
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
    }
  },
 components:{
 appNavbar:Navbar
    },
    created: function(){
      this.$store.commit('setForgotEmail',this.$route.params.email);
    //  this.$store.getters.getForgotEmail.forgotEmail;
      console.log('get value form store---');
      console.log(this.$store.getters.getForgotEmail);
    }
}
</script>
