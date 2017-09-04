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
        <!-- add button for the PM -->
              <div class="row">
                    <!-- <div class="col-md-6 margin-bottom-10 ">
                        <button type="button" class="btn btn-orange btn-lg" data-toggle="modal"  @click="clearModalData" >Add PM</button>
                    </div> -->
                </div>
          <!-- add button for the PM -->

          <!-- table data for the pm list -->
               <table class="table table-hover platform-table-color price-table">
                <tbody>
                    <tr>
                        <!--<th>PM ID</th>-->
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Contact No.</th>
                        <th>Status/Action</th>

                    </tr>
                    <tr class="text-left" v-for="(po,index) in productOwnerList">
                        <td>
                          <router-link :to="'/admin/product-owner-profile/'+po.appUser.id">{{po.appUser.firstName}} {{po.appUser.lastName}}</router-link>
                        </td>
                        <td>{{po.appUser.email}}</td>
                        <td>{{po.appUser.internationalCallingCode + po.appUser.mobileNumber}}</td>
                        <td v-if="po.appUser.isActive">
                          <button type="button" data-toggle="modal" class="btn btn-orange-admin-assing btn-lg" @click="activeOwner(po,index)">Active</button>

                        </td>
                         <td v-else>
                             <button type="button" data-toggle="modal" class="btn btn-orange-admin-assing btn-lg" @click="rejectOwner(po,index)">Suspend</button>
                         </td>

                    </tr>
                </tbody>
            </table>

        </section>
        </div>



      </div>

    </div>
</template>

<script>
      import  AdminSidebar  from  "../../SupperAdminSideBar.vue";
        import  AdminHeader  from  "../../adminHeader.vue";


    export default{
        data(){
            return{
                showPm:true,
                showStatus:false,
                profile:{
                'firstName':'',
                'lastName':'',
                'email':'',
                'password':'',
                'mobileNumber':'',
                'isActive':'',
                 appUserId:'',
                 internationalCallingCode:'',
                },
                 productOwnerList:[],
                 dummyObject:''
                //countryIsoCode:'',
                //country:'',
               // countryList:[]
            }
        },
        created:function(){
          // /admin/deactivate-po/

        },
        mounted:function(){
            var app = this;
              app.$store.commit('setSpinner',true);
            app.$http.get(

                    app.$store.state.SERVER_URL+'/admin/get-all-po',
                   {
                     headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')
                     },
                 }
            ).then(function(response) {
                console.log(response);
                  app.$store.commit('setSpinner',false);
                app.productOwnerList = response.data.payLoad; // assigning dat to the PM table
                console.log(app.productOwnerList)
            });
        },
        components:{
             'appAdminSidebar': AdminSidebar,
            'appAdminHeader': AdminHeader

        },
        methods:{


          activeOwner(projectOwner,index){
            var app = this;
            app.$swal({
            title: 'Are your Sure?',
            text: "You want to Suspend Project Owner",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
            }).then(function () {
                 app.  projectOwnerActiveDeactive(projectOwner,index);
            })

          },

        rejectOwner(projectOwner,index){
          var app = this;
          app.$swal({
          title: 'Are your Sure?',
          text: "You want to Active Project Owner",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
          }).then(function () {
               app.  projectOwnerActiveDeactive(projectOwner,index);
          })

        },
          projectOwnerActiveDeactive(projectOwner,index){
                 console.log(projectOwner);
                 var app = this;

            app.$http.post(app.$store.state.SERVER_URL + '/admin/activate-or-deactivate-po/'+projectOwner.id, app.dummyObject,
                    {
                         headers: {
                                "X-Authorization": app.$cookie.get('X-Authorization')

                            },

                    }).then((response) => {
                      console.log('---------response is --------------');
                      console.log(response.data.payLoad);
                      if(response.data.status === "SUCCESS"){
                        app.productOwnerList.splice(index,1,response.data.payLoad);
                      }else{

                      }




                }, (response) => {
              });

          }

    }
    }

</script>
<style scoped>
.price-table th {
    text-align: left;
}
.content-wrapper {
    margin-bottom: 7px;
}
</style>
