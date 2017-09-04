<template>

  <div class="wrapper">

    <app-adminHeader></app-adminHeader>
    <div v-if="loggedInRole === 'ADMIN'">
      <AdminSidebar></AdminSidebar>
    </div>
    <div v-if="loggedInRole === 'PROJECT_MANAGER'">
      <pmSidebar :projectRequestId="projectRequestId"></pmSidebar>
   </div>

    <div class="content-wrapper">
      <div v-if="loggedInRole === 'ADMIN'">
        <AdminProjectHeader></AdminProjectHeader>
      </div>
        <div v-if="loggedInRole === 'PROJECT_MANAGER'">
           <projectInfoHeader ></projectInfoHeader>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
         <el-tab-pane label="Task Board" name="taskBoard">

      <task-content></task-content>

         </el-tab-pane>
         <el-tab-pane label="Environment" name="Environment">
             <app-environment></app-environment>
             </el-tab-pane>
       </el-tabs>


      </div>
    </div>




</template>
<script>
import adminHeader from "../../adminHeader.vue";
import pmSidebar from "../../ProjectSidebar.vue"
import projectInfoHeader from "../../projectInfoHeader.vue";
import  AdminSidebar  from  "../../SupperAdminSideBar.vue";
import  adminProjectHeader  from  "../admin/adminProjectHeader.vue";
import TaskContent from "./TaskContent.vue"

import Environment from "./Environment.vue"
export default{

  data(){
    return{
        activeName: 'taskBoard',
          loggedInRole: this.$store.getters.getLoggedInUser.role,
          projectRequestId:''
    }

  },

  components:{
      "app-adminHeader":adminHeader,
      "pmSidebar":pmSidebar,
      "projectInfoHeader":projectInfoHeader,
      'AdminSidebar': AdminSidebar,
      'AdminProjectHeader':adminProjectHeader,
      'task-content':TaskContent,
      'app-environment':Environment
  },
  created: function(){

        this.projectRequestId = this.$route.params.projectRequestId;

  },
  methods:{
    handleClick(tab, event) {
        console.log(tab, event);
      }
  }

}
</script>
