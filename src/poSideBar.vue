<template>
<!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

      <!-- Sidebar user panel (optional) -->

      <!-- Sidebar Menu -->

        <!--<div class="generalChartBox">-->

        <ul class="sidebar-menu" v-if="projectLeadStatus != 'REQUESTED'">
        <router-link :to="'/product-owner/dashboard'" tag="li" active-class="active" ><a><i class="fa fa-dashboard "></i>Dashboard</a></router-link>
        <router-link  :to="'/product-owner/release-management/'+this.projectRequestId" tag="li" class="no-hover"> <a class="side-bar-bold"><i class="fa fa-rocket" aria-hidden="true"></i>{{projectLeadName}}</i></a></router-link>
        <router-link  :to="'/product-owner/project-request/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"> <a><i class="fa fa-list-alt"></i>Requirements</a></router-link>
        <router-link  :to="'/product-owner/get-epics/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"> <a><i class="fa fa-th"></i>Product Backlog</a></router-link>
        <router-link   :to="'/project-owner/project-milestones/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"><a><i class="fa fa-flag-checkered"></i> Milestones</a></router-link>
        <router-link :to="'/project-owner/project-commercials/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"><a><i class="fa fa-usd"></i>Commercials </a></router-link>
        <router-link :to="'/project-owner/project-proposals/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"> <a><i class="fa fa-file-text-o"></i>Proposals</a></router-link>
        <!-- <router-link :to="'/product-owner/uat-issue/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"> <a><i class="fa fa-pencil"></i>UAT issues</a></router-link> -->
        <router-link v-if="this.$store.getters.getProjectInfo.isProjectAvailable" :to="'/product-owner/task-board/'+this.projectRequestId" tag="li" active-class="active"  class="sidebar-margin-leaft"> <a><i class="fa fa-file-text-o"></i>Task Board</a></router-link>
        <router-link v-if="this.$store.getters.getProjectInfo.isProjectAvailable" :to="'/product-owner/quality-assurance/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"> <a><i class="fa fa-pencil"></i>Quality Assurance</a></router-link>

      </ul>
      <ul class="sidebar-menu" v-else>
      <router-link :to="'/product-owner/dashboard'" tag="li" active-class="active" ><a><i class="fa fa-dashboard "></i>Dashboard</a></router-link>
      <router-link  :to="''" tag="li" class="no-hover"> <a class="side-bar-bold"><i class="fa fa-rocket" aria-hidden="true"></i>{{projectLeadName}}</i></a></router-link>
      <router-link  :to="'/product-owner/project-request/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft" exact> <a><i class="fa fa-list-alt"></i>Requirements</a></router-link>
      <router-link  :to="''" tag="li"  class="sidebar-margin-leaft disable-on-hover"> <a><i class="fa fa-th"></i>Product Backlog</a></router-link>
      <router-link   :to="''" tag="li"  class="sidebar-margin-leaft disable-on-hover"><a><i class="fa fa-flag-checkered"></i> Milestones</a></router-link>
      <router-link :to="''" tag="li"  class="sidebar-margin-leaft disable-on-hover"><a><i class="fa fa-usd"></i>Commercials </a></router-link>
      <router-link :to="''" tag="li"  class="sidebar-margin-leaft disable-on-hover"> <a><i class="fa fa-file-text-o"></i>Proposals</a></router-link>
      <!-- <router-link :to="''" tag="li" class="sidebar-margin-leaft disable-on-hover"> <a><i class="fa fa-pencil"></i>UAT issues</a></router-link> -->
      <router-link v-if="this.$store.getters.getProjectInfo.isProjectAvailable" :to="''" tag="li" class="sidebar-margin-leaft disable-on-hover"> <a><i class="fa fa-pencil"></i>Quality Assurance</a></router-link>


    </ul>
    <!--  </div>-->
      <!-- /.sidebar-menu -->

  <div class="personsList">
              <chat-side-bar></chat-side-bar>
    </div>

    </section>
    <!-- /.sidebar -->
  </aside>
</template>


<script>


 import ChatSidebar from '../src/components/chat/ChatSidebar.vue';

export default {
  props: ['projectRequestId','projectLeadStatus'],
  data(){
      return{
         //pmBacklogUrl : ''

         projectLeadName: this.$store.getters.getProjectInfo.name
      }
  },
     components:{
            'chat-side-bar':ChatSidebar
        },




    //,
  mounted: function(){
  // this.pmBacklogUrl = '/project-manager/project-request/'+this.projectRequestId;
 this.checkStatus()
},methods:{
  checkStatus(){
  var app =this;
  if(app.projectLeadStatus){

  if(app.projectLeadStatus != 'REQUESTED'){
    return true;
  }else{
    return false;
  }
}else{
  return true;
}
  }
}
}

</script>
