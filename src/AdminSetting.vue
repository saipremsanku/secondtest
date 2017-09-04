<template>
    <div class="wrapper">
      <!-- Main Header -->
  <app-admin-sidebar></app-admin-sidebar>
      <app-admin-header></app-admin-header>

      <alert-component
      v-show="isalertShow"
       :success="success"
        :message="message"
        :messageList="messageList"
      >
    </alert-component>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
      <section class="content">



          <ul class="nav nav-tabs custom-tab">
            <li class="active">
                <a href="#masterAgreement" data-toggle="tab">
                Master Agreement</a>
            </li>

                <li>
                    <a href="#skill" data-toggle="tab">
                   Skill List </a>
                </li>
                <li>
                    <a href="#charges" data-toggle="tab">
                    Charges</a>
                </li>

            </ul>





     <div class="tab-content">
        <div class="tab-pane " id="Activity">
          <div>

        <div class="manage-skill">
            <div class="row ">
            <div class="col-md-12 col-xs-12 col-sm-12">
                 <div class="col-md-4 col-xs-4 col-sm-4">
                    <div class="form-group">
                     <input type="text" class="form-control" placeholder="Enter Activity Type">
                    </div>

                </div>
                <div class="col-md-4 col-xs-4 col-sm-4">
                      <button type="button" class="btn btn-orange btn-lg" data-toggle="modal" data-target="">Add Activity</button>
                </div>
                <div class="col-md-4 col-xs-4 col-sm-4">

                     <div id="custom-search-input">
                            <div class="form-group">
                        <div class="input-group">
                            <input type="text" class=" form-control search-class-radius" placeholder="Search" />
                           <div class="input-group-addon " style="border-radius: 0px 10px 10px 0px;">  <span class=" glyphicon glyphicon-search  search-class-radius-icon"></span></div>

                        </div>
                            </div>
                        </div>


                </div>
            </div>
            </div>
    </div>



               <table class="table table-hover platform-table-color price-table">
                <tbody>
                    <tr >
                        <th>Activity Type</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    <tr class="text-center">
                         <td>1</td>
                        <td>PM 1</td>
                       <td>
                           <div class="editStory">
                           <ul class="list-group storyList">
                                <li class="list-group-item trasparent-bg"><a type="button"  class="cursor-pointer" ><i class="fa fa-pencil " aria-hidden="true"></i>Edit</a></li>
                                <li class="list-group-item trasparent-bg"><a type="button"  class="cursor-pointer"  ><i class="fa fa-trash-o trasparent-bg" aria-hidden="true"></i> Delete</a></li>
                                </ul>
                            </div>
                         </td>

                    </tr>
                </tbody>
            </table>
            </div>
                </div>
         <div class="tab-pane" id="skill">
             <app-admin-skill></app-admin-skill>

        </div>
    <div class="tab-pane " id="charges">
        <form id="quotationSettingsForm">
            <div class="row table-row-bg">
            <div class="col-md-3 col-xs-3 col-sm-3">
                 <div class="form-group">
                     <div class="row table-mid-table-padding">
                         <div class="col-md-6 col-xs-6 col-sm-6">
                             <label for="email">PO Signup Fee</label>
                    </div>
                     <div class="col-md-6 col-xs-6 col-sm-6">
                    <div class="input-group">
                     <input type="text" class="form-control text-right" name="productOwnerSignUpFee" v-model="productOwnerSignUpFee">
                     <div class="input-group-addon">USD</div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
              <div class="col-md-3 col-xs-3 col-sm-3">
                   <div class="form-group" >
                    <div class="row table-mid-table-padding">
                        <div class="col-md-5 col-xs-5 col-sm-5">
                       <label for="email">Dev Signup Fee</label>
                        </div>
                        <div class="col-md-7 col-xs-7 col-sm-7">
                            <div class="input-group">
                            <input type="text" class="form-control text-right" name="developerSignUpFee" v-model="developerSignUpFee">
                            <div class="input-group-addon">USD</div>
                        </div>
                        </div>
                  </div>
                </div>
            </div>
              <div class="col-md-3 col-xs-3 col-sm-3">
                  <div class="form-group">
                      <div class="row table-mid-table-padding">
                             <div class="col-md-6 col-xs-6 col-sm-6">
                                 <label for="email">Default Advance</label>
                        </div>
                             <div class="col-md-6 col-xs-6 col-sm-6">
                      <div class="input-group">
                        <input type="text" class="form-control text-right" name="indicativePercentageAdvance" v-model="indicativePercentageAdvance">
                       <div class="input-group-addon">%</div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-xs-3 col-sm-3">
                <div class="form-group">
                    <div class="row table-mid-table-padding">
                           <div class="col-md-6 col-xs-6 col-sm-6">
                               <label for="email">Fair Price Percentage</label>
                      </div>
                           <div class="col-md-6 col-xs-6 col-sm-6">
                    <div class="input-group">
                      <input type="text" class="form-control text-right" name="fairPricePercentage" v-model="fairPricePercentage">
                     <div class="input-group-addon">%</div>
                      </div>
                      </div>
                  </div>
              </div>
          </div>
         </div>
            <div class="row">
                <div class="col-md-12">
                <table class="table table-hover platform-table-color price-table">
                <tbody>

                    <tr>
                        <th>Activity Type</th>
                        <th>Default Hourly Charges (USD)</th>
                    </tr>

                    <tr  class="text-center">
                         <td>Business Analysis</td>
                        <td>
                            <div class="input-group charges-input-filed-center">
                              <input type="text" class="form-control text-right" name="indicativeBillingAnalysis" v-model="indicativeBillingAnalysis">
                            </div>
                        </td>
                    </tr>
                    <tr  class="text-center">
                         <td>UX/UI Design</td>
                        <td>
                            <div class="input-group charges-input-filed-center">
                              <input type="text" class="form-control text-right"  name="indicativeBillingDesign" v-model="indicativeBillingDesign">
                            </div>
                        </td>
                    </tr>
                    <tr  class="text-center ">
                         <td>Front End Development</td>
                        <td>
                            <div class="input-group charges-input-filed-center">
                              <input type="text" class="form-control text-right" name="indicativeBillingFrontEnd" v-model="indicativeBillingFrontEnd">
                            </div>
                        </td>
                    </tr>
                    <tr  class="text-center">
                         <td>Back End Development</td>
                        <td>
                            <div class="input-group charges-input-filed-center">
                              <input type="text" class="form-control text-right" name="indicativeBillingBackEnd" v-model="indicativeBillingBackEnd">
                            </div>
                        </td>
                    </tr>
                    <tr  class="text-center">
                         <td>Quality Assurance</td>
                        <td>
                            <div class="input-group charges-input-filed-center">
                              <input type="text" class="form-control text-right" name="indicativeBillingQA" v-model="indicativeBillingQA">
                            </div>
                        </td>
                    </tr>
                    <tr  class="text-center">
                         <td>Support & DevOps</td>
                        <td>
                            <div class="input-group charges-input-filed-center">
                              <input type="text" class="form-control text-right" name="indicativeBillingSupport" v-model="indicativeBillingSupport">
                            </div>
                        </td>
                    </tr>
                    <tr  class="text-center">
                         <td>iOS Native</td>
                        <td>
                            <div class="input-group charges-input-filed-center">
                              <input type="text" class="form-control text-right" name="indicativeBillingIos" v-model="indicativeBillingIos">
                            </div>
                        </td>
                    </tr>
                    <tr  class="text-center">
                         <td>Android Native</td>
                        <td>
                            <div class="input-group charges-input-filed-center">
                              <input type="text" class="form-control text-right" name="indicativeBillingAndroid" v-model="indicativeBillingAndroid">
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
            </div>
            </div>
            <div class="row">
                <div class="col-md-12 text-center">
                    <button type="button" class="btn btn-orange" v-on:click="updateQuotationForm">Update</button>
                </div>
            </div>
        </form>
    </div>






    <div class="tab-pane active" id="masterAgreement">
      <div class="manage-skill">
         <div class="row ">
         <div class="col-md-12 col-xs-12 col-sm-12">


             <div class="col-md-4 col-xs-4 col-sm-4">
             <button type="button" class="btn btn-orange btn-lg" data-toggle="modal" @click="addTermsAndConditionsModal()">Add New Terms And Condition</button>
             </div>
            <div class="col-md-4 col-xs-4 col-sm-4">


             </div>

             <div class="col-md-4 col-xs-4 col-sm-4">
             </div>
         </div>
         </div>
         </div>
         <table class="table table-hover platform-table-color price-table">
          <tbody>
              <tr class="text-left" >
                  <th>S.No</th>
                  <th>Status</th>
                  <th>Version No.</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Action</th>

              </tr>
              <tr class="text-center" v-for=" (termsAndCondition,index) in termsAndConditions">
                   <td>{{iterateRowNum(index)}}</td>
                   <td v-if="termsAndCondition.isActive"><i class="fa fa-check-square master-agremnt" aria-hidden="true"></i></td>
                   <td v-else><i class="fa fa-times admin_unassign" aria-hidden="true"></i></td>
                  <td>  <span>
                      <span @click="readMasterAgreement(termsAndCondition)" class="admin-title-underline ">{{termsAndCondition.versionNumber}}</span>

                    </span></td>
                  <td>{{ convertUtcToLocaDateTime(termsAndCondition.createdOnInMillis)}}</td>
                    <td>{{convertUtcToLocaDateTime(termsAndCondition.expiredOnInMillis)}}</td>
                 <td>
                     <div class="cancelTermsAndCondition" v-if="termsAndCondition.isActive">
                     <ul class="list-group storyList">
                          <li class="list-group-item trasparent-bg"><a type="button"  class="cursor-pointer" ><i class="fa fa-pencil " aria-hidden="true" @click="cancelTermsAndCondition(termsAndCondition,index)"></i></a></li>
                          <!-- <li class="list-group-item trasparent-bg"><a type="button"  class="cursor-pointer"  ><i class="fa fa-trash-o trasparent-bg" aria-hidden="true"></i> Delete</a></li> -->
                          </ul>
                      </div>
                   </td>

              </tr>
          </tbody>
      </table>

                      <!-- <div class="modal fade" id="TermsAndConditionModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
                       <div class="modal-dialog" role="document">
                         <div class="modal-content ">
                           <div class="modal-header">
                             <button type="button" class="close" data-dismiss="modal">&times;</button>
                             <h4 class="modal-title">Add New Master Agreement</h4>

                           </div>
                           <div class="modal-body">
                             <div class="form-group">

                               <div class="col-md-12">
                                <textarea name="termsAndConditionHtml" class="form-control" id="editor1" rows="10" cols="80" v-model="termsAndConditionHtml" ></textarea>
                               </div>
                               <div v-html="termsAndConditionHtml" class="well">

                               </div>
                                     </div>



                                       <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>

                                     <button type="button" class="btn btn-orange"  v-on:click="submitTermsAndCondition">ADD</button>
                           </div>
                         </div>
                       </div>
                     </div> -->
                     <div class="modal fade" id="termsAndConditionsModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
                      <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div class="modal-body master-modal">

                            <div class="form-group">
                              <div v-html="termsHtml"></div>
                              <!-- {{}} -->
                          </div>
                          <div class="row">
                           <div class="col-md-12"><button type="button" class="btn btn-gray pull-right " data-dismiss="modal">Close</button>
                           </div>
                         </div>
                          </div>
                        </div>
                      </div>
                    </div>


    </div>


    <div class="tab-pane" id="Documentation">
            Documentation
            </div>
        </div>

        </section>
        </div>

         <!--<app-footer></app-footer>-->

        <!-- add PM  Modal  -->






    </div>
</template>

<script>
      import  AdminSidebar  from  "./SupperAdminSideBar.vue";
      import  AdminHeader  from  "./adminHeader.vue";
      import  Footer  from   "./footer.vue";
      import  AdminSkill  from  "./AdminSkill.vue";
            import AlertComonent from "../src/components/alert/Alert.vue"

    export default{
        data(){
            return{
                "indicativeBillingAnalysis":'',
                "indicativeBillingDesign":'',
                "indicativeBillingFrontEnd":'',
                "indicativeBillingBackEnd":'',
                "indicativeBillingQA":'',
                "indicativeBillingSupport":'',
                "indicativeBillingIos":'',
                "indicativeBillingAndroid":'',
                "developerSignUpFee": '',
                "productOwnerSignUpFee": '',
                "indicativePercentageAdvance":'',
                fairPricePercentage:'',
                activityType:[],
                skillName:'',
                skills:'',
                messageList:'',
                message:'',
                success:false,
                isalertShow:false,
                termsAndConditionHtml:'',
                termsAndConditions:'',
                startMasterCount:1,
                index:'',
                termsHtml:'',

            }

        },
        components:{
             'appAdminSidebar': AdminSidebar,
            'appAdminHeader': AdminHeader,
            'appFooter': Footer,
            'appAdminSkill': AdminSkill,
            "alert-component":AlertComonent,
        },
         mounted: function(){
                var app = this;

                app.$http.get(
                        this.$store.state.SERVER_URL+'/admin/get-hourly-charges',
                       {
                         headers: {
                           "X-Authorization": app.$cookie.get('X-Authorization')
                         },
                     }
                ).then(function(response) {

                    console.log("hourly charges========================");
                    console.log(response);
                    app.indicativeBillingAnalysis = response.data.payLoad.indicativeBillingAnalysis;
                    app.indicativeBillingDesign = response.data.payLoad.indicativeBillingDesign;
                    app.indicativeBillingFrontEnd = response.data.payLoad.indicativeBillingFrontEnd;
                    app.indicativeBillingBackEnd = response.data.payLoad.indicativeBillingBackEnd;
                    app.indicativeBillingQA = response.data.payLoad.indicativeBillingQA;
                    app.indicativeBillingSupport = response.data.payLoad.indicativeBillingSupport;
                    app.indicativeBillingIos = response.data.payLoad.indicativeBillingIos;
                    app.indicativeBillingAndroid = response.data.payLoad.indicativeBillingAndroid;
                    app.developerSignUpFee = response.data.payLoad.developerSignUpFee;
                    app.productOwnerSignUpFee = response.data.payLoad.productOwnerSignUpFee;
                    app.indicativePercentageAdvance = response.data.payLoad.indicativePercentageAdvance;
                    app.fairPricePercentage = response.data.payLoad.fairPricePercentage;
                    console.log(app.indicativeBillingIos);
                });

             //get all activies types
                app.$http.get(
                        this.$store.state.SERVER_URL+'/api/get-all-activity-types',
                       {
                         headers: {
                           "X-Authorization": app.$cookie.get('X-Authorization')
                         },
                     }
                ).then(function(response) {
                    console.log("response.data.payLoad");
                    console.log(response.data.payLoad);
                     app.activityType = response.data.payLoad;
                    console.log("app.activityType"+app.activityType);


                });

             //get all skills

                 app.$http.get(
                        this.$store.state.SERVER_URL+'/api/dev-pm-admin/get-all-skills',
                       {
                         headers: {
                           "X-Authorization": app.$cookie.get('X-Authorization')
                         },
                     }
                ).then(function(response) {
                    app.skills = response.data.payLoad;

                });

                app.$http.get(
                       this.$store.state.SERVER_URL+'/admin/get-master-service-agreements',
                      {
                        headers: {
                          "X-Authorization": app.$cookie.get('X-Authorization')
                        },
                    }
               ).then(function(response) {
                   app.termsAndConditions = response.data.payLoad;
                   console.log("terms and conditon---",response.data.payLoad[0].termsHtml);
                  // app.termsHtml=response.data.payLoad[0].termsHtml;

               });

        },
        methods:{

          iterateRowNum(index){
            return (this.startMasterCount+index);
          },
          convertUtcToLocaDateTime(date){
           var moment = require('moment-timezone');
           var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          // console.log("convertStringtoDate------------------------>"+date)
           return moment(date).tz(timeZone).format('DD-MMM-YYYY HH:mm:ss')
          },
            updateQuotationForm: function(e){
                    //form submission
                    e.preventDefault();
                    var app = this;
                    var dataObj = $('#quotationSettingsForm').serializeArray().reduce(function(obj, item) {
                            obj[item.name] = item.value;
                            return obj;
                     }, {});
                    console.log(dataObj);
                    $.ajax({
                        url: this.$store.state.SERVER_URL+'/admin/save-hourly-charges',
                        type: 'POST',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify(dataObj),
                        headers: {
                                "X-Authorization": app.$cookie.get('X-Authorization')
                        },
                        success: function(data) {
                         if(data.status === "SUCCESS"){
                            console.log('success');
                            app.indicativeBillingAnalysis = data.payLoad.indicativeBillingAnalysis;
                            app.indicativeBillingDesign = data.payLoad.indicativeBillingDesign;
                            app.indicativeBillingFrontEnd = data.payLoad.indicativeBillingFrontEnd;
                            app.indicativeBillingBackEnd = data.payLoad.indicativeBillingBackEnd;
                            app.indicativeBillingQA = data.payLoad.indicativeBillingQA;
                            app.indicativeBillingSupport = data.payLoad.indicativeBillingSupport;
                            app.indicativeBillingIos = data.payLoad.indicativeBillingIos;
                            app.indicativeBillingAndroid = data.payLoad.indicativeBillingAndroid;
                            app.developerSignUpFee = data.payLoad.developerSignUpFee;
                            app.productOwnerSignUpFee = data.payLoad.productOwnerSignUpFee;
                            app.indicativePercentageAdvance = data.payLoad.indicativePercentageAdvance;

                            // window.location.href = '/admin/project-setting';
                            app.message='Successfully Saved',
                            app.success=true,
                            app.isalertShow=true;
                            setTimeout(function () {
                              app.isalertShow=false;
                          }, 2000)
                         }
                         else{
                           app.message=data.errorMessage,
                           app.success=false,
                           app.isalertShow=true;
                            console.log('error');
                            setTimeout(function () {
                              app.isalertShow=false;
                          }, 2000)
                         }
                     }
                });

            },
            submitForm:function(){

        },
        addTermsAndConditionsModal(){
          var app =this;
          app.$router.push('/admin/master-agreement');
          // app.termsAndCondition={};
          // this.termsAndCondition.status='';
          // setTimeout(() => {
          //     app.errors.clear();
          //   }, 100);

      //  $('#TermsAndConditionModal').modal('show');
      },
      readMasterAgreement(termsAndCondition){
        var app =this;
      //  app.termsAndCondition={};
        app.termsHtml = termsAndCondition.termsHtml;
      //  this.termsAndCondition.masterServiceAgreementId='';
        setTimeout(() => {
            app.errors.clear();
          }, 100);

      $('#termsAndConditionsModal').modal('show');
    },
      submitTermsAndCondition(){
        var editor_contents = CKEDITOR.instances["editor1"].getData();
           var dataObj = $('#TermsAndConditionModal').serializeArray().reduce(function(obj, item) {
               obj[item.name] = item.value;
               return obj;
           }, {});

           if(editor_contents){
               //console.log(dataObj);
               dataObj.termsAndConditionHtml = editor_contents;

           }
           app.$store.commit('setSpinner',true);
        $.ajax({
        url: this.$store.state.SERVER_URL+'/admin/save-master-service-agreement',
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
                 $('#TermsAndConditionModal').modal('show');
          }else{
              app.$store.commit('setSpinner',false);
               app.$swal("Oops...", "Something went wrong!", "error");
          }
      }
     });

      },
        }
    }
</script>
<style scoped>
price-table  {
    text-align: left;
}
</style>
