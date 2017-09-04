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
            <v-select  v-model="selectedAppUser" label="appUserFullName"  :options="appUserList" placeholder="Please Select App User"></v-select>
        </div>
      </div>
      <div class="col-md-3 text-left ">
        <div id="custom-search-input" class="margin-bottom-xternal">
            <v-select  v-model="selectedAppUserEmail" label="email"  :options="appUserList" placeholder="Please select Email"></v-select>
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
                    <th>Email Address</th>
                    <th>Time</th>
                    <th>Message</th>
                    <th>Status</th>
                </tr>
                 <tr class="text-left" v-for="(email,index) in emailList" >

                    <td>{{iterateRowNum(index)}}</td>
                    <td>{{email.firstName}}  {{email.lastName}}</td>
                    <td>{{email.email}}</td>
                    <td>{{convertUtcToLocaDateTime(email.createdOn)}}</td>
                    <td>
                      <span>
                        <span @click="readEmail(email.activityId)" class="admin-title-underline ">mail content</span>

                      </span>

                    </td>
                    <td>
                      {{email.statusCode}}
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
       <div class="modal fade" id="emailModel" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>

              <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body ">

              <div class="form-group">
                <div v-html="emailBody"></div>
              <!-- <p>{{emailBody}}</p> -->
            </div>
            <div class="row">
             <div class="col-md-12"><button type="button" class="btn btn-gray pull-right " data-dismiss="modal">Close</button>
             </div>
           </div>
            </div>
          </div>
        </div>
      </div>

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
              recordPerPage:'',
              onloadPagination:'pagination-color',
              noOfPages:'',
              index:'',
              email:'',
              emailList:[],
              appUserList:[],
              selectedAppUser:'',
              pagination:[],
              totalUserCount:0,
              startUserCount:'',
              endUserCount:0,
              emailBody:'',

              appUser:{
                isNextPageClicked:false,
                searchIndex:'',
                pageNumber:0,
                appUserId:'',
                fromDate:'',
                toDate:'',
                email:'',
              },
              emailContent:'',
              selectedAppUserEmail:'',
            }


        },
         components:{
             'appAdminSidebar': AdminSidebar,
            'appAdminHeader': AdminHeader,
            Datepicker
          },

        mounted:function(){
          // this.getEmailActivity();
           this.getAppUser();

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
           return moment(date).tz(timeZone).format('DD/MMM/YYYY HH:mm:ss')
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
  readEmail(activityId){
    // this.activityId=activityId;
    // app.emailBody.activityId=activityId;
    var app = this;
    var object={};
    object.activityId=activityId;
    app.$http.post(
            this.$store.state.SERVER_URL+'/admin/get-email',
            object,
           {
             headers: {
               "X-Authorization": app.$cookie.get('X-Authorization')
             },
         }
    ).then(function(response) {

        console.log(" emailUsers data are----------------",response.data.payLoad);
        console.log(response.data.payLoad);
         app.emailBody=response.data.payLoad;
        app.showData=true;

        $('#emailModel').modal('show');

        });


  },

              searchAppUsers: function(){
                    // console.log("developer coll  are----------------------------------------");
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
                    if(app.selectedAppUserEmail!=null && app.selectedAppUserEmail!=''){
                        app.appUser.email =app.selectedAppUserEmail.email;
                    }
                    // app.appUser.email  = "platform@mailinator.com"
                    app.$http.post(
                            this.$store.state.SERVER_URL+'/admin/search-email-activity',
                            app.appUser,
                           {
                             headers: {
                               "X-Authorization": app.$cookie.get('X-Authorization')
                             },
                         }
                    ).then(function(response) {

                        console.log(" emailUsers data are----------------");
                        console.log(response.data.payLoad);

                        app.showData=true;
                        app.emailList = response.data.payLoad.emailActivityBeans;
                        app.recordPerPage = response.data.payLoad.recordPerPage;
                        app.totalElements = response.data.payLoad.totalElements;
                        app.totalPages = response.data.payLoad.totalPages;
                        //app.totalPages = 4
                        app.startUserCount = response.data.payLoad.startUserCount;
                        // app.endUserCount = response.data.payLoad.endUserCount;
                        app.endUserCount =response.data.payLoad.endUserCount;
                        app.pagination = [];
                        for (var i = 0; i < app.totalPages; i++) {
                          app.pagination.push(i);
                        }

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

                            // console.log(response);
                            // console.log("Sms app user data are----------------");
                            // console.log(response.data.payLoad);
                            app.appUserList = response.data.payLoad.appUserBeans;
                        });
                      },
                  clearSearch(){
                    var app = this;
                    app.selectedAppUserEmail=null;
                    app.selectedAppUser = '';
                    app.appUser.pageNumber = 0;
                    app.appUser.appUserId = '';
                    app.appUser.fromDate = '';
                    app.appUser.toDate = '';
                    app.appUser.email = '';
                    app.showData=false;
                    app.endUserCount=0;
                    app.startUserCount=0;
                    app.totalElements=0;
                  },





}

      }

</script>
<style scoped>
.content-wrapper{
  min-height: 95vh;
  margin-right: 6px;
  /*margin-bottom: 35px;*/
}
</style>
