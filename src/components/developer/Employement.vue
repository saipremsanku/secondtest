<template>
    <div>
        <app-adminHeader></app-adminHeader>

        <!-- wizard section-->


                <div class="row">
                    <div class="lg-container col-md-10 col-md-offset-1">
                        <div class="profile-main-content">
                            <div class="form-section  form-section-padding-others">
                                <h4 class="header_things">Employment History<br>
                                    <small>(in reverse chronological Order)</small>
                                </h4>
                                 <div class="row">
                                    <div class="col-md-12">
                                    <button type="button" class="btn btn-light-blue " @click="addMoreEmployement()" >Add More</button>

                                    </div>
                                    </div>


                                <!--adding new employement-->

                              <div class="eductaion-border" v-if="checkAddmore()">
                                <div class="row educ-border-bottom">
                                    <div class="col-md-6">
                                        <div class="col-md-12 ">
                                            <label class="control-label label-newsize" >Company<span class="mandatory">*</span></label>
                                        </div>
                                        <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('companyName') }">
                                          <div class="col-md-12">
                                            <input  name="companyName" type="text"  class="form-control" v-model="employeement.companyName" v-validate data-vv-rules="required">
                                            <p class="text-danger" v-if="errors.has('companyName')">Please enter company name</p>
                                          </div>
                                        </div>

                                    </div>

                                 <div class="col-md-6">
                                        <div class="col-md-12 ">
                                            <label class="control-label label-newsize" >Designation<span class="mandatory">*</span></label>
                                        </div>
                                        <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('designation') }">
                                          <div class="col-md-12">
                                            <input  name="designation" type="text"  class="form-control" v-model="employeement.designation" v-validate data-vv-rules="required">
                                              <p class="text-danger" v-if="errors.has('designation')">Please specify designation </p>
                                          </div>
                                        </div>
                                    </div>

                                </div>



                                  <div class="row educ-border-bottom">
                                    <div class="col-md-6">
                                        <div class="col-md-12 ">
                                            <label class="control-label label-newsize" >Country<span class="mandatory">*</span></label>
                                        </div>
                                        <div class=" form-group customform-group">
                                          <div class="col-md-12">
                                            <select class="form-control" name="countryId" v-model="employeement.countryId" :class="{'select': true, 'is-danger': errors.has('countryId')}" v-validate:competencyLevel1="'required'">
                                                 <option value="" disabled>select country</option>
                                                <option value="1">India</option>
                                                <option value="2">PAk</option>
                                                <option value="3">Lanka</option>

                                            </select>
                                                  <p class="text-danger" v-if="errors.has('countryId')">Please select a country </p>
                                          </div>
                                        </div>

                                    </div>

                                 <div class="col-md-6">
                                        <div class="col-md-12 ">
                                            <label class="control-label label-newsize" >City<span class="mandatory">*</span></label>
                                        </div>
                                        <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('city') }">
                                            <div class="col-md-12 ">
                                         <input  name="city" type="text"  class="form-control"  v-model="employeement.city" v-validate data-vv-rules="required">
                                           <p class="text-danger" v-if="errors.has('city')">Please enter city</p>
                                        </div>

                                        </div>
                                    </div>

                                </div>
                                <div class="row educ-border-bottom">

                                          <div class="col-md-6">
                                        <div class="col-md-12 ">
                                            <label class="control-label label-newsize" >Period<span class="mandatory">*</span></label>
                                        </div>

                                          <div class="col-md-5">
                                              <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('fromDate') }">
                                              <div class="input-group date" id="datetimepicker1">
                                                 <datepicker :disabled="state.disabled" placeholder="DD/MM/YYYY"  name="fromDate" class="form-control" v-model="employeement.fromDate" v-validate data-vv-rules="required" v-on:selected="disableFrom" ></datepicker>
                                                      <p class="text-danger" v-if="errors.has('fromDate')">Please specify period of the employment</p>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="col-md-1" v-if="!isCurrentWorking">
                                            <span class="dev-data-pick">to</span>
                                          </div>

                                         <div class="col-md-6" v-if="!isCurrentWorking">
                                             <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('toDate') }">
                                             <div class="input-group date" id="datetimepicker2">
                                          <datepicker :disabled="stateTo.disabled"  placeholder="DD/MM/YYYY" name="toDate" class="form-control"  v-model="employeement.toDate" v-validate data-vv-rules="required"></datepicker>
                                              <p class="text-danger" v-if="errors.has('toDate')">Please specify period of the employment</p>
                                        </div>
                                          </div>
                                        </div>
                                    </div>
                                        <div class="col-md-6">
                                            <div class="col-md-12 ">
                                            <label class="control-label label-newsize" ></label>
                                        </div>

                                        <div class=" form-group customform-group">
                                <div class="checkbox">
                                   <label><input type="checkbox"  v-model="isCurrentWorking">Currently working here</label>
                                   </div>
                                         </div>
                                    </div>
                                    </div>
                                    <div class="row educ-border-bottom">
                                         <div class="form-group">
                                             <div class="col-md-12">
                                              <label for="comment"> Brief Work Description</label>
                                              <textarea class="form-control" rows="5" id="Work Description" name="description" v-model="employeement.workDescription"></textarea>
                                                </div>
                                            </div>
                                     </div>

                                      <div class="row">
                                        <form enctype="multipart/form-data" novalidate>
                                            <div class="col-md-12">
                                                <label class=" col-lg-12 col-md-12 control-label ">Document Upload<span class="mandatory">*</span></label>
                                                <div class="col-md-2">
                                                    <div class="uploadFile">
                                                        <input type="file" multiple  @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="image/*" class="input-file">
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

                                <div class="row text-center margintop-10" v-if="editEmplId != ''">
                                        <button type="button" class="btn btn-light-blue " @click="addMoreEmployement()">Update</button>

                         </div>



                           <!--     display the list of employement-->








   <div class="margin-top">
    <div class="panel-group" id="accordion">
        <div class="panel panel-default accordion-platform" v-for=" (employeement,index) in employeementList">
            <div class="panel-heading">
                <div class="dev-font-icon">
                    <li class="list-group-item dev-edit-dele-icon" @click="editEmployeement(employeement)"><a type="button" class="cursor-pointer"><i class="fa fa-pencil " aria-hidden="true"></i></a></li>
                    <li class="list-group-item dev-edit-dele-icon" @click="deleteEmployment(employeement,index)"><a type="button" class="cursor-pointer"><i class="fa fa-trash-o " aria-hidden="true"></i></a></li>
                </div>


                <h4 class="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" :href="'#'+index">
                        <!--<span class="dev-heading-col">Company Name:-</span>--> {{employeement.companyName}}</a>
                </h4>
            </div>
            <div :id="index" class="panel-collapse collapse">
                <div class="panel-body ">
                  <div class="dev-empl-padding">
                   <p><!--<span class="dev-accord-color">Designation : </span>-->{{employeement.designation}}</p>
                    <p><!--<span class="dev-accord-color"> Country :</span>--> {{employeement.countryId}}</p>
                    <p><!--<span class="dev-accord-color">City :</span>--> {{employeement.city}}</p>

                    <p> {{dateFormate(employeement.fromDate)}}<span class="dev-emp-date-acc">to</span> {{dateFormate(employeement.toDate)}}</p>
                    <p><!--<span class="dev-accord-color">Work Description : </span>-->{{employeement.workDescription}}</p>
                  </div>

                                <div class="row">
                                        <!-- <div class="col-md-12">
                                            <div class="col-md-4 file_upload" v-for="(file,index) in employeement.files">
                                               <div class="file_heigh_width">
                                                    <span class="fileUploadCss"><p>{{file.fileName}}</p> <a :href="url+file.fileDocumentId" :download="file.fileName"><i class="fa fa-download download_file" aria-hidden="true"></i></a ></span>
                                                </div>
                                            </div>
                                        </div> -->
                                        <div class="col-md-12">
                                          <ul class="listOfAttachments">
                                              <li  v-for="(file,index) in employeement.files" class="file_upload_top_10 dev-empl-padding">
                                                    <!-- <div class="file_heigh_width"> -->
                                                      <a :href="url+file.fileDocumentId" :download="file.fileName" target="_blank">  <p  class="downloadFile">{{file.fileName}}</p></a>
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
                        <button type="button" class="btn btn-orange pull-right" @click="employemmentForm">Submit</button>
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

    export default {
        props: ['updateStep'],
        data() {
            return {
                isAddmore: false,
                employeement: {
                    'employmentInfoId': '',
                    'companyName': '',
                    'city': '',
                    'countryId': '',
                    'designation': '',
                    'fromDate': '',
                    'toDate': '',
                    'isCurrentPlaceOfWork':'',
                    'workDescription': '',

                    files:[],

                },
                employeementList: '',
                editEmplId:'',
                isFileLarge:false,
                isFileEmpty:false,
                files:[],
                isCurrentWorking:false,
                 disabled: {},
                 url:this.$store.state.SERVER_URL +'/download-file/',
                 state:{
                         disabled: {
                             to: null, // Disable all dates up to specific date
                             from: new Date(), // Disable all dates after specific date
                             days: [], // Disable Saturday's and Sunday's
                             dates: [ // Disable an array of dates

                             ]
                         }


               },
               stateTo:{
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
            this.getEmployemnetDetails();
        },
        computed: {


        },
        methods: {


            checkAddmore: function() {
                console.log("add more------");
                if (this.employeementList == '' || this.isAddmore == true) {
                    return true;
                } else {
                    return false;
                }

            },
            goprevious: function() {
                this.$store.commit('setDeveloperWizardStep', 3);

            },

            getEmployemnetDetails: function() {
                var app = this;
                app.$store.commit('setSpinner',true);
                app.$http.get(
                    app.$store.state.SERVER_URL + '/api/developer/get-developer-employment-infos', {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')

                        },

                    }
                ).then(function(response) {
                  app.$store.commit('setSpinner',false);

                    app.employeementList = response.data.payLoad;
                    console.log(app.employeementList);


                });

            },


                filesChange(fieldName, fileList) {
                // handle file changes
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
                        app.$http.post(app.$store.state.SERVER_URL + '/upload-orphan-document', formData,
                                {
                                     headers: {
                                            "X-Authorization": app.$cookie.get('X-Authorization')
                                        },
                                }).then((response) => {
                                        console.log("response.playLoad");
                                                  app.isFileEmpty= false;
                                         console.log(response.data.payLoad);
                                          app.files.push(response.data.payLoad);
                                        // app.employeement.files.push(response.data.payLoad);
                            }, (response) => {
                          });
                        }else{
                              app.isFileLarge = true;

                        }

                      },

    deleteFile:function(fileId,index){
        var app =this;


        var deleteFileUrl='';
       if(this.editEmplId!=null && this.editEmplId!=''){

         deleteFileUrl=app.$store.state.SERVER_URL +'/api/developer/delete-employment-info-document/'+fileId+'/'+this.editEmplId;

       }else{
            deleteFileUrl=app.$store.state.SERVER_URL +'/delete-orphan-document/'+fileId;
       }

        app.$http.post(deleteFileUrl,app.employeement,
            {
                 headers: {
                    "X-Authorization": app.$cookie.get('X-Authorization')

                    },

                   }).then((response) => {
                    console.log("response.playLoad.data");
                   // console.log(response.data.payLoad);
                  //   app.employeement.files.splice(index,1);
                       app.files.splice(index,1);
                    }, (response) => {
                  });

           },


            // GET request
            employemmentForm: function() {
                var app = this;
                console.log("employeement data");
                var obj = {};

                console.log(obj);
              //  app.employeement.files = app.files;
              if(app.files != null && app.files != ''){
                  app.employeement.files = app.files;
              }
              app.employeement.isCurrentPlaceOfWork =app.isCurrentWorking;

                  var employeementInfo = app.employeement;
                  employeementInfo.fromDate = moment(employeementInfo.fromDate).format('DD-MMM-YYYY');
                  employeementInfo.toDate = moment(employeementInfo.toDate).format('DD-MMM-YYYY');


                  app.$validator.validateAll();
                    if (!app.errors.any()) {
                      if(app.employeement.files.length==0){
                        app.isFileEmpty= true;

                      }else{
                          app.isFileEmpty= false;
                          app.files=[];
                          app.employeement={};
                          app.$http.post(
                            app.$store.state.SERVER_URL + '/api/developer/save-developer-employeement-info',
                             employeementInfo, {
                                headers: {
                                    "X-Authorization": app.$cookie.get('X-Authorization')

                                },

                            }

                        ).then(function(response) {
                            console.log(response.data);
                            console.log(app.$cookie.get('isDeveloperEligible'));
                            if (response.data.status == "SUCCESS") {
                                console.log("sucess");
                                app.employeementList = response.data.payLoad;
                                app.isAddmore = false;
                                  app.$store.commit('setDeveloperWizardStep', 1);
                                if(app.$store.getters.getLoggedInUser.isDeveloperEligible){
                                      app.$router.push('/developer/dashboard');
                                }else{
                                    app.$router.push('/developer/get-coupon');
                                }

                            } else {
                               app.$store.commit('setDeveloperWizardStep', 1);
                                 if(app.$store.getters.getLoggedInUser.isDeveloperEligible){
                                      app.$router.push('/developer/dashboard');
                                }else{
                                    app.$router.push('/developer/get-coupon');
                                }
                            }
                        }, function(response) {
                            console.log('Error!:', response.data);

                        });
              }
              }

                if (app.employeementList != '' && (app.employeement.companyName == null||app.employeement.companyName == '')) {

                  if(app.$store.getters.getLoggedInUser.isDeveloperEligible){
                        app.$store.commit('setDeveloperWizardStep', 1);
                         app.$router.push('/developer/dashboard');
                   }else{
                       app.$router.push('/developer/get-coupon');
                   }

                }

            },
            addMoreEmployement: function() {
                var app = this;
          if(app.editEmplId == ''){
                app.isAddmore = true;
              }


                if(app.files != null && app.files != ''){
                    app.employeement.files = app.files;
                }

                app.employeement.isCurrentPlaceOfWork =app.isCurrentWorking;
                var employeementInfo = app.employeement;
                employeementInfo.fromDate = moment(employeementInfo.fromDate).format('DD-MMM-YYYY');
                employeementInfo.toDate = moment(employeementInfo.toDate).format('DD-MMM-YYYY');
                //make empty in updating time form for adding new object

                if(employeementInfo.companyName != null && employeementInfo.companyName != ''){
                  app.$validator.validateAll();
                    if (!app.errors.any()) {
                      if(app.employeement.files ==null || app.employeement.files.length==0){
                        app.isFileEmpty= true;

                      }else{
                          app.isFileEmpty= false;

                app.$http.post(
                    app.$store.state.SERVER_URL + '/api/developer/save-developer-employeement-info',
                    employeementInfo, {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')

                        },

                    }

                ).then(function(response) {
                    console.log(response.data);
                    if (response.data.status == "SUCCESS") {
                      app.files=[];
                      app.employeement={};
                      if(app.editEmplId != ''){
                          app.isAddmore = false;
                      }
                        app.editEmplId = '';
                        console.log("sucess");
                        app.employeementList = response.data.payLoad;
                        setTimeout(() => {
                          console.log("set time out ");
                         app.errors.clear();
                       }, 10);



                    } else {
                      setTimeout(() => {
                        console.log("set time out ");
                       app.errors.clear();
                     }, 10);
                        console.log('Error!:', response.data.errorMessage);
                    }

                }, function(response) {
                  setTimeout(() => {
                    console.log("set time out ");
                   app.errors.clear();
                 }, 10);
                    console.log('Error!:', response.data);

                });
              }//end of file validaltion
              }//end check null if
            }//end of validation if

            },
            editEmployeement: function(employement){
                this.isAddmore = true;
                this.employeement  = employement;
                this.editEmplId = employement.employmentInfoId;
                this.files = employement.files;
            },
            deleteEmployment: function(employement,index){
              var app =this;
              console.log(employement);
              app.$http.post(app.$store.state.SERVER_URL +'/api/developer/delete-employment-info/'+employement.employmentInfoId,app.employeement,
                  {
                       headers: {
                          "X-Authorization": app.$cookie.get('X-Authorization')

                          },

                         }).then((response) => {
                          console.log("response.playLoad.data");
                          console.log(response)
                         // console.log(response.data.payLoad);
                           app.employeementList.splice(index,1);
                          }, (response) => {
                        });

                 },

                  disableFrom (val) {
                       console.log("-----coll the employemnet in education from date--------------");
                          this.employeement.toDate='';
                          // if (typeof this.disabled.from === 'undefined') {
                          //   this.stateTo.disabled = {
                          //     to: this.disabled.from,
                          //     from: null
                          //   };
                          // }
                        this.stateTo.disabled.to = val;
                        },
                        dateFormate: function(value){
                          console.log(moment(value).format('DD/MM/YYYY'));
                          return moment(value).format('DD-MMM-YYYY');
                        }


    },
        components: {
            "app-adminHeader": adminHeader,
            Datepicker
        },
    }
</script>
<style scoped>
    .input-hidden {
    display: none !important;
}
.profile-main-content {
    height: 73vh;
      overflow: hidden;
    overflow-y: scroll;
}
.btn-light-blue {
    margin-bottom: 33px;
    /* margin-bottom: 33px; */
}

</style>
