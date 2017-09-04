<template>
<div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
      <div class="content-wrapper">
        <section class="content">
            <div class="row loginMain" id="loginForm">

            <div class="logincontent text-center" >
                <div class="col-md-12 logincontent-right login-inner" >
                  <h3>Coupon Code</h3>
                    <form class="form-horizontal">

                        <div class="form-group" :class="{'input': true, 'is-danger': errors.has('coupon.couponCode') }">
                          <div class="col-md-12" >
                              <input id="prependedtext" name="couponCode" class="form-control"  type="text" v-model="coupon.couponCode" v-validate:email ="'required'" >
                              <!--<p class="text-danger" v-if="errors.has('coupon.couponCode')">Please enter Coupon Code</p>-->
                          </div>
                        </div>

                        <div class="row">
                           <div class="col-md-12"><button type="button" class="btn btn-login btn-block" @click="submitCoupon">Submit</button></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </section>
    </div>
    </div>

</template>
<script>
    import adminHeader  from "../../adminHeader.vue"
    export default{
        data(){
            return{
                coupon:{
                    couponCode:''
                }



            }
        },
         components:{
            "app-adminHeader":adminHeader,

        },
        methods:{
            submitCoupon: function() {
                var app = this;

                console.log(app.$cookie.get('X-Authorization'));
                  app.$http.post(
                app.$store.state.SERVER_URL+'/api/developer/verify-coupon/'+app.coupon.couponCode,
                app.coupon,
                {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')

                        },

                }

               ).then(function (response) {
                console.log(response.data);
                if(response.data.status=="SUCCESS"){
                  var user =app.$store.getters.getLoggedInUser;
                     user.isDeveloperEligible =true;
                     console.log("user is -----");
                     console.log(user);
                    app.$store.commit('setLoggedInUser', user);
                         app.$store.commit('setDeveloperWizardStep', 1);
                  app.$router.push('/developer/dashboard');
                   }else{

                   }


            }, function (response) {
                console.log('Error!:', response.data);

            });

            },
        }
    }
</script>
<style>

</style>
