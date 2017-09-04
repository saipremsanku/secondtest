<template>
<div>

        <section class="content">


<div class="taskCardBlock">
    <div class="alert  inspirage-danger"  v-if="showMessage" role="alert">
      {{errorMessage}}
    </div>
    <div class="col-md-12">

      <div class="row">
        <div class="col-md-3 paddRight-0 paddLeft-0">
          <div class="taskCard_Block">Backlog {{totalBacklogHour}}Hr</div>
        </div>
        <div class="col-md-3 paddRight-0 paddLeft-0">
          <div class="taskCard_Block">WIP {{totalWipHour}}Hr</div>
        </div>
        <div class="col-md-3 paddRight-0 paddLeft-0">
          <div class="taskCard_Block">To Be Verified  {{totalDoneHour}}Hr</div>
        </div>
        <div class="col-md-3 paddRight-0 paddLeft-0">
          <div class="taskCard_Block">Done {{totalVerifiedHour}}Hr</div>
        </div>
      </div>
      <div class="row">
            <div class="col-md-3 paddRight-0 paddLeft-0 pm-scroll-tasks">
            <div class="taskCard_details_block">

              <div   :assigned-status-id="'ASSIGNED'" >
                <draggable  class="dragArea pm-mht-dragArea-ASSIGNED" :options="{group:'people'}" :list="this.$store.getters.getBacklogList" :move="backlogMove" @add="addAssignedElement">
                  <div v-for="backlog in this.$store.getters.getBacklogList" :assigned-id="backlog.taskId" :assigned-taskStatus-id="backlog.taskStatus" @click="updateTaskModal(backlog)">

                    <div class="row">
                      <div class="col-md-12">
                        <div class="taskCard border-left-orange">
                          <div class="row">
                            <div class="col-md-12">
                                    <span class="estValue">#{{backlog.taskIdentifier}}</span>
                          <i v-if="backlog.isReturnedFromCompletedByDev" class="fa fa-flag pull-right color-orange " aria-hidden="true"></i>

                            <p class=""><b>{{backlog.taskName}}</b></p>
                            <div class="row">
                              <hr/>
                            </div>
                            <div class="col-md-6 paddLeft-0">
                              <span class="estValue">{{convertUtcToLocaDateTime(backlog.updatedDateInMillis)}}</span>
                            </div>
                            <div class="col-md-6 text-right  paddRight-0">
                                  <span class="estValue"><b>{{backlog.appUserName}}</b></span>
                            </div>
                          </div>
                          </div>
                        </div>

                      </div>

                      </div>

                </div>
              </draggable>
            </div>

          </div>
        </div>


          <div class="col-md-3 paddRight-0 paddLeft-0 pm-scroll-tasks">
          <div class="taskCard_details_block">

            <div   :work-in-progress-status-id="'WORK_IN_PROGRESS'">
               <draggable  class="dragArea pm-mht-dragArea-WORK_IN_PROGRESS" :options="{group:'people'}" :list="this.$store.getters.getWorkInProgressList" :move="workInProgressMove" @add="addWorkInProgressElement" >
                  <div v-for="backlog in this.$store.getters.getWorkInProgressList" :work-in-progress-id="backlog.taskId" :work-in-progress-taskStatus-id="backlog.taskStatus" @click="openTaskDetails(backlog)">

                    <div class="taskCard border-left-orange">
                      <div class="row">
                        <div class="col-md-12">
                                <span class="estValue">#{{backlog.taskIdentifier}}</span>
                                <i v-if="backlog.isReturnedFromCompletedByDev" class="fa fa-flag pull-right color-orange " aria-hidden="true"></i>
                        <p class=""><b>{{backlog.taskName}}</b></p>
                        <div class="row">
                          <hr/>
                        </div>
                        <div class="col-md-6 paddLeft-0">
                          <span class="estValue">{{convertUtcToLocaDateTime(backlog.updatedDateInMillis)}}</span>
                        </div>
                        <div class="col-md-6 text-right  paddRight-0">
                              <span class="estValue"><b>{{backlog.appUserName}}</b></span>
                        </div>
                      </div>
                      </div>
                    </div>

               </div>
              </draggable>
            </div>

        </div>
      </div>

        <div class="col-md-3 paddRight-0 paddLeft-0 pm-scroll-tasks">
        <div class="taskCard_details_block">

          <div   :completed-by-developer-status-id="'COMPLETED_BY_DEVELOPER'">
             <draggable  class="dragArea pm-mht-dragArea-COMPLETED_BY_DEVELOPER" :options="{group:'people'}"  :list="this.$store.getters.getCompletedByDeveloperList" :move="completedByDeveloperMove" @add="addCompletedByDeveloperElement">
                <div v-for="backlog in this.$store.getters.getCompletedByDeveloperList" :completed-by-developer-id="backlog.taskId" :completed-by-developer-taskStatus-id="backlog.taskStatus" @click="openTaskDetails(backlog)">

                  <div class="taskCard border-left-orange">
                    <div class="row">
                      <div class="col-md-12">
                              <span class="estValue">#{{backlog.taskIdentifier}}</span>
                      <p class=""><b>{{backlog.taskName}}</b></p>
                      <div class="row">
                        <hr/>
                      </div>
                      <div class="col-md-6 paddLeft-0">
                        <span class="estValue">{{convertUtcToLocaDateTime(backlog.updatedDateInMillis)}}</span>
                      </div>
                      <div class="col-md-6 text-right  paddRight-0">
                            <span class="estValue"><b>{{backlog.appUserName}}</b></span>
                      </div>
                    </div>
                    </div>
                  </div>




             </div>
            </draggable>
          </div>

        </div>
      </div>

      <!--fourth colomn-->
      <div class="col-md-3 paddRight-0 paddLeft-0 pm-scroll-tasks">
      <div class="taskCard_details_block">

        <div   :approved-by-pm-status-id="'APPROVED_BY_PM'">
          <draggable  class="dragArea pm-mht-dragArea-APPROVED_BY_PM" :options="{group:'people'}"   :list="this.$store.getters.getVerifiedList" :move="verifiedMove"  @add="addApprovedByPmElement">
              <div v-for="backlog in this.$store.getters.getVerifiedList" :approved-by-pm-id="backlog.taskId" @click="openTaskDetails(backlog)">

                <div class="taskCard border-left-orange">
                  <div class="row">
                    <div class="col-md-12">
                            <span class="estValue">#{{backlog.taskIdentifier}}</span>
                    <p class=""><b>{{backlog.taskName}}</b></p>
                    <div class="row">
                      <hr/>
                    </div>
                    <div class="col-md-6 paddLeft-0">
                      <span class="estValue">{{convertUtcToLocaDateTime(backlog.updatedDateInMillis)}}</span>
                    </div>
                    <div class="col-md-6 text-right  paddRight-0">
                          <span class="estValue"><b>{{backlog.appUserName}}</b></span>
                    </div>
                  </div>
                  </div>
                </div>

           </div>
         </draggable>
        </div>

    </div>
    </div>
    <!--end-->
      </div>
    </div>
</div>
</section>


<!-- Task modal for the verified task-->

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
                    <div class="col-md-12">
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
                <form  @submit.prevent=""  v-if="task.taskStatus != 'CANCELLED' && task.taskStatus !='APPROVED_BY_PM'" data-vv-scope="comment-form">
                  <div class="form-group paddx15" :class="{'textarea': true, 'is-danger': errors.has('comment-form.comment') }">
                    <textarea class="form-control" placeholder="Add comments here" rows="3" name="comment"   v-model="comment"  v-validate:comment ="'required'"></textarea>
                      <p class="text-danger" v-if="errors.has('comment-form.comment')">Please specify comment</p>
                  </div>
                  <div class="paddx15">
                    <p>
                      <button type="submit"  class="btn btn-gray" v-model="isCancelClicked" @click="cancelTask('comment-form')"> Cancel Task </button>
                      <button type="submit" class="btn comment-btn pull-right" @click="saveComment('comment-form')">Post</button>
                  </p>
                  </div>
                </form>
                <p class="paddx15"><span class="color-orange" v-if="taskCommentList && taskCommentList.length != 0"><i> {{taskCommentList.length}} Comments </i></span>
                <span class="color-orange" v-else><i> No Comments </i></span</p>
                <div class="scroll-comments">
                  <div class="bg-white paddx15 pdt-5 grey-border" v-for="(taskComment,  taskCommentIndex) in taskComments">
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

<!-- Task modal for editing the task-->

<div class="modal fade" id="update-task-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
   <div class="modal-dialog" role="document">
      <div class="modal-content">
         <div class="modal-header bg-grey no-border">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Task ID #{{task.taskIdentifier}}</h4>

         </div>
         <div class="modal-body padd0">
           <ul class="nav nav-tabs nav-justified add-task-tabs" id="myTab">
            <li class="active"><a data-target="#update-details" data-toggle="tab">Details</a></li>
            <li><a data-target="#update-comments" data-toggle="tab">Comments</a></li>
            <li v-if="task.taskId"><a data-target="#update-taskTransaction" data-toggle="tab">History</a></li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane active bg-light-gray" id="update-details">
              <br><br>
            <div class="row">
               <div class="col-md-12">
                  <form id="saveTaskForm"  @submit.prevent="updateTask" role="form">
                     <div class="col-md-12">
                     <div class="form-group" :class="{'input': true, 'is-danger': errors.has('taskName')}">
                        <input type="text" class="form-control Design" id="taskName" placeholder="Task Title " name="taskName" v-model="task.taskName" v-validate data-vv-rules="required">
                        <p class="text-danger" v-if="errors.has('taskName')">Please specify Task title</p>
                     </div>
                     </div>
                     <div clas="row">
                        <div class="col-md-6">
                        <div class="form-group">
                          <select class="form-control" name="appUserId" v-model="appUserId">
                           <option  value="">Select Developer</option>
                            <option  v-for="developer in epicSharedDeveloperList"  :value="developer.appUserId" >{{developer.appUserFullName}}</option>
                          </select>
                      </div>
                      </div>
                        <div class="col-md-6">
                        <div class="form-group">
                        <select class="form-control" name="activityType" v-model="task.activityType" :class="{'select': true, 'is-danger': errors.has('activityType')}" v-validate data-vv-rules="required">
                          <option  value="" >Select Activity Type</option>
                          <option  v-for="activityType in activityTypeList" :value="activityType"  :selected="(activityType == task.activityType)">{{activityType}}</option>
                        </select>
                          <p class="text-danger" v-if="errors.has('activityType')">Please select Activity type</p>
                        </div>
                       </div>
                     </div>
                    <div class="col-md-12">
                       <div class="form-group" :class="{'input': true, 'is-danger': errors.has('allottedHours')}">
                          <input type="text"  class="form-control Design"   placeholder="Hours"  name="allottedHours" v-model="task.allottedHours" v-validate data-vv-rules="required|numeric|min_value:1|max_value:4">
                            <p class="text-danger" v-if="errors.has('allottedHours')">Please specify time between 1 to 4 hours only</p>
                       </div>
                    </div>

                     <div class="col-md-12">
                     <div class="form-group epic" >
                        <textarea class="form-control" placeholder="Description" name="task.taskDescription" v-model="task.taskDescription">{{task.taskDescription}}</textarea>
                     </div>
                     </div>
                        <div class="col-md-12 btn-ripple">
                                 <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                                 <button type="submit" class="btn btn-orange" :disabled="enableButton" >Update</button>
                     </div>
                  </form>
               </div>
            </div>
          </div>
          <div class="tab-pane bg-light-gray" id="update-comments">
            <br>
            <div class="row">
              <div class="col-xs-12">
                <!-- <form @submit.prevent="saveComment('comment-form')" v-if="task.taskStatus != 'CANCELLED' && task.taskStatus !='APPROVED_BY_PM'" data-vv-scope="comment-form">
                  <div class="form-group paddx15" :class="{'textarea': true, 'is-danger': errors.has('comment-form.comment') }">
                    <textarea class="form-control" placeholder="Add comments here" rows="3" name="comment"   v-model="comment"  v-validate:comment ="'required'"></textarea>
                      <p class="text-danger" v-if="errors.has('comment-form.comment')">Please specify comment</p>
                  </div>
                  <div class="paddx15">
                    <p>
                      <label class="font-normal"><input type="checkbox" v-model="isCancelClicked" @click="cancelTask('comment-form')"> Cancel Task </label>
                      <button type="submit" class="btn comment-btn pull-right" :disabled="enableButton">Post</button>
                    </p>
                  </div>
                </form> -->
                <form  @submit.prevent=""  v-if="task.taskStatus != 'CANCELLED' && task.taskStatus !='APPROVED_BY_PM'" data-vv-scope="comment-form">
                  <div class="form-group paddx15" :class="{'textarea': true, 'is-danger': errors.has('comment-form.comment') }">
                    <textarea class="form-control" placeholder="Add comments here" rows="3" name="comment"   v-model="comment"  v-validate:comment ="'required'"></textarea>
                      <p class="text-danger" v-if="errors.has('comment-form.comment')">Please specify comment</p>
                  </div>
                  <div class="paddx15">
                    <p>
                      <button type="submit"  class="btn btn-gray" v-model="isCancelClicked" @click="cancelTask('comment-form')"> Cancel Task </button>
                      <button type="submit" class="btn comment-btn pull-right" @click="saveComment('comment-form')">Post</button>
                  </p>
                  </div>
                </form>
                <p class="paddx15"><span class="color-orange" v-if="taskCommentList && taskCommentList.length != 0"><i> {{taskCommentList.length}} Comments </i></span>
                <span class="color-orange" v-else><i> No Comments </i></span</p>
                <div class="scroll-comments">
                  <div class="bg-white paddx15 pdt-5 grey-border" v-for="(taskComment,  taskCommentIndex) in taskComments">
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

          <div class="tab-pane bg-light-gray" id="update-taskTransaction">
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



<!-- Moved to WIP -->
<div id="confirm-to-done-task" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Task ID #{{taskIdentifier}}</h4>
      </div>
      <div class="modal-body">
        <p>Are you sure?</p>
        <p>Once a task is moved to Done, its status cannot be changed.</p>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-default" @click="changeTask">OK</button>
      </div>
    </div>

  </div>
</div>

<!-- Moved to  done block-->
<div id="confirm-to-wip-task" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Task ID #{{taskIdentifier}}</h4>
      </div>

      <div class="modal-body">
        <p>Are you sure?</p>
        <p>Once a task is moved to WIP, it cannot be updated even if moved back to Backlog.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-default" @click="changeTask">OK</button>
      </div>
    </div>

  </div>


</div>
</div>
</template>



<script>
    import adminHeader from "../../adminHeader.vue";
    import pmSidebar from "../../ProjectSidebar.vue"
    import projectInfoHeader from "../../projectInfoHeader.vue";
    import draggable from 'vuedraggable'
    import  AdminSidebar  from  "../../SupperAdminSideBar.vue";
    import  adminProjectHeader  from  "../admin/adminProjectHeader.vue";

export default {

       data(){
         return{
            showMessage:false,
            errorMessage:'',
            loggedInRole: this.$store.getters.getLoggedInUser.role,
            taskId:'',
            taskIdentifier:'',
            changeStatus:'',
            appUserId:'',
            enableButton:false,
            task:{
              taskName:'',
              appUserId:'',
              activityType:'',
              appUserFullName:'',
              taskDescription:'',
              activityType:'',
              taskId:'',
              userStoryId:'',
              allottedHours:'',
              projectId:'',
            },
            activityTypeList:[
              'ANALYSIS',
              'DESIGN',
              'FRONTEND',
              'BACKEND',
              'QA',
              'SUPPORT',
              'IOS_NATIVE',
              'ANDROID_NATIVE'
            ],
            comment:'',
            taskCommentList:[],
            taskTransactionList:[],
            epicSharedDeveloperList:[],
            showComment:false,
            isCancelClicked:false,
            getFileUrl:this.$store.state.SERVER_URL +'/get-file/'
         }
       },
       created: function(){
        this.projectRequestId = this.$route.params.projectRequestId;
        //checking roles
        if(this.$store.getters.getLoggedInUser.role === 'PROJECT_MANAGER'){
        var projectTaskList = this.$store.getters.getProjectTaskList;
        if(!(projectTaskList && projectTaskList != '') || (this.projectRequestId != this.$store.getters.getProjectInfo.id)){
          this.getProjectTaskListData(this.projectRequestId);
        }
    }else if(this.$store.getters.getLoggedInUser.role === 'ADMIN'){
       this.getProjectTaskListData(this.projectRequestId);
      }
     },
     watch: {
         '$route': function(newRoute, oldRoute) {
           if(oldRoute.fullPath != newRoute.fullPath){
             this.projectRequestId = this.$route.params.projectRequestId;
             var projectTaskList = this.$store.getters.getProjectTaskList;
             if(!(projectTaskList && projectTaskList != '') || (this.projectRequestId != this.$store.getters.getProjectInfo.id)){
               this.getProjectTaskListData(this.projectRequestId);
             }
           }
         },
       },
     route: {
       canReuse: true,
     },
     computed:{

      totalBacklogHour:function(){
        var count = 0;
        for (var backlog of this.$store.getters.getBacklogList) {
          count += backlog.allottedHours;
        }
        return count;
      },
      totalWipHour:function(){
        var count = 0;
        for (var backlog of this.$store.getters.getWorkInProgressList) {
          count += backlog.allottedHours;
        }
        return count;
      },
      totalDoneHour:function(){
        var count = 0;
        for (var backlog of this.$store.getters.getCompletedByDeveloperList) {
          count += backlog.allottedHours;
        }
        return count;
      },
      totalVerifiedHour:function(){
        var count = 0;
        for (var backlog of this.$store.getters.getVerifiedList) {
          count += backlog.allottedHours;
        }
        return count;
      },
       taskComments : function(){
         var app = this;
         if(app.taskCommentList){
           return app.taskCommentList.sort(function(a,b){
             return (b.taskCommentId - a.taskCommentId);
           })
         }else{
            return app.taskCommentList
         }
       },
     },

     mounted:function(){
      //  this.getProjectBackLogList()
      //  this.getWorkInProgressList()
      //  this.getCompletedByDeveloperList()
      //  this.getVerifiedList()


     },

     components:{
         "app-adminHeader":adminHeader,
         "pmSidebar":pmSidebar,
         "projectInfoHeader":projectInfoHeader,
         draggable,
         'AdminSidebar': AdminSidebar,
         'AdminProjectHeader':adminProjectHeader,
     },

     methods:{
          backlogMove(e){
             var app = this;
             app.taskId='';
             app.taskId = e.draggedContext.element.taskId;
             app.taskIdentifier = e.draggedContext.element.taskIdentifier;
             var appUserId =  e.draggedContext.element.appUserId;
             var dragElement = e.draggedContext.element.taskStatus;
            // if(!appUserId || (this.loggedInRole === 'ADMIN')){
            //    return false;
            //  }else
              if(dragElement && e.relatedContext.element){
               var dropElement = e.relatedContext.element.taskStatus;
               //console.log(dragElement+"   "+dropElement)
               if(dragElement === 'ASSIGNED' && dropElement === 'WORK_IN_PROGRESS'){
                 app.changeStatus = dropElement;
                 //$('#confirm-to-wip-task').modal('show');
                 return true;
                }else{
                  return false;
                }
              }else{
                var drop = e.relatedContext.component.$el.className ;
                if(dragElement ===  'ASSIGNED' && drop === 'dragArea pm-mht-dragArea-WORK_IN_PROGRESS'){
                  app.changeStatus = drop;
                  //$('#confirm-to-wip-task').modal('show');
                  return true;
                }else{
                  return false;
                }
              }
          },
          workInProgressMove(e){
            var app = this;
            app.taskId='';
            app.taskId = e.draggedContext.element.taskId;
            app.taskIdentifier = e.draggedContext.element.taskIdentifier;
            var dragElement = e.draggedContext.element.taskStatus;
              // if(this.loggedInRole === 'ADMIN'){
              //   return false;
              // }else
               if(dragElement && e.relatedContext.element){
                 var dropElement = e.relatedContext.element.taskStatus;
                  //console.log("workInProgressMove === "+dragElement+"   ===========  "+dropElement)
                   if(dragElement ===  'WORK_IN_PROGRESS' && (dropElement === 'COMPLETED_BY_DEVELOPER' || dropElement === 'ASSIGNED' ||  dropElement === 'CREATED')){
                    return true;
                  }else{
                    return false;
                  }
            }else{
              var drop = e.relatedContext.component.$el.className ;
              if(dragElement ===  'WORK_IN_PROGRESS' && (drop === 'dragArea pm-mht-dragArea-ASSIGNED' || drop === 'dragArea pm-mht-dragArea-CREATED' || drop === 'dragArea pm-mht-dragArea-COMPLETED_BY_DEVELOPER')){
                return true;
              }else{
                return false;
              }
            }
          },
          completedByDeveloperMove(e){
            var app = this;
            app.taskId='';
            app.changeStatus='';
            app.taskId = e.draggedContext.element.taskId;
            app.taskIdentifier = e.draggedContext.element.taskIdentifier;
            var dragElement = e.draggedContext.element.taskStatus;
            // if(this.loggedInRole === 'ADMIN'){
            //   return false;
            // }else
            if(dragElement && e.relatedContext.element){
                 var dropElement = e.relatedContext.element.taskStatus;
                 //console.log("completedByDeveloperMove === "+dragElement+"   ===========  "+dropElement+"  "+e.draggedContext.element.taskId)
                   if(dragElement === 'COMPLETED_BY_DEVELOPER' && dropElement === 'APPROVED_BY_PM'){
                     app.changeStatus = dropElement;
                     //$('#confirm-to-done-task').modal('show');
                     return true;
                  }else if(dragElement === 'COMPLETED_BY_DEVELOPER' &&  (dropElement === 'WORK_IN_PROGRESS' ||  dropElement === 'ASSIGNED' ||  dropElement === 'CREATED')){
                    return true;
                  }else{
                    return false;
                  }
            }else{
              var drop = e.relatedContext.component.$el.className ;
              if(dragElement ===  'COMPLETED_BY_DEVELOPER' && drop === 'dragArea pm-mht-dragArea-APPROVED_BY_PM'){
                app.changeStatus = drop;
                //$('#confirm-to-done-task').modal('show');
                return true;
              }else if(dragElement ===  'COMPLETED_BY_DEVELOPER' && (drop === 'dragArea pm-mht-dragArea-WORK_IN_PROGRESS' || drop === 'dragArea pm-mht-dragArea-ASSIGNED' || drop === 'dragArea pm-mht-dragArea-CREATED' )){
                return true;
              }else{
                return false;
              }
            }
          },
          verifiedMove(e){
            var app = this;
            return false
          },

          changeTask(){
              var app = this;
              //console.log(" app.taskId "+app.taskId+"  app.changeStatus  "+app.changeStatus)
              app.filterStatus(app.changeStatus)
              //console.log("after  filter status ======  "+app.changeStatus)
              app.changeTaskStatus(app.taskId, app.changeStatus);
          },
       addAssignedElement(e){
            var app = this;
            var toBeChangeStatus = e.target.parentElement.getAttribute('assigned-status-id')
            app.changeTaskStatus(app.taskId, toBeChangeStatus);
       },

        addWorkInProgressElement(e){
           var app = this;
            //console.log("going to Work In Progress block ----->")
            var toBeChangeStatus = e.target.parentElement.getAttribute('work-in-progress-status-id')
            app.changeTaskStatus(app.taskId, toBeChangeStatus);
        },
        addCompletedByDeveloperElement(e){
           var app = this;

           var toBeChangeStatus = e.target.parentElement.getAttribute('completed-by-developer-status-id')
           //console.log("  toBeChangeStatus==  "+toBeChangeStatus)
            app.changeTaskStatus(app.taskId, toBeChangeStatus);
        },
        addApprovedByPmElement(e){
           var app = this;
           var toBeChangeStatus = e.target.parentElement.getAttribute('approved-by-pm-status-id')
           //console.log("completedByDeveloperId == "+completedByDeveloperId+" toBeChangeStatus==  "+toBeChangeStatus)
           app.changeTaskStatus(app.taskId, toBeChangeStatus);
        },
       changeTaskStatus(taskId , taskStatus){
         var app = this;
         var taskObject={
           taskId:'',
           taskStatus:'',
         }
         taskObject.taskId = taskId,
         taskObject.taskStatus = taskStatus;
         app.$store.commit('setSpinner', true);
         app.$http.post(
           app.$store.state.SERVER_URL+'/api/dev-pm/start-task',
           taskObject,
           {
              headers:
               {
                          "X-Authorization": app.$cookie.get('X-Authorization')
              },
            }
         ).then(function(response){
          //console.log(response)
          if(response.data.status === 'SUCCESS'){
            if(taskStatus === 'APPROVED_BY_PM'){
              app.$store.commit('setProjectCompletionPercenatge', response.data.payLoad.projectPercentageCompleted);
            }
             app.$store.commit('setTaskToProject' , response.data.payLoad)
             //console.log( app.$store.getters)
          }else{
            //console.log("error is coming")
          }
           app.$store.commit('setSpinner', false);
           //$('#confirm-to-done-task').modal('hide');
           //$('#confirm-to-wip-task').modal('hide');
         })
       },
       openTaskDetails(task){
         var app = this;
         app.task = task;
         app.appUserId = '';
         app.taskCommentList = task.taskCommentList
         app.getCommentAndTransaction(app.task.taskId);
         $('#see-task-details-modal').modal('show');
       },
         updateTaskModal(task){
         var app = this;
         app.task = task;
         if(task.appUserId){
           app.appUserId = task.appUserId;
         }else{
           app.appUserId = '';
         }
         app.isCancelClicked = false;
         app.task.userStoryId = task.userStoryId;
         app.comment = ''
         setTimeout(()=>{
           app.errors.clear('comment-form');
         },50);
         app.getCommentAndTransaction(app.task.taskId);
      //   app.epicSharedDeveloperList = task.epicSharedDeveloperList;
         if(app.task.hasMovedToWIPFirstTime){
              $('#see-task-details-modal').modal('show');
         }else{
           app.getEpicSharedDeveloperList(task.epicId);
           console.log("task details--------",task);

        $('#update-task-modal').modal('show');
         }
       },
       updateTask(e){
          e.preventDefault();
         var app = this;
         app.$validator.validateAll()
         //console.log("before going ------>")
         //console.log(app.task)
         if(!app.errors.any()){
           app.enableButton=true;
            app.task.projectId  = app.$store.getters.getProjectInfo.projectId;
         app.task.appUserId = app.appUserId;
         app.$store.commit('setSpinner',true);
         app.$http.post(
           app.$store.state.SERVER_URL+'/api/project-manager/save-task',
           app.task,
           {
             headers: {
               "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
             },
           },
         ).then(function(result){
           //console.log(result)
           if(result.data.status == "SUCCESS"){
             app.enableButton=false;
             app.$store.commit('setProjectCompletionPercenatge', result.data.payLoad.projectPercentageCompleted);
                 $('#update-task-modal').modal('hide')
                 var taskStatus = result.data.payLoad.taskStatus;

               app.$store.commit('setTaskToProject' , result.data.payLoad)
               //console.log( app.$store.getters)

           }else{
             app.enableButton=false
             //console.log("internal server error")
           }
              app.$store.commit('setSpinner',false);
         });
       }
       },

       saveComment(scope){
         var app = this;
         app.$validator.validateAll(scope)
         if(!app.errors.any()){
           app.enableButton=true;
        var taskComment = {
          comment:app.comment,
          taskId:app.task.taskId
        }
         //console.log(taskComment)
         app.$http.post(
           app.$store.state.SERVER_URL + '/api/dev-pm/add-task-comment' ,
           taskComment,
           {
             headers: {
               "X-Authorization": app.$cookie.get('X-Authorization')
             },
           }
         ).then(function(response) {
           setTimeout(()=>{
             app.errors.clear(scope);
           },10)
           //console.log(response)
          if(response.data.status === "SUCCESS"){
            app.enableButton=false;
            app.taskCommentList.push(response.data.payLoad);
          }else{
            app.enableButton=false;
            //console.log("something went wrong ")
          }
          app.comment = ''
         });
       }
       },

       cancelTask(scope){

          var app = this;
          app.$validator.validateAll(scope);
          if(!app.errors.any()){
         var taskObject={
           taskId:'',
           taskStatus:'',
         }
         taskObject.taskId = app.task.taskId,
         taskObject.taskStatus = 'CANCELLED';
         taskObject.comment = app.comment,
        //  console.log("going to camcel");
        //  console.log(taskObject);

         app.$swal({
         title: 'Are you sure?',
         text: "You won't be able to revert this!",
         type: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes'
         }).then(function () {
           //app.saveComment('comment-form')
             app.$store.commit('setSpinner',true);
           app.$http.post(
             app.$store.state.SERVER_URL+'/api/project-manager/cancel-task',
             taskObject,

             {
               headers: {
                 "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
               },
             },
           ).then(function(result){
            //  console.log("cancel task----------------------------------------->")
               //console.log(result)
                app.isCancelClicked = false;
                 app.comment = '';
                 $('#see-task-details-modal').modal('hide');
                 $('#update-task-modal').modal('hide');
             if(result.data.status == "SUCCESS"){
                 app.$store.commit('setProjectCompletionPercenatge', result.data.payLoad.projectPercentageCompleted);
                  $('#add-task-modal').modal('hide')
                  app.$store.commit('setTaskToProject', result.data.payLoad);
             }else{
               app.message = true;
               app.errorMessage = result.data.errorMessage;
               setTimeout(function(){
                   app.message = false;
               }, 3000);
               //console.log("internal server error")
             }
               app.$store.commit('setSpinner',false);
             setTimeout(()=>{
               app.errors.clear(scope);
             },10);
           });
        })
      }else{
        app.isCancelClicked = false;
      }
    },
    filterStatus(statusClass){
      var app = this;
      if(statusClass.endsWith('WORK_IN_PROGRESS')){
        app.changeStatus = 'WORK_IN_PROGRESS'
      }else if(statusClass.endsWith('ASSIGNED')){
        app.changeStatus = 'ASSIGNED'
      }else if(statusClass.endsWith('COMPLETED_BY_DEVELOPER')){
        app.changeStatus = 'COMPLETED_BY_DEVELOPER'
      }else if(statusClass.endsWith('APPROVED_BY_PM')){
        app.changeStatus = 'APPROVED_BY_PM'
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
        //console.log(response)
       if(response.data.status === "SUCCESS"){
         if(response.data.payLoad.taskCommentList){
           app.taskCommentList =  response.data.payLoad.taskCommentList;
         }
        app.taskTransactionList =  response.data.payLoad.taskTransactionList;
       }else{
         //console.log("something went wrong ")
       }

      });
    },
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

     getProjectTaskListData(projectRequestId){
         //console.log("=getProjectTaskListData method is calling-----------=== ")
         var app =this;
          app.$store.commit('setSpinner',true);
         app.$http.get(
           app.$store.state.SERVER_URL+'/api/pm-admin/get-all-tasks-in-project-by-leadId/'+projectRequestId ,
           {
             headers: {
               "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
             },
           },
         ).then(function(response){
            app.$store.commit('setSpinner',false);
            //console.log("=getProjectTaskListData---===")
            //console.log(response)
            if(response.data.status == "SUCCESS"){
              console.log('get task list------',response.data.payLoad);
              app.$store.commit('setProjectTaskList' , response.data.payLoad);
              app.setProjectInfo(projectRequestId);
            }else{
              //console.log("error")
            }
        });
      },
      setProjectInfo(projectRequestId){
              var app =this;
              app.$store.commit('setProjectInfo', {});//removing earlier project info
              app.$http.get(
               app.$store.state.SERVER_URL+'/api/po-pm-admin/get-project-lead/'+projectRequestId ,
               {
                 headers:{
                    "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
                 }
               }

             ).then(function(response){
               //console.log("setProjectInfo methosd is calling------------>")
               //console.log(response)
               if(response.data.status == "SUCCESS"){
                 app.$store.commit('setProjectInfo',  response.data.payLoad);
               }else{
                 //console.log("something went wrong")
               }
             });
     },
     convertUtcToLocaDateTime(date){
      //console.log("convertStringtoDate------------------------>")
      var moment = require('moment-timezone');
      var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return moment(date).tz(timeZone).format('DD-MM-YYYY HH:mm')
    },

     getEpicSharedDeveloperList(epicId){
       var app = this;
       app.$store.commit('setSpinner',true);
       $.ajax({
            url:  app.$store.state.SERVER_URL+'/api/dev-pm-admin/shared-developer-list/'+epicId,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            data: {},
            headers: {
                "X-Authorization": app.$cookie.get('X-Authorization')
            },
            success: function(response) {
              //console.log(response)
              app.epicSharedDeveloperList = response.payLoad;
              app.$store.commit('setSpinner',false);
            }
        });
     },

     },
}
</script>
