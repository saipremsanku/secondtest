<template>
<div>




        <section class="test-run-execution-details">

          <table class="table table-hover platform-table-color price-table">
           <tbody>
               <tr>
                   <th>Test Case #</th>
                   <th>Title</th>
                      <th>Status</th>
                       <th>Defect</th>
                    <th>Executed On</th>
                   <th>Executed By</th>


                   <th>Execute</th>

               </tr>
               <!-- <p>{{testExcutionList}}</p> -->
               <tr class="text-center" v-for="(test,index) in testExcutionList">
                   <td>{{test.testCaseIdentifier}}</td>
                   <td>{{test.testCaseTitle}}</td>
                          <td>{{test.testCaseExecutionResultType}}</td>
                   <td>
                     <div class="row" v-for="defect in test.defects">
                       <div class="col-md-6 col-lg-6 col-sm-6 col-xs-6">
                           <a @click="getDefectDetails(defect.defectId)">{{defect.defectIdentifier}}</a>
                         <!-- <router-link to="">{{defect.defectIdentifier}}</router-link> -->
                       </div>
                       <div class="col-md-4 col-lg-4 col-sm-4 col-xs-4">
                         <p class="badge badge-cst bg-orange" v-if="defect.defectStatus=='OPEN'">Open</p>
                         <p class="badge badge-cst bg-green" v-if="defect.defectStatus=='CLOSED'">Closed</p>
                         <p class="badge badge-cst bg-blue" v-if="defect.defectStatus=='REOPENED'">Reopen</p>
                         <p class="badge badge-cst yellow-color" v-if="defect.defectStatus=='FIXED_IN_CODE'">Fixed</p>
                       </div>
                     </div>

                 </td>
                 <td>
                   <span v-if="test.testCaseExecutionDateInMillis">
                   {{getTime(test.testCaseExecutionDateInMillis)}}
                 </span>
                 </td>
                   <td>{{test.testCaseExecutedBy}}</td>


                   <td v-if="test.testCaseExecutionResultType==null"><a @click="getTestCasesDetails(test,index)"><i class="fa fa-play-circle-o test-run-fa-play" aria-hidden="true"></i></a></td>
                   <td v-else-if="test.testCaseExecutionResultType=='PASS'"><a @click="getTestCasesDetails(test,index)"><i class="fa fa-info-circle test-run-fa-info" aria-hidden="true"></i></a></td>
                     <td v-else><a @click="getTestCasesDetails(test,index)"><i class="fa fa-info-circle test-run-fa-info" aria-hidden="true"></i></a></td>
               </tr>

           </tbody>
       </table>
        </section>







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
                  <div class="row">
                     <div class="col-md-12">
                        <form  data-vv-scope="Defect-scope" v-if="detectDetails!=''">
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

export default {
  props: ['isShowRunTestCase','isShowTestCases','isShowTestRunExcecution','isShowTestRunDefectDetails','testExcutionList','runTest','testCaseDetails'],
  data() {
    return {
      detectDetails:''
    }
  },
  components: {
  },
  methods:{
    getTestCasesDetails:function(test,index){
      var app =this;
      app.$emit("changeisShowRunTestCase",false);
      app.$emit("changeisShowTestCases",true);
      app.$emit("changeisShowTestRunExcecution",false);
      app.$emit("changeisShowTestRunDefectDetails",false);
      app.$emit("changetestCaseDetails",test);
      app.$emit("changeIndex",index);
  //   var app = this;
  //  app.$http.get(
  //      app.$store.state.SERVER_URL +'/api/dev-pm-admin/get-testCaseExecution-details-from-testCase-and-testRun/'+testCaseId+'/'+app.runTest.testExecutionRunId,
  //       {
  //          headers: {
  //              "X-Authorization": app.$cookie.get('X-Authorization')
  //          },
  //      }
  //  ).then(function(response) {
  //      if(response.data.status=='SUCCESS'){
  //          console.log('main parent index --------'+index);
   //
  //      }
   //
  //  });
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
  }
}
</script>
</script>
