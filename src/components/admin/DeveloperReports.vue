<template>
<div>
  <div class="wrapper">
    <link rel="stylesheet" href="/src/assets/css/intlTelInput.css">
   <link rel="stylesheet" href="/src/assets/css/demo.css">
    <!-- Main Header -->
<app-admin-sidebar></app-admin-sidebar>
    <app-admin-header></app-admin-header>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper productBacklog_Block">
  <section class="content">
    <div class="row rep-margin">
    <div class="col-md-2 pull-left report-table">

                <datepicker :disabled="state.disabled" placeholder="DD/MMM/YYYY" v-model="fromDate" name="fromDate" @selected="getDevelopersList()" class="form-control pull-left"></datepicker>

    </div>
  </div>
         <form>
           <table class="table table-hover platform-table-color price-table table-uat-th-alignment data_table">
          <thead>
                <tr>
                    <th>S.No</th>
                    <th> Developer Name</th>
                    <th class="bg-info">#Task(WIP)</th>
                    <th class="bg-info">#Hours(WIP)</th>
                    <th class="bg-warning">#Task(Comp By Dev)</th>
                    <th class="bg-warning">#Hours(Comp By Dev)</th>
                    <th class="bg-success">#Task(Approved By Ceo)</th>
                    <th class="bg-success">#Hours(Approved By Ceo)</th>

                </tr>
              </thead>

                <tbody class="text-center">

                  <tr v-for="(developer,index) in developerList">
                      <td>{{iterateRowNum(index)}}</td>
                      <td>{{developer.devName}}</td>
                      <td class="bg-info">{{developer.noOfWIPTask}}</td>
                      <td class="bg-info">{{developer.noOfWIPHours}}</td>
                      <td class="bg-warning">{{developer.noOfCompletedTask}}</td>
                      <td class="bg-warning">{{developer.noOfCompletedHours}}</td>
                      <td class="bg-success">{{developer.noOfApprovedTask}}</td>
                      <td class="bg-success">{{developer.noOfApprovedHours}}</td>
                  </tr>

            </tbody>
        </table>
     </form>
    </section>
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
              fromDate:'',
              dataTable:'',
              state: {
                disabled: {
                  to: null,
                  from: new Date(),
                  days: [],
                  dates: [
                  ]
                }
              },
                  developerList:[],
                   appUser:'',

                   index:'',
                   date:'',
                  //  dev:{
                  //     date:'',
                  //  },

                   startCount:1,
            }


        },
         components:{
             'appAdminSidebar': AdminSidebar,
            'appAdminHeader': AdminHeader,
            Datepicker
          },

        mounted:function(){


      this.dataTable = $('.data_table').DataTable({

        "aLengthMenu": [[25, 50, 75, 100], [25, 50, 75,100]],
            "iDisplayLength": 25,
        "language": {
             "lengthMenu": "Display _MENU_",
             "zeroRecords": "Nothing found - sorry",
             "info": "Showing page _PAGE_ of _PAGES_",
             "infoEmpty": "No records available",
             "infoFiltered": "(filtered from _MAX_ total records)"
         }

      });



           this.getDevelopers();
        },
        methods: {
          iterateRowNum(index){
            return (this.startCount+index);
          },
          getDevelopers: function(){


            var table = $('.data_table').DataTable();
            table.destroy();

                var app = this;
                app.$store.commit('setSpinner', true);
                app.$http.get(
                        this.$store.state.SERVER_URL+'/admin/get-daily-developer-report',
                       {
                         headers: {
                           "X-Authorization": app.$cookie.get('X-Authorization')
                         },
                     }
                ).then(function(response) {
                  app.$store.commit('setSpinner', false);
                    app.developerList = response.data.payLoad;

                    app.$nextTick(() => {

                    app.dataTable = $('.data_table').DataTable({

                      "aLengthMenu": [[25, 50, 75, 100], [25, 50, 75,100]],
                          "iDisplayLength": 25,
                      "language": {
                           "lengthMenu": "Display _MENU_",
                           "zeroRecords": "Nothing found - sorry",
                           "info": "Showing page _PAGE_ of _PAGES_",
                           "infoEmpty": "No records available",
                           "infoFiltered": "(filtered from _MAX_ total records)"
                       }

                    });
                  })




                });
        },
        getDevelopersList: function(){
          setTimeout(() => {
              var app = this;
              app.$store.commit('setSpinner', true);
            var milisecond = app.fromDate.getTime();
              app.$http.get(
                      this.$store.state.SERVER_URL+'/admin/get-daily-developer-report-date/'+milisecond,

                     {
                       headers: {
                         "X-Authorization": app.$cookie.get('X-Authorization')
                       },
                   }
              ).then(function(response) {
                app.$store.commit('setSpinner', false);
                   app.developerList=response.data.payLoad;
              });

                 }, 100);
      },
      }
    }
</script>
<style scoped>
.content {
    /*margin-bottom: 35px;*/

}
</style>
