<template>
  <div>
<!-- <div class="taskCardBlock"> -->
  <!-- <app-adminHeader></app-adminHeader>
  <developer-sidebar></developer-sidebar> -->

  <!-- <div class="content-wrapper"> -->
         <!-- <projectInfoHeader ></projectInfoHeader> -->
      <section class="content mht-dev-tb">
          <!-- <h4 class="sub_heading">Task Board</h4> -->
  <div class="taskCardBlock">

  <div class="col-md-12">

    <div class="row">
      <div class="col-md-3 paddRight-0 paddLeft-0">
        <div class="taskCard_Block">Backlog {{totalBacklogHour}}Hr</div>
      </div>
      <div class="col-md-3 paddRight-0 paddLeft-0">
        <div class="taskCard_Block">WIP {{totalWipHour}}Hr</div>
      </div>
      <div class="col-md-3 paddRight-0 paddLeft-0">
        <div class="taskCard_Block">Done  {{totalDoneHour}}Hr</div>
      </div>
      <div class="col-md-3 paddRight-0 paddLeft-0">
        <div class="taskCard_Block">Verified{{totalVerifiedHour}}Hr</div>
      </div>
    </div>
    <div class="row">
          <div class="col-md-3 paddRight-0 paddLeft-0 dev-scroll-tasks">
          <div class="taskCard_details_block">

            <div   :assigned-status-id="'ASSIGNED'" >
              <draggable  class="dragArea dev-mht-dragArea-ASSIGNED" :options="{group:'people'}" :list="getOwnBackLogList" :move="backlogMove" @add="addAssignedElement">
                <div v-for="backlog in getOwnBackLogList" :assigned-id="backlog.taskId" :assigned-taskStatus-id="backlog.taskStatus"  @click="openTaskDetails(backlog)">

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

                    <!-- code for disable  task-->

                    <div v-for="backlog in getOtherBackLogList" :assigned-id="backlog.taskId" :assigned-taskStatus-id="backlog.taskStatus"  @click="openTaskDetails(backlog)">
                      <div class="taskCard taskCardBgGray">
                      <div class="row">
                        <div class="col-md-12">
                          <span class="estValue">#{{backlog.taskIdentifier}}</span>
                          <p>{{backlog.taskName}}</p>
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

                    <!--end code for disable tasks-->
              </div>
            </draggable>
          </div>



        </div>
      </div>


        <!--second colomn-->
        <div class="col-md-3 paddRight-0 paddLeft-0 dev-scroll-tasks">
        <div class="taskCard_details_block">

          <div   :work-in-progress-status-id="'WORK_IN_PROGRESS'">
             <draggable  class="dragArea dev-mht-dragArea-WORK_IN_PROGRESS" :options="{group:'people'}" :list="getWorkInProgressList" :move="workInProgressMove" @add="addWorkInProgressElement" >
                <div v-for="backlog in getWorkInProgressList" :work-in-progress-id="backlog.taskId" :work-in-progress-taskStatus-id="backlog.taskStatus"  @click="openTaskDetails(backlog)">

                  <div class="taskCard border-left-orange" v-if="(appUserId == backlog.appUserId)">
                    <div class="row" >
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

              <!-- code for disable  task-->
              <div class="taskCard taskCardBgGray" v-else>
                <div class="row">
                  <div class="col-md-12">
                    <span class="estValue">#{{backlog.taskIdentifier}}</span>
                    <p>{{backlog.taskName}}</p>
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

              <!--end code for disable tasks-->
             </div>
            </draggable>
          </div>

      </div>
    </div>

      <div class="col-md-3 paddRight-0 paddLeft-0 dev-scroll-tasks">
      <div class="taskCard_details_block">

        <div   :completed-by-developer-status-id="'COMPLETED_BY_DEVELOPER'">
           <draggable  class="dragArea dev-mht-dragArea-COMPLETED_BY_DEVELOPER" :options="{group:'people'}"  :list="getPendingApprovalList" :move="completedByDeveloperMove"  @add="addCompletedByDeveloperElement">
              <div v-for="backlog in getPendingApprovalList" :completed-by-developer-id="backlog.taskId" :completed-by-developer-taskStatus-id="backlog.taskStatus"  @click="openTaskDetails(backlog)">

                <div class="taskCard border-left-orange" v-if="(appUserId == backlog.appUserId)" >
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

                <!-- code for disable  task-->
                <div class="taskCard taskCardBgGray" v-else>
                  <div class="row">
                    <div class="col-md-12">
                      <span class="estValue">#{{backlog.taskIdentifier}}</span>
                      <p>{{backlog.taskName}}</p>
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
    <div class="col-md-3 paddRight-0 paddLeft-0 dev-scroll-tasks">
    <div class="taskCard_details_block">

      <div   :approved-by-pm-status-id="'APPROVED_BY_PM'">

            <div v-for="backlog in getDoneTasksList" :approved-by-pm-id="backlog.taskId"  @click="openTaskDetails(backlog)">

              <div class="taskCard border-left-orange" v-if="(appUserId == backlog.appUserId)">
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

              <!-- code for disable  task-->
              <div class="taskCard taskCardBgGray" v-else>
                <div class="row">
                  <div class="col-md-12">
                    <span class="estValue">#{{backlog.taskIdentifier}}</span>
                    <p>{{backlog.taskName}}</p>
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
  </div>
  <!--end-->
    </div>
  </div>
  </div>
  </section>
  <!-- </div> -->

<!-- </div> -->

<!-- Task modal -->

<div class="modal fade" id="see-task-details-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
   <div class="modal-dialog" role="document">
      <div class="modal-content">
         <div class="modal-header bg-grey no-border">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
             <!-- <p class="modal-title estValue">Epic - {{task.epicName}}</p><br>
              <p class="modal-title estValue">Story - {{task.storyName}}</p> -->
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
                          <!-- <select class="form-control" v-model="task.developerId">
                           <option  value="" disabled>Select developer</option>
                           <option  v-for="developer in developerList" :value="developer.developerId" >{{developer.name}}</option>
                          </select> -->
                      </div>
                      </div>
                        <div class="col-md-6">
                        <div class="form-group">
                          <input type="text" class="form-control Design" id="taskName" placeholder="Activity type"  v-model="task.activityType" disabled>
                        <!-- <select class="form-control" v-model="task.developerId">
                          <option  value="" >Select Activity Type</option>
                           <option  v-for="activityType in activityTypeList" :value="activityType" >{{activityType}}</option>
                        </select> -->
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

<!-- Modal -->
<div id="confirm-task" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
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
import DeveloperSidebar from './DeveloperProjectSidebar.vue';
import projectInfoHeader from "../../projectInfoHeader.vue";
import draggable from 'vuedraggable';

export default {
      data(){
          return{
              projectInformation:'',

              taskId:'',
              taskIdentifier:'',
              changeStatus:'',
              appUserId:'',
              enableButton:false,
              task:{
                taskName:'',
                appUserId:'',
                activityType:'',
                developerFullName:'',
                taskDescription:'',
                activityType:'',
                taskId:'',
                allottedHours:'',

              },
              comment:'',
              taskCommentList:[],
              taskTransactionList:[],
              showComment:false,
              getFileUrl:this.$store.state.SERVER_URL +'/get-file/'

          }
      },
      components:{
          "app-adminHeader":adminHeader,
          "developer-sidebar":DeveloperSidebar,
          "projectInfoHeader":projectInfoHeader,
          draggable
      },
       created:function(){
         if(this.$store.getters.getLoggedInUser.appUserId != null){
            this.appUserId = this.$store.getters.getLoggedInUser.appUserId;
        }
        var projectId = this.$route.params.projectId;
        var developerTaskList = this.$store.getters.getDeveloperTaskList;
        //console.log("coming in created ------------------------------------>"+projectId)
        if(!(developerTaskList && developerTaskList != '') || (projectId != this.$store.getters.getDevProjectInfo.projectId)){
           this.$store.commit('setDeveloperTaskList', {});
          this.getDeveloperProjectTaskListData(projectId);
        }
       },
       watch: {
           '$route': function(newRoute, oldRoute) {
             if(oldRoute.fullPath != newRoute.fullPath){
               var projectId = this.$route.params.projectId;
               var developerTaskList = this.$store.getters.getDeveloperTaskList;
               //console.log("coming in watcher ------------------------------------>"+projectId)
               if(!(developerTaskList && developerTaskList != '') || (projectId != this.$store.getters.getDevProjectInfo.projectId)){
                  this.$store.commit('setDeveloperTaskList', {});
                 this.getDeveloperProjectTaskListData(projectId);
               }
             }
           },
         },
      computed: {

              totalBacklogHour:function(){
                var count = 0;
                for (var backlog of this.$store.getters.getDeveloperOwnBacklogList) {
                  count += backlog.allottedHours;
                }
                return count;
              },
              totalWipHour:function(){
                var count = 0;
                for (var backlog of this.$store.getters.getDeveloperWorkInProgressList) {
                 if(this.appUserId === backlog.appUserId){
                   count += backlog.allottedHours;
                 }
                }
                return count;
              },
              totalDoneHour:function(){
                var count = 0;
                for (var backlog of this.$store.getters.getDeveloperCompletedByDeveloperList) {
                  if(this.appUserId === backlog.appUserId){
                    count += backlog.allottedHours;
                  }
                }
                return count;
              },
              totalVerifiedHour:function(){
                var count = 0;
                for (var backlog of this.$store.getters.getDeveloperVerifiedList) {
                  if(this.appUserId === backlog.appUserId){
                    count += backlog.allottedHours;
                  }
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
           getOwnBackLogList: function(){
             return this.$store.getters.getDeveloperOwnBacklogList;
           },

           getOtherBackLogList: function(){
             return this.$store.getters.getDeveloperOtherBacklogList;
           },

           getWorkInProgressList: function(){
             return this.$store.getters.getDeveloperWorkInProgressList;
           },

           getPendingApprovalList: function(){
             return this.$store.getters.getDeveloperCompletedByDeveloperList;
           },

           getDoneTasksList: function(){
             return this.$store.getters.getDeveloperVerifiedList;
           },

      },

      methods: {
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

        backlogMove(e){
           var app = this;
           app.taskId='';
           app.changeStatus='';
           app.taskId = e.draggedContext.element.taskId;
           app.taskIdentifier = e.draggedContext.element.taskIdentifier;
           var appUserId =  e.draggedContext.element.appUserId;
           var dragElement = e.draggedContext.element.taskStatus;
           if(!appUserId){
             return false;
           }else if(dragElement && e.relatedContext.element){
             var dropElement = e.relatedContext.element.taskStatus;
             //console.log("backlogMove === "+dragElement+"   ===========  "+dropElement)
             if(dragElement === 'ASSIGNED' && dropElement === 'WORK_IN_PROGRESS'){
               app.changeStatus = dropElement;
              // $('#confirm-task').modal('show');
               return true;
              }else{
                return false;
              }
            }else{
              var drop = e.relatedContext.component.$el.className ;
              if(dragElement ===  'ASSIGNED' && drop === 'dragArea dev-mht-dragArea-WORK_IN_PROGRESS'){
                app.changeStatus = drop;
              //  $('#confirm-task').modal('show');
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
          var appUserId = e.draggedContext.element.appUserId;
          if(app.appUserId != appUserId){
            return false;
          }else if(dragElement && e.relatedContext.element){
               var dropElement = e.relatedContext.element.taskStatus;
                //console.log("workInProgressMove === "+dragElement+"   ===========  "+dropElement)
                 if(dragElement ===  'WORK_IN_PROGRESS' && (dropElement === 'COMPLETED_BY_DEVELOPER' || dropElement === 'ASSIGNED' || dropElement === 'CREATED')){
                  return true;
                }else{
                  return false;
                }
          }else{
            var drop = e.relatedContext.component.$el.className ;
            if(dragElement ===  'WORK_IN_PROGRESS' && (drop === 'dragArea dev-mht-dragArea-ASSIGNED' || drop === 'dragArea dev-mht-dragArea-CREATED' || drop === 'dragArea dev-mht-dragArea-COMPLETED_BY_DEVELOPER')){
              return true;
            }else{
              return false;
            }
          }
        },
        completedByDeveloperMove(e){
          var app = this;
          app.taskId='';
          app.taskId = e.draggedContext.element.taskId;
          app.taskIdentifier = e.draggedContext.element.taskIdentifier;
          var dragElement = e.draggedContext.element.taskStatus;
          var appUserId = e.draggedContext.element.appUserId;
         if(app.appUserId != appUserId){
           return false;
         }else if(dragElement && e.relatedContext.element){
               var dropElement = e.relatedContext.element.taskStatus;
               //console.log("completedByDeveloperMove === "+dragElement+"   ===========  "+dropElement+"  "+e.draggedContext.element.taskId)
                 if(dragElement === 'COMPLETED_BY_DEVELOPER' && (dropElement === 'WORK_IN_PROGRESS' || dropElement === 'APPROVED_BY_PM')){
                  return true;
                }else{
                  return false;
                }
          }else{
            var drop = e.relatedContext.component.$el.className ;
            if(dragElement ===  'COMPLETED_BY_DEVELOPER' && (drop === 'dragArea dev-mht-dragArea-WORK_IN_PROGRESS' || drop === 'dragArea dev-mht-dragArea-APPROVED_BY_PM')){
              return true;
            }else{
              return false;
            }
          }
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
            var wipId = e.item.getAttribute('work-in-progress-id');
            var wipStatus = e.item.getAttribute('work-in-progress-taskStatus-id');
           var toBeChangeStatus = e.target.parentElement.getAttribute('assigned-status-id')
           //console.log("app.taskId== "+app.taskId+"   app.changeStatus   "+ app.changeStatus)
              app.changeTaskStatus(app.taskId, toBeChangeStatus);

        },

         addWorkInProgressElement(e){
           var app = this;
             //console.log("going to Work In Progress block ----->")
             var backlogId = e.item.getAttribute('assigned-id');
             var wip = e.item.getAttribute('work-in-progress-id');
             var completedByDeveloper = e.item.getAttribute('completed-by-developer-id');
             var toBeChangeStatus = e.target.parentElement.getAttribute('work-in-progress-status-id')
             //console.log("backlogId == "+backlogId+" wip== "+wip+"  toBeChangeStatus==  "+toBeChangeStatus)
             app.changeTaskStatus(app.taskId, toBeChangeStatus);

         },
         addCompletedByDeveloperElement(e){
            var app = this;

            var wipId = e.item.getAttribute('work-in-progress-id');
            var toBeChangeStatus = e.target.parentElement.getAttribute('completed-by-developer-status-id')
             app.changeTaskStatus(app.taskId, toBeChangeStatus);
         },
         addApprovedByPmElement(e){
            var app = this;
            var completedByDeveloperId = e.item.getAttribute('completed-by-developer-id');
            var toBeChangeStatus = e.target.parentElement.getAttribute('approved-by-pm-status-id')
            //console.log("completedByDeveloperId == "+completedByDeveloperId+" toBeChangeStatus==  "+toBeChangeStatus)
            app.changeTaskStatus(app.taskId, toBeChangeStatus);
         },
        changeTaskStatus(taskId , taskStatus){
          var app = this;
          var  taskObject={
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
             //console.log("chnaged =================="+response.data.status)
             //console.log(response)
            if(response.data.status === 'SUCCESS'){
              // app.$store.commit('updateDeveloperTaskToTaskList' , response.data.payLoad);
              app.$store.commit('setDeveloperTaskToProject' , response.data.payLoad);
            }else{
              //console.log("error is coming")
            }
               //$('#confirm-task').modal('hide');
            //console.log( app.$store.getters)
         app.$store.commit('setSpinner', false);
          })
        },
        openTaskDetails(task){
          var app = this;
          app.task = {};
          app.task = task;
          app.getCommentAndTransaction(app.task.taskId)
          setTimeout(()=>{
            app.errors.clear();
          },100)
          $('#see-task-details-modal').modal('show');
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
            //console.log(response)
           if(response.data.status === "SUCCESS"){
             app.enableButton=false;

             app.taskCommentList.push(response.data.payLoad);
           }else{
             app.enableButton=false;
             //console.log("something went wrong ")
           }
           app.comment = ''
           setTimeout(()=>{
             app.errors.clear(scope);
           },10)
          });
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
         app.$store.commit('setSpinner',true);
         app.$http.get(
           app.$store.state.SERVER_URL + '/api/dev-pm/task-comment-transaction/'+taskId ,
           {
             headers: {
               "X-Authorization": app.$cookie.get('X-Authorization')
             },
           }
         ).then(function(response) {
           app.$store.commit('setSpinner',false);
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
       getDeveloperProjectTaskListData(projectId){
           var app = this;
           //console.log("getDeveloperProjectTaskListData method is calling----------->"+projectId)
           app.$store.commit('setSpinner',true);
           app.$http.get(
              this.$store.state.SERVER_URL+'/api/developer/get-developer-tasks/'+projectId,
             {
                headers: {
                 "X-Authorization": app.$cookie.get('X-Authorization')
                },
              }
            ).then(function(response) {
              app.$store.commit('setSpinner',false);
              //console.log(response)
              app.$store.commit('setDeveloperTaskList' , response.data.payLoad)
              var projectInfo = {};
              projectInfo.projectId = response.data.payLoad.projectId;
              projectInfo.projectName = response.data.payLoad.projectName;
              app.$store.commit('setDevProjectInfo',projectInfo);
              //console.log(app.$store.getters.getDevProjectInfo)
        });
      },
      convertUtcToLocaDateTime(date){
       //console.log("convertStringtoDate------------------------>")
       var moment = require('moment-timezone');
       var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
       return moment(date).tz(timeZone).format('DD-MM-YYYY HH:mm')
     },
     },
    }

</script>
<style scoped="true">
.normal {
  background-color: `grey;
}

.drag {
  background-color: green;
}

.dragArea {
  min-height: 600px;
}
</style>
