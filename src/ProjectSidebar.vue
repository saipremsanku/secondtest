<template>
<!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

      <!-- Sidebar user panel (optional) -->

      <!-- Sidebar Menu -->
      <ul class="sidebar-menu" v-if="isManager">
        <!-- Optionally, you can add icons to the links -->
        <router-link to="/ceo/dashboard" tag="li" active-class="active"><a><i class="fa fa-dashboard" ></i>Dashboard</a></router-link>
        <!-- <router-link to="" tag="li" > <a class="side-bar-bold"><i class="fa fa-rocket" aria-hidden="true"></i>{{projectLeadName}}</i></a></router-link> -->
        <router-link :to="'/'+ceo+'/project-task-analysis/'+this.projectRequestId" tag="li" active-class="active" v-if="this.$store.getters.getProjectInfo.isProjectAvailable"> <a class="side-bar-bold"><i class="fa fa-rocket" aria-hidden="true"></i>{{projectLeadName}}</i></a></router-link>
        <router-link to="" tag="li" active-class="" v-else> <a class="side-bar-bold"><i class="fa fa-rocket" aria-hidden="true"></i>{{projectLeadName}}</i></a></router-link>

        <router-link :to="'/'+ceo+'/project-request/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"><a><i class="fa fa-list-alt"></i>Requirements</a></router-link>
        <router-link :to="'/'+ceo+'/project-backlog/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"><a><i class="fa fa-th"></i>Product Backlog</a></router-link>
        <router-link :to="'/'+ceo+'/project-milestones/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"> <a><i class="fa fa-flag-checkered"></i>Milestones</a></router-link>
        <router-link :to="'/'+ceo+'/project-commercials/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"><a><i class="fa fa-usd"></i>Commercials</a></router-link>
        <router-link :to="'/'+ceo+'/project-proposals/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"><a><i class="fa fa-file-text-o"></i>Proposals</a></router-link>
        <router-link :to="'/'+ceo+'/project-task-board/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft" v-if="this.$store.getters.getProjectInfo.projectId"><a><i class="fa fa-file-text-o"></i>Task Board</a></router-link>
        <router-link :to="'/'+ceo+'/test-library/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft" v-if="this.$store.getters.getProjectInfo.projectId"><a><i class="fa fa-file-text-o"></i>
          Quality Assurance </a></router-link>










    </ul>


        <!-- <li class="treeview">
          <a><i class="fa fa-link"></i> <span>Reports</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li class="active"><a><i class="fa fa-circle-o"></i>USer Activity</a></li>
              <li><a href="#"><i class="fa fa-circle-o"></i>SMS Activity</a></li>
            <li><a ><i class="fa fa-circle-o"></i>Email Activity</a></li>
          </ul>
        </li> -->


      <!-- <li class="treeview">
          <a href="#">
            <i class="fa fa-laptop"></i>
            <span>Reports</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="pages/UI/general.html"><i class="fa fa-circle-o"></i> User Activity</a></li>
            <li><a href="pages/UI/icons.html"><i class="fa fa-circle-o"></i> SMS Activity</a></li>
            <li><a href="pages/UI/buttons.html"><i class="fa fa-circle-o"></i>Email Activity</a></li>
          </ul>
        </li> -->



      <div class="personsList">
          <chat-side-bar></chat-side-bar>
      </div>
      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>
</template>


<script>
import ChatSidebar from '../src/components/chat/ChatSidebar.vue';
export default {
  props: ['projectRequestId'],
  data(){
      return{
               ceo:'ceo',
               admin:'admin',
               projectLeadName: this.$store.getters.getProjectInfo.name
         //pmBacklogUrl : ''
      }
  },
  components:{
    'chat-side-bar':ChatSidebar
  },
  computed:{
    isManager:function(){
      console.log("manager---------------->"+this.$store.getters.getLoggedInUser.role ==='PROJECT_MANAGER')
    return this.$store.getters.getLoggedInUser.role ==='PROJECT_MANAGER';
  },


  }
  //,
  //mounted: function(){
  //  this.pmBacklogUrl = '/ceo/project-request/'+this.projectRequestId;
  //}
}

</script>
