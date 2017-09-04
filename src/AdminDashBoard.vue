<template>
    <div>
        <div class="wrapper">
        <app-admin-sidebar></app-admin-sidebar>
        <app-admin-header></app-admin-header>
        <div class="content-wrapper productBacklog_Block">
        <section class="content">
          <div class="row product-task-border" >
          <div class="col-md-4 product-task-an-padding text-center graph-bg">
            <h4 class="product-test-display-inline"> WIP </h4>

         <column-chart  ytitle="Hours" :stacked="true" :data="wipTaskStatus"></column-chart>
        </div>
        <div class="col-md-4 text-center product-task-an-padding product-task-border product-task-add-padding">
          <div class="row">
                 <h4 class="product-test-display-inline"> Completed By Developer </h4>

              <column-chart   ytitle="Hours" :stacked="true" :data="completedTaskStatus"></column-chart>
              </div>

        </div>
        <div class="col-md-4 text-center product-task-an-padding product-task-border product-task-add-padding">
          <div class="row">
                 <h4 class="product-test-display-inline">Approved By Ceo </h4>

              <column-chart  ytitle="Hours" :stacked="true" :data="doneTaskStatus"></column-chart>
              </div>

        </div>
        </div>

        <div class="row product-task-border product-task-remove-padding" >
        <div class="col-md-4 product-task-an-padding  graph-bg text-center">
          <h4 class="product-test-display-inline">WIP</h4>

          <table class="table table-hover platform-table-color">
            <tbody>
                <tr>
                    <th>S.no</th>
                    <th>Date</th>
                    <th>#Dev</th>
                    <th>#Task</th>
                    <th>#Hours</th>
                </tr>
                <tr class="text-left" v-for="(wip,index) in wipTaskList">
                    <td>{{iterateRowNum(index)}}</td>
                    <td>{{convertUtcToLocaDateTime(wip.date)}}</td>
                    <td>{{wip.noOFDevelopers}}</td>
                     <td>{{wip.noOfTasks}}</td>
                     <td>{{wip.noOfHours}}</td>
                </tr>
            </tbody>
         </table>
      </div>
      <div class="col-md-4 text-center product-task-an-padding product-task-border product-task-add-padding">
        <div class="row">
               <h4 class="product-test-display-inline"> Completed By Developer </h4>
               <table class="table table-hover platform-table-color">
                 <tbody>
                     <tr>
                         <th>S.no</th>
                         <th>Date</th>
                         <th>#Dev</th>
                         <th>#Task</th>
                         <th>#Hours</th>
                     </tr>
                     <tr class="text-left" v-for="(completed,index) in completedTaskList">
                         <td>{{iterateRowNum(index)}}</td>
                         <td>{{convertUtcToLocaDateTime(completed.date)}}</td>
                         <td>{{completed.noOFDevelopers}}</td>
                          <td>{{completed.noOfTasks}}</td>
                          <td>{{completed.noOfHours}}</td>
                     </tr>
                 </tbody>
              </table>
            </div>

      </div>
      <div class="col-md-4 text-center product-task-an-padding product-task-border product-task-add-padding">
        <div class="row">
               <h4 class="product-test-display-inline"> Approved By Ceo</h4>
               <table class="table table-hover platform-table-color">
                <tbody>
                    <tr>
                        <th>S.no</th>
                        <th>Date</th>
                        <th>#Dev</th>
                        <th>#Task</th>
                        <th>#Hours</th>
                    </tr>
                    <tr class="text-left" v-for="(approved,index) in approvedTaskList">
                        <td>{{iterateRowNum(index)}}</td>
                        <td>{{convertUtcToLocaDateTime(approved.date)}}</td>
                        <td>{{approved.noOFDevelopers}}</td>
                         <td>{{approved.noOfTasks}}</td>
                         <td>{{approved.noOfHours}}</td>
                    </tr>
                </tbody>
              </table>
            </div>

      </div>
      </div>
        </section>
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
            completedTaskStatus:[],
            wipTaskStatus:[],
            doneTaskStatus:[],
            index:'',
            wipTaskList:'',
            completedTaskList:[],
            approvedTaskList:[],
            startCount:1
            }
        },
        components:{
            'appAdminSidebar': AdminSidebar,
            'appAdminHeader': AdminHeader,
            'appFooter': Footer
        },
        mounted: function() {
            this.getWipTaskStatus();
            this.getApprovedTaskStatus();
            this.getCompletedTaskStatus();
        //     this.getWipTaskTable();
        //     this.getApprovedTaskTable();
        //     this.getCompletedTaskTable();
        },
        methods:{
          iterateRowNum(index){
            return (this.startCount+index);
          },


          getWipTaskStatus: function() {
              var app = this;
              app.$store.commit('setSpinner', true);
              app.$http.get(
                  app.$store.state.SERVER_URL + '/admin/get-daily-developer-status-inpro ', {
                      headers: {
                          "X-Authorization": app.$cookie.get('X-Authorization')
                      },

                  }
              ).then(function(response) {
                  app.$store.commit('setSpinner',false);
                  var wipTaskStatus = []
                  var data=[]
                  for (var appUser of response.data.payLoad.graphBean) {
                    var data=[]
                      data.unshift(app.convertUtcToLocaDateTime(appUser.date), appUser.totalApprovedHours);
                      wipTaskStatus.unshift(data);
                  }
                  app.wipTaskStatus=wipTaskStatus;

                  app.wipTaskList=response.data.payLoad.tableBeans;

              });

          },
          convertUtcToLocaDateTime(date){
            var app=this;
           var moment = require('moment-timezone');
           var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          // console.log("convertStringtoDate------------------------>"+date)
           return moment(date).tz(timeZone).format('DD-MMM-YYYY')
          },
          getCompletedTaskStatus: function() {
              var app = this;
              app.$store.commit('setSpinner', true);
              app.$http.get(
                  app.$store.state.SERVER_URL + '/admin/get-daily-developer-status-complete', {
                      headers: {
                          "X-Authorization": app.$cookie.get('X-Authorization')
                      },

                  }
              ).then(function(response) {
                  app.$store.commit('setSpinner',false);
                  var completedTaskStatus = []
                  var data=[]
                  for (var appUser of response.data.payLoad.graphBean) {
                    var data=[]
                      data.unshift(app.convertUtcToLocaDateTime(appUser.date), appUser.totalApprovedHours);
                      completedTaskStatus.unshift(data);
                  }
                  app.completedTaskStatus=completedTaskStatus;

                  app.completedTaskList=response.data.payLoad.tableBeans;


              });

          },
          getApprovedTaskStatus: function() {
              var app = this;
              app.$store.commit('setSpinner', true);
              app.$http.get(
                  app.$store.state.SERVER_URL + '/admin/get-daily-developer-status-approve', {
                      headers: {
                          "X-Authorization": app.$cookie.get('X-Authorization')
                      },

                  }
              ).then(function(response) {
                  app.$store.commit('setSpinner',false);
                  var doneTaskStatus = []
                  var data=[]
                  for (var appUser of response.data.payLoad.graphBean) {
                    var data=[]
                      data.unshift(app.convertUtcToLocaDateTime(appUser.date), appUser.totalApprovedHours);
                      doneTaskStatus.unshift(data);
                  }
                  app.doneTaskStatus=doneTaskStatus;

                  app.approvedTaskList=response.data.payLoad.tableBeans;

              });

          },

        }
    }
</script>
<style scoped>


    .content {
        padding-left: 20px;
        padding-right: 20px;

    }

</style>
