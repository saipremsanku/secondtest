<template>
    <div>

      <link rel="stylesheet" href="/src/assets/css/intlTelInput.css">
     <link rel="stylesheet" href="/src/assets/css/demo.css">


<div class="row">
    <div class="lg-container col-md-10 col-md-offset-1">
        <div class="profile-main-content-header">
            <div class="row">
                <div class="col-md-6">
                    <div class="image-section">

                        <form enctype="multipart/form-data" novalidate>
                        <div class="col-md-12">
                            <div class="image-border margin-left-pro">
                                <!-- <img src="../../assets/images/avatar.pnPortaitg" alt="ProfileImage"> -->

                                  <img :src="getFileUrl+profilePicDocumentId" alt="ProfileImage" v-if="profilePicDocumentId!=null">
                                  <img src="" v-else>
                                  <!-- <img src="../../assets/images/avatar.png" alt="ProfileImage"v-else> -->
                                <!-- <label>
                                <button type="button" class="btn btn-attachemnet btn-attachemnet-second-step">
                                            <span><i class="fa fa-plus profile-fa-icon" aria-hidden="true"></i></span>
                                          </button>
                                 <input type="file" class="input-hidden" name="ProfessionalImage" V-model="ProfessionalImage" @change="onFileChangeProfessionalImage">
                                 </label> -->
                                 <div class="dev-profile-img dev-hidden-professional">
                                    <input  type="file" name="ProfessionalImage"  @change="onFileChangeProfessionalImage">
                                  </div>
                            </div>
                            <span class="image-heading image-content-left">
                                            <h4>Professional Portait</h4>
                                             <span class="image-content">
                                             Please upload a professional looking <br>
                                             photo that clearly shows your face
                                            </span>
                                   </span>
                        </div>

                      </form>

                    </div>

                </div>


                <div class="col-md-6">
                    <div class="image-section">
                        <form enctype="multipart/form-data" novalidate>
                        <div class="col-md-12">
                            <div class="image-border">
                                  <img :src="getFileUrl+avatarDocumentId" alt="ProfileImage" v-if="avatarDocumentId!=null">
                                  <img :src="'https://api.adorable.io/avatars/200/'+email" v-else>
                                      <div class="dev-profile-img dev-hidden-professional">
                                            <input type="file" class="input-hidden"  name="avatarImage"  @change="onFileChangeAvatarImage">
                                      </div>
                                    </div>

                            <span class="image-heading">
                                        <h4> Avatar</h4>
                                       <span class="image-content"> You can choose upload another cool <br>
                                       photo of yours to be used as profile photo</span>
                            </span>
                        </div>
                      </form>
                    </div>
                </div>

            </div>

        </div>


        <!-- <div class="col-md-12">
        <div class="form-group" :class="{'input': true, 'is-danger': errors.has('taskName')}">
        <input type="text" class="form-control Design" id="taskName" placeholder="Task Title " name="taskName" v-model="task.taskName" v-validate data-vv-rules="required">
        <p class="text-danger" v-if="errors.has('taskName')">Please enter task title</p>
        </div>
        </div> -->




        <div class="profile-main-content">
          <span v-if="isFileValidate" class="vaildate">Please upload your professional portrait
          </span>
            <div class="form-section pdt-3p">
            <p class="pull-right rpd-15"><a href="/change-password">Change Password</a></p>
            <br><br>
              <!-- <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('firstName') }">
                <label class="col-md-12 control-label" for="First Name">First Name</label>
                <div class="col-md-12">
                  <input  name="firstName" type="text" class="form-control" v-model="firstName" v-validate:firstName ="'required'">
                      <p class="text-danger" v-if="errors.has('firstName')">Please enter your first name</p>
                </div>
              </div> -->

                    <div class="row">
                        <!-- <div class="col-md-6">
                        <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('firstName') }">
                                <label class="col-md-12 control-label label-newsize">First Name</label>
                                <div class="col-md-12">
                                      <input  name="firstName" type="text" class="form-control" v-model="firstName" v-validate:firstName ="'required'">
                                      <p class="text-danger" v-if="errors.has('firstName')">Please enter your first name</p>
                                </div>
                            </div>
                        </div> -->

                        <div class="col-md-6">
                            <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('firstName')}">
                                <label class="col-md-12 control-label label-newsize">First Name<span class="mandatory">*</span></label>
                                <div class="col-md-12">
                                    <input name="firstName" type="text"  class="form-control" v-model="firstName" v-validate:firstName="'required'">
                                        <p class="text-danger" v-if="errors.has('firstName')">Please enter your first name</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('lastName')}">
                                <label class="col-md-12 control-label label-newsize">Last Name<span class="mandatory">*</span></label>
                                <div class="col-md-12">
                                    <input  name="lastName"  type="text"  class="form-control" v-model="lastName" v-validate:lastName="'required'">
                                      <p class="text-danger" v-if="errors.has('lastName')">Please enter your Last name</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6"  >
                            <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('email')}">
                                <label class="col-md-12 control-label label-newsize">E-Mail<span class="mandatory">*</span></label>
                                <div class="col-md-12">
                                    <input name="email" type="email"  class="form-control" v-model="email" v-validate:email="'required|email'" readonly v-if="this.$store.getters.getLoggedInUser.developerType=='INTERNAL'">
                                        <input name="email" type="email"  class="form-control" v-model="email" v-validate:email="'required|email'" v-else>
                                        <p class="text-danger" v-if="errors.has('email')">Please enter your Email</p>
                                </div>
                            </div>
                        </div>
                          <div class="col-md-6">
                              <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('mobileNumber')}">
                            <label class="col-md-12 control-label" for="mobileNumber">Mobile No.<span class="mandatory">*</span></label>

                              <div class="col-md-12">
                                <input id="phone"   class="form-control" name="mobileNumber"  v-model="mobileNumber" type="tel"  min="1"  v-validate:mobileNumber="'required'"/>
                                    <p class="text-danger" v-if="errors.has('mobileNumber')">Please enter your contact no.</p>
                              </div>
                            </div>
                        </div>
                    </div>




                    <div class="row">
                        <div class="col-md-6">
                            <div class=" form-group customform-group">
                                <label class="col-md-12 control-label label-newsize">Country <span class="mandatory">*</span></label>
                                <div class="col-md-12">
                                    <select class="form-control" v-model="countryId" name="countryId" :class="{'select': true, 'is-danger': errors.has('countryId')}" v-validate:countryId="'required'">
                                        <option  value="" disabled>Select country</option>
                                                <option  v-for="country in this.$store.getters.getLoggedInUser.countryList" :value="country.id" :selected="country.id == countryId">{{country.name}}</option>
                                            </select>
                                            <p class="text-danger" v-if="errors.has('countryId')">Please select a country</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('city')}">
                                <label class="col-md-12 control-label label-newsize">City<span class="mandatory">*</span></label>
                                <div class="col-md-12">
                                    <input  type="text"  class="form-control" name="city"  v-model="city" v-validate:city="'required'">
                                          <p class="text-danger" v-if="errors.has('city')">Please enter city</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('postalCode')}">
                                <label class="col-md-12 control-label label-newsize">Zipcode<span class="mandatory">*</span></label>
                                <div class="col-md-12">
                                    <input name="postalCode" type="text"  class="form-control" v-model="postalCode" v-validate:postalCode="'required|numeric'">
                                                <p class="text-danger" v-if="errors.has('postalCode')">Please enter zipcode</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('line1Address')}">
                                <label class="col-md-12 control-label label-newsize">Full Address<span class="mandatory">*</span></label>
                                <div class="col-md-12">
                                    <textarea class="form-control" name="line1Address"  v-model="line1Address" v-validate:line1Address="'required'" ></textarea>
                                        <p class="text-danger" v-if="errors.has('line1Address')">Please enter your full address</p>
                                </div>
                            </div>
                        </div>
                    </div>
               <div class="row">
                <form enctype="multipart/form-data" novalidate>
                <div class="col-md-12">
                     <label class=" col-lg-12 col-md-12 control-label ">ID Proof <small>(preferably Passport)</small></label>
                   <div class="col-md-2">
                       <div class="uploadFile">
                       <input type="file" multiple :name="file" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                        accept="image/*" class="input-file">
                        </div>

                   </div>
                   <p class="text-danger" v-if="isFileLarge">File size exceed max. allowed limit of 5MB</p>
                   <p class="text-danger" v-if="isFileEmpty">Please upload copy of your identity proof</p>
                    <div class="col-md-10">
                        <div class="row">
                            <div class="col-md-12">
                            <div class="col-md-4 file_upload"  v-for="(file,index) in files">
                                <!-- <img :src="getFileUrl+file.fileDocumentId"> -->
                                <div class="file_heigh_width">
                                    <span class="fileUploadCss"><p>{{file.fileName}}</p> <a :href="url+file.fileDocumentId" download><i class="fa fa-download download_file" aria-hidden="true"></i></a ><i class="fa fa-times" aria-hidden="true" @click="deleteFile(file.fileDocumentId,index)"></i></span>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
             </form>
                  </div>
                </form>

            </div>
            <div class="profile-main-content-footer text-center">
                <button type="button" class="btn btn-orange pull-right" @click="submitProfile()">Next</button>
            </div>
        </div>


    </div>
</div>

         <!--   </div>
        </section>--><!-- wizard section-->

    </div>
</template>

<script>

   import adminHeader  from "../../adminHeader.vue"

    export default{
         props: ['updateStep'],
        data(){
            return{

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
                iso2:'',
                'files':[],
                profilePicDocumentId:null,
                ProfessionalImage:'',
                avatarDocumentId:'',
                avatarImage:'',
                file:'',
                isFileValidate:false,
                isFileLarge:false,
                isFileEmpty:false,
                url:this.$store.state.SERVER_URL +'/download-file/',
                getFileUrl:this.$store.state.SERVER_URL +'/get-file/'

            }
        },
        created: function(){
          this.avatarDocumentId = this.$store.getters.getLoggedInUser.profilePicDocumentId;
          console.log("-------profile id -----------------------"+this.profilePicDocumentId);

                $.getScript('/src/assets/js/intlTelInput.js');
                $.getScript('/src/assets/js/country.js');

        },
        mounted: function(){
          this.setCountryData();
          this.getProfileDetails();
        },
        methods:{
          onFileChangeAvatarImage(e) {
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.createImageAvatarImage(files[0]);
        },
        createImageAvatarImage(file) {
          var image = new Image();
          var reader = new FileReader();
          var vm = this;
          reader.onload = (e) => {
              const formData = new FormData();
                formData.append('file',file);

                vm.$http.post(vm.$store.state.SERVER_URL +'/api/developer/upload-developer-profile-picture',formData,
                        {
                             headers: {
                                    "X-Authorization": vm.$cookie.get('X-Authorization')
                                },
                        }).then((response) => {
                          console.log(response);
                                          vm.avatarDocumentId = response.data.payLoad.fileDocumentId;
                                          var loggedInUser = this.$store.getters.getLoggedInUser;
                                             loggedInUser.profilePicDocumentId =response.data.payLoad.fileDocumentId;
                                              vm.$store.commit('setLoggedInUser', loggedInUser);
                    }, (response) => {
                  });
        };
          reader.readAsDataURL(file);
        },

        onFileChangeProfessionalImage(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createProfessionalImage(files[0]);
      },
      createProfessionalImage(file) {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;
        reader.onload = (e) => {
          const formData = new FormData();
            formData.append('file',file);
            var url ='';
            if(vm.profilePicDocumentId!=null){
               url = '/api/developer/upload-developer-professional-picture/'+vm.profilePicDocumentId;
               console.log("given id are----------"+vm.profilePicDocumentId);

            }else{
               url = '/api/developer/upload-developer-professional-picture';
            }
            vm.$http.post(vm.$store.state.SERVER_URL +url,formData,
                    {
                         headers: {
                                "X-Authorization": vm.$cookie.get('X-Authorization')
                            },
                    }).then((response) => {
                      console.log(response);
                                vm.profilePicDocumentId = response.data.payLoad.fileDocumentId;
                                vm.isFileValidate= false;

                }, (response) => {
              });

        };
  reader.readAsDataURL(file);
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
          console.log("file size are ----");
          console.log(fileList[0].size);
        //console.log(ele.target.name);
        if(fileList[0].size <=5000000){
          app.isFileLarge= false;
        app.$http.post(app.$store.state.SERVER_URL +'/api/developer/upload-developer-id-proof', formData,
                {
                     headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')

                        },
                }).then((response) => {
                        console.log("response.playLoad.data"+response.data.payLoad);
                           app.files.push(response.data.payLoad);
                             app.isFileEmpty=false;
            }, (response) => {
          });
        }else{
          app.isFileLarge= true;

        }

      },
     deleteFile:function(fileId,index){
         var app =this;
         app.$http.post(app.$store.state.SERVER_URL +'/api/developer/delete-id-proof/'+fileId,app.dummyObject,
                {
                     headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')

                        },
                }).then((response) => {

                        console.log("response.playLoad.data"+response.data.payLoad);
                           app.files.splice(index,1);
            }, (response) => {
          });

    },

         getProfileDetails: function(){
            var app = this;
            // app.$store.commit('setSpinner',true);
            //     app.$http.get(
            //         this.$store.state.SERVER_URL + '/api/developer/get-developer-details', {
            //             headers: {
            //                 "X-Authorization": app.$cookie.get('X-Authorization')
            //
            //             },
            //
            //         }
            //     ).then(function(response) {
            //       app.$store.commit('setSpinner',false);
                    // app.profile = response.data.payLoad;
                    //console.log(response.data.payLoad);

                   var profile = app.$store.getters.getLoggedInUser;

                    app.firstName = profile.firstName;
                    app.lastName = profile.lastName;
                    app.countryId = profile.countryId;
                    app.email=profile.email;
                    app.mobileNumber=profile.mobileNumber;
                    app.developerId= profile.developerId,
                    app.countryName = profile.countryName;
                    app.city= profile.city;
                    app.postalCode = profile.postalCode;
                    app.line1Address= profile.line1Address;
                    app.internationalCallingCode = profile.internationalCallingCode;
                    app.iso2 = profile.iso2;
                    app.files = profile.files;
                    app.profilePicDocumentId = profile.developerProfessionalPicId;
                    setTimeout(() => {
                    app.errors.clear();
                      }, 10);
              //  });

        },


            submitProfile: function(){
                var app =this;
                var profile = app.$data;
                profile.iso2 = $(".country[class*='highlight']").attr("data-country-code");
                profile.internationalCallingCode = $(".selected-dial-code").text();
                //console.log(profile);
              if(app.profilePicDocumentId==null || app.profilePicDocumentId==''){
                app.isFileValidate= true;
              }else{
                app.$validator.validateAll();
                  if (!app.errors.any()) {
                    // console.log("files are-----");
                    // console.log(app.files);
                    if(app.files && app.files.length == 0){
                      app.isFileEmpty=true;
                    }else{
                      app.isFileEmpty=false;
               app.$http.post(
                app.$store.state.SERVER_URL+'/api/developer/update-developer-profile',
                profile,
                {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')
                        },
                }
               ).then(function (response) {
                //console.log(response.data);
                if(response.data.status=="SUCCESS"){

                 app.firstName=response.data.payLoad.firstName;
                 app.lastName=response.data.payLoad.lastName;
                 app.email=response.data.payLoad.email;
                 app.mobileNumber=response.data.payLoad.mobileNumber;
                 app.countryName = response.data.payLoad.countryName;
                 app.city= response.data.payLoad.city;
                 app.postalCode = response.data.payLoad.postalCode;
                 app.line1Address= response.data.payLoad.line1Address;
                 app.files = response.data.payLoad.files;
                 app.countryId= response.data.payLoad.countryId,
                 app.developerId= response.data.payLoad.developerId,
                 app.internationalCallingCode = response.data.payLoad.developerId;

                 app.$cookie.set('isMobileVerified',response.data.payLoad.isMobileVerified, 1);
                 app.$cookie.set('isEmailVerified',response.data.payLoad.isEmailVerified, 1);
                 console.log(response.data.payLoad);

                 if((!response.data.payLoad.isEmailVerified) || (!response.data.payLoad.isMobileVerified)){
                             app.$router.push('/verify-user');

                 }else{
                    app.$store.commit('setDeveloperWizardStep', 2);
                 }

                   }else{
                       console.log('Error!:', response.data.errorMessage);
                   }

            }, function (response) {
                console.log('Error!:', response.data);

            });
                }
          }//end of file validation
        }//end of else

            },
            onFileChange: function(){

            },
            setCountryData(){
              var app = this;
              var profile = app.$store.getters.getLoggedInUser;
              setTimeout(()=>{
                $(".selected-flag .iti-flag").attr('class', '');
                $(".selected-flag div:nth-child(1)").attr('class', 'iti-flag '+profile.iso2);
                $(".selected-flag div:nth-child(2)").attr('class', 'selected-dial-code').text(profile.internationalCallingCode);
                $('.country').removeClass('highlight active');
                $('*[data-country-code='+profile.iso2+']').addClass('highlight active');
              },1)
            },
        },
         components:{
            "app-adminHeader":adminHeader
        },
    }
</script>
<style>
    /*.input-hidden {
    display: none !important;
}*/
    .profile-main-content-header {
            height: 125px !important;
    }
    .image-border{
     width: 80px !important;
    height: 80px !important;
    border: 5px solid white !important;
    border-radius: 50% !important;
    background-color: gray !important;
    margin-top: 21px !important;
    text-align: center;
    line-height: 70px;
    }
    .margin-left-pro{
       margin-left: 20px;
    }
    .image-heading{
     position: absolute;
    top: 17%;
    left: 28%;
    }
    .image-content{
     color: white;
    font-size: 12px;
    font-weight: bold;
    }
    .image-heading h4{
    color: white;
    font-weight: 800;
    }
    .image-content-left{
        left: 31% !important;
    }
    .profile-fa-icon{
        color: black !important;
    font-size: 14px;
    position: absolute;
    top: 75%;
    border: 1px solid white;
    border-radius: 50%;
    background-color: white;
    padding: 4px;
    left: 18%;
    }
    .avatar-fa-icon{
        left: 14% !important;
    }
    .fileUploadCss{
    display: inline-block;
    height: 33px;
    /*width: 86%;*/
    background-color: #f2f3f4;
    padding: 5px 20px 5px 20px;
    text-overflow: ellipsis !important;
    color: black;
    font-weight: 600;
    border: 1px solid #E2E2E2;
     position: relative;
    overflow: hidden;
        text-overflow: ellipsis;
            margin: 3px 3px;
    }

   .fileUploadCss .download_file{
       text-align: center;
      color: #3a50c7;
     position: absolute;
       left: 0;
       opacity: 0;
    }
     .fileUploadCss .download_file:hover{
       opacity: 1;
    }

    .fileUploadCss .fa-download:before {
    content: "\f019";
    border: 2px dotted blue;
    border-radius: 50%;
    font-size: 28px;
    color: navy;
}
   .fileUploadCss p{
    text-overflow: ellipsis;
    overflow: hidden;
    color: #0071bc;
    font-weight: 600;
    font-size: 15px;
    }



    .fileUploadCss  i{
    border-left: 1px solid #E2E2E2;
    z-index: 10px;
    line-height: 31px;
    margin-left: 3px;
    }

    .fileUploadCss  i:hover{
          color: #f46868;
        cursor: pointer;
    }


  /*.file_upload{
      margin-top: 14px;

    }*/
    .file_upload i{
    font-size: 19px;
    position: absolute;
    top: 0px;
    color:#d2c5c5;
    right: 0;
    padding-left: 5px;
    padding-right: 5px;
    }
    .vaildate{
      background-color: white;
      color:#ed5249;
    }

</style>
