<template>

    <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
      <div v-if="loggedInRole === 'ADMIN'">
        <AdminSidebar></AdminSidebar>
      </div>
      <div v-if="loggedInRole === 'PRODUCT_OWNER'">
        <app-po-sidebar :projectRequestId="projectRequestId"></app-po-sidebar>
     </div>

      <div class="content-wrapper">
<projectInfoHeader :projectRequestId="projectRequestId"></projectInfoHeader>

         <app-alert-component
         v-show="isalertShow"
          :success="success"
           :message="message"
           @changeisaletShow="isalertShow=$event" >
       </app-alert-component>



         <div v-if="loggedInRole === 'ADMIN'">
           <AdminProjectHeader></AdminProjectHeader>
         </div>

          <h2 class="sub_heading story com-padding">UAT Issue</h2>



        <section class="content-header  remove-tab-shadow  nav-remove-content-padding">
            <el-tabs v-model="activeName" @tab-click="handleClick">
           <el-tab-pane label="Test Cases" name="TestCase">


             <section class="content content-padding-top test-content">
                   <div class="PMepicContainer">
                     <div class="row mangeEpic">
                       <div class="">
                         <div class="col-md-3 col-lg-2 text-center ">
                           <div class="row">
                           <div class="managePoQualityAssBlock ">
                             <!-- <button  class="btn btn-orange btn-lg pull-left"  data-toggle="modal" v-if="!isAdmin" @click="openTestScenarioModal"><i class="fa fa-plus-circle epic-btn-icon" aria-hidden="true"></i> Add Test Scenario</button> -->
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
                                   <div class="col-md-10">
                                      <p class="estValue">#{{clickedTestScenario.testScenarioIdentifier}}</p>
                                    </div>
                                   <div class="col-md-2 paddLeft_0 text-right">
                                       <!-- <span class="shift-right-li-epic editEpic" v-if="!isAdmin">
                                     <a type="button"  class="cursor-pointer "  ><span class="edit_Epic"><i class="fa fa-pencil" aria-hidden="true" ></i></span></a>
                                     <a type="button"  class="cursor-pointer "  ><span class="edit_Epic"><i class="fa fa-trash-o " aria-hidden="true" ></i></span></a>
                                </span> -->
                                   </div>
                               </div>
                               <div class="row">
                                    <div class="col-md-12"> <p style="margin: 0px;">{{clickedTestScenario.testScenarioDescription}}</p></div>
                                    <!-- <div class="col-md-12"> <p style="margin: 0px;">testScenarioDescription</p></div> -->

                               </div>
                               <div class="row">
                                    <div class="col-md-12">  <p class="estValue">Epic - {{clickedTestScenario.epicName}}</p></div>
                               </div>

                               <div class="row">
                                    <div class="col-md-12">  <p class="estValue">Story - {{clickedTestScenario.userStoryName}}</p></div>
                               </div>


                                   <!-- <p class="estValue">Created on: <span>{{convertUtcToLocaDateTime(clickedTestScenario.createdDateInMillis)}}</span></p> -->
                                   <p class="no-border-bottom">{{clickedTestScenario.description}}</p>


                                         </div>

                                      <!-- <appTestCases :projectLeadStatus="projectLeadStatus" :clickedTestScenario="clickedTestScenario" :testCasesList="testCasesList"></appTestCases> -->

                                            <div class="panel-group PM_epic_accordion" id="accordion" role="tablist" aria-multiselectable="true" >
                                            <div class="storyContent">

                                            <!--start of accrodian-->
                                            <div class="" v-for="(testCase,index) in testCasesList" style="margin-top: 5px;border: 1px solid #cac0c0;">

                                            <div class="edit_delete_details mht-50">
                                              <div class="col-md-12 col-lg-12">
                                                <div class="col-md-3 col-lg-2 col-sm-3">
                                                  <span class="storyName">#{{testCase.testCaseIdentifier}}</span>
                                             </div>
                                               <div class="col-md-7 col-lg-9 col-sm-6">
                                                <span class="storyName"><b>{{testCase.testCaseTitle}} </b></span>
                                                </div>
                                                 <!-- <div class="col-md-2 col-lg-1 col-sm-3 paddLeft-0" v-if="!isAdmin">
                                                <a type="button"  class="cursor-pointer "  @click="openEditTestCaseModal(testCase,index)"><span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-pencil"></i></span></a>

                                                <a type="button"  class="cursor-pointer pull-right "   @click="deleteTestCase(testCase,index)"><span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-trash-o"></i></span></a>
                                                </div> -->
                                                <div class="col-md-2 col-lg-1 col-sm-3 col-xs-3">
                                                  <a type="button"  class="cursor-pointer "  @click="viewTestCaseModal(testCase,index)"><span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-info-circle"></i></span></a>
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
             </section>




           </el-tab-pane >


           <el-tab-pane label="UAT issues" name="UATIssue" class="pagintion-margin-bottom">
                 <section class="content content-padding-top">
                <app-uat-issue :isDefectTabClicked="isDefectTabClicked"></app-uat-issue>
              </section>
        </el-tab-pane>

         </el-tabs>

         </section>

        <!-- Main content -->
         <div class="modal fade" id="viewTestcases" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <p class="modal-title estValue">Test Scenario #{{clickedTestScenario.testScenarioIdentifier}}</p>
                 <h4 class="modal-title" >{{testCase.testCaseTitle}}</h4>

            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">

                          <form id="epicForm" >

                              <div class="form-group epic" >
                                  <input type="text" class="form-control" name="testCaseTitle"  placeholder="Test Case Title"  v-model="testCase.testCaseTitle"  disabled></textarea>
                              </div>
                              <div class="form-group epic">
                                     <textarea class="form-control" name="testCaseData" placeholder="Inpu Criteria" v-model="testCase.testCaseData" disabled>{{testCase.testCaseData}}</textarea>
                              </div>
                              <div class="form-group epic" >
                                  <textarea class="form-control" name="testCaseSteps" placeholder="Steps" v-model="testCase.testCaseSteps"  disabled>{{testCase.testCaseSteps}}</textarea>
                              </div>
                              <div class="form-group epic">
                                  <textarea class="form-control" name="testCaseExpectedResult" placeholder="Expected Result" v-model="testCase.testCaseExpectedResult"  disabled>{{testCase.testCaseExpectedResult}}</textarea>
                              </div>


                               <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>

                          </form>
                    </div>
                </div>
            </div>
          </div>
        </div>
        </div>

    </div>
  </div>

</template>]

<script>

import adminHeader  from "../../adminHeader.vue"
import poSideBar from "../../poSideBar.vue"
import projectInfoHeader from "../../projectInfoHeader.vue";
import UATIssue from './UATIssue.vue';

import  AdminSidebar  from  "../../SupperAdminSideBar.vue";
import AlertComponent from  "../alert/Alert.vue";


export default{
  data(){
    return{
      isDefectTabClicked:false,
      activeName:'TestCase',
      isalertShow:false,
      message:'',
      success:false,
      testScenarioList: [],
      selected:0,
      testCasesList:[],
      testCase:{
        testCaseId:'',
        testCaseTitle:'',
        testCaseSteps:'',
        testCaseData:'',
        testCaseExpectedResult:'',
        testScenarioId:'',
      },
      clickedTestScenario: '',
      testCaseIndex:0,
        loggedInRole: this.$store.getters.getLoggedInUser.role
    }
  },
  created: function(){
    this.projectRequestId = this.$route.params.projectRequestId;
  },
  mounted:function(){
    this.getAllTestScenario();
  },
  components: {
    "app-adminHeader": adminHeader,
    "app-po-sidebar": poSideBar,
    "app-uat-issue":UATIssue,
    'AdminSidebar': AdminSidebar,
    "app-alert-component":AlertComponent,
    projectInfoHeader
  },
  computed: {
    isAdmin:function(){
      return  this.loggedInRole === 'ADMIN';
    }
  },
  methods:{
    isSelected(index){
      var app = this;
    return index === app.selected;
    },
    getAllTestCases: function(testCase,index){
      var app = this;
      app.selected = index;
      app.testCaseIndex = index;

    },
    viewTestCaseModal(testCase , index){
      var app = this;
      // app.testCase = {};
      app.testCase = testCase;
      app.testCaseIndex = index;
       $('#viewTestcases').modal('show');
    },
    handleClick(tab,event){
      if(tab.name =='TestCase'){
      this.getAllTestScenario();
        this.isDefectTabClicked = false;
      }else if(tab.name === 'UATIssue'){
        this.isDefectTabClicked = true;
      }

    },

    getAllTestScenario: function() {
        var app = this;
        app.$http.get(
            this.$store.state.SERVER_URL + '/api/product-owner/get-test-scenarios-in-project/' + app.$store.getters.getProjectInfo.projectId, {
                headers: {
                    "X-Authorization": app.$cookie.get('X-Authorization')
                },
            }
        ).then(function(response) {
            if (response.data.status === 'SUCCESS') {
                app.testScenarioList = response.data.payLoad;
                if (app.testScenarioList && app.testScenarioList.length > 0) {
                    app.getAllTestCases(app.testScenarioList[0], 0);
                }
            }
            console.log(response)
        });
    },
    getAllTestCases: function(testScenario, index) {
        var app = this;
        app.selected = index;
        app.testScenarioIndex = index

        app.clickedTestScenario = testScenario;
        console.log("test senosfsfds-");
        console.log(app.clickedTestScenario)
            // app.storyId = testScenario.userStoryId;
        app.$store.commit('setSpinner', true);
        app.$http.get(
            this.$store.state.SERVER_URL + '/api/product-owner/get-test-cases-by-test-scenario/' + testScenario.id, {
                headers: {
                    "X-Authorization": app.$cookie.get('X-Authorization')
                },
            }
        ).then(function(response) {
            app.$store.commit('setSpinner', false);
            app.testCasesList = response.data.payLoad;
        });
    },
    convertUtcToLocaDateTime(date) {
        var moment = require('moment-timezone');
        var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        //console.log("convertStringtoDate------------------------>"+timeZone)
        return moment(date).tz(timeZone).format('DD-MM-YYYY')
    },
  }
}

</script>
