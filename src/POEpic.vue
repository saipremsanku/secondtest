<template>
    <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
      <poSideBar :projectRequestId="projectRequestId"></poSideBar>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Project information dynamic data  -->
        <projectInfoHeader></projectInfoHeader>


        <!-- Main content -->
        <section class="content">
        <div class="PMepicContainer">
            <div class="row">
                <div class="mangeEpic">
                <div class="col-md-3 col-lg-2 managePmMilestoneBlock btn-ripple">
                  <!-- <h2  class="sub_heading story">Product Backlog</h2> -->
                   <!--  <button class="btn"  data-toggle="modal" data-target="#myModal"><i class="fa fa-plus-circle" aria-hidden="true"></i> Add Epic </button> -->
                    <ul class="list-group epicAdd mangeEpic epic-active">
                      <li :class="{ 'active' : isSelected(index) }"  class="list-group-item" v-for="(epic,index) in epics" v-on:click="getAllStroy(epic,index)">{{epic.name}}</li>

                    </ul>

                    </div>
                </div>

     <div class="col-md-9 col-lg-10">
      <div class="epicMessage story" v-if="setEpicIdinStory!= ''">
  <div class="row">
        <div class="col-md-8 col-lg-4 col-sm-4 col-xs-4">
          <div class="progress marsk-as-com-bottom active oval-border" v-if="isProjectAvailable">
            <div class="progress-bar " :style="progressEpicWidth()">
            <span>{{epicCompletionPercentage}}%</span>
            </div>
          </div>

        </div>
      </div>
         <div class=" row storyTitle">
            <h4>{{setEpicIdinStory.name}}</h4>
            <p class="no-border-bottom">{{setEpicIdinStory.description}}</p>
            <!-- <h5>created on <span>{{setEpicIdinStory.createdDate}}</span></h5> -->

            </div>


                <!--start of accrodian-->
                <div class="" v-for="(story,index) in storys"  style="margin-top: 5px;border: 1px solid #cac0c0;">
                <div class="edit_delete_details">
                <div class="row">
                  <div class="col-md-12">
                    <div class="col-md-8">
                    <span data-toggle="collapse" data-target="#demo">
                     <span class="accordianSym">  <i class="fa fa-bookmark color-orange" aria-hidden="true"></i> </span>
                    </span>

                    <span class="storyName"><b>{{story.name}}</b></span>
                    </div>
                    <div class="col-md-4 pull-right" v-if="projectLeadStatus=='CLOSED_SUCCESSFULLY'">
                      <div class="progress active oval-border" v-if="isProjectAvailable && !story.isCompleted">

                        <div class="progress-bar" :style="progressWidth(story)" >
                        <span>{{story.percentageCompleted }}%</span>
                        </div>
                      </div>
                        <button v-else class="btn btn-green mark-as-comp-button pull-right"  data-toggle="modal" >Completed</button>
                    </div>
                      <!-- <div class="col-md-2">
                        <div class="col-md-6">
                        <span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-clock-o"></i> <span class="timeBlock">{{calcTotal(story)}}</span></span>
                        </div>
                      </div> -->
                  </div>
                  <div class="col-md-12">
                    <p class="storyDescription">{{story.description}}</p>
                  </div>
                </div>
                </div>
                </div>
             </div>
            </div>
        </div>
    </div>
    </section>
    </div>






</div>
</template>
<script>

</script>
<script>

    import adminHeader  from "./adminHeader.vue"
    import poSideBar from "./poSideBar.vue"
    import projectInfoHeader from "./projectInfoHeader.vue";


    export default {
        data(){
            return{
                epicCompletionPercentage:'',
                projectRequestId:'',
                projectLeadStatus:this.$store.getters.getProjectInfo.projectLeadStatus,
                epics:'',
                selectMilestone:'',
                epicId:'',
                epicName:'',
                epicDescription:'',
                milestoneId:'',
                projectProposalId: '',
                setEpicIdinStory:'',
                percentage:50,

                //story filed

                userStoryId: '',
                userStoryName: '',
                userStoryDescription : '',
                estimatedAnalysisHours:'',
                estimatedBackendHours:'',
                estimatedDesignHours: '',
                estimatedFrontEndHours: '',
                estimatedQAHours: '',
                estimatedSupportHours:'',
                storys:'',
                editStroy:'',
                selected:0,


                //task filed

                taskId: '',
                taskName : '',
                taskDescription : '',
                activityTypes :[
                    { 'activitt': 'ANALYSIS' },
                     { 'activitt': 'DESIGN' },
                       { 'activitt': 'FRONTEND' },
                     { 'activitt': 'BACKEND' },
                     { 'activitt': 'QA' },
                     { 'activitt': 'SUPPORT' },
                    ],

                userStoryId:'',
                activityType:'',
              tasks: ''
            }
        },
        components:{
            "app-adminHeader":adminHeader,
            "poSideBar":poSideBar,
            "projectInfoHeader":projectInfoHeader
        },
        created: function(){
          this.projectRequestId = this.$route.params.projectRequestId;
        },
        computed:{
          isProjectAvailable: function(){

           return this.$store.getters.getProjectInfo.isProjectAvailable;

          },

        },
        mounted: function(){
            this.getPropsal();
        },
        methods:{
          progressEpicWidth: function(){
               return "width:" +this.epicCompletionPercentage+ "%";
          },
          progressWidth: function(story){
               return "width:" +story.percentageCompleted+ "%";
          },
          isSelected(index){
            var app = this;
          return index === app.selected
          },
          calcTotal: function(story){
            return story.estimatedAnalysisHours +
            story.estimatedDesignHours +
            story.estimatedFrontEndHours +
            story.estimatedBackendHours +
            story.estimatedQAHours +
            story.estimatedSupportHours ;
          },
            getAllStroy: function(epic,index){

                //console.log(epic);
              //  console.log("epic id are-----"+epic.id);
                 var app = this;
                  app.setEpicIdinStory = epic;
                    app.selected = index;
                    app.$store.commit('setSpinner',true);
                 app.$http.get(
                    this.$store.state.SERVER_URL+'/api/po-pm-admin/get-all-user-stories/'+epic.id,
                   {
                     headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')

                     },

                 }
            ).then(function(response) {
              app.$store.commit('setSpinner',false);
              //console.log("=============getAllStroy=================");
              //console.log(response)
                     app.storys = response.data.payLoad.userStorys;
                     app.epicCompletionPercentage = response.data.payLoad.epicCompletionPercentage;
                    //  app.percentage=response.data.payLoad.percentageCompleted;
                    //   console.log(app.percentage);
                    // console.log("----console.log(app.story);---");
                    // console.log(app.storys);
                  /* app.projectProposalId = response.data.payLoad.id;*/

              });





            },

            getPropsal: function(){
               var app = this;
               console.log('epic details-----getPropsal-------------'+app.$route.params.projectRequestId);
               app.$http.get(
                  this.$store.state.SERVER_URL+'/api/po-pm/get-all-latest-epic-of-project-lead/'+app.$route.params.projectRequestId,
                 {
                    headers: {
                     "X-Authorization": app.$cookie.get('X-Authorization')
                    },
                  }
                ).then(function(response) {
                  app.projectProposalId = response.data.payLoad.proposalId;
                  app.epics = response.data.payLoad.epicList;

                if(app.epics.length>0){
                  app.selected = 0;
                  var epic = app.epics[0];
                  app.getAllStroy(epic,0);
                }
            });



            },




        }
    }
</script>
<style>
.padding-s{
      padding: 5px;
}







</style>
