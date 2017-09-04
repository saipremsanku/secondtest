<template>
   <div>
      <div class="m-b-m-10 btn-ripple" v-if="(setEpicIdinStory.id != null) && (projectLeadStatus)">
         <button class="btn btn-orange btn-lg "  data-toggle="modal" @click="openStoryModel"><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;Add Story</button>
      </div>
      <div class="panel-group PM_epic_accordion" id="accordion" role="tablist" aria-multiselectable="true" >
      <div class="storyContent">

      <!--start of accrodian-->
      <div class="" v-for="(story,index) in storys" style="margin-top: 5px;border: 1px solid #cac0c0;">
      <div class="edit_delete_details">
        <div class="col-md-12 col-lg-12">
          <div class="col-md-7 col-lg-8 col-sm-6 col-xs-12">
          <!-- <span data-toggle="collapse" :data-target="'#demo'+story.id"> -->
              <span data-toggle="collapse" :data-target="'#demo'+story.id">
            <span class="accordianSym">  <i aria-hidden="true" class="fa fa-plus-circle"></i>
            </span>
          </span>



          <span class="storyName"><b>{{story.name}}</b></span>

          </div>
           <div class="col-md-2 col-lg-2 col-sm-6 col-xs-12 text-right paddRight_0">
             <div class="addTask" v-if="projectId  && !story.isCompleted">
             <button class="btn btn-orange btn-sm pull-right" @click="openTaskModal(story,index)"><i class="fa fa-plus-circle" aria-hidden="true" ></i> Task</button>
             </div>
           </div>
            <div class="col-md-3 col-lg-2 col-sm-6 col-xs-12 paddRight_0">
              <div class="col-md-6 col-lg-6 paddRight_0">
              <span class="cmmnIcon color-orange" ><i aria-hidden="true" class="fa fa-clock-o" v-tooltip="showEstimatedTime(story)"></i> <p class="timeBlock estValue paddLeft_0" >E: {{calcTotal(story)}} <span v-if="story.taskActualHours != 0 && isProjectAvailable">&nbsp;&nbsp;A: {{story.taskActualHours}}</span> </p></span>
              </div>
               <div class="col-md-2 col-lg-3">
              <span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-pencil cursor-pointer" @click="editStory(story,index)" v-if="projectLeadStatus"></i></span>
              </div>
               <div class="col-md-2 col-lg-3">
              <span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-trash-o cursor-pointer"  @click="deleteStory(story,index)" v-if="projectLeadStatus"></i></span>
              </div>



            </div>
        </div>
        <!-- <div class="col-md-12 col-lg-12">
          <p class="storyDescription">{{story.description}}</p>
        </div> -->
        <!-- <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <p class="storyDescription">{{story.description}}</p>
        </div> -->
        <div class="col-md-12 col-lg-12" v-if="!projectLeadStatus">
          <div class="col-md-4 col-lg-4 col-sm-4 col-xs-4"  v-if="isProjectAvailable">
            <div class="progress marsk-as-com-bottom active oval-border" >
              <div class="progress-bar " :style=" progressWidth(story)">
              <span>{{story.percentageCompleted }}%</span>
              </div>
            </div>
          </div>
          <div class="col-md-2 col-lg-2 col-sm-8 col-xs-8 " >
           <!-- <span>  Task Completed </span> -->
          </div>
          <div class="col-md-6 col-lg-6 col-sm-8 col-xs-8 pull-right"  v-if="isProjectAvailable" >
        <!-- <toggle-button :value="story.isCompleted" data-toggle="modal" :color="{checked: '#2db71a', unchecked: '#ce1238'}" :width="80" @change="markAsCompleted(story,index, !story.isCompleted)" :labels="{checked: 'Complete', unchecked: 'Pending'}"/> -->
        <div class="col-md-12  text-right" v-if="!story.isCompleted">
          <!-- <div class="col-md-8 col-lg-8 col-sm-8 col-xs-6 text-right">
        <button  class="btn btn-orange mark-as-comp-button pull-right"  data-toggle="modal" @click="markAsCompleted(story,index, 'true')">Pending</button>
        </div> -->
          <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 text-right">
              <input type="checkbox" v-model="story.isCompleted" class="cursor-pointer-checkbox"  @click="markAsCompleted(story,index, 'true')"/>
              <span  class=" btn-orange mark-as-comp-button pull-right"  data-toggle="modal">Pending</span>
          </div>
        </div>
          <div class="col-md-12 text-right" v-else>

          <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 text-right">
            <input type="checkbox"  v-model="story.isCompleted" class="cursor-pointer-checkbox" @click="markAsCompleted(story,index, 'false')"/>
            <span  class=" btn-green mark-as-comp-button pull-right"   data-toggle="modal" >Completed</span>
          </div>
        </div>
        </div>
        </div>
        <div  class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
          <p class="storyDescription">{{story.description}}</p>
        </div>

      </div>



        <div :id="'demo'+story.id"  class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo" v-if="projectId" >
         <div class="panel-body">

            <div class="row" v-for="(task , taskIndex) in story.taskList">
              <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
                <div class="openEditDelete">
                  <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12 border_btm">
                      <div class="col-md-1 col-lg-1"><p class=" estValue"><a class="edit-dev-link" @click="editTaskModal(story , index, task , taskIndex)">#{{task.taskIdentifier}}</a></p></div>
                      <div class="col-md-6 col-lg-7 col-sm-6 col-xs-12">{{task.taskName}}</div>
                      <div class="col-md-2 col-lg-2 paddRight-0 paddLeft-0">
                        <div class="col-md-4 col-lg-4 color-orange fs-12"><b>{{task.appUserName}}</b></div>
                        <div v-if="task.taskStatus === 'APPROVED_BY_PM'" class="col-md-8 col-lg-8 text-right paddRight-0 paddLeft-0"><span class="colorOrange">{{shortStatus(task.taskStatus)}}</span></div>
                        <div v-else-if="task.taskStatus === 'ASSIGNED'" class="col-md-8 col-lg-8 text-right paddRight-0 paddLeft-0"><span class="colorBlue1">{{shortStatus(task.taskStatus)}}</span></div>
                        <div v-else-if="task.taskStatus === 'WORK_IN_PROGRESS'" class="col-md-8 col-lg-8 text-right paddRight-0 paddLeft-0"><span class="colorYellow">{{shortStatus(task.taskStatus)}}</span></div>
                        <div v-else-if="task.taskStatus === 'CREATED'" class="col-md-8 col-lg-8 text-right paddRight-0 paddLeft-0"><span class="colorRed">{{shortStatus(task.taskStatus)}}</span></div>
                        <div v-else class="col-md-8 col-lg-8 text-right paddRight-0 paddLeft-0"><span class="colorGreen">{{shortStatus(task.taskStatus)}}</span></div>
                      </div>
                      <div class="col-md-3 col-lg-2 col-sm-6 col-xs-12 paddRight_0">
                      <div class="col-md-6 col-lg-6 paddRight_0 "><span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-clock-o"> </i> <p class="timeBlock estValue paddLeft_0" > {{task.allottedHours}}</p></span>
                      </div>
                      <!-- <div class="col-md-2 col-lg-2" ><span class="cmmnIcon color-orange" @click="editTaskModal(story , index, task , taskIndex)"><i aria-hidden="true" class="fa fa-pencil"></i></span>
                      </div> -->
                      <div class="col-md-2 col-lg-2" v-if="!(task.hasMovedToWIPFirstTime || task.taskStatus === 'CANCELLED')"><span class="cmmnIcon color-yash" @click="deleteTask(story , index, task , taskIndex)"><i aria-hidden="true" class="fa fa-trash-o"></i></span>
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

<!-- add story modal -->
      <div class="modal fade" id="myModalStory" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
         <div class="modal-dialog" role="document">
            <div class="modal-content">
               <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                   <p class="modal-title estValue">Epic - {{setEpicIdinStory.name}}</p>
                  <h4 class="modal-title" v-if="userStoryId!=''">Update Story</h4>
                  <h4 class="modal-title" v-else>Add New Story</h4>
               </div>
               <div class="modal-body">
                  <div class="row">
                     <div class="col-md-12">
                        <form id="storyForm" @submit.prevent="saveStory">
                           <input type="hidden" name="epicId" :value="setEpicIdinStory.id" v-model="setEpicIdinStory.id">
                           <input type="hidden" name="userStoryId" :value="userStoryId" v-model="userStoryId">
                           <div class="col-md-12">
                           <div class="form-group" :class="{'input': true, 'is-danger': errors.has('userStoryName') }">
                              <input type="text" class="form-control Design" id="epic" placeholder="Story Title " name="userStoryName"
                                 v-model="userStoryName" v-validate:userStoryName ="'required'" >
                              <p class="text-danger" v-if="errors.has('userStoryName')">Please specify Story title</p>
                           </div>
                           </div>
                           <div clas="row">
                           <div class="col-md-12">
                              <p class="text-danger" v-if="notSelectedHours">Please specify hours for atleast 1 activity above zero hours</p>
                          </div>
                            <div class="col-md-6">
                            <div class="form-group">
                            <input  type="number" v-on:keyup="keymonitor"  pattern="^[0-9]" min="0"  class="form-control Documentation"  id="estimatedAnalysisHours" placeholder="Analysis" name="estimatedAnalysisHours" v-model="estimatedAnalysisHours">
                          </div>
                          </div>
                              <div class="col-md-6">
                                 <div class="form-group" >
                                    <input type="number" v-on:keyup="keymonitor"  pattern="^[0-9]" min="0" class="form-control Design"  id="estimatedDesignHours" placeholder="Design "  name="estimatedDesignHours" v-model="estimatedDesignHours" >
                                 </div>
                              </div>
                           </div>
                           <div clas="row">
                             <div class="col-md-6">
                                <div class="form-group" >
                                   <input type="number" v-on:keyup="keymonitor"  pattern="^[0-9]" min="0"  class="form-control Front" id="estimatedFrontEndHours" placeholder="Front End" name="estimatedFrontEndHours" v-model="estimatedFrontEndHours" >
                                </div>
                             </div>
                              <div class="col-md-6">
                                 <div class="form-group" >
                                    <input type="number" v-on:keyup="keymonitor"  pattern="^[0-9]" min="0" class="form-control Back" id="estimatedBackendHours" placeholder="Back End" name="estimatedBackendHours" v-model="estimatedBackendHours">
                                 </div>
                              </div>
                           </div>
                           <div clas="row">
                             <div class="col-md-6">
                                <div class="form-group">
                                   <input type="number" v-on:keyup="keymonitor"  pattern="^[0-9]" min="0" class="form-control QA" id="estimatedQAHours" placeholder="QA" name="estimatedQAHours" v-model="estimatedQAHours" >
                                </div>
                             </div>
                              <div class="col-md-6">
                                 <div class="form-group" >
                                    <input type="number" v-on:keyup="keymonitor"  pattern="^[0-9]" min="0" class="form-control DevsOps" id="estimatedSupportHours" placeholder="DevsOps" name="estimatedSupportHours" v-model="estimatedSupportHours">
                                 </div>
                              </div>
                           </div>
                           <div clas="row">
                             <div class="col-md-6">
                                <div class="form-group">
                                   <input type="number" v-on:keyup="keymonitor"  pattern="^[0-9]" min="0" class="form-control QA" id="estimatedIosHours" placeholder="IOS" name="estimatedIosHours" v-model="estimatedIosHours" >
                                </div>
                             </div>
                              <div class="col-md-6">
                                 <div class="form-group" >
                                    <input type="number" v-on:keyup="keymonitor"  pattern="^[0-9]" min="0" class="form-control DevsOps" id="estimatedAndroidHours" placeholder="Android" name="estimatedAndroidHours" v-model="estimatedAndroidHours">
                                 </div>
                              </div>
                           </div>
                           <div class="col-md-12">
                           <div class="form-group epic" >
                              <textarea class="form-control" placeholder="Description" name="userStoryDescription" v-model="userStoryDescription">{{userStoryDescription}}</textarea>
                           </div>
                           </div>
                              <div class="col-md-12 btn-ripple">
                                       <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>

                                       <button type="submit" class="btn btn-orange" :disabled="enableButton" v-if="userStoryId!=''">Update</button>
                                       <button type="submit" class="btn btn-orange" :disabled="enableButton" v-else>ADD</button>

                           </div>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

 <!-- add and edit Task modal -->

 <div class="modal fade" id="update-task-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document">
       <div class="modal-content">
          <div class="modal-header bg-grey no-border">
             <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
             <h4 class="modal-title" v-if="task.taskId == ''">Add New Task</h4>
             <h4 class="modal-title" v-else>Edit Task ID #{{task.taskIdentifier}}</h4>
          </div>
          <div class="modal-body padd0">
            <ul class="nav nav-tabs nav-justified add-task-tabs" id="myTab">
             <li class="active"><a data-target="#details" data-toggle="tab">Details</a></li>
             <li v-if="task.taskId"><a data-target="#comments" data-toggle="tab">Comments</a></li>
              <li v-if="task.taskId"><a data-target="#taskTransaction" data-toggle="tab">History</a></li>
           </ul>

           <div class="tab-content">
             <div class="tab-pane active bg-light-gray" id="details">
               <br><br>
               <div class="row">
                  <div class="col-md-12">
                     <form id="saveTaskForm" @submit.prevent="saveTask('task-form-update')" role="form" data-vv-scope="task-form-update">
                       <input type="hidden" name="task.userStoryId" :value="task.userStoryId" v-model="task.userStoryId">
                        <div class="col-md-12">
                        <div class="form-group" :class="{'input': true, 'is-danger': errors.has('task-form-update.taskName')}">
                           <input type="text" class="form-control Design" id="taskName" placeholder="Task Title " name="taskName" v-model="taskName" v-validate:taskName ="'required'">
                             <p class="text-danger" v-if="errors.has('task-form-update.taskName')">Please specify Task title</p>
                        </div>
                        </div>
                        <div clas="row">
                           <div class="col-md-6">
                           <div class="form-group">
                             <select class="form-control" v-model="appUserId">
                              <option  value="" >Select developer</option>
                              <option  :value="appUser.appUserId" v-for="appUser in epicSharedAppUserList">{{appUser.name}}</option>
                             </select>
                         </div>
                         </div>
                           <div class="col-md-6">
                           <div class="form-group">
                           <select class="form-control" v-model="activityType" name="activityType"  :class="{'select': true, 'is-danger': errors.has('task-form-update.activityType')}" v-validate:activityType ="'required'" >
                             <option  value="" >Select Activity Type</option>
                             <option  v-for="activityType in activityTypeList" :value="activityType" >{{activityType}}</option>
                           </select>
                            <p class="text-danger" v-if="errors.has('task-form-update.activityType')">Please select Activity type</p>
                           </div>
                          </div>
                        </div>
                       <div class="col-md-12">
                          <div class="form-group" :class="{'input': true, 'is-danger': errors.has('task-form-update.allottedHours')}">
                             <input type="text"  class="form-control Design"   placeholder="Hours"  name="allottedHours" v-model="allottedHours" v-validate:allottedHours ="'required|numeric|min_value:1|max_value:4'">
                              <p class="text-danger" v-if="errors.has('task-form-update.allottedHours')">Please specify time between 1 to 4 hours only</p>
                          </div>
                       </div>

                        <div class="col-md-12">
                        <div class="form-group epic" >
                           <textarea class="form-control" placeholder="Description" name="task.taskDescription" v-model="task.taskDescription">{{task.taskDescription}}</textarea>
                        </div>
                        </div>
                           <div class="col-md-12 btn-ripple">
                                    <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-orange" v-if="task.taskId == ''">ADD</button>
                                    <button type="submit" class="btn btn-orange" v-else>Update</button>
                        </div>
                     </form>
                  </div>
               </div>
             </div>
             <div class="tab-pane bg-light-gray" id="comments">
               <br>
               <div class="row">
                 <div class="col-xs-12">
                   <form @submit.prevent="" v-if="task.taskStatus != 'CANCELLED' && task.taskStatus !='APPROVED_BY_PM'" data-vv-scope="comment-form-update">
                     <div class="form-group paddx15" :class="{'textarea': true, 'is-danger': errors.has('comment-form-update.comment') }">
                       <textarea class="form-control" placeholder="Add comments here" rows="3" name="comment"   v-model="comment"  v-validate:comment ="'required'"></textarea>
                         <p class="text-danger" v-if="errors.has('comment-form-update.comment')">Please specify comment</p>
                     </div>
                     <div class="paddx15">
                       <p>
                         <button type="submit"  class="btn btn-gray" v-model="isCancelClicked" @click="cancelTask('comment-form-update')"> Cancel Task </button>
                         <!-- <label class="font-normal"><input type="checkbox" v-model="isCancelClicked" @click="cancelTask('comment-form-update')"> Cancel Task </label> -->
                         <button type="submit" @click="saveComment('comment-form-update')" class="btn comment-btn pull-right">Post</button>
                       </p>
                     </div>
                   </form>
                   <p class="paddx15"><span class="color-orange" v-if="taskCommentList.length != 0"><i> {{taskCommentList.length}} Comments </i></span>
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


 <!-- Task modal for non editable task but can comment-->

 <div class="modal fade" id="see-task-details-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document">
       <div class="modal-content">
          <div class="modal-header bg-grey no-border">
             <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
             <h4 class="modal-title" >Task ID #{{task.taskIdentifier}}</h4>
          </div>
          <div class="modal-body padd0">
            <ul class="nav nav-tabs nav-justified add-task-tabs" id="myTab">
             <li class="active"><a data-target="#see-details" data-toggle="tab">Details</a></li>
             <li><a data-target="#see-comments" data-toggle="tab">Comments</a></li>
             <li><a data-target="#see-taskTransaction" data-toggle="tab">History</a></li>
           </ul>
           <div class="tab-content">
             <div class="tab-pane active bg-light-gray" id="see-details">
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
           <div class="tab-pane bg-light-gray" id="see-comments">
             <br>
             <div class="row">
               <div class="col-xs-12">
                 <form @submit.prevent="" v-if="task.taskStatus != 'CANCELLED' && task.taskStatus !='APPROVED_BY_PM'" data-vv-scope="comment-form">
                   <div class="form-group paddx15" :class="{'textarea': true, 'is-danger': errors.has('comment-form.comment') }">
                     <textarea class="form-control" placeholder="Add comments here" rows="3" name="comment"   v-model="comment"  v-validate:comment ="'required'"></textarea>
                       <p class="text-danger" v-if="errors.has('comment-form.comment')">Please specify comment</p>
                   </div>
                   <div class="paddx15">
                     <p>
                       <!-- <label class="font-normal"><input type="checkbox" v-model="isCancelClicked" @click="cancelTask('comment-form')"> Cancel Task </label> -->
                        <button type="submit"  class="btn btn-gray" v-model="isCancelClicked" @click="cancelTask('comment-form')"> Cancel Task </button>
                       <button type="submit"  @click="saveComment('comment-form')" class="btn comment-btn pull-right">Post</button>
                     </p>
                   </div>
                 </form>
                 <p class="paddx15"><span class="color-orange" v-if="taskCommentList.length != 0"><i> {{taskCommentList.length}} Comments </i></span>
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

           <div class="tab-pane bg-light-gray" id="see-taskTransaction">
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

<!-- only adding the taskList -->

<div class="modal fade" id="add-task-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
   <div class="modal-dialog" role="document">
      <div class="modal-content">
         <div class="modal-header bg-grey no-border">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" v-if="task.taskId == ''">Add New Task</h4>
            <h4 class="modal-title" v-else>Edit Task ID #{{task.taskIdentifier}}</h4>
         </div>
         <div class="modal-body padd0">
           <ul class="nav nav-tabs nav-justified add-task-tabs" id="myTab">
            <li class="active"><a data-target="#details" data-toggle="tab">Details</a></li>
          </ul>

          <div class="tab-content">
            <div class="tab-pane active bg-light-gray" id="details">
              <br><br>
              <div class="row">
                 <div class="col-md-12">
                    <form id="saveTaskForm" @submit.prevent="saveTask('task-form')" role="form" data-vv-scope="task-form">
                      <input type="hidden" name="task.userStoryId" :value="task.userStoryId" v-model="task.userStoryId">
                       <div class="col-md-12">
                       <div class="form-group" :class="{'input': true, 'is-danger': errors.has('task-form.taskName')}">
                          <input type="text" class="form-control Design" id="taskName" placeholder="Task Title " name="taskName" v-model="taskName" v-validate:taskName ="'required'">
                            <p class="text-danger" v-if="errors.has('task-form.taskName')">Please specify Task title</p>
                       </div>
                       </div>
                       <div clas="row">
                          <div class="col-md-6">
                          <div class="form-group">
                            <select class="form-control" v-model="appUserId">
                             <option  value="" >Select developer</option>
                             <option  :value="appUser.appUserId" v-for="appUser in epicSharedAppUserList"  >{{appUser.name}}</option>
                            </select>
                        </div>
                        </div>
                          <div class="col-md-6">
                          <div class="form-group">
                          <select class="form-control" v-model="activityType" name="activityType"  :class="{'select': true, 'is-danger': errors.has('task-form.activityType')}" v-validate:activityType ="'required'">
                            <option  value="" >Select Activity Type</option>
                            <option  v-for="activityType in activityTypeList" :value="activityType" >{{activityType}}</option>
                          </select>
                           <p class="text-danger" v-if="errors.has('task-form.activityType')">Please select Activity type</p>
                          </div>
                         </div>
                       </div>
                      <div class="col-md-12">
                         <div class="form-group" :class="{'input': true, 'is-danger': errors.has('task-form.allottedHours')}">
                            <input type="text"  class="form-control Design"   placeholder="Hours"  name="allottedHours" v-model="allottedHours" v-validate:allottedHours ="'required|min_value:1|max_value:4'">
                             <p class="text-danger" v-if="errors.has('task-form.allottedHours')">Please specify time between 1 to 4 hours only</p>
                         </div>
                      </div>

                       <div class="col-md-12">
                       <div class="form-group epic" >
                          <textarea class="form-control" placeholder="Description" name="task.taskDescription" v-model="task.taskDescription">{{task.taskDescription}}</textarea>
                       </div>
                       </div>
                          <div class="col-md-12 btn-ripple">
                                   <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                                   <button type="submit" class="btn btn-orange" :disabled ="enableButton" v-if="task.taskId == ''">ADD</button>
                                   <button type="submit" class="btn btn-orange" :disabled ="enableButton" v-else>Update</button>
                       </div>
                    </form>
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
   export default{
       props:['projectLeadStatus' , 'setEpicIdinStory', 'storys','epicSharedAppUserList', 'epicCompletionPercentage'],
       data(){
           return{
               isUserStoryCompleted:false,
               loggedInRole: this.$store.getters.getLoggedInUser.role,
               message:'hi thsese is tooltips',
               userStory: '',
               userStoryIndex: '',
               taskList:[],
               userStoryId: '',
               userStoryName: '',
               enableButton:'',
               userStoryDescription: '',
               estimatedAnalysisHours: '',
               estimatedBackendHours: '',
               estimatedDesignHours: '',
               estimatedFrontEndHours: '',
               estimatedQAHours: '',
               estimatedSupportHours: '',
               estimatedIosHours: '',//added
               estimatedAndroidHours: '',//added
               taskIndex:'',
               notSelectedHours:false,
               taskName:'',
               allottedHours:'',
               activityType:'',
               enableButton:false,
               appUserId:'',
               task:{
                 isFromBacklog:true,
                 taskName:'',
                 appUserId:'',
                 allottedHours:'',
                 taskDescription:'',
                 activityType:'',
                 userStoryId:'',
                 taskId:'',
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
               isCancelClicked:false,
               getFileUrl:this.$store.state.SERVER_URL +'/get-file/'

           }
       },
       created:function(){
         this.projectId = this.$store.getters.getProjectInfo.projectId
       },
       computed:{
         taskComments : function () {
           var app = this;
           return app.taskCommentList.sort(function(a,b){
             return (b.taskCommentId - a.taskCommentId);
           })
         },
         projectInfo: function(){
           return this.$store.getters.getProjectInfo;
         },
         isProjectAvailable: function(){

          return this.$store.getters.getProjectInfo.isProjectAvailable;

         },
         isAdmin:function(){
           return  this.loggedInRole === 'ADMIN';
         },
       },
     methods:{
       progressWidth: function(story){
            return "width:" +story.percentageCompleted+ "%";
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



         shortStatus(taskStatus){
          if(taskStatus === 'CREATED'){
            return 'CREATED';
          }else if(taskStatus === 'ASSIGNED'){
                  return 'ASSIGNED';
          }else if(taskStatus === 'WORK_IN_PROGRESS'){
              return 'WIP';
          }else if(taskStatus === 'COMPLETED_BY_DEVELOPER'){
              return 'COMPLETED';
          }else if(taskStatus === 'APPROVED_BY_PM'){

              return 'APPROVED';
          }
          else if(taskStatus === 'CANCELLED'){
              return 'CANCELLED';
          }
         },

          openTaskModal(story , index){
            var app = this;
            console.log(story)
            app.task.taskName='';
            app.taskName='';
            app.task.appUserId='';
            app.appUserId ='';
            app.task.allottedHours='';
            app.allottedHours='';
            app.task.taskDescription='';
            app.task.activityType='';
            app.activityType='';
            app.task.userStoryId = '';
            app.task.taskId='';
            app.task.userStoryId = story.id
            app.userStory = story;
            app.userStoryIndex = index;
            app.taskList = story.taskList;
            app.comment = '';
            app.isCancelClicked = false;
            setTimeout(() => {
                app.errors.clear('task-form');
          }, 100);
            console.log(app.userStorys);
            $('#add-task-modal').modal('show')
          },
          saveTask(scope){
           var app = this;
           app.$validator.validateAll(scope);
           app.task.taskName = app.taskName;
           app.task.allottedHours = app.allottedHours;
           app.task.activityType = app.activityType;
           app.task.appUserId = app.appUserId;
           app.task.projectId  = app.$store.getters.getProjectInfo.projectId;
           app.task.isFromBacklog = true;
          //  alert(app.task.userStoryId);
          //  console.log(app.errors)
          //  console.log(scope)
           if(!app.errors.any()){
               app.enableButton=true;
             app.$store.commit('setSpinner',true);
           app.$http.post(
             app.$store.state.SERVER_URL+'/api/project-manager/save-task',
             app.task,
             {
               headers: {
                 "X-Authorization": app.$cookie.get('X-Authorization')
               },
             },
           ).then(function(result){
             if(result.data.status == "SUCCESS"){
                 app.enableButton=false;
                  if(app.task.taskId != null && app.task.taskId != ''){
                     console.log("taskIndex ====  "+app.taskIndex)
                     app.taskList.splice(app.taskIndex, 0);
                     app.taskList[app.taskIndex] = result.data.payLoad;
                     app.userStory.taskList = app.taskList;
                     app.storys[app.userStoryIndex] = app.userStory;

                  }else{
                    app.enableButton=false;
                      if(!app.taskList){
                        app.taskList = []
                      }
                      app.taskList.unshift(result.data.payLoad);
                      app.userStory.taskList = app.taskList;
                      app.storys[app.userStoryIndex] = app.userStory;
                   }
                   if(result.data.payLoad.storyPercentageCompleted != 0){
                     app.userStory.percentageCompleted = result.data.payLoad.storyPercentageCompleted;
                   }
                   if(result.data.payLoad.epicPercentageCompleted != 0){
                    app.$emit("changeEpicCompletionPercentage",result.data.payLoad.epicPercentageCompleted);
                   }
                   if(result.data.payLoad.projectPercentageCompleted != 0){
                      app.$store.commit('setProjectCompletionPercenatge', result.data.payLoad.projectPercentageCompleted);
                   }

                   app.$store.commit('setProjectCompletionPercenatge', result.data.payLoad.projectPercentageCompleted);

                   app.$store.commit('setTaskToProject', result.data.payLoad);
                   $('#add-task-modal').modal('hide')
                   $('#update-task-modal').modal('hide')
             }else{
               console.log("internal server error")
             }
              app.$store.commit('setSpinner',false);
             $('#add-task-modal').modal('hide')
             $('#update-task-modal').modal('hide')
           });
           }
          },
          deleteTask(story,storyIndex,task,taskIndex){

           ///delete-task/{taskId}
           var app = this;

           app.task = task;
           app.taskIndex = taskIndex;
           app.userStory = story;
           app.userStoryIndex = storyIndex;
           app.taskList = story.taskList;
           app.$swal({
           title: 'Are you sure?',
           text: "You won't be able to revert this!",
           type: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Yes'
           }).then(function () {
            app.$store.commit('setSpinner',true);
           app.$http.get(
             app.$store.state.SERVER_URL+'/api/project-manager/delete-task/'+task.taskId,
             {
               headers: {
                 "X-Authorization": app.$cookie.get('X-Authorization')
               },
             },
           ).then(function(result){
             if(result.data.status == "SUCCESS"){

               app.taskList.splice(app.taskIndex, 1);
               app.userStory.taskList = app.taskList;
               if(result.data.payLoad.storyPercentageCompleted != 0){
                 app.userStory.percentageCompleted = result.data.payLoad.storyPercentageCompleted;
               }
               if(result.data.payLoad.epicPercentageCompleted != 0){
                app.$emit("changeEpicCompletionPercentage",result.data.payLoad.epicPercentageCompleted);
               }
               if(result.data.payLoad.projectPercentageCompleted != 0){
                  app.$store.commit('setProjectCompletionPercenatge', result.data.payLoad.projectPercentageCompleted);
               }
               app.storys[app.userStoryIndex] = app.userStory;

             }else{
               console.log("internal server error")
             }
              app.$store.commit('setSpinner',false);
           });
          })
         },
          editTaskModal(story,storyIndex,task,taskIndex){
           console.log(task)

            var app = this;
            app.comment = '';
            app.isCancelClicked = false;
            app.task = task;
            if(task.appUserId){
              app.appUserId = task.appUserId;
            }else{
              app.appUserId = '';
            }
            app.taskName = task.taskName;
            app.allottedHours = task.allottedHours;
            app.activityType = task.activityType;
            app.taskIndex = taskIndex;
            app.userStory = story;
            app.task.userStoryId = story.id;
            app.userStoryIndex = storyIndex;
            app.taskList = story.taskList;
            setTimeout(() => {
              app.errors.clear();
            })
             app.$store.commit('setSpinner',true);
             app.getCommentAndTransaction(task.taskId);
             app.$store.commit('setSpinner',false);

            if((app.task.hasMovedToWIPFirstTime && app.task.taskStatus != 'CREATED') || (app.task.taskStatus === 'CANCELLED')){
              $('#see-task-details-modal').modal('show');
            }else if(!app.task.hasMovedToWIPFirstTime && app.task.taskStatus === 'ASSIGNED'){
              $('#update-task-modal').modal('show');
            }else{
                $('#update-task-modal').modal('show');
            }
          },

          keymonitor(e){
            var app = this;
            if(!isNaN(e.key)) {
              app.notSelectedHours = false;
              console.log(e.target.name)
            } else {
              $("#"+e.target.name).val('');
              if(!app.checkHours()){
                  app.notSelectedHours = true;
              }
            }
          },
         checkHours(){
             var app = this;
             var totalHours = 0;
             totalHours = app.estimatedAnalysisHours + app.estimatedBackendHours + app.estimatedDesignHours + app.estimatedFrontEndHours +
             app.estimatedQAHours + app.estimatedSupportHours+app.estimatedIosHours + app.estimatedAndroidHours;
             if(totalHours > 0){
              return true;
             }
             app.notSelectedHours = true;
            return false;
         },
         calcTotal: function(story){
           return story.estimatedAnalysisHours +
           story.estimatedDesignHours +
           story.estimatedFrontEndHours +
           story.estimatedBackendHours +
           story.estimatedQAHours +
           story.estimatedSupportHours +
           story.estimatedIosHours +
           story.estimatedAndroidHours ;
         },
         showEstimatedTime: function(story){
            //console.log("showEstimatedTime-------------->")
            //console.log(story)
            var value= 'Analysis'+ ' '+story.estimatedAnalysisHours +`\n`+ '  '+';'+' '+
                        'Design'+ ' '+story.estimatedDesignHours +`\n`+'  '+';'+' '+
                        'Front End'+ ' '+story.estimatedFrontEndHours +'  '+';'+' '+
                         'Back End'+ ' '+story.estimatedBackendHours +'  '+';'+' '+
                          'Quality Analyst'+ ' '+story.estimatedQAHours +'  '+';'+' '+
                          'IOS'+ ' '+story.estimatedIosHours +'  '+';'+' '+
                          'Android'+ ' '+story.estimatedAndroidHours +'  '+';'+' '+
                          'Support'+ ' '+story.estimatedSupportHours;
                          //var value = '<p>Analysis<span>'+story.estimatedAnalysisHours+'</span></p><br /><p>Design<span>'+story.estimatedDesignHours+'</span></p><br /><p>Frond End<span>'+story.estimatedFrontEndHours+'</span></p><br /><p>Back End<span>'+story.estimatedBackendHours+'</span></p><br /><p>Quality Analyst<span>'+story.estimatedQAHours+'</span></p><br /><p>Support<span>'+story.estimatedSupportHours+'</span></p><br />'
                          return value;

                        // return '<p>Hello Vue.js!</p><p>Hello Vue.js!</p><p>Hello Vue.js!</p><p>Hello Vue.js!</p>';

         },
         getBreakup: function(story){
           return
           'A: '+story.estimatedAnalysisHours+' | D: '+story.estimatedDesignHours+' | F: '+story.estimatedFrontEndHours+' | B: '+story.estimatedBackendHours+
           ' | Q: '+ story.estimatedQAHours +' S: '+story.estimatedSupportHours;
         },
           openStoryModel: function(){
               var app = this;
               app.userStoryId= ""
               app.userStoryName = "";
               app.userStoryDescription = "",
               app.estimatedAnalysisHours ="" ,
               app.estimatedBackendHours ="" ,
               app.estimatedDesignHours = "",
               app.estimatedFrontEndHours ="" ,
               app.estimatedQAHours ="" ,
               app. estimatedSupportHours = "",
               app.estimatedIosHours = "",
               app.estimatedAndroidHours = "",
              app.notSelectedHours = false;
             $('#myModalStory').modal('show');
                 setTimeout(() => {
                     app.errors.clear();
             }, 100);

           },

          editStory: function(story,index) {
               var app = this;
             //  app.editStroy = story;
               app.storyIndex = index;
               app.userStoryId = story.id;
               app.userStoryName = story.name;
               app.userStoryDescription = story.description,
               app.estimatedAnalysisHours =story.estimatedAnalysisHours ,
               app.estimatedBackendHours =story.estimatedBackendHours ,
               app.estimatedDesignHours = story.estimatedDesignHours
               app.estimatedFrontEndHours =story.estimatedFrontEndHours ,
               app.estimatedQAHours =story.estimatedQAHours ,
               app.estimatedSupportHours = story.estimatedSupportHours,
               app.estimatedIosHours = story.estimatedIosHours,
               app.estimatedAndroidHours = story.estimatedAndroidHours,
               app.enableButton=false;
              console.log("edit story");
               //
               //editStroyconsole.log(app.editStroy);

               $('#myModalStory').modal('show');


           },
           deleteStory: function(story, index) {
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
                app.$store.state.SERVER_URL + '/api/project-manager/delete-user-story/' + story.id, {
                  headers: {
                    "X-Authorization": app.$cookie.get('X-Authorization')
                  },
                }
              ).then(function(response) {
                console.log("responxe id---" + response.data);
                console.log("story delete" + story.id);
                app.storys.splice(index, 1);
                /*$("story"+story.id).slice();*/

                /* app.projectProposalId = response.data.payLoad.id;*/

              });
            })



           },

          //  collapseStory: function(storyId){
          //    $('#getModal')modal('hide')
          //     console.log("story id "+storyId)
          //  },

           saveStory: function(e,index) {
               var app = this;

               app.$validator.validateAll();

               if (app.checkHours() && !app.errors.any()) {
                app.enableButton=true;

               var dataObj = $('#storyForm').serializeArray().reduce(function(obj, item) {
                   obj[item.name] = item.value;
                   return obj;
               }, {});
               console.log(dataObj);
               $.ajax({
                   url: this.$store.state.SERVER_URL + '/api/project-manager/save-user-story',
                   type: 'POST',
                   contentType: "application/json; charset=utf-8",
                   dataType: "json",
                   data: JSON.stringify(dataObj),
                   headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')

                   },

                   success: function(data) {
                       app.enableButton=false;
                       if (data.status === "SUCCESS") {
                        app.enableButton=false;
                       app.userStoryName = "";
                       app.userStoryDescription = "",
                       app.estimatedAnalysisHours ="" ,
                       app.estimatedBackendHours ="" ,
                       app.estimatedDesignHours = "",
                       app.estimatedFrontEndHours ="" ,
                       app.estimatedQAHours ="" ,
                       app. estimatedSupportHours = "",
                       app.estimatedIosHours="",
                       app.estimatedAndroidHours="",
                                 $('#myModalStory').modal('hide');
                               app.errors.add({ field: 'name', msg: 'woops'});
                               setTimeout(() => {
                                   app.errors.clear();
                           }, 1000);

                           if(app.userStoryId!='' && app.userStoryId!= null){
                               app.storys[app.storyIndex] = data.payLoad;
                           }else{
                              //  console.log("=======new story==========="+app.storys)
                              //  console.log(data)
                                if(!app.storys){
                                  app.storys = [];
                                }
                                app.storys.push(data.payLoad);
                           }
                           console.log("user story name" + data.payLoad.name);
                       } else {
                           console.log('error');
                       }
                   }
                    //  app.enableButton=false;
               });

                }

           },
           saveComment(scope){
             var app = this;
            app.$validator.validateAll(scope);
            if(!app.errors.any()){
            var taskComment = {
              comment:app.comment,
              taskId:app.task.taskId
            }
             console.log(taskComment)
             app.$http.post(
               app.$store.state.SERVER_URL + '/api/dev-pm/add-task-comment' ,
               taskComment,

               {
                 headers: {
                   "X-Authorization": app.$cookie.get('X-Authorization')
                 },
               }
             ).then(function(response) {
               console.log(response)
              if(response.data.status === "SUCCESS"){
                if(response.data.payLoad){
                  app.taskCommentList.push(response.data.payLoad);
                }
              }else{
                console.log("something went wrong ")
              }
              setTimeout(()=>{
                app.errors.clear(scope)
              },10)
              app.comment = ''
             });
           }
           },
           cancelTask(scope){
             var app = this;
             app.$validator.validateAll(scope);
             if(!app.errors.any()){
             app.taskList =   app.userStory.taskList;
             var taskObject={
               taskId:'',
               taskStatus:'',
               isFromBacklog:'',
             }
             taskObject.taskId = app.task.taskId,
             taskObject.taskStatus = 'CANCELLED';
             taskObject.comment = app.comment;
             taskObject.isFromBacklog = true;
             console.log("going to camcel");
              console.log(taskObject);

             app.$swal({
             title: 'Are you sure?',
             text: "You won't be able to see this again!",
             type: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: 'Yes'
             }).then(function () {
                app.$store.commit('setSpinner',true);
               app.$http.post(
                 app.$store.state.SERVER_URL+'/api/project-manager/cancel-task',
                 taskObject,
                 {
                   headers: {
                     "X-Authorization": app.$cookie.get('X-Authorization')
                   },
                 },
               ).then(function(result){
                  app.isCancelClicked = false;
                  app.comment = ''
                 if(result.data.status == "SUCCESS"){
                     app.taskList.splice(app.taskIndex, 1);
                    // app.taskList.push(result.data.payLoad);
                    if(result.data.payLoad.storyPercentageCompleted != 0){
                      app.userStory.percentageCompleted = result.data.payLoad.storyPercentageCompleted;
                    }
                    if(result.data.payLoad.epicPercentageCompleted != 0){
                     app.$emit("changeEpicCompletionPercentage",result.data.payLoad.epicPercentageCompleted);
                    }
                    if(result.data.payLoad.projectPercentageCompleted != 0){
                       app.$store.commit('setProjectCompletionPercenatge', result.data.payLoad.projectPercentageCompleted);
                    }
                     app.userStory.taskList = app.taskList;
                     app.storys[app.userStoryIndex] = app.userStory;
                     app.$store.commit('setTaskToProject', result.data.payLoad);
                 }else{
                   console.log("internal server error")
                 }
                  app.$store.commit('setSpinner',false);
                 $('#add-task-modal').modal('hide')
                 $('#update-task-modal').modal('hide')
                 $('#see-task-details-modal').modal('hide');

                 setTimeout(()=>{
                   app.errors.clear('comment-form');
                   app.errors.clear('comment-form-update');
                 },50);
               });
            });
         }else{
           app.isCancelClicked=false;
         }
       },
       getCommentAndTransaction(taskId){
         var app = this;
         app.taskTransactionList = [];
         app.taskCommentList = [];
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
            if(response.data.payLoad.taskCommentList){
              app.taskCommentList =  response.data.payLoad.taskCommentList;
            }
           app.taskTransactionList =  response.data.payLoad.taskTransactionList;
          }else{
            console.log("something went wrong ")
          }

         });
       },
       convertUtcToLocaDateTime(date){
        //console.log("convertStringtoDate------------------------>")
        var moment = require('moment-timezone');
        var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return moment(date).tz(timeZone).format('DD-MM-YYYY HH:mm')
       },
     markAsCompleted(story, index, isCompleted){
      var app = this;
      var markAsComplete = {};
      markAsComplete.projectId = this.projectId;
      markAsComplete.id = story.id;
      markAsComplete.isMarkAsCompleted = isCompleted;

      // app.$swal({
      // title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      // type: 'warning',
      // showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      // confirmButtonText: 'Yes'
      // }).then(function () {

      app.$store.commit('setSpinner',true);
      app.$http.post(
       app.$store.state.SERVER_URL +"/api/project-manager/mark-as-completed-user-story" ,
        markAsComplete,
        {
          headers: {
            "X-Authorization": app.$cookie.get('X-Authorization')
          },
        }
      ).then(function(response) {

        if(response.data.status === 'SUCCESS'){
            //app.storys.splice(index,1,story);
            story.isCompleted = response.data.payLoad.isMarkAsCompleted;
            story.percentageCompleted = response.data.payLoad.storyCompletionPercentagePercentage;
            app.$emit("changeEpicCompletionPercentage",response.data.payLoad.epicCompletionPercentage);
            app.$store.commit('setProjectCompletionPercenatge', response.data.payLoad.completedPercentage);
        }
        app.$store.commit('setSpinner',false);
        console.log(response)
      });
    // });
  },
      }
   }
</script>
<style>

/*body {
  font-family: sans-serif;
  margin: 42px;
}*/

tooltip {
  display: block !important;
  pointer-events: none;
  padding: 4px;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black !important;
  color: white !important;
  border-radius: 16px !important;
  padding: 5px 10px 4px;
}

.tooltip tooltip-arrow{
  display: none !important;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden !important;
  opacity: 0 !important;
  transition: opacity .15s, visibility .15s !important;
}

.tooltip[aria-hidden='false'] {
  visibility: visible !important;
  opacity: 1 !important;
  transition: opacity .15s !important;
}


</style>
