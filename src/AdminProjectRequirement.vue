<template>
    <div class="wrapper">
      <!-- Main Header -->
  <app-admin-sidebar></app-admin-sidebar>
      <app-admin-header></app-admin-header>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper productBacklog_Block">
      <section class="content">




              <div class="col-md-12 pull-right search_button-margin">
                  <div class="col-md-10 ">
                    <div class="pull-right" v-if="showResultsCount">
                    <span style="color: #808080;">{{searchResults}} results</span>
                    </div>
                  </div>


                  <div class="col-md-2 ">
            				<div id="custom-search-input">

            					<div class="input-group">

            						<input type="text" class="form-control input-sm" placeholder="Search" v-model="searchIndex"/>
            						<span class="input-group-btn">
            							<button class="btn btn-info btn-lg" type="button">
            								<i class="fa fa-search"></i>
            							</button>
            						</span>
            					</div>
            				</div>
            			</div>
                </div>



               <table class="table table-hover platform-table-color price-table">

                    <tr >
                        <th>Project ID</th>
                        <th>Project Title</th>
                        <th>Project Owner Details</th>
                        <th>Status</th>
                        <th>Payment Status</th>
                        <th>Project</th>
                        <th>CEO</th>

                    </tr>
                    <tbody id="project-table">
                    <tr class="text-center" v-for="(project,index) in allProjectRequirement" v-show="searchResult(project)">
                        <td>{{project.projectReferenceId}}</td>
                        <td>
                          <!-- <span v-if="project.isProjectAvailable"> -->
                          <span>
                            <span @click="routingAssingProject(project)" class="admin-title-underline ">{{project.name}}</span>
                            <!-- <router-link :to="'/admin/assign-developer/'+project.projectId" class="admin-title-underline">{{project.name}}</router-link> -->
                          </span>

                        <!-- <span v-else>
                            {{project.name}}
                        </span> -->


                        </td>
                        <td>{{project.productOwnerFullName}}
                        <br>
                        {{project.productOwnerEmail}}
                        </td>
                        <td>{{getStatusRequest(project.projectLeadStatus)}}</td>
                       <td>Payment Status</td>
                       <td>
                         <span v-if="project.isProjectAvailable">
                           <label class="checkbox-inline">Created</label>
                         </span>
                         <span v-if="getStatus(project)">
                            <button type="button" class="btn btn-orange-admin-assing btn-lg" data-toggle="modal" data-target="" @click="openProjectPriceModal(project,index)">create Project</button>
                           <!-- <button type="button" class="btn btn-orange-admin-assing btn-lg" data-toggle="modal" data-target="" @click="createProject(project,index)">create Project</button> -->
                           <!-- <label class="checkbox-inline"><input type="checkbox" :value="project.isProjectAvailable" @change="createProject()">create Project</label> -->
                         </span>
                         <span v-if="!project.isAgreementAvailable">
                           <label class="checkbox-inline">Agreement Pending</label>
                         </span>


                       </td>
                        <td><p>{{project.projectManagerName}}</p>
                              <span v-if="project.projectManagerId!=null && project.isProjectAvailable">
                                <button type="button" class="btn btn-orange-admin-assing btn-lg" data-toggle="modal" data-target="" @click="openReAssingProjectModal(project.projectId,index)" >Change CEO</button>
                              </span>
                              <span v-else-if="project.projectManagerId!=null">
                                <button type="button" class="btn btn-orange-admin-assing btn-lg" data-toggle="modal" data-target="" @click="openAssingProjectModal(project.id,index)" >Change CEO</button>
                              </span>
                              <span v-else>
                                <button type="button" class="btn btn-orange-admin-assing btn-lg" data-toggle="modal" data-target="" @click="openAssingProjectModal(project.id,index)" >Assign</button>
                              </span>

                        </td>

                    </tr>
                </tbody>
            </table>
           <!-- table data for the pm list -->

        </section>
        </div>

        <!-- <app-footer></app-footer>-->

        <!-- ReAssing Project Model  -->
      <div class="modal fade" id="AssingReProject" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title">Assign Project  </h4>
                </div>
                <div class="modal-body">
                       <div class="form-group">
                              <v-select v-model="projectManager" label="fullName"  :options="allprojectManager"  placeholder="Please select CEO" :clearSearchOnSelect="isClear"></v-select>
                         </div>
                        <div class="row">
                            <div class="col-md-12">
                                <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-orange"  @click="submitProjectReAssignForm()">ADD</button>
                            </div>
                        </div>

                </div>
              </div>
        </div>
      </div>

      <!-- Assing Project Model  -->
    <div class="modal fade" id="AssingProject" role="dialog" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Assign Project </h4>
              </div>
              <div class="modal-body">

                    <input type="hidden" name="projectLeadId" :value="projectId">
                     <div class="form-group">
                         <!-- <select class="form-control" v-model="projectManagerId" name="projectManagerId">
                             <option disabled value="" >Please Select CEO</option>
                            <option v-for=" pm in allprojectManager" :value="pm.projectManagerId">{{pm.firstName}}</option>

                          </select> -->

                          <!-- <el-select v-model="projectManagerId" clearable placeholder="Please Select CEO" filterable @change="selectDeveloper(selectedItem)" class="custom-width ">
                            <el-option v-for="pm in allprojectManager" :key="pm.id" :label="pm.firstName+' '+ pm.lastName" :value="pm.projectManagerId">
                            </el-option>
                          </el-select> -->

                            <v-select v-model="projectManager" label="fullName"  :options="allprojectManager"  placeholder="Please select CEO" :clearSearchOnSelect="isClear"></v-select>

                       </div>
                      <div class="row">
                          <div class="col-md-12">
                              <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-orange"  @click="submitProjectAssignForm()">ADD</button>
                          </div>
                      </div>

              </div>
            </div>
      </div>
    </div>

    <!-- Adding the L0,L1,L2 percentage for the project-->

    <div class="modal fade" id="addDifferentProjectPrice" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
       <div class="modal-dialog" role="document">
          <div class="modal-content">
             <div class="modal-header bg-grey no-border">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" >Add Project %</h4>
             </div>
             <div class="alert alert-danger error-color" v-if="isError">
               {{errorMessage}}
               </div>
             <div class="modal-body padd0">
               <ul class="nav nav-tabs nav-justified add-task-tabs" id="myTab">
                <li class="active"><a data-target="#details" data-toggle="tab">Details</a></li>
              </ul>

              <div class="tab-content">
                <div class="tab-pane active bg-light-gray" id="details">
                  <br><br>
                  <div class="row">
                     <div class="col-md-12">
                        <form id="saveProjectPricePercentage" @submit.prevent="saveProjectPricePercentage('project-form')" role="form" data-vv-scope="project-form">

                           <div class="col-md-12">
                           <div class="form-group" >
                              <input type="number" class="form-control Design" min="1" step="1" id="l0" placeholder="Please enter L0 in %" name="L0" v-model="L0" >
                           </div>
                         </div>
                           <div class="col-md-12">
                             <div class="form-group" >
                                <input type="number"  class="form-control Design" min="1" step="1"  placeholder="Please enter L1 in %"  name="L1" v-model="L1">
                             </div>
                           </div>
                           <div class="col-md-12">
                             <div class="form-group" >
                                <input type="number"  class="form-control Design"  min="1" step="1" placeholder="Please enter L2 in %"  name="L2" v-model="L2">
                             </div>
                           </div>

                              <div class="col-md-12 btn-ripple">
                                       <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                                       <button type="submit" class="btn btn-orange"  >ADD</button>
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

</div>
</template>



<script>
      import  AdminSidebar  from  "./SupperAdminSideBar.vue";
        import  AdminHeader  from  "./adminHeader.vue";
          import  Footer  from   "./footer.vue";

    export default{
        data(){
            return{
              L0:'',
              L1:'',
              L2:'',
              agreementId:'',
              searchIndex:'',
              searchResults: 0,
              showResultsCount: false,
              isClear:true,
              allProjectRequirement:[],
              projectLeadId:'',
              allprojectManager:[],
              index:'',
              projectId:'',
              projectManagerId:'',
              projectManager:'',
              errorMessage:'',
              isError:false,
            }
        },
        components:{
             'appAdminSidebar': AdminSidebar,
            'appAdminHeader': AdminHeader,
            'appFooter': Footer
        },
         mounted:function(){
                var app = this;
             app.getProjectRequirements();
             app.getStatus();


        },
        computed:{
          isProjectAvailable: function(){

           return this.$store.getters.getProjectInfo.isProjectAvailable;

          },
        },
        methods:{
          getStatusRequest(status){

            if(status=='DRAFT'){
                return 'Draft';
            }
            if(status=='REQUESTED'){
                return 'Requested';
            }
            if(status=='PROPOSAL_SUBMITTED'){
                return 'Proposal Submitted';
            }
            if(status=='REVISION_REQUESTED'){
                return 'Revision Requested';
            }
            if(status=='CLOSED_SUCCESSFULLY'){
                return 'Closed Successfully';
            }

          },
            getProjectRequirements : function(){
                var app =this;
                app.$store.commit('setSpinner',true);
               app.$http.get(
                        this.$store.state.SERVER_URL+'/admin/get-all-submitted-project-leads-and-all-managers',
                       {
                         headers: {
                           "X-Authorization": app.$cookie.get('X-Authorization')
                         },
                     }
                ).then(function(response) {
                   app.$store.commit('setSpinner',false);
                     app.allprojectManager =  response.data.payLoad.projectManagers;
                    app.allProjectRequirement = response.data.payLoad.projectLeads;



                });

            },
            submitProjectAssignForm : function(){

                //  e.preventDefault();
                    var app = this;

                console.log("project manager id"+app.projectManagerId);
                console.log(app.projectManagerId);
                     var object={};
                     object.projectLeadId=app.projectLeadId;
                     object.projectManagerId=app.projectManager.projectManagerId;

                    app.$http.post(app.$store.state.SERVER_URL + '/admin/assign-project-manager-to-project-lead',object,
                            {
                                 headers: {
                                        "X-Authorization": app.$cookie.get('X-Authorization')
                                    },
                          }).then((response) => {
                          //  app.allProjectRequirement[index]=response.data.playLoad;
                          if(response.data.status === "SUCCESS"){
                            app.projectManagerId='';
                            app.allProjectRequirement.splice(app.index, 1,response.data.payLoad);
                                     $('#AssingProject').modal('hide');


                             }
                             else{

                             }

                        }, (response) => {

                      });

            },
            submitProjectReAssignForm : function(){
                    var app = this;
                     var object={};
                     object.projectId = app.projectId;
                     console.log(app.projectManager);
                     object.projectManagerId = app.projectManager.projectManagerId;

                    app.$http.post(
                      app.$store.state.SERVER_URL + '/admin/assign-project-manager-to-project',
                     object,
                          {
                             headers: {
                                    "X-Authorization": app.$cookie.get('X-Authorization')
                                },
                          }).then((response) => {
                            console.log(response);
                          //  app.allProjectRequirement[index]=response.data.playLoad;
                          if(response.data.status === "SUCCESS"){
                            app.projectManagerId='';
                            app.allProjectRequirement.splice(app.index, 1,response.data.payLoad);
                            app.getProjectRequirements();
                             }
                             else{
                                console.log("internal server error");
                             }
                         $('#AssingReProject').modal('hide');
                        }, (response) => {
                          $('#AssingReProject').modal('hide');
                      });

            },
            openAssingProjectModal: function(leadId,index){
              this.index = index;
              this.projectLeadId = leadId;
              this.projectManager = '';
              $('#AssingProject').modal('show');
            },
            openReAssingProjectModal: function(projectId,index){

              var app = this;
              app.index = '';
              app.projectId = '';

              app.index = index;
              app.projectId=projectId;
              app.projectManager = '';
              $('#AssingReProject').modal('show');
            },
            createProject : function(){
                 var app = this;
                 var dummyObject ={};
                 app.$swal({
                 title: 'Are you sure ?',
                 text: "create new Project",
                 type: 'warning',
                 showCancelButton: true,
                 confirmButtonColor: '#3085d6',
                 cancelButtonColor: '#d33',
                 confirmButtonText: 'Yes'
                 }).then(function () {
                      app.$http.post(app.$store.state.SERVER_URL + '/admin/create-project/'+app.agreementId,dummyObject,
                              {
                                   headers: {
                                          "X-Authorization": app.$cookie.get('X-Authorization')
                                      },
                            }).then((response) => {
                                console.log(response.data.payLoad);
                               app.allProjectRequirement.splice(app.index, 0,response.data.payLoad);

                          }, (response) => {

                        });
              })
            },
            getStatus: function(project){
                console.log("----status--abc---",status);
              if(project.isProjectAvailable && project.isAgreementAvailable){
                return false;
              } else if(project.isAgreementAvailable && (!project.isProjectAvailable)){
                return true;
              }else{
                return false;
              }
            },
            routingAssingProject : function(project){
              this.$store.commit('setPageRefresh',true);
              this.$store.commit('setProjectInfo', project);
              this.$store.commit('setProjectCompletionPercenatge', '');
              if(project.isProjectAvailable){
              this.$router.push('/admin/project-task-analysis/'+project.id);
              }
            else
              {this.$router.push('/admin/project-request/'+project.id);
            }
            this.getProjectCompletionPercentage();
            },
           getProjectCompletionPercentage: function(){
              var app =this;
                // app.$store.commit('setSpinner',true);
              app.$http.get(
                app.$store.state.SERVER_URL+'/api/po-pm-admin/get-project-completion-percentage/'+app.$store.getters.getProjectInfo.projectId ,
                {
                  headers: {
                    "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
                  },
                },
              ).then(function(response){
                  app.$store.commit('setSpinner',false);
                 if(response.data.status == "SUCCESS"){
                   app.$store.commit('setProjectCompletionPercenatge' , response.data.payLoad);
                 }else{
                   console.log("error")
                 }
              })
            },

            searchResult: function(project){
                var app = this;
                var srIndex = app.searchIndex.trim();
                if(srIndex === ''){
                  app.showResultsCount = false;
                  return true;
                }
                var fullStr =
                  project.projectReferenceId
                  +project.name
                  +project.productOwnerEmail
                  +project.productOwnerFullName
                  +app.getStatusRequest(project.projectLeadStatus)
                  +project.projectManagerName;

                var patt = new RegExp(srIndex.toLowerCase());
                app.showResultsCount = true;
                return patt.test(fullStr.toLowerCase());
          },
          openProjectPriceModal(project, index){
            var app = this;

            app.index = '';
            app.projectId = '';
            app.agreementId = '';
            app.index = index;
            app.agreementId = project.agreementId;

            app.L0 = '';
            app.L1 = '';
            app.L2 = '';
           $('#addDifferentProjectPrice').modal('show');
          },

          saveProjectPricePercentage(){

            var app = this;
            var projectPrices = {};

            projectPrices.L0 = app.L0;
            projectPrices.L1 = app.L1;
            projectPrices.L2 = app.L2;
            projectPrices.agreementId = app.agreementId;

            app.$http.post(
              app.$store.state.SERVER_URL+'/admin/add-project-different-price-percentage',
              projectPrices,
              {
                headers: {
                  "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
                },
              },
            ).then(function(response){

             if(response.data.status === 'SUCCESS'){

              app.projectId = response.data.payLoad.projectId;

             $('#addDifferentProjectPrice').modal('hide');
             }else{
               app.errorMessage = response.data.errorMessage;
                 app.isError=true;
                   setTimeout(function () {
                       app.isError=false;
                       }, 3000)
               console.log("internal server error");
             }
            });
          },



        },

          watch: {
              'searchIndex': function(){
                  setTimeout(() => {
                      this.searchResults = $('#project-table tr:visible').length;
                  }, 100);
            }
          },
    }
</script>
