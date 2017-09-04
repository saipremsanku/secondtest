<template>
  <div>
  <div class="row">
    <div class="col-md-3 pull-left" >
    </div>
    <div class="col-md-3 pull-right" >
      <button class="btn btn-md btn-orange pull-right defectsRaiseBtn" data-toggle="modal"  @click="openUATIssueModal()" v-if="role=='PRODUCT_OWNER'"><i class="fa fa-plus-circle" aria-hidden="true"></i> Raise Issue</button>
    </div>
  </div>

  <div class="row">

   <div class="defectsFilters">
      <div class="col-md-3" >

        <div class="search_div">
          <input type="text" v-model="search.searchIndex" v-on:keyup="keymonitor" value="" placeholder="Please enter min 3 char" class="defectsSearchBox">
        </div>
      </div>
    <div class="col-md-3">
      <div class="dropdown">
        <select class="form-control" v-model="searchEpic" @change="getSelectedSearchStory(searchEpic)">
         <option  value="" >Select Epic</option>
         <option  :value="epic" v-for="epic in allStoryAndEpics">{{epic.epicName}}</option>
        </select>
      </div>
    </div>

  <div class="col-md-3">
        <div class="dropdown">
          <select class="form-control" v-model="search.userStoryId" @change="searchUat">
           <option  value="" >Select Story</option>
           <option  :value="story.id" v-for="story in searchUserStorys">{{story.name}}</option>
          </select>
        </div>
      </div>

  <div class="col-md-3">
    <div class="col-md-9  dropdown">
        <select class="form-control" v-model="search.defectStatus" @change="searchUat">
         <option  value="" >Select Status</option>
         <option  :value="status.key" v-for="status in defectStatus">{{status.value}}</option>
        </select>
      </div>
      <div class="col-md-3">
      <a class="cursor-pointer" @click="clearSearch()">Clear</a>
      </div>
    </div>

  </div>

</div>

<div class="margin-bottom-defect">

   <div class="show-table" :class="showData">
    <div class="row bg-grey defectsHead">
      <div class="col-md-1">
      <strong>S.No</strong>
      </div>
      <div class="col-md-2">
        <strong>Defect</strong>
      </div>
      <div class="col-md-4">
        <strong>Title</strong>
      </div>
      <div class="col-md-2">
        <strong>Raised On</strong>
      </div>

      <div class="col-md-2">
        <strong>ETA</strong>
      </div>
      <div class="col-md-1">
        <strong>Status</strong>
      </div>

    </div>


    <div class="row bg-white paddx15 pdt-10 defectsTable" v-for="(defect,index) in defectsList">
      <div class="col-md-1">
        <p>{{iterateRowNum(index)}}</p>
      </div>
      <div class="col-md-2">
        <p><a class="cursor-pointer" @click="editUATModal(defect,index)"># {{defect.defectIdentifier}}</a></p>
      </div>
      <div class="col-md-4">
        <p>{{defect.defectTitle}}</p>
      </div>
      <div class="col-md-2">
        <p>{{convertUtcToLocaDateTime(defect.defectOpenedDateInMillis)}}</p>
      </div>
      <div class="col-md-2">
        <p>{{convertUtcToLocaDateTimeUAT(defect.estimatedArrivalDateInMillis)}}</P>

      </div>
      <div class="col-md-1">
        <p class="badge badge-cst bg-orange" v-if="defect.defectStatus=='OPEN'">Open<span class="mandatory-uat-count" v-if="defect.commentsCount>0"><i class="fa fa-comments" aria-hidden="true" >{{defect.commentsCount}}</i></span></p>
        <!-- <span><i class="fa fa-comments" aria-hidden="true" v-if="defect.commentsCount>0">{{defect.commentsCount}}</i></span> -->
        <p class="badge badge-cst bg-green" v-if="defect.defectStatus=='CLOSED'">Closed<span class="mandatory-uat-count" v-if="defect.commentsCount>0"><i class="fa fa-comments" aria-hidden="true" >{{defect.commentsCount}}</i></span></p>
      </div>
      <!-- <div class="col-md-1 text-right" v-if="defect.commentsCount>0">
            <p>
          <i class="fa fa-comments" aria-hidden="true"></i>  {{defect.commentsCount}}</P>

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


<!-- modal for raise the UAT issue -->

<div class="modal fade" id="UATIssueModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
   <div class="modal-dialog" role="document">
      <div class="modal-content">
         <div class="modal-header bg-grey no-border">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title"  >Raise  Issue</h4>
         </div>
         <div class="modal-body padd0">
           <div class="alert alert-danger error-color" v-if="isError">
          {{errorMessage}}
           </div>
           <ul class="nav nav-tabs nav-justified add-task-tabs" id="myTab">
            <li class="active"><a data-target="#details" data-toggle="tab">Details</a></li>

          </ul>
          <div class="tab-content">
            <div class="tab-pane active bg-light-gray" id="details">
              <br><br>
            <div class="row">
               <div class="col-md-12">

                    <div class='form-group paddx15'>
                      <select class="form-control" v-model="selectedEpic" name="selectedEpic" @change="getStory(selectedEpic)">
                         <option  value="" selected>Select Epic </option>
                          <option  v-for="epic in allStoryAndEpics" :value="epic">{{epic.epicName}}</option>
                      </select>

                    </div>

                    <div class='form-group paddx15'>
                      <select class="form-control" v-model="selectedStory" name="selectedStory" >
                        <option value="" selected>Select Story </option>
                        <option v-for="story in storyList" :value="story" v-if="selectedEpic">{{story.name}}</option>
                      </select>
                    </div>



                     <div class="form-group paddx15" :class="{'input': true, 'is-danger': errors.has('defectTitle') }">
                      <input type='text' class="form-control" placeholder="Defect Title" name="defectTitle" v-model="defectTitle" v-validate:defectTitle="'required'">
                        <p class="text-danger" v-if="errors.has('defectTitle')">Please enter defect title </p>
                     </div>
                     <div class="form-group paddx15">
                      <textarea class="form-control" placeholder="Defect Description" rows="12"  name="defectDescription" v-model="defectDescription" ></textarea>
                     </div>
                     <div class='form-group paddx15' v-if="defectId!=null">
                     <select class="form-control" v-model="selectedDefectStatus">
                       <option value="" selected disabled>Select Defect Status</option>
                        <option  v-for=" status in defectStatus" :value="status.key">{{status.value}}</option>

                     </select>
                     </div>

                     <div class="col-md-12">
                       <div class="row">
                        <div class="col-md-2">
                            <div class="uploadFile">
                            <input type="file" multiple :name="fileName" @change="filesChange($event.target.file, $event.target.files); fileCount = $event.target.files.length"
                             accept="image/*" class="input-file">
                             </div>
                        </div>
                           <p class="text-danger" v-if="isFileLarge">File size exceed max. allowed limit of 5MB</p>
                         <div class="col-md-10">
                            <div class="row">
                             <di<div class="col-md-12">
                                 <div class="col-md-4 file_upload" v-for="(file,index) in defectFiles">
                                    <div class="file_heigh_width">
                                         <span class="fileUploadCss"><p>{{file.fileName}}</p> <a :href="url+file.fileDocumentId" :download="file.fileName"><i class="fa fa-download download_file" aria-hidden="true"></i></a ><i class="fa fa-times" aria-hidden="true" @click="deleteFile(file.fileDocumentId,index)"></i></span>
                                     </div>
                                 </div>
                             </div>
                             </div>
                         </div>
                       </div>
                     </div>
                     <div class="col-md-12 btn-ripple">
                        <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-orange" :disabled="enableButton" @click="raiseUat">ADD</button>

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

<!-- modal for edit  the UAT issue -->



<div class="modal fade" id="EditUATIssue" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
   <div class="modal-dialog" role="document">
      <div class="modal-content">
         <div class="modal-header bg-grey no-border">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" >Edit Issue #{{defectIdentifier}}</h4>
         </div>
         <div class="modal-body padd0">
           <div class="alert alert-danger error-color" v-if="isError">
          {{errorMessage}}
           </div>
           <ul class="nav nav-tabs nav-justified add-task-tabs" id="myTab-edit">
            <li class="active"><a data-target="#detailsUAT" data-toggle="tab">Details</a></li>
            <li v-if="defectId"><a data-target="#commentsUAT" data-toggle="tab">Comments</a></li>
              <li v-if="defectId"><a data-target="#historyUAT" data-toggle="tab">History</a></li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane active bg-light-gray" id="detailsUAT">
              <br><br>
            <div class="row">
               <div class="col-md-12">
                    <form @submit.prevent="updateUat('update-form')"  data-vv-scope="update-form">
                    <div class='form-group paddx15'>
                      <select class="form-control" v-model="selectedEpic" name="selectedEpic" @change="getStory(selectedEpic)">
                         <option  value="" selected >Select Epic </option>
                          <option  v-for="epic in allStoryAndEpics" :value="epic">{{epic.epicName}}</option>
                      </select>
                    </div>

                    <div class='form-group paddx15'>
                      <select class="form-control" v-model="selectedStory" name="selectedStory">
                        <option value="" selected >Select Story </option>
                        <option v-for="story in storyList" :value="story" v-if="selectedEpic">{{story.name}}</option>
                      </select>
                    </div>

                    <div class="form-group paddx15" v-if="role=='PROJECT_MANAGER' || role === 'ADMIN'">
                     <input type='text' class="form-control" placeholder="Defect Title" name="defectTitle" v-model="defectTitle" readonly>

                    </div>

                     <div class="form-group paddx15" :class="{'input': true, 'is-danger': errors.has('update-form.defectTitle') }" v-else>
                      <input type='text' class="form-control" placeholder="Defect Title" name="defectTitle" v-model="defectTitle" v-validate:defectTitle="'required'">
                        <p class="text-danger" v-if="errors.has('update-form.defectTitle')">Please enter defect title </p>
                     </div>
                     <div class="form-group paddx15">
                       <span v-if="role=='PROJECT_MANAGER' || role === 'ADMIN'">
                      <textarea class="form-control" placeholder="Defect Description" rows="12"  name="defectDescription" v-model="defectDescription" readonly ></textarea>
                    </span>
                    <span v-else>
                      <textarea class="form-control" placeholder="Defect Description" rows="12"  name="defectDescription" v-model="defectDescription" ></textarea>

                    </span>
                     </div>

                     <div class=" form-group customform-group paddx15 date-picker " v-if="(role === 'PROJECT_MANAGER' || role === 'ADMIN')">
                         <datepicker  :calendar-button="showCalender"  :bootstrapStyling="bootStyle" :calendarButtonIcon="calendarButtonIcon" v-on:selected="dateClick" name="estimatedArrivalDate"  v-model="estimatedArrivalDate"></datepicker>
                             <p class="text-danger" v-if="isEtaDateSelected">Please specify period of UAT Issue</p>
                   </div>

                     <div class='form-group paddx15' v-if="defectId!=null && role === 'PROJECT_MANAGER' || role === 'ADMIN'">
                     <select class="form-control" v-model="selectedDefectStatus">
                       <option value="" selected disabled>Select defect Status</option>
                        <option  v-for=" status in defectStatus" :value="status.key">{{status.value}}</option>

                     </select>
                     </div>


                     <div class="col-md-12">
                       <div class="row">
                        <div class="col-md-2">
                            <div class="uploadFile">
                            <input type="file" multiple :name="fileName" @change="filesChange($event.target.file, $event.target.files); fileCount = $event.target.files.length"
                             accept="image/*" class="input-file">
                             </div>
                        </div>
                           <p class="text-danger" v-if="isFileLarge">File size exceed max. allowed limit of 5MB</p>
                         <div class="col-md-10">
                            <div class="row">
                             <di<div class="col-md-12">
                                 <div class="col-md-4 file_upload" v-for="(file,index) in defectFiles">
                                    <div class="file_heigh_width">
                                         <span class="fileUploadCss"><p>{{file.fileName}}</p> <a :href="url+file.fileDocumentId" :download="file.fileName"><i class="fa fa-download download_file" aria-hidden="true"></i></a ><i class="fa fa-times" aria-hidden="true" @click="deleteFile(file.fileDocumentId,index)"></i></span>
                                     </div>
                                 </div>
                             </div>
                             </div>
                         </div>
                       </div>
                     </div>
                     <div class="col-md-12 btn-ripple">
                        <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-orange" :disabled="enableButton">Update</button>
                     </div>
                  </form>
               </div>
            </div>
          </div>
          <div class="tab-pane bg-light-gray" id="commentsUAT">
            <br>
            <div class="row">
              <div class="col-xs-12">
                <form data-vv-scope="Defect-comment-scope" >
                  <div class="form-group paddx15" :class="{'textarea': true, 'is-danger': errors.has('Defect-comment-scope.comment') }">
                    <textarea class="form-control" placeholder="Add comments here" rows="3" name="comment" v-model="comment" v-validate data-vv-rules="required"></textarea>
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
                       <img :src="getFileUrl+comment.defectCommentedUserProfilePictureId" alt="ProfileImage" v-if="comment.defectCommentedUserProfilePictureId!=null" class="img-circle media-object chat-image">
                         <img :src="'https://api.adorable.io/avatars/200/'+comment.defectCommentedBy" class="img-circle media-object chat-image" v-else>
                     </div>
                     <div class="media-body">
                       <span class="color-gray estValue">{{comment.defectCommentedBy}}</span>
                         <span class="pull-right">
                            <span class="color-gray estValue">{{convertUtcToLocaDateTime(comment.defectCommentedDateInMillis)}}</span>
                          <span class="color-gray">
                          </span>
                        </span>
                       <p>{{comment.comment}}</p>
                     </div>
                     <!-- <div class="media-body">
                       <span class="color-gray estValue">{{taskComment.taskCommentedBy}}</span>
                         <span class="pull-right">
                            <span class="color-gray estValue">{{convertUtcToLocaDateTime(taskComment.transactionDateInMillis)}}</span>
                          <span class="color-gray">
                          </span>
                        </span>
                       <p>{{taskComment.comment}}</p>
                     </div> -->
                   </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


           <div class="tab-pane bg-light-gray" id="historyUAT">
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
    import Datepicker from 'vuejs-datepicker';
export default{
    props:["isDefectTabClicked","updateStep"],
  data(){
    return{
      commentsCount:'',
      isEtaDateSelected:false,
      role:this.$store.getters.getLoggedInUser.role,
      estimatedArrivalDate:'',
      calendarButtonIcon:'fa fa-calendar',
      bootStyle:true,
      disabledDatePicker:true,
      showCalenderPO:true,
      showCalender:true,
      isError:false,
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
      selectedStory:'',
      fileName:'',
      defectTitle:'',
      defectDescription:'',
      defectId:null,
      defectIdentifier:'',
      defectsList:[],
      testStory:'',
      comment:'',
      file:'',
      defectFiles:[],
      defectCommentList:[],
      defectTransactionList:[],
      index:'',
      selectedEpic:'',
      selectedDefectStatus:'',
      storyList:[],
      selectedAppUserId:'',
      enableButton:false,
      fileDocumentId:'',
      selectedSeverity:'MEDIUM',
      defectStatus:[
              { key: 'OPEN', value: 'Open' },
             {key:'CLOSED' ,value: 'Closed'}
      ],
        url:this.$store.state.SERVER_URL +'/get-file/',
        getFileUrl:this.$store.state.SERVER_URL +'/get-file/',

        search:{
          searchIndex:'',
          defectStatus:'',
          epicId:'',
          userStoryId:'',
          projectId:'',
          isNextPageClicked:false,
        },
        searchEpic:'',
        searchUserStorys:[],

    }
  },
  components: {
    Datepicker
  },
  watch:{
      'isDefectTabClicked': function(newValue, oldValue) {
        if(this.isDefectTabClicked){
          this.getAllStoryandEcpics();
          this.getDefectList();
        }
        },
      },
      computed:{

        defectComments : function(){
          var app = this;
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
    dateClick(){
    var app = this;
    app.isEtaDateSelected = false;
    },

    iterateRowNum(index){
      return (this.startDefectCount+index);
    },
    openUATIssueModal(){
      this.defectId=null;
      this.defectFiles = [];
      this.defectIdentifier = '',
      this.defectDescription ='';
      this.defectTitle = '';
      this.selectedStory ='';
      this.index='';
      this.selectedSeverity='MEDIUM';
      this.selectedEpic = '',
      this.selectedAppUserId='',
      setTimeout(() => {
                  this.errors.clear();
         }, 100);
     $('#UATIssueModal').modal('show');

    },
    editUATModal(defect,index){

      var app = this;
        app.enableButton = false;
        app.defectTransactionList = [];
        app.defectFiles = [];
        app.defectCommentList = [];
        app.storyList = []
        app.selectedStory='';
        app.estimatedArrivalDate = '';
        app.isEtaDateSelected = false;
        app.selectedEpic = '',
        setTimeout(()=>{
          app.errors.clear('update-form')
          app.errors.clear('Defect-comment-scope')
        },50)


        app.index = index;
            // ***************** get comment uat Transaction ********************************
        app.$http.get(
          app.$store.state.SERVER_URL+'/api/po-dev-pm-admin/get-defect-comments-and-history-for-uat-defect/'+defect.defectId,
        {
          headers: {
            "X-Authorization": app.$cookie.get('X-Authorization')
          },
      }
    ).then(function(response){

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
        // ***************** get edit uat details ********************************
     app.$http.get(
       app.$store.state.SERVER_URL+'/api/po-dev-pm-admin/get-uat-defect-details/'+defect.defectId,
       {
         headers: {
           "X-Authorization": app.$cookie.get('X-Authorization')
         },
     }
        ).then(function(response){
           if(response.data.status =='SUCCESS'){
             app.defectId = response.data.payLoad.defectId;
             app.defectIdentifier = response.data.payLoad.defectIdentifier;
             app.defectDescription = response.data.payLoad.defectDescription;
             app.defectTitle = response.data.payLoad.defectTitle;
              app.commentsCount = response.data.payLoad.commentsCount;
             app.defectFiles = response.data.payLoad.files;
             if(response.data.payLoad.epic){
                   app.storyList = response.data.payLoad.epic.userStorys;
                   app.selectedEpic = response.data.payLoad.epic;
             }else{
               app.selectedEpic='';
             }
             app.selectedStory = response.data.payLoad.userStory ? response.data.payLoad.userStory : '';

             console.log(app.selectedStory)
             app.selectedDefectStatus = response.data.payLoad.defectStatus;

             if(response.data.payLoad.estimatedArrivalDateInMillis){
               app.estimatedArrivalDate = app.updateDate(response.data.payLoad.estimatedArrivalDateInMillis);
             }
             //app.defectFiles = response.data.payLoad ? defect.files : [];
              $('#EditUATIssue').modal('show');
           }

          });
      },
    getStory: function(selectedEpic){
      var app = this;
      app.selectedStory = ''
      app.storyList = []
      app.storyList =  (selectedEpic && selectedEpic.userStorys) ? selectedEpic.userStorys:'';
    },

    deleteFile:function(fileId,index){
        var app =this;
        var dummyObj={}
        app.$http.post(
          app.$store.state.SERVER_URL +'/api/po-pm-admin/delete-uat-defect-file/'+fileId,
          dummyObj,
        {
          headers: {
                "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
            },
        }
      ).then((response) => {
                          if(response.data.status == 'SUCCESS'){
                            app.defectFiles.splice(index,1);
                          }else{
                           app.$swal("Oops...", "Something went wrong!", "error");
                          }
           }, (response) => {
         });
   },

   raiseUat: function(){
        var app = this;
        app.$validator.validateAll();
      if (!app.errors.any()) {
        var createUat ={
          files:[],
        };
        createUat.epicId = app.selectedEpic.id;
        createUat.userStoryId = app.selectedStory.id;
        createUat.defectTitle = app.defectTitle;
        createUat.defectDescription = app.defectDescription;
        if(app.defectFiles!=null && app.defectFiles!=''){
            createUat.files = app.defectFiles;
        }
        createUat.fileDocumentId = (app.defectFiles && app.defectFiles.fileDocumentId) ? app.defectFiles.fileDocumentId : '';
        createUat.defectId  = app.defectId;
        createUat.defectStatus = app.selectedDefectStatus;
        createUat.projectId = app.$store.getters.getProjectInfo.projectId;
        var url = "/api/product-owner/save-uat-defect";
           app.sentUAT(url,createUat);
     }
   },

 updateUat(scope){
     var app = this;
     app.$validator.validateAll(scope);
     console.log(app.errors)
    if (!app.errors.any()) {
     var updateUat ={
       files:[],
     };
     updateUat.epicId = app.selectedEpic.id;
     updateUat.userStoryId = app.selectedStory.id;
     updateUat.defectTitle = app.defectTitle;
     updateUat.defectDescription = app.defectDescription;
     if(app.defectFiles!=null && app.defectFiles!=''){
        updateUat.files = app.defectFiles;
       }
     updateUat.fileDocumentId = (app.defectFiles && app.defectFiles.fileDocumentId) ? app.defectFiles.fileDocumentId : '';
     updateUat.defectId  = app.defectId;
     updateUat.defectStatus = app.selectedDefectStatus;
     updateUat.projectId = app.$store.getters.getProjectInfo.projectId;
     var url="";
     if(app.role=="PROJECT_MANAGER"){
        if(app.estimatedArrivalDate != '' && app.estimatedArrivalDate != null){
         updateUat.estimatedArrivalDate = moment(app.estimatedArrivalDate).format('DD-MMM-YYYY');
         url="/api/pm-admin/update-uat-defect";
          app.sentUAT(url, updateUat);
        }else{
         app.isEtaDateSelected = true;
        }
     }else{
       url="/api/product-owner/save-uat-defect";
        app.sentUAT(url, updateUat);
     }
}

},


   sentUAT(url,createUat){
     var app = this;
      app.enableButton=true;
      app.$store.commit('setSpinner',true);
        app.$http.post(app.$store.state.SERVER_URL +url,
          createUat,
           {
                headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')
                   },
           }).then((response) => {
             app.enableButton=false;
             if(response.data.status=='SUCCESS'){
               app.defectFiles=[];
               app.enableButton=false;
               if(app.defectId!=null && app.defectId !=''){
                 app.enableButton=false;
                app.defectsList.splice(app.index, 1, response.data.payLoad);
                $('#EditUATIssue').modal('hide');
               }else{
                 app.enableButton=false;
                if(app.defectsList){
                      app.defectsList.unshift(response.data.payLoad);
                }else{
                  app.defectsList=[];
                    app.defectsList.push(response.data.payLoad);
                }
               }
                $('#UATIssueModal').modal('hide');
             }else{
               app.errorMessage = response.data.errorMessage;
               app.isError=true;
               setTimeout(function () {
               app.isError=false;
             }, 3000)
               app.enableButton=false;
             }
       }, (response) => {
     });
      app.$store.commit('setSpinner',false);
   },

   saveComment: function(){
           var app = this;
            var comment = {};
            comment.defectId = app.defectId;
            comment.comment = app.comment;
            app.$validator.validateAll('Defect-comment-scope');
            console.log(app.errors);
              if (!app.errors.any()) {
               app.$http.post(app.$store.state.SERVER_URL +'/api/po-pm-admin/save-comment-for-uat-defect',comment,
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

                  }, (response) => {
                });
}
   },
   filesChange(fieldName, fileList) {
 var app = this;
 var formData = new FormData();
  if (!fileList.length) return;

  Array
 .from(Array(fileList.length).keys())
 .map(x => {
 formData.append('file', fileList[x], fileList[x].name);
});
    if(fileList[0].size <=5000000){
       app.isFileLarge= false;
        app.$store.commit('setSpinner',true);
    app.$http.post(app.$store.state.SERVER_URL +'/upload-orphan-document', formData,
     {
          headers: {
                 "X-Authorization": app.$cookie.get('X-Authorization')

             },
     }).then((response) => {
        app.$store.commit('setSpinner',false);
          // console.log(response.data.payLoad);
          if(app.defectFiles){
              app.defectFiles.push(response.data.payLoad);
          }else{
          //  console.log("------file responxe---------",response.data.payLoad);
            app.defectFiles=[];
              app.defectFiles.push(response.data.payLoad);
          }

 }, (response) => {
});
}else{
app.isFileLarge= true;

}

},


   capitalize(defectTransaction){
     var assignee = '';
     var stringValue = '';
     if(defectTransaction.defectAssigneeFullName != null){
       assignee = " & assigned to "+defectTransaction.defectAssigneeFullName;
     }
     if(defectTransaction.isFirstTransaction){
      return stringValue = 'created UAT'+assignee;
     }else if(defectTransaction.isDefectStatusChanged ){
       return stringValue = defectTransaction.defectTransactionStatus;
     }else{
       return stringValue = 'Updated UAT';
     }
   },
   clearSearch(){
     var app = this;
     app.searchEpic =''
     app.searchUserStorys=''
     app.search.searchIndex=''
     app.search.defectStatus=''
     app.search.epicId=''
     app.search.userStoryId=''
     app.pageNumber = 0;
     app.noOfPages = '';
     app.onloadPagination='pagination-color'
     app.searchUat();
   },
   keymonitor(e){
     var app = this;
     if((app.search.searchIndex && app.search.searchIndex.length > 2) || (app.search.searchIndex == '')){
          app.search.pageNumber = 0;
          app.searchUat();
     }
   },
   getNextPage(pageNumber){
     var app =this;
     app.search.pageNumber = pageNumber;
     app.pageNumber = pageNumber
     app.onloadPagination = '';
     app.isSearched = false;
     app.search.isNextPageClicked = true;
     app.searchUat();
   },
    getSelectedSearchStory(epic){
     var app = this;
     app.search.epicId ='';
     app.search.userStoryId = '',
     app.searchUserStorys = [];
     app.search.epicId = epic.id?epic.id:'';
     app.searchUserStorys = epic.userStorys?epic.userStorys:[];
     app.searchUat();
    },
    searchUat(){
    var app = this;
     app.noOfPages = '';
     app.recordPerPage = ''
     app.showData = 'hidden';
     app.search.projectId = app.$store.getters.getProjectInfo.projectId;
     app.$store.commit('setSpinner',true);
      app.$http.post(
      app.$store.state.SERVER_URL+'/api/po-dev-pm-admin/search-uat',
      app.search,
    {
      headers: {
            "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
        },
    }
    ).then(function(response){
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
    getDefectList: function(){
      var app =this;
         app.$store.commit('setSpinner',true);
      this.$http.get(
        app.$store.state.SERVER_URL+'/api/po-dev-pm-admin/get-uat-defects-in-project/'+app.$store.getters.getProjectInfo.projectId,
      {
        headers: {
          "X-Authorization": app.$cookie.get('X-Authorization')
        },
    }
  ).then(function(response){
        if(response.data.status =='SUCCESS'){
            app.defectsList  =response.data.payLoad.defects;
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

    getAllStoryandEcpics: function(){
      var app =this;
      app.showData = 'hidden';
      app.pageNumber = 0;
      app.noOfPages = '';
      app.totalDefectCount = '';
      app.startDefectCount = '';
      app.endDefectCount = '';
      app.onloadPagination = '';
         app.$store.commit('setSpinner',true);
      this.$http.get(
        app.$store.state.SERVER_URL+'/api/po-dev-pm-admin/get-epics-and-stories-in-project/'+app.$store.getters.getProjectInfo.projectId,
      {
        headers: {
          "X-Authorization": app.$cookie.get('X-Authorization')
        },
    }
  ).then(function(response){

        if(response.data.status =='SUCCESS'){
            app.allStoryAndEpics = response.data.payLoad;
            app.pagination = [];
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




    convertUtcToLocaDateTime(date){
     var moment = require('moment-timezone');
     var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     if(date){
       return moment(date).tz(timeZone).format('DD-MM-YYYY HH:mm')
     }else{
       return date;
     }
   },
   convertUtcToLocaDateTimeUAT(date){
    var moment = require('moment-timezone');
    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if(date){
      return moment(date).tz(timeZone).format('DD-MM-YYYY')
    }else{
      return date;
    }
  },
   updateDate(date){
     var moment = require('moment-timezone');
     var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     if(date){
       return moment(date).tz(timeZone).format('DD-MMM-YYYY')
     }else{
       return date;
     }

   }
  }
}
</script>
