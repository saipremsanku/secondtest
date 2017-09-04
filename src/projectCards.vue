<template>
    <div class="">


    <div class="row">

        <div class="col-md-3 col-md-3 col-sm-3  col-xs-12" v-if = "role == 'PRODUCT_OWNER'">
            <router-link to="/product-owner/new-project">
                <div class="projects-cards">
                    <p class="prj-title"><span><i class="fa fa-plus"></i></span> New Project</p>
                </div>
            </router-link>
        </div>
        <div class="col-md-3 col-sm-3  col-xs-12" v-for="project in projectList">
            <div class="inner-projects" @click="showProjectRequest(project)">
                <p>{{project.name}}</p>
                <span class="badge badge-cst bg-ongoing" v-if="project.isProjectAvailable">On going</span>
                    <span v-else>
                      <span class="badge badge-cst bg-blue" v-if="project.projectLeadStatus=='DRAFT'">Draft</span>
                        <span class="badge badge-cst bg-green" v-if="project.projectLeadStatus=='PROPOSAL_SUBMITTED'">Proposal Ready</span>
                          <span class="badge badge-cst bg-orange" v-if="project.projectLeadStatus=='CLOSED_SUCCESSFULLY'">Advance Awaited</span>
                            <span class="badge badge-cst yellow-color" v-if="project.projectLeadStatus=='REQUESTED'">Working On Proposal</span>
                            <span v-if = "role == 'PRODUCT_OWNER'">
                              <span class="badge badge-cst yellow-color" v-if="project.projectLeadStatus=='REVISION_REQUESTED'">Working on Proposal</span>
                            </span>
                            <span v-else>
                                <span class="badge badge-cst bg-gray" v-if="project.projectLeadStatus=='REVISION_REQUESTED'">Revision Requested</span>
                            </span>
                          </span>
            </div>
        </div>



      </div>
    </div>
</template>



<script>
    export default{
        props: ['projectList',
               'role'],
        data(){
            return{
                searchString:'',
                dynamicClass:'bg-blue'
            }
        },
        computed:{

        },
        methods:{
            showProjectRequest: function(project){
            //console.log(project)
              var app = this;
              app.$store.commit('setProjectInfo', project);//removing earlier project info
              app.$store.commit('setProjectCompletionPercenatge', '');
                 //console.log(app.$store.getters.getProjectInfo);

              if(app.$cookie.get('role').localeCompare('PRODUCT_OWNER')==0){
                  if(project.projectLeadStatus == 'PROPOSAL_SUBMITTED' || project.projectLeadStatus == 'REVISION_REQUESTED' || project.projectLeadStatus == 'CLOSED_SUCCESSFULLY' ){
                       app.$router.push('/product-owner/get-epics/'+project.id);
                  }else if(project.projectLeadStatus == 'DRAFT' || project.projectLeadStatus == 'REQUESTED'){
                       app.$router.push('/product-owner/project-request/'+project.id);
                  }
              }
              else if(app.$cookie.get('role').localeCompare('PROJECT_MANAGER')==0){
                if(project.isProjectAvailable){
                  app.$router.push('/ceo/project-task-analysis/'+project.id);
                }else{
                  app.$router.push('/ceo/project-request/'+project.id);
                }
              }

               var role = app.$store.getters.getLoggedInUser.role;
               if((app.$store.getters.getProjectInfo.projectId) &&  (role === 'PROJECT_MANAGER' || role === 'PRODUCT_OWNER')){
                   app.getAllTask();
                   app.getProjectCompletionPercentage();
                }
            },
            getAllTask(){
              var app =this;
                app.$store.commit('setSpinner',true);
              app.$http.get(
                app.$store.state.SERVER_URL+'/api/po-pm-admin/get-all-tasks-in-project/'+app.$store.getters.getProjectInfo.projectId ,
                {
                  headers: {
                    "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
                  },
                },
              ).then(function(response){
                  app.$store.commit('setSpinner',false);
                 if(response.data.status == "SUCCESS"){
                   app.$store.commit('setProjectTaskList' , response.data.payLoad);
                 }else{
                   console.log("error")
                 }
              })
            },
            getProjectCompletionPercentage(){
              var app =this;
                app.$store.commit('setSpinner',true);
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
      }
    }
</script>
