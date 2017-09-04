<template>
    <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
      <pmSidebar :projectRequestId="projectRequestId"></pmSidebar>

      <div v-if="isAdmin">
        <AdminSidebar></AdminSidebar>
      </div>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
         <!-- Project information dynamic data  -->
         <div v-if="isAdmin">
           <AdminProjectHeader></AdminProjectHeader>
         </div>
           <div v-if="loggedInRole === 'PROJECT_MANAGER'">
              <projectInfoHeader ></projectInfoHeader>
           </div>

        <!-- Main content -->
        <section class="content">
        <div class="PMepicContainer">
            <div class="row mangeEpic">
                <div class="">
                  <div class="col-md-3 col-lg-2 text-center ">
                  <div class="row">
                  <div class="managePmMilestoneBlock btn-ripple" v-if="!projectLeadStatus">
                    <!-- <h2  class="sub_heading story" v-if="!projectLeadStatus">Product Backlog</h2> -->
                    <button class="btn btn-orange btn-lg pull-left"  data-toggle="modal" @click="openEpicModal" v-if="projectLeadStatus"><i class="fa fa-plus-circle epic-btn-icon" aria-hidden="true"></i> Add Epic </button>
                    <br v-if="projectLeadStatus">
                    <ul class="list-group epicAdd mangeEpic epic-active">

                      <li  :class="{ 'active' : isSelected(index) }" class="list-group-item sortable"  v-for="(epic,index) in epics" v-on:click="getAllStroy(epic,index)">

                         <div class="row ">
                            <div class="col-md-12 text-left"><span class="epicName pull-left ">{{epic.name}}</span></div>
                         </div>
                     </li>
                       </ul>

                     <!-- cancelled task logic  -->

                     <li :class="{ 'active':!isEpicshow }"class="list-group-item margin-top sortable"   @click="cancelledTask()" v-if="this.$store.getters.getProjectInfo.projectId">

                        <div class="row ">
                           <div class="col-md-12 text-left"><span class="epicName pull-left">Cancelled Task</span></div>
                        </div>
                    </li>

                       <!-- end cancelled task logic  -->


                    </div>
                    <div class="managePmMilestoneBlock1 btn-ripple" v-else>
                      <!-- <h2  class="sub_heading story" v-if="!projectLeadStatus">Product Backlog</h2> -->
                      <button class="btn btn-orange btn-lg pull-left"  data-toggle="modal" @click="openEpicModal" v-if="projectLeadStatus"><i class="fa fa-plus-circle epic-btn-icon" aria-hidden="true"></i> Add Epic </button>
                      <br v-if="projectLeadStatus">
                      <ul class="list-group epicAdd mangeEpic epic-active">

                        <li  :class="{ 'active' : isSelected(index) }" class="list-group-item "  v-for="(epic,index) in epics" v-on:click="getAllStroy(epic,index)">

                           <div class="row">
                              <div class="col-md-12 text-left"><span class="epicName pull-left">{{epic.name}}</span></div>
                           </div>
                       </li>

                       <!-- cancelled task logic  -->

                       <li :class="{ 'active':!isEpicshow }"class="list-group-item "   @click="cancelledTask()" v-if="this.$store.getters.getProjectInfo.projectId">

                          <div class="row">
                             <div class="col-md-12 text-left"><span class="epicName pull-left">Cancelled Task</span></div>
                          </div>
                      </li>

                         <!-- end cancelled task logic  -->

                      </ul>
                      </div>
                    </div>

                    </div>
                </div>
      <!-- *************************** epics details  ******************************************** -->
     <div class="col-md-9 col-lg-10" v-if="isEpicshow">
       <div class="epicMessage story" v-if="setEpicIdinStory!=''">
        <div class="storyTitle">
      <div class="row" v-if="projectLeadStatus ">
                <div class="col-md-10"> <h4 style="margin: 0px;">{{setEpicIdinStory.name}}</h4></div>
                <div class="col-md-2 paddLeft_0 text-right">
                    <span class="shift-right-li-epic editEpic">
                  <a type="button"  class="cursor-pointer "  @click="editEpic(setEpicIdinStory)"><span class="edit_Epic"><i class="fa fa-pencil" aria-hidden="true" ></i></span></a>
                  <a type="button"  class="cursor-pointer "   @click="deleteEpic(setEpicIdinStory)"><span class="edit_Epic"><i class="fa fa-trash-o " aria-hidden="true" ></i></span></a>
             </span>
                </div>
       </div>
       <div class="row" v-else>
         <div class="col-md-4 col-lg-4 col-sm-4 col-xs-4">
           <div class="progress marsk-as-com-bottom active oval-border" v-if="isProjectAvailable">
             <div class="progress-bar " :style="progressWidth()">
             <span>{{epicCompletionPercentage}}%</span>
             </div>
           </div>
         </div>
                 <div class="col-md-10"> <h4 style="margin: 0px;">{{setEpicIdinStory.name}}</h4></div>
                 <div class="col-md-2 paddLeft_0 text-right">
                     <span class="shift-right-li-epic editEpic" v-if="this.$store.getters.getProjectInfo.projectId ">
                       <a type="button"  class="cursor-pointer "  @click="openShareToDeveloperModal(setEpicIdinStory)"><span class="edit_Epic"><i class="fa fa-user-plus share-epic-fa-share" aria-hidden="true" ></i></span></a>
                     </span>
                 </div>
           </div>
                 <p class="estValue">Created on: <span>{{convertUtcToLocaDateTime(setEpicIdinStory.createdDateInMillis)}}</span></p>
                 <p class="no-border-bottom">{{setEpicIdinStory.description}}</p>
                </div>
               <appPOStory
               :projectLeadStatus="projectLeadStatus"
               :setEpicIdinStory="setEpicIdinStory"
               :storys="storys"
               :epicSharedAppUserList="epicSharedAppUserList"
               @changeEpicCompletionPercentage = "epicCompletionPercentage=$event"
               ></appPOStory>
             </div>
            </div>
            <!-- ***************************** closed epic details ******************************-->


            <!-- ******************** cancelled task start  *************** -->

            <div class="col-md-9 col-lg-10" v-if="!isEpicshow">
              <div class="cancelled_task_epic" v-for="epic in  getAllCancelledTask">
              <div class="cancelled_task_padding">
                    <h4>{{epic.epicName}}</h4>
                    <!-- <p class="estValue">Created on: <span>12/5/2017</span></p>
                    <p class="no-border-bottom">{{epic.epicDescription}}</p> -->

                    <div class="cancelled_task_story">
                      <div class="panel-group PM_epic_accordion" id="accordion" role="tablist" aria-multiselectable="true" >
                      <div class="storyContent">

                      <!--start of accrodian-->
                      <div class="" v-for="(story,index) in epic.userStorys" style="margin-top: 5px;border: 1px solid #cac0c0;">
                      <div class="edit_delete_details">
                        <div class="col-md-12 col-lg-12">
                          <div class="col-md-7 col-lg-8 col-sm-6 col-xs-12">
                          <!-- <span data-toggle="collapse" :data-target="'#demo'+story.id"> -->
                              <span data-toggle="collapse" :data-target="'#demo1'+story.id">
                            <span class="accordianSym">  <i aria-hidden="true" class="fa fa-plus-circle"></i>
                            </span>
                          </span>



                          <span class="storyName"><b>{{story.name}} </b></span>

                          </div>
                           <div class="col-md-2 col-lg-2 col-sm-6 col-xs-12 text-right paddRight_0">
                             <div class="addTask">
                             <!-- <button class="btn btn-orange btn-sm pull-right" @click="openTaskModal(story,index)"><i class="fa fa-plus-circle 432" aria-hidden="true" ></i> Task</button> -->
                             </div>
                           </div>
                            <div class="col-md-3 col-lg-2 col-sm-6 col-xs-12 paddRight_0">
                              <div class="col-md-6 col-lg-6 paddRight_0">
                              <!-- <span class="cmmnIcon color-orange" ><i aria-hidden="true" class="fa fa-clock-o" ></i> <p class="timeBlock estValue paddLeft_0" >Story Hours</p></span> -->
                              </div>
                               <div class="col-md-2 col-lg-3">
                              <span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-pencil cursor-pointer" v-if="projectLeadStatus"></i></span>
                              </div>
                               <div class="col-md-2 col-lg-3">
                              <span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-trash-o cursor-pointer"  v-if="projectLeadStatus"></i></span>
                              </div>
                            </div>
                        </div>
                        <div class="col-md-12 col-lg-12">
                          <!-- <p class="storyDescription">{{story.description}}</p> -->
                        </div>
                      </div>

                        <div :id="'demo1'+story.id"  class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                         <div class="panel-body">

                            <div class="row" v-for="(task , taskIndex) in story.cancelledTasks">
                              <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
                                <div class="openEditDelete">
                                  <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12 border_btm">
                                      <div class="col-md-1 col-lg-1"><p class=" estValue">#{{task.taskIdentifier}}</p></div>
                                      <div class="col-md-6 col-lg-7 col-sm-6 col-xs-12">{{task.taskName}}</div>
                                      <div class="col-md-2 col-lg-2 paddRight-0 paddLeft-0">
                                        <!-- <div class="col-md-4 col-lg-4 color-orange fs-12"><b>{{task.developerName}}</b></div> -->
                                        <!-- <div class="col-md-8 col-lg-8 text-right paddRight-0 paddLeft-0"><span class="colorYellow">{{task.taskStatus}}</span></div> -->
                                      </div>
                                      <div class="col-md-3 col-lg-2 col-sm-6 col-xs-12 paddRight_0">
                                      <!-- <div class="col-md-6 col-lg-6 paddRight_0 "><span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-clock-o"> </i> <p class="timeBlock estValue paddLeft_0" > {{task.allottedHours}}</p></span>
                                      </div> -->
                                      <div class="col-md-2 col-lg-2"><span class="cmmnIcon color-orange"><i aria-hidden="true" @click="showTaskModal(story , index, task , taskIndex)" class="fa fa-pencil"></i></span>
                                      </div>
                                      <!-- <div class="col-md-2 col-lg-2" v-if="!(task.hasMovedToWIPFirstTime || task.taskStatus === 'CANCELLED')"><span class="cmmnIcon color-yash" @click="deleteTask(story , index, task , taskIndex)"><i aria-hidden="true" class="fa fa-trash-o"></i></span> -->
                                      <!-- </div> -->
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            </div>
                       </div>

                      </div>
                    </div>
                </div>
                    </div>
                 </div>
             </div>
           </div>

           <!-- ******************************** end cancalled task ********************** -->

        </div>
    </div>
    </section>
    </div>



  <!-- add Epic Modal  -->

 <div class="modal fade" id="myModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" v-if="epicId!=''">Update Epic</h4>
          <h4 class="modal-title" v-else>Add Epic</h4>
      </div>
      <div class="modal-body">
          <div class="row">
              <div class="col-md-12">

                    <form id="epicForm" @submit.prevent="submitForm">
                       <input type="hidden" name="projectProposalId" v-model="projectProposalId">
                        <input type="hidden" name="epicId" :value="epicId">
                      <div class="form-group"isSelected  :class="{'input': true, 'is-danger': errors.has('epicName') }">
                        <input class="form-control epicName" id="epic" name="epicName" v-model="epicName"   type="text"  placeholder="Epic Name" v-validate:epicName ="'required'">
                           <p class="text-danger" v-if="errors.has('epicName')">Please specify Epic title</p>
                      </div>
                        <div class="form-group epic" >
                            <textarea class="form-control" name="epicDescription" v-model="epicDescription"  placeholder="Description"></textarea>
                        </div>
                         <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-orange" :disabled="enableButton" v-if="epicId!=''">Update</button>
                        <button type="submit" class="btn btn-orange" :disabled="enableButton" v-else>ADD</button>

                    </form>
              </div>
          </div>
      </div>
    </div>
  </div>
</div>









<!-- share epic to developer modal -->


  <div class="modal fade" id="shareEpicModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog">
  	<div class="modal-content">
  		<div class="modal-header">
  			<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
        <div class="row">
             <div class="col-md-12"><p class="estValue">Epic - {{epicName}}</p></div>
        </div>
  			<h5 class="modal-title" id="lineModalLabel">Share Epic - Select Developers</h5>
  		</div>
  		<div class="modal-body">
  		<ul class="list-group">
  		  <li class="list-group-item" v-for="appUser in appUserList">
  		  <div class="row">
  		  <div class="col-md-1" v-if="appUser.hasAnyActiveTask">
                <input class="checkbox-custom" name="checkbox-1" type="checkbox" :value="appUser.appUserId" v-model="appUser.isAppUserSelected" disabled>
            <label for="checkbox-1" class="checkbox-custom-label"></label>
  		  </div>
        <div class="col-md-1" v-else>
                <input class="checkbox-custom" name="checkbox-1" type="checkbox" :value="appUser.appUserId" v-model="appUser.isAppUserSelected">
            <label for="checkbox-1" class="checkbox-custom-label"></label>
       </div>
  		   <div class="col-md-10">
  		   <strong>{{appUser.firstName}} {{appUser.name}}</strong>
  		  </div>
          </div>
  		  </li>
  		</ul>
      <div class="text-center">
          <button type="button" class="btn btn-orange"  data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-orange" @click="shareToDeveloper">Share</button>
        </div>
      </div>
  	</div>
    </div>
  </div>

 <!-- add an edit task modal  -->



 <div class="modal fade" id="show-task-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document">
       <div class="modal-content">
          <div class="modal-header bg-grey no-border">
             <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

             <h4 class="modal-title" >Task ID #{{task.taskIdentifier}}</h4>
          </div>
          <div class="modal-body padd0">
            <ul class="nav nav-tabs nav-justified add-task-tabs" id="myTab">
             <li class="active"><a data-target="#cancelledTaskdetails" data-toggle="tab">Details</a></li>
             <li v-if="task.taskId"><a data-target="#cancelledComments" data-toggle="tab">Comments</a></li>
              <li v-if="task.taskId"><a data-target="#cancelledTaskTransaction" data-toggle="tab">History</a></li>
           </ul>

           <div class="tab-content">
             <div class="tab-pane active bg-light-gray" id="cancelledTaskdetails">
               <br><br>
               <div class="row">
                  <div class="col-md-12">


                        <div class="col-md-12">
                        <div class="form-group" >
                           <input type="text" class="form-control Design" id="taskName" placeholder="Task Title " name="taskName" v-model="task.taskName" readonly >

                        </div>
                        </div>

                        <div clas="row">
                           <div class="col-md-6">
                           <div class="form-group">
                               <input type="text" class="form-control Design" id="taskName" placeholder="Developer Name "  v-model="task.appUserFullName" disabled>
                         </div>
                         </div>
                           <div class="col-md-6">
                           <div class="form-group">
                             <input type="text" class="form-control Design" id="taskName" placeholder="Activity type"  v-model="task.activityType" disabled>
                           </div>
                          </div>
                        </div>


                        <!-- <div clas="row">
                           <div class="col-md-6">
                           <div class="form-group">
                             <select class="form-control" v-model="task.appUserId" readonly>
                              <option  value="" >Select developer</option>
                              <option  v-for="appUser in epicSharedAppUserList" :value="appUser.appUserId" :selected="task.appUserId == appUser.appUserId">{{appUser.name}}</option>
                             </select>
                         </div>
                         </div>
                           <div class="col-md-6">
                           <div class="form-group">
                           <select class="form-control" v-model="activityType" name="activityType" readonly>
                             <option  value="" >Select Activity Type</option>
                             <option  v-for="activityType in activityTypeList" :value="activityType" >{{activityType}}</option>
                           </select>

                           </div>
                          </div>
                        </div> -->
                       <div class="col-md-12">
                          <div class="form-group" >
                             <input type="text"  class="form-control Design"   placeholder="Hours"  name="allottedHours" v-model="task.allottedHours" readonly>

                          </div>
                       </div>

                        <div class="col-md-12">
                        <div class="form-group epic" >
                           <textarea class="form-control" placeholder="Description" name="task.taskDescription" v-model="task.taskDescription" readonly>{{task.taskDescription}}</textarea>
                        </div>
                        </div>
                           <div class="col-md-12 btn-ripple">

                        </div>

                  </div>
               </div>
             </div>
             <div class="tab-pane bg-light-gray" id="cancelledComments">
               <br>
               <div class="row">
                 <div class="col-xs-12">



                   <p class="paddx15"><span class="color-orange" v-if="taskCommentList && taskCommentList.length != 0"><i> {{taskCommentList.length}} Comments </i></span>
                   <span class="color-orange" v-else><i> No Comments </i></span</p>
                   <div class="scroll-comments">

                     <div class="bg-white paddx15 pdt-5 grey-border" v-for="(taskComment,  taskCommentIndex) in taskCommentList">
                       <div class="media">
                         <div class="media-left chat-image-pos" v-if="taskComment.appUserProfileImageId">
                           <img :src="getFileUrl+taskComment.appUserProfileImageId" class="img-circle media-object chat-image">
                         </div>
                         <div class="media-left chat-image-pos" v-else>
                           <img src="/src/assets/images/avatar.png" class="img-circle media-object chat-image">
                         </div>
                        <div class="media-body">
                          <span class="color-gray estValue">{{taskComment.taskCommentedBy}}</span>
                            <span class="pull-right">
                               <span class="color-gray estValue">{{convertUtcToLocaDateTime(taskComment.commentedDateInMillis)}}</span>
                             <span class="color-gray">
                             </span>
                           </span>
                          <p>{{taskComment.comment}}</p>
                        </div>
                      </div>
                     </div>

                   </div>
                 </div>
               </div>
             </div>

             <div class="tab-pane bg-light-gray" id="cancelledTaskTransaction">
               <br>
               <div class="row">
                 <div class="col-xs-12">
                   <div class="scroll-comments">

                     <div class="bg-white paddx15 pdt-5 grey-border" v-for="taskTransaction in taskTransactionList">
                       <div class="media">
                         <div class="media-left chat-image-pos" v-if="taskTransaction.appUserProfileImageId">
                           <img :src="getFileUrl+taskTransaction.appUserProfileImageId" class="img-circle media-object chat-image">
                         </div>
                         <div class="media-left chat-image-pos" v-else>
                           <img src="/src/assets/images/avatar.png" class="img-circle media-object chat-image">
                         </div>
                        <div class="media-body">
                          <span class="color-gray estValue">{{taskTransaction.transactionMadeByAppUserName}}</span>
                            <span class="pull-right">
                               <span class="color-gray estValue">{{ convertUtcToLocaDateTime(taskTransaction.transactionDateInMillis)}}</span>
                             <span class="color-gray">
                             </span>
                           </span>
                          <p>{{capitalize(taskTransaction)}}</p>
                        </div>
                      </div>
                     </div>

                   </div>
                 </div>
               </div>
             </div>

           </div>

          </div>
       </div>
    </div>
 </div>




</div>
</template>
<script>


</script>
<script>
    import adminHeader from "./adminHeader.vue"
    import pmSidebar from "./ProjectSidebar.vue"
    import POStory from './POStory.vue';
    import projectInfoHeader from "./projectInfoHeader.vue";
    import  AdminSidebar  from  "./SupperAdminSideBar.vue";
    import  adminProjectHeader  from  "./components/admin/adminProjectHeader.vue";

    export default {
        data() {
            return {
                epicCompletionPercentage:'',
                loggedInRole: this.$store.getters.getLoggedInUser.role,
                projectRequestId: '',
                epics:[],
                appUserList:[],
                epicSharedAppUserList:[],
                selectMilestone: '',
                epicId: '',
                epicName: '',
                epicDescription: '',
                milestoneId: '',
                projectProposalId: '',
                setEpicIdinStory: '',
                epicIndex:'',
                projectLeadStatus:false,
                activeClass:'',
                selected:0,
                storys: '',
                taskId: '',
                taskName: '',
                taskDescription: '',
                getAllCancelledTask:[],
                enableButton:false,
                enableButtonUpdate:false,
                enableTask:false,
                isEpicshow:true,

                activityTypes: [{
                        'activity': 'ANALYSIS'
                    },
                    {
                        'activity': 'DESIGN'
                    },
                    {
                        'activity': 'FRONTEND'
                    },
                    {
                        'activity': 'BACKEND'
                    },
                    {
                        'activity': 'QA'
                    },
                    {
                        'activity': 'SUPPORT'
                    },
                ],

                userStoryId: '',
                activityType: '',
                tasks: '',
                taskCommentList:[],
                taskTransactionList:[],
                taskName:'',
                allottedHours:'',
                task:'',
                activityTypeList:'',
                comment:'',
                taskComments:'',
                 getFileUrl:this.$store.state.SERVER_URL +'/get-file/'

            }
        },
        components: {
            "app-adminHeader": adminHeader,
            "pmSidebar": pmSidebar,
            "appPOStory":POStory,
            "projectInfoHeader":projectInfoHeader,
            'AdminSidebar': AdminSidebar,
            'AdminProjectHeader':adminProjectHeader,
        },
        created: function() {
            this.projectRequestId = this.$route.params.projectRequestId;
        },
        mounted: function() {
            this.getPropsal();
        },computed:{
          //this.isSelected(index)
          isAdmin:function(){
            return  this.loggedInRole === 'ADMIN';
          },
          projectInfo: function(){
            return this.$store.getters.getProjectInfo;
          },
           isProjectAvailable: function(){

            return this.$store.getters.getProjectInfo.isProjectAvailable;

           },
        },
        methods: {
          progressWidth: function(){
               return "width:" +this.epicCompletionPercentage+ "%";
          },
          isSelected(index){
            var app = this;
            // console.log("-----------index-----"+index);
            //     console.log("-----------selected-----"+app.selected);
                if(app.isEpicshow){
                  return index === app.selected
                }else{
                  return false;
                }

          },
            getAllStroy: function(epic,index) {
                console.log(epic);
                console.log("epic id are-----" + epic.id);
                var app = this;
                app.isEpicshow = true;

                 app.appUserList = [];

                app.selected = index;
                app.epicIndex = index;
                app.setEpicIdinStory = epic;
                app.$store.commit('setSpinner',true);
                app.$http.get(
                    this.$store.state.SERVER_URL + '/api/po-pm-admin/get-all-user-stories/' + epic.id, {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')
                        },
                    }
                ).then(function(response) {
                    app.$store.commit('setSpinner',false);
                    app.storys = response.data.payLoad.userStorys;
                    app.appUserList = response.data.payLoad.appUserList;
                    app.epicSharedAppUserList = response.data.payLoad.epicSharedAppUserList;
                    app.epicCompletionPercentage = response.data.payLoad.epicCompletionPercentage;
                });
            },
            showEditAndDelete(projectStatus){
                var app = this;
                if(projectStatus == 'REQUESTED' || projectStatus == 'REVISION_REQUESTED'){
                app.projectLeadStatus = true;
                   }
            } ,

            getTaskModel(taskStoryId) {
                var app = this;
                app.userStoryId = taskStoryId;

                console.log("user story id " + taskStoryId)
                $('#myTask').modal('show');

            },
            submitTask: function(e) {
                 app.enableTask=true;
                e.preventDefault();
                var app = this;
                var dataObj = $('#taskForm').serializeArray().reduce(function(obj, item) {
                    obj[item.name] = item.value;
                    return obj;
                }, {});
                console.log(dataObj);
                $.ajax({

                    url: this.$store.state.SERVER_URL + '/api/project-manager/save-task',
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(dataObj),
                    headers: {
                        "X-Authorization": app.$cookie.get('X-Authorization')
                    },
                    success: function(data) {
                      app.enableTask=false;
                        if (data.status === "SUCCESS") {
                            $('#myTask').modal('hide');
                            app.tasks = data.payLoad;

                        } else {
                          app.enableTask=false;
                            console.log('error');
                        }
                    }
                });

            },
            getPropsal: function() {
                var app = this;
                //console.log('epic details-----getPropsal-------------' + app.$route.params.projectRequestId);
                app.$http.get(
                    this.$store.state.SERVER_URL + '/api/po-pm/get-all-latest-epic-of-project-lead/' + app.$route.params.projectRequestId, {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')
                        },
                    }
                ).then(function(response) {
                  //console.log("==============getPropsal==================")
                  //console.log(response)
                    app.projectProposalId = response.data.payLoad.proposalId;
                    app.epics = response.data.payLoad.epicList;
                    console.log("epic list-------------");
                    console.log(app.epics);
                    if(app.epics && app.epics.length>0){
                      var epic = app.epics[0];
                      app.getAllStroy(epic,0);
                      app.activeClass ='active';
                      $('#list-group-item'+0).addClass('hidden')
                      console.log(epic)
                    }
                    app.showEditAndDelete(response.data.payLoad.projectLeadStatus);
                });


            },
            submitForm: function(e) {
                e.preventDefault();
                var app = this;
                    app.$validator.validateAll();

               if (!app.errors.any()) {
                    app.enableButton=true;
                var dataObj = $('#epicForm').serializeArray().reduce(function(obj, item) {
                    obj[item.name] = item.value;
                    return obj;
                }, {});
                console.log(dataObj);
                $.ajax({
                    url: this.$store.state.SERVER_URL + '/api/project-manager/save-epic',
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(dataObj),
                    headers: {
                        "X-Authorization": app.$cookie.get('X-Authorization')

                    },

                    success: function(data) {
                        if (data.status === "SUCCESS") {
                            app.enableButton=false;
                            console.log('success');
                            $('#myModal').modal('hide');


                         app.errors.add({ field: 'name', msg: 'woops'});
                         setTimeout(() => {
                          app.errors.clear();
                            }, 1000);

                        if(app.epicId!='' && app.epicId!= null){
                            app.epics[app.epicIndex] = data.payLoad;
                            app.getAllStroy(data.payLoad,app.epicIndex);
                        }else{

                            app.epics.push(data.payLoad);
                        }


                        } else {
                            app.enableButton=false;
                            console.log('error');
                        }
                    }
                });

                  }
                //  $('#preview_requestedform').modal('show')
            },
            openEpicModal:function(){
                   var app = this;
                 app.epicId= "";
                app.epicName="";
                app.epicDescription  ="";
                $('#myModal').modal('show');
                    app.errors.add({ field: 'name', msg: 'woops'});
                    setTimeout(() => {
                        app.errors.clear();
                }, 100);

            },
            editEpic(epic){
                var app =this;
                app.epicId=  epic.id;
                app.epicName= epic.name;
                app.epicDescription  = epic.description;
                app.enableButton=false;
                  $('#myModal').modal('show');
            },
            deleteEpic(epic){
                var app = this;

                app.$swal({
                  title: 'Are you sure?',
                  text: "This epic may contain stories. Deleting epic will delete all its stories as well!",
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes'
                }).then(function () {
                  $.ajax({
                 url: app.$store.state.SERVER_URL +'/api/project-manager/delete-epic/' +epic.id,
                 type: 'GET',
                 headers: {
                     "X-Authorization": app.$cookie.get('X-Authorization')
                 },

                 success: function(data) {
                     if (data.status === "SUCCESS") {

                         let index = app.epics.indexOf(epic);
                         app.epics.splice(index, 1);
                         app.storys={};
                         app.setEpicIdinStory='';

                     } else {
                         console.log('error');
                     }
                 }
             });
                })

            },
            openShareToDeveloperModal(epic){
              var app = this;
            //  console.log(epic)
              app.epicName = '';
              app.epicId = '';
              app.epicName = epic.name;
              app.epicId = epic.id;
              $('#shareEpicModal').modal('show')
            },
            shareToDeveloper(e){
              e.preventDefault;
            var app = this;
            var shareEpicToDeveloper = {
              appUserIdList:[],
              projectId:'',
              epicId:'',
            };

            shareEpicToDeveloper.projectId = app.$store.getters.getProjectInfo.projectId;
            shareEpicToDeveloper.epicId = app.epicId;
            console.log(shareEpicToDeveloper)
            for(var appUser of app.appUserList){
            //  console.log(appUser.name+"====="+appUser.isAppUserSelected+"  "+appUser.appUserId)
              if(appUser.isAppUserSelected){
                shareEpicToDeveloper.appUserIdList.push(appUser.appUserId);
              }
            }

            app.$http.post(
            app.$store.state.SERVER_URL+'/api/project-manager/assign-epic-to-developers' ,
            shareEpicToDeveloper,
            {
               headers: {
                   "X-Authorization": app.$cookie.get('X-Authorization')
               },
           }
            ).then(function(response){
            //console.log(response)
              if(response.data.status === "SUCCESS"){
                //console.log("successfully shared")

              app.epicSharedAppUserList = response.data.payLoad.epicSharedAppUserList;
              app.appUserList = response.data.payLoad.appUserList;
              // console.log(app.epicSharedAppUserList)
              // console.log(app.appUserList)
              }else{
                console.log("Oops something went wrong")
              }
            });
               $('#shareEpicModal').modal('hide')
            },

            cancelledTask: function(){

              var app = this;
              app.$http.get(
                     app.$store.state.SERVER_URL+'/api/dev-pm-admin/get-cancelled-tasks-in-project/'+app.$store.getters.getProjectInfo.projectId,
                    {
                      headers: {
                        "X-Authorization": app.$cookie.get('X-Authorization')
                      },
                  }
             ).then(function(response) {

               if(response.data.status=='SUCCESS'){
                 app.isEpicshow=false;

                 app.getAllCancelledTask = response.data.payLoad;
                 //console.log(app.getAllCancelledTask);
                //  app.index=-3;
                //  app.isSelected(-1);
              //  $('#CancelledTaskModal').modal('show');
               }
             });
            },
            calcTotal: function(story){
              return story.estimatedAnalysisHours +
              story.estimatedDesignHours +
              story.estimatedFrontEndHours +
              story.estimatedBackendHours +
              story.estimatedQAHours +
              story.estimatedSupportHours ;
            },

            showTaskModal(story,storyIndex,task,taskIndex){

            //  console.log(task)

              var app = this;
              app.task = task;
              // console.log("-------------task---------------")
              // console.log(app.task);
              // app.taskName = task.taskName;
              // app.allottedHours = task.allottedHours;
              // app.activityType = task.activityType;
              // app.taskIndex = taskIndex;
              // app.userStory = story;
              // app.userStoryIndex = storyIndex;
              // app.taskList = story.taskList;

               app.$store.commit('setSpinner',true);
               app.getCommentAndTransaction(task.taskId);
               app.$store.commit('setSpinner',false);

              $('#show-task-modal').modal('show');
            },

            getCommentAndTransaction(taskId){
              var app = this;
              app.$http.get(
                app.$store.state.SERVER_URL + '/api/dev-pm/task-comment-transaction/'+taskId ,
                {
                  headers: {
                    "X-Authorization": app.$cookie.get('X-Authorization')
                  },
                }
              ).then(function(response) {
                console.log(response)
               if(response.data.status === "SUCCESS"){
                app.taskCommentList =  response.data.payLoad.taskCommentList;
                app.taskTransactionList =  response.data.payLoad.taskTransactionList;

               }else{
                 console.log("something went wrong ")
               }

              });
            },

            capitalize(taskTransaction){
             if(taskTransaction.transactionStatus === 'CREATED'){
               return 'Task Created';
             }else if(taskTransaction.transactionStatus === 'ASSIGNED'){
                 return 'Task Is Assigned To '+taskTransaction.developerName;
             }else if(taskTransaction.transactionStatus === 'WORK_IN_PROGRESS'){
                 return 'Work In progress';
             }else if(taskTransaction.transactionStatus === 'COMPLETED_BY_DEVELOPER'){
                 return 'Task Completed By '+taskTransaction.developerName;
             }else if(taskTransaction.transactionStatus === 'APPROVED_BY_PM'){
                 return 'Approved By '+taskTransaction.transactionMadeByAppUserName;
             }else if(taskTransaction.transactionStatus === 'CANCELLED'){
                 return 'Cancelled';
             }
            },
            convertUtcToLocaDateTime(date){
             //console.log("convertStringtoDate------------------------>")
             var moment = require('moment-timezone');
             var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
             return moment(date).tz(timeZone).format('DD-MM-YYYY')
           },
        }
    }

</script>
<style scoped="true">
    .padding-s {
        padding: 5px;
    }

</style>
