<template>
<div>
  <section class="content">
    <!-- add button for the PM -->
    <div class="col-md-12 pull-right">
<div class="col-md-10 ">
<!-- <div class="center"><button data-toggle="modal" data-target="#squarespaceModal" class="btn btn-primary center-block">Click Me</button></div> -->
<!-- <div class="center"><button data-toggle="modal" data-target="#squarespaceModal" class="btn btn-primary center-block">Click Me</button></div> -->
<!-- <button type="button" class="btn btn-orange btn-lg" data-toggle="modal" @click="addDeveloprModal()">Add developer</button> -->
</div>


      <div class="col-md-2 ">
        <div id="custom-search-input" class="margin-bottom-xternal">
          <div class="input-group">
            <input type="text" class="form-control input-sm" placeholder="Search" />
            <span class="input-group-btn">
              <button class="btn btn-info btn-lg" type="button">
                <i class="fa fa-search"></i>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>



      <form>
           <table class="table table-hover platform-table-color price-table table-uat-th-alignment">
            <tbody>
                <tr >

                    <th>Dev ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                    <th>Skill Set</th>
                    <!-- <th>Type</th> -->
                    <!-- <th>Verification Status</th> -->
                    <th>Verification Status</th>
                    <th>Status</th>
                    <!-- <th>Edit </th> -->
                    <th>Profile</th>
                    <th>Actions </th>

                </tr>
                <tr v-for="(developer,index) in developerList">

                    <td>{{developer.developerId}}</td>
                    <td>{{developer.firstName}}  {{developer.lastName}}</td>
                    <td>{{developer.email}} <strong v-if="developer.isEmailVerified"><i class="fa fa-check-square master-agremnt" aria-hidden="true"></i></strong>
										<strong v-if="!developer.isEmailVerified"><i class="fa fa-times admin_unassign" aria-hidden="true"></i></strong></td>
                    <td>{{developer.mobileNumber}} <strong v-if="developer.isMobileVerified"><i class="fa fa-check-square master-agremnt" aria-hidden="true"></i></strong>
										<strong v-if="!developer.isMobileVerified"><i class="fa fa-times admin_unassign" aria-hidden="true"></i></strong></td>
                    <td>
                      <p v-for="skill in developer.developerSkillInfos">{{skill.skillName}}</p>

                    </td>
                    <!-- <td>
                      <span v-if="developer.developerType=='EXTERNAL'">
                        External
                      </span>
                      <span v-else>
                        Internal
                      </span>

                    </td> -->
                    <!-- <td>Verification</td> -->
                    <td>
                      {{getStatus(developer.developerRegistrationStatus)}}
                    </td>

                    <td>
                      <span v-if="developer.isAppUserActive">
                          <button type="button" data-toggle="modal" class="btn btn-orange-admin-assing btn-lg" @click="activeOwner(developer,index)">Active</button>

                      </span>
                      <span v-else>
                                 <button type="button" data-toggle="modal" class="btn btn-orange-admin-assing btn-lg" @click="rejectOwner(developer,index)">Suspend</button>

                      </span>
                    </td>

                    <!-- <td>
                         <span v-if="developer.developerType=='INTERNAL'">
                             <a class="edit-dev-link" @click="editDeveloper(developer,index)">Edit</a>
                    </span>


                    </td> -->
                    <td>
                      <router-link :to="'/admin/developer-profile/'+developer.developerId" class="edit-dev-link">details</router-link>
                    </td>


                   <td>
                      <div class="form-group" v-if="developer.developerRegistrationStatus!='DRAFT'">
                          <button type="button" class="btn btn-orange-admin-assing btn-lg" @click="approvedDeveloper(developer,index)" v-if="developer.developerRegistrationStatus!='APPROVED'">Approve</button>
                          <button type="button" class="btn btn-orange-admin-assing btn-lg" @click="rejectDeveloper(developer,index)" v-if="developer.developerRegistrationStatus!='REJECTED'">Reject</button>
                      </div>
                   </td>

                </tr>
            </tbody>
        </table>
       <!-- table data for the pm list -->
     </form>
    </section>
   </div>

</template>

<script>
      import  AdminSidebar  from  "../../SupperAdminSideBar.vue";
        import  AdminHeader  from  "../../adminHeader.vue";




    export default{
        data(){
            return{
              developerList:[],
                   skillList:'',
                   dummyObject:{},
                   activeName:'Internal',


            }


        },
         components:{
             'appAdminSidebar': AdminSidebar,
            'appAdminHeader': AdminHeader,
          },

        mounted:function(){
           this.getDevelopers();

        },
        methods: {
          handleClick(index,name){

          },
          getDevelopers: function(){
                console.log("developer coll  are----------------------------------------");
                var app = this;
                //as Internal Developers Tab (component) is shown first, spinner need not be fiddled with by this, external developers page
                //app.$store.commit('setSpinner',true);
                app.$http.get(
                        this.$store.state.SERVER_URL+'/admin/get-all-external-developers',
                       {
                         headers: {
                           "X-Authorization": app.$cookie.get('X-Authorization')
                         },
                     }
                ).then(function(response) {
                  //app.$store.commit('setSpinner',false);
                    console.log(response);
                    console.log("developer payload are----------------");
                    console.log(response.data.payLoad);
                    app.developerList = response.data.payLoad; // assigning dat to the PM table
                    console.log(  app.developerList );
                });
        },
        approvedDeveloper : function(developer,index){
          var app = this;
          app.$swal({
          title: 'Approve Developer',
          text: "This will allow his allocation to the projects.",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
          }).then(function () {
            app.$http.post(app.$store.state.SERVER_URL + '/admin/approve-developer/'+developer.developerId, app.dummyObject,
                    {

                         headers: {
                                "X-Authorization": app.$cookie.get('X-Authorization')

                            },

                    }).then((response) => {
                      //app.developerList[index] = response.data.payLoad;

                     app.developerList.splice(index,1,response.data.payLoad);
                      //  app.developerList.unshift(response.data.payLoad);
                  //  app.developerList[index]=   app.getDevelopers();

                }, (response) => {
              });
          })
      },
        rejectDeveloper: function(developer,index){
          var app = this;
          app.$swal({
          title: 'Reject Developer',
          text: "On rejection, this developer profile will be filtered out while project allocation.",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
          }).then(function () {
          app.$http.post(app.$store.state.SERVER_URL + '/admin/reject-developer/'+developer.developerId, app.dummyObject,
                  {
                       headers: {
                              "X-Authorization": app.$cookie.get('X-Authorization')
                          },
                }).then((response) => {
                          console.log("response.playLoad"+index);
                          //  app.developerList[index] = response.data.payLoad;

                          app.developerList.splice(index,1,response.data.payLoad);
                          //app.developerList[index].response.data.payLoad;
                          //app.developerList[index]=  app.getDevelopers();
              }, (response) => {
                console.log("exception------"+response.data);
            });
            })
        },
        getStatus : function(status){
          if(status === 'DRAFT'){
            return 'Draft';

          }else if(status ==='PENDING_APPROVAL'){
            return 'PendingApproval';

          }else if (status === 'APPROVED'){
              return 'Approved';

        } else if (status == 'REJECTED'){
          return "rejected";

        }
      },

      activeOwner(developer,index){
        var app = this;
        app.$swal({
        title: 'Are your Sure?',
        text: "You want to Suspend the developer",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
        }).then(function () {
             app.developerActiveDeactive(developer,index);
        })

      },

    rejectOwner(developer,index){
      var app = this;
      app.$swal({
      title: 'Are your Sure?',
      text: "You want to Active the developer",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
      }).then(function () {
           app.  developerActiveDeactive(developer,index);
      })

    },
    developerActiveDeactive(developer,index){
      var app = this;
      console.log(developer);
        app.$http.post(app.$store.state.SERVER_URL + '/admin/activate-or-deactivate-developer/'+developer.developerId, app.dummyObject,
         {
              headers: {
                     "X-Authorization": app.$cookie.get('X-Authorization')

                 },

         }).then((response) => {
           console.log('---------response is --------------');
           console.log(response.data.payLoad);
           if(response.data.status === "SUCCESS"){
               app.developerList.splice(index,1,response.data.payLoad);
            //  app.productOwnerList.splice(index,1,response.data.payLoad);
           }else{

           }

     }, (response) => {

   });

    }

      }
    }
</script>
