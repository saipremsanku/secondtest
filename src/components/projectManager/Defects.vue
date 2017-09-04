<template>
  <div>
    <div class="row">
      <div class="col-md-3 pull-left" >
        <p v-if="openedDefectCount != ''">{{openedDefectCount}} Open/Reopen</p>
      </div>
      <div class="col-md-3 pull-right" >
        <button class="btn btn-md btn-orange pull-right defectsRaiseBtn" data-toggle="modal" v-if="!isAdmin" @click="openDefectModal()"><i class="fa fa-plus-circle" aria-hidden="true"></i> Raise Defect</button>
      </div>
    </div>

    <div class="row">

  <!-- <form @submit.prevent="search()"> -->

     <div class="defectsFilters">
        <div class="col-md-2" >

          <div class="search_div">
            <input type="text" v-model="search.searchIndex" v-on:keyup="keymonitor" value="" placeholder="Please enter min 3 char" class="defectsSearchBox">
             <!-- <i class="fa fa-search" aria-hidden="true" @click="searchDefect"></i> -->
          </div>
        </div>
      <div class="col-md-2">
        <div class="dropdown">
          <select class="form-control" v-model="searchEpic" @change="getSelectedSearchStory(searchEpic)">
           <option  value="" >Select Epic</option>
           <option  :value="epic" v-for="epic in allStoryAndEpics">{{epic.epicName}}</option>
          </select>
        </div>
      </div>

    <div class="col-md-2">

          <div class="dropdown">
            <select class="form-control" v-model="search.userStoryId" @change="searchDefect">
             <option  value="" >Select Story</option>
             <option  :value="story.id" v-for="story in searchUserStorys">{{story.name}}</option>
            </select>
          </div>
        </div>

      <div class="col-md-2">

        <div class="dropdown">
          <!-- <button class="btn dropdown-toggle" type="button" data-toggle="dropdown">Assignee
          <span class="caret"></span></button> -->
          <select class="form-control"  v-model="search.assigneeId"  @change="searchDefect">
           <option  value="" >Select Assignee</option>
           <option  :value="appUser.appUserId" v-for="appUser in appUserList" >{{appUser.appUserFullName}}</option>
          </select>
        </div>
      </div>

    <div class="col-md-2">

      <div class="dropdown">
          <select class="form-control" v-model="search.defectStatus" @change="searchDefect">
           <option  value="" >Select Status</option>
           <option  :value="status.key" v-for="status in defectStatus">{{status.value}}</option>
          </select>
        </div>
      </div>

    <div class="col-md-2">

        <div class="col-md-9 dropdown">
          <select class="form-control" v-model="search.defectSeverity" @change="searchDefect">
           <option  value="" >Select Severity</option>
           <option  :value="severity.key" v-for="severity in severityList">{{severity.value}}</option>
          </select>
        </div>
        <div class="col-md-3">
        <a class="cursor-pointer" @click="clearSearch()">Clear</a>
        </div>

      </div>

    </div>
<!-- </form> -->
</div>

<div class="margin-bottom-defect">

   <div class="show-table" :class="showData">
    <div class="row bg-grey defectsHead">
      <div class="col-md-1">
      <strong>S.No</strong>
      </div>
      <div class="col-md-1">
        <strong>Defect</strong>
      </div>
      <div class="col-md-4">
        <strong>Title</strong>
      </div>
      <div class="col-md-2">
        <strong>Raised On</strong>
      </div>
      <div class="col-md-1">
        <strong>Raised By</strong>
      </div>
      <div class="col-md-1">
        <strong>Assignee</strong>
      </div>
      <div class="col-md-1">
        <strong>Severity</strong>
      </div>
      <div class="col-md-1">
        <strong>Status</strong>
      </div>
      <!-- <div class="col-md-1">
      </div> -->
    </div>


    <div class="row bg-white paddx15 pdt-10 defectsTable" v-for="(defect,index) in defectsList">
      <div class="col-md-1">
        <p>{{iterateRowNum(index)}}</p>
      </div>
      <div class="col-md-1">
        <p><a class="cursor-pointer" @click="editDefectModal(defect,index)"># {{defect.defectIdentifier}}</a></p>
      </div>
      <div class="col-md-4">
        <span>{{defect.defectTitle}}</span>
      <span v-for="(label,index) in defect.defectLabels" class="mgn-rgt">
     <button  v-bind:style="{background: label.defectLabelColourCode}" @click="searchDefect(label)"> {{label.defectLabelName}}</button></span>
      </div>
      <div class="col-md-2">
        <p>{{convertUtcToLocaDateTime(defect.defectOpenedDateInMillis)}}</p>
      </div>
      <div class="col-md-1">
        <p>{{defect.defectOpenedBy}}</p>
      </div>
      <div class="col-md-1">
        <p>{{defect.appUserFullName}}</p>
      </div>

      <div class="col-md-1">
        <p class="badge badge-cst bg-blue" v-if="defect.defectSeverity=='LOW'">Low</p>
        <p class="badge badge-cst yellow-color" v-if="defect.defectSeverity=='MEDIUM'">Medium</p>
        <p class="badge badge-cst bg-orange" v-if="defect.defectSeverity=='HIGH'">High</p>
        <p class="badge badge-cst bg-red" v-if="defect.defectSeverity=='SHOW_STOPPER'">Show Stopper</p>
      </div>
      <div class="col-md-1">
        <p class="badge badge-cst bg-orange" v-if="defect.defectStatus=='OPEN'">Open</p>
            <p class="badge badge-cst bg-green" v-if="defect.defectStatus=='CLOSED'">Closed</p>
                <p class="badge badge-cst bg-blue" v-if="defect.defectStatus=='REOPENED'">Reopen</p>
                    <p class="badge badge-cst yellow-color" v-if="defect.defectStatus=='FIXED_IN_CODE'">Fixed</p>
      </div>
      <!-- <div class="col-md-1 text-center">
        <a type="button" v-if="!isAdmin" class="cursor-pointer"><span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-pencil" @click="editDefectModal(defect,index)"></i></span></a>
      </div> -->
    </div>
  </div>

  <p v-if="totalDefectCount != ''">Showing {{startDefectCount}} to {{endDefectCount}} of {{totalDefectCount}} records</p>
<nav aria-label="Page navigation example">
  <ul class="pagination pull-right">
    <li class="page-item" v-for="(page,index) in pagination">
      <a v-if="index===0" class="page-link" :class="onloadPagination" href="#" @click="getNextPage(page)">{{page+1}}</a>
      <a v-else class="page-link " href="#" @click="getNextPage(page)">{{page+1}}</a>
    </li>
  </ul>
</nav>
</div>



    <!-- modal for raise the defects -->

    <div class="modal fade" id="RaiseDefectModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
       <div class="modal-dialog" role="document">
          <div class="modal-content">
             <div class="modal-header bg-grey no-border">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" v-if="defectId==null" >Raise Defect</h4>
                  <h4 class="modal-title" v-else>Update Defect #{{defectIdentifier}}</h4>
             </div>
             <div class="modal-body padd0">
               <div class="alert alert-danger error-color" v-if="isError">
              {{errorMessage}}
               </div>
               <ul class="nav nav-tabs nav-justified add-task-tabs" id="myTab">
                <!-- <li class="active"><a data-target="#details" data-toggle="tab">Details</a></li> -->

                <!-- <li v-else><a  disabled>Comments</a></li> -->
              </ul>
              <div class="tab-content">
                <div class="tab-pane active bg-light-gray" id="details">
                  <br><br>
                <div class="row">
                   <div class="col-md-12">
                      <form  data-vv-scope="Defect-scope">
                        <div class='form-group paddx15'>
                          <select class="form-control" v-model="selectedEpic" name="selectedEpic" @change="getStory(selectedEpic)" :class="{'select': true, 'is-danger': errors.has('Defect-scope.selectedEpic')}" v-validate:selectedEpic="'required'">
                             <option  value="" selected>Select Epic </option>
                              <option  v-for="epic in allStoryAndEpics" :value="epic">{{epic.epicName}}</option>
                          </select>
                            <p class="text-danger" v-if="errors.has('Defect-scope.selectedEpic')">Select Epic </p>
                        </div>

                        <div class='form-group paddx15'>
                          <select class="form-control" v-model="selectedSeverity" name="selectedSeverity"  :class="{'select': true, 'is-danger': errors.has('Defect-scope.selectedSeverity')}" v-validate:selectedSeverity="'required'">
                             <!-- <option  value="" selected>Select Severity </option> -->
                              <option  v-for="severity in severityList" :value="severity.key">{{severity.value}}</option>
                          </select>
                            <p class="text-danger" v-if="errors.has('Defect-scope.selectedSeverity')">Select Severity </p>
                        </div>

                         <div class="form-group paddx15" :class="{'input': true, 'is-danger': errors.has('Defect-scope.defectTitle') }">
                          <input type='text' class="form-control" placeholder="Defect Title" name="defectTitle" v-model="defectTitle" v-validate:defectTitle="'required'">
                            <p class="text-danger" v-if="errors.has('Defect-scope.defectTitle')">Please enter defect title </p>
                         </div>
                         <div class="form-group paddx15">
                          <textarea class="form-control" placeholder="Defect Description" rows="5"  name="defectDescription" v-model="defectDescription" ></textarea>
                         </div>

                         <div class='form-group paddx15'>
                           <select class="form-control" v-model="storyTestCase" name="storyTestCase" @change="getTestCase(storyTestCase)">
                             <option value="" selected>Select Story </option>
                             <option v-for="story in storyList" :value="story" v-if="selectedEpic">{{story.name}}</option>
                           </select>
                         </div>
                         <div class='form-group paddx15'>
                         <select class="form-control" v-model="testCases">
                           <option value="" selected> Select Test case</option>
                          <optgroup  v-for=" testSecn in testScenarios" :label="testSecn.testScenarioIdentifier">
                            <p>{{testSecn}}</p>
                            <option  v-for=" testcase in testSecn.testCases" :value="testcase" v-if="storyTestCase">{{testcase.testCaseTitle}}</option>
                          </optgroup>
                         </select>
                         </div>

                         <div class='form-group paddx15' v-if="defectId!=null">
                         <select class="form-control" v-model="selectedDefectStatus">
                           <option value="" selected disabled>Select Defect Status</option>
                            <option  v-for=" status in defectStatus" :value="status.key">{{status.value}}</option>

                         </select>
                         </div>




                         <div class='form-group paddx15'>
                         <select class="form-control" v-model="selectedAppUserId">
                           <option value="" selected disabled>Select Assignee</option>
                            <option  v-for=" appUser in epicSharedAppUserList" :value="appUser.appUserId">{{appUser.appUserFullName}}</option>
                         </select>
                         </div>
                         <div class='form-group paddx15'>
                           <v-select  disabled v-model="selectedLabels" label="defectLabelName" multiple :options="labelList" placeholder="Select Labels"></v-select>


                         <!-- <select multiple class="form-control" v-model="defectLabelIdList">
                           <option value="" selected disabled>Select Label</option>
                            <option  v-for="labels in labelList" :value="labels.defectLabelId" v-bind:style="{background: labels.defectLabelColourCode}"><span>{{labels.defectLabelName}}</span></option>
                         </select> -->
                       </div>

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
                         </div>
                         <div class="col-md-12 btn-ripple">
                            <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-orange" :disabled="enableButton" @click="raiseDefect" v-if="defectId==null">ADD</button>
                            <button type="button" class="btn btn-orange" :disabled="enableButton" @click="raiseDefect" v-else>Update</button>
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


<!-- /edit defect modal -->






<div class="modal fade" id="RaiseDefectModalEdit" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
   <div class="modal-dialog" role="document">
      <div class="modal-content">
         <div class="modal-header bg-grey no-border">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" v-if="defectId==null" >Raise Defect</h4>
              <h4 class="modal-title" v-else>Update Defect #{{defectIdentifier}}</h4>
         </div>
         <div class="modal-body padd0">
           <div class="alert alert-danger error-color" v-if="isError">
          {{errorMessage}}
           </div>
           <ul class="nav nav-tabs nav-justified add-task-tabs" id="myTab-edit">
            <li class="active"><a data-target="#details1" data-toggle="tab">Details</a></li>
            <li v-if="defectId"><a data-target="#comments" data-toggle="tab">Comments</a></li>
              <li v-if="defectId"><a data-target="#history" data-toggle="tab">History</a></li>
            <!-- <li v-else><a  disabled>Comments</a></li> -->
          </ul>
          <div class="tab-content">
            <div class="tab-pane active bg-light-gray" id="details1">
              <br><br>
            <div class="row">
               <div class="col-md-12">
                  <form  data-vv-scope="Defect-scope">
                    <div class='form-group paddx15'>
                      <select class="form-control" v-model="selectedEpic" name="selectedEpic" @change="getStory(selectedEpic)" :class="{'select': true, 'is-danger': errors.has('Defect-scope.selectedEpic')}" v-validate:selectedEpic="'required'">
                         <option  value="" selected>Select Epic </option>
                          <option  v-for="epic in allStoryAndEpics" :value="epic">{{epic.epicName}}</option>
                      </select>
                        <p class="text-danger" v-if="errors.has('Defect-scope.selectedEpic')">Select Epic </p>
                    </div>

                    <div class='form-group paddx15'>
                      <select class="form-control" v-model="selectedSeverity" name="selectedSeverity"  :class="{'select': true, 'is-danger': errors.has('Defect-scope.selectedSeverity')}" v-validate:selectedSeverity="'required'">
                         <!-- <option  value="" selected>Select Severity </option> -->
                          <option  v-for="severity in severityList" :value="severity.key">{{severity.value}}</option>
                      </select>
                        <p class="text-danger" v-if="errors.has('Defect-scope.selectedSeverity')">Select Severity </p>
                    </div>

                     <div class="form-group paddx15" :class="{'input': true, 'is-danger': errors.has('Defect-scope.defectTitle') }">
                      <input type='text' class="form-control" placeholder="Defect Title" name="defectTitle" v-model="defectTitle" v-validate:defectTitle="'required'">
                        <p class="text-danger" v-if="errors.has('Defect-scope.defectTitle')">Please enter defect title </p>
                     </div>
                     <div class="form-group paddx15">
                      <textarea class="form-control" placeholder="Defect Description" rows="5"  name="defectDescription" v-model="defectDescription" ></textarea>
                     </div>

                     <div class='form-group paddx15'>
                       <select class="form-control" v-model="storyTestCase" name="storyTestCase" @change="getTestCase(storyTestCase)">
                         <option value="" selected>Select Story </option>
                         <option v-for="story in storyList" :value="story" v-if="selectedEpic">{{story.name}}</option>
                       </select>
                     </div>
                     <div class='form-group paddx15'>
                     <select class="form-control" v-model="testCases">
                       <option value="" selected> Select Test case</option>
                      <optgroup  v-for=" testSecn in testScenarios" :label="testSecn.testScenarioIdentifier">
                        <p>{{testSecn}}</p>
                        <option  v-for=" testcase in testSecn.testCases" :value="testcase" v-if="storyTestCase">{{testcase.testCaseTitle}}</option>
                      </optgroup>
                     </select>
                     </div>

                     <div class='form-group paddx15' v-if="defectId!=null">
                     <select class="form-control" v-model="selectedDefectStatus">
                       <option value="" selected disabled>Select defect Status</option>
                        <option  v-for=" status in defectStatus" :value="status.key">{{status.value}}</option>

                     </select>
                     </div>


                     <div class='form-group paddx15'>
                     <select class="form-control" v-model="selectedAppUserId">
                       <option value="" selected disabled>Select Assignee</option>
                        <option  v-for=" appUser in epicSharedAppUserList" :value="appUser.appUserId">{{appUser.appUserFullName}}</option>

                     </select>
                     </div>
                     <div class='form-group paddx15'>
                       <v-select :value.sync="selectedLabels" v-model="selectedLabels" label="defectLabelName" multiple :options="labelList" placeholder="Select Labels"></v-select>

                     <!-- <select multiple class="form-control" v-model="selectedLabels">
                       <option value="" selected disabled>Select Label</option>
                        <option  v-for="labels in labelList" :value="labels.defectLabelId" v-bind:style="{background: labels.defectLabelColourCode}"><span>{{labels.defectLabelName}}</span></option>
                     </select> -->
                   </div>
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
                     </div>

                     <!-- <div class="form-group paddx15">
                       <input type="file" class="input" name="file" @change="onFileChangeProfilePic">
                     </div> -->
                     <div class="col-md-12 btn-ripple">
                        <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-orange" :disabled="enableButton" @click="raiseDefect" v-if="defectId==null">ADD</button>
                        <button type="button" class="btn btn-orange" :disabled="enableButton" @click="raiseDefect" v-else>Update</button>
                     </div>
                  </form>
               </div>
            </div>
          </div>
          <div class="tab-pane bg-light-gray" id="comments">
            <br>
            <div class="row">
              <div class="col-xs-12">
                <form data-vv-scope="Defect-comment-scope" >
                  <div class="form-group paddx15" :class="{'input': true, 'is-danger': errors.has('Defect-comment-scope.comment') }">
                    <textarea class="form-control" placeholder="Add comments here" rows="3" name="comment" v-model="comment" v-validate:comment="'required'"></textarea>
                    <p class="text-danger" v-if="errors.has('Defect-comment-scope.comment')">Please enter comment </p>
                  </div>
                  <div class="paddx15">
                    <p><label class="font-normal"></label>
                      <button type="button" class="btn comment-btn pull-right" @click="saveComment" v-if="defectId!=null">Post</button>
                    </p>
                  </div>
                </form>
                <p class='paddx15'><span class="color-orange"><i> {{defectCommentList.length}} Comments </i></span></p>
                <div class="scroll-comments">
                  <div class="bg-white paddx15 pdt-5 grey-border" v-for="comment in defectComments">
                    <div class="media">
                     <div class="media-left chat-image-pos">
                        <!-- <img src="/src/assets/images/avatar.png" class="img-circle media-object chat-image"> -->
                       <img :src="getFileUrl+comment.defectCommentedUserProfilePictureId" alt="ProfileImage" v-if="comment.defectCommentedUserProfilePictureId!=null" class="img-circle media-object chat-image">
                         <img :src="'https://api.adorable.io/avatars/200/'+comment.defectCommentedBy" class="img-circle media-object chat-image" v-else>
                     </div>
                     <div class="media-body">
                       <span class="color-gray estValue">{{comment.defectCommentedBy}}</span>
                        <span class="pull-right">
                       <span class="color-gray estValue">{{convertUtcToLocaDateTime(comment.defectCommentedByInMillis)}}</span>

                            <span class="color-gray estValue">{{comment.defectCommentedDate}}</span>
                          <span class="color-gray">
                          </span>
                        </span>
                       <p>{{comment.comment}}</p>
                     </div>
                   </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


           <div class="tab-pane bg-light-gray" id="history">
             <br>
             <div class="row">
               <div class="col-xs-12">
                 <div class="scroll-comments">

                   <div class="bg-white paddx15 pdt-5 grey-border" v-for="taskTransaction in defectTransactions">
                     <div class="media">
                       <div class="media-left chat-image-pos" v-if="taskTransaction.transactionByUserProfilePicId">
                         <img :src="getFileUrl+taskTransaction.transactionByUserProfilePicId" class="img-circle media-object chat-image">
                       </div>
                       <div class="media-left chat-image-pos" v-else>
                         <img src="/src/assets/images/avatar.png" class="img-circle media-object chat-image">
                       </div>
                      <div class="media-body">
                        <span class="color-gray estValue">{{taskTransaction.transactionByUserFullName}}</span>
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








  </div>
</template>
<script>
import Labels from './Labels.vue'
export default{
  props:["isDefectTabClicked"],
  data(){
    return{
      isError:false,
      currentIndex:0,
      errorMessage:'',
      isSearched:true,
      totalDefectCount:'',
      startDefectCount:'',
      endDefectCount:'',
      openedDefectCount:'',
      recordPerPage:'',
      showData:'',
      onloadPagination:'pagination-color',
      noOfPages:'',
      pageNumber:0,
      pagination:[],
      isFileLarge:false,
      allStoryAndEpics:[],
      storyTestCase:'',
      testScenarios:'',
      testCases:'',
      defectTitle:'',
      defectLabelIdList:[],
      defectDescription:'',
      defectId:null,
      defectIdentifier:'',
      defectsList:[],
      testStory:'',
      comment:'',
      file:'',
      labelList:[],
      selectedLabelList:[],
      defectFiles:[],
      defectCommentList:[],
      defectTransactionList:[],
      index:'',
      selectedEpic:'',
      selectedDefectStatus:'',
      storyList:[],
      selectedAppUserId:'',
      appUserList:'',
      selectedLabels:[],
      enableButton:false,
      fileDocumentId:'',
      selectedSeverity:'MEDIUM',
      defectStatus:[
              { key: 'OPEN', value: 'Open' },
             {key:'CLOSED' ,value: 'Closed'},
           {key:'FIXED_IN_CODE',value: 'Fixed'},
           {key:'REOPENED',value: 'Reopen'}
      ],
      severityList:[

        { key: 'LOW', value: 'Low' },
       {key:'MEDIUM' ,value: 'Medium'},
     {key:'HIGH',value: 'High'},
       {key:'SHOW_STOPPER',value: 'Show Stopper'},

   ],
        url:this.$store.state.SERVER_URL +'/get-file/',
        getFileUrl:this.$store.state.SERVER_URL +'/get-file/',
        search:{
          searchIndex:'',
          defectSeverity:'',
          defectStatus:'',
          assigneeId:'',
          defectLabelId:'',
          epicId:'',
          userStoryId:'',
          projectId:'',
          isNextPageClicked:false,
        },
        searchEpic:'',
        searchUserStorys:[],
        epicSharedAppUserList:[],
        }
    },
    watch:{
  	    'isDefectTabClicked': function(newValue, oldValue) {
  		    //console.log("watch------------------>-"+newValue+"-  oldValue--"+oldValue)
          if(this.isDefectTabClicked){
            this.getAllStoryandEcpics();
          }
  		    },
  		  },
  	  isDefectTabClicked: {
  	    canReuse: true,
  	  },
    mounted: function() {
       this.getLabels();
       this.getAllStoryandEcpics();
    },
    created: function() {
       this.getLabels();
    },
    computed:{

      defectComments : function(){
        var app = this;
        // app.getLabels();
        return app.defectCommentList.sort(function(a,b){
          return (b.defectCommentId - a.defectCommentId);
        })
      },
      defectTransactions : function(){
        var app = this;
        return app.defectTransactionList.sort(function(a,b){
          return (b.defectTransactionId - a.defectTransactionId);
        })
      },
      isAdmin:function(){
        return  this.$store.getters.getLoggedInUser.role === 'ADMIN';
      },
    },

    methods:{
      iterateRowNum(index){
        return (this.startDefectCount+index);
      },
      getLabels: function() {
          var app = this;
          app.$store.commit('setSpinner', true);
          app.$http.get(
              app.$store.state.SERVER_URL + '/api/dev-pm-admin/get-defect-labels-in-project/'+this.$store.getters.getProjectInfo.projectId
              , {
                  headers: {
                      "X-Authorization": app.$cookie.get('X-Authorization')
                  },

              }
          ).then(function(response) {
              app.$store.commit('setSpinner',false);
              app.labelList=response.data.payLoad;
          });
      },
      clearSearch(){
        var app = this;
        app.searchEpic =''
        app.search.defectLabelId=' ';
        app.searchUserStorys=''
        app.search.searchIndex=''
        app.search.defectSeverity=''
        app.search.defectStatus=''
        app.search.assigneeId=''
        app.search.epicId=''
        app.search.userStoryId=''
        app.pageNumber = 0;
        app.noOfPages = '';
        app.onloadPagination='pagination-color'
        // app.searchDefect();
        app.getAllStoryandEcpics();
      },
      keymonitor(e){
        var app = this;
        //console.log(app.search.searchIndex.length+"-----"+app.search.searchIndex+"----"+(app.search.searchIndex.length >2))
        if((app.search.searchIndex && app.search.searchIndex.length > 2) || (app.search.searchIndex == '')){
             app.search.pageNumber = 0;
             app.searchDefect();
        }
      },
     getNextPage(pageNumber){
       var app =this;
       app.search.pageNumber = pageNumber;
       app.pageNumber = pageNumber
       app.onloadPagination = '';
       app.isSearched = false;
       app.search.isNextPageClicked = true;
       app.searchDefect();
     },
      getSelectedSearchStory(epic){
      // console.log("on change story by epic------------->")
      // console.log(epic)
       var app = this;
       app.search.epicId ='';
       app.search.userStoryId = '',
       app.searchUserStorys = [];
       app.search.epicId = epic.id?epic.id:'';
       app.searchUserStorys = epic.userStorys?epic.userStorys:[];
       app.searchDefect();
      },
      searchDefect(label){
      var app = this;
       app.noOfPages = '';
       app.recordPerPage = ''
       app.showData = 'hidden';

       app.search.projectId = app.$store.getters.getProjectInfo.projectId;
       if(label.defectLabelId){
       app.search.defectLabelId=label.defectLabelId;
     }
      // console.log( app.search)
       app.$store.commit('setSpinner',true);
        app.$http.post(
        app.$store.state.SERVER_URL+'/api/dev-pm-admin/search',
        app.search,
      {
        headers: {
              "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
          },
      }
      ).then(function(response){
      // console.log("fetching data by search----------------------->")
      // console.log(response)
       app.totalDefectCount = '';
       app.startDefectCount = '';
       app.endDefectCount = '';
       app.openedDefectCount = '';
      app.defectsList = response.data.payLoad.defects;
      app.noOfPages = response.data.payLoad.noOfPages;
      app.recordPerPage = response.data.payLoad.recordPerPage;
      app.totalDefectCount = response.data.payLoad.totalDefectCount;
      app.startDefectCount = response.data.payLoad.startDefectCount;
      app.endDefectCount = response.data.payLoad.endDefectCount;
      app.openedDefectCount = response.data.payLoad.openedDefectCount;

      app.pagination = [];
      for (var i = 0; i < app.noOfPages; i++) {
        app.pagination.push(i)
      }
      app.$store.commit('setSpinner',false);
      app.showData = '';
      if(app.isSearched){
        app.onloadPagination='pagination-color'
      }else{
          app.onloadPagination = ''
      }
      app.isSearched = true;
      app.search.isNextPageClicked = false;
      });
      },

      openDefectModal: function(){
               this.getLabels();
               this.defectId=null;
               this.selectedLabels=null;
               this.defectFiles = [];
               this.defectIdentifier = '',
               this.defectDescription ='';
               this.defectTitle = '';
               this.storyTestCase ='';
               this.testCases ='';
               this.index='';
               this.selectedSeverity='MEDIUM';
               this.selectedEpic ='',
               this.selectedAppUserId='',
               setTimeout(() => {
                           this.errors.clear('Defect-scope');
                  }, 100);
              $('#RaiseDefectModal').modal('show');
      },
      editDefectModal : function(defect,index){
        var app = this;
          app.enableButton = false;
          app.defectTransactionList = [];
          app.defectFiles = [];
          app.defectCommentList = [];
          app.storyList = []
          app.storyTestCase='';
          app.defectId = defect.defectId;
          app.defectLabelIdList=[];
          app.defectIdentifier = defect.defectIdentifier;
          app.defectDescription = defect.defectDescription;
          app.defectTitle = defect.defectTitle;
          app.testCases = defect.testCase ? defect.testCase : '';
          app.storyList = defect.epic.userStorys ? defect.epic.userStorys: '';
          app.storyTestCase = defect.userStory ? defect.userStory : '';
          app.testScenarios = defect.userStory ? defect.userStory.testScenarios : '';
          app.selectedDefectStatus = defect.defectStatus;
          app.selectedEpic = defect.epic ? defect.epic:'';
          app.selectedSeverity = defect.defectSeverity;
          app.selectedAppUserId = defect.appUserId ? defect.appUserId : '';
          app.defectFiles = defect.files ? defect.files : [];
          app.defectLabelIdList = defect.defectLabelIdList ? defect.defectLabelIdList : [];
          app.index = index;
          app.getEpicSharedDeveloperList(app.selectedEpic.id);

          app.$http.get(
            app.$store.state.SERVER_URL+'/api/dev-pm-admin/get-comments-and-transactions-for-qa-defect/'+defect.defectId,
          {
            headers: {
              "X-Authorization": app.$cookie.get('X-Authorization')
            },
        }
      ).then(function(response){
          //console.log("defect transaction ------comment---------->")
          //console.log(response)
            if(response.data.status =='SUCCESS'){
              if(response.data.payLoad.defectTransactionList){
                app.defectTransactionList=response.data.payLoad.defectTransactionList;
              }
              if(response.data.payLoad.defectCommentList){
                app.defectCommentList=response.data.payLoad.defectCommentList;
              }
            }else{
            }
       });
       $('#RaiseDefectModalEdit').modal('show');
      },
      getStory: function(selectedEpic){
        var app = this;
        app.storyTestCase = ''
        app.selectedAppUserId = ''
        app.storyList = []
        app.storyList =  (selectedEpic && selectedEpic.userStorys) ? selectedEpic.userStorys:'';
        app.getEpicSharedDeveloperList(selectedEpic.id);
      },

      getTestCase: function(storyTestCase){
        if(storyTestCase!=null && storyTestCase!=''){
            this.testScenarios = storyTestCase.testScenarios;
        }

              },
      getAllStoryandEcpics: function(){
        var app =this;
        app.getLabels();
        app.showData = 'hidden';
        app.pageNumber = 0;
        app.noOfPages = '';
        app.totalDefectCount = '';
        app.startDefectCount = '';
        app.endDefectCount = '';
        app.onloadPagination = '';
        app.selectedLabels=null;
           app.$store.commit('setSpinner',true);
        this.$http.get(
          app.$store.state.SERVER_URL+'/api/dev-pm-admin/get-qa-defects-epics-storys-testscenarios-testcases-in-project/'+app.$store.getters.getProjectInfo.projectId,
        {
          headers: {
            "X-Authorization": app.$cookie.get('X-Authorization')
          },
      }
    ).then(function(response){
          // console.log(" getAllStoryandEcpics----------------->")
          // console.log(response)
          if(response.data.status =='SUCCESS'){
             //var selectedLabels=[];
              app.allStoryAndEpics = response.data.payLoad.epics;
              app.defectsList  =response.data.payLoad.defects;
              // for(var labels of response.data.payLoad.defects[app.currentIndex].defectLabels){
              //   app.currentIndex +=1;
              // selectedLabels.push(labels);
              // }
              //   app.selectedLabels=selectedLabels;
            //  app.labelList =response.data.payLoad.defectLabels;
              app.appUserList = response.data.payLoad.appUsers;
              app.noOfPages = response.data.payLoad.noOfPages;
              app.recordPerPage = response.data.payLoad.recordPerPage;
              app.totalDefectCount = response.data.payLoad.totalDefectCount;
              app.startDefectCount = response.data.payLoad.startDefectCount;
              app.endDefectCount = response.data.payLoad.endDefectCount;
              app.openedDefectCount = response.data.payLoad.openedDefectCount;

              app.pagination = [];
              for (var i = 0; i <app.noOfPages; i++) {
                app.pagination.push(i)
              }
              app.showData = '';
          }else{

          }
          app.$store.commit('setSpinner',false);
          if(app.isSearched){
            app.onloadPagination='pagination-color'
          }else{
              app.onloadPagination = ''
          }
          app.isSearched = true;
     });
   },
   raiseDefect: function(){
    // Vue.http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);
        var app = this;

        var defects ={
          files:[],
        };
      //  console.log(app.storyTestCase);
        defects.userStoryId = app.storyTestCase.id;
        if(app.selectedLabels){
          var defectLabelIdList=[];
          for(var label of app.selectedLabels){
            defectLabelIdList.push(label.defectLabelId);
          }
          defects.defectLabelIdList = defectLabelIdList;

        }
        defects.defectTitle = app.defectTitle;
        defects.defectDescription = app.defectDescription;
        defects.appUserId = app.selectedAppUserId;
        if(app.testCases!=null && app.testCases!=''){
              defects.testCaseId = app.testCases.testCaseId;
        }
        defects.files = app.defectFiles;
        defects.defectId  = app.defectId;
        defects.defectStatus = app.selectedDefectStatus;
        defects.epicId = app.selectedEpic.id;
        defects.defectSeverity = app.selectedSeverity;
        app.$validator.validateAll('Defect-scope');
          if (!app.errors.any()) {
            app.enableButton=true;
            app.$store.commit('setSpinner',true);
        app.$http.post(app.$store.state.SERVER_URL +'/api/dev-pm-admin/save-qa-defect',defects,
           {
                headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')
                   },

           }).then((response) => {
             app.enableButton=false;
             app.$store.commit('setSpinner',false);
             if(response.data.status=='SUCCESS'){
               app.enableButton=false;
               //console.log(response.data.payLoad);
              // console.log(app.index);
              // console.log(app.defectId);
               if(app.defectId!=null && app.defectId !=''){
                 app.enableButton=false;
                //  app.defectsList[app.index]=response.data.payLoad;
                app.defectsList.splice(app.index, 1, response.data.payLoad);
                $('#RaiseDefectModalEdit').modal('hide');
               }else{
                 app.enableButton=false;
                //  app.defectsList.push(response.data.payLoad);
                if(!app.defectsList){
                  app.defectsList=[];
                }
                app.defectsList.unshift(response.data.payLoad);
                app.totalDefectCount += 1;
                app.endDefectCount += 1;
                if(app.startDefectCount == 0){
                  app.startDefectCount = 1;
                }

               }
               //console.log(response.data.payLoad);

                $('#RaiseDefectModal').modal('hide');
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
     });
   }
   },
   saveComment: function(){

           var app = this;
            var comment = {};
            comment.defectId = app.defectId;
            comment.comment = app.comment;
            app.$validator.validateAll('Defect-comment-scope');
              if (!app.errors.any()) {
               app.$http.post(app.$store.state.SERVER_URL +'/api/dev-pm-admin/save-comment-for-qa-defect',comment,
                      {
                           headers: {
                                  "X-Authorization": app.$cookie.get('X-Authorization')
                              },

                      }).then((response) => {
                        if(response.data.status=='SUCCESS'){
                          app.comment='';
                          setTimeout(function () {
                              app.errors.clear('Defect-comment-scope');

                        },10)
                           app.defectCommentList.push(response.data.payLoad);
                          // $('#RaiseDefectModal').modal('hide');
                        }else{
                        }
                              console.log("response.playLoad.data",response.data.payLoad);
                              console.log("==========",app.getFileUrl+comment.defectCommentedUserProfilePictureId)

                  }, (response) => {
                });
}
   },
   capitalize(defectTransaction){
     var assignee = '';
     var stringValue = '';
     if(defectTransaction.defectAssigneeFullName != null){
       assignee = " & assigned to "+defectTransaction.defectAssigneeFullName;
     }
     if(defectTransaction.isFirstTransaction){
      return stringValue = 'created defect'+assignee;
     }else if(defectTransaction.isDefectStatusChanged && defectTransaction.isAssigneeChanged ){
       return stringValue = 'Updated : '+defectTransaction.defectTransactionStatus+' defect '+assignee;
     }else if(defectTransaction.isDefectStatusChanged ){
       return stringValue = 'Updated : '+defectTransaction.defectTransactionStatus;
     }else if(defectTransaction.isAssigneeChanged){
       return stringValue = 'Updated : assigned to '+defectTransaction.defectAssigneeFullName;
     }else{
       return stringValue = 'Updated defect';
     }
   },
   filesChange(fieldName, fileList) {

            var app = this;
            const formData = new FormData();
            if (!fileList.length) return;
            // append the files to FormData
            Array
                .from(Array(fileList.length).keys())
                .map(x => {
                     formData.append('file', fileList[x], fileList[x].name);
                });
            //console.log(ele.target.name);
            if(fileList[0].size <=5000000){
                app.isFileLarge= false;
                app.$store.commit('setSpinner',true);
           app.$http.post(
           app.$store.state.SERVER_URL+'/upload-orphan-document',
           formData,
           {
             headers: {
                   "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
               },
           }
         ).then(function(response){
           app.$store.commit('setSpinner',false);
            //console.log("file uplodaded successfullly---------------->")
            //.log(response)
            if(response.data.status === "SUCCESS"){
              if(app.defectFiles){
                app.defectFiles.push(response.data.payLoad);
              }else{
                app.defectFiles = []
                app.defectFiles.push(response.data.payLoad);
              }
            //  console.log("uploaded files---------------->")
            //  console.log(app.defectFiles)
            }else{
            //  console.log("Something went wrong--------->")
            }
         });
 }
 },
 deleteFile:function(fileId,index){
     var app =this;
     var dummyObj={}
     app.$http.post(
       app.$store.state.SERVER_URL +'/api/dev-pm-admin/delete-qa-defect-file/'+fileId,
       dummyObj,
     {
       headers: {
             "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
         },
     }
   ).then((response) => {
                      // console.log(response.data.status);
                       if(response.data.status == 'SUCCESS'){
                         app.defectFiles.splice(index,1);
                       }else{
                        app.$swal("Oops...", "Something went wrong!", "error");
                       }
        }, (response) => {
      });
},
   convertUtcToLocaDateTime(date){
    var moment = require('moment-timezone');
    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //  console.log("convertStringtoDate------------------------>"+timeZone)
    return moment(date).tz(timeZone).format('DD-MM-YYYY HH:mm')
  },
  getEpicSharedDeveloperList(epicId){
    var app = this;
    $.ajax({
         url:  app.$store.state.SERVER_URL+'/api/dev-pm-admin/shared-developer-list/'+epicId,
         type: 'GET',
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         async: false,
         data: {},
         headers: {
             "X-Authorization": app.$cookie.get('X-Authorization')
         },
         success: function(response) {
           //console.log(response)
           app.epicSharedAppUserList = response.payLoad;
         }
     });
  },
}
}
</script>
<style scoped>
.mgn-rgt{
  margin-right: 5px;
}
</style>
