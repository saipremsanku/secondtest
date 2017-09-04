<template>
  <div>
<!-- <header  class="admin-project-header">
  <nav>
    <ul class="admin-project-header">
      <router-link :to="'/'+admin+'/project-task-analysis/'+this.projectRequestId" tag="li" active-class="active" v-if="this.$store.getters.getProjectInfo.isProjectAvailable"> <a class="side-bar-bold"><i class="fa fa-rocket" aria-hidden="true"></i></i></a>{{this.$store.getters.getProjectInfo.name}}</router-link>
      <router-link to="" tag="li" active-class="" v-else> <a class="side-bar-bold"><i class="fa fa-rocket" aria-hidden="true"></i></i></a>{{this.$store.getters.getProjectInfo.name}}</router-link>

      <router-link :to="'/'+admin+'/project-request/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"><a><i class="fa fa-list-alt"></i></a></router-link>
      <router-link :to="'/'+admin+'/project-backlog/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"><a><i class="fa fa-th"></i></a></router-link>
      <router-link :to="'/'+admin+'/project-milestones/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"> <a><i class="fa fa-flag-checkered"></i></a></router-link>
      <router-link :to="'/'+admin+'/project-commercials/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"><a><i class="fa fa-usd"></i></a></router-link>
      <router-link :to="'/'+admin+'/project-proposals/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"><a><i class="fa fa-gavel"></i></a></router-link>
      <router-link :to="'/'+admin+'/project-task-board/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft" v-if="this.$store.getters.getProjectInfo.projectId"><a><i class="fa fa-cubes"></i></a></router-link>
      <router-link :to="'/'+admin+'/test-library/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft" v-if="this.$store.getters.getProjectInfo.projectId"><a><i class="fa fa-check-square"></i></a></router-link>
      <router-link :to="'/admin/assign-developer/'+this.$store.getters.getProjectInfo.projectId" tag="li" active-class="active" class="sidebar-margin-leaft" v-if="this.$store.getters.getProjectInfo.projectId"><a><i class="fa fa-users"></i></a></router-link>
       <projectInfoHeader ></projectInfoHeader>
    </ul>
  </nav>
</header> -->
     <projectInfoHeader ></projectInfoHeader>
   </div>
</template>

<script>
import projectInfoHeader from "../../projectInfoHeader.vue"
    export default {
        data(){
          return{
            admin:'admin',
            projectRequestId:this.$store.getters.getProjectInfo.id
          }
        },
          components:{
              "projectInfoHeader":projectInfoHeader,
            }
    }
</script>
