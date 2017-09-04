<template>
    <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
      <pmSidebar :projectRequestId="projectRequestId"></pmSidebar>
      <div v-if="loggedInRole === 'ADMIN'">
        <AdminSidebar></AdminSidebar>
      </div>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Project information dynamic data  -->
        <div v-if="loggedInRole === 'ADMIN'">
          <AdminProjectHeader></AdminProjectHeader>
        </div>
          <div v-if="loggedInRole === 'PROJECT_MANAGER'">
             <projectInfoHeader ></projectInfoHeader>
          </div>

        <!-- Main content -->
        <section class="content">

            <div class="row">
                <div class="col-md-6">
                    <!-- <h2 class="sub_heading">Milestone</h2> -->
                </div>
                <div class="col-md-6 text-right" v-if="isMilestoneChangeable()">

                    <button type="button" class="btn btn-orange btn-lg" data-toggle="modal" @click="addMilestone" >Add New Milestone</button>
                </div>
            </div>
              <div class="drag">
                 <div class="row cal_scroller">
                     <div class="cal_container">
                         <!-- milestone level -->
                         <div class="drag">
                             <div class="col-md-3 col-3 paddRight-0 paddLeft-0" v-for="(milestone , index) in allmilestone" :key="milestone" v-if="!isProposalAccepted(index)">
                                <div class="inner_milstone border-red">
                                    <div class="row" >

                                         <div class="col-md-12 text-right" v-if="!(milestone.isUnAssigned) && isMilestoneChangeable()">
                                          <a type="button"  class="cursor-pointer" @click="editMilestone(milestone , index)" ><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                          <a type="button"  class="cursor-pointer"  @click="deleteMilestone(milestone , index)" v-if="isDelete(milestone)""><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                                        </div>


                                         <div class="col-md-12 text-center">
                                            <p v-if="milestone.isUnAssigned" class="milestoneHeading"><b>Orphan Epics</b></p>
                                            <p v-else="milestone.isUnAssigned" class="milestoneHeading milestoneHeadingOverflow"><b>{{milestone.milestoneName}} </b></p>
                                        </div>

                                         <div class="col-md-12">
                                          <!-- <div class="statusBlock text-center">
                                            <b style="color: #e7714d;">Not Started</b>
                                          </div> -->
                                          <div class="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                                            <div class="progress marsk-as-com-bottom active oval-border" v-if="isProjectAvailable">
                                              <div class="progress-bar " :style="progressWidth(milestone.completedPercentage)">
                                              <span>{{milestone.completedPercentage}}%</span>
                                              </div>
                                            </div>
                                          </div>

                                        </div>

                                          <div class="row marginTop-10 milestoneEstemHours" >
                                            <div class="col-md-12">
                                              <div class="col-md-6"><b>{{milestone.estimatedTotalHours}}</b><span class="estValue">Hours</span> </div><div class="col-md-6 text-right "><span class="estValue">USD</span> <b>{{milestone.estimatedTotalCost}}</b>
                                              </div>
                                            </div>
                                            </div>

                                            <div class="row">
                                              <hr/>
                                            </div>


                                        <div  class="col-md-12" :milstone-id="milestone.id" v-if="isMilestoneChangeable()">
                                            <draggable class="dragArea"   :options="{group:'people'}"  @add="dragableElement">
                                                <div class="cards_milestone" :epic-id="element.id"  v-for="element in milestone.epics">
                                                    <b class="epicName">{{element.epicName}}</b>
                                                    <div class="row marginTop-10 milestoneEstemHours">
                                                      <div class="col-md-6"> <b>{{element.estimatedHours}}</b><span class="estValue">Hours</span></div><div class="col-md-6 text-right"><span class="estValue">USD</span><b>{{element.estimatedPrice}}</b></div>
                                                    </div>
                                                </div>
                                            </draggable>
                                        </div>
                                        <div  class="col-md-12" v-else>
                                                <div class="cards_milestone"  v-for="element in milestone.epics">
                                                    <b>{{element.epicName}}</b>
                                                    <div class="row marginTop-10">
                                                        <div class="col-md-6">Est Hr <b>{{element.estimatedHours}}</b></div><div class="col-md-6">Est Cost <b>{{element.estimatedPrice}}</b></div>
                                                    </div>
                                                </div>
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


<div class="modal fade" id="MilestoneModle" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
         <h4 class="modal-title" v-if="milestoneId == ''">Add New  Milestone</h4>
         <h4 class="modal-title" v-else>Edit  Milestone</h4>
      </div>
      <div class="modal-body">
          <div class="row">
              <div class="col-md-12">
                    <form id="milestoneForm" @submit.prevent="submitForm">
                        <input type="hidden" name="milestoneId" :value="milestoneId" v-model="milestoneId">
                        <input type="hidden" name="projectProposalId" :value="projectProposalId" v-model="projectProposalId">

                      <div class="form-group"  :class="{'input': true, 'is-danger': errors.has('milestoneName') }">
                        <input class="form-control " id="epic" name="milestoneName" v-model="milestoneName"  v-validate:milestoneName ="'required'"  type="text"  placeholder="Milestone name">
                           <p class="text-danger" v-if="errors.has('milestoneName')">Please specify Milestone Name</p>
                      </div>
                        <div class="form-group ">
                        <textarea class="form-control" name="milestoneDescription" v-model="milestoneDescription" placeholder="Description"></textarea>
                        </div>
                      <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                      <button type="submit" class="btn btn-orange" :disabled="enableButton" v-if="milestoneId == ''">ADD</button>
                      <button type="submit" class="btn btn-orange"v-else>Update</button>
                    </form>
              </div>
          </div>
      </div>
    </div>
  </div>
</div>





      <!-- /.content-wrapper -->

      <!-- Main Footer -->
      <!-- <app-footer></app-footer> -->
      <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
      <div class="control-sidebar-bg"></div>
    </div>
</template>
 <script src="assets/js/wizard.js"></script>
<script>

    import adminHeader  from "./adminHeader.vue"
    import pmSidebar from "./ProjectSidebar.vue"
    import footer  from "./footer.vue"
    import draggable from 'vuedraggable'
    import projectInfoHeader from "./projectInfoHeader.vue";
    import  AdminSidebar  from  "./SupperAdminSideBar.vue";
    import  adminProjectHeader  from  "./components/admin/adminProjectHeader.vue";

    export default {
           name: 'app',
            data () {
                return {
                    loggedInRole: this.$store.getters.getLoggedInUser.role,
                    projectRequestId:'',
                    values:[],
                    projectProposalId:'',
                    unsignedEpic:[],
                    milestoneName:'',
                    milestoneDescription:'',
                    allmilestone:[],
                    projectId:'',
                    projectName:'',
                    milestoneId:'',
                    milestoneIndex:'',
                    projectProposalStatus:'',
                    enableButton:false,
                }
            },

     components:{
            "app-adminHeader":adminHeader,
            "pmSidebar":pmSidebar,
            "app-footer":footer,
            "projectInfoHeader":projectInfoHeader,
            draggable,
            'AdminSidebar': AdminSidebar,
            'AdminProjectHeader':adminProjectHeader,
        },
        created: function(){
          this.projectRequestId = this.$route.params.projectRequestId;
        },
        mounted: function(){

          this.getPropsal();
        },
        computed: {

          isProjectAvailable: function(){

           return this.$store.getters.getProjectInfo.isProjectAvailable;

          },

    },
  methods: {
    progressWidth: function(completedPercentage){
         return "width:" +completedPercentage+ "%";
    },
    isProposalAccepted:function(index){

      if(this.projectProposalStatus == 'ACCEPTED' && index ==0){
          return true;
      }else{
       return false;
       }

    },
      isMilestoneChangeable(){
        var app = this;
        return (app.projectProposalStatus == 'DRAFT' || app.projectProposalStatus == 'REJECTED');
      },
      isDelete(milestone){
          if((typeof milestone.epics != "undefined") && milestone.epics.length > 0){
           return false;
             }
           return true;
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
             app.$store.commit('setSpinner',true);
             //get latest praposal based project id
                 app.$http.get(
                    app.$store.state.SERVER_URL+'/api/po-pm/get-latest-proposal-for-lead/'+app.$route.params.projectRequestId,
                   {
                     headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')
                     },

                 }
            ).then(function(response) {

                     console.log("Milestione----------------------->");
                     console.log(response);
                     app.projectProposalId = response.data.payLoad.id;
                     app.projectName = response.data.payLoad.projectName;
                     app.projectProposalStatus = response.data.payLoad.projectProposalStatus;
                     console.log("praposal id are ----"+app.projectProposalStatus)


                     //get all unasigned epics on load
                    app.$http.get(
                        app.$store.state.SERVER_URL+'/api/po-pm/get-all-milestones-and-epics-for-proposal/'+app.projectProposalId,
                         {
                         headers: {
                           "X-Authorization": app.$cookie.get('X-Authorization')

                          },

                          }
                          ).then(function(response) {
                              app.$store.commit('setSpinner',false);
                               console.log(response)
                               app.allmilestone = response.data.payLoad.milestones;
                             });

              });

            },
      submitForm: function(){
        //  console.log("projectProposalId--------------abc-------");

          var app = this;
            app.$validator.validateAll();
         if (!app.errors.any()) {
           app.enableButton=true;
            app.$store.commit('setSpinner',true);
          // serialize form
          var dataObj = $('#milestoneForm').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
                return obj;
          }, {});

          var xAuth  =  null;
            if(document.cookie.split(';')[0].split('=')[0].localeCompare('X-Authorization') == 0){
                 xAuth = document.cookie.split(';')[0].split('=')[1];
         }

             console.log(dataObj)

             $.ajax({
               url:this.$store.state.SERVER_URL+'/api/project-manager/save-milestone',
               type:"POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: "false",
                data: JSON.stringify(dataObj),
                headers: {
                    "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
                },
                success: function(data) {
                  app.enableButton=false;
                  app.$store.commit('setSpinner',false);
                    console.log(data)
                 if(data.status === "SUCCESS"){
                   app.enableButton=false;
                  $('#MilestoneModle').modal('hide');
                if(app.milestoneId != '' && app.milestoneId != null){
                  app.enableButton=false;
                    app.allmilestone[app.milestoneIndex].milestoneName = data.payLoad.milestoneName;
                    app.allmilestone[app.milestoneIndex].milestoneDescription = data.payLoad.milestoneDescription;
                    app.allmilestone[app.milestoneIndex].id = data.payLoad.id;
                }else{
                  app.enableButton=false;
                    app.allmilestone.push(data.payLoad);
                }
                 }
                 else{
                   app.enableButton=false;
                  app.$swal("Oops...", "Something went wrong!", "error");
                     return -1;
                 }
             }
            });

      }


      },
      dragableElement: function (e){
          var app = this;
          var epicId = e.item.getAttribute('epic-id');
           var milestoneId = e.target.parentElement.getAttribute('milstone-id');
             var obj1 = {

             };

          obj1.milestoneId = milestoneId;
          obj1.epicId = epicId;
           app.$store.commit('setSpinner',true);

                $.ajax({
                           url: this.$store.state.SERVER_URL+'/api/project-manager/add-milestone-reference-to-epic',
                           type: 'POST',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify(obj1),
                                headers: {
                                    "X-Authorization": app.$cookie.get('X-Authorization')

                                        },
                           success: function(response) {
                               console.log(response)
                                app.$store.commit('setSpinner',false);
                             if(response.status === "SUCCESS"){

                               console.log("===============all milestone==================")
                                  console.log(response)
                               app.allmilestone = response.payLoad.milestones;
                             }
                             else{
                                console.log('error');
                             }
                         }
                        });

      },
      addMilestone(){
           var app = this;
           app.milestoneId = '';
           app.milestoneName = '';
           app.milestoneDescription = '';
           setTimeout(() =>{
             app.errors.clear()
           },100);
           $('#MilestoneModle').modal('show');
      },
      editMilestone(milestone,index){
           var app = this;
           app.milestoneId = milestone.id;
           app.milestoneIndex = index;
           app.milestoneName = milestone.milestoneName;
           app.milestoneDescription = milestone.milestoneDescription;
           $('#MilestoneModle').modal('show');
      },
      deleteMilestone(milestone,index){
          var app = this;
          app.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
          }).then(function () {
            app.$http.get(
              app.$store.state.SERVER_URL+'/api/project-manager/delete-milestone/' + milestone.id ,
              {
                headers: {
                  "X-Authorization": app.$cookie.get('X-Authorization')
                },
              }
            ).then(function(response){
              if(response.data.status === "SUCCESS"){
                app.allmilestone.splice(index , 1);
              }else{
                alert("Oops Something went wrong")
              }
            })
          })
      },
      convertUtcToLocaDateTime(date){
       //console.log("convertStringtoDate------------------------>")
       var moment = require('moment-timezone');
       var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
       return moment(date).tz(timeZone).format('DD-MM-YYYY HH:mm')
     },
  }

}


</script>
<style scoped="true">
    .dragArea {
  min-height: 500px;
}

</style>
