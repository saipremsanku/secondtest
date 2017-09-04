<template>
    <div class="wrapper">
      <link rel="stylesheet" href="/src/assets/css/intlTelInput.css">
     <link rel="stylesheet" href="/src/assets/css/demo.css">
      <!-- Main Header -->
  <app-admin-sidebar></app-admin-sidebar>
  <!-- <div v-if="role === 'PROJECT_MANAGER'>
    <pmSidebar :projectRequestId="projectLeadId"></pmSidebar>
  </div> -->
      <app-admin-header></app-admin-header>


      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <app-admin-project-header></app-admin-project-header>
      <section class="content">
         <div class="team-container">
           <h2 class="sub_heading">{{projectName}}</h2>
           <div class="row">
             <div class="alert alert-danger error-color" v-if="isError">
            {{errorMessage}}
             </div>
               <div class="col-md-12">
                      <div class="form-group pull-right pm_mile">
                        <!-- <select class="form-control select_option"v-model="selectedItem" @change="selectDeveloper(selectedItem)">
                                 <option value="" selected disabled>Assign developer</option>
                                 <option v-for="developer in getAllDevelopers" :value="developer" v-if="developer.isDeveloperApproved">{{developer.firstName}} {{developer.lastName}}</option>

                          </select> -->

                          <!-- <el-select v-model="selectedItem" clearable placeholder="Please Select Developer" filterable @change="selectDeveloper(selectedItem)" class="custom-width ">
                            <el-option v-for="developer in getAllDevelopers" :key="developer.developerId" :label="developer.firstName+' '+ developer.lastName" :value="developer">
                            </el-option>
                          </el-select> -->

                            <v-select v-model="selectedItem" label="fullName"  :options="getAllDevelopers" placeholder="Please select developer" :clearSearchOnSelect="isClear"></v-select>


                    </div>
               </div>
               </div>


           <div class="row">
             <div class="col-md-12">
               <div class="form-group">
                   <div class="row">
                     <table class="table table-hover platform-table-color price-table" v-if="selectedItem!=''">
                      <tbody>
                          <tr>
                              <th>Dev ID</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Mobile No</th>
                              <th>Skill Set</th>
                              <th>USD Per Hour</th>
                              <th>Actions </th>
                          </tr>
                          <tr class="text-center">
                              <td>{{selectedItem.developerId}}</td>
                              <td>{{selectedItem.firstName}} {{selectedItem.lastName}}</td>
                              <td>{{selectedItem.email}}</td>
                              <td>{{selectedItem.mobileNumber}}</td>
                              <td>
                                <p v-for="skill in selectedItem.developerSkillInfos">{{skill.skillName}}</p>
                              </td>

                              <td width="12%">
                                  <div class="input-group" v-if="selectedItem.developerType == 'EXTERNAL' || 'INTERNAL'" >
                                    <input type="number" min="1" class="form-control text-right" name="selectedItem.usdPerHours" v-model="selectedItem.usdPerHours" >
                                    <!-- <i v-show="errors.has('usdPerHours')" class="fa fa-warning"></i> -->
                                    <span v-show="errors.has('selectedItem.usdPerHours')" class="help is-danger">Plese Enter Amount for Developer</span>
                                  </div>
                              </td>
                              <td>
                                <div class="form-group">
                                    <button type="button" class="btn btn-orange btn-lg" @click="assignProject(selectedItem)" >Assign</button>
                                </div>
                             </td>
                          </tr>
                      </tbody>
                  </table>
                   </div>
               </div>
             </div>
           </div>

           <div class="row">

             <table class="table table-hover platform-table-color price-table" >
              <tbody>
                  <tr>
                      <th>Dev ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile No</th>
                      <th>Skill Set</th>
                          <th>USD Per Hour</th>
                  </tr>
                  <tr class="text-center"v-for="(developer,index) in getAllAssingDevelopers">
                      <td>{{developer.developerId}}</td>
                      <td>{{developer.firstName}} {{developer.lastName}}</td>
                      <td>{{developer.email}}</td>
                      <td>{{developer.mobileNumber}}</td>
                      <td>
                        <p v-for="skill in developer.developerSkillInfos">{{skill.skillName}}</p>

                     </td>
                     <td>
                       {{developer.developerBillingPerHour}}
                     </td>
                     <td>
                       <i class="fa fa-times admin_unassign" aria-hidden="true" @click="removeDeveloper(developer,index)"></i>
                     </td>
                  </tr>
              </tbody>
          </table>
           </div>
         </div>
  </section>
     </div>
    </div>
</template>
<script>

import  AdminSidebar  from  "../../SupperAdminSideBar.vue";
import pmSidebar from "../../ProjectSidebar.vue"
import  AdminHeader  from  "../../adminHeader.vue";
import { Validator } from 'vee-validate';
import  adminProjectHeader  from  "./adminProjectHeader.vue";


    export default{
        data(){
            return{
              isClear:true,
              getAllDevelopers:[],
              selectedItem:'',
              // projectLeadId:'',
              role: this.$cookie.get('role'),
              getAllAssingDevelopers:[],
              usdPerHours:'',
              // projectName :this.$store.getters.getAdminProjecLeadInfo.name
               projectName :this.$store.getters.getProjectInfo.name,
               projectLeadId:this.$store.getters.getProjectInfo.id,
               errorMessage:'',
               isError:false,

            }
          },
        components:{
            'appAdminSidebar': AdminSidebar,
           'appAdminHeader': AdminHeader,
           "pmSidebar":pmSidebar,
            'appAdminProjectHeader':adminProjectHeader,


       },
       created() {
           this.validator = new Validator({
             usdPerHours: 'required|decimal'
           });
           this.$set(this, 'errors', this.validator.errorBag);
         },

       mounted:function(){
         this.getDevelopers();
         this.getAssingDeveloper();

       },

       methods:{

         getDevelopers : function(){
            var app = this;
            app.$store.commit('setSpinner',true);
            app.$http.get(
                   app.$store.state.SERVER_URL+'/api/pm-admin/get-all-approved-developers-outside-project/'+app.$route.params.id,
                  {
                    headers: {
                      "X-Authorization": app.$cookie.get('X-Authorization')
                    },
                }
           ).then(function(response) {
             app.$store.commit('setSpinner',false);
             app.getAllDevelopers = response.data.payLoad;
               });

         },
         getAssingDeveloper : function(){
           var app = this;
           app.$http.get(
                  app.$store.state.SERVER_URL+'/admin/get-developers-in-project/'+app.$route.params.id,
                 {
                   headers: {
                     "X-Authorization": app.$cookie.get('X-Authorization')
                   },
               }
          ).then(function(response) {
            app.getAllAssingDevelopers = response.data.payLoad;
            console.log("get all assign developer");
            console.log(app.getAllAssingDevelopers);
          });
        },
        //  selectDeveloper : function(onchangedItem){
        //    console.log("call selected developer--------------");
        //    console.log(onchangedItem)
        //    this.selectedItem = onchangedItem;
         //
        //  },
        // /admin/assign-project-to-developer
         assignProject : function(assignProject){

          var object={};
          var app = this;
          // app.$validator.validateAll();
          // //console.log(app.errors)
          // if(!app.errors.any()){

              object.projectId = app.$route.params.id;
              object.developerId = assignProject.developerId;
              object.developerBillingPerHour = assignProject.usdPerHours;
            //  console.log(object);
                  app.$http.post(app.$store.state.SERVER_URL + '/admin/assign-project-to-developer',object,
                        {
                headers: {
                    "X-Authorization": app.$cookie.get('X-Authorization')
                },
              }).then((response) => {
                if(response.data.status == "SUCCESS"){
                  //console.log(response.data.payLoad);
                  var index = app.getAllDevelopers.indexOf(assignProject);
                    app.getAllAssingDevelopers.push(response.data.payLoad);
                    app.getAllDevelopers.splice(index,1);
                    app.selectedItem='';
                }
                else{
                  app.errorMessage = response.data.errorMessage;
                  app.isError=true;
                  setTimeout(function () {
                  app.isError=false;
                }, 3000)
                }

            }, (response) => {
        });
        //  }
         },





  removeDeveloper :function(assignProject,index){

           var object={};
           var app = this;
               object.projectId = app.$route.params.id;
               object.developerId = assignProject.developerId;



               app.$swal({
               title: 'Are you Sure ?',
               text: "You want to Unassign developer from Project",
               type: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Yes'
               }).then(function () {
                 app.$http.post(app.$store.state.SERVER_URL + '/admin/un-assign-project-from-developer',object,
                       {
                         headers: {
                             "X-Authorization": app.$cookie.get('X-Authorization')
                         },
                       }).then((response) => {
                         if(response.data.status == "SUCCESS"){
                            var index = app.getAllDevelopers.indexOf(assignProject);
                             app.getAllAssingDevelopers.splice(index,1);
                             app.getAllDevelopers.unshift(assignProject);

                         }
                         else{
                           app.errorMessage = response.data.errorMessage;
                             app.isError=true;
                               setTimeout(function () {
                                   app.isError=false;
                                   }, 3000)
                         }

                     }, (response) => {
                 });
               })

         }
       }
     }
</script>
