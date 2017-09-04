<template>
    <div class="admin">
        <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
      <appAdminSidebar></appAdminSidebar>
      <div class="content-wrapper">
            <section class="content">
              <div class="row">
                  <div class="col-md-10 col-md-offset-1">
                      <div class="profile-main-content-header">
                          <div class="row">
                              <div class="col-md-6">
                                  <div class="image-section">
                                      <div class="col-md-12">
                                          <div class="image-border margin-left-pro">
                                            <img :src="getFileUrl+developerDetail.developerProfessionalPicId" alt="ProfileImage" v-if="developerDetail.developerProfessionalPicId!=null">
                                            <img src="" v-else>
                                              <!-- <img src="../../assets/images/avatar.png" alt="ProfileImage"> -->

                                          </div>
                                          <span class="image-heading image-content-left ">
                                                          <h4 class="hading-professional">Professional Portait</h4>

                                                 </span>
                                      </div>
                                  </div>
                              </div>

                              <div class="col-md-6">
                                  <div class="image-section">
                                      <div class="col-md-12">
                                          <div class="image-border">
                                            <img :src="getFileUrl+developerDetail.profilePicId" alt="ProfileImage" v-if="developerDetail.profilePicId!=null">
                                            <img :src="'https://api.adorable.io/avatars/200/'+developerDetail.email" v-else>

                                          </div>
                                          <span class="image-heading">
                                                      <h4 class="avatar"> Avatar</h4>

                                          </span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="profile-main-content">
                          <div class="form-section">
                              <form id="profileForm">
                                  <div class="row">
                                      <div class="col-md-4">
                                              <p class="col-md-12 control-label lable">First Name</p>
                                              <div class="col-md-12 heading-content">
                                                <h5 class="heaing">{{developerDetail.firstName}}</h5>
                                              </div>
                                         </div>
                                         <div class="col-md-4">
                                                 <p class="col-md-12 control-label lable">Last Name</p>
                                                 <div class="col-md-12 heading-content">
                                                   <h5 class="heaing">{{developerDetail.lastName}}</h5>
                                                 </div>
                                            </div>
                                            <div class="col-md-4">
                                            </div>
                                  </div>
                                  <div class="row">
                                      <div class="col-md-4">
                                              <p class="col-md-12 control-label lable">E-Mail</p>
                                              <div class="col-md-12 heading-content">
                                                <h5 class="heaing">{{developerDetail.email}}</h5>
                                              </div>
                                         </div>
                                         <div class="col-md-4">
                                                 <p class="col-md-12 control-label lable">Mobile No.</p>
                                                 <div class="col-md-12 heading-content">
                                                   <h5 class="heaing">{{developerDetail.mobileNumber}}</h5>
                                                 </div>
                                            </div>
                                            <div class="col-md-4">
                                            </div>
                                  </div>




                                  <div class="row">
                                      <div class="col-md-4">
                                              <p class="col-md-12 control-label lable">Country</p>
                                              <div class="col-md-12 heading-content">
                                                <h5 class="heaing">{{developerDetail.countryName}}</h5>
                                              </div>
                                         </div>
                                         <div class="col-md-4">
                                                 <p class="col-md-12 control-label lable">City</p>
                                                 <div class="col-md-12 heading-content">
                                                   <h5 class="heaing">{{developerDetail.city}}</h5>
                                                 </div>
                                            </div>
                                            <div class="col-md-4">
                                            </div>
                                  </div>

                                  <div class="row">
                                    <div class="col-md-4">
                                            <p class="col-md-12 control-label lable">Zipcode</p>
                                            <div class="col-md-12 heading-content">
                                              <h5 class="heaing">{{developerDetail.postalCode}}</h5>
                                            </div>
                                       </div>
                                       <div class="col-md-8">
                                       </div>

                                  </div>

                                  <div class="row">
                                      <div class="col-md-12">
                                        <p class="col-md-12 control-label lable">Address</p>
                                        <div class="col-md-12">
                                          <h5>
                                            <p>
                                            {{developerDetail.line1Address}}
                                          </p></h5>
                                        </div>
                                      </div>
                                  </div>

                          <div class="row">
                              <div class="col-md-12">
                                   <label class=" col-lg-12 col-md-12 control-label lable">ID Proof <small>(preferably Passport)</small></label>
                                  <div class="col-md-12">
                                      <div class="row">
                                          <div class="col-md-12">
                                          <div class="col-md-4 file_upload" >
                                              <!-- <div class="file_heigh_width">
                                                <span>show the file list </span>
                                              </div> -->

                                              <ul class="listOfAttachments">
                                                  <li  v-for="(file,index) in developerDetail.files" class="file_upload_top_10 dev-empl-padding">

                                                          <a :href="url+file.fileDocumentId" :download="file.fileName" target="_blank">  <p  class="downloadFile">{{file.fileName}}</p></a>

                                                  </li>
                                              </ul>


                                          </div>
                                       </div>
                                      </div>
                                  </div>
                              </div>
                                </div>
                              </form>
    <!-- **************************** end of profile ******************************************************* -->
    <!-- ************************* start skills *************************************************** -->
                              <section class="dev-skill">
                                <div class="row">
                                  <div class="col-md-12 to-border-skill">
                                    <h3 class="to-heading">skill set</h3>
                                    </div>
                                </div>
                                <div class="row new-section" v-for="skill in developerDetail.developerSkillInfos" >
                                  <div class="col-md-12">
                                        <div class="col-md-3">
                                                <p class="col-md-12 control-label lable">Skill</p>
                                                <div class="col-md-12 heading-content">
                                                  <h5 class="heaing">{{skill.skillName}}</h5>
                                                </div>
                                           </div>
                                           <div class="col-md-3">
                                                   <p class="col-md-12 control-label lable">Hourly Rate(USD)</p>
                                                   <div class="col-md-12 heading-content">
                                                     <h5 class="heaing">{{skill.desiredBillingPerHour}}</h5>
                                                   </div>
                                              </div>
                                              <div class="col-md-3">
                                                      <p class="col-md-12 control-label lable">CompetencyLevel</p>
                                                      <div class="col-md-12 heading-content">
                                                        <h5 class="heaing">{{skill.skillCompetency}}</h5>
                                                      </div>
                                                 </div>
                                                 <div class="col-md-3">
                                                   <p class="col-md-12 control-label lable">Experience</p>
                                                   <div class="col-md-12 heading-content">
                                                     <h5 class="heaing">{{skill.skillExperience}}</h5>
                                                   </div>
                                                 </div>
                                         </div>
                                    </div>
                                <div class="row">
                                  <div class="col-md-12">
                                    <p class="col-md-12 control-label lable">Hours per work you are available for work</p>
                                    <div class="col-md-12 heading-content">
                                      <h5 class="heaing">8hrs</h5>
                                    </div>
                                  </div>
                                </div>
                              </section>
<!-- *******************end of skills set ****************************************** -->
<!-- *********************start eduction section ****************************** -->


<section class="dev-skill">
  <div class="row">
    <div class="col-md-12 to-border">
      <h3 class="to-heading">Educational Details</h3>
      </div>
  </div>
  <div v-for=" school in developerDetail.developerSchoolInfos" class="new-section">
  <div class="row">
    <div class="col-md-12">
          <div class="col-md-3">
                  <p class="col-md-12 control-label lable">School</p>
                  <div class="col-md-12 heading-content">
                    <h5 class="heaing">{{school.name}}</h5>
                  </div>
             </div>
             <div class="col-md-3">
                     <p class="col-md-12 control-label lable">Course</p>
                     <div class="col-md-12 heading-content">
                       <h5 class="heaing">{{school.course}}</h5>
                     </div>
                </div>
           </div>
      </div>

      <div class="row">
        <div class="col-md-12">
              <div class="col-md-3">
                      <p class="col-md-12 control-label lable">Area of Study</p>
                      <div class="col-md-12 heading-content">
                        <h5 class="heaing">{{school.areaOfStudy}}</h5>
                      </div>
                 </div>
                 <div class="col-md-5">
                         <p class="col-md-12 control-label lable">Period</p>
                         <div class="col-md-12 heading-content">

                            <spa
                         </div>
                    </div>
               </div>
          </div>


          <div class="row">
              <div class="col-md-12">
                   <label class=" col-lg-12 col-md-12 control-label lable">Document Uploaded</label>
                  <div class="col-md-12">
                      <div class="row">
                          <div class="col-md-12">
                          <div class="col-md-4 file_upload" >
                              <!-- <div class="file_heigh_width">
                                <span>show the file list </span>
                              </div> -->
                              <ul class="listOfAttachments">
                                  <li  v-for="(file,index) in school.files" class="file_upload_top_10 dev-empl-padding">

                                          <a :href="url+file.fileDocumentId" :download="file.fileName" target="_blank">  <p  class="downloadFile dev-profile-padding">{{file.fileName}}</p></a>

                                  </li>
                              </ul>


                          </div>
                       </div>
                      </div>
                  </div>
              </div>
          </div>
</div>

</section>

<!-- ********************** start Employment ************************** -->
<section class="dev-skill">
  <div class="row">
    <div class="col-md-12 to-border">
      <h3 class="to-heading">Employment History </h3>
      </div>
  </div>
  <div v-for="employment in developerDetail.developerEmploymentInfos" class="new-section">
  <div class="row">
    <div class="col-md-12">
          <div class="col-md-5">
                  <p class="col-md-12 control-label lable">Company</p>
                  <div class="col-md-12 heading-content">
                    <h5 class="heaing">{{employment.companyName}}</h5>
                  </div>
             </div>
             <div class="col-md-5">
                     <p class="col-md-12 control-label lable">Designation*</p>
                     <div class="col-md-12 heading-content">
                       <h5 class="heaing">{{employment.designation}}</h5>
                     </div>
                </div>
          </div>
  </div>

  <div class="row">
    <div class="col-md-12">
          <div class="col-md-5">
                  <p class="col-md-12 control-label lable">Country</p>
                  <div class="col-md-12 heading-content">
                    <h5 class="heaing">{{employment.countryName}}</h5>
                  </div>
             </div>
             <div class="col-md-5">
                     <p class="col-md-12 control-label lable">City*</p>
                     <div class="col-md-12 heading-content">
                       <h5 class="heaing">{{employment.city}}</h5>
                     </div>
                </div>
          </div>
  </div>


  <div class="row">
    <div class="col-md-12">
          <div class="col-md-5">
                  <p class="col-md-12 control-label lable">Period*</p>
                  <div class="col-md-12 heading-content">
                        <span class="date-style">{{employment.fromDate}}</span> to <span class="date-style">{{employment.toDate}}</span>

                  </div>
             </div>
             <div class="col-md-5">
                     <p class="col-md-12 control-label lable"></p>
                     <div class="col-md-12 heading-content">
                       <span v-if="employment.isCurrentPlaceOfWork">
                         <label><input type="checkbox" checked disabled>Currently working here</label>
                       </span>
                       <span  v-else>
                       <label><input type="checkbox" disabled>Currently working here</label>
                     </span>
                     </div>
                </div>
          </div>
  </div>


  <div class="row">
    <div class="col-md-12">
          <div class="col-md-12">
                  <p class="col-md-12 control-label lable">Brief Work Description*</p>
                  <div class="col-md-12 heading-content">
                    <h5 class="heaing">{{employment.firstName}}</h5>
                  </div>
             </div>

          </div>
  </div>

  <div class="row">
      <div class="col-md-12">
           <label class=" col-lg-12 col-md-12 control-label lable">Document Uploaded</label>
          <div class="col-md-12">
              <div class="row">
                  <div class="col-md-12">
                  <div class="col-md-4 file_upload" >
                    <ul class="listOfAttachments">
                        <li  v-for="(file,index) in employment.files" class="file_upload_top_10 dev-empl-padding">

                                <a :href="url+file.fileDocumentId" :download="file.fileName" target="_blank">  <p  class="downloadFile dev-profile-padding">{{file.fileName}}</p></a>

                        </li>
                    </ul>
                  </div>
               </div>
              </div>
          </div>
      </div>
  </div>
</div>
</section>
  </div>
  </div>

  </div>

  </div>




            </section>
        </div>
      </div>
    </div>
  </template>

<script>

import  AdminSidebar  from  "../../SupperAdminSideBar.vue";
import  AdminHeader  from  "../../adminHeader.vue";

    export default{
        data(){
          return{
              profile:{
               firstName:'',
              lastName:'',
              email:'',
              mobileNumber:'',
              countryName:'',
              city:'',
              postalCode:'',
              line1Address:'',
              attachedfiles:'',
              countryId:'',
              developerId:'',
              internationalCallingCode:'',
              'files':[],
              },
              countryList:'',
              file:'',
               url:this.$store.state.SERVER_URL +'/download-file/',
               developerDetail:'',
               getFileUrl:this.$store.state.SERVER_URL +'/get-file/'
          }
          developerId:this.$route.params.id;
        },
         created: function(){

        },
         components:{
           'appAdminSidebar': AdminSidebar,
          'appAdminHeader': AdminHeader,
        },
        mounted: function(){
          console.log("developer id is----"+this.$route.params.id);
            this.getDevDetail();
        },
        methods:{
          getDevDetail: function(){
            var app = this;
            app.$store.commit('setSpinner',true);
                app.$http.get(
                    this.$store.state.SERVER_URL + '/admin/get-developer-details/'+app.$route.params.id, {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')

                        },

                    }
                ).then(function(response) {
                  app.$store.commit('setSpinner',false);
                    app.developerDetail = response.data.payLoad;
                    console.log("developer details----------------");
                    console.log(response.data.payLoad);


                });

    },
        }


    }
</script>

</style>
