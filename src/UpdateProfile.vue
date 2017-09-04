<template>
<div>
  <link rel="stylesheet" href="/src/assets/css/intlTelInput.css">
  <link rel="stylesheet" href="/src/assets/css/demo.css">

  <div class="wrapper">
    <!-- Main Header -->
    <app-adminHeader></app-adminHeader>
    <app-pm-sidebar v-if="this.$store.getters.getLoggedInUser.role=='PROJECT_MANAGER'"></app-pm-sidebar>
      <app-fm-sidebar v-if="this.$store.getters.getLoggedInUser.role=='FINANCE_USER'"></app-fm-sidebar>
    <app-product-owner-sidebar v-if="this.$store.getters.getLoggedInUser.role=='PRODUCT_OWNER'"></app-product-owner-sidebar>

    <alert-component v-show="isalertShow" :success="success" :message="message" :messageList="messageList">
    </alert-component>

    <div class="alert  inspirage-danger" style="display:none" v-show="message1" role="alert">
            {{errorMessage}}
    </div>
    <div class="content-wrapper">
      <section class="content">
        <h2 class="text-center">Profile</h2>
        <div class="row">

          <div class="col-md-12">

            <form id="profileForm" @submit.prevent="profileUpdateForm">
              <div class="profile-main-content">
                <div class="row">
                  <div class="col-md-2">
                    <div class="image-section">
                      <div class="col-md-12">
                        <div class="image-border center-margined">
                          <img :src="getFileUrl+profilePicId" alt="ProfileImage" v-if="profilePicId!=null">
                          <img :src="'https://api.adorable.io/avatars/200/'+profile.email" v-else>
                          <div class="dev-profile-img dev-hidden-professional">
                            <input type="file" class="input-hidden" name="file" @change="onFileChangeProfilePic">
                          </div>
                        </div>

                        <br>
                        <p class="text-danger" v-if="isFileLarge">File size exceed max. allowed limit of 5MB</p>
                        <!-- <p class="text-center"><a href="/change-password">Change Password</a></p> -->
                      </div>
                    </div>
                    <div class="text-center">
                      <button type="button" class="btn btn-orange-admin-assing update-profile-password" @click="changePassword()">Change Password</button>
                    </div>

                  </div>
                  <div class="col-md-10">
                    <div class="form-section">

                      <div class="row">
                        <div class="col-md-6">
                          <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('firstName') }">
                            <label class="col-md-12 control-label label-newsize">First Name
                                                    <span class="mandatory">*</span>
                                                </label>
                            <div class="col-md-12">
                              <input name="firstName" type="text" class="form-control" v-model="profile.firstName" v-validate data-vv-rules="required">
                              <p class="text-danger" v-if="errors.has('firstName')">Please enter first name</p>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('lastName') }">
                            <label class="col-md-12 control-label label-newsize">Last Name <span class="mandatory">*</span></label>
                            <div class="col-md-12">
                              <input name="lastName" type="text" class="form-control" v-model="profile.lastName" v-validate data-vv-rules="required">
                              <p class="text-danger" v-if="errors.has('lastName')">Please enter last name</p>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div class="row">
                        <div class="col-md-12">
                          <div class=" form-group customform-group">
                            <label class="col-md-12 control-label label-newsize">Company Name</label>
                            <div class="col-md-12">
                              <input name="postalCode" type="text" class="form-control" v-model="profile.companyName">
                            </div>
                          </div>
                        </div>
                      </div>



                      <div class="row">
                        <div class="col-md-6">
                          <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('email') }">
                            <label class="col-md-12 control-label label-newsize">E-Mail <span class="mandatory">*</span></label>
                            <div class="col-md-12">
                              <input name="email" type="email" class="form-control" v-model="profile.email" v-validate data-vv-rules="required" v-if="role=='PRODUCT_OWNER'">
                              <input name="email" type="email" class="form-control" v-model="profile.email" readonly v-validate data-vv-rules="required" v-else>
                              <p class="text-danger" v-if="errors.has('email')">Please enter email</p>
                            </div>
                          </div>
                        </div>

                        <!-- Conatct Number input-->

                        <div class="col-md-6">
                          <div class=" form-group customform-group" :class="{'input': true, 'is-danger': errors.has('mobileNumber') }">
                            <label class="col-md-12 control-label" for="mobileNumber">Mobile No. <span class="mandatory">*</span></label>

                            <div class="col-md-12 text-left">
                              <input id="phone" class="form-control text-center" v-on:keyup="keymonitor" name="mobileNumber" v-model="profile.mobileNumber" type="tel" min="1">
                              <!-- <input id="phone"   class="form-control" name="mobileNumber" v-model="profile.mobileNumber" type="tel"  min="1"  v-validate data-vv-rules="required"  /> -->
                              <p class="text-danger" v-if="errors.has('mobileNumber')">Please enter mobile number</p>
                            </div>
                          </div>
                        </div>

                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class=" form-group customform-group">
                            <label class="col-md-12 control-label label-newsize">Country</label>
                            <div class="col-md-12">
                              <select class="form-control" name="countryId" v-model="countryId">
                                                         <option  value="" disabled>Select country</option>
                                                         <option  v-for="country in countryList" :value="country.id" >{{country.name}}</option>
                                                    </select>
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class=" form-group customform-group">
                            <label class="col-md-12 control-label label-newsize">City</label>
                            <div class="col-md-12">
                              <input name="city" type="text" class="form-control" v-model="profile.city">

                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <div class=" form-group customform-group">
                            <label class="col-md-12 control-label label-newsize">Zipcode</label>
                            <div class="col-md-12">
                              <input name="postalCode" type="text" class="form-control" v-model="profile.postalCode">
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-12">
                          <div class=" form-group customform-group">
                            <label class="col-md-12 control-label label-newsize">Full Address</label>
                            <div class="col-md-12">
                              <textarea rows="5" class="form-control" name="line1Address" v-model="profile.line1Address"></textarea>
                            </div>
                          </div>
                        </div>
                      </div>







                    </div>

                  </div>

                </div>
              </div>
              <div class="profile-main-content-footer text-center">
                <button type="submit" class="btn btn-orange" v-touch-ripple>Update</button>
              </div>
            </form>

          </div>
        </div>
      </section>
    </div>


  </div>


</div>
</template>

<script>
import adminHeader from './adminHeader.vue';
import PMSideBar from "./PMSideBar.vue";
import FMSideBar from "./fmSidebar.vue";
import ProductOwnerSidebar from "./ProductOwnerSidebar.vue";
import {
  EventBus
} from './assets/js/event-bus.js';
import AlertComonent from "../src/components/alert/Alert.vue"
export default {


  data() {
    return {
      display: true,
      countryList: [],
      countryId: '',
      profile: {},
      isalertShow: false,
      success: false,
      message: '',
      message1: false,
      errorMessage:'',
      messageList: [],
      isFileLarge: '',
      role: '',
      profilePicId: null,
      getFileUrl: this.$store.state.SERVER_URL + '/get-file/'
    }
  },
  created: function() {
    this.profilePicId = this.$store.getters.getLoggedInUser.profilePicDocumentId;
    this.role = this.$store.getters.getLoggedInUser.role;
    console.log(this.$store.getters.getLoggedInUser);
    $.getScript('/src/assets/js/intlTelInput.js'); // calling the wizard js when component load
    $.getScript('/src/assets/js/country.js'); // calling the wizard js when component load
  },
  components: {
    'app-adminHeader': adminHeader,
    "alert-component": AlertComonent,
    "app-pm-sidebar": PMSideBar,
    "app-fm-sidebar": FMSideBar,
    "app-product-owner-sidebar": ProductOwnerSidebar,
  },
  mounted: function() {
    var app = this;
    app.profile = app.$store.getters.getLoggedInUser;
    app.countryId = app.$store.getters.getLoggedInUser.countryId;
    app.countryList=app.$store.getters.getLoggedInUser.countryList;

    app.setCountryData();
  },
  methods: {

   setCountryData(){
     var app = this;
     setTimeout(()=>{
       $(".selected-flag .iti-flag").attr('class', '');
       $(".selected-flag div:nth-child(1)").attr('class', 'iti-flag '+app.profile.iso2);
       $(".selected-flag div:nth-child(2)").attr('class', 'selected-dial-code').text(app.profile.internationalCallingCode);
       $('.country').removeClass('highlight active');
       $('*[data-country-code='+app.profile.iso2+']').addClass('highlight active');
     },1)
   },

    changePassword() {
      var app = this;
      app.$router.push('/change-password');

    },

    onFileChangeProfilePic(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createProfileImage(files[0]);
    },
    createProfileImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        const formData = new FormData();
        formData.append('file', file);
        var url = '';

        // /upload-profile-picture/

        console.log(vm.profile);
        if (vm.profile.role === 'PRODUCT_OWNER') {
          if (vm.profilePicId != null) {
            url = '/api/product-owner/upload-profile-picture/' + vm.profilePicId;
          } else {
            url = '/api/product-owner/upload-profile-picture';
          }

        }
        if (vm.profile.role === 'PROJECT_MANAGER') {
          if (vm.profilePicId != null) {
            url = '/api/project-manager/upload-profile-picture/' + vm.profilePicId;
          } else {
            url = '/api/project-manager/upload-profile-picture';
          }
        }

        if (file.size <= 5000000) {
          vm.isFileLarge = false;
          vm.$http.post(vm.$store.state.SERVER_URL + url, formData, {
            headers: {
              "X-Authorization": vm.$cookie.get('X-Authorization')
            },
          }).then((response) => {
            console.log(response);

            vm.profilePicId = response.data.payLoad.fileDocumentId;
            var loggedInUser = this.$store.getters.getLoggedInUser;
            loggedInUser.profilePicDocumentId = response.data.payLoad.fileDocumentId;
            vm.$store.commit('setLoggedInUser', loggedInUser);
          });
        } else {
          console.log("file size large-------------");
          vm.isFileLarge = true;

        }
      };
      reader.readAsDataURL(file);
    },

    changePasswordType: function(show) {
      this.passwordTypePwd = show;
      this.textTypePwd = !show;
    },
    profileUpdateForm: function(e) {
      e.preventDefault;
      var app = this;
      app.$validator.validateAll();

      if (!app.errors.any()) {

        var countryCode = $(".selected-dial-code").text();
        if (countryCode) {
          app.profile.internationalCallingCode = countryCode;
        }
        if (!app.profile.internationalCallingCode) {
          app.$swal("Please select country flag properly!")
        } else {
          console.log(app.profile)
          app.$store.commit('setSpinner', true);
          app.profile.countryId = app.countryId;
          app.profile.iso2 = $(".country[class*='highlight']").attr("data-country-code");
          app.$http.post(
            this.$store.state.SERVER_URL + '/updateUserProfile',
            app.profile, {
              headers: {
                "X-Authorization": app.$cookie.get('X-Authorization')
              }
            }
          ).then(function(response) {
            if (response.data.status === "SUCCESS") {
              app.$store.commit('setSpinner', false);
              app.isalertShow = true;
              app.success = true;

              console.log(response);
              EventBus.$emit('profile-updated', true);
              app.profile = response.data.payLoad;
              console.log(response.data.payLoad);
              //vm.$store.commit('setLoggedInUser', app.profile);
              app.$cookie.set('X-Authorization', response.data.payLoad.xAuth, 1);
              app.$cookie.set('role', response.data.payLoad.role, 1);
              app.$cookie.set('isMobileVerified', response.data.payLoad.isMobileVerified, 1);
              app.$cookie.set('isEmailVerified', response.data.payLoad.isEmailVerified, 1);
              app.$store.commit('setLoggedInUser', response.data.payLoad);
              //  app.$cookie.set('isDeveloperEligible', response.data.payLoad.isDeveloperEligible, 1);
              if (!response.data.payLoad.isMobileVerified && !response.data.payLoad.isEmailVerified) {
                app.message = 'Please verify youremail and mobile number';
              } else if (!response.data.payLoad.isEmailVerified) {
                app.message = 'Please verify your email';
              } else if (!response.data.payLoad.isMobileVerified) {
                app.message = 'Please verify your mobile number';
              } else {
                app.message = 'Sucessfully updated profile';
              }

              setTimeout(() => {
                app.$store.commit('setSpinner', false);
                app.$router.push('/post-login');
              }, 2000);

            } else {
              console.log('-----------------failure----------------' + response.data.status);
              app.$store.commit('setSpinner', false);
            //  app.isalertShow = true;
              //app.success = false;
              app.message1 = true;
              app.errorMessage = response.data.errorMessage;
              setTimeout(function(){
              app.message1 = false;
               }, 3000);
              //app.$swal("Oops somethong went wrong")
            }
          });
        }
      }
    },
    keymonitor(e){
      var app = this;
      if(app.mobileNumber == '' || app.mobileNumber == null) {
        if($(".selected-dial-code").text() == app.profile.internationalCallingCode){
        app.setCountryData();
      }
      }
    },
    onFileChange: function() {

    }
  }
}
</script>

<style scoped="true">
.form-section {
  padding-top: 25px !important;
}

.margin-left-class {
  margin-left: 26px;
}

.btn-attachemnet {
  left: -23px !important;
  position: relative !important;
  top: -15px !important;
  border: none !important;
}

.form-section {
  padding-top: 25px !important;
  left: -31px !important;
  position: relative;
}

.profile-main-content {
  height: auto;
  position: relative;
  width: 80%;
  margin: auto;
}

.input-hidden {
  /*display: none !important;*/
}
</style>
