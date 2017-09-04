<template>
    <div class="wrapper">
      <link rel="stylesheet" href="/src/assets/css/intlTelInput.css">
     <link rel="stylesheet" href="/src/assets/css/demo.css">
      <!-- Main Header -->
  <app-admin-sidebar></app-admin-sidebar>
      <app-admin-header></app-admin-header>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
      <section class="content">
         <div class="team-container">

           <div class="row">

             <table class="table table-hover platform-table-color price-table table-uat-th-alignment" >
              <tbody>
                  <tr>
                      <th width="20%">Name</th>
                      <th width="20%">Date</th>
                      <th width="20%">Title</th>
                      <th width="40%">Description</th>


                  </tr>
                  <tr v-for="(feedback,index) in feedBackList">
                      <td>{{feedback.feedbackUserName}}</td>
                        <td>{{convertUtcToLocaDateTime(feedback.feedbackDateInMillis)}}</td>
                      <td>{{feedback.feedbackTitle}}</td>
                        <td>{{feedback.feedbackDescription}}</td>



                  </tr>
              </tbody>
          </table>
           </div>
         </div>
  </section>
     </div>
    </div>
</template>
<script>
import  AdminSidebar  from  "../../SupperAdminSideBar.vue";
import  AdminHeader  from  "../../adminHeader.vue";
export default{
  data(){
  return{
      feedBackList:[]
    }
  },
  components:{
      'appAdminSidebar': AdminSidebar,
     'appAdminHeader': AdminHeader,

 },
    mounted: function(){
      this.getFeedBack();
    },
    methods:{
      convertUtcToLocaDateTime(date){
       var moment = require('moment-timezone');
       var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // console.log("convertStringtoDate------------------------>"+date)
       return moment(date).tz(timeZone).format('DD-MMM-YYYY HH:mm:ss')
      },
      getFeedBack: function(){
           var app = this;
           app.$store.commit('setSpinner',true);
           app.$http.get(
                  app.$store.state.SERVER_URL+'/admin/get-all-users-feedbacks',
                 {
                   headers: {
                     "X-Authorization": app.$cookie.get('X-Authorization')
                   },
               }
          ).then(function(response) {
            app.$store.commit('setSpinner',false);
            console.log("feedback----------",response.data.payLoad);
            app.feedBackList = response.data.payLoad;
              });

        },
      }

}
</script>
