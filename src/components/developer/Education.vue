<template>
<div>


  <!-- wizard section-->

  <div class="row">
    <div class="lg-container col-md-10 col-md-offset-1">
      <div class="profile-main-content">
        <div class="form-section  form-section-padding-others">
          <h4 class="header_things">What have you Studied ?<br>
                        <small>(in reverse chronological Order)</small>
                    </h4>
          <div class="row">
            <div class="col-md-12">
              <button type="button" class="btn btn-light-blue " @click="addMoreSchool()">Add More</button>

            </div>
          </div>

          <!-- these div we are using for first time he is going to add school-->

          <div class="eductaion-border" v-if="checkAddmore()">
            <div class="row educ-border-bottom">
              <div class="col-md-6">
                <div class="col-md-12">
                  <label class="control-label label-newsize">School<span class="mandatory">*</span></label>
                </div>
                <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('name') }">
                  <div class="col-md-12">
                    <input type="text" class="form-control" name="name" v-model="school.name" v-validate data-vv-rules="required">
                    <p class="text-danger" v-if="errors.has('name')">Please enter school name</p>
                  </div>
                </div>

              </div>

              <div class="col-md-6">
                <div class="col-md-12 ">
                  <label class="control-label label-newsize">Course<span class="mandatory">*</span></label>
                </div>
                <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('course') }">
                  <div class="col-md-12">
                    <input type="text" class="form-control" name="course" v-model="school.course" v-validate data-vv-rules="required">
                    <p class="text-danger" v-if="errors.has('course')">Please enter course name</p>
                  </div>
                </div>
              </div>

            </div>

            <div class="row educ-border-bottom">
              <div class="col-md-6">
                <div class="col-md-12 ">
                  <label class="control-label label-newsize">Area Of Study<span class="mandatory">*</span></label>
                </div>
                <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('areaOfStudy') }">
                  <div class="col-md-12">
                    <input type="text" class="form-control" name="areaOfStudy" v-model="school.areaOfStudy" v-validate data-vv-rules="required">
                    <p class="text-danger" v-if="errors.has('areaOfStudy')">Please specify area of study</p>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="col-md-12 ">
                  <label class="control-label label-newsize">Period<span class="mandatory">*</span></label>
                </div>

                <div class="col-md-5">
                  <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('fromDate') }">
                    <div class="input-group date" id="datetimepicker1">
                      <datepicker :disabled="state.disabled" placeholder="DD/MMM/YYYY" name="fromDate" class="form-control" v-model="school.fromDate" v-validate data-vv-rules="required" v-on:selected="disableFrom"></datepicker>
                      <p class="text-danger" v-if="errors.has('fromDate')">Please specify period of the course</p>
                      <!--  <i class="fa fa-calendar" aria-hidden="true"></i>-->
                    </div>
                  </div>
                </div>
                <div class="col-md-1">
                  <span class="dev-data-pick">to</span>
                </div>
                <div class="col-md-6">
                  <div class=" form-group customform-group" :class="{'date': true, 'is-danger': errors.has('toDate') }">
                    <div class="input-group date" id="datetimepicker2">
                      <datepicker :disabled="disabled" placeholder="DD/MMM/YYYY" name="toDate" class="form-control" v-model="school.toDate" v-validate data-vv-rules="required"></datepicker>
                      <p class="text-danger" v-if="errors.has('toDate')">Please specify period of the course</p>

                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div class="row">
              <form enctype="multipart/form-data" novalidate>
                <div class="col-md-12">
                  <label class=" col-lg-12 col-md-12 control-label ">Document Upload<span class="mandatory">*</span></label>
                  <div class="col-md-2">
                    <div class="uploadFile">
                      <input type="file" multiple @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
                    </div>
                  </div>
                  <p class="text-danger" v-if="isFileLarge">File size exceed max. allowed limit of 5MB</p>
                  <p class="text-danger" v-if="isFileEmpty">Please upload corresponding education proof</p>
                  <div class="col-md-10">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="col-md-4 file_upload" v-for="(file,index) in files">
                          <div class="file_heigh_width">
                            <span class="fileUploadCss"><p>{{file.fileName}}</p> <a :href="url+file.fileDocumentId" :download="file.fileName"><i class="fa fa-download download_file" aria-hidden="true"></i></a ><i class="fa fa-times" aria-hidden="true" @click="deleteFile(file.fileDocumentId,index)"></i></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>





          </div>
          <div class="row text-center margintop-10" v-if="schoolId != ''">
            <button type="button" class="btn btn-light-blue " @click="addMoreSchool()">Update</button>

          </div>

          <!--  end of first time going to add school-->



          <div class="margin-top">
            <div class="panel-group" id="accordion">
              <div class="panel panel-default accordion-platform" v-for=" (school,index) in schoolList">
                <div class="panel-heading">
                  <div class="dev-font-icon">
                    <li class="list-group-item dev-edit-dele-icon" @click="editSchool(school)"><a type="button" class="cursor-pointer"><i class="fa fa-pencil " aria-hidden="true"></i></a></li>
                    <li class="list-group-item dev-edit-dele-icon" @click="deleteSchool(school,index)"><a type="button" class="cursor-pointer"><i class="fa fa-trash-o " aria-hidden="true"></i></a></li>
                  </div>


                  <h4 class="panel-title">
                                        <a data-toggle="collapse" data-parent="#accordion" :href="'#'+index">
                                            <!--<span class="dev-heading-col">School:-</span>--> {{school.name}}</a>
                                    </h4>
                </div>
                <div :id="index" class="panel-collapse collapse">
                  <div class="panel-body">
                    <div class="dev-empl-padding">
                      <p>
                        <!--<span class="dev-accord-color">Course : </span>-->{{school.course}}</p>
                      <p>
                        <!--<span class="dev-accord-color"> Area of Study :</span>-->{{school.areaOfStudy}}</p>
                      <p> {{dateFormate(school.fromDateInMillis)}}<span class="dev-emp-date-acc">to</span> {{dateFormate(school.toDateInMillis)}}</p>
                      <p>
                        <!--<span class="dev-accord-color">To Date : </span>--></p>
                    </div>
                    <div class="row">



                      <!-- <div class="col-md-12">
                                                            <div class="col-md-4 file_upload" v-for="(file,index) in school.files">
                                                               <div class="file_heigh_width">
                                                                    <span class="fileUploadCss"><p>{{file.fileName}}</p> <a :href="url+file.fileDocumentId" :download="file.fileName"><i class="fa fa-download download_file" aria-hidden="true"></i></a ></span>
                                                                </div>
                                                            </div>
                                                        </div> -->
                      <div class="col-md-12">
                        <ul class="listOfAttachments">
                          <li v-for="(file,index) in school.files" class="file_upload_top_10 dev-empl-padding">
                            <!-- <div class="file_heigh_width"> -->
                            <a :href="url+file.fileDocumentId" :download="file.fileName" target="_blank">
                              <p class="downloadFile">{{file.fileName}}</p>
                            </a>
                            <!-- </div> -->
                          </li>
                        </ul>
                      </div>


                    </div>


                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
      <div class="profile-main-content-footer text-center">
        <button type="button" class="btn btn-gray pull-left" @click="goprevious">Back</button>
        <button type="button" class="btn btn-orange pull-right" @click="submitSchoolInfo">Next</button>
      </div>

    </div>
  </div>


</div>
</template>
<script>

</script>
<script>
import adminHeader from "../../adminHeader.vue"
import Datepicker from 'vuejs-datepicker';

var state = {
  date1: new Date()
}

export default {
  props: ['updateStep'],

  data() {
    return {
      school: {
        schoolInfoId: '',
        name: '',
        course: '',
        areaOfStudy: '',
        fromDate: '',
        fromDateInMillis:'',
        fromDateInMillis:'',
        toDate: '',
        files: [],
      },
      schoolList: '',
      isAddmore: false,
      isFileEmpty: false,
      isFileLarge: false,

      schoolId: '',
      url: this.$store.state.SERVER_URL + '/download-file/',
      files: [],
      disabled: {},
      disabledFrom: {},
      eventMsg: null,

      state: {
        disabled: {
          to: null, // Disable all dates up to specific date
          from: new Date(), // Disable all dates after specific date
          days: [], // Disable Saturday's and Sunday's
          dates: [ // Disable an array of dates

          ]
        }


      }
    }

  },
  mounted: function() {
    this.getEducationDetails();

  },
  methods: {
    checkAddmore: function() {
      if (this.schoolList == '' || this.isAddmore == true) {
        return true;
      } else {
        return false;
      }

    },
    changedStep: function() {

      // console.log("profile page updateState"+this.updateStep);
    },
    goprevious: function() {
      //this.updateStep=2;
      this.$store.commit('setDeveloperWizardStep', 2);
      //this.$emit('changedWizarStep',this.updateStep);
      //  console.log("profile page updateState"+this.updateStep);
    },

    getEducationDetails: function() {
      var app = this;
       app.$store.commit('setSpinner',true);
      app.$http.get(
        this.$store.state.SERVER_URL + '/api/developer/get-developer-school-infos', {
          headers: {
            "X-Authorization": app.$cookie.get('X-Authorization')

          },

        }
      ).then(function(response) {
 			app.$store.commit('setSpinner',false);
        app.schoolList = response.data.payLoad;
        // app.isAddmore = false;
        console.log("school details");
        console.log(app.schoolList);


      });

    },

    filesChange(fieldName, fileList) {
      var app = this;
      const formData = new FormData();
      if (!fileList.length) return;
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append('file', fileList[x], fileList[x].name);
        });
      if (fileList[0].size <= 5000000) {
        app.isFileLarge = false;
         app.$store.commit('setSpinner',true);
        app.$http.post(app.$store.state.SERVER_URL + '/upload-orphan-document', formData, {
          headers: {
            "X-Authorization": app.$cookie.get('X-Authorization')

          },
        }).then((response) => {
           app.$store.commit('setSpinner',false);
          console.log("response.playLoad");
          app.isFileEmpty = false;
          //  fileList=[];
          app.files.push(response.data.payLoad);

        }, (response) => {});
      } else {
        app.isFileLarge = true;
      }

    },
    deleteFile: function(fileId, index) {
      var app = this;
      var deleteFileUrl = '';
      if (this.schoolId != null && this.schoolId != '') {

        deleteFileUrl = app.$store.state.SERVER_URL + '/api/developer/delete-school-info-document/' + fileId + '/' + this.schoolId;

      } else {
        deleteFileUrl = app.$store.state.SERVER_URL + '/delete-orphan-document/' + fileId;
      }

      app.$http.post(deleteFileUrl, app.school, {

        headers: {
          "X-Authorization": app.$cookie.get('X-Authorization')

        },

      }).then((response) => {
        app.files.splice(index, 1);
        // console.log("response.playLoad.data"+response.data.payLoad);


      }, (response) => {});
    },
    submitSchoolInfo: function() {

      var app = this;
      console.log(app.school);
      // GET request
      if (app.files != null && app.files != '') {
        app.school.files = app.files;
      }
      console.log("school file are-----------------");

      var schoolInfo = app.school;
      schoolInfo.fromDate = moment(schoolInfo.fromDate).format('DD-MMM-YYYY');
      schoolInfo.toDate = moment(schoolInfo.toDate).format('DD-MMM-YYYY');
      //clear the school object after update the record ,make empty the form for new object



      app.$validator.validateAll();
      if (!app.errors.any()) {
        if (app.school.files.length == 0) {
          app.isFileEmpty = true;
        } else {
          app.isFileEmpty = false;
          app.files = [];
          app.school = {};
          app.$http.post(
            app.$store.state.SERVER_URL + '/api/developer/save-developer-school-info',
            schoolInfo, {
              headers: {
                "X-Authorization": app.$cookie.get('X-Authorization')

              },

            }

          ).then(function(response) {
            console.log(response.data);
            if (response.data.status == "SUCCESS") {
              app.schoolList = response.data.payLoad;
              app.files = [];

              app.isAddmore = false;
              setTimeout(() => {
                app.errors.clear();
              }, 5);
              //app.updateStep = 4;
              app.$store.commit('setDeveloperWizardStep', 4);

            } else {
              setTimeout(() => {
                app.errors.clear();
              }, 100);
              //console.log('Error!:', response.data.errorMessage);
            }


          }, function(response) {
            setTimeout(() => {
              console.log("set time out ");
              app.errors.clear();
            }, 100);
            console.log('Error!:', response.data);

          });
        }

      } //end of validation

      if (app.schoolList != '' && (app.school.name == null || app.school.name == '')) {
        app.$store.commit('setDeveloperWizardStep', 4);
      }

    },

    addMoreSchool: function() {
      var app = this;
      if (app.files != null && app.files != '') {
        app.school.files = app.files;
      }
      if (app.schoolId != '') {
        app.isAddmore = false;
      }
      app.isAddmore = true;
      var schoolInfo = app.school;
      console.log("from date---------" + schoolInfo.fromDate);
      console.log("to date---------" + schoolInfo.toDate);
      //clear the school object after update the record ,make empty the form for new object
      if (schoolInfo.name != null && schoolInfo.name != '') {
        app.$validator.validateAll();
        if (!app.errors.any()) {
          console.log("education------------files----------");
          console.log(app.school.files);
          if (app.school.files == null || app.school.files.length == 0) {
            app.isFileEmpty = true;
          } else {

            this.schoolId = '';
            app.isFileEmpty = false;

            app.files = [];
            app.school = {};
            schoolInfo.fromDate = moment(schoolInfo.fromDate).format('DD-MMM-YYYY');
            schoolInfo.toDate = moment(schoolInfo.toDate).format('DD-MMM-YYYY');
            app.$http.post(
              app.$store.state.SERVER_URL + '/api/developer/save-developer-school-info',
              schoolInfo, {
                headers: {
                  "X-Authorization": app.$cookie.get('X-Authorization')

                },

              }

            ).then(function(response) {
              //  console.log("after saving data");
              if (response.data.status == "SUCCESS") {
                //    console.log("name---");
                console.log("response are in add more------");
                console.log(response.data.payLoad.name);
                app.schoolList = response.data.payLoad;
                setTimeout(() => {
                  app.errors.clear();
                }, 10);

              } else {
                setTimeout(() => {
                  app.errors.clear();
                }, 10);
                console.log('Error!:', response.data.errorMessage);
              }

            }, function(response) {
              setTimeout(() => {
                app.errors.clear();
              }, 10);
              console.log('Error!:', response.data);

            });
          } //end of if for  file validation
        } //end of validation if
      } //end of check nul if

    },
    editSchool: function(school) {
      this.school = school;
      this.schoolId = school.schoolInfoId;
      this.isAddmore = true;
      this.files = school.files;

    },
    deleteSchool: function(school, index) {
      var app = this;
      console.log(school);
      app.$http.post(app.$store.state.SERVER_URL + '/api/developer/delete-school-info/' + school.schoolInfoId, school, {
        headers: {
          "X-Authorization": app.$cookie.get('X-Authorization')

        },

      }).then((response) => {
        console.log("response.playLoad.data");

        app.schoolList.splice(index, 1);
      }, (response) => {});

    },


    disableFrom(val) {
      console.log("-----coll the school in education from date--------------");
      this.school.toDate = '';
      if (typeof this.disabled.from == 'undefined') {
        this.disabled = {
          to: this.disabled.from,
          from: null
        };
      }
      this.disabled.to = val;
    },

    dateFormate: function(value) {
      //console.log(moment(value).format('DD/MM/YYYY'));
      return moment(value).format('DD-MMM-YYYY');
    }


  },
  components: {
    "app-adminHeader": adminHeader,
    Datepicker
  },
}
</script>
<style scoped="true">
.input-hidden {
  display: none !important;
}


/*.container{
        height: calc(100vh - (101px)) !important;
    }*/

.profile-main-content {
  height: 73vh;
  overflow: hidden;
  overflow-y: scroll;
}
.profile-main-content {
    padding-right: 40px;
    padding-left: 40px;
}
.btn-light-blue {
    margin-bottom: 33px;
}

</style>
