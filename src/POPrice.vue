<template>
    <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
       <poSideBar :projectRequestId="projectRequestId"></poSideBar>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
<projectInfoHeader :projectRequestId="projectRequestId"></projectInfoHeader>

        <!-- Main content -->
        <section class="content">
              <!-- <h2 class="sub_heading story">Commercials</h2> -->
            <div class="tab-content">
                <POpayment :projectRequestId="projectRequestId"></POpayment>
                <!-- <div class="tab-pane active" id="Payment">

                </div> -->


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
    import poSideBar from "./poSideBar.vue"
    import  POpayment  from "./POPayment.vue"
      import projectInfoHeader from "./projectInfoHeader.vue";




    export default {
           name: 'app',
            data () {
                return {
                   projectName:'',
                   projectProposalId:'',
                    projectId:'',
                    qutation:'',
                    milestones:'',
                    projectRequestId: this.$route.params.projectRequestId
                }
            },
            mounted: function () {
                //this.fetchUsers();
                this.getProjectDetails()
                console.log(this.projectRequestId);
            },
            components:{
                "app-adminHeader":adminHeader,
                "poSideBar":poSideBar,
                "POpayment":POpayment,
                "projectInfoHeader":projectInfoHeader
            },
            methods: {

            clickHandler() {
                  localStorage.getItem("projectLeadId");

                },
            getProjectDetails:function(){
                var app = this;
                  app.$store.commit('setSpinner',true);
                 app.$http.get(
                    this.$store.state.SERVER_URL+'/api/po-pm/get-project-proposal-for-lead/'+app.$route.params.projectRequestId,
                   {
                     headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')

                     },

                 }
            ).then(function(response) {
                app.$store.commit('setSpinner',false);
                  console.log("responxe id---");
                  console.log(response.data.payLoad.id+'dddddddddddd');
                  app.projectName = response.data.payLoad.projectName;
            });
            }




    },

}

</script>
