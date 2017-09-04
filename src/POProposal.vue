<template>
    <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>

      <poSidebar :projectRequestId="projectRequestId"></poSidebar>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">

     <projectInfoHeader :projectRequestId="projectRequestId"></projectInfoHeader>
   <!-- <div class="row">
        <div class="col-md-12" >
           <div class="alert" :class="[success ? 'alert-success' : 'alert-danger']" v-show="isaletShow">
                 <a href="#" class="my_close" data-dismiss="alert" aria-label="close">×</a>
                {{message}}
            </div>
        </div>
    </div>-->
          <alert-box v-show="isAlertShow" :success="success" :message="message"></alert-box>

        <!-- Main content -->
        <section class="content">
        <!-- <h2 class="sub_heading story">Proposals</h2> -->
        <div class="panel-group PO_Proposal" id="accordion" role="tablist" aria-multiselectable="true">


                <POProposalComponent :proposal="proposal" :projectTilte="projectName"
            :isAlertShow="isAlertShow" :success="success" :message="message"
               @changeisaletShow="isAlertShow=$event"
                @changesuccess="success=$event"
                @changemessage="message=$event"
                v-for="(proposal,index) in proposalArray" :index="index" :proposalLength="proposalArray.length"></POProposalComponent>


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
    import poSidebar from "./poSideBar.vue"
    import  POProposalComponent  from "./POProposalComponent.vue"
    import alertBox from ".././src/components/alert/Alert.vue"
    import projectInfoHeader from "./projectInfoHeader.vue";

    export default {
        name: 'app',
        data () {
          return {
              projectRequestId:this.$route.params.projectRequestId,
              proposalArray:'',
              projectName:'',
              isAlertShow:false,
              success:false,
              message:''
          }
        },
        components:{
            "app-adminHeader":adminHeader,
            "poSidebar":poSidebar,
            "POProposalComponent":POProposalComponent,
            "alert-box":alertBox,
            "projectInfoHeader":projectInfoHeader
        },
        created: function(){
          var app = this;
          app.$http.get(
                    this.$store.state.SERVER_URL+'/api/po-pm/get-project-proposals-for-lead/'+this.projectRequestId,
                   {
                     headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')
                     },
                 }
            ).then(function(response) {
                  app.projectName = response.data.payLoad[0];
                  app.proposalArray = response.data.payLoad[1];
                  console.log("proposalArray------------------------------------");
                  console.log(response.data.payLoad[1]);
             });


        },
    //     closeAlert:function(){
    //         window.setTimeout(function() {
    //       $(".alert").fadeTo(500, 0).slideUp(500, function(){
    //       $(this).remove();
    //     });
    // }, 4000);
    //     }
    }
</script>
<style scoped="true">
.content{
  padding-bottom: 4%;
}
</style>
