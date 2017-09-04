<template>
    <div class="">


      <div class="wrapper">


        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
        <section class="content">
    <div class="row">
        <div class="col-md-3 col-sm-3  col-xs-12" v-for="project in projectList">
            <div class="inner-projects" @click="showProjectRequest(project)">
                <p>{{project.projectName}}</p>
                      <!-- <span class="badge badge-cst bg-blue" v-if="project.projectLeadStatus=='DRAFT'">Draft</span>
                        <span class="badge badge-cst bg-green" v-if="project.projectLeadStatus=='PROPOSAL_SUBMITTED'">Proposal Ready</span>
                          <span class="badge badge-cst bg-orange" v-if="project.projectLeadStatus=='CLOSED_SUCCESSFULLY'">Advance Awaited</span>
                            <span class="badge badge-cst yellow-color" v-if="project.projectLeadStatus=='REQUESTED'">Working On Proposal</span>
                            <span v-if = "role == 'PRODUCT_OWNER'">
                              <span class="badge badge-cst yellow-color" v-if="project.projectLeadStatus=='REVISION_REQUESTED'">Working on Proposal</span>
                            </span>
                            <span v-else>
                                <span class="badge badge-cst bg-gray" v-if="project.projectLeadStatus=='REVISION_REQUESTED'">Revision Requested</span>
                            </span> -->
                            </div>
                        </div>

      </div>
    </section>
  </div>
</div>
</div>
</template>



<script>
    export default{
        props: ['projectList'],
        data(){
            return{
                searchString:'',
                dynamicClass:'bg-blue'

            }
        },

     created: function() {
       //do something after creating vue instance
       console.log(this.$store.getters.getDevProjectInfo.projectName);



     },
        methods:{
            showProjectRequest: function(project){
              var app = this;
                app.$store.commit('setDevProjectInfo',project);//removing earlier project info
                console.log(this.$store.getters.getDevProjectInfo);
                app.$router.push('/developer/backlog');
                app.getTaskList(project.projectId);

            },

            getTaskList: function(projectId){
               var app = this;
             app.$store.commit('setSpinner',true);
               app.$http.get(
                  this.$store.state.SERVER_URL+'/api/developer/get-developer-tasks/'+projectId,
                 {
                    headers: {
                     "X-Authorization": app.$cookie.get('X-Authorization')
                    },
                  }
                ).then(function(response) {

                  app.$store.commit('setSpinner',false);
                  console.log(response)
                  app.$store.commit('setDeveloperTaskList' , response.data.payLoad)

            });
        },


      }
    }
</script>
