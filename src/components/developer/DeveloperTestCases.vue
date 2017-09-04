<template>
   <div>
      <button class="btn btn-orange btn-lg pull-left"  data-toggle="modal" @click="openTestCaseModal"><i class="fa fa-plus-circle epic-btn-icon" aria-hidden="true"></i> Add Test cases</button>
      <br><br>
      <div class="panel-group PM_epic_accordion" id="accordion" role="tablist" aria-multiselectable="true" >
      <div class="storyContent">

      <!--start of accrodian-->
      <div class="" v-for="(testCase,index) in testCasesList" style="margin-top: 5px;border: 1px solid #cac0c0;">
      <div class="edit_delete_details mht-50">
        <div class="col-md-12 col-lg-12">
          <div class="col-md-3 col-lg-2 col-sm-3 col-xs-3">

         <span class="storyName">#{{testCase.testCaseIdentifier}}</span>
       </div>
         <div class="col-md-7 col-lg-9 col-sm-6 col-xs-6">
          <span class="storyName"><b>{{testCase.testCaseTitle}}</b></span>
          </div>

           <!-- <div class="col-md-2 col-lg-2 col-sm-6 col-xs-12 text-right paddRight_0">
             <div class="addTask">
             <button class="btn btn-orange btn-sm pull-right" ><i class="fa fa-plus-circle" aria-hidden="true" ></i> Task</button>
             </div>
           </div> -->
           <div class="col-md-2 col-lg-1 col-sm-3 col-xs-3" v-if="(loggedInUserId === testCase.addedByAppUserId)">
             <a type="button"  class="cursor-pointer "  @click="openEditTestCaseModal(testCase,index)"><span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-pencil"></i></span></a>

             <a type="button"  class="cursor-pointer pull-right "   @click="deleteTestCase(testCase,index)"><span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-trash-o"></i></span></a>
          </div>
          <div class="col-md-2 col-lg-1 col-sm-3 col-xs-3"v-else>
            <a type="button"  class="cursor-pointer "  @click="viewTestCaseModal(testCase,index)"><span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-info-circle"></i></span></a>
         </div>
        </div>

      </div>


      </div>

    </div>
   </div>


     <!-- add Test Cases  -->

    <div class="modal fade" id="addTestcases" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
     <div class="modal-dialog" role="document">
       <div class="modal-content">
         <div class="modal-header">
           <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
             <p class="modal-title estValue">Test Scenario #{{clickedTestScenario.testScenarioIdentifier}}</p>
              <h4 class="modal-title" v-if="testCase.testCaseId">Update Test Case</h4>
             <h4 class="modal-title" v-else>Add Test Case</h4>
         </div>
         <div class="modal-body">
             <div class="row">
                 <div class="col-md-12">

                       <form id="epicForm" @submit.prevent="addTestCase">

                           <div class="form-group epic" :class="{'input': true, 'is-danger': errors.has('testCaseTitle')}">
                               <input type="text" class="form-control" name="testCaseTitle"  placeholder="Test Case Title"  v-model="testCase.testCaseTitle" v-validate data-vv-rules="required"></textarea>
                                <p class="text-danger" v-if="errors.has('testCaseTitle')">Please specify Test Case title</p>
                           </div>
                           <div class="form-group epic" :class="{'textarea': true, 'is-danger': errors.has('testCaseData')}">
                                  <textarea class="form-control" name="testCaseData" placeholder="Inpu Criteria" v-model="testCase.testCaseData" v-validate data-vv-rules="required">{{testCase.testCaseData}}</textarea>
                                  <p class="text-danger" v-if="errors.has('testCaseData')">Please specify Input Criteria</p>
                           </div>
                           <div class="form-group epic" :class="{'textarea': true, 'is-danger': errors.has('testCaseData')}">
                               <textarea class="form-control" name="testCaseSteps" placeholder="Steps" v-model="testCase.testCaseSteps" v-validate data-vv-rules="required">{{testCase.testCaseSteps}}</textarea>
                                 <p class="text-danger" v-if="errors.has('testCaseSteps')">Please specify Steps to be followed</p>
                           </div>
                           <div class="form-group epic" :class="{'textarea': true, 'is-danger': errors.has('testCaseData')}">
                               <textarea class="form-control" name="testCaseExpectedResult" placeholder="Expected Result" v-model="testCase.testCaseExpectedResult" v-validate data-vv-rules="required">{{testCase.testCaseExpectedResult}}</textarea>
                              <p class="text-danger" v-if="errors.has('testCaseExpectedResult')">Please specify expected test result</p>
                           </div>


                            <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                             <button type="submit" class="btn btn-orange" :disabled="enableButton" v-if="testCase.testCaseId">Update</button>
                           <button type="submit" class="btn btn-orange" :disabled="enableButton" v-else>ADD</button>

                       </form>
                 </div>
             </div>
         </div>
       </div>
     </div>
   </div>

 <!-- view Test Cases  -->

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

</template>
<script>
   export default{
       props:['projectLeadStatus' , 'clickedTestScenario', 'testCasesList','message', 'sucess', 'isalertShow'],
       data(){
           return{

                testCase:{
                  testCaseId:'',
                  testCaseTitle:'',
                  testCaseSteps:'',
                  testCaseData:'',
                  testCaseExpectedResult:'',
                  testScenarioId:'',
                },
                testCaseIndex:'',
                enableButton:false,

               loggedInUserId:'',
           }
       },

       created:function(){
         this.loggedInUserId = this.$store.getters.getLoggedInUser.appUserId;
       },
       methods:{
             openTestCaseModal(){
               var app = this;

               app.testCase = {};
               app.testCaseIndex = '';
               setTimeout(() => {
                   app.errors.clear();
               }, 100);
             $('#addTestcases').modal('show')
             },
             addTestCase(e){
               e.preventDefault();
               var app = this;
               app.$validator.validateAll();
               console.log(app.clickedTestScenario)
               app.testCase.testScenarioId  = app.clickedTestScenario.id;
               console.log(app.testCase)
               if(!app.errors.any()){
                 app.enableButton=true;
               app.$http.post(
                 app.$store.state.SERVER_URL+'/api/dev-pm/save-test-case' ,
                 app.testCase,
                 {
                    headers: {
                        "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
                    },
                }
               ).then(function(response){
                 $('#addTestcases').modal('hide')
                console.log(response)
                app.enableButton=false;
                if(response.data.status === 'SUCCESS'){
                  app.enableButton=false;
                   if(app.testCase.testCaseId){
                     app.testCasesList[app.testCaseIndex] = response.data.payLoad;
                   }else{
                      app.testCasesList.push(response.data.payLoad);
                   }
                }else{
                  app.enableButton=false;
                  console.log("Oops something went wrong")
                }
               })
             }
             },
             viewTestCaseModal(testCase , index){
               var app = this;
               // app.testCase = {};
               app.testCase = testCase;
               app.testCaseIndex = index;
                $('#viewTestcases').modal('show');
             },
             openEditTestCaseModal(testCase , index){
              var app = this;
              // app.testCase = {};
              app.testCase = testCase;
              app.testCaseIndex = index;
               $('#addTestcases').modal('show');
             },
             deleteTestCase(testCase , index){
               var app = this;
               app.testCase = testCase;

               app.$swal({
               title: 'Are you sure?',
               text: "You won't be able to revert this!",
               type: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes'
               }).then(function () {

                   app.$http.post(
                     app.$store.state.SERVER_URL+"/api/dev-pm/delete-test-case" ,
                     app.testCase,
                     {
                       headers: {
                         "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
                       },
                     }
                   ).then(function(response){
                     console.log(response)
                     if(response.data.status === 'SUCCESS'){
                         app.testCasesList.splice(index, 1);
                     }else{

                       app.$emit('changeisaletShow',true);
                        app.$emit('changesuccess',false);
                          app.$emit('changemessage',response.data.errorMessage);
                       console.log("something went wrong !")
                     }
                   });

                 });



             },


        }
   }
</script>
<style scoped>
.tooltip {
  display: none;
  opacity: 0;
  transition: opacity .15s;
  pointer-events: none;
  padding: 4px;
  z-index: 10000;

  .tooltip-content {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  &.tooltip-open-transitionend {
    display: block;
  }

  &.tooltip-after-open {
    opacity: 1;
  }
}
</style>
