

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
                <strong>Error</strong> Please Check your the Verification Ccode
            </div>
                    <div class="container">
                <div class="row">
                    <br>
                    <div class="col-md-4 col-md-offset-4 col-offset-4-margin">
                        <div class="panel panel-default verify-panel">
                            <div class="panel-body verify-body">
                                <div class="text-center img-div-padding">
                                    <img src="./assets/images/63-128.png" class="img-responsive img-inline" alt="mobile">
                                </div>
                                <di class="text-center">
                                    <h5 class="header-mobile">Mobile verification</h5>
                                    <p class="header-para">Enter The verification code that You have recieved for the mobile verification.</p>
                                </di>
                                <form class="" id="verify_mobile" role="form">
                                <div class="form-group row">
                                    <div class="col-sm-12">
                                        <input type="text" class="form-control" id="" name="key" v-model="verifymobile" placeholder="Enter Verification Code">
                                    </div>
                                </div>

                                <div class="form-group margintop-10 row">
                                    <div class="col-sm-12 text-center">
                                        <button type="button" class="btn btn-orange" v-on:click="verifyMobile">
                                        Verify Mobile</button>
                                         <button type="reset" class="btn btn-gray ">
                                        Resend</button>
                                    </div>
                                </div>
                                </form>
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

      <!-- Main Footer -->
      <footer class="main-footer">
        <!-- To the right -->
        <div class="pull-right hidden-xs">
          Designed and developed by Thrymr Software
        </div>
        <!-- Default to the left -->
        <strong>Copyright &copy; 2017 <a href="http://thrymr.net" class="color-pf">Thrymr Software</a>.</strong> All rights reserved.
      </footer>

    



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
        methods:{
          verifyMobile: function(e){
              var app = this;
              e.preventDefault();
              if(app.verifymobile){
                  var dataObj = $('#verify_mobile').serializeArray().reduce(function(obj, item) {
                    obj[item.name] = item.value;
                    return obj;
                }, {});
               console.log(dataObj);
            $.ajax({
               url: this.$store.state.SERVER_URL+'/verify-mobile-confirmation-key',
               type: 'GET',
                contentType: "application/json; charset=utf-8",
               data: {
                   'key': app.verifymobile
               },
                
                headers: {
                   "X-Authorization": app.$cookie.get('X-Authorization')

                },
               success: function(data) {
                 if(data.status === "SUCCESS"){
                        window.location.href="/projects";
                     
                 }else{
                     app.errorMessage = true;
                 }
             },
                error:function(data){
                app.errorMessage = true;
                 setTimeout(function(){
                    app.errorMessage = false;
                }, 3000);
             }
            }); 
                //  console.log(dataObj);
        }else{
            app.errorMessage = true;
            app.errorMessage = true;
                 setTimeout(function(){
                    app.errorMessage = false;
                }, 3000);
        }
              
            }  
        },
      components:{
            "app-adminHeader":adminHeader,
            "app-adminSidebar":adminSidebar
        }
    }
</script>

