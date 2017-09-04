<template>
    <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
      <developer-sidebar ></developer-sidebar>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">

        <alert-component v-show="isalertShow" :success="success" :message="message" @changeisaletShow="isalertShow=$event">
        </alert-component>
        <!-- Main content -->
         <!-- Project information dynamic data  -->
          <!-- <h2 class="sub_heading story com-padding">QA</h2> -->

        <!-- Main content -->
        <section class="content-header  remove-tab-shadow  nav-remove-content-padding">
            <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Test Cases" name="TestCase">
        <section class="content content-padding-top">
          <!-- <div class="tab-content"> -->
            <!-- <div class="tab-pane" :class="{ 'active' : !activeDefect}" id="TestCases"> -->
              <div class="PMepicContainer">
                <div class="row mangeEpic">
                  <div class="">
                    <div class="col-md-3 col-lg-2 text-center ">
                      <div class="row">
                      <div class="manageEpicBlock btn-ripple mgt-0">
                        <!--<h2  class="sub_heading story" >Test Library</h2>-->
                        <button class="btn btn-orange btn-lg pull-left"  data-toggle="modal" @click="openTestScenarioModal"><i class="fa fa-plus-circle epic-btn-icon" aria-hidden="true"></i> Add Test Scenario</button>
                        <br >
                        <ul class="list-group epicAdd mangeEpic epic-active">
                          <li  :class="{ 'active' : isSelected(index) }" class="list-group-item "  v-for="(testScenario,index) in testScenarioList" v-on:click="getAllTestCases(testScenario,index)">

                             <div class="row">
                                <div class="col-md-12 text-left"><span class="epicName pull-left">{{testScenario.testScenarioIdentifier}}</span></div>
                             </div>

                         </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-9 col-lg-10">
                  <div class="epicMessage story" v-if="clickedTestScenario!=''">
                         <div class="storyTitle">


                         <div class="row">
                              <div class="col-md-10"> <p class="estValue">#{{clickedTestScenario.testScenarioIdentifier}}</p></div>
                              <div class="col-md-2 paddLeft_0 text-right" v-if="isChangable">
                                  <span class="shift-right-li-epic editEpic">
                                <a type="button"  class="cursor-pointer "  @click="editTestScenarioModal(clickedTestScenario)"><span class="edit_Epic"><i class="fa fa-pencil" aria-hidden="true" ></i></span></a>
                                <a type="button"  class="cursor-pointer "   @click="deleteTestScenario(clickedTestScenario)"><span class="edit_Epic"><i class="fa fa-trash-o " aria-hidden="true" ></i></span></a>
                           </span>
                              </div>
                          </div>
                          <div class="row">
                               <div class="col-md-12"> <p style="margin: 0px;">{{clickedTestScenario.testScenarioDescription}}</p></div>
                          </div>
                          <div class="row">
                               <div class="col-md-12"><p class="estValue">Epic - {{clickedTestScenario.epicName}}</p></div>
                          </div>

                          <div class="row">
                               <div class="col-md-12"><p class="estValue">Story - {{clickedTestScenario.userStoryName}}</p></div>
                          </div>

                             <p class="estValue">Created on: <span>{{convertUtcToLocaDateTime(clickedTestScenario.createdDateInMillis)}}</span></p>
                             <p class="no-border-bottom">{{clickedTestScenario.description}}</p>



                                    </div>

                                 <appTestCases :projectLeadStatus="projectLeadStatus" :clickedTestScenario="clickedTestScenario" :testCasesList="testCasesList" :success="success" :message="message" :isalertShow="isalertShow" @changeisaletShow="isalertShow=$event" @changesuccess="success=$event"
                                 @changemessage="message=$event"></appTestCases>

                         </div>
                        </div>
                    </div>
                </div>
                <!-- </div> -->
                <!-- <div class="tab-pane pagintion-margin-bottom" :class="{ 'active' : activeDefect }" id="Defects" >
                <br>
                 <app-Defects></app-Defects>

                </div> -->
              <!-- logic for defects  -->
            <!-- </div> -->
          <!-- Your Page Content Here -->
        </section>

      </el-tab-pane>

      <el-tab-pane label="Test Run" name="TestRun">
        <app-test-run
        :testRunList="testRunList"
        :allEpicStorys="allEpicStorys"
        isalertShow="isalertShow"
        success="success"
        message="message"
        @changeSuccess = "success=$event"
        @changeMessage = "message=$event"
        @changeIsalertShow = "isalertShow=$event"
        ></app-test-run>
      </el-tab-pane>

      <el-tab-pane label="Defects" name="Defect" class="pagintion-margin-bottom">
           <section class="content content-padding-top">
           <app-Defects  :isDefectTabClicked="isDefectTabClicked"></app-Defects>
         </section>
     </el-tab-pane>

     <el-tab-pane label="UAT Issues" name="UATIssues" class="pagintion-margin-bottom">
         <section class="content content-padding-top test-content">
             <app-uat-issue :isDefectTabClicked="isUatClicked"></app-uat-issue>
         </section>
     </el-tab-pane>

       </el-tabs>

       </section>
    </div>



  <!-- add Test Scenario  -->

 <div class="modal fade" id="addTestScenario" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" v-if="testScenario.id">Update Test Scenario</h4>
          <h4 class="modal-title" v-else>Add Test Scenario</h4>
      </div>
      <div class="modal-body">
          <div class="row">
              <div class="col-md-12">

                    <form id="epicForm" @submit.prevent="addTestScenario">

                        <div class="form-group epic" :class="{'textarea': true, 'is-danger': errors.has('testScenario.testScenarioDescription')}">
                            <textarea class="form-control" name="testScenarioDescription" v-model="testScenario.testScenarioDescription"  placeholder="Test Scenario" v-validate data-vv-rules="required"></textarea>
                              <p class="text-danger" v-if="errors.has('testScenarioDescription')">Please specify test scenario</p>
                        </div>
                        <div class="form-group">
                              <select class="form-control" name="epicId" @change="getAllStory" v-model="testScenario.epicId"  :class="{'select': true, 'is-danger': errors.has('epicId')}" v-validate data-vv-rules="required">
                                     <option  value="" >Select Epic</option>
                                     <option v-for="epic in epics" :value="epic.id" >{{epic.name}}</option>
                              </select>
                                <p class="text-danger" v-if="errors.has('epicId')">Please select epic</p>
                        </div>
                        <div class="form-group">
                              <select class="form-control" name="userStoryId" v-model="testScenario.userStoryId" :class="{'select': true, 'is-danger': errors.has('userStoryId')}" v-validate data-vv-rules="required">
                                    <option value="">Select Story</option>
                                    <option v-for="story in storys" :value="story.id">{{story.name}}</option>
                              </select>
                                <p class="text-danger" v-if="errors.has('userStoryId')">Please select Story</p>
                        </div>
                         <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                           <button type="submit" class="btn btn-orange" :disabled="enableButton"v-if="testScenario.id">Update</button>
                        <button type="submit" class="btn btn-orange" :disabled="enableButton" v-else>ADD</button>

                    </form>
              </div>
          </div>
      </div>
    </div>
  </div>
</div>

</div>
</template>




<script>
    import adminHeader  from "../../adminHeader.vue"
      import footer  from "../../footer.vue"
    import DeveloperSidebar from './DeveloperProjectSidebar.vue';
    import TestCases from './DeveloperTestCases.vue';
    import defects from './DeveloperDefect.vue';
    import TestRun from '../projectManager/TestRun.vue';
    import AlertComonent from "../alert/Alert.vue";
    import DeveloperUATIssue from "../developer/DeveloperUATIssue.vue"


    export default {
        data() {
            return {
              isUatClicked:false,
              activeName:'TestCase',
              isalertShow:false,
              success:'',
              message:'',
              testRunList:[],
              allEpicStorys:[],
                projectId: '',
                epics:[],
                testScenarioList:[],
                testCasesList:[],
                selectedEpic:'',
                projectProposalId: '',
                clickedTestScenario: '',
                epicIndex:'',
                projectLeadStatus:false,
                activeClass:'',
                selected:0,
                storys: '',
                testScenarioIndex:'',
                storyId:'',
                enableButton:false,
               testScenario:{
                  testScenarioDescription:'',
                  projectId:'',
                  epicId:'',
                  userStoryId:'',
                  id:'',
                  testRunList:[],
                  allEpicStorys:[],
              },
              isDefectTabClicked:false,
            }
        },
        components: {
            "app-adminHeader": adminHeader,
            "developer-sidebar":DeveloperSidebar,
            "appTestCases":TestCases,
            'appFooter': footer,
            "app-Defects":defects,
            "app-test-run":TestRun,
            "alert-component": AlertComonent,
            "app-uat-issue":DeveloperUATIssue
        },
        created: function() {
            this.projectId = this.$store.getters.getDevProjectInfo.projectId;
            if(this.$route.query.showDefect){
                this.activeName = 'Defect';
            }
        },
        watch:{
          '$route': function(newRoute, oldRoute) {
            if(oldRoute.fullPath != newRoute.fullPath){
              if(this.$route.query.showDefect){
              this.activeName = 'Defect';
              }
            }
          },
          route: {
          canReuse: true,
          },
        },
        mounted: function() {
            this.getAllEpicAndStorys();
            this.getAllTestScenario();
            // /api/dev-pm/get-test-cases-in-project/2
        },
        computed:{
          isChangable:function(){
            return (this.$store.getters.getLoggedInUser.appUserId === this.clickedTestScenario.addedByAppUserId);
          },
        },
        methods: {
          isSelected(index){
            var app = this;
          return index === app.selected
          },
            getAllTestCases: function(testScenario,index) {

                 var app = this;
                 app.selected = index;
                 app.testScenarioIndex = index

                 app.clickedTestScenario = testScenario;
                 console.log("test senosfsfds-");
                    console.log( app.clickedTestScenario )
                // app.storyId = testScenario.userStoryId;

                app.$http.get(
                    this.$store.state.SERVER_URL + '/api/dev-pm/get-test-cases-by-test-scenario/' + testScenario.id,
                     {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')
                        },
                    }
                ).then(function(response) {
                    app.testCasesList = response.data.payLoad;
                   //console.log(app.testCasesList);
                });
            },
            showEditAndDelete(projectStatus){
                var app = this;
                if(projectStatus == 'REQUESTED' || projectStatus == 'REVISION_REQUESTED'){
                app.projectLeadStatus = true;
                   }
            } ,

            getAllEpicAndStorys: function() {
                var app = this;
                app.$store.commit('setSpinner',true);
                app.$http.get(
                    this.$store.state.SERVER_URL + '/api/developer/get-developer-shared-epics-stories/'+app.projectId,
                     {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')
                        },
                    }
                ).then(function(response) {
                  app.$store.commit('setSpinner',false);
                  console.log("get-developer-shared-epics-stories ======================")
                    app.epics = response.data.payLoad;
                    console.log(app.epics)
                    console.log(response)
                    if(app.epics.length>0){
                      app.storys = app.epics[0].userStorys;
                      app.activeClass ='active';

                    }
                    app.showEditAndDelete(response.data.payLoad.projectLeadStatus);
                });


            },

            getAllTestScenario: function() {
                var app = this;
                app.$http.get(
                    this.$store.state.SERVER_URL + '/api/dev-pm/get-test-scenarios-in-project/' + app.projectId,
                     {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')
                        },
                    }
                ).then(function(response) {
                  app.testScenarioList = response.data.payLoad;
                  if(app.testScenarioList.length > 0){
                    app.getAllTestCases(app.testScenarioList[0] , 0);
                  }
                  console.log(response)
                });
            },

            openTestScenarioModal:function(){
                var app = this;
                app.testScenario = {};
                app.testScenario.epicId = '';
                  app.testScenario.userStoryId = '';
                $('#addTestScenario').modal('show');
                    setTimeout(() => {
                        app.errors.clear();
                }, 100);

            },
            editTestScenarioModal(clickedTestScenario){
              console.log(clickedTestScenario)
                var app =this;

                app.testScenario = {};
                app.testScenario = app.clickedTestScenario;
                var epic='';
               for(epic of app.epics){
                 console.log(epic)
                 if(app.testScenario.epicId === epic.id){
                  app.storys = epic.userStorys
                   break;
                 }
               }

                console.log(app.testScenario);
                //
                // console.log(app.clickedTestScenario)
                // console.log(app.TestScenarioObject)
                $('#addTestScenario').modal('show');
            },
            deleteTestScenario(clickedTestScenario){
                var app = this;
                app.testScenario = clickedTestScenario;
                app.$swal({
                  title: 'Are you sure?',
                  text: "This test scenario may contain test case. Deleting test scenario will delete all its test cases as well!",
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes'
                }).then(function () {
                  app.$http.post(
                    app.$store.state.SERVER_URL+'/api/dev-pm/delete-test-scenario' ,
                    app.testScenario ,
                    {
                       headers: {
                           "X-Authorization": app.$cookie.get('X-Authorization')
                       },
                   }
                  ).then(function(response){

                     if (response.data.status === "SUCCESS") {

                         app.testScenarioList.splice(app.testScenarioIndex, 1);
                         app.storys=[];
                         app.clickedTestScenario='';

                     } else {
                       app.isalertShow=true;
                       app.success=false;
                       app.message= response.data.errorMessage;
                         console.log('error');
                     }
                 });
            })

            },


              getAllStory: function() {

                  var app = this;
                  var epic='';
                 for(epic of app.epics){
                   console.log(epic)
                   if(app.testScenario.epicId === epic.id){
                    app.storys = epic.userStorys
                     break;
                   }
                 }
            },


            addTestScenario(e){
              e.preventDefault();
              var app = this;
              app.$validator.validateAll()

             app.testScenario.projectId = app.projectId;

              console.log(app.testScenario)

              if(!app.errors.any()){
                app.enableButton=true;
                app.$store.commit('setSpinner',true);
              app.$http.post(
                app.$store.state.SERVER_URL+'/api/dev-pm/save-test-scenario',
                app.testScenario,
                {
                   headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')
                   },
               }
             ).then(function(response){

               $('#addTestScenario').modal('hide');
               app.enableButton=false;
               app.$store.commit('setSpinner',false);
                  if(response.data.status === 'SUCCESS'){
                    app.enableButton=false;
                     if(app.testScenario.id){
                       app.testScenarioList[app.testScenarioIndex] = response.data.payLoad;
                       app.clickedTestScenario = response.data.payLoad;
                     }else{
                        app.testScenarioList.push(response.data.payLoad);
                     }
                }else{
                  app.enableButton=false;
                 console.log("error is coming")
                }
              })
              }

            },

            handleClick:function(tab, event) {
                console.log(tab.name);
                if(tab.name =='TestRun'){
                  this.isDefectTabClicked = false;
                  this.isUatClicked = false;
                  this.getTestRun();
                  this.getAllEpicStory();
                }else if(tab.name === 'Defect'){
                  this.isDefectTabClicked = true;
                  this.isUatClicked = false;
                }else if(tab.name === 'UATIssue') {
                    this.isUatClicked = true;
                    this.isDefectTabClicked = false;
                }

              },

            getTestRun(){


              // if(app.$store.getters.getLoggedInUser.role=="PROJECT_MANAGER"){
              //   url =this.$store.state.SERVER_URL + '/api/po-pm/get-all-epic-and-story-of-project/' + app.$route.params.projectRequestId
              // }else{
              //   console.log(app.$store.getters.getDevProjectInfo.projectRequestId);
              //       url =this.$store.state.SERVER_URL + '/api/po-pm/get-all-epic-and-story-of-project/' + app.$store.getters.getDevProjectInfo.projectRequestId
              // }

              var app =this;
              console.log(app.$store.getters.getDevProjectInfo.projectId);
              app.$http.get(
                app.$store.state.SERVER_URL+'/api/dev-pm-admin/get-test-execution-runs-in-project/'+app.$store.getters.getDevProjectInfo.projectId,
              {
                headers: {
                  "X-Authorization": app.$cookie.get('X-Authorization')
                },
            }
            ).then(response => {
                if(response.data.status =='SUCCESS'){
                  console.log('get all test run-----------------');
                     app.testRunList = response.data.payLoad;
                     console.log( app.testRunList);
                }else{

                }

             }, response => {

           });
          },

          getAllEpicStory(){

           var app =this;
           app.$http.get(
             app.$store.state.SERVER_URL+'/api/dev-pm-admin/get-epics-in-project/'+app.$store.getters.getDevProjectInfo.projectId,
           {
             headers: {
               "X-Authorization": app.$cookie.get('X-Authorization')
             },
          }
          ).then(response => {
             if(response.data.status =='SUCCESS'){
                   console.log('get all test run--epic and story---------------');
                  app.allEpicStorys = response.data.payLoad;
             }else{

             }
          // success callback
          }, response => {
          // error callback
          });
           //
          },
          convertUtcToLocaDateTime(date){
           var moment = require('moment-timezone');
           var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
           //console.log("convertStringtoDate------------------------>"+timeZone)
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
