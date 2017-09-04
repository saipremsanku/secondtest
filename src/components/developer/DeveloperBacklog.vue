<template>
    <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
      <developer-sidebar ></developer-sidebar>
      <div class="content-wrapper">
        <section class="content">
        <div class="PMepicContainer">
            <div class="row">
                <div class="mangeEpic">
                <div class="col-md-3 col-lg-2 managePmMilestoneBlock btn-ripple">
                  <!-- <h2  class="sub_heading story">Product Backlog</h2> -->
                    <ul class="list-group epicAdd mangeEpic epic-active">
                      <li :class="{ 'active' : isSelected(index) }"  class="list-group-item sortable" v-for="(epic,index) in epics" v-on:click="getAllStroy(epic,index)">{{epic.name}}</li>
                    </ul>
                         <!-- cancelled task logic  -->
                         <li :class="{ 'active':!isEpicshow }"class="list-group-item margin-top sortable"   @click="cancelledTask()" v-if="this.$store.getters.getDevProjectInfo.projectId">
                            <div class="row">
                               <div class="col-md-12 text-left"><span class="epicName pull-left">Cancelled Task</span></div>
                            </div>
                        </li>
                           <!-- end cancelled task logic  -->
                    </div>
                </div>
      <div class="col-md-9 col-lg-10">
         <div class="epicMessage story" v-if="epic!= ''">
             <div class="storyTitle">
                 <h3>{{epic.name}}</h3>
                 <p class="no-border-bottom">{{epic.description}}</p>
                </div>

                <div class="panel-group" id="accordion" v-if="isEpicshow">
                    <div class="panel panel-default accordion-platform storyContent" v-for="(story,index) in storys">
                        <div class="panel-heading dev-accordion-padding">

                          <div class="edit_delete_details">
                            <div class="col-md-12 col-lg-12">
                              <div class="col-md-9 col-lg-10">
                              <span data-toggle="collapse" data-parent="#accordion" :href="'#'+index">
                               <span class="accordianSym">  <i aria-hidden="true" class="fa fa-plus-circle"></i> </span>
                              </span>
                              <span class="storyName"><b>{{story.name}}</b></span>
                              </div>
                                <div class="col-md-3 col-lg-2">
                                  <div class="col-md-8 col-lg-6">

                                  </div>
                                   <div class="col-md-2 col-lg-3">

                                  </div>
                                   <div class="col-md-2 col-lg-3">

                                  </div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-12">
                              <p class="storyDescription">{{story.description}}</p>
                            </div>
                          </div>
                       </div>
                         <div :id="index" class="panel-collapse collapse">
                           <div class="panel-body">
                              <div class="row dev-cursor-pointer" v-for="task in story.taskList" @click="openTaskDetails(task)">
                              <div class="col-md-12">
                              <div class="openEditDelete">
                                <div class="col-xs-12 border_btm">
                                <div class="col-md-1"><p class=" estValue">#{{task.taskIdentifier}}</p></div>
                                <div class="col-md-8">
                                  <p>{{task.taskName}}</p>
                                  </div>
                                  <div class="col-md-1 text-right color-orange fs-12"><b>{{toUperCaseMethod(task.appUserName)}}</b>
                                  </div>
                                <div class="col-md-2 text-right">
                                  <span class="colorOrange" v-if="task.taskStatus === 'APPROVED_BY_PM'">{{shortStatus(task.taskStatus)}}</span>
                                  <span class="colorRed" v-else-if="task.taskStatus === 'CREATED'">{{shortStatus(task.taskStatus)}}</span>
                                  <span class="colorBlue1" v-else-if="task.taskStatus === 'ASSIGNED'">{{shortStatus(task.taskStatus)}}</span>
                                  <span class="colorYellow" v-else-if="task.taskStatus === 'WORK_IN_PROGRESS'">{{shortStatus(task.taskStatus)}}</span>
                                  <span class="colorGreen" v-else>{{shortStatus(task.taskStatus)}}</span>
                                </div>
                                  </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                         </div>
                      </div>
                    </div>

                <div class="panel-group PM_epic_accordion" id="accordion" role="tablist" aria-multiselectable="true" >
                <div class="storyContent">





                   </div>
                </div>

             </div>

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
                                <!-- <div class="col-md-2 col-lg-3">
                               <span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-pencil cursor-pointer"></i></span>
                               </div> -->
                                <!-- <div class="col-md-2 col-lg-3">
                               <span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-trash-o cursor-pointer"  v-if="projectLeadStatus"></i></span>
                               </div> -->
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
                                       <div class="col-md-2 col-lg-2"><span class="cmmnIcon color-orange"><i aria-hidden="true" @click="openTaskDetails(task )" class="fa fa-pencil"></i></span>
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
    </div>
    </section>
    </div>


    <!-- Task modal -->

    <div class="modal fade" id="see-task-details-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
       <div class="modal-dialog" role="document">
          <div class="modal-content">
             <div class="modal-header bg-grey no-border">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" >Task ID #{{task.taskIdentifier}}</h4>
             </div>
             <div class="modal-body padd0">
               <ul class="nav nav-tabs nav-justified add-task-tabs" id="myTab">
                <li class="active"><a data-target="#details" data-toggle="tab">Details</a></li>
                <li><a data-target="#comments" data-toggle="tab">Comments</a></li>
                <li v-if="task.taskId"><a data-target="#taskTransaction" data-toggle="tab">History</a></li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane active bg-light-gray" id="details">
                  <br><br>
                <div class="row">
                   <div class="col-md-12">
                      <form id="saveTaskForm" role="form" data-vv-scope="task-form">
                         <div class="col-md-12">
                         <div class="form-group" >
                            <input type="text" class="form-control Design" id="taskName" placeholder="Task Title " name="task.taskName" v-model="task.taskName" disabled>
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
                        <div class="col-md-12" v-if="(appUserId == task.appUserId)">
                           <div class="form-group">
                              <input type="text"  class="form-control Design"   placeholder="Hours"  name="allottedHours" v-model="task.allottedHours" disabled>
                           </div>
                        </div>

                         <div class="col-md-12">
                         <div class="form-group epic" >
                            <textarea class="form-control" placeholder="Description"  v-model="task.taskDescription" disabled>{{task.taskDescription}}</textarea>
                         </div>
                         </div>
                            <div class="col-md-12 btn-ripple">
                                     <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                                     <!-- <button type="submit" class="btn btn-orange">ADD</button> -->

                         </div>
                      </form>
                   </div>
                </div>
              </div>
              <div class="tab-pane bg-light-gray" id="comments">
                <br>
                <div class="row">
                  <div class="col-xs-12">
                    <form @submit.prevent="saveComment('comment-form')" v-if="task.taskStatus != 'CANCELLED' && task.taskStatus !='APPROVED_BY_PM'" data-vv-scope="comment-form">
                      <div class="form-group paddx15" :class="{'textarea': true, 'is-danger': errors.has('comment-form.comment') }">
                        <textarea class="form-control" placeholder="Add comments here" rows="3" name="comment"   v-model="comment"  v-validate:comment ="'required'"></textarea>
                          <p class="text-danger" v-if="errors.has('comment-form.comment')">Please specify comment</p>
                      </div>
                      <div class="paddx15">
                        <p><label class="font-normal"></label>
                          <button type="submit" class="btn comment-btn pull-right" :disabled="enableButton">Post</button></p>
                      </div>
                    </form>
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
                                 <span class="color-gray estValue">{{convertUtcToLocaDateTime(taskComment.transactionDateInMillis)}}</span>
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

              <div class="tab-pane bg-light-gray" id="taskTransaction">
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
                                <span class="color-gray estValue">{{convertUtcToLocaDateTime(taskTransaction.transactionDateInMillis)}}</span>
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


  import adminHeader from "../../adminHeader.vue";
  import DeveloperSidebar from './DeveloperProjectSidebar.vue';
  import projectInfoHeader from "../../projectInfoHeader.vue";
  export default {
        data(){
            return{
                enableButton:false,
                projectRequestId:'',
                epics:'',
                epic:'',
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
                task:'',

                comment:'',
                taskCommentList:[],
                taskTransactionList:[],
                showComment:false,
                getFileUrl:this.$store.state.SERVER_URL +'/get-file/',
                getAllCancelledTask:[],
                isEpicshow:true,
            }
        },
        components:{
            "app-adminHeader":adminHeader,
            "developer-sidebar":DeveloperSidebar,
            "projectInfoHeader":projectInfoHeader
        },
        created:function(){
          if(this.$store.getters.getLoggedInUser.appUserId != null){
             this.appUserId = this.$store.getters.getLoggedInUser.appUserId;
            }
        },
        computed:{
              // taskComments : function(){
              //   var app = this;
              //   return app.taskCommentList.sort(function(a,b){
              //     return (b.taskCommentId - a.taskCommentId);
              //   })
              // }
        },
        mounted: function(){
            this.getBackLog();
        },
        methods:{
          capitalize(taskTransaction){
           if(taskTransaction.transactionStatus === 'CREATED'){
             if(taskTransaction.isUnassigned){
               return 'un-assigned task from '+taskTransaction.previousUserFullName;
             }else{
               return 'created task';
             }
           }else if(taskTransaction.transactionStatus === 'ASSIGNED'){
                 if(taskTransaction.isStatusChangedFromTaskBoard){
                    return 'moved task to Backlog';
                 }else if(taskTransaction.isUpdated){
                   return 'updated';
                 }else{
                   return 'assigned task to '+taskTransaction.appUserName;
                 }

           }else if(taskTransaction.transactionStatus === 'WORK_IN_PROGRESS'){
               return 'moved task to WIP';
           }else if(taskTransaction.transactionStatus === 'COMPLETED_BY_DEVELOPER'){
               return 'completed task';
           }else if(taskTransaction.transactionStatus === 'APPROVED_BY_PM'){
               return 'approved task';
           }
           else if(taskTransaction.transactionStatus === 'CANCELLED'){
               return 'cancelled task';
           }
          },
          shortStatus(taskStatus){
           if(taskStatus === 'CREATED'){
             return 'Created';
           }else if(taskStatus === 'ASSIGNED'){
                   return 'Assigned';
           }else if(taskStatus === 'WORK_IN_PROGRESS'){
               return 'WIP';
           }else if(taskStatus === 'COMPLETED_BY_DEVELOPER'){
               return 'Completed';
           }else if(taskStatus === 'APPROVED_BY_PM'){
               return 'Approved';
           }
           else if(taskStatus === 'CANCELLED'){
               return 'Cancelled';
           }
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
          convertUtcToLocaDateTime(date){
           //console.log("convertStringtoDate------------------------>")
           var moment = require('moment-timezone');
           var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
           return moment(date).tz(timeZone).format('DD-MM-YYYY HH:mm')
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

                // console.log(epic);
                // console.log("epic id are-----"+epic.id);
                   var app = this;
                   app.isEpicshow = true;
                   app.epic = epic;
                    app.selected = index;
                    app.storys = epic.userStorys;
                    console.log(app.userStorys);

            },

            getBackLog: function(){
               var app = this;
              //  console.log("developer backlog-----------------------------------");
              //  console.log(app.$store.getters.getDevProjectInfo);
              // var projectId = this.$store.getters.getDevProjectInfo
              app.$store.commit('setSpinner',true);
               app.$http.get(
                  this.$store.state.SERVER_URL+'/api/developer/get-developer-shared-epics-stories/'+app.$store.getters.getDevProjectInfo.projectId,
                 {
                    headers: {
                     "X-Authorization": app.$cookie.get('X-Authorization')
                    },
                  }
                ).then(function(response) {
                  app.$store.commit('setSpinner',false);
                // //app.projectProposalId = response.data.payLoad[0];
                // console.log("response developer epics------------------------------");
                // console.log(response.data.payLoad);
                app.epics = response.data.payLoad;
                // console.log("store data------------------");
                // console.log(app.epics);

                if(app.epics && app.epics.length>0){
                  app.selected = 0;
                  var epic = app.epics[0];
                  app.getAllStroy(epic,0);
                }
            });
        },
        openTaskDetails(task){
          var app = this;
          app.taskCommentList = [];
          app.task = task;
          app.comment='';
          // console.log(task)
          app.getCommentAndTransaction(app.task.taskId)
          $('#see-task-details-modal').modal('show');
        },
        toUperCaseMethod(appUserName){
          if(appUserName!=null){
            return (appUserName.toLocaleUpperCase());
          }else{
            return appUserName;
          }
        },
        saveComment(scope){
          var app = this;
           app.$validator.validateAll(scope)
           if(!app.errors.any()){

         var taskComment = {
           comment:app.comment,
           taskId:app.task.taskId
         }
          // console.log(taskComment)
          app.enableButton=true;
          app.$http.post(
            app.$store.state.SERVER_URL + '/api/dev-pm/add-task-comment' ,
            taskComment,
            {
              headers: {
                "X-Authorization": app.$cookie.get('X-Authorization')
              },
            }
          ).then(function(response) {
            app.enableButton=false;
            // console.log("task adding------------->")
            // console.log(response)
           if(response.data.status === "SUCCESS"){
             app.taskCommentList.unshift(response.data.payLoad);
            //  console.log(app.taskCommentList)
           }else{
             app.enableButton=false;
             //console.log("something went wrong ")
           }
           app.enableButton=false;
           app.comment = ''
           setTimeout(()=>{
             app.errors.clear(scope);
           },10)
          });

        }
        },
        getCommentAndTransaction(taskId){
          var app = this;
          app.taskCommentList = []
          app.taskTransactionList= [];
          app.$http.get(
            app.$store.state.SERVER_URL + '/api/dev-pm/task-comment-transaction/'+taskId ,
            {
              headers: {
                "X-Authorization": app.$cookie.get('X-Authorization')
              },
            }
          ).then(function(response) {
            // console.log(response)
           if(response.data.status === "SUCCESS"){
             if(response.data.payLoad.taskCommentList){
               app.taskCommentList =  response.data.payLoad.taskCommentList;
             }
            app.taskTransactionList =  response.data.payLoad.taskTransactionList;
           }else{
            //  console.log("something went wrong ")
           }

          });
        },
        cancelledTask: function(){

          var app = this;
          app.$http.get(
                 app.$store.state.SERVER_URL+'/api/dev-pm-admin/get-cancelled-tasks-in-project/'+app.$store.getters.getDevProjectInfo.projectId,
                {
                  headers: {
                    "X-Authorization": app.$cookie.get('X-Authorization')
                  },
              }
         ).then(function(response) {

           if(response.data.status=='SUCCESS'){
             app.isEpicshow=false;

             app.getAllCancelledTask = response.data.payLoad;
            //  console.log(app.getAllCancelledTask);
            //  app.index=-3;
            //  app.isSelected(-1);
          //  $('#CancelledTaskModal').modal('show');
           }
         });
        },
        }
    }
</script>
<style>
