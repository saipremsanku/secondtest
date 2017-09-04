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
            <!-- <h4 class="sub_heading">Task Board</h4> -->
<div class="taskCardBlock">
    <!-- <div class="alert  inspirage-danger"  v-if="showMessage" role="alert">
      {{errorMessage}}
    </div> -->
    <div class="col-md-12">

      <div class="row">
        <div class="col-md-3 paddRight-0 paddLeft-0">
          <div class="taskCard_Block">Backlog </div>
        </div>
        <div class="col-md-3 paddRight-0 paddLeft-0">
          <div class="taskCard_Block">WIP</div>
        </div>
        <div class="col-md-3 paddRight-0 paddLeft-0">
          <div class="taskCard_Block">To Be Verified</div>
        </div>
        <div class="col-md-3 paddRight-0 paddLeft-0">
          <div class="taskCard_Block">Done</div>
        </div>
      </div>
      <div class="row">
            <div class="col-md-3 paddRight-0 paddLeft-0 pm-scroll-tasks">
            <div class="taskCard_details_block">

              <div   :assigned-status-id="'ASSIGNED'" >
                <!-- <draggable  class="dragArea pm-mht-dragArea-ASSIGNED" :options="{group:'people'}" :list="this.$store.getters.getBacklogList" :move="backlogMove" @add="addAssignedElement"> -->
                  <div v-for="backlog in this.$store.getters.getBacklogList" :assigned-id="backlog.taskId" :assigned-taskStatus-id="backlog.taskStatus">

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
                                  <!-- <span class="estValue"><b>{{backlog.appUserName}}</b></span> -->
                            </div>
                          </div>
                          </div>
                        </div>

                      </div>

                      </div>

                </div>
              <!-- </draggable> -->
            </div>

          </div>
        </div>


          <!--second colomn-->
          <div class="col-md-3 paddRight-0 paddLeft-0 pm-scroll-tasks">
          <div class="taskCard_details_block">

            <div   :work-in-progress-status-id="'WORK_IN_PROGRESS'">
               <!-- <draggable  class="dragArea pm-mht-dragArea-WORK_IN_PROGRESS" :options="{group:'people'}" :list="this.$store.getters.getWorkInProgressList" :move="workInProgressMove" @add="addWorkInProgressElement" > -->
                  <div v-for="backlog in this.$store.getters.getWorkInProgressList" :work-in-progress-id="backlog.taskId" :work-in-progress-taskStatus-id="backlog.taskStatus" >

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
                              <!-- <span class="estValue"><b>{{backlog.appUserName}}</b></span> -->
                        </div>
                      </div>
                      </div>
                    </div>

               </div>
              <!-- </draggable> -->
            </div>

        </div>
      </div>

        <div class="col-md-3 paddRight-0 paddLeft-0 pm-scroll-tasks">
        <div class="taskCard_details_block">

          <div   :completed-by-developer-status-id="'COMPLETED_BY_DEVELOPER'">
             <!-- <draggable  class="dragArea pm-mht-dragArea-COMPLETED_BY_DEVELOPER" :options="{group:'people'}"  :list="this.$store.getters.getCompletedByDeveloperList" :move="completedByDeveloperMove" @add="addCompletedByDeveloperElement"> -->
                <div v-for="backlog in this.$store.getters.getCompletedByDeveloperList" :completed-by-developer-id="backlog.taskId" :completed-by-developer-taskStatus-id="backlog.taskStatus" >

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
                            <!-- <span class="estValue"><b>{{backlog.appUserName}}</b></span> -->
                      </div>
                    </div>
                    </div>
                  </div>

             </div>
            <!-- </draggable> -->
          </div>

        </div>
      </div>

      <!--fourth colomn-->
      <div class="col-md-3 paddRight-0 paddLeft-0 pm-scroll-tasks">
      <div class="taskCard_details_block">

        <div   :approved-by-pm-status-id="'APPROVED_BY_PM'">
          <!-- <draggable  class="dragArea pm-mht-dragArea-APPROVED_BY_PM" :options="{group:'people'}"   :list="this.$store.getters.getVerifiedList" :move="verifiedMove"  @add="addApprovedByPmElement"> -->
              <div v-for="backlog in this.$store.getters.getVerifiedList" :approved-by-pm-id="backlog.taskId">

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
                          <!-- <span class="estValue"><b>{{backlog.appUserName}}</b></span> -->
                    </div>
                  </div>
                  </div>
                </div>

           </div>
         <!-- </draggable> -->
        </div>

    </div>
    </div>
    <!--end-->
      </div>
    </div>
</div>
</section>
</div>



</div>
</template>



<script>
    import adminHeader from "../../adminHeader.vue";
    import projectInfoHeader from "../../projectInfoHeader.vue";
    import draggable from 'vuedraggable'
    //import adminHeader  from "./adminHeader.vue"
    import poSidebar from "../../poSideBar.vue"
    import footer  from "../../footer.vue"

export default {

       data(){
         return{
            loggedInRole: this.$store.getters.getLoggedInUser.role,
            taskId:'',
            taskIdentifier:'',
            changeStatus:'',
            appUserId:'',
         }
       },
       created: function(){
        this.projectRequestId = this.$route.params.projectRequestId;
       },

     computed:{

     },

     components:{
         "app-adminHeader":adminHeader,
         "projectInfoHeader":projectInfoHeader,
          draggable,
          "poSidebar":poSidebar,
          "app-footer":footer,
     },

     methods:{
// getIpAddress(){
//     $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
//        console.log(" console.log(resp)------------------------------------>>")
//       console.log(resp)
//     });
// },
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

     convertUtcToLocaDateTime(date){
      //console.log("convertStringtoDate------------------------>")
      var moment = require('moment-timezone');
      var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return moment(date).tz(timeZone).format('DD-MM-YYYY HH:mm')
    },

     },
}
</script>
