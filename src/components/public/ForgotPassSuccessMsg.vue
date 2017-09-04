<template>
<div>
  <appNavbar></appNavbar>
  <div class="container">
    <div class="forgot-password-content">
    <div class="email-service">
      <p class="text-center reset-password-heading">Reset Password </p>
      <div class="reset-password-icon text-center">
        <i class="fa fa-check success-fa-icon-reset-pwd" aria-hidden="true"></i>
      </div>
      <div class="email-service-content text-center">
        <h3><b>Password Changed</b></h3>
        <span class="">Your password for
         {{email}} has been
        changed.</span>
       </div>
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
email:this.$store.getters.getForgotEmail
    }
  },
  components:{
        appNavbar:Navbar
    },
    created: function(){
      //  this.$store.commit('setForgotEmail','');
    }
}
</script>
