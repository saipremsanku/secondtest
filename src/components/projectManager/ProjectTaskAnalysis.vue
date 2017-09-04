<template>
    <div class="wrapper">
      <!-- Main Header -->
      <app-admin-header></app-admin-header>
<!-- checking validation for Product owner  -->

      <div v-if="role === 'PRODUCT_OWNER'">
        <div v-if="newOrDraftOrRequestedProjectRequest()">
          <app-product-owner-sidebar inProject="showPONavbar"></app-product-owner-sidebar>
        </div>
        <div v-if="showAllSideBarTOProductOwner()">
          <poSidebar :projectRequestId="projectLeadId" :projectLeadStatus="project.projectLeadStatus"></poSidebar>
        </div>

      </div>


      <div v-if="role === 'PROJECT_MANAGER'">

        <pmSidebar :projectRequestId="projectRequestId"></pmSidebar>
      </div>
      <div v-if="role === 'ADMIN'">
        <!-- <pmSidebar :projectRequestId="projectLeadId"></pmSidebar> -->
        <AdminSidebar></AdminSidebar>
      </div>

      <div class="content-wrapper">
        <div v-if="role === 'ADMIN'">
          <AdminProjectHeader></AdminProjectHeader>
        </div>
          <div v-if="role === 'PROJECT_MANAGER'">
           <projectInfoHeader v-show="(projectLeadId != '') && (projectLeadStatus != 'DRAFT')"></projectInfoHeader>
         </div>
          <section class=" content content-padding">

            <div class="row product-task-border" >
                <div class="col-md-6 product-task-an-padding  graph-bg activity-scroll-height">
                     <div class="row blankpage">
                                   <el-tabs v-model="activeName" @tab-click="handleClick">
                                      <el-tab-pane  v-for="(repo,index) in repoList" :label="repo.repositoryName" :name="repo.repositoryName">
                                         <div class="row">
                                           <div class="taskCard border-left-orange">
                                          <span><p>Description :{{repo.description}}</p></span>
                                           <span><p> URL : {{repo.url}}</p></span>
                                          <!-- <span><p>Hook URL : {{repo.hookurl}}</p></span>
                                          <span><p>Secret Token : {{repo.secretToken}}</p></span>  -->
                                         </div>
                                       </div>
                                           <hr/>
                                        <div v-for="commit in repo.codecommits">
                                          <div class="row">
                                            <div class="col-md-12">
                                              <div class="taskCard border-left-orange">
                                                <div class="row">
                                                  <div class="col-md-12">
                                                      <p class=""><a href="repo.commiturl" data-toggle="tab">
                                                     {{repo.commiturl}} <b>{{commit.commitId}}</b></a></p>
                                                   <span class="estValue">New commit: {{commit.commitMessage}}</span>
                                                  <div class="row">
                                                    <hr/>
                                                  </div>
                                                  <div class="col-md-6 paddLeft-0">
                                                    <span class="estValue">{{convertUtcToLocaDateTimeForGit(commit.commitDate)}}</span>
                                                  </div>
                                                  <div class="col-md-6 text-right  paddRight-0">
                                                    <span class="estValue"> commited by : <b>{{commit.appUseremail}}</b></span>
                                                  </div>
                                                </div>
                                                </div>
                                              </div>
                                            </div>
                                            </div>
                                      </div>
                                      </el-tab-pane>
                                      <el-tab-pane>
                                       <span slot="label"><i class="fa fa-plus-circle plush-icon" aria-hidden="true"></i></span>
                                       <div class="build-content">
                                       <form  @submit.prevent="createRepository">
                                          <input type="hidden" name="projectId" v-model="projectId">
                                          <div class="form-group">
                                         <input class="form-control epicName" id="repo" name="repositoryName" v-model="repositoryName"   type="text"  placeholder="Repository Name" >
                                       </div>
                                          <div class="form-group">
                                           <input class="form-control epicName" name="description" v-model="description"   type="text"  placeholder="Description" >
                                         </div>

                                           <button type="submit" class="btn btn-orange" :disabled="enableButton" >submit</button>

                                       </form>
                                     </div>
                                  </el-tab-pane>
                                    </el-tabs>

                     </div>
              </div>
              <div class="col-md-6 text-center product-task-an-padding product-task-border product-task-add-padding activity-scroll-height">
                <div class="row">
                            <div id="chart_id" class="chart firstrow"></div>
                </div>
                <div class="row secondrow">
                    <div class="row" v-if="showPrevGraph">
                           <h4 class="product-test-display-inline"> Daily Task Status </h4>
                       <a v-if="isNextExist1" type="button"class="cursor-pointer pull-right">
                         <span<i class="fa fa-fast-forward" aria-hidden="true" @click="showNextGraph"></i>
                        </span></a>
                        <column-chart  xtitle="date" ytitle="Hours" :stacked="true" :data="dailyTaskStatus"></column-chart>
                        </div>
                    <div class="row" v-if="showGraph">
                      <a  v-if="isPreviousExist1" type="button"class= "cursor-pointer pull-left" ><span
                         <i class="fa fa-fast-backward" aria-hidden="true" @click="showPreviousMilesone1"></i>
                       </span></a>
                       <a  type="button"class= "cursor-pointer pull-left" v-else ><span
                          <i class="fa fa-fast-backward" aria-hidden="true" @click="showDailyStatusGraph"></i>
                        </span></a>
                           <h4 class="product-test-display-inline"> {{milestoneObject1.milestoneName}} </h4>
                       <a  v-if="isNextExist1" type="button"class="cursor-pointer pull-right">
                         <span<i class="fa fa-fast-forward" aria-hidden="true" @click="showNextMilesone1"></i>
                        </span></a>
                        <div>
                        <span class="pull-left"><b>Task Status</b> </span>
                      <column-chart  xtitle="Developer" ytitle="Hours" :stacked="true" :data="taskStatus"></column-chart>
                      </div>
                        </div>
                </div>
                <div class="row">
                        <div class="col-md-6 text-center product-task-an-padding thirdrow">
                               <div class="row">
                                 <a  v-if="isPreviousExist" type="button"class= "cursor-pointer pull-left" ><span
                                    <i class="fa fa-fast-backward" aria-hidden="true" @click="showPreviousMilesone"></i>
                                  </span></a>
                                      <h4 class="product-test-display-inline"> {{milestoneObject.milestoneName}} </h4>
                                  <a  v-if="isNextExist" type="button"class="cursor-pointer pull-right"><span
                                 <i class="fa fa-fast-forward" aria-hidden="true" @click="showNextMilesone"></i>
                               </span></a>
                               </div>
                               <br>
                              <div>
                                <span class="pull-left"><b>Defect Status</b> </span>
                           <column-chart :colors="['#d13b00']" xtitle="Assignee" ytitle="No.of Defects"  :data="dfectData"></column-chart>
                         </div>
                        </div>
              </div>
              <div class="row">
                <div class="col-md-6 product-task-an-padding product-task-remove-padding product-task-border product-task-add-padding remove-left-line fourthrow">
                  <div class="row text-center">
                    <a   :disabled="isbackDisable" type="button" class= "cursor-pointer pull-left" ><span
                       <i class="fa fa-fast-backward" aria-hidden="true" @click="showPreviousTestCase"></i>
                     </span></a>
                         <h4 class="product-test-display-inline text-center">{{testcaseName}}</h4>
                     <a  type="button" :disabled="isNextDisable" class="cursor-pointer pull-right"><span
                    <i class="fa fa-fast-forward"  :disabled="isNextDisable" aria-hidden="true" @click="showNextTestCase"></i>
                  </span></a>

                  </div>

                  <br>
                   <!-- <div class="row"><center>  <h4 class="product-test-display-inline"> Test Run</h4></center></div> -->
                    <div class="col-md-6 ">
                      <span class="pull-left"><b>{{totalTestCases}} Test Cases</b> </span>
                      <pie-chart :colors="['#076A3C','#AC0A0A','#7E7573']" :data="testCase"></pie-chart>
                </div>

                <div class="col-md-6" >
                  <span class="pull-left"><b>{{defectCount}} Open/Reopen Defects</b> </span>
                  <pie-chart :colors="['orange','#DBD509','blue','#AC0A0A']" :data="testDefectStatus"></pie-chart>

              </div>
                </div>
              </div>

              </div>
          </div>

          <div class="row product-task-border remove-up-line" >
          <div class="col-md-12 product-task-an-padding ">
            <div class="row">
                <center>  <h4 class="product-test-display-inline"> Approved Tasks</h4></center>
            </div>

        <div v-for="milestone in approvedTaskMilestoneList">
          <!-- <bar-chart width="400px" height="300px"  :stacked="true" :colors="['#65a801']" :min="0" :max="100" :data="approvedTask"></bar-chart> -->
         <br>
        <div class="row">
          <div class="col-md-2">
              <label>{{milestone.milestoneName}}</label>
          </div>
          <div class="col-md-8">
          <div class="progress">

              <div class="progress-bar  progress-bar-success"  :style="progressWidth(milestone.taskCompletedPercentage)"  v-if="milestone.taskCompletedPercentage==100">
                <span>{{milestone.taskCompletedPercentage}}%</span>
              </div>
              <div class="progress-bar  progress-bar-warning"  :style="progressWidth(milestone.taskCompletedPercentage)"  v-else>
                <span>{{milestone.taskCompletedPercentage}}%</span>
              </div>
          </div>
        </div>
        <div class="col-md-2">
            <label>{{milestone.totalMilestoneHours+ " "+"Hours"}}</label>
        </div>
      </div>
      </div>
        </div>
        </div>


                  </section>
                  <div class="control-sidebar-bg"></div>

            </div>
        <!-- /.content -->


  </div>
</template>


<script>


    import adminHeader from "../../adminHeader.vue";
    import ProductOwnerSidebar from "../../ProductOwnerSidebar.vue";
    import poSidebar from "../../poSideBar.vue"
    import pmSidebar from "../../ProjectSidebar.vue"
    import projectInfoHeader from "../../projectInfoHeader.vue"
    import  AdminSidebar  from  "../../SupperAdminSideBar.vue";
    import  adminProjectHeader  from  "../../components/admin/adminProjectHeader.vue";

    export default {
        data() {
            return {
                url:'',
                description:'',
               activeName:'',
                repoList:'',
                isError:false,
                errorMessage:'',
                enableButton:false,
                repositoryName:'',
                repoId:'',
                projectRequestId:'',
                projectLeadStatus:'',
                loggedInRole: this.$store.getters.getLoggedInUser.role,
                products: '',
                projectId: '',
                dfectData: [],
                projectLeadId:this.$store.getters.getProjectInfo.projectLeadId,
                milestoneList:[],
                currentIndex:0,
                isPreviousExist:false,
                isNextExist:false,
                defectMilestoneList:[],
                approvedTaskMilestoneList:[],
                currentIndex1:0,
                isPreviousExist1:false,
                isNextExist1:false,
                milestoneLength: 0,
                milestoneObject: {},
                milestoneObject1: {},
                taskStatus: [],
                dailyTaskStatus:[],
                showGraph:false,
                showPrevGraph:true,
                expenditure:[
                  {name: 'L0', data: {'1': 4, '2': 4,'3': 4,'4': 4,'5': 4}},
                 {name: 'L1', data: {'1': 5, '2': 5,'3': 5,'4': 5,'5': 5}},
                 {name: 'L1', data: {'1': 7, '2':4,'3':6}}
               ],

                testCase:[],
                testDefectStatus:[],
                testDefectStatusList:[],
                testCaseList:[],
                testCaseIndex:0,
                role: '',
                approvedTask: '',
                projectId: this.$store.getters.getProjectInfo.projectId,
                isbackDisable:false,
                isNextDisable:false,
                testcaseName:'',
                defectCount:'',
                totalTestCases:''
            }

        },
        components: {
          "app-admin-header":adminHeader,
          "app-product-owner-sidebar":ProductOwnerSidebar,
          "poSidebar":poSidebar,
          "pmSidebar":pmSidebar,
          "projectInfoHeader":projectInfoHeader,
          'AdminSidebar': AdminSidebar,
          'AdminProjectHeader':adminProjectHeader,
        },
        mounted: function() {
            this.role = this.$cookie.get('role');
            this.getTaskStatus();
            this.getApprovedTask();
            this.getRepositoryAndCommits();
            this.getDefectStatus();
            this.getTestCase();
            setTimeout(() => {
                  google.charts.setOnLoadCallback(this.drawChart());
           }, 5000);


        },
        computed: {
 },
        created: function(){
            this.projectRequestId = this.$route.params.projectRequestId;
          //  console.log("project id--------------"+this.projectRequestId);
        },
        methods: {
          handleClick(tab, event) {
              console.log(tab, event);
            },
          createRepository: function(e){
              e.preventDefault();
               var app = this;
               var  repos ={};
               //repos.repoId  = app.repoId;
               repos.repositoryName=app.repositoryName;
               repos.description=app.description;
               repos.projectId=this.$store.getters.getProjectInfo.projectId;
               app.$validator.validateAll('Repo-scope');
                 if (!app.errors.any()) {
                   app.enableButton=true;
                   app.$store.commit('setSpinner',true);
               app.$http.post(app.$store.state.SERVER_URL +'/api/pm-admin/save-gitrepository',repos,
                  {
                       headers: {
                              "X-Authorization": app.$cookie.get('X-Authorization')
                          },

                  }).then((response) => {
                    app.enableButton=false;
                    app.$store.commit('setSpinner',false);
                    if(response.data.status=='SUCCESS'){
                      app.enableButton=false;
                      if(app.repoId!=null && app.repoId !=''){
                        app.enableButton=false;
                       app.repoList.splice(app.index, 1, response.data.payLoad);
                      }else{
                        app.enableButton=false;
                       if(!app.repoList){
                         app.repoList=[];
                       }
                       app.repoList.unshift(response.data.payLoad);
                       app.totalRepoCount += 1;
                       app.activeName= response.data.payLoad.repositoryName;
                      }
                    }else{
                      app.$store.commit('setSpinner',false);
                      app.errorMessage = response.data.errorMessage;
                      app.isError=true;
                      setTimeout(function () {
                      app.isError=false;
                    }, 3000)
                      app.enableButton=false;
                    }

              }, (response) => {
                app.$store.commit('setSpinner',false);
                app.enableButton=false;
            });
          }
          },
          getRepositoryAndCommits: function() {
              var app = this;
              app.$store.commit('setSpinner', true);
              app.$http.get(
                  app.$store.state.SERVER_URL + '/api/dev-pm-admin//get-gitrepository/' + app.projectId, {
                      headers: {
                          "X-Authorization": app.$cookie.get('X-Authorization')
                      },
                  }
              ).then(function(response) {
                  app.$store.commit('setSpinner', false);
                  console.log("repo  --oo--oo--oo--oo--oo",response.data.payLoad);
                  app.repoList=response.data.payLoad;
                  app.activeName = app.repoList[0].repositoryName;
              });

          },

          progressWidth: function(completedPercentage){
            return "width:" +completedPercentage + "%";
          },
          showPreviousMilesone(){
            var app = this;
           app.currentIndex = (app.currentIndex-1);
           app.milestoneObject = app.milestoneList[app.currentIndex];
           app.getDefectStatus();
          if(app.currentIndex>0){
            app.isPreviousExist = true;
          }else{
              app.isPreviousExist = false;
          }
          //console.log(app.currentIndex+"-----")
           if(app.milestoneList.length > (app.currentIndex+1)){
               app.isNextExist = true;
           }else{
             app.isNextExist = false;
           }
          },
          showNextMilesone(){
            var app = this;
            app.currentIndex = (app.currentIndex+1);
            app.milestoneObject = app.milestoneList[app.currentIndex];
             app.getDefectStatus();
            if( (app.currentIndex)<(app.milestoneList.length-1 )){
                app.isNextExist = true;
            }else{
              app.isNextExist = false;
            }
           if(app.currentIndex>0){
               app.isPreviousExist = true;
           }else{
             app.isPreviousExist = false;
          }
          },
          showPreviousTestCase(){
            var app = this;



          if (app.testCaseIndex > 0) {

            var testCase={};
            var testDefectStatus={};
            if(app.testCaseList[app.testCaseIndex - 1]){

              app.testcaseName= app.testCaseList[app.testCaseIndex - 1].testExecutionRunIdentifier;
              app.defectCount= app.testCaseList[app.testCaseIndex - 1].defectCount;
              app.totalTestCases= app.testCaseList[app.testCaseIndex - 1].totalTestCases;
              testCase.Pass= app.testCaseList[app.testCaseIndex - 1].testCasesPassedCountPercentage;
              testCase.Fail = app.testCaseList[app.testCaseIndex - 1].testCasesFailedCountPercentage;
              testCase.NotRun = app.testCaseList[app.testCaseIndex - 1].testCasesNotExecutedCountPercentage;
              app.testCase= testCase;

              testDefectStatus.Low= app.testCaseList[app.testCaseIndex - 1].lowDefectsCountPercentage
              testDefectStatus.Medium= app.testCaseList[app.testCaseIndex - 1].mediumDefectsCountPercentage
              testDefectStatus.High= app.testCaseList[app.testCaseIndex - 1].highDefectsCountPercentage
              testDefectStatus.ShowStopper= app.testCaseList[app.testCaseIndex - 1].showStopperDefectsCountPercentage
            }
            app.testDefectStatus=testDefectStatus;
              app.testCaseIndex = app.testCaseIndex - 1;

              app.isNextDisable=false;
          }else{
            app.isbackDisable=true;
          }

          },
          showNextTestCase(){
            var app = this;


            if (app.testCaseIndex < (app.testCaseList.length - 1)) {

              var testCase={};
              var testDefectStatus={};
              app.testcaseName= app.testCaseList[app.testCaseIndex + 1].testExecutionRunIdentifier;
              app.defectCount= app.testCaseList[app.testCaseIndex + 1].defectCount;
              app.totalTestCases= app.testCaseList[app.testCaseIndex + 1].totalTestCases;
              testCase.Pass= app.testCaseList[app.testCaseIndex + 1].testCasesPassedCountPercentage;
              testCase.Fail = app.testCaseList[app.testCaseIndex + 1].testCasesFailedCountPercentage;
              testCase.NotRun = app.testCaseList[app.testCaseIndex + 1].testCasesNotExecutedCountPercentage;
              app.testCase= testCase;

              testDefectStatus.Low= app.testCaseList[app.testCaseIndex + 1].lowDefectsCountPercentage
              testDefectStatus.Medium= app.testCaseList[app.testCaseIndex + 1].mediumDefectsCountPercentage
              testDefectStatus.High= app.testCaseList[app.testCaseIndex + 1].highDefectsCountPercentage
              testDefectStatus.ShowStopper= app.testCaseList[app.testCaseIndex + 1].showStopperDefectsCountPercentage
              app.testDefectStatus=testDefectStatus;
                app.testCaseIndex = app.testCaseIndex + 1;
                app.isbackDisable=false;
            }else{
              //console.log("---next disabled----"+app.isNextDisable);
              app.isNextDisable=true;
            }

          },
          showNextGraph(){
          var app=this;
          app.showGraph=true;
          app.showPrevGraph=false;
          },
          showDailyStatusGraph(){
          var app=this;
          app.showGraph=false;
          app.showPrevGraph=true;
          },



            //****************************
            showPreviousMilesone1(){
              var app = this;
             app.currentIndex1 = (app.currentIndex1-1);
             app.milestoneObject1 = app.defectMilestoneList[app.currentIndex];
             app.getTaskStatus();
            if(app.currentIndex1>0){
              app.isPreviousExist1 = true;
            }else{
                app.isPreviousExist1 = false;
            }
            //console.log(app.currentIndex+"-----")
             if(app.defectMilestoneList.length > (app.currentIndex1+1)){
                 app.isNextExist1 = true;
             }else{
               app.isNextExist1 = false;
             }
            },
            showNextMilesone1(){
              var app = this;
              app.currentIndex1 = (app.currentIndex1+1);
              app.milestoneObject1 = app.defectMilestoneList[app.currentIndex1];
               app.getTaskStatus();
              if( (app.currentIndex1)<(app.defectMilestoneList.length-1 )){
                  app.isNextExist1 = true;
              }else{
                app.isNextExist1 = false;
              }
             if(app.currentIndex1>0){
                 app.isPreviousExist1 = true;
             }else{
               app.isPreviousExist1 = false;
            }
            },

            //*************************
            getTaskStatus: function() {
                var app = this;
                app.$store.commit('setSpinner', true);
                app.$http.get(
                    app.$store.state.SERVER_URL + '/api/pm-admin/get-developer-task-status/' + app.projectId, {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')
                        },

                    }
                ).then(function(response) {
                    app.$store.commit('setSpinner',false);

                    //  console.log("getTotalTask ================================================================");
                    //  console.log("dev task-->"+JSON.stringify(response));
                    var taskStatus = []
                    var dailyTaskStatus = []
                    var data1 = []
                    var data2 = []
                    var data3=[]
                    var obj1 = {};
                    var obj2 = {};
                    app.defectMilestoneList = response.data.payLoad.milestones;
                    if(app.defectMilestoneList){
                      app.milestoneObject1 = app.defectMilestoneList[app.currentIndex1];
                      app.milestoneLength = app.defectMilestoneList.length;
                    }
                    if((app.milestoneLength-1)>app.currentIndex1){
                      app.isNextExist1=true
                       }
                       else{
                           app.isNextExist1=false
                       }

                    for (var appUser of response.data.payLoad.milestones[app.currentIndex1].appUsers) {
                      //  console.log(appUser.appUserFullName + "---" + appUser.assignedAndWIPHours)
                        var appU1 = []
                        appU1.unshift(appUser.appUserFullName, appUser.assignedAndWIPHours);
                        data1.unshift(appU1)
                        var appU2 = []
                        appU2.unshift(appUser.appUserFullName, appUser.completedByDeveloperHours);
                        data2.unshift(appU2)
                    }
                    for (var appUser1 of response.data.payLoad.dailyTaskStatus) {
                      //  console.log(appUser.appUserFullName + "---" + appUser.assignedAndWIPHours)
                        var appU1 = []
                        appU1.unshift(app.convertUtcToLocaDateTime(appUser1.date), appUser1.totalApprovedHours);
                        data3.unshift(appU1);
                    }

                    obj1.name = "Pending Approval"
                    obj1.data = data2;
                    obj2.name = "Remaining (Assigned + WIP)"
                    obj2.data = data1;
                    taskStatus.unshift(obj1, obj2);

                    app.taskStatus = taskStatus;
                    app.dailyTaskStatus=data3;

                });

            },
            convertUtcToLocaDateTimeForGit(date){
              var app=this;
             var moment = require('moment-timezone');
             var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            // console.log("convertStringtoDate------------------------>"+date)
             return moment(date).tz(timeZone).format('DD-MMM-YYYY HH:mm:ss')
            },
            convertUtcToLocaDateTime(date){
              var app=this;
             var moment = require('moment-timezone');
             var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            // console.log("convertStringtoDate------------------------>"+date)
             return moment(date).tz(timeZone).format('DD/MMM/YYYY')
            },
            getApprovedTask: function() {
                var app = this;
                app.$store.commit('setSpinner', true);
                app.$http.get(
                    app.$store.state.SERVER_URL + '/api/pm-admin/get-approved-task-percentage-each-milestone/' + app.projectId, {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')
                        },
                    }
                ).then(function(response) {
                    app.$store.commit('setSpinner', false);
                    //  console.log('getApprovedTask------------->')
                  //  console.log(response)
                    app.approvedTaskMilestoneList=response.data.payLoad.milestones
                });

            },

            getDefectStatus: function() {
                var app = this;
                app.$store.commit('setSpinner', true);
                app.$http.get(
                    app.$store.state.SERVER_URL + '/api/pm-admin/get-developer-defect-status/' + app.projectId, {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')
                        },
                    }
                ).then(function(response) {
                //  console.log(response)
                    app.$store.commit('setSpinner', false);
                    var dfectData = []
                    var data2 = []
                    var obj = {};
                  app.milestoneList = response.data.payLoad.milestones;
                  if(app.milestoneList){
                    app.milestoneObject = app.milestoneList[app.currentIndex];
                    app.milestoneLength = app.milestoneList.length;
                  }
                  if((app.milestoneLength-1)>app.currentIndex){
                    app.isNextExist=true
                     }
                     else{
                         app.isNextExist=false
                     }
                    for (var milestone of app.milestoneList[app.currentIndex].appUserDefectList) {
                     for (var key in milestone) {
                       if (milestone.hasOwnProperty(key)) {
                         //console.log(key + " -> " + JSON.stringify(appUser[key]));
                         var mile = []
                         mile.unshift(milestone[key].appUserFullName, milestone[key].openedAndReopenedDefects);
                         dfectData.unshift(mile)
                       }
                     }
                    }

                    obj.name = "Open/Reopen"
                    obj.data = dfectData;
                    data2.unshift(obj)
                    app.dfectData = data2
                    //  console.log(app.currentIndex);

                });

            },

            getTestCase: function() {
                var app = this;
                app.$store.commit('setSpinner', true);
                app.$http.get(
                    app.$store.state.SERVER_URL + '/api/pm-admin/get-project-test-case-status/' + app.projectId, {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')
                        },
                    }
                ).then(function(response) {
                    app.$store.commit('setSpinner', false);
                    if(response.data.payLoad.testRuns){
                      var testCase={};
                      var testDefectStatus={};
                      app.testcaseName=response.data.payLoad.testRuns[app.testCaseIndex].testExecutionRunIdentifier ;
                      app.defectCount=response.data.payLoad.testRuns[app.testCaseIndex].defectCount;
                      app.totalTestCases=response.data.payLoad.testRuns[app.testCaseIndex].totalTestCases;


                      testCase.Pass= response.data.payLoad.testRuns[app.testCaseIndex].testCasesPassedCountPercentage;
                      testCase.Fail = response.data.payLoad.testRuns[app.testCaseIndex].testCasesFailedCountPercentage;
                      testCase.NotRun = response.data.payLoad.testRuns[app.testCaseIndex].testCasesNotExecutedCountPercentage;
                      app.testCase= testCase;
                      testDefectStatus.Low=response.data.payLoad.testRuns[app.testCaseIndex].lowDefectsCountPercentage
                      testDefectStatus.Medium=response.data.payLoad.testRuns[app.testCaseIndex].mediumDefectsCountPercentage
                      testDefectStatus.High=response.data.payLoad.testRuns[app.testCaseIndex].highDefectsCountPercentage

                      testDefectStatus.ShowStopper=response.data.payLoad.testRuns[app.testCaseIndex].showStopperDefectsCountPercentage
                      app.testDefectStatus=testDefectStatus;
                      app.testCaseList= response.data.payLoad.testRuns;
                    }
                    //   console.log('getTestCase------------->')
                    // console.log(response)
                     app.testCaseIndex=0;

                  //  console.log(app.testCasesNotExecutedCountPercentage)
                });

            },

              projectExpenditureCompletionGraph(){

                  var app=this;


                      // google.setOnLoadCallback(app.drawChart());

                      app.drawChart();

              },

            drawChart: function() {

              var app = this;

              if(google.visualization){

                app.$store.commit('setSpinner', true);
                app.$http.get(
                    app.$store.state.SERVER_URL + '/api/pm-admin/get-project-expenditure-completion-graph/' + app.projectId,
                     {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')
                        },
                    }
                ).then(function(response) {
                    app.$store.commit('setSpinner', false);
                      var graphData = [];

                      graphData.push(['date', 'L0', 'L1', 'L2','expenditure','project completed']);

                      for (data of response.data.payLoad.graph) {
                         graphData.push([data.date,response.data.payLoad.L0,response.data.payLoad.L1,response.data.payLoad.L2,data.expenditure,(data.projectCompletionPercentage/100)]);
                       }
                        if(graphData.length != 0){
                        var data = google.visualization.arrayToDataTable(graphData);

                         // var data = google.visualization.arrayToDataTable([
                         //    ['date', 'L0', 'L1', 'L2','expenditure','project completed'],
                         //    [ "1 Mar", 14000,  16000,18000,100,0],  [ "2 Mar", 14000,  16000,18000,300 ,0.020],  [ "3 Mar", 14000, 16000,18000,600,0.025]
                         //   ]);
                           var options = {
                             title: 'Leads',
                             hAxis: {showTextEvery: 5},
                             vAxes: {0: {viewWindowMode:'explicit',
                                         viewWindow:{
                                                     max:response.data.payLoad.L2,
                                                     min:0
                                                     },
                                         gridlines: {color: 'transparent'},
                                         },
                                     1: {
                                       viewWindow:{

                                                   min:0
                                                   },gridlines: {color: 'transparent'},
                                         format:"#%"},
                                     },
                             series: {0: {targetAxisIndex:0},
                                      1:{targetAxisIndex:0},
                                      2:{targetAxisIndex:0},
                                      3:{targetAxisIndex:0},
                                      4:{targetAxisIndex:1},
                                     },
                             colors: ["#F7DC6F","orange","red","#3498DB","green"],
                             chartArea:{left:100,top:100, width:500, height:150},
                               backgroundColor: '#f2f3f4'
                           };

                           var chart = new google.visualization.LineChart(document.getElementById('chart_id'));
                            chart.draw(data, options);

                           }

               });

               }else{
                     //console.log("call back--------------------------------");
                 setTimeout(() => {

                 app.drawChart();
                }, 2000);

               }

              // var data = new google.visualization.DataTable();
              //    data.addColumn('number', 'Student ID');
              //    data.addColumn('number', 'ABOVE SHORTFALL');
              //    data.addColumn('number', 'BELOW SHORTFALL');
              //    data.addColumn('number', 'COMPLIANCE COVER');
              //    data.addRows([
              //       [0, 1.5, 2.4,  2],
              //      [1, 1,    2.5,  2],
              //      [2, 1.9,  3.1,  2],
              //      [3, 1.6,  3.5,  2],
              //      [4, 1.8,  3,    2],
              //      [5, 1,    3.8,  2]
              //
              //
              //    ]);
              //
              //   var options = {
              //    chart: {
              //             title: 'Students\' Final Grades',
              //             subtitle: 'based on hours studied'
              //           },
              //     seriesType: 'scatter',
              //      series: {
              //
              //           0: {
              //                 type: "scatter",
              //                 color: "red",
              //                 pointShape: 'diamond'
              //
              //             },
              //              1: {
              //                 type: "scatter",
              //                 color: "#008000",
              //
              //             },
              //                 2: {
              //                 type: "line",
              //                 color: "#FFD700",
              //
              //             },
              //      },
              //      title: 'COMPLIANCE SHORTFALL TRACKING',
              //          vAxes: {
              //           0: {title: 'VALUE OF COVER', textPosition: 'out'},
              //
              //         },
              //
              //    };
              //
              //     var chart = new google.visualization.ComboChart(document.getElementById('chart_id'));
              //    chart.draw(data, options)


            },
        }


    }
</script>
<style scoped>
.green-text {
color: green;
}


.remove-left-line{
  border-left: none;
}
.remove-up-line{
  border-top: none;

}
</style>
