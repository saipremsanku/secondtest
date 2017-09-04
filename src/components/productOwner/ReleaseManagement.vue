<template>
    <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
      <div v-if="loggedInRole === 'ADMIN'">
        <AdminSidebar></AdminSidebar>
      </div>
      <div v-if="loggedInRole === 'PRODUCT_OWNER'">
        <app-po-sidebar :projectRequestId="projectRequestId"></app-po-sidebar>
     </div>
      <div class="content-wrapper">
<projectInfoHeader :projectRequestId="projectRequestId"></projectInfoHeader>
         <div v-if="loggedInRole === 'ADMIN'">
           <AdminProjectHeader></AdminProjectHeader>
         </div>
        <section class=" content">
          <div class="row  product-task-border">
          <div class="col-md-6 product-task-border releaes-management-div1 relase-height">
          </div>
          <div class="col-md-6 product-task-border releaes-management-div2 relase-height">
          </div>
          <div class="col-md-6 product-task-border relase-height">
            <el-tabs v-model="activeName" @tab-click="handleClick">
               <el-tab-pane v-for="(env,index) in envList" :label="env.name" :name="env.name">
              <div class="build-content">
                    <p>Url:- {{env.url}}</p>
                    <p class="border-bottom">Description:- {{env.description}}</p>
                    <h4>Builds </h4>
                    <div v-for="build in env.Builds">
                      <div class="row">
                        <div class="col-md-6">
                            <p>{{build.name}}</p>
                        </div>
                        <div class="col-md-6">
                              <p class="text-right ">{{convertUtcToLocaDateTime(build.BuildDate)}}</p>
                        </div>
                      </div>
                        <p>{{build.description}}</p>
                    </div>
                  </div>
               </el-tab-pane>
             </el-tabs>
          </div>
          <div class="col-md-6 product-task-border relase-height">
          </div>
        </div>

         </section>
    </div>
  </div>
</template>]
<script>

import adminHeader  from "../../adminHeader.vue"
import poSideBar from "../../poSideBar.vue"
import projectInfoHeader from "../../projectInfoHeader.vue";
import UATIssue from './UATIssue.vue';

import  AdminSidebar  from  "../../SupperAdminSideBar.vue";
import AlertComponent from  "../alert/Alert.vue";


export default{
  data(){
    return{
      projectId:'',
      envId:'',
      message:'',
        projectId: this.$store.getters.getProjectInfo.projectId,
      success:false,
      selected:0,
      envList:[],
      buildList:[],
      testCaseIndex:0,
        loggedInRole: this.$store.getters.getLoggedInUser.role,
              activeName: 'first'
    }
  },
  created: function(){
    this.projectRequestId = this.$route.params.projectRequestId;
  },
  mounted:function(){
      var app = this;
    app.$http.get(
           this.$store.state.SERVER_URL+'/api/get-latest-build-environment/'+app.projectId,
          {
            headers: {
              "X-Authorization": app.$cookie.get('X-Authorization')
            },
        }
   ).then(function(response) {
       app.envList = response.data.payLoad;



   });
  //  app.$http.get(
  //         this.$store.state.SERVER_URL+'/api/get-latest-build/'+app.envId,
  //        {
  //          headers: {
  //            "X-Authorization": app.$cookie.get('X-Authorization')
  //          },
  //      }
  // ).then(function(response) {
  //     app.envList = response.data.payLoad;
  //
  //
  //
  // });
  },
  components: {
    "app-adminHeader": adminHeader,
    "app-po-sidebar": poSideBar,

    'AdminSidebar': AdminSidebar,
    "app-alert-component":AlertComponent,
    projectInfoHeader
  },
  computed: {
    isAdmin:function(){
      return  this.loggedInRole === 'ADMIN';
    }
  },
  methods:{
    convertUtcToLocaDateTime(date){
     var moment = require('moment-timezone');
     var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // console.log("convertStringtoDate------------------------>"+date)
     return moment(date).tz(timeZone).format('DD-MMM-YYYY HH:mm:ss')
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getDate(date){

    }

  }
}

</script>
<style scoped>
.relase-height{
  height:455px !important;
}

</style>
