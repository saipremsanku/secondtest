<template>
    <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
      <poSidebar :projectRequestId="projectRequestId"></poSidebar>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <!-- Project information dynamic data  -->
         <projectInfoHeader :projectRequestId="projectRequestId"></projectInfoHeader>

        <!-- Main content -->
        <section class="content">

            <div class="row">
                <div class="col-md-6">
                    <!-- <h2 class="sub_heading">Milestone</h2> -->
                </div>
                <div class="col-md-6 text-right">

                 <!--    <button type="button" class="btn btn-orange btn-lg" data-toggle="modal" data-target="#MilestoneModle" >Add New Milestone</button> -->
                </div>
            </div>
              <div class="drag">
                 <div class="row cal_scroller">
                     <div class="cal_container">
                         <!-- milestone level -->
                         <div class="drag">
                             <div class="col-md-3 col-3" v-for="milestone in allmilestone"  >
                                <div class="inner_milstone border-red milestoneheadingAlign">
                                    <div class="row">

                                        <h4 v-if="milestone.isUnAssigned" class="text-center">Un Assigned Epics</h4>
                                        <h4 v-else="milestone.isUnAssigned" class="text-center milestoneHeadingOverflow">{{milestone.milestoneName}}</h4>


                                         <div class="col-md-12">
                                           <div class="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                             <div class="progress marsk-as-com-bottom active oval-border" v-if="isProjectAvailable">
                                               <div class="progress-bar " :style="progressWidth(milestone.completedPercentage)">
                                               <span>{{milestone.completedPercentage}}%</span>
                                               </div>
                                             </div>
                                           </div>
                                          <!-- <div class="statusBlock text-center">
                                            <b style="color: #e7714d;">Not Started</b>
                                          </div> -->
                                        </div>


                                    </div>
                                    <div class="row">
                                              <hr/>
                                            </div>
                                      <div class="row">
                                        <div  class="col-md-12" :milstone-id="milestone.id">
                                            <!-- internal epics starts here/draggable elements-->

                                                <div class="cards_milestone" :epic-id="element.id"  v-for="element in milestone.epics">
                                                    <b class="epicName">{{element.epicName}}</b>
                                                </div>

                                            <!-- internal epics starts ends/draggable elements-->
                                        </div>
                                      </div>

                                </div>
                             </div>
                        </div><!-- milestone level ends here -->

                    </div>
                 </div>
            </div>




          <!-- Your Page Content Here -->
        </section>
        <!-- /.content -->
      </div>



 <!-- add Milestone Modal  -->





      <!-- /.content-wrapper -->


      <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
      <div class="control-sidebar-bg"></div>
    </div>
</template>
 <script src="assets/js/wizard.js"></script>
<script>

    import adminHeader  from "./adminHeader.vue"
    import poSidebar from "./poSideBar.vue"
    import footer  from "./footer.vue"
    import projectInfoHeader from "./projectInfoHeader.vue";



    export default {
           name: 'app',
            data () {
                return {
                    projectRequestId:'',
                    values:[],
                    projectProposalId:'',
                    unsignedEpic:[],
                    milestoneName:'',
                    milestoneDescription:'',
                    allmilestone:[],
                    projectId:'',
                    projectName:''
                }
            },


     components:{
            "app-adminHeader":adminHeader,
            "poSidebar":poSidebar,
            "app-footer":footer,
            "projectInfoHeader":projectInfoHeader

        },
        created: function()

        {
          this.projectRequestId = this.$route.params.projectRequestId;
        },
        mounted: function(){
          this.getPropsal();
        },
        computed:{
          isProjectAvailable: function(){

           return this.$store.getters.getProjectInfo.isProjectAvailable;

          },
        },
  methods: {
        progressWidth: function(completedPercentage){
             return "width:" +completedPercentage+ "%";
        },
      	reorder: function(event) {
            console.log("-----reorder-----");
				var oldIndex = event.oldIndex,
						newIndex = event.newIndex;
				this.items.splice(newIndex, 0, this.items.splice(oldIndex, 1)[0]);

			} ,
         getPropsal: function(){

             var app = this;


             console.log(app.$route.params.projectRequestId);

             //get latest praposal based project id
             app.$store.commit('setSpinner',true);
                 app.$http.get(
                    app.$store.state.SERVER_URL+'/api/po-pm/get-latest-proposal-for-lead/'+app.$route.params.projectRequestId,
                   {
                     headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')

                     },

                 }
            ).then(function(response) {
              app.$store.commit('setSpinner',false);
                  console.log("responxe id---"+response.data.payLoad.id);
                   app.projectProposalId = response.data.payLoad.id;
                     app.projectName = response.data.payLoad.projectName;
                     console.log("praposal id are ----"+app.projectProposalId)


                     //get all unasigned epics on load
                    app.$http.get(
                        app.$store.state.SERVER_URL+'/api/po-pm/get-all-milestones-and-epics-for-proposal/'+app.projectProposalId,
                         {
                         headers: {
                           "X-Authorization": app.$cookie.get('X-Authorization')

                          },

                          }
                          ).then(function(response) {
                        console.log(response.data.payLoad.milestones)

                               app.allmilestone = response.data.payLoad.milestones;

                                   console.log("all milestone");
                        console.log(app.allmilestone);

                             });

              });

            },

  }

}


</script>
<style>
    .dragArea {
  min-height: 600px;
}
</style>
