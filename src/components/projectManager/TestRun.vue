<template>
  <div class="content content-padding-top">
    <div class="row">
    <div class="col-md-3 col-lg-2 text-center ">
      <div class="row">
      <div class="manageEpicBlock btn-ripple mgt-0">
        <!--<h2  class="sub_heading story" >Test Library</h2>-->
        <button class="btn btn-orange btn-lg pull-left"  data-toggle="modal" @click="openTestRunModal()"><i class="fa fa-plus-circle epic-btn-icon" aria-hidden="true"></i> Add Test Run</button>
        <br >
        <ul class="list-group epicAdd mangeEpic  epic-active">
          <li  :class="{ 'active' : isSelected(index) }" class="list-group-item" v-for="(runTest,index) in testRunList" v-on:click="getRunTest(runTest,index)">
             <div class="row">
                <div class="col-md-12 text-left" v-if="runTest!=null"><span class="epicName pull-left" >{{runTest.testExecutionRunTitle}}</span></div>
             </div>
         </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="col-md-9 col-lg-10 padding-left-zero">
    <div class="col-md-12">
      <div class="testRun" v-if="testRunList.length>0">

        <div class="row">
          <span v-if="isTestRunEmpty()">
          </span>
             <div class="col-md-4"> <p class="estValue" v-if="runTest!=null">#{{runTest.testExecutionRunIdentifier}}</p></div>
             <div class="col-md-8 paddLeft_0 text-right">
                 <span class="shift-right-li-epic editEpic text-right" v-if="!runTest.hasAnyTestCasesExecuted">
               <a type="button"  class="cursor-pointer " ><span class="edit_Epic"><i class="fa fa-pencil" aria-hidden="true" @click="editTestRun(runTest)"></i></span></a>
               <a type="button"  class="cursor-pointer " ><span class="edit_Epic"><i class="fa fa-trash-o " aria-hidden="true" @click="deleteTestRun(runTest)"></i></span></a>
               </span>
             </div>

         </div>
         <div class="row">
              <div class="col-md-12"> <p style="margin: 0px;" v-if="runTest!=null">{{runTest.testExecutionRunTitle}}</p></div>
         </div>
         <div class="row" v-if="runTest.testExecutionRunDescription">
              <div class="col-md-12"><p class="estValue" v-if="runTest!=null">{{runTest.testExecutionRunDescription}}</p></div>
         </div>
         <div class="row">
           <div class="col-md-12" style="margin-top:10px">
             <button class="btn btn-orange btn-lg pull-left"  data-toggle="modal" @click="openTestScenariosModal()" v-if="!runTest.hasAnyTestCasesExecuted"><i class="fa fa-plus-circle epic-btn-icon" aria-hidden="true" ></i>Test Cases</button>

           </div>
         </div>



         <div v-if="isShowRunTestCase">

   <div class="row">
     <div class="col-md-12">
       <div class="col-md-4 col-lg-4 col-xs-4 col-sm-4">
        <div class="execution_summary test-run-graph" v-if="testCaseCount>0">
          <fieldset>
             <legend>Execution Summary</legend>
             <div class="row">
               <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">

                 <div class="test-run-execute-button">
                       <span class="test-run-count-title"> Total Test Cases : {{testCaseCount}}</span>
                           <button class="btn btn-orange btn-lg pull-right" @click="getExecuteTestCases()"><i class="fa fa-play-circle-o epic-btn-icon" aria-hidden="true"></i>Execute Test Cases</button>
                   <!-- <a class="cursor-pointer pull-right" @click="getExecuteTestCases()"> <i class="fa fa-play-circle-o test-run-fa-play" aria-hidden="true"></i> Execute Test Cases</a> -->

               </div>
               <p></p>
                <span v-if="testCasesSummary!=''">
                  <pie-chart :data="testCasesSummary" width="200px" height="300px"></pie-chart>
                 </span>

            </div>
            </div>
         </fieldset>
        </div>
      </div>
      <div class="col-md-8 col-lg-8 col-xs-8 col-sm-8">
        <div class="defect_summary test-run-graph" v-if="defectCount>0">
          <fieldset>
             <legend>Defect Summary</legend>
             <div class="row">
               <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
                 <div class="col-md-6 col-lg-6 col-xs-6 col-sm-6">
                   <span v-if="defectsSummary!=null">
                      <p class="test-run-count-title"> Total Defects : {{defectCount}}</p>
                     <pie-chart :data="defectsSummary" width="200px" height="300px"></pie-chart>
                   </span>

              </div>
            <div class="col-md-6 col-lg-6 col-xs-6 col-sm-6">
              <div class="test-run-view-defect-details text-right">
                <button class="btn btn-orange btn-lg pull-right"   @click="getDefectDetails()"><i class="fa fa-bug epic-btn-icon" aria-hidden="true"></i>View Defects</button>

                   <!-- <a @click="getDefectDetails()" class="cursor-pointer"> <i class="fa fa-bug test-run-fa-play" aria-hidden="true"></i>View Defects</a> -->
              </div>
              <span v-if="data!=null">
            <column-chart :data="data"  height="300px"></column-chart>
          </span>

            </div>
            </div>
            </div>
         </fieldset>
        </div>
      </div>
      </div>
    </div>
      </div>

      <!-- Start logic of test run excecution -->
      <div class="test-run-execution" v-if="isShowTestRunExcecution">
        <h4 class="text-center test-run-heading">Execution Details</h4>
        <!-- <p class="text-center test-case-execution-heading">Execution Details </p> -->
      <test-run-execution
      :isShowRunTestCase="isShowRunTestCase"
      :isShowTestCases="isShowTestCases"
      :isShowTestRunExcecution="isShowTestRunExcecution"
      :isShowTestRunDefectDetails="isShowTestRunDefectDetails"
      :testExcutionList="testExcutionList"
      :runTest="runTest"
      :testCaseDetails="testCaseDetails"

      @changeisShowRunTestCase="isShowRunTestCase=$event"
      @changeisShowTestCases="isShowTestCases=$event"
      @changeisShowTestRunExcecution="isShowTestRunExcecution=$event"
      @changeisShowTestRunDefectDetails="isShowTestRunDefectDetails=$event"
      @changetestCaseDetails="testCaseDetails=$event"
      @changeIndex="testCaseIndex=$event"

      ></test-run-execution>


      </div>
        <!-- end logic of test run excecution -->

        <!-- Start logic of RunTestCases -->
        <div class="test-cases" v-if="isShowTestCases">
            <h4 class="text-center test-run-heading">Run Test Cases</h4>
            <!-- <p class="text-center test-case-execution-heading">Run Test Cases</p> -->
        <run-test-cases
        :testCaseDetails="testCaseDetails"
        :testCaseIndex="testCaseIndex"
        :testExcutionList="testExcutionList"
        :runTest="runTest"
          @changerunTest="runTest=$event"
        ></run-test-cases>
        </div>
          <!-- end logic of test RunTestCases -->

            <!-- Start logic of testRunDefectDetails -->
          <div class="testRunDefectDetails" v-if="isShowTestRunDefectDetails">
            <h4 class="text-center test-run-heading">Defect Details</h4>
              <!-- <p class="text-center test-case-execution-heading">Defect Details</p> -->
            <test-run-defect-details
            :testRunDefectList="testRunDefectList"></test-run-defect-details>
          </div>
            <!-- end logic of testRunDefectDetails -->


      </div>
    </div>
  </div>

</div>


 <!-- end of test run list -->

 <!-- modal of add test Run  -->


 <div class="modal fade" id="TestRunModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <div class="alert alert-danger error-color" v-if="isError">
          {{errorMessage}}
          </div>


          <h4 class="modal-title" v-if="testExecutionRunId!=null">Update Test Run</h4>
          <h4 class="modal-title"  v-else>Add Test Run</h4>
      </div>
      <div class="modal-body">
          <div class="row">
              <div class="col-md-12">
                    <form data-vv-scope="Test-run-scope">
                      <div class="form-group"isSelected  :class="{'input': true, 'is-danger': errors.has('Test-run-scope.testExecutionRunTitle') }">
                        <input class="form-control epicName" name="testExecutionRunTitle" v-model="testExecutionRunTitle"   type="text"  placeholder=" Test Run Title" v-validate:testExecutionRunTitle ="'required'">
                           <p class="text-danger" v-if="errors.has('Test-run-scope.testExecutionRunTitle')">Please specify  title</p>
                      </div>
                        <div class="form-group epic" >
                            <textarea class="form-control" name="testExecutionRunDescription" v-model="testExecutionRunDescription"  placeholder="Description"></textarea>
                        </div>
                         <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-orange" @click="saveTestRun()" :disabled="enableButton" v-if="testExecutionRunId!=null">UPDATE</button>
                        <button type="button" class="btn btn-orange" @click="saveTestRun()" :disabled="enableButton" v-else>ADD</button>
                    </form>
              </div>
          </div>
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="TestScenarios" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
 <div class="modal-dialog" role="document">
   <div class="modal-content">
     <div class="modal-header">
       <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
       <div class="alert alert-danger error-color" v-if="isError">
         {{errorMessage}}
         </div>
          <p class="p-margin" v-if="runTest!=null">#{{runTest.testExecutionRunIdentifier}}</p>
         <h5 class="modal-title"> Add Test Case</h5>
     </div>
     <div class="modal-body ">
         <div class="row">
           <div class="col-md-12">
             <div class="form-group">
             <!-- <select class="form-control" v-model="selectedEpic" name="selectedEpic"   @change="getStory(selectedEpic)" :class="{'select': true, 'is-danger': errors.has('selectedEpic')}" v-validate:selectedEpic="'required'">
               <option  value="">Select Epic</option>
               <option  v-for="epic in allEpicStorys"  :value="epic"> {{epic.epicName}}</option>
             </select> -->
             <v-select v-model="selectedEpic" label="epicName" name="selectedEpic" :options="allEpicStorys" placeholder="Please select Epic" :on-change="getStory" clearSearchOnSelect ></v-select>

             <p class="text-danger" v-if="errors.has('selectedEpic')">Please select Epic</p>
           </div>
           </div>

             <div class="col-md-12">
               <div class="test-senarious_modal_height">
                 <ul class="ul-list-style-none">
                   <li  v-for="(story,index) in storyList">
                     <p v-model="story.id">
                        <input   v-model="story.id" :value="story.id"  type="hidden">
                       <strong>{{story.name}}</strong></p>
                 <ul class="ul-list-style-none">

                   <li v-for="(testScenario,index) in story.testScenarios">
                       <input  name="testScenarioId" v-model="testScenarioId" :value="testScenario.id"  type="checkbox" @change="checkedAll(testScenario)">
                           <label  class="test_senarious_font-weight">{{testScenario.testScenarioIdentifier}}</label>
                         <ul class="ul-list-style-none">
                           <li v-for="(testCase,index) in testScenario.testCases">
                           <input  name="testCaseId"  v-model="testCaseId"  :value="testCase.testCaseId" type="checkbox">
                          <label for="checkbox-1" class="test_senarious_font-weight">{{testCase.testCaseTitle}}</label>
                          </li>
                         </ul>
                   </li>
                 </ul>
               </li>
             </ul>


            </div>
             </div>
         </div>
         <div class="modal-footer text-left test_senarious_footer">
           <button type="button" class="btn btn-gray pull_left" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-orange pull_left" :disabled="enableButton" @click="saveTestCase()">ADD</button>
        </div>
     </div>
   </div>
 </div>
</div>




</div>
</template>

<script>
import TestRunExecution from './TestRunExecutionDetails.vue';
import RunTestCases from './RunTestCases.vue';
import TestRunDefectDetails from './TestRunDefectDetails.vue';


export default{
  props: ['testRunList','allEpicStorys','message','isalertShow','success'],
  data(){
    return{
      enableButton:false,
      errorMessage:'',
      isError:false,
      data:[],
      selectedEpic:'',
      selectedStory:'',
      storyList:[],
      scenariosList:[],
      isShowRunTestCase:true,
      isShowTestCases:false,
      isShowTestRunExcecution:false,
      isShowTestRunDefectDetails:false,
      selected:0,

      testExecutionRunId:null,
      testExecutionRunTitle:'',
      testExecutionRunDescription:'',
      runTest:'',
      testCaseId:[],
      testScenarioId:[],
      testExcutionList:[],
      testCaseDetails:'',
      testCaseIndex:'',
      testRunDefectList:[],
      index:'',

      defectAssignedUsers:'',
      defectsSummary:null,
      testCasesSummary:null,
      testCaseCount:'',
      defectCount:0,
      isCallServer:true

    }
  },
  components: {
    'test-run-execution':TestRunExecution,
    'run-test-cases':RunTestCases,
    'test-run-defect-details':TestRunDefectDetails,


  },
  created: function(){

  },
  computed:{
    // getTestCaseCount: function(){
    //   if(this.testCasesSummary!=null){
    //     // console.log("---------get Test cases count----------------");
    //     console.log(this.testCasesSummary);
    //       return (this.testCasesSummary.Pass + this.testCasesSummary.Fail + this.testCasesSummary.NotRun);
    //
    //   }else{
    //     return 0;
    //   }
    //
    // }
  },
  methods:{

    isSelected(index){
      var app = this;
    return index === app.selected
    },
    openTestRunModal(){
      var app = this;
      app.testExecutionRunId=null;
      app.testExecutionRunTitle="";
      app.testExecutionRunDescription="";

      setTimeout(function() {
        app.errors.clear('Test-run-scope');
      }, 100)

      $('#TestRunModal').modal('show');
    },
    openTestScenariosModal(){
      var app = this;

      app.testCaseId = [];
      app.testScenarioId =[];
      app.selectedEpic='';
      app.storyList=[];
     app.$http.get(
         app.$store.state.SERVER_URL +'/api/dev-pm-admin/get-test-case-id-list-for-test-run/'+app.runTest.testExecutionRunId,
          {
             headers: {
                 "X-Authorization": app.$cookie.get('X-Authorization')
             },
         }
     ).then(function(response) {


         if(response.data.status=='SUCCESS'){
        if(response.data.payLoad.epic!=null && response.data.payLoad.epic!=''){
          app.selectedEpic =  response.data.payLoad.epic;
          app.isCallServer=false;
        }

      if(response.data.payLoad.userStorys!=null && response.data.payLoad.userStorys.length>0){
          app.storyList = response.data.payLoad.userStorys;
      }

  if(response.data.payLoad.testCasesIdList!=null && response.data.payLoad.testCasesIdList.length>0){
           app.testCaseId = response.data.payLoad.testCasesIdList;
         }
           if(response.data.payLoad.testScenariosIdList!=null && response.data.payLoad.testScenariosIdList.length>0){
           app.testScenarioId = response.data.payLoad.testScenariosIdList;
         }
                   $('#TestScenarios').modal('show');
                console.log("---------scenarios--------id-----");
                console.log(app.selectedEpic);

         }

        //console.log(app.testCasesList);
     });
      $('#TestScenarios').modal('show');

    },
    getExecuteTestCases: function(){
      var app = this;
      app.$store.commit('setSpinner',true);
     app.$http.get(
         app.$store.state.SERVER_URL +'/api/dev-pm-admin/get-testCase-and-testCaseExecution-details-for-testRun/'+app.runTest.testExecutionRunId,
          {
             headers: {
                 "X-Authorization": app.$cookie.get('X-Authorization')
             },
         }
     ).then(function(response) {
       app.$store.commit('setSpinner',false);
         if(response.data.status=='SUCCESS'){

           app.isShowRunTestCase=false;
           app.isShowTestCases=false;
           app.isShowTestRunExcecution=true;
           app.isShowTestRunDefectDetails=false;
           app.testExcutionList= response.data.payLoad;

         }

        //console.log(app.testCasesList);
     });


    //  var app = this;
      console.log("------------------------------exceution details-----------------");
    },
    getDefectDetails: function(){
      var app = this;
     app.$http.get(
         app.$store.state.SERVER_URL +'/api/dev-pm-admin/get-defects-in-test-execution-run/'+app.runTest.testExecutionRunId,
          {
             headers: {
                 "X-Authorization": app.$cookie.get('X-Authorization')
             },
         }
     ).then(function(response) {
         if(response.data.status=='SUCCESS'){

           app.testRunDefectList= response.data.payLoad;
           app.isShowRunTestCase=false;
           app.isShowTestCases=false;
           app.isShowTestRunExcecution=false;
           app.isShowTestRunDefectDetails=true;

         }
        //console.log(app.testCasesList);
     });




    },
    editTestRun: function(testRun){

        // this.runTest= testRun;
        console.log(testRun);
        this.testExecutionRunId = testRun.testExecutionRunId;
        this.testExecutionRunTitle=testRun.testExecutionRunTitle;
        this.testExecutionRunDescription= testRun.testExecutionRunDescription;
        $('#TestRunModal').modal('show');


    },
    deleteTestRun : function(testRun){

      console.log(testRun);
     var app = this;


     app.$swal({
     title: 'Are you sure?',
     text: "You want to delete the Test Run. ",
     type: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes'
     }).then(function () {
              var testRunDetele={};
              testRunDetele.testExecutionRunId = testRun.testExecutionRunId;
              app.$http.post(app.$store.state.SERVER_URL+'/api/dev-pm-admin/delete-test-execution-run',testRunDetele,
             {
                  headers: {
                         "X-Authorization": app.$cookie.get('X-Authorization')
                     },
           }).then((response) => {
                     if(response.data.status=='SUCCESS'){
                       app.runTest='';
                        app.testRunList.splice(app.index,1);
                         app.runTest=app.testRunList[0];
                         app.selected=0;
                         app.getRunTest(app.runTest,app.selected);
                          $('#TestRunModal').modal('hide');
                          app.$emit("changeSuccess",true);
                            app.$emit("changeMessage","successfullly deleted TestRun ");
                          app.$emit("changeIsalertShow",true);
                          setTimeout(function () {
                             app.$emit("changeIsalertShow",false);
                        }, 3000)

                     }else{

                       app.$emit("changeSuccess",false);
                         app.$emit("changeMessage",response.data.errorMessage);
                       app.$emit("changeIsalertShow",true);

                           setTimeout(function () {
                              app.$emit("changeIsalertShow",false);
                         }, 3000)
                     }

         }, (response) => {

           console.log(response);
           app.$emit("changeSuccess",false);
             app.$emit("changeMessage","Some thing went wrong");
           app.$emit("changeIsalertShow",true);

               setTimeout(function () {
                  app.$emit("changeIsalertShow",false);
             }, 3000)

        });

      });



    },
    getRunTest:function(runTest,index){
      var app=this;
      app.selected=index;
      app.runTest= runTest;
      app.isShowRunTestCase=true;
      app.isShowTestCases=false;
      app.isShowTestRunExcecution=false;
      app.isShowTestRunDefectDetails=false;
      app.index= index;
      app.defectCount=0;
      app.testCaseCount=0;


      app.defectsSummary = null;
      app.testCasesSummary = null;
       app.data=[];
       app.$store.commit('setSpinner',true);

      app.$http.get(
          this.$store.state.SERVER_URL+'/api/dev-pm-admin/get-execution-summary-for-test-run/'+runTest.testExecutionRunId,
           {
              headers: {
                  "X-Authorization": app.$cookie.get('X-Authorization')
              },
          }
      ).then(function(response) {
        console.log(response.data.payLoad);
        app.$store.commit('setSpinner',false);
        if(response.data.status=='SUCCESS'){
          app.defectAssignedUsers = response.data.payLoad.defectAssignedUsers;

         if(response.data.payLoad.defectsSummary!=null || response.data.payLoad.testCasesSummary!=null){


          var defectSum ={};
          defectSum.Open = response.data.payLoad.defectsSummary.percentageOfOpenDefects;
            defectSum.Closed = response.data.payLoad.defectsSummary.percentageOfClosedDefects;
              defectSum.Fixed = response.data.payLoad.defectsSummary.percentageOfFixedDefects;
                defectSum.ReOpen = response.data.payLoad.defectsSummary.percentageOfReOpenDefects;
                app.defectsSummary = defectSum;
                app.defectCount= response.data.payLoad.defectsSummary.closedDefectsCount+response.data.payLoad.defectsSummary.fixedDefectsCount+response.data.payLoad.defectsSummary.openDefectsCount+response.data.payLoad.defectsSummary.reOpenDefectsCount;
          app.testCaseCount= response.data.payLoad.testCasesSummary.testCasesFailedCount+response.data.payLoad.testCasesSummary.testCasesPassedCount+response.data.payLoad.testCasesSummary.testCasesNotExecutedCount
          var testCaseSum ={};
      testCaseSum.Pass = response.data.payLoad.testCasesSummary.testCasesPassedCountPercentage;
      testCaseSum.Fail = response.data.payLoad.testCasesSummary.testCasesFailedCountPercentage;
      testCaseSum.NotRun = response.data.payLoad.testCasesSummary.testCasesNotExecutedCountPercentage;
      app.testCasesSummary = testCaseSum;


    var  array=[];
     var obj1={};
     var obj2={};
     var data1=[];
    var  data2=[];
      console.log("users----------------------");
      if(response.data.payLoad.defectAssignedUsers.length>0){
    console.log(response.data.payLoad.defectAssignedUsers.length>0);
     for (var appUser of response.data.payLoad.defectAssignedUsers) {

         var appU1 = []
         appU1.push(appUser.appUserFullName, appUser.assignedDefectsCount);
         data1.push(appU1)
         var appU2 = []
         appU2.push(appUser.appUserFullName, appUser.openOrReopenDefectsCount);
         data2.push(appU2)
     }

     obj1.name = "Assigned"
     obj1.data = data1;
     obj2.name = "Open/Reopen"
     obj2.data = data2;
     array.push(obj1, obj2);

     app.data = array;
   }

 }else{
     app.testCaseCount=0;
 }

console.log("-------------app data--------------------");
     console.log(app.data);



        }



      });

      console.log("----------get test run-----------------------");

    },

    isTestRunEmpty(){
      // first time get the run test data in test run list to show in selected



        if(this.runTest==null || this.runTest==''){
        this.runTest=this.testRunList[0];

     var app = this;
        // app.defectsSummary = '';
        // app.testCasesSummary = '';
        // app.data=[];


        if(app.runTest!= null && app.runTest!='' && app.runTest.testExecutionRunId!=null){

              app.$http.get(
                  this.$store.state.SERVER_URL+'/api/dev-pm-admin/get-execution-summary-for-test-run/'+app.runTest.testExecutionRunId,
                   {
                      headers: {
                          "X-Authorization": app.$cookie.get('X-Authorization')
                      },
                  }
              ).then(function(response) {
                console.log(response.data.payLoad);
                if(response.data.status=='SUCCESS'){
                  app.defectAssignedUsers = response.data.payLoad.defectAssignedUsers;

                   if(response.data.payLoad.defectsSummary!=null || response.data.payLoad.testCasesSummary!=null){
                     app.defectCount= response.data.payLoad.defectsSummary.closedDefectsCount+response.data.payLoad.defectsSummary.fixedDefectsCount+response.data.payLoad.defectsSummary.openDefectsCount+response.data.payLoad.defectsSummary.reOpenDefectsCount;
                     app.testCaseCount= response.data.payLoad.testCasesSummary.testCasesFailedCount+response.data.payLoad.testCasesSummary.testCasesPassedCount+response.data.payLoad.testCasesSummary.testCasesNotExecutedCount;
                  var defectSum ={};
                  defectSum.Open = response.data.payLoad.defectsSummary.percentageOfOpenDefects;
                  defectSum.Closed = response.data.payLoad.defectsSummary.percentageOfClosedDefects;
                  defectSum.Fixed = response.data.payLoad.defectsSummary.percentageOfFixedDefects;
                  defectSum.ReOpen = response.data.payLoad.defectsSummary.percentageOfReOpenDefects;
                  app.defectsSummary = defectSum;

                  var testCaseSum ={};
              testCaseSum.Pass = response.data.payLoad.testCasesSummary.testCasesPassedCountPercentage;
              testCaseSum.Fail = response.data.payLoad.testCasesSummary.testCasesFailedCountPercentage;
              testCaseSum.NotRun = response.data.payLoad.testCasesSummary.testCasesNotExecutedCountPercentage;
              app.testCasesSummary = testCaseSum;


            var  array=[];
             var obj1={};
             var obj2={};
             var data1=[];
            var  data2=[];
             for (var appUser of response.data.payLoad.defectAssignedUsers) {
               //  console.log(appUser.appUserFullName + "---" + appUser.assignedAndWIPHours)
                 var appU1 = []
                 appU1.push(appUser.appUserFullName, appUser.assignedDefectsCount);
                 data1.push(appU1)
                 var appU2 = []
                 appU2.push(appUser.appUserFullName, appUser.openOrReopenDefectsCount);
                 data2.push(appU2)
             }

             obj1.name = "Assigned"
             obj1.data = data1;
             obj2.name = "Open/Reopen"
             obj2.data = data2;
             array.push(obj1, obj2);

             app.data = array;



           }else{
               app.testCaseCount=0;
               app.defectCount=0;
           }

}

              });


            }






        }

      },
    saveTestRun: function(){
      // /api/dev-pm-admin/save-test-execution-run
      var app = this;
      app.$validator.validateAll('Test-run-scope');
      if (!app.errors.any()) {
      var testRun={};
      testRun.testExecutionRunTitle = app.testExecutionRunTitle;
      testRun.testExecutionRunDescription = app.testExecutionRunDescription;
      if(app.$store.getters.getLoggedInUser.role=='DEVELOPER'){
        console.log(app.$store.getters.getDevProjectInfo);
        testRun.projectId = app.$store.getters.getDevProjectInfo.projectId;
      }else{
        testRun.projectId = app.$store.getters.getProjectInfo.projectId;
      }

      testRun.testExecutionRunId = app.testExecutionRunId;
      app.enableButton=true;
      app.$store.commit('setSpinner',true);

      app.$http.post(app.$store.state.SERVER_URL+'/api/dev-pm-admin/save-test-execution-run',testRun,
     {
          headers: {
                 "X-Authorization": app.$cookie.get('X-Authorization')
             },
   }).then((response) => {
              app.enableButton=false;
              app.$store.commit('setSpinner',false);
             if(response.data.status=='SUCCESS'){
               if(  app.testExecutionRunId!=null){
                 app.testRunList.splice(this.index,1,response.data.payLoad);
                 app.runTest=response.data.payLoad;

               }else{
                 app.testRunList.unshift(response.data.payLoad);
                   app.runTest=response.data.payLoad;
                  var index  =  app.testRunList.indexOf(app.runTest);
                   app.selected=index;
                   var defectSum ={};
                   defectSum.Open = 0;
                    defectSum.Closed = 0;
                    defectSum.Fixed = 0;
                    defectSum.ReOpen =0;
                   app.testCasesSummary = defectSum;
                   app.testCaseId = [];
                   app.testScenarioId =[];
                    app.testCaseCount=0;
                    app.defectCount=0;
               }




                  $('#TestRunModal').modal('hide');

             }else{
                app.enableButton=false;
               app.errorMessage = response.data.errorMessage;
               app.isError=true;
               setTimeout(function () {
               app.isError=false;
             }, 3000)


             }

 }, (response) => {
   app.enableButton=false;
   app.errorMessage ="Something went wrong!";
   app.isError=true;
   setTimeout(function () {
   app.isError=false;
 }, 3000)

});
}
    },
    saveTestCase: function(){
      //
      var app = this;
       var testRun={};
          console.log(app.testCaseId);
       testRun.testExecutionRunId= app.runTest.testExecutionRunId;
       testRun.testCasesIdList= app.testCaseId;

       console.log('------------testCaseIdList------');
       app.enableButton=true;
         app.$store.commit('setSpinner',true);
      app.$http.post(app.$store.state.SERVER_URL+'/api/dev-pm-admin/add-test-cases-to-test-execution-run',testRun,
     {
          headers: {
                 "X-Authorization": app.$cookie.get('X-Authorization')
             },
   }).then((response) => {
     app.enableButton=false;
       app.$store.commit('setSpinner',false);
             if(response.data.status=='SUCCESS'){
              // app.testRunList.unshift(response.data.payLoad);


              if(response.data.payLoad.defectsSummary!=null || response.data.payLoad.testCasesSummary!=null){
                app.defectCount= response.data.payLoad.defectsSummary.closedDefectsCount+response.data.payLoad.defectsSummary.fixedDefectsCount+response.data.payLoad.defectsSummary.openDefectsCount+response.data.payLoad.defectsSummary.reOpenDefectsCount;
                app.testCaseCount= response.data.payLoad.testCasesSummary.testCasesFailedCount+response.data.payLoad.testCasesSummary.testCasesPassedCount+response.data.payLoad.testCasesSummary.testCasesNotExecutedCount;
             var defectSum ={};
             defectSum.Open = response.data.payLoad.defectsSummary.percentageOfOpenDefects;
             defectSum.Closed = response.data.payLoad.defectsSummary.percentageOfClosedDefects;
             defectSum.Fixed = response.data.payLoad.defectsSummary.percentageOfFixedDefects;
             defectSum.ReOpen = response.data.payLoad.defectsSummary.percentageOfReOpenDefects;
             app.defectsSummary = defectSum;

             var testCaseSum ={};
         testCaseSum.Pass = response.data.payLoad.testCasesSummary.testCasesPassedCountPercentage;
         testCaseSum.Fail = response.data.payLoad.testCasesSummary.testCasesFailedCountPercentage;
         testCaseSum.NotRun = response.data.payLoad.testCasesSummary.testCasesNotExecutedCountPercentage;
         app.testCasesSummary = testCaseSum;


       var  array=[];
        var obj1={};
        var obj2={};
        var data1=[];
       var  data2=[];
        for (var appUser of response.data.payLoad.defectAssignedUsers) {
          //  console.log(appUser.appUserFullName + "---" + appUser.assignedAndWIPHours)
            var appU1 = []
            appU1.push(appUser.appUserFullName, appUser.assignedDefectsCount);
            data1.push(appU1)
            var appU2 = []
            appU2.push(appUser.appUserFullName, appUser.openOrReopenDefectsCount);
            data2.push(appU2)
        }

        obj1.name = "Assigned"
        obj1.data = data1;
        obj2.name = "Open/Reopen"
        obj2.data = data2;
        array.push(obj1, obj2);

        app.data = array;



      }else{
          app.testCaseCount=0;
          app.defectCount=0;
      }


                  $('#TestScenarios').modal('hide');

             }else{
               app.enableButton=false;
               app.errorMessage = response.data.errorMessage;
               app.isError=true;
               setTimeout(function () {
               app.isError=false;
             }, 3000)
             }

 }, (response) => {
    app.enableButton=false;
   app.errorMessage ="Something went wrong!";
   app.isError=true;
   setTimeout(function () {
   app.isError=false;
 }, 3000)



});
    },

    getStory: function(selectedEpic){
      console.log(selectedEpic);

      var app = this;
      if(selectedEpic!=null && selectedEpic!=''){

        if(app.isCallServer){

          console.log("------call the get story--------------");
        app.testScenarioId=[];
        app.testCaseId=[];
        app.$store.commit('setSpinner',true);
      app.$http.get(
          this.$store.state.SERVER_URL+'/api/dev-pm-admin/get-storys-testScenarios-and-testCases-in-epic/'+selectedEpic.id,
           {
              headers: {
                  "X-Authorization": app.$cookie.get('X-Authorization')
              },
          }
      ).then(function(response) {
          app.$store.commit('setSpinner',false);
        console.log(response.data.payLoad);
        if(response.data.status=='SUCCESS'){
          app.storyList = response.data.payLoad;
          app.selectedStory='';
          console.log("----------story are-----------");
          console.log(app.storyList);
        }

      });
    }else{
      app.isCallServer=true;
    }
          }


    },
    checkedAll: function(testScenario){
      console.log(this.testScenarioId);
     var testScenarioId =this.testScenarioId.indexOf(testScenario.id);
       if(testScenarioId== -1){

            for(var i =0; i< testScenario.testCases.length;i++){
                var index = this.testCaseId.indexOf(testScenario.testCases[i].testCaseId);
                if(index>=0){
                  this.testCaseId.splice(index,1);
                }

         }
       }else{
         for(var i =0; i< testScenario.testCases.length;i++){
           this.testCaseId.push(testScenario.testCases[i].testCaseId);
         }
       }

    }

  }
}

</script>
<style scoped>

</style>
