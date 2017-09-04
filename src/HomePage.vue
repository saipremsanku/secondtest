

<template>

    <div>
        <appNavbar></appNavbar>
        <div class="container" >
            <div class="signup_page">
                <div class="row">
                    <div class="col-md-12 col-sm-12 text-center signup_left">
                            <img src="./assets/images/Product-OwnerSign_up.png" class="img-responsive signup_icon" />
                            <h4> Get Work Done. Now.</h4>
                            <br>
                            <p>What does a Product Owner desire? <br> <b>Commitment of Delivery.</b></p>
                            <router-link to="/product-owner/sign-up" type="button" class="btn btn-success btn-orange">Sign Up</router-link>
                        </div>


                        <!--<div class="col-md-2 col-sm-2 ">
                            <div class="brdlft"></div>
                            <p class="or_para">OR</p>
                            <div class="brdrgt"></div>
                        </div>-->
                   <!--   <div class="col-xs-12 hidden-lg hidden-md hidden-sm visible-xs">
                            <div class="ordiv_forsmall">
                                <p class="or_para">OR</p>
                            </div>
                        </div>-->
                     <!--   <div class="col-md-5 col-sm-5 text-center signup_right">
                              <img src="./assets/images/Developer_Signup.png" class="img-responsive signup_icon" />
                                <h4>Looking for Work?</h4>
                               <p>Be a part of our <b>Development</b> Team </p>
                            <router-link to="/developer/sign-up" type="button" class="btn btn-success btn-blue">Sign Up</router-link>
                            <a href="/" type="button" class="btn btn-success btn-blue">SIGN UP</a>
                        </div>-->



                </div>
                <div class="row signup_bt">
                    <div class="col-md-12 text-center">
                        <p>Signedup Already? <span><router-link to="/login" class="anc-login color-blue">Login</router-link></span></p>
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
              display:true
          }
        },
        created: function () {
            this.$store.commit('setSpinner',false);
            if((this.$cookie.get('X-Authorization') != null) && (this.$cookie.get('role') != null)){
                this.$router.push('/post-login');
            }
        },
        components:{
          appNavbar:Navbar
        }
    }
</script>
