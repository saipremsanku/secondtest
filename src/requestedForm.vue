<template>
    <div class="wrapper">
      <link rel="stylesheet" href="/src/assets/css/intlTelInput.css">
      <link rel="stylesheet" href="/src/assets/css/demo.css">
      <!-- Main Header -->
      <app-admin-header></app-admin-header>
<!-- checking validation for Product owner  -->

      <div v-if="role === 'PRODUCT_OWNER'">

          <app-product-owner-sidebar inProject="showPONavbar"></app-product-owner-sidebar>
          <!-- <poSideBar v-show="(projectLeadId != '') && (projectLeadStatus != 'DRAFT') && (projectLeadStatus != 'REQUESTED')" :projectRequestId="projectLeadId"></poSideBar> -->
      </div>
      <div v-if="role === 'PRODUCT_OWNER' && showAllSideBarTOProductOwner()">
          <poSideBar :projectRequestId="projectLeadId"></poSideBar>
      </div>




      <div v-if="role === 'PROJECT_MANAGER'">
        <pmSidebar :projectRequestId="projectLeadId"></pmSidebar>
      </div>
      <div v-if="role === 'ADMIN'">
        <!-- <pmSidebar :projectRequestId="projectLeadId"></pmSidebar> -->
        <AdminSidebar></AdminSidebar>
      </div>



      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div v-if="role === 'PRODUCT_OWNER'"  v-show="projectLeadId != ''"">
             <projectInfoHeader></projectInfoHeader>
        </div>
        <div v-if="role === 'ADMIN'">
          <AdminProjectHeader></AdminProjectHeader>
        </div>
          <div v-if="role === 'PROJECT_MANAGER'">
           <projectInfoHeader v-show="(projectLeadId != '') && (projectLeadStatus != 'DRAFT')"></projectInfoHeader>
         </div>

        <section class="content-header">
          <h1>
          </h1>
        </section>

        <!-- Main content -->
        <section class="content" v-show="newOrDRaftProjectRequest()">

            <h3 align="center">{{showProjectTitle()}}</h3>
            <p align="center">Please share your project details &amp; help us give you the best proposal</p>

            <div class="stepwizard">
                <div class="stepwizard-row setup-panel">
                    <div class="stepwizard-step">
                        <a href="#step-1" type="button" class="btn btn-primary btn-circle">Basics</a>

                    </div>
                    <div class="stepwizard-step" >
                        <a href="#step-2" type="button" class="btn btn-default btn-circle">Features</a>

                    </div>
                    <div class="stepwizard-step">
                        <a href="#step-3" type="button" class="btn btn-default btn-circle">Confirm</a>

                    </div>
                </div>
            </div>




        <form role="form" id="requestedForm" >
            <!-- step 1-->
            <div class="row setup-content" id="step-1">
               <input type="hidden" v-model ="projectLeadId" name="projectLeadId">
                    <div class="col-md-12">
                    <div class="wizard-inner">

                   <!-- <div class="row">
                        <div class=" form-group customform-group">
                          <label class="col-md-12 control-label label-newsize">Project Name</label>
                          <div class="col-md-12">
                            <input  name="name" type="text" placeholder="What would you like to call it?" class="form-control" v-model="name">
                          </div>
                        </div>
                    </div>-->

                        <div class="row form-group customform-group" >
                                  <label class="col-md-12 control-label label-newsize" for="First Name">Project Name</label>
                                  <div class="col-md-12">
                                    <input  name="name" id="name" type="text" class="form-control" v-model="name"  placeholder="What would you like to call it?">
                                      <p class="text-danger hidden" id="name-id" >Please specify project name</p>
                                  </div>
                        </div>

                       <div class="row form-group">

                           <!-- type -->
                        <div class="col-md-12 form-group">
                            <div class="form-group">
                                <label for="" class="label-newsize">Type</label>
                                  <p class="text-danger hidden" id="type-id" >Please select a project type</p>
                                <div class="col-md-12 radio_cst">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <input class="magic-radio" type="radio" name="projectType" id="1"   v-model="checkedType" value="STATIC_WEBSITE"  @change="setUserRole">
                                            <label for="1">Basic Website</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input class="magic-radio" type="radio" name="projectType" id="3" value="WEB_ONLY" v-model="checkedType" @change="setUserRole">
                                            <label for="3">Web Application</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input class="magic-radio" type="radio" name="projectType" id="2" value="MOBILE_ONLY" v-model="checkedType" @change="setUserRole">
                                            <label for="2">Mobile Applications</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input class="magic-radio" type="radio" name="projectType" id="4" value="WEB_AND_MOBILE" v-model="checkedType" @change="setUserRole">
                                            <label for="4">Web & Mobile Applications</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><!-- type -->

                        <!-- Mobile Platform-->
                        <div class="col-md-12 form-group" v-show="checkedValue">
                            <div class="form-group">
                                <label for="" class="control-label label-newsize">Mobile Platforms</label>
                                 <p class="text-danger hidden" id="mobile-platforms-id" >Please select atleast 1 mobile platform</p>

                                <div class="row col-md-12">
                                    <div class="col-md-3">
                                        <input class="magic-checkbox" type="checkbox" name="mobilePlatformTypes2" id="6" value="IOS_NATIVE" v-model="mobilePlatformTypes">
                                        <label for="6">iOS</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input class="magic-checkbox" type="checkbox" name="mobilePlatformTypes1" id="5" value="ANDROID_NATIVE" v-model="mobilePlatformTypes">
                                        <label for="5">Andriod</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- Mobile Platform-->


                   <!-- <div class="row">
                        <div class=" form-group customform-group">
                          <label class="col-md-12 control-label label-newsize">Clientele</label>
                          <div class="col-md-12">
                           <textarea class="form-control" placeholder="Who is going to use it?" name="clientele" v-model="clientele"></textarea>
                          </div>
                        </div>
                    </div>
                        -->

                         <div class="row form-group customform-group" >
                                  <label class="col-md-12 control-label label-newsize" for="First Name">Clientele</label>
                                  <div class="col-md-12">
                                    <input  name="clientele" id="clientele" type="text" class="form-control" v-model="clientele"  placeholder="Who is going to use it?">
                                      <p class="text-danger hidden" id="clientele-id" >Please specify clientele</p>
                                  </div>
                        </div>




                    <!--<div class="row">
                        <div class=" form-group customform-group">
                          <label class="col-md-12 control-label label-newsize">Purpose</label>
                          <div class="col-md-12">
                           <textarea class="form-control" placeholder="What problem will it solve?" name="purpose" v-model="purpose"></textarea>
                          </div>
                        </div>
                    </div>-->

                         <div class="row form-group customform-group" >
                                  <label class="col-md-12 control-label label-newsize" for="First Name">Purpose</label>
                                  <div class="col-md-12">
                                        <textarea class="form-control" id="purpose" placeholder="What problem will it solve?" name="purpose" v-model="purpose"  ></textarea>
                                        <p class="text-danger hidden" id="purpose-id" >Please specify pupose of your project</p>
                                  </div>
                        </div>




                    </div>
                     <div class="row">
                            <div class="col-md-12 profile-main-content-footer text-right">
                                <button class="btn btn-orange nextBtn" type="button"  v-if="newOrDRaftProjectRequest()" v-on:click='requstedFrom_submit'> Next</button>
                                <button class="btn btn-orange nextBtn" type="button"  v-else> Next</button>
                            </div>
                        </div>

                    <!--   <div class="profile-main-content-footer text-center"><button type="button" class="btn btn-orange pull-right ripple-btn" v-if="newOrDRaftProjectRequest()" v-on:click='requstedFrom_submit'  >Next</button>
                        <button class="btn btn-orange nextBtn" type="button"  v-else> Next</button>
                      </div> -->
                    </div>

            </div>

            <!-- step 1 ends-->

            <!-- step 2 starts-->
            <div class="row setup-content" id="step-2">

                    <div class="col-md-12">
                    <div class="wizard-inner">
                        <div class="row">
                        <div class=" form-group customform-group">
                          <label class="col-md-12 control-label label-newsize">
                            Feature List
                          </label>
                          <div class="col-md-12">
                             <p class="text-danger hidden" id="feature-list-id" >Please specify list of required features</p>
                          </div>
                          <div class="col-md-12">
                            <p>Please provide detailed description of modules and functionalities you wish to get developed. You may want to attach relevant files.</p>
                          </div>
                          <div class="col-md-12">
                           <textarea name="projectSpecsHtml" class="form-control" id="editor1" rows="10" cols="80" v-model="projectSpecsHtml" ></textarea>
                          </div>
                        </div>
                    </div>


                    <div class="row">
                        <form enctype="multipart/form-data" novalidate>
                          <div class="col-md-12">
                            <label class="label-newsize">Requirement Documents, If Any</label>
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
                                            <span class="fileUploadCss" v-for="(file,index) in files"><p>{{file.fileName}}</p> <a :href="url+file.fileDocumentId" :download="file.fileName"><i class="fa fa-download download_file" aria-hidden="true"></i></a ><i class="fa fa-times" aria-hidden="true" @click="deleteFile(file.fileDocumentId,index)"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>
                             </form>
                </div>

                    </div>
                    <div class="row">
                            <div class="col-md-12 profile-main-content-footer">
                                <button type="button" class="btn btn-gray backBtn pull-left">Back</button>
                                <button class="btn btn-orange nextBtn pull-right" type="button"   v-if="newOrDRaftProjectRequest()"  v-on:click='requstedFrom_submit'> Next</button>
                                <button class="btn btn-orange nextBtn pull-right" type="button"  v-else> Next</button>
                            </div>
                        </div>

                    </div>

            </div>
            <!-- step 2 ends-->

            <!-- step 3 starts-->
            <div class="row setup-content" id="step-3" >

                    <div class="col-md-12" v-if="this.$store.getters.getLoggedInUser.isMobileVerified && this.$store.getters.getLoggedInUser.isEmailVerified">
                    <div class="wizard-inner">

                          <div class=" form-group customform-group">
                            <div class="row">
                                <div class="col-md-12">
                                  <!--   <h2 v-text="name"></h2> -->
                                  <h4 class="text-center">Preview</h4>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <label class="label-newsize">Type</label>
                                    <p >{{setProjectType}}</p>
                                </div>

                                <div class="col-md-6" v-show="setPlatformType">
                                    <label class="label-newsize">Mobile Platforms</label>
                                    <p>{{setPlatformType}}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="label-newsize">Clientele</label>
                                    <p v-text="clientele"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="label-newsize">Purpose</label>
                                    <p v-text="purpose"></p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="label-newsize">Features</label>
                                    <div v-html="projectSpecsHtml" class="well">

                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <label class="label-newsize">Attachments</label>
                                </div>
                                <div class="col-md-12">
                                  <ul class="listOfAttachments">
                                      <li  v-for="(file,index) in files" class="file_upload_top_10">
                                            <!-- <div class="file_heigh_width"> -->
                                              <a :href="url+file.fileDocumentId" :download="file.fileName" target="_blank">  <p  class="downloadFile">{{file.fileName}}</p></a>
                                            <!-- </div> -->
                                      </li>
                                  </ul>
                                </div>
                            </div>


                            <div class="col-md-12">

                            </div>
                          </div>

                          <div class="row" style="max-height: 100px;"></div>
                    </div>

                    <div class="row">
                            <div class="col-md-12 profile-main-content-footer text-center" style="margin-bottom: 50px;">
                                  <button type="button" class="btn btn-gray backBtn pull-left">Back</button>

                                  <button type="button"
                                  class="btn btn-orange finalbutton pull-right"
                                   v-if="newOrDRaftProjectRequest() " @click="openPreviewModal" v-touch-ripple>
                                      Proceed to Submit
                                  </button>
                            </div>
                    </div>

                    </div>


                                        <div class="col-md-12" v-else>
                                        <div class="wizard-inner">


                                          <div class="row">


                                          <div class="col-md-6">
                                              <div class="panel panel-default verify-panel">
                                                  <div class="panel-body verify-body">
                                                      <div class="text-center img-div-padding">
                                                          <img src="./assets/images/emailicon.png" class="img-responsive img-inline" alt="mobile">
                                                      </div>
                                                      <h5 class="header-mobile text-center">Email Verification</h5>
                                                      <div class="text-center email-verify-padding">
                                                          <div v-if="this.$store.getters.getLoggedInUser.isEmailVerified">
                                                          <p class="header-para" style="color: #90EE90; font-size: 40px;"><i class="fa fa-check" aria-hidden="true"></i></p>
                                                          </div>
                                                          <div v-else>


                                                         <p class="header-para">Please click on the verification link mailed to <b>{{this.$store.getters.getLoggedInUser.email}}</b>
                                                           </p>

                                                          <p class="header-para">
                                                          <a style="cursor: pointer;" @click="resendEmailVerfication" v-if="!this.$store.getters.getLoggedInUser.isEmailVerified">resend email</a>

                                                          <!-- <router-link to="/developer/profile">change email</router-link> -->
                                                          </p>
                                                          </div>

                                                      </div>


                                                  </div>
                                              </div>
                                          </div>

                                              <div class="col-md-6">
                                                <div class="alert alert-info-error text-center" v-if="isError">
                                                  <p>
                                                  {{errorMessage}}
                                                  </p>
                                                </div>
                                                  <div class="panel panel-default verify-panel">
                                                      <div class="panel-body verify-body moble-verify-padding">
                                                          <div class="text-center img-div-padding">
                                                              <img src="./assets/images/verificaction_mobile.png" class="img-responsive img-inline" alt="mobile">
                                                          </div>
                                                            <h5 class="header-mobile text-center header-mobile-padding">Mobile Verification</h5>
                                                          <div class="text-center emailVerifyPadd">

                                                          <div v-if="this.$store.getters.getLoggedInUser.isMobileVerified">
                                                          <p class="header-para" style="color: #90EE90; font-size: 49px; "><i class="fa fa-check" aria-hidden="true"></i></p>
                                                          </div>


                                                          </div>


                                                          <div v-if="getMailNotVerify">
                                                          <form class="" id="verify_mobile"   @submit.prevent="setMobileForm('mobile-form')" role="form" data-vv-scope="mobile-form">
                                                                    <div class="row">
                                                                      <div class="col-md-12">
                                                                      <div class="form-group verifyEmail">

                                                                          <div class="col-md-4 col-md-offset-3 text-right removeDiv" v-if="getMailNotVerify">
                                                                            <input id="phone" class="form-control" placeholder="Enter Mobile Number" name="mobileNumber" v-model="mobileNumber" type="tel" min="1"  v-validate:mobileNumber ="'required|numeric|min:4'">
                                                                              <p class="text-danger" v-if="errors.has('mobile-form.mobileNumber')">Please enter mobile number</p>
                                                                          </div>
                                                                          <div class="col-md-3">
                                                                              <button type="submit" class="btn btn-orange form-control" >submit</button>
                                                                          </div>
                                                                      </div>
                                                                    </div>
                                                                    </div>

                                                             </form>
                                                          </div>







                                                          <div v-else-if="getMobileNotVerify">
                                                          <form class="" id="verify_mobile"   @submit.prevent="verifymobileForm('verifymobile-form')" role="form" data-vv-scope="verifymobile-form">
                                                                    <div class="row">
                                                                      <div class="col-md-12">
                                                                      <div class="form-group verifyEmail" >
                                                                          <div class="col-md-5 col-md-offset-2" >
                                                                              <!-- <input type="text" class="form-control"  name="verifymobile" v-model="verifymobile" placeholder="Verification Code" > -->

                                                                          </div>
                                                                            <div class="col-md-3 col-md-offset-3" >
                                                                        <input type="text" class="form-control"  name="verifymobile" v-model="verifymobile" placeholder="Verification Code" >
                                                                      </div>
                                                                          <div class="col-md-3">
                                                                              <button type="submit" class="btn btn-orange form-control" >Verify </button>
                                                                          </div>
                                                                      </div>
                                                                    </div>
                                                                    </div>


                                                          </form>

                                                            <div class="col-md-offset-4">
                                                            <p class="header-para">

                                                              <a style="cursor: pointer;" @click="resendMobileCode()" v-show="!this.$store.getters.getLoggedInUser.isMobileVerified">resend code</a>


                                                            </p>
                                                            </div>

                                                          </div>


                                                      </div>
                                                  </div>
                                              </div>


                                          </div>



                                        </div>
                                      </div>


            </div>


            <!-- step 3 ends-->
        </form>




        </section>



        <section class="content" v-show="!newOrDRaftProjectRequest()">
          <h2 v-if="(projectLeadId != '') && (projectLeadStatus != 'DRAFT')" class="sub_heading story">Requirement Form</h2>


              <div class="requirementsBlog">




                          <div v-if="((role === 'PRODUCT_OWNER') && (requestedOrRevisionProject()))">
                            <div class="row">
                              <div class="col-md-12">
                                <div class="alert alert-info">
                                  <p>
                                  {{assignedPMName}} working on preparing the perfect proposal for your product !
                                    <br>You will be notified the moment its ready.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>


                          <div class="row">
                              <div class="col-md-6">
                                  <label class="label-newsize">Type</label>
                                  <p >{{setProjectType}}</p>
                              </div>

                              <div class="col-md-6" v-show="setPlatformType">
                                  <label class="label-newsize">Mobile Platforms</label>
                                  <p>{{setPlatformType}}</p>
                              </div>
                          </div>

                          <div class="row">
                              <div class="col-md-12">
                                  <label class="label-newsize">Clientele</label>
                                  <p v-text="clientele"></p>
                              </div>
                          </div>

                          <div class="row">
                              <div class="col-md-12">
                                  <label class="label-newsize">Purpose</label>
                                  <p v-text="purpose"></p>
                              </div>
                          </div>


                          <div class="row">
                              <div class="col-md-12">
                                 <label class="label-newsize">Features</label>
                                  <div v-html="projectSpecsHtml">

                                  </div>
                              </div>
                          </div>



                          <div class="row">
                              <div class="col-md-12">
                                  <label class="label-newsize">Attachments</label>
                              </div>
                              <div class="col-md-12">
                                <ul class="listOfAttachments">
                                    <li  v-for="(file,index) in files" class="file_upload_top_10">
                                            <a :href="url+file.fileDocumentId" :download="file.fileName" target="_blank">  <p  class="downloadFile">{{file.fileName}}</p></a>

                                    </li>
                                </ul>
                              </div>
                          </div>




                      </div>
        </section>

      </div>





      <!-- Add the sidebar's background. This div must be placed
           immediately after the control sidebar -->
    <div class="control-sidebar-bg"></div>
    <div id="load-wizard"></div>
    </div>

</template>


<!--<script src="/src/assets/wizard.js" type="text/javascript"></script>-->



<script>

    import adminHeader from "./adminHeader.vue";
    import ProductOwnerSidebar from "./ProductOwnerSidebar.vue";
    import poSideBar from "./poSideBar.vue"
    import pmSidebar from "./ProjectSidebar.vue"
    import projectInfoHeader from "./projectInfoHeader.vue"
    import  AdminSidebar  from  "./SupperAdminSideBar.vue";
    import  adminProjectHeader  from  "./components/admin/adminProjectHeader.vue";

    export default {
           name: 'app',
            data () {
                return {
                    values:[],
                    checkedType:'',
                    checkedValue:false,
                    name:'',
                    projectType:'',
                    mobilePlatformTypes:[],
                    purpose:'',
                    clientele:'',
                    projectSpecsHtml:'',
                    projectLeadId:'',
                    project:'',
                    projectLeadStatus:'',
                    role: this.$cookie.get('role'),
                    showPONavbar: false,
                    showConfirmModal: true,
                    finalSpinner: false,
                    thankYouNote: false,
                    assignedPMName: '',
                    couponCode: '',
                    files:[],
                    isFileLarge:false,
                    file:'',
                     url:this.$store.state.SERVER_URL +'/download-file/',
                    showCouponError:false,
                    verifymobile:'',
                    mobileNumber:'',
                    isError:false,
                    errorMessage:'',

                }
            },
        computed:{
            setProjectType: function(){
              var app = this;
                    if(this.checkedType === "STATIC_WEBSITE"){
                        app.mobilePlatformTypes=[];
                       return "Website";
                    }else if(this.checkedType === "WEB_ONLY"){
                        app.mobilePlatformTypes=[];
                    return "Web Applications";
                     }else if(this.checkedType === "MOBILE_ONLY"){
                    return "Mobile Applications";
                    }else if(this.checkedType === "WEB_AND_MOBILE"){
                        return "Web & Mobile Applications";
                    }

            },
            isEmailVerified: function(){
              return this.$store.getters.getLoggedInUser.isEmailVerified;
            },

            isMobileVerified: function(){
              return this.$store.getters.getLoggedInUser.isMobileVerified;
            },
            setPlatformType: function(){
                if(this.mobilePlatformTypes.length==2){
                    return 'iOS & Android'
                  }else if(this.mobilePlatformTypes.length == 1 && this.mobilePlatformTypes[0]== 'ANDROID_NATIVE'){
                         return 'Andriod';
                         }else if(this.mobilePlatformTypes.length == 1 && this.mobilePlatformTypes[0]== 'IOS_NATIVE'){
                              return 'iOS';
                         }
                    },
                    getMobileNotVerify:function(){
                      if(!(this.$store.getters.getLoggedInUser.isMobileVerified) && (this.$store.getters.getLoggedInUser.mobileNumber!=null)){
                        return true;
                      }else{
                        return false;
                      }
                    },
                    getMailNotVerify:function(){
                      if(!this.$store.getters.getLoggedInUser.isMobileVerified && this.$store.getters.getLoggedInUser.mobileNumber==null){
                        return true;
                      }else{
                        return false;
                      }
                    }



        },
            components:{
                "app-admin-header":adminHeader,
                "app-product-owner-sidebar":ProductOwnerSidebar,
                "poSideBar":poSideBar,
                "pmSidebar":pmSidebar,
                "projectInfoHeader":projectInfoHeader,
                'AdminSidebar': AdminSidebar,
                'AdminProjectHeader':adminProjectHeader,
            },
            created: function(){
              $.getScript('/src/assets/js/intlTelInput.js'); // calling the wizard js when component load
              $.getScript('/src/assets/js/country.js'); //
              if(this.$route.params.projectLeadId != null){
                  this.projectLeadId = this.$route.params.projectLeadId;
                  //console.log(this.projectLeadId);
                  this.getSubmitedFormData();
                }

               //console.log(this.role);
                if((this.project != null) && (this.role === 'PRODUCT_OWNER')){
                   if((this.project.projectLeadStatus === 'PROPOSAL_SUBMITTED' )|| (this.project.projectLeadStatus === 'REVISION_REQUESTED' )){
                    this.showPONavbar = true;
                  }
                 }
                else{
                 this.showPONavbar = false;
               }
               $.getScript('/src/assets/js/wizard.js'); // calling the wizard js when component load

            },

          mounted: function(){
            this.setCountryData();
          },

            methods: {



              newOrDRaftProjectRequest: function(){
                  if(this.projectLeadId === '' || this.projectLeadStatus === 'DRAFT'){
                    return true;
                  }
                  return false;
              },



              requestedOrRevisionProject: function(){
                  if((this.projectLeadStatus === 'REQUESTED') || (this.projectLeadStatus === 'REVISION_REQUESTED')){
                    return true;
                  }
                  return false;
              },

              newOrDraftOrRequestedProjectRequest: function(){
                  if(this.projectLeadId === '' || this.projectLeadStatus === 'DRAFT' || this.projectLeadStatus === 'REQUESTED'){
                    return true;
                  }
                  return false;
              },
              showAllSideBarTOProductOwner: function(){
                if((this.project != null) && (this.role === 'PRODUCT_OWNER')){
                   if((this.project.projectLeadStatus === 'PROPOSAL_SUBMITTED' )|| (this.project.projectLeadStatus === 'REVISION_REQUESTED' ) ||(this.project.projectLeadStatus === 'CLOSED_SUCCESSFULLY' )){
                    return true;
                  }
                 }
                else{
                 return false;
               }
             },





                showProjectTitle(){
                  var app = this;
                    if(app.name === ''){
                       return "New Project";
                       }
                    return app.name;

                },
              openPreviewModal: function(){
                var app = this;
              //  app.$store.commit('setSpinner',true);
                app.$swal({
                title: 'You sure want to Continue?',
                text: "You will not be able to make changes here onwards ",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
                }).then(function () {
                //  app.$store.commit('setSpinner',false);
                     app.finalRequstedFrom_submit();
                })

                    // $('#preview_requestedform').modal('show');
                },


      getSubmitedFormData: function(){
              var app = this;
              app.$http.get(
                    this.$store.state.SERVER_URL+'/api/po-pm-admin/get-project-lead/'+app.projectLeadId,
                 {
                     headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')

                     },

                 }
            ).then(function(response) {
                  //console.log(response.data.payLoad);
                 app.project = response.data.payLoad;
                 app.name = response.data.payLoad.name ;
                 //console.log(response.data.payLoad.mobilePlatformType );
                  app.mobilePlatformTypes = response.data.payLoad.mobilePlatformTypes ;
                  app.purpose = response.data.payLoad.purpose ;
                  app.clientele = response.data.payLoad.clientele;
                  app.projectSpecsHtml = response.data.payLoad.projectSpecsHtml;
                  app.checkedType = response.data.payLoad.projectType;
                  app.projectLeadId = response.data.payLoad.id;
                  app.projectLeadStatus = response.data.payLoad.projectLeadStatus;
                  app.files = response.data.payLoad.fileEntities
                  //console.log(app.files)
                  if(response.data.payLoad.projectManagerName != null){
                    app.assignedPMName = response.data.payLoad.projectManagerName+' is';
                  }
                  else{
                    app.assignedPMName = "We're"
                  }

                   if(response.data.payLoad.projectType === "STATIC_WEBSITE" || response.data.payLoad.projectType === "WEB_ONLY"){
                      app.checkedValue = false;
                    }else{
                      app.checkedValue= true;

                    }
              });

            } ,


                setUserRole:function(){
                  if(this.checkedType === "STATIC_WEBSITE" || this.checkedType === "WEB_ONLY"){
                      this.checkedValue = false;
                  }else{
                      this.checkedValue = true;
                  }
                },

                submitCouponCode: function(){
                  var app = this;

                 if(app.couponCode != ''){
                   app.$store.commit('setSpinner',true);
                  $.ajax({
                           url: this.$store.state.SERVER_URL+'/api/product-owner/verify-coupon/'+app.couponCode,
                           type: 'GET',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                                headers: {
                                  "X-Authorization": app.$cookie.get('X-Authorization')
                                },
                           success: function(data) {
                             app.$store.commit('setSpinner',false);
                             //console.log("=========================")
                             //console.log(data);
                             if(data.status === "SUCCESS"){
                               app.$store.commit('setSpinner',false);
                                    //console.log('Coupon Verified !');
                                    app.$store.commit('setPOCouponCode', true);
                             }
                             else{
                               app.$store.commit('setSpinner',false);
                                app.$swal("Oops...", "Incorrect coupon code!", "error");
                             }
                         }
                        });
                      }else{
                        app.showCouponError = true;
                      }
                },

                finalRequstedFrom_submit:function(e){
                    //form submission
                    //console.log("final submitions from page");
                    var app = this;

                    app.showConfirmModal = false;

                     var editor_contents = CKEDITOR.instances["editor1"].getData();
                        var dataObj = $('#requestedForm').serializeArray().reduce(function(obj, item) {
                            obj[item.name] = item.value;
                            return obj;
                        }, {});
                    var dataArray = [];
                    if (dataObj.mobilePlatformTypes1) {

                            dataArray.push(dataObj.mobilePlatformTypes1);
                    }
                    if (dataObj.mobilePlatformTypes2) {

                            dataArray.push(dataObj.mobilePlatformTypes2);
                    }
                    dataObj.mobilePlatformTypes = dataArray;


                            ////console.log(dataObj);
                            if(editor_contents){
                                //console.log(dataObj);
                                dataObj.projectSpecsHtml = editor_contents;

                            }
                              app.$store.commit('setSpinner',true);
                           $.ajax({
                           url: this.$store.state.SERVER_URL+'/api/product-owner/submit-project-lead',
                           type: 'POST',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                           data: JSON.stringify(dataObj),
                                 headers: {
                               "X-Authorization": app.$cookie.get('X-Authorization')

                                    },


                           success: function(data) {
                             app.$store.commit('setSpinner',false);
                             if(data.status === "SUCCESS"){
                                 app.$store.commit('setSpinner',false);
                                  //console.log("final submitions from page sucess");

                                  // app.finalSpinner = false;
                                  app.thankYouNote = true;
                                    app.$swal("Thank for sharing the details", " we will get back to you within 24 Hours  !", "success");
                                    //app.$router.push(');
                                    app.$router.push('/product-owner/dashboard');
                                  //$('#preview_requestedform').modal('hide');
                             }else{
                                 app.$store.commit('setSpinner',false);
                                  app.$swal("Oops...", "Something went wrong!", "error");
                             }
                         }
                        });

                },



                requstedFrom_submit:function(e){
                    //form submission
                e.preventDefault();
                    var app = this;
                    // Cookies.get("X-Authorization");
                    var editor_contents;
                    if(CKEDITOR.instances["editor1"]){
                       editor_contents = CKEDITOR.instances["editor1"].getData();
                    }

                    // console.log(editor_contents);
                        var dataObj = $('#requestedForm').serializeArray().reduce(function(obj, item) {
                            obj[item.name] = item.value;
                            return obj;
                        }, {});
                          //console.log(dataObj);
                            var dataArray = [];
                    if (dataObj.mobilePlatformTypes1) {

                            dataArray.push(dataObj.mobilePlatformTypes1);
                    }
                    if (dataObj.mobilePlatformTypes2) {

                            dataArray.push(dataObj.mobilePlatformTypes2);
                    }
                    dataObj.mobilePlatformTypes = dataArray;
                            if(editor_contents){
                                //console.log(dataObj);
                                dataObj.projectSpecsHtml = editor_contents;
                                //console.log(dataObj);
                            }
                           $.ajax({
                           url: this.$store.state.SERVER_URL+'/api/product-owner/save-or-update-project-lead',
                           type: 'POST',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                           data: JSON.stringify(dataObj),
                                headers: {
                               "X-Authorization": app.$cookie.get('X-Authorization')

                                    },


                           success: function(data) {
                             if(data.status === "SUCCESS"){
                                 //console.log('success');
                                    app.name = data.payLoad.name;
                                 app.projectLeadId = data.payLoad.id;

                                 app.projectLeadStatus = data.payLoad.projectLeadStatus;

                                    if(data.payLoad.projectType === "STATIC_WEBSITE"){
                                        app.projectType = "Website";
                                    }else if(data.payLoad.projectType === "WEB_ONLY"){
                                        app.projectType = "Web Applications";
                                    }else if(data.payLoad.projectType === "MOBILE_ONLY"){
                                        app.projectType = "Mobile Applications";
                                    }else if(data.payLoad.projectType === "WEB_AND_MOBILE"){
                                        app.projectType = "Web & Mobile Applications";
                                    }

                                    if(data.payLoad.mobilePlatformTypes === "ANDROID_NATIVE"){
                                        app.mobilePlatformTypes = "Andriod";
                                    }else{
                                        data.payLoad.mobilePlatformTypes = "IOS";
                                    }



                                    app.purpose = data.payLoad.purpose;
                                    app.clientele = data.payLoad.clientele;
                                    app.projectSpecsHtml = data.payLoad.projectSpecsHtml;



                             }
                             else{
                                //console.log("Oops...", "Something went wrong!", "error");
                             }
                         }
                        });
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
                              formData.append('projectLeadId',app.projectLeadId);
                         });
                     //console.log(ele.target.name);
                     if(fileList[0].size <=5000000){
                         app.isFileLarge= false;
                     app.$http.post(
                       app.$store.state.SERVER_URL + '/api/product-owner/upload-project-lead-file',
                       formData,
                      {
                         headers: {
                             "X-Authorization": app.$cookie.get('X-Authorization')
                         },
                     }).then((response) => {
                         //console.log(response);
                         app.files.unshift(response.data.payLoad);
                     }, (response) => {});
                   }else{
                      app.isFileLarge= true;
                   }
               },
               deleteFile:function(fileId,index){
                   var app =this;
                   app.$http.get(app.$store.state.SERVER_URL +'/api/product-owner/delete-project-lead-file/'+fileId+'/'+app.projectLeadId,
                          {
                               headers: {
                                      "X-Authorization": app.$cookie.get('X-Authorization')
                                  },
                          }).then((response) => {
                                     //console.log(response.data.status);
                                     if(response.data.status == 'SUCCESS'){
                                       app.files.splice(index,1);
                                     }else{
                                      app.$swal("Oops...", "Something went wrong!", "error");
                                     }
                      }, (response) => {
                    });
              },

              keymonitor(e){
                var app = this;
                if(app.couponCode == '') {
                  app.showCouponError = true;
                } else {
                  app.showCouponError = false;
                }
              },

                        resendMobileCode: function(){

                            var app = this;
                              app.$store.commit('setSpinner',true);
                            app.$http.get(
                            this.$store.state.SERVER_URL+'/resend-mobile-confirmation-key' ,
                                {
                                  headers:{
                                      'X-Authorization':app.$cookie.get('X-Authorization')
                                  }
                                }
                            ).then(function(response){
                                console.log(response);
                                if(response.data.status === "SUCCESS"){
                                    app.$store.commit('setSpinner',false);
                                  app.$swal("Message has been Resent!")
                                   }else{
                                        app.$swal("Something went wrong")
                                   }
                            })

                        },

              resendEmailVerfication: function(){

              var app = this;
                app.$store.commit('setSpinner',true);
              app.$http.get(
              this.$store.state.SERVER_URL+'/resend-email-confirmation-key' ,
                  {
                    headers:{
                        'X-Authorization':app.$cookie.get('X-Authorization')
                    }
                  }
              ).then(function(response){
                  console.log(response);
                  if(response.data.status === "SUCCESS"){
                      app.$store.commit('setSpinner',false);
                      app.$swal("Email has been Resent!")
                     }else{
                          app.$swal("Something went wrong")
                     }
              })

          },
          setCountryData(){
            var app = this;
            var iso2 = app.$store.getters.getLoggedInUser.iso2;
            var internationalCallingCode = app.$store.getters.getLoggedInUser.internationalCallingCode;
            setTimeout(()=>{
              $(".selected-flag .iti-flag").attr('class', '');
              $(".selected-flag div:nth-child(1)").attr('class', 'iti-flag '+iso2);
              $(".selected-flag div:nth-child(2)").attr('class', 'selected-dial-code').text(internationalCallingCode);
              $('.country').removeClass('highlight active');
              $('*[data-country-code='+iso2+']').addClass('highlight active');
            },1)
          },
          setMobileForm(scope){
              var app = this;
              app.$validator.validateAll(scope)
              console.log(app.errors.any()+"   "+app.$cookie.get('X-Authorization'))
               if(!app.errors.any()){
                    console.log("mob---------------"+app.$store.state.SERVER_URL+'api/product-owner/confirm-email-mobile-number');
                    console.log(app.errors)
                       var object={};
                       object.internationalCallingCode = $(".selected-dial-code").text();
                       object.iso2 = $(".country[class*='highlight']").attr("data-country-code");
                       object.mobileNumber = app.mobileNumber;


                   app.$store.commit('setSpinner',true);

                 app.$http.post(
                   app.$store.state.SERVER_URL+'/api/product-owner/po-mobile-confirmation',
                   object,
                   {
                     headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')
                     },
                   }
               ).then(function(response){

                 console.log(response)
                  app.$store.commit('setSpinner',false);
                   if(response.data.status === "SUCCESS"){
                     app.$swal("OTP has been sent to your mobile number. Please verify it. ")
                      console.log(response.data.payLoad);
                      // app.$cookie.set('isMobileVerified',response.data.payLoad.isMobileVerified, 1);
                      // app.$store.commit('setLoggedInUserMobileStatus', response.data.payLoad.isMobileVerified);
                      // app.$cookie.set('role',response.data.payLoad.role, 1);
                      // app.$cookie.set('isEmailVerified',response.data.payLoad.isEmailVerified, 1);
                        $(".removeDiv").remove();
                      app.$store.commit('setLoggedInUser', response.data.payLoad);
                   }else{
                     app.$store.commit('setSpinner',false);
                     if(response.data.status === "FAILURE"){

                       app.errorMessage=response.data.errorMessage;
                     app.isError = true;
                      setTimeout(function(){
                        app.errorMessage=null;
                         app.isError = false;
                     }, 5000);
                   }
                    }
               });
             }
      } ,

          // methods call for moblie verfication
                  verifymobileForm(scope){
                      var app = this;

                      app.$validator.validateAll(scope)
                      console.log(app.errors.any()+"   "+app.$cookie.get('X-Authorization'))
                       if(!app.errors.any()){

                           app.$store.commit('setSpinner',true);
                        app.$http.get(
                         app.$store.state.SERVER_URL+'/verify-mobile-confirmation-key/'+app.verifymobile ,

                          {
                            headers: {
                              "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
                            },
                          },
                       ).then(function(response) {
                         console.log(response)
                           if(response.data.status === "SUCCESS"){
                              app.$store.commit('setSpinner',false);
                              app.$cookie.set('isMobileVerified',response.data.payLoad.isMobileVerified, 1);
                              app.$store.commit('setLoggedInUserMobileStatus', response.data.payLoad.isMobileVerified);
                              var user = app.$store.getters.getLoggedInUser;
                              user.isMobileVerified = response.data.payLoad.isMobileVerified;
                              app.$store.commit('setLoggedInUser', user);

                              if(app.isEmailVerified){
                                // app.$router.push('/post-login');
                              }


                           }else{
                               app.$store.commit('setSpinner',false);

                                 app.errorMessage=response.data.errorMessage;
                               app.isError = true;
                                setTimeout(function(){
                                  app.errorMessage=null;
                                   app.isError = false;
                               }, 3000);
                            }
                       });
                     }
              } ,

          }

}

</script>
<style  scoped>
.content-wrapper, .right-side{
    margin-bottom: 20px;
}
.alert-info-error{
  background-color: #f2dede;
}
/*.content[data-v-a31bdc68] {
    min-height: 642px;
}*/
.content {
    min-height: calc(96vh - 101px) !important;
    }
.content-wrapper[data-v-a31bdc68], .right-side[data-v-a31bdc68] {
        margin-bottom: 0px !important;
    }

</style>
