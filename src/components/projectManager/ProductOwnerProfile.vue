<template>
    <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
      <pmSidebar :projectRequestId="projectRequestId"></pmSidebar>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
             <projectInfoHeader ></projectInfoHeader>
          <section class="content">
              <h4 class="text-center">PO Profile</h4>
              <div class="row">

                  <div class="col-md-12">


                      <div class="profile-main-content">
                           <div class="row">
                            <div class="col-md-2">
                                     <div class="image-section">
                                                          <div class="col-md-12">
                                                              <div class="image-border margin-left-class">
                                                                <img :src="getFileUrl+profile.profilePicDocumentId" v-if="profile.profilePicDocumentId!=null">
                                                                      <img :src="'https://api.adorable.io/avatars/200/'+profile.email" v-else>
                                                                  <!-- <img src="../../assets/images/avatar.png" alt="ProfileImage" v-else> -->
                                                                   <label>
                                                                  </label>
                                                              </div>
                                                          </div>
                                                      </div>

                          </div>
                       <div class="col-md-10">
                          <div class="form-section">
                              <form id="profileForm">
                                  <div class="row">
                                      <div class="col-md-6">
                                          <div class=" form-group customform-group">
                                              <label class="col-md-12 control-label label-newsize">First Name</label>
                                              <div class="col-md-12">
                                                  <input name="firstName" type="text" class="form-control" v-model="profile.firstName" readonly>
                                              </div>
                                          </div>
                                      </div>

                                      <div class="col-md-6">
                                          <div class=" form-group customform-group">
                                              <label class="col-md-12 control-label label-newsize">Last Name</label>
                                              <div class="col-md-12">
                                                  <input name="lastName" type="text" class="form-control" v-model="profile.lastName" readonly>
                                              </div>
                                          </div>
                                      </div>
                                  </div>



                                  <div class="row">
                                      <div class="col-md-12">
                                          <div class=" form-group customform-group">
                                              <label class="col-md-12 control-label label-newsize">Company Name</label>
                                              <div class="col-md-12">
                                                  <input name="postalCode" type="text" class="form-control" v-model="profile.postalCode" readonly>
                                              </div>
                                          </div>
                                      </div>
                                  </div>




                                  <div class="row">
                                      <div class="col-md-6">
                                          <div class=" form-group customform-group">
                                              <label class="col-md-12 control-label label-newsize">E-Mail</label>
                                              <div class="col-md-12">
                                                  <input name="email" type="email" class="form-control" v-model="profile.email" readonly>
                                              </div>
                                          </div>
                                      </div>



                                      <!-- Conatct Number input-->


                                     <div class="col-md-6">
                                         <div class=" form-group customform-group">
                                             <label class="col-md-12 control-label label-newsize">Mobile Number</label>
                                             <div class="col-md-12">
                                                 <input name="email" type="email" class="form-control width-mobile" v-model="fullMobileNumber" readonly>
                                             </div>
                                         </div>
                                     </div>




                                  </div>

                                  <div class="row">
                                      <div class="col-md-6">
                                          <div class=" form-group customform-group">
                                              <label class="col-md-12 control-label label-newsize">Country</label>
                                              <div class="col-md-12">
                                                  <input  type="text" class="form-control" v-model="profile.countryName" readonly>
                                                   <!-- <select class="form-control" v-model="profile.countryName">
                                                       <option  value="profile.countryName" selected readonly>{{profile.countryName}}</option>

                                                  </select> -->
                                              </div>
                                          </div>
                                      </div>

                                      <div class="col-md-6">
                                          <div class=" form-group customform-group">
                                              <label class="col-md-12 control-label label-newsize">City</label>
                                              <div class="col-md-12">
                                                  <input name="city" type="text" class="form-control" v-model="profile.city" readonly>

                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div class="row">
                                      <div class="col-md-6">
                                          <div class=" form-group customform-group">
                                              <label class="col-md-12 control-label label-newsize">Zipcode</label>
                                              <div class="col-md-12">
                                                  <input name="postalCode" type="text" class="form-control" v-model="profile.postalCode" readonly>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div class="row">
                                      <div class="col-md-12">
                                          <div class=" form-group customform-group">
                                              <label class="col-md-12 control-label label-newsize">Full Address</label>
                                              <div class="col-md-12">
                                                  <textarea rows="5" class="form-control" name="line1Address" v-model="profile.line1Address" readonly></textarea>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </form>
                          </div>
                        </div>
                    </div>
                    </div>
                  </div>
              </div>
          </section>
      </div>
          <!-- end content wrapper -->
      </div>


    </div>
</template>
 <script src="assets/js/wizard.js"></script>
<script>

    import adminHeader from "../../adminHeader.vue";

    import pmSidebar from "../../ProjectSidebar.vue"

    import projectInfoHeader from "../../projectInfoHeader.vue";


    export default {
      data(){
           return{
               profile:{},
               projectRequestId: this.$store.getters.getProjectInfo.id,
               productOwnerId:this.$route.params.productOwnerId,
                 getFileUrl:this.$store.state.SERVER_URL +'/get-file/',
                 fullMobileNumber:''

           }
         },
         created : function(){
           console.log("pproduct owner id ----"+this.$route.params.productOwnerId);

         },
         components:{
             'app-adminHeader':adminHeader,
             'projectInfoHeader':projectInfoHeader,
             'pmSidebar':pmSidebar
         },
          mounted:function(){
              var app = this;
              console.log("=====================================")
              console.log(this.$store.getters.getProjectInfo.id);
              this.getProfile();
         },
         methods:{
              changePasswordType: function(show){
           },
           getProfile: function(){
                     var app = this;
                     app.$store.commit('setSpinner',true);
                 app.$http.get(
                         app.$store.state.SERVER_URL+'/api/pm-admin/getPoProfileData/'+app.productOwnerId+'/'+app.projectRequestId,
                        {
                          headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')
                          }
                      }
                 ).then(function(response) {

                       app.$store.commit('setSpinner',false);
                        if(response.data.status === "SUCCESS"){

                          console.log("Product owner profile----------------");
                          console.log(response.data.payLoad);
                          app.profile = response.data.payLoad;
                          app.fullMobileNumber = response.data.payLoad.internationalCallingCode + response.data.payLoad.mobileNumber;
                        }else{
                        }
                   });
       },
     }
 }
</script>
<style scoped="true">

    .form-section{
        padding-top: 25px !important;

    }
    .margin-left-class{
            margin-left: 26px;
    }

   .btn-attachemnet{
            left: -23px !important;
    position: relative !important;
    top: -15px !important;
       border: none !important;
    }

    .form-section{
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

</style>


</style>
