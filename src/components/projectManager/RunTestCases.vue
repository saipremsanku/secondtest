<template>
<div>




  <section class="testRunCasesSection">

    <div class="testCaseHeading">

    </div>
    <div class="TestRunCaseBody">
      <div class="row">
        <!-- <p>{{childtestCaseDetails}}</p> -->

        <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 border-test-run-cases">

          <p class="heading-test-run">#{{childtestCaseDetails.testCaseIdentifier}}

            <span class="pull-right badge badge-cst bg-gray" v-if="childtestCaseDetails.testCaseExecutionResultType==null">Not Run</span>
            <span class="pull-right badge badge-cst bg-green" v-else-if="childtestCaseDetails.testCaseExecutionResultType=='PASS'">{{childtestCaseDetails.testCaseExecutionResultType}}</span>
            <span class="pull-right badge badge-cst bg-danger" v-else>{{childtestCaseDetails.testCaseExecutionResultType}}</span>
            <span class="pull-right run-test-case-time" v-if="childtestCaseDetails.testCaseExecutionDateInMillis">{{getTime(childtestCaseDetails.testCaseExecutionDateInMillis)}}</span>
            <div class="run-test-cases-heading-border">
              <div class="run-test-cases-padding">
                <p class="test-cases-title">Epic</p>
                <p class="test-run-margin-zero">{{childtestCaseDetails.epicName}}</p>
                <p class="test-cases-title">Story</p>
                <p class="test-run-margin-zero">{{childtestCaseDetails.userStoryName}}</p>
                <p class="test-cases-title">Test Scenario</p>
                <p class="test-run-margin-zero">{{childtestCaseDetails.testScenarioDescription}}</p>
          </p>
          </div>
          </div>
          <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 border-right-test-run-cases">
            <div class="row form-group">
              <div class="col-md-3 col-lg-3 col-sm-3 col-xs-3">
                <label>Title</label>
              </div>
              <div class="col-md-9 col-lg-9 col-sm-9 col-xs-9 run-test-cases">
                  <textarea class="form-control message-text-area" rows="2" autofocus autocomplete="off" v-model="childtestCaseDetails.testCaseTitle" readonly></textarea>
                <!-- <input class="form-control"  readonly> -->
              </div>
            </div>
            <div class="row form-group">
              <div class="col-md-3 col-lg-3 col-sm-3 col-xs-3">
                <label>Input Criteria</label>
              </div>
              <div class="col-md-9 col-lg-9 col-sm-9 col-xs-9 run-test-cases">
                <textarea class="form-control message-text-area" rows="4" autofocus autocomplete="off" v-model="childtestCaseDetails.testCaseData" readonly></textarea>

              </div>
            </div>
            <div class="row form-group">
              <div class="col-md-3 col-lg-3 col-sm-3 col-xs-3">
                <label>Test Steps</label>
              </div>
              <div class="col-md-9 col-lg-9 col-sm-9 col-xs-9 run-test-cases">
                <textarea class="form-control message-text-area" rows="4" autofocus autocomplete="off" v-model="childtestCaseDetails.testCaseSteps" readonly></textarea>
              </div>
            </div>
            <div class="row form-group">
              <div class="col-md-3 col-lg-3 col-sm-3 col-xs-3">
                <label>Expected Result</label>
              </div>
              <div class="col-md-9 col-lg-9 col-sm-9 col-xs-9 run-test-cases">
                <textarea class="form-control message-text-area" rows="4" autofocus autocomplete="off" v-model="childtestCaseDetails.testCaseExpectedResult" readonly></textarea>
              </div>
            </div>

          </div>
          <form data-vv-scope="comment-scope">
          <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6">
            <div class="row">
              <h5 class="text-center">Execution Details</h5>

              <div class="col-md-3 col-lg-3 col-sm-3 col-xs-3">
                <label>Comment</label>
              </div>


              <div class="col-md-9 col-lg-9 col-sm-9 col-xs-9" v-if="childtestCaseDetails.testCaseExecutionResultType==null">
                <div class="form-group" :class="{'input': true, 'is-danger': errors.has('comment-scope.actualResult') }">
                  <textarea class="form-control message-text-area" rows="6" autofocus autocomplete="off" name="actualResult" v-model="childtestCaseDetails.actualResult"  v-validate data-vv-rules="required"></textarea>
                </div>
                <p class="text-danger" v-if="errors.has('comment-scope.actualResult')">Please enter comment</p>

              </div>

              <div class="col-md-9 col-lg-9 col-sm-9 col-xs-9" v-else>
                <div class="form-group">
                  <textarea class="form-control message-text-area" rows="6" autofocus autocomplete="off" name="actualResult" v-model="childtestCaseDetails.actualResult" readonly></textarea>
                </div>
              </div>

            </div>

            <div class="row run-test-case-margin-top">
              <div class="col-md-3 col-lg-3 col-sm-3 col-xs-3">
                <label>Defects</label>
              </div>
              <div class="col-md-9 col-lg-9 col-sm-9 col-xs-9">
                <div class="row" v-for="defect in childtestCaseDetails.defects">
                  <div class="col-md-3 col-lg-3 col-sm-4 col-xs-4">
                    <a @click="getDefectDetails(defect.defectId)">{{defect.defectIdentifier}}</a>
                  </div>
                  <div class="col-md-3 col-lg-3 col-sm-3 col-xs-3">
                    <p class="badge badge-cst bg-orange" v-if="defect.defectStatus=='OPEN'">Open</p>
                    <p class="badge badge-cst bg-green" v-if="defect.defectStatus=='CLOSED'">Closed</p>
                    <p class="badge badge-cst bg-blue" v-if="defect.defectStatus=='REOPENED'">Reopen</p>
                    <p class="badge badge-cst yellow-color" v-if="defect.defectStatus=='FIXED_IN_CODE'">Fixed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
                  </form>
        </div>
         <!-- <p>{{childtestCaseDetails}}</p> -->
        <!-- <p>{{childtestExcutionList}}</p>  -->
        <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 border-test-run-cases text-center test-run-cases-padding-footer remover-footer-border-top-test-run-cases">
          <div clss="test-run-button text-center">
            <button class="btn btn-blue btn-common-test" @click="backButton()" :disabled="isbackDisable" >&laquo; Back</button>

            <span v-if="childtestCaseDetails.testCaseExecutionResultType==null">
            <button class="btn btn-green btn-common-test test-run-cases-button-margin" @click="executionTestCasePass()">Pass</button>
            <button class="btn btn-danger btn-common-test test-run-cases-button-margin" @click="executionTestCaseFail()">Fail</button>
          </span>
            <button class="btn btn-blue btn-common-test" @click="nextButton()" :disabled="isNextDisable">Next &raquo;</button>
          </div>

        </div>
      </div>
    </div>
  </section>



  <!--   Defects modal -->

  <div class="modal fade" id="DefectModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

          <div class="alert alert-danger error-color" v-if="isError">
            {{errorMessage}}
            </div>
          <h4 class="modal-title">Link/Create Defect</h4> Link existing or create new defects, a test case can be linked to more than 1 defect.
        </div>
        <div class="modal-body ">


          <div class="row">
            <div class="col-md-12">
              <div class='form-group paddx15'>

                    <v-select v-model="defect" label="defectIdentifierWithTitle"  :options="defectList" placeholder="Please select Defect" :on-change="consoleCallback" :clearSearchOnSelect="isclear"></v-select>
                <!-- <el-select v-model="defect" clearable placeholder="Search existing defect with defect#" filterable @change="onChangedDefectList(defect)" class="custom-width">
                  <el-option v-for="defect in defectList" :key="defect.defectId" :label="defect.defectIdentifier" :value="defect">
                  </el-option>
                </el-select> -->
                <div class="text-center">
                  <span class="text-center">Or</span>
                </div>

              </div>
            </div>




            <div class="row">
              <div class="col-md-12 text-center">
                <button type="button" class="btn btn-orange" @click="showDefectModal()">Create New Defect</button>
              </div>
            </div>
            <div class="col-md-12" v-if="isShowCreateDefect">
              <div class="panel panel-default">
                <div class="panel-heading text-center">Create New Defect</div>
                <div class="panel-body">
                  <form >
                    <div class='form-group paddx15'>
                      <select class="form-control" v-model="createNewDefect.defectSeverity" name="defectSeverity" :class="{'select': true, 'is-danger': errors.has('defectSeverity')}" v-validate data-vv-rules="required">
                          <option  v-for="severity in severityList" :value="severity.key">{{severity.value}}</option>
                      </select>
                      <p class="text-danger" v-if="errors.has('defectSeverity')">Please Select Severity </p>
                    </div>

                    <div class="form-group paddx15" :class="{'input': true, 'is-danger': errors.has('defectTitle') }">
                      <input type='text' class="form-control" placeholder="Defect Title" name="defectTitle" v-model="createNewDefect.defectTitle" v-validate:defectTitle ="'required'">
                      <span v-if="createNewDefect.defectTitle==''">
                      <p class="text-danger" v-if="showError">Please enter defect title </p>
                    </span>
                    </div>
                    <div class="form-group paddx15">
                      <textarea class="form-control" placeholder="Defect Description" rows="5" name="defectDescription" v-model="createNewDefect.defectDescription"></textarea>
                    </div>
                    <div class='form-group paddx15'>
                      <select class="form-control" v-model="createNewDefect.appUserId">
                       <option value="" selected >Please Select Assignee</option>
                        <option  v-for=" appUser in appUserList" :value="appUser.appUserId">{{appUser.appUserFullName}}</option>
                     </select>
                    </div>

                    <div class="col-md-12 btn-ripple text-center">

                      <button type="button" class="btn btn-orange" @click="raiseDefect">ADD</button>

                    </div>
                  </form>

                </div>
              </div>
            </div>



            <div class="col-md-12 paddx15" v-if="addedDefectList.length>0">
              <table class="table table-hover platform-table-color price-table">
                <tbody>

                  <tr>
                    <th>Defect#</th>
                    <th>Title</th>

                    <th>Status</th>
                    <th>Remove</th>
                  </tr>
                  <tr class="text-center" v-for="(defect,index) in addedDefectList">
                    <td>{{defect.defectIdentifier}}</td>
                    <td>{{defect.defectTitle}}</td>

                    <td>

                      <p class="badge badge-cst bg-orange" v-if="defect.defectStatus=='OPEN'">Open</p>
                      <p class="badge badge-cst bg-green" v-if="defect.defectStatus=='CLOSED'">Closed</p>
                      <p class="badge badge-cst bg-blue" v-if="defect.defectStatus=='REOPENED'">Reopen</p>
                      <p class="badge badge-cst yellow-color" v-if="defect.defectStatus=='FIXED_IN_CODE'">Fixed</p>
                    </td>
                    <td> <i class="fa fa-times admin_unassign" aria-hidden="true" @click="removeDefect(defect,index)"></i></td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          <div class="row">
            <div class="col-md-12">
              <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-orange" :disabled="enableButton" @click="linkDefect()">Save & Close</button>
            </div>
          </div>

          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- show defects details -->





      <div class="modal fade" id="showDefectModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
         <div class="modal-dialog" role="document">
            <div class="modal-content">
               <div class="modal-header bg-grey no-border">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title"  >Defect details</h4>

               </div>
               <div class="modal-body padd0">
                 <ul class="nav nav-tabs nav-justified add-task-tabs" id="myTab">
                  <li class="active"><a data-target="#details" data-toggle="tab">Details</a></li>


                </ul>
                <div class="tab-content">
                  <div class="tab-pane active bg-light-gray" id="details">
                    <br><br>
                  <div class="row" v-if="detectDetails!=''">
                     <div class="col-md-12">
                          <div class='form-group paddx15'>
                            <select class="form-control" v-model="detectDetails.epic.epicName" name="selectedEpic" readonly>

                                <option   :value="detectDetails.epic.epicName">{{detectDetails.epic.epicName}}</option>
                            </select>

                          </div>

                          <div class='form-group paddx15'>
                            <select class="form-control" v-model="detectDetails.defectSeverity" name="selectedSeverity" readonly>

                                <option   :value="detectDetails.defectSeverity">{{detectDetails.defectSeverity}}</option>
                            </select>

                          </div>

                           <div class="form-group paddx15" >
                            <input type='text' class="form-control" placeholder="Defect Title" name="defectTitle" v-model="detectDetails.defectTitle" readonly>

                           </div>
                           <div class="form-group paddx15">
                            <textarea class="form-control" placeholder="Defect Description" rows="5"  name="defectDescription" v-model="detectDetails.defectDescription" readonly></textarea>
                           </div>

                           <div class='form-group paddx15'>
                             <select class="form-control" v-model="detectDetails.userStory.name" name="storyTestCase" readonly>

                               <option  :value="detectDetails.userStory.name">{{detectDetails.userStory.name}}</option>
                             </select>
                           </div>
                           <div class='form-group paddx15'>
                           <select class="form-control" v-model="detectDetails.testCase.testCaseTitle" readonly>


                              <option   :value="detectDetails.testCase.testCaseTitle">{{detectDetails.testCase.testCaseTitle}}</option>

                           </select>
                           </div>

                           <div class='form-group paddx15'>
                           <select class="form-control" v-model="detectDetails.defectStatus" readonly>
                              <option   :value="detectDetails.defectStatus">{{detectDetails.defectStatus}}</option>

                           </select>
                           </div>

                           <div class='form-group paddx15'>
                           <select class="form-control" v-model="detectDetails.defectOpenedBy" readonly>
                              <option  :value="detectDetails.defectOpenedBy">{{detectDetails.defectOpenedBy}}</option>

                           </select>
                           </div>
<!--
                           <div class="col-md-12">
                             <div class="row">
                              <div class="col-md-2">
                                  <div class="uploadFile">
                                  <input type="file" multiple :name="file" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                                   accept="image/*" class="input-file">
                                   </div>
                              </div>
                                 <p class="text-danger" v-if="isFileLarge">File size exceed max. allowed limit of 5MB</p>
                               <div class="col-md-10">
                                   <div class="row">
                                       <div class="file_upload"  >
                                           <div class="file_heigh_width">
                                               <span class="fileUploadCss" v-for="(file,index) in defectFiles"><p>{{file.fileName}}</p> <a :href="url+file.fileDocumentId" :download="file.fileName"><i class="fa fa-download download_file" aria-hidden="true"></i></a ><i class="fa fa-times" aria-hidden="true" @click="deleteFile(file.fileDocumentId,index)"></i></span>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                             </div>
                           </div> -->
                           <div class="col-md-12 btn-ripple">
                              <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                              <!-- <button type="button" class="btn btn-orange" :disabled="enableButton" @click="raiseDefect" v-if="defectId==null">ADD</button>
                              <button type="button" class="btn btn-orange" :disabled="enableButton" @click="raiseDefect" v-else>Update</button> -->
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
export default {
  props: ['testCaseDetails', 'runTest', 'testCaseIndex', 'testExcutionList'],
  data() {
    return {
      isclear:true,
      isError:false,
      enableButton:false,
      errorMessage:'',
      childtestCaseDetails:this.testCaseDetails,
      childtestExcutionList:this.testExcutionList,
      childtestCaseIndex:this.testCaseIndex,
      defect: '',
      selectedSeverity: '',
      defectList: [],
      defectDescription: '',
      selectedAppUserId: '',
      appUserList: [],
      selectedSeverity: 'MEDIUM',
      severityList: [{
          key: 'LOW',
          value: 'Low'
        },
        {
          key: 'MEDIUM',
          value: 'Medium'
        },
        {
          key: 'HIGH',
          value: 'High'
        },
        {
          key: 'SHOW_STOPPER',
          value: 'Show Stopper'
        },
      ],
      addedDefectList: [],
      createNewDefect: {
        defectTitle: '',
        defectIdentifier: '',
        defectId: '',
        defectDescription: '',
        defectSeverity: 'MEDIUM',
        defectStatus:'OPEN',
        appUserId: ''

      },
      showError:false,
      isShowCreateDefect: false,
      isCalledSever:true,
      isbackDisable:false,
      isNextDisable:false,
      detectDetails:''
    }
  },
  components: {},
  methods: {

    executionTestCasePass: function() {
      var app = this;
      var executionTestCase = {};
      // executionTestCase.testCaseExecutionId = app.childtestCaseDetails.testCaseExecutionId;

      if (app.runTest.testExecutionRunId != null) {
        executionTestCase.testExecutionRunId = app.runTest.testExecutionRunId;
      }

      executionTestCase.testCaseId = app.childtestCaseDetails.testCaseId;
      executionTestCase.actualResult = app.childtestCaseDetails.actualResult;
      executionTestCase.testCaseExecutionResultType = 'PASS';
      app.$validator.validateAll('comment-scope');
      if (!app.errors.any()) {
          app.$store.commit('setSpinner',true);
        app.$http.post(app.$store.state.SERVER_URL + '/api/dev-pm-admin/save-test-case-execution', executionTestCase, {
          headers: {
            "X-Authorization": app.$cookie.get('X-Authorization')
          },
        }).then((response) => {
          app.$store.commit('setSpinner',false);
          if (response.data.status == 'SUCCESS') {

            //  var index = app.childtestExcutionList.indexOf(app.childtestCaseDetails);
              app.childtestCaseDetails = response.data.payLoad;
              // console.log(app.childtestCaseDetails);
              app.childtestExcutionList.splice(app.childtestCaseIndex,1,app.childtestCaseDetails);
            var testRun = app.runTest;
            testRun.hasAnyTestCasesExecuted=true;
            this.addedDefectList=[];
            app.$emit('changerunTest',testRun);

        //    app.nextButton();
            //  app.testRunList.unshift(response.data.payLoad);
          } else {
            setTimeout(function() {}, 3000)
          }
        }, (response) => {
          setTimeout(function() {}, 3000)
        });
      }
    },
    executionTestCaseFail: function() {
      // /api/dev-pm-admin/get-qa-defects-in-project/1
      var app = this;

      // setTimeout(function() {
      //   app.errors.clear('Defect-scope-test-run');
      // }, 10)
      app.addedDefectList=[];
      app.defect=null;
        app.isShowCreateDefect=false;
      app.$validator.validateAll('comment-scope');
      console.log("----errror---------");
      console.log(app.errors);
      if (!app.errors.any()) {

            console.log("----inside---------");
            app.$store.commit('setSpinner',true);
        app.$http.get(

          app.$store.state.SERVER_URL + '/api/dev-pm-admin/get-qa-defects-in-epic-from-test-case/' + app.childtestCaseDetails.testCaseId, {
            headers: {
              "X-Authorization": app.$cookie.get('X-Authorization')
            },
          }
        ).then(function(response) {
          app.$store.commit('setSpinner',false);
          if (response.data.status == 'SUCCESS' && app.isCalledSever) {
            app.isCalledSever=false;
            console.log(response.data.payLoad);
            app.defectList = response.data.payLoad.defectList;
            app.appUserList = response.data.payLoad.appUserList;
            app.addedDefectList=[];

          }
            $('#DefectModal').modal('show');
          //console.log(app.testCasesList);
        });
      }
    },
    raiseDefect: function() {
      var app = this;

  //  app.$validator.validateAll();
    //  app.$validator.validateAll('Test-run-scope');
      console.log(app.createNewDefect.defectTitle);
      console.log(app.errors);
  //    if (!app.errors.any()) {
    app.showError=false;

  if(app.createNewDefect.defectTitle!='' && app.createNewDefect.defectTitle!=null){
    app.showError=false;

        app.addedDefectList.push(app.createNewDefect);
        app.createNewDefect={};

        app.createNewDefect.defectSeverity = 'MEDIUM';
        app.createNewDefect.defectStatus='OPEN';
        app.createNewDefect.appUserId = '';
        app.createNewDefect.defectTitle='';
        app.isShowCreateDefect = false;

        setTimeout(function() {

          app.errors.clear('Defect-scope-test-run');
        }, 100)

      }else{
        this.showError=true;
      }
    },
    linkDefect: function() {
      var app = this;

      // app.$validator.validateAll();
      // app.$validator.validateAll('select-defect-scope');
      // if (!app.errors.any()) {
        var linkDefectExcecutin = {};
        console.log(app.defect);
        if (app.runTest.testExecutionRunId != null) {
          linkDefectExcecutin.testExecutionRunId = app.runTest.testExecutionRunId;
        }

        linkDefectExcecutin.testCaseId = app.childtestCaseDetails.testCaseId;
        linkDefectExcecutin.actualResult = app.childtestCaseDetails.actualResult;
        linkDefectExcecutin.testCaseExecutionResultType = 'FAIL';
        linkDefectExcecutin.defects = app.addedDefectList;
        app.enableButton=true;
        app.$store.commit('setSpinner',true);
        app.$http.post(app.$store.state.SERVER_URL + '/api/dev-pm-admin/save-test-case-execution', linkDefectExcecutin, {
          headers: {
            "X-Authorization": app.$cookie.get('X-Authorization')
          },
        }).then((response) => {
          app.$store.commit('setSpinner',false);
          app.enableButton=false;
          if (response.data.status == 'SUCCESS') {
            app.childtestCaseDetails = response.data.payLoad;
            app.childtestExcutionList.splice(app.childtestCaseIndex,1,app.childtestCaseDetails);
           this.addedDefectList=[];
            var testRun = app.runTest;
            console.log(testRun);
            testRun.hasAnyTestCasesExecuted=true;
            app.$emit('changerunTest',testRun);
                //app.nextButton();
            // var index = app.childtestExcutionList.indexOf(app.childtestCaseDetails);
            // app.childtestExcutionList.splice(index,1,app.childtestCaseDetails);
            $('#DefectModal').modal('hide');
            //  app.testRunList.unshift(response.data.payLoad);
          } else {


            app.errorMessage = response.data.errorMessage;
            app.isError=true;
            setTimeout(function () {
            app.isError=false;
          }, 3000)
          }
        }, (response) => {
          app.enableButton=false;
          app.errorMessage ='Something went wrong!';
          app.isError=true;
          setTimeout(function () {
          app.isError=false;
        }, 3000)
        });
    //  }
    },
    showDefectModal: function() {
      this.isShowCreateDefect = true;
    },
    removeDefect: function(defect,index){

      this.addedDefectList.splice(index,1);

    },
    onChangedDefectList: function(defect) {
      console.log("defect-------");
      console.log(defect);
      this.addedDefectList.push(defect);

    },
    consoleCallback(val) {
      console.log("-----call the ---on chane");
      if(val!=null){
          this.addedDefectList.push(val);
      }

 },
    nextButton: function() {
      var app = this;
      console.log('index are----------------' + app.childtestCaseIndex);
      if (app.childtestCaseIndex < (app.childtestExcutionList.length - 1)) {
        app.childtestCaseDetails = app.childtestExcutionList[app.childtestCaseIndex + 1];
        app.childtestCaseIndex = app.childtestCaseIndex + 1;
          app.isbackDisable=false;
      }else{
        app.isNextDisable=true;
      }
      setTimeout(function() {
        app.errors.clear('comment-scope');
      },5)
    },
    backButton: function() {
      var app = this;
      // console.log('index are----------------' + app.childtestCaseIndex);
      if (app.childtestCaseIndex > 0) {
            console.log('index are----back------------' + app.childtestCaseIndex);
        app.childtestCaseDetails = app.childtestExcutionList[app.childtestCaseIndex - 1];
        app.childtestCaseIndex = app.childtestCaseIndex - 1;
          app.isNextDisable=false;
      }else{
        app.isbackDisable=true;
      }
      setTimeout(function() {
        app.errors.clear('comment-scope');
      },5)
    },
    getDefectDetails:function(defectId){
      console.log("defects-------------------------");
      var app = this;
      app.$http.get(

        app.$store.state.SERVER_URL + '/api/dev-pm-admin/get-qa-defect-details/' + defectId, {
          headers: {
            "X-Authorization": app.$cookie.get('X-Authorization')
          },
        }
      ).then(function(response) {
        if (response.data.status == 'SUCCESS') {
        app.detectDetails= response.data.payLoad;
        console.log(app.detectDetails);
        $('#showDefectModal').modal('show');
        }

        //console.log(app.testCasesList);
      });
    },
    getTime: function(date){
      var moment = require('moment-timezone');
    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // console.log("convertStringtoDate------------------------>"+timeZone)
    return moment(date).tz(timeZone).format('DD-MM-YYYY HH:mm')

    }
  },
}
</script>
