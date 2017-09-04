<template>
    <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
      <!--
      <app-pm-sidebar inProject="false"></app-pm-sidebar>
      -->
      <app-pm-sidebar></app-pm-sidebar>

      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <!-- Main content -->
        <section class="content">


             <app-projectCards :projectList="products" :role="role"></app-projectCards>



          <!-- Your Page Content Here -->
        </section>
        <!-- /.content -->
      </div>
      <!-- /.content-wrapper -->



    <div class="modal fade" id="preview_requestedform" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">

                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <h3 class="modal-title" id="lineModalLabel">Project Requirement Form</h3>
            </div>
            <div class="modal-body preview_modal">

                <div class="row">
                    <div class="col-md-6">
                        <h5>Type</h5>
                        <p>Mobile+ Web Application</p>
                    </div>

                    <div class="col-md-6">
                        <h5>Platform</h5>
                        <p>Android, IOS</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <h5>What would you like to call it ?</h5>
                        <p>Client Management System</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <h5>Anything else you would like to specify?</h5>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected

    humour, or randomised words which don't look even slightly believable.</p>
                    </div>
                </div>

                <div class="row attachment_div">
                    <div class="col-md-12">
                        <h5>Attachments</h5>
                        <p class="">
                            Attachmentone.pdf
                        </p><p class="">
                            Attachmentone.pdf
                        </p>
                    </div>
                </div>




            </div>
            <div class="modal-footer text-right">

                <button type="button" class="btn btn-gray">Back To Edit</button>
                <button type="button" class="btn btn-orange">SUBMIT</button>

            </div>
        </div>
      </div>
    </div>



      <!-- Add the sidebar's background. This div must be placed
           immediately after the control sidebar -->
      <div class="control-sidebar-bg"></div>
    </div>
</template>


<script>
    import  adminHeader  from "./adminHeader.vue";
    import  PMSideBar  from "./PMSideBar.vue";
    import  projectCards  from "./projectCards.vue";


    export default {
        data(){
            return{
                products:'',
                role:''
            }

        },
        components:{
            "app-adminHeader":adminHeader,
            "app-pm-sidebar":PMSideBar,
            "app-projectCards":projectCards,
        },
        mounted: function(){
            this.role = this.$cookie.get('role');
            this.getProductList()
        },
         methods:{
          getProductList: function(){
              var app = this;
            //  console.log(app.$cookie.get('X-Authorization')+"====="+this.$store.state.SERVER_URL+'/api/project-manager/get-pm-project-leads-requested')
              var url = this.$store.state.SERVER_URL+'/api/project-manager/get-pm-project-leads-requested';
              //console.log("url    "+url);
                app.$store.commit('setSpinner',true);
              app.$http.get(
                    url ,
                 {
                     headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')
                     },
                 }
            ).then(function(response) {
                app.$store.commit('setSpinner',false);
              //console.log("products ================================================================");
                  //console.log(response);
                  app.products = response.data.payLoad;
                  //console.log(app.products);
              });

            }
        },


    }
</script>
