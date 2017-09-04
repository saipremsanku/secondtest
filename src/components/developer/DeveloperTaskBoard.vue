<template>
  <div>
  <div class="wrapper">
<div class="taskCardBlock">
  <app-adminHeader></app-adminHeader>
  <developer-sidebar></developer-sidebar>

  <div class="content-wrapper">
         <projectInfoHeader ></projectInfoHeader>


         <el-tabs v-model="activeName" @tab-click="handleClick">
           <el-tab-pane label="Task Board" name="taskBoard">
 <developerTaskContent></developerTaskContent>

           </el-tab-pane>

<el-tab-pane label="env" name="env">
      <el-tabs v-model="activeNameSub" @tab-click="handleClick">
           <el-tab-pane  v-for="(env,index) in envList" :label="env.name" :name="env.name">
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
                    <hr>
                </div>
              </div>



           </el-tab-pane>
         </el-tabs>
          </el-tab-pane>


         </el-tabs>






  </div>
     </div>
   </div>
 </div>
 </template>
 <script>

 import adminHeader from "../../adminHeader.vue";
 import DeveloperSidebar from './DeveloperProjectSidebar.vue';
 import projectInfoHeader from "../../projectInfoHeader.vue";
 import DeveloperTaskContent from "./DeveloperTaskContent.vue"

 export default{
   data(){
     return{
        activeName: 'taskBoard',
        activeNameSub:'first',
        envList:[],
          projectId:this.$route.params.projectId

     }
   },
   components:{
       "app-adminHeader":adminHeader,
       "developer-sidebar":DeveloperSidebar,
       "projectInfoHeader":projectInfoHeader,
       "developerTaskContent":DeveloperTaskContent

   },
   mounted: function(){

     var app = this;
    //  app.projectId = app.$store.getters.getProjectInfo.projectId;
   app.$http.get(
          this.$store.state.SERVER_URL+'/api/get-All-environments/'+app.projectId,
         {
           headers: {
             "X-Authorization": app.$cookie.get('X-Authorization')
           },
       }
  ).then(function(response) {
      app.envList = response.data.payLoad;



  });

   },
   methods:{
     handleClick(tab, event) {
      console.log(tab, event);
    },
    convertUtcToLocaDateTime(date){
     var moment = require('moment-timezone');
     var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // console.log("convertStringtoDate------------------------>"+date)
     return moment(date).tz(timeZone).format('DD-MMM-YYYY HH:mm:ss')
    },
   }
 }
 </script>
