<template>
  <div>
        <section class="content">
          <div class="PMepicContainer">

            <el-tabs v-model="activeName" @tab-click="handleClick">

               <el-tab-pane  v-for="(env,index) in environments" :label="env.name" :name="env.name">
              <div class="build-content">


                    <p>Url:- {{env.url}}</p>
                    <p class="border-bottom">Description:- {{env.description}}</p>

                    <h4>Builds </h4>

                      <button type="submit" class="btn btn-orange" @click="addBuild(env)" >Add Build</button>

                    <div v-for="build in env.Builds">
                      <div class="row">
                        <div class="col-md-6">
                            <p>{{build.name}}</p>
                        </div>
                        <div class="col-md-6">
                              <p class="text-right date-font">{{convertUtcToLocaDateTime(build.BuildDate)}}</p>
                        </div>

                      </div>
                        <p>{{build.description}}</p>
                        <hr>

                    </div>

                  </div>

               </el-tab-pane>

               <el-tab-pane>
                <span slot="label"><i class="fa fa-plus-circle plush-icon" aria-hidden="true"></i></span>

                <div class="build-content">
                <form  @submit.prevent="submitForm">
                   <input type="hidden" name="projectId" v-model="projectId">
                   <div class="form-group">
                    <input class="form-control epicName" name="url" v-model="url"   type="text"  placeholder="url" >
                  </div>
                     <div class="form-group">
                    <input class="form-control epicName" id="environment" name="name" v-model="name"   type="text"  placeholder="Environment Name" >
                  </div>

                    <div class="form-group">
                        <textarea class="form-control" name="description" v-model="description"  placeholder="Description"></textarea>
                    </div>

                    <button type="submit" class="btn btn-orange" :disabled="enableButton"  >submit</button>

                </form>
              </div>



           </el-tab-pane>

             </el-tabs>

            </div>
        </section>




        <!-- add build  -->




        <div class="modal fade" id="buildModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
         <div class="modal-dialog" role="document">
           <div class="modal-content">
             <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                 <h4 class="modal-title">Add Build</h4>
             </div>
             <div class="modal-body">
                 <div class="row">
                     <div class="col-md-12">

                           <form id="buildForm" @submit.prevent="saveBuild()">
                              <!-- <input type="hidden" name="projectId" v-model="eve"> -->
                              <div class="form-group">
                               <input class="form-control epicName"  name="buildName" v-model="buildName"   type="text"  placeholder="Name" >
                             </div>
                             <div class="form-group">
                               <datepicker  placeholder="From date" name="fromDate" class="form-control"  v-model="fromDate"></datepicker>

                             </div>

                               <div class="form-group epic" >
                                   <textarea class="form-control" name="buildDescription" v-model="buildDescription"  placeholder="Description"></textarea>
                               </div>
                                <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                               <button type="submit" class="btn btn-orange" :disabled="enableButton" >ADD</button>

                           </form>

                     </div>
                 </div>
             </div>
           </div>
         </div>
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
import Datepicker from 'vuejs-datepicker';



export default{

  data(){
    return{
      showData:false,
      fromDate:'',
      state: {
        disabled: {
          to: null, // Disable all dates up to specific date
          from: new Date(), // Disable all dates after specific date
          days: [], // Disable Saturday's and Sunday's
          dates: [ // Disable an array of dates

          ]
        }


      },
      activeName: 'add',

          loggedInRole: this.$store.getters.getLoggedInUser.role,
          projectRequestId:'',
          projectId:this.$store.getters.getProjectInfo.projectId,
          environments:[],
          name:'',
          description:'',
          url:'',
          enableButton:false,
          buildName:'',
          buildDescription:'',
          envId:'',
          environment:'',
          selected:0,
    }

  },

  components:{
      "app-adminHeader":adminHeader,
      "pmSidebar":pmSidebar,
      "projectInfoHeader":projectInfoHeader,
      'AdminSidebar': AdminSidebar,
      'AdminProjectHeader':adminProjectHeader,
      'task-content':TaskContent,
      Datepicker

  },
  created: function(){

        this.projectRequestId = this.$route.params.projectRequestId;

  },
  mounted: function(){
    this.getEnv();
  },
  methods:{
    getEnv(){
      var app = this;
      app.$http.get(
           this.$store.state.SERVER_URL+'/api/get-All-environments/'+app.projectId,
          {
            headers: {
              "X-Authorization": app.$cookie.get('X-Authorization')
            },
        }
   ).then(function(response) {
       app.environments = response.data.payLoad;
       var object={};
       object.id='';

       app.activeName = app.environments[0].name;
      //  app.environments.push(object);
   });
    },
    handleClick(tab, event) {
        console.log(tab, event);
      },
      openEnvironmentModal:function(){
             var app = this;
             app.name= "";
             app.description  ="";
             app.url="";
              $('#myModal').modal('show');
               app.errors.add({ field: 'name', msg: 'woops'});
               setTimeout(() => {
                  app.errors.clear();
          }, 100);

      },
      submitForm: function(e) {
          e.preventDefault();
          var app = this;
              app.$validator.validateAll();

         if (!app.errors.any()) {
              app.enableButton=true;

                var obj={};
                obj.name= app.name;
                obj.url = app.url;
                obj.description = app.description;
                obj.projectId = app.projectId;

              app.$http.post(
              app.$store.state.SERVER_URL+'/api/save-environment',
              obj,
              {
                 headers: {
                     "X-Authorization": app.$cookie.get('X-Authorization')
                 },
             }
              ).then(function(response){
                if(response.data.status === "SUCCESS"){
                      console.log("success------------");
                  app.environments.unshift(response.data.payLoad);
                  app.activeName= response.data.payLoad.name;
                }else{
                  console.log("Oops something went wrong")
                }
              });


          // $.ajax({
          //     url: this.$store.state.SERVER_URL + '/api/save-environment',
          //     type: 'POST',
          //     contentType: "application/json; charset=utf-8",
          //     dataType: "json",
          //     data: JSON.stringify(dataObj),
          //     headers: {
          //         "X-Authorization": app.$cookie.get('X-Authorization')
          //
          //     },
          //
          //     success: function(data) {
          //         if (data.status === "SUCCESS") {
          //             app.enableButton=false;
          //             console.log('success');
          //             $('#myModal').modal('hide');
          //
          //
          //          app.errors.add({ field: 'name', msg: 'woops'});
          //          setTimeout(() => {
          //           app.errors.clear();
          //             }, 1000);
          //             app.environments.push(data.payLoad);
          //
          //         } else {
          //             app.enableButton=false;
          //             console.log('error');
          //         }
          //     },
          // });

            }
          //  $('#preview_requestedform').modal('show')
      },
      addBuild(env){
         this.environment= env;
        $('#buildModal').modal('show');

      },
      saveBuild(){
        var app = this;
        var object={};
         var date = new Date(moment(app.fromDate).format('DD/MMM/YYYY'));
          object.BuildDate = date.getTime();
          object.description = app.buildDescription;
          object.name= app.buildName;
          object.envId = app.environment.id;

          console.log("env id---",app.environment);

          app.$store.commit('setSpinner',true);
          app.$http.post(
                  app.$store.state.SERVER_URL+'/api/save-build',
                  object,
                 {
                   headers: {
                     "X-Authorization": app.$cookie.get('X-Authorization')
                   },
               }
          ).then(function(response) {
            if(response.data.status=="SUCCESS"){

              var Index = app.environments.indexOf(app.environment);
              app.environment.Builds.push(response.data.payLoad);
              console.log("builds---are",app.environment);

            //  app.environments.splice(Index,1,app.environment);

  $('#buildModal').modal('hide');
  app.$store.commit('setSpinner',false);




            }




          });


      },
      openBuildModal(){
            $('#buildModal').modal('show');
      },
      editEnv(environment){

          console.log('environment----',environment);
        this.environment = environment;

      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      isSelected(index){
        var app = this;
      return index === app.selected;
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
<style scoped>
.managePmMilestoneBlock {
    margin-top: -17px !important;
}
ul.list-group.epicAdd.mangeEpic {
    margin-top: 42px;
}
.plush-icon{
  font-size: 20px;
 color: green;
}

</style>
