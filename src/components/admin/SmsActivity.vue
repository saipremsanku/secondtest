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
      <div class="col-md-1 total-sms-count ">
        Today's SMS
        <br>
        {{smsCount}}
      </div>
      <div class="col-md-2 text-left ">
        <div id="custom-search-input" class="margin-bottom-xternal">
            <v-select  v-model="selectedAppUser" label="appUserFullName"  :options="appUserList" placeholder="Please select App User"></v-select>
        </div>
      </div>
      <div class="col-md-2 text-left ">
        <div id="custom-search-input" class="margin-bottom-xternal">
            <v-select  v-model="selectedAppUserNumber" label="mobileNumber"  :options="appUserList" placeholder="Please select Mobile Number"></v-select>
        </div>
      </div>
      <div class="col-md-2 text-left ">
      <datepicker :disabled="state.disabled" placeholder="From date" name="fromDate" v-on:selected="disableFrom" class="form-control" v-model="appUser.fromDate"></datepicker>
    </div>

    <div class="col-md-2 text-left ">
    <datepicker :disabled="stateTo.disabled" placeholder="To date" name="toDate" class="form-control" v-model="appUser.toDate"></datepicker>
  </div>
  <div class="col-md-2 text-right ">
     <button class="btn btn-orange btn-sm pull-right" @click="searchAppUsers()">Search</button>
  </div>
  <div class="col-md-1 text-right ">
    <a class="cursor-pointer" @click="clearSearch()">Clear</a>
  </div>
    </div>
    <div class="col-md-12">
           <form>
           <table class="table table-hover platform-table-color user-activity-tbl" v-if="showData && getTotalUserCount">
            <tbody>
                <tr>
                    <th>S No.</th>
                    <th>Name</th>
                    <th>Phone No.</th>
                    <th>Time</th>
                    <th>Message</th>
                    <th>Status</th>
                </tr>
                <tr class="text-left" v-for="(sms,index) in smsList">

                    <td> {{iterateRowNum(index)}}</td>
                    <td>{{sms.firstName}}  {{sms.lastName}}</td>
                    <td>{{sms.mobileNumber}}</td>
                    <td>{{convertUtcToLocaDateTime(sms.createdOn)}}</td>
                    <td>
                      {{sms.messageBody}}
                    </td>
                    <td>
                      {{sms.status}}
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
              // showData:'',
              onloadPagination:'pagination-color',
              noOfPages:'',
              index:'',
              sms:'',
              smsList:[],
              pagination:[],
              totalElements:'',
              startUserCount:'',
              endUserCount:'',
              appUserList:[],
              selectedAppUser:'',
              selectedAppUserNumber:'',
              fromDate:'',
              mobileNumber:'',
              toDate:'',
              smsCount:'',
              appUser:{
                isNextPageClicked:false,
                searchIndex:'',
                pageNumber:0,
                appUserId:'',
                fromDate:'',
                toDate:'',
                mobileNumber:'',
              },
            }


        },
         components:{
             'appAdminSidebar': AdminSidebar,
            'appAdminHeader': AdminHeader,
            Datepicker
          },

        mounted:function(){
          //  this.getSmsActivity();
           this.getAppUser();
           this.getSmsCount();

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
              getAppUser: function(){

                    var app = this;
                    //as Internal Developers Tab (component) is shown first, spinner need not be fiddled with by this, external developers page
                    //app.$store.commit('setSpinner',true);
                    app.$http.get(
                            this.$store.state.SERVER_URL+'/admin/get-activity-bean',
                           {
                             headers: {
                               "X-Authorization": app.$cookie.get('X-Authorization')
                             },
                         }
                    ).then(function(response) {

                        console.log(response);
                        console.log("Sms app user data are----------------");
                        console.log(response.data.payLoad);
                        app.appUserList = response.data.payLoad.appUserBeans;
                    });
                  },
                  getSmsCount: function(){

                        var app = this;
                        //as Internal Developers Tab (component) is shown first, spinner need not be fiddled with by this, external developers page
                        //app.$store.commit('setSpinner',true);
                        app.$http.get(
                                this.$store.state.SERVER_URL+'/admin/get-sms-sent-today',
                               {
                                 headers: {
                                   "X-Authorization": app.$cookie.get('X-Authorization')
                                 },
                             }
                        ).then(function(response) {
                          console.log("smsmsmsmsmsmsmsms",response);
                            app.smsCount = response.data.payLoad;
                        });
                      },
                  clearSearch(){
                    var app = this;
                    app.selectedAppUserNumber = '';
                    app.selectedAppUser = '';
                    app.appUser.pageNumber = 0;
                    app.appUser.appUserId = '';
                    app.appUser.fromDate = '';
                    app.appUser.toDate = '';
                    app.appUser.searchIndex='';
                    app.appUser.mobileNumber = '';
                    app.showData=false;
                    app.endUserCount=0;
                    app.startUserCount=0;
                    app.totalElements=0;
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
              searchAppUsers: function(){
                    console.log("developer coll  are----------------------------------------");
                    var app = this;

                    if(app.appUser.fromDate && app.appUser.fromDate != null){
                            app.appUser.fromDate = moment(app.appUser.fromDate).format('DD/MMM/YYYY');
                    } if(app.appUser.toDate && app.appUser.toDate != null){
                              app.appUser.toDate = moment(app.appUser.toDate).format('DD/MMM/YYYY');
                      }

                    // app.appUser.appUserId =app.appUser.appUserId;
                   if(app.selectedAppUser){
                     app.appUser.appUserId =app.selectedAppUser.appUserId;
                             }
                       if(app.selectedAppUserNumber!=null && app.selectedAppUserNumber!=''){
                   app.appUser.mobileNumber =app.selectedAppUserNumber.mobileNumber;
                             }
                    app.$http.post(
                            this.$store.state.SERVER_URL+'/admin/search-sms-activity',
                            app.appUser,
                           {
                             headers: {
                               "X-Authorization": app.$cookie.get('X-Authorization')
                             },
                         }
                    ).then(function(response) {

                        console.log("Users data are----------------");
                        console.log(response.data.payLoad);

                        app.showData=true;
                        app.smsList = response.data.payLoad.smsActivityBeans;
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
