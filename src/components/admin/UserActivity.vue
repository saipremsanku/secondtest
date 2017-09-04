<template>
<div class="wrapper">
  <link rel="stylesheet" href="/src/assets/css/intlTelInput.css">
 <link rel="stylesheet" href="/src/assets/css/demo.css">
  <!-- Main Header -->
<app-admin-sidebar></app-admin-sidebar>
  <app-admin-header></app-admin-header>
  <!-- <section class="content"> -->
  <div class="row content-wrapper ">
    <div class="col-md-12 appUserSearch user-activity-div1">
      <div class="col-md-2 text-left ">
        <div id="custom-search-input" class="margin-bottom-xternal">
            <v-select  v-model="selectedAppUser"  label="appUserFullName" multiple :options="appUserList" placeholder="Please select App User"></v-select>
        </div>
      </div>
      <div class="col-md-2 text-left ">
        <div id="custom-search-input" class="margin-bottom-xternal">
            <v-select  v-model="selectedUserActivity" label="userActivityType" multiple :options="userActivityTypeList" placeholder="Please select User Activity type"></v-select>

        </div>
      </div>

      <div class="col-md-2 text-left ">
      <datepicker :disabled="state.disabled" placeholder="From date" name="fromDate" class="form-control" v-on:selected="disableFrom" v-model="appUser.fromDate"></datepicker>
    </div>

    <div class="col-md-2 text-left ">
    <datepicker :disabled="stateTo.disabled" placeholder="To date" name="toDate" class="form-control" v-model="appUser.toDate"></datepicker>
  </div>
  <div class="col-md-1 text-right ">
     <button class="btn btn-orange btn-sm pull-right" @click="searchAppUsers()">Search</button>
  </div>
  <div class="col-md-1 text-right ">
    <a class="cursor-pointer" @click="clearSearch()">Clear</a>
  </div>
    </div>
    <div class="col-md-12 user-activity-div">
           <form>
           <table class="table table-hover platform-table-color user-activity-tbl" v-if="showData && getTotalUserCount">
            <tbody>
                <tr>
                    <th>S No.</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Date</th>
                    <th>UserActivity Type</th>
                    <th>Device</th>
                    <th>Operating System</th>
                    <th>Browser</th>
                    <th>Ip Address</th>
                </tr>
                <tr class="text-left" v-for="(userActivity,index) in userActivityList">

                    <td> {{iterateRowNum(index)}}</td>
                    <td>{{userActivity.firstName}}  {{userActivity.lastName}}</td>
                    <td>{{userActivity.role}}</td>
                    <td>{{convertUtcToLocaDateTime(userActivity.createdOn)}}</td>
                    <td>
                      {{userActivity.userActivityType}}
                    </td>
                    <td>{{userActivity.deviceType}}</td>
                    <td>{{userActivity.osName}}</td>
                    <td>{{userActivity.browserName}}</td>
                    <td>
                      <a :href="'http://ip-api.com/#'+userActivity.ipAddress" class="edit-dev-link" target="_blank">{{userActivity.ipAddress}}</a>
                    </td>
                </tr>
            </tbody>
        </table>
     </form>
    <!-- </section> -->
   </div>

   <p v-if="getTotalUserCount">Showing {{startUserCount}} to {{endUserCount}} of {{totalElements}} records</p>
       <nav aria-label="Page navigation example">
         <ul class="pagination pull-right" v-if="showData">
           <li class="page-item" v-for="(page,index) in pagination">
             <a v-if="index===0" class="page-link" :class="onloadPagination" href="#" @click="getNextPage(page)">{{page+1}}</a>
             <a v-else class="page-link " href="#" @click="getNextPage(page)">{{page+1}}</a>
           </li>
         </ul>
       </nav>

 </div>
 </div>

</template>

<script>
      import  AdminSidebar  from  "../../SupperAdminSideBar.vue";
        import  AdminHeader  from  "../../adminHeader.vue";
        import Datepicker from 'vuejs-datepicker';




    export default{
        data(){
            return{
              showData:false,
              state: {
                disabled: {
                  to: null, // Disable all dates up to specific date
                  from: new Date(), // Disable all dates after specific date
                  days: [], // Disable Saturday's and Sunday's
                  dates: [ // Disable an array of dates

                  ]
                }


              },
              stateTo:{
                      disabled: {
                          to: null, // Disable all dates up to specific date
                          from: new Date(), // Disable all dates after specific date
                          days: [], // Disable Saturday's and Sunday's
                          dates: [ // Disable an array of dates

                          ]
                      }


            },
              startActivityCount:1,
              recordPerPage:'',
              showData:'',
              onloadPagination:'pagination-color',
              noOfPages:'',
              index:'',

              userActivityList:[],
              pagination:[],
              totalElements:'',
              startUserCount:'',
              endUserCount:'',
              login:'',
              appUserList:[],
              appUser:{
                isNextPageClicked:false,
                searchIndex:'',
                pageNumber:0,
                appUserIds:[],
                userActivityTypes:[],
                fromDate:'',
                toDate:''
              },
              selectedAppUser:'',
              selectedUserActivity:'',
              userActivityTypeList:[],
              userActivityType:'',

            }


        },
         components:{
             'appAdminSidebar': AdminSidebar,
            'appAdminHeader': AdminHeader,
            Datepicker
          },

        mounted:function(){
           this.getAppUsers();

        },
        computed:{
          getTotalUserCount: function(){
            if(this.endUserCount>0){
              return true;
            }else{
              return false;
            }
          }

        },
        methods: {
          iterateRowNum(index){
            return (this.startUserCount+index);
          },
          convertUtcToLocaDateTime(date){
           var moment = require('moment-timezone');
           var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          // console.log("convertStringtoDate------------------------>"+date)
           return moment(date).tz(timeZone).format('DD-MMM-YYYY HH:mm:ss')
          },
  keymonitor(e){
    var app = this;
    if((app.appUser.searchIndex && app.appUser.searchIndex.length > 2) || (app.appUser.searchIndex == '')){
         app.appUser.pageNumber = 0;
         app.searchAppUsers();
    }
  },
  getNextPage(pageNumber){
    var app =this;
    console.log('get page number', pageNumber);
    app.appUser.pageNumber = pageNumber;
    app.pageNumber = pageNumber
    app.onloadPagination = '';
    app.appUser.isNextPageClicked = true;
    app.searchAppUsers();
  },

          handleClick(index,name){

          },
          getAppUsers: function(){
                console.log("developer coll  are----------------------------------------");
                var app = this;
                //app.$store.commit('setSpinner',true);
                app.$http.get(
                        this.$store.state.SERVER_URL+'/admin/get-activity-bean',
                       {
                         headers: {
                           "X-Authorization": app.$cookie.get('X-Authorization')
                         },
                     }
                ).then(function(response) {
                  //app.$store.commit('setSpinner',false);
                  console.log("Users data are----------------");
                  console.log(response.data.payLoad);
                    app.appUserList=response.data.payLoad.appUserBeans;
                    app.userActivityTypeList=response.data.payLoad.userActivityTypes;
                  //  console.log(app.developerList );
                });
              },
              disableFrom (val) {
                   console.log("-----coll the employemnet in education from date--------------");
                      this.appUser.toDate='';
                      // if (typeof this.disabled.from === 'undefined') {
                      //   this.stateTo.disabled = {
                      //     to: this.disabled.from,
                      //     from: null
                      //   };
                      // }
                    this.stateTo.disabled.to = val;
                    },
              clearSearch(){
              var app = this;
              app.selectedAppUser=null;
              app.selectedUserActivity=null;
               //app.getAppUsers();
               app.appUser.pageNumber=0;
                app.appUser.appUserIds=null;
               app.appUser.userActivityTypes=null;
               app.appUser.fromDate='';
               app.appUser.toDate='';
              app.appUser.searchIndex='';
               app.showData=false;
               app.endUserCount=0;
               app.startUserCount=0;
               app.totalElements=0;

              },
              searchAppUsers: function(){

                  var app = this;
                  if(app.appUser.fromDate && app.appUser.fromDate != null){
                          app.appUser.fromDate = moment(app.appUser.fromDate).format('DD/MMM/YYYY');
                  } if(app.appUser.toDate && app.appUser.toDate != null){
                            app.appUser.toDate = moment(app.appUser.toDate).format('DD/MMM/YYYY');
                    }

                    // app.appUser.appUserId =app.appUser.appUserId;
                   if(app.selectedAppUser){
                     var appUserId=[];
                     for(var appuser of app.selectedAppUser){
                       appUserId.push(appuser.appUserId);
                     }
                     app.appUser.appUserIds = appUserId;

                   }
                   if(app.selectedUserActivity!=null && app.selectedUserActivity!=''){
                     var userActivityType=[];
                     for(var appuserType of app.selectedUserActivity){
                        console.log("hhhdhhdhdhhdh",appuserType);
                       userActivityType.push(appuserType);

                     }
                       app.appUser.userActivityTypes =userActivityType;
                   }
                    //console.log("developer coll  are----------------------------------------");
                      app.$store.commit('setSpinner',true);

                    app.$http.post(
                            this.$store.state.SERVER_URL+'/admin/search-user-activity',
                            app.appUser,
                           {
                             headers: {
                               "X-Authorization": app.$cookie.get('X-Authorization')
                             },
                         }
                    ).then(function(response) {
                    app.$store.commit('setSpinner',false);
                    app.showData=true;
                    app.userActivityList = response.data.payLoad.userActivityBeans;
                    app.recordPerPage = response.data.payLoad.recordPerPage;
                    app.totalElements = response.data.payLoad.totalElements;
                    app.totalPages = response.data.payLoad.totalPages;
                    //app.totalPages = 4
                    app.startUserCount = response.data.payLoad.startUserCount;
                    app.endUserCount = response.data.payLoad.endUserCount;
                    app.pagination = [];
                    for (var i = 0; i < app.totalPages; i++) {
                      app.pagination.push(i);
                    }
                    });

                  },



}


      }

</script>
<style scoped>
.content-wrapper{
  min-height: 95vh;
  margin-right: 6px;
  /*margin-bottom: 30px;*/
}
</style>
