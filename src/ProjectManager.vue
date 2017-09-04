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
                    <div class="col-md-6 margin-bottom-10 ">
                        <button type="button" class="btn btn-orange btn-lg" data-toggle="modal"  @click="clearModalData" >Add CEO</button>
                    </div>
                </div>
          <!-- add button for the PM -->

          <!-- table data for the pm list -->
               <table class="table table-hover platform-table-color price-table table-uat-th-alignment">
                <tbody>
                    <tr >
                        <!--<th>PM ID</th>-->
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Contact No.</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    <tr v-for="(pm,index) in projectMangerList">
                       <!-- <td></td>-->
                        <td>{{pm.firstName}} {{pm.lastName}}</td>
                        <td>{{pm.email}}</td>
                        <td>{{pm.internationalCallingCode + pm.mobileNumber}}</td>
                        <td v-if="pm.isAppUserActive">Active</td>
                         <td v-else>Suspend</td>
                       <td>
                           <div class="editStory">
                           <ul class="list-group storyList">
                                <li class="list-group-item trasparent-bg"><a type="button"  class="cursor-pointer" ><i class="fa fa-pencil " aria-hidden="true" @click="editPm(pm,index)"></i></a></li>
                                <!--<li class="list-group-item trasparent-bg"><a type="button"  class="cursor-pointer"  ><i class="fa fa-trash-o trasparent-bg" aria-hidden="true"></i> </a></li>-->
                                </ul>
                            </div>
                       </td>
                    </tr>
                </tbody>
            </table>
           <!-- table data for the pm list -->

        </section>
        </div>

     <!--    <app-footer></app-footer>-->









        <!-- add PM  Modal  -->





         <div class="modal fade" id="PMModel" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <div class="alert alert-danger error-color" v-if="isError">
                  {{errorMessage}}
                  </div>
                <h4 class="modal-title" v-if="showPm">Add New  CEO</h4>
                <h4 class="modal-title" v-else>Edit CEO</h4>
              </div>
              <div class="modal-body">


                  <form id="PMForm" @submit.prevent="submitPMForm">
                        <div class="form-group" :class="{'input': true, 'is-danger': errors.has('firstName') }">
                          <input type="text" class="form-control " id="firstName" name="firstName" v-model="firstName" placeholder="First Name" v-validate data-vv-rules ="required">
                              <p class="text-danger" v-if="errors.has('firstName')">Please enter your first name</p>
                        </div>

                        <div class="form-group" :class="{'input': true, 'is-danger': errors.has('lastName') }">
                          <input type="text" class="form-control " id="lastName" name="lastName" v-model="lastName" placeholder="Last Name" v-validate data-vv-rules ="required">
                              <p class="text-danger" v-if="errors.has('lastName')">Please enter your last name</p>
                        </div>

                        <div class="form-group" :class="{'input': true, 'is-danger': errors.has('email') }">
                          <input type="email" class="form-control " id="email" name="email" v-model="email" placeholder="Email" v-validate data-vv-rules ="required|email">
                              <p class="text-danger" v-if="errors.has('email')">Please enter email </p>
                        </div>

                        <div class="form-group" :class="{'input': true, 'is-danger': errors.has('password') }" v-if="showPm">
                          <input type="password" class="form-control " id="passwordic" name="password" v-model="password" placeholder="Password" v-validate:password ="'required|min:8'">
                              <p class="text-danger" v-if="errors.has('password')">Please enter a password</p>
                        </div>

                        <div class="form-group" :class="{'input': true, 'is-danger': errors.has('mobileNumber') }">
                          <input id="phone"   class="form-control" name="mobileNumber" v-model="mobileNumber" type="tel"  v-validate data-vv-rules ="required|numeric"/>
                            <p class="text-danger" v-if="errors.has('mobileNumber')">Please enter your contact no.</p>
                        </div>

                         <div class="form-group" :class="{'select': true, 'is-danger': errors.has('isAppUserActive') }">
                           <select class="form-control ctryLst" v-model="isAppUserActive"  name="isAppUserActive" v-validate data-vv-rules ="required">
                                    <option  value="true">Active</option>
                                    <option  value="false" >Suspend</option>
                             </select>
                               <!-- <p class="text-danger" v-if="errors.has('isAppUserActive')">Please Select CEO Status</p> -->
                         </div>


                              <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                              <button type="submit" class="btn btn-orange" v-if="showPm" :disabled="ennableButton">ADD</button>
                               <button type="submit" class="btn btn-orange" v-else :disabled="ennableButton">Update</button>

                  </form>
              </div>
            </div>
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
                showPm:true,
                ennableButton:false,
                'firstName':'',
                'lastName':'',
                'email':'',
                'password':'',
                'mobileNumber':'',
                'isAppUserActive':true,
                 projectManagerId:'',
                 internationalCallingCode:'',

                 projectMangerList:[],
                 isError:false,
                 errorMessage:'',
                 index:''

            }
        },
        created:function(){
          $.getScript('/src/assets/js/intlTelInput.js');
          $.getScript('/src/assets/js/country.js');
        },
        mounted:function(){
            var app = this;
            app.$store.commit('setSpinner',true);
            app.$http.get(
                    app.$store.state.SERVER_URL+'/admin/get-all-pm',
                   {
                     headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')
                     },
                 }
            ).then(function(response) {
                console.log(response);
                app.$store.commit('setSpinner',false);
                app.projectMangerList = response.data.payLoad; // assigning dat to the PM table
                console.log(app.projectMangerList)
            });
        },
        components:{
             'appAdminSidebar': AdminSidebar,
            'appAdminHeader': AdminHeader,
            'appFooter': Footer
        },
        methods:{

            clearModalData(){
                  var app = this;
                  app.firstName = '';
                  app.lastName = '';
                  app.email = '';
                  app.password = '';
                  app.mobileNumber = '';
                  app.isAppUserActive = '';
                  app.projectManagerId = '';
                  app.internationalCallingCode = '';
                  app.isAppUserActive=true;
                  app.showPm = true;
                   setTimeout(() => {
                    app.errors.clear();
                  }, 100);
                  $('#PMModel').modal('show');
            },

            editPm(editPm,index){
                var app = this;
                app.firstName = '';
                app.lastName = '';
                app.email = '';
                app.password = '';
                app.mobileNumber = '';
                app.isAppUserActive = '';
                app.projectManagerId = '';
                app.internationalCallingCode = '';
                app.isAppUserActive=true;
                app.showPm = false;
                //$(".selected-dial-code").text('')
                app.setCountryData(editPm);
                app.firstName = editPm.firstName;
                app.lastName = editPm.lastName;
                app.email = editPm.email;
              //  app.password = editPm.password;
                app.isAppUserActive = editPm.isAppUserActive;
                app.projectManagerId = editPm.projectManagerId;
                app.internationalCallingCode = editPm.internationalCallingCode;
                app.mobileNumber = editPm.mobileNumber;
                app.isAppUserActive = editPm.isAppUserActive;;
                app.index = index;

                // $('#PMModel').find('textarea,input,select').val('');
                 app.errors.clear();
                 $('#PMModel').modal('show');
            },



            submitPMForm: function(e){
                  e.preventDefault();
                  var app = this;
                app.$validator.validateAll();
                if (!app.errors.any()) {

                    var profile = {};
                    profile.firstName = app.firstName;
                    profile.lastName = app.lastName;
                    profile.email = app.email;
                    profile.password = app.password;
                    profile.mobileNumber = app.mobileNumber;
                    profile.isAppUserActive = app.isAppUserActive;
                    profile.projectManagerId = app.projectManagerId;
                    profile.internationalCallingCode = $(".selected-dial-code").text();
                    profile.iso2 = $(".country[class*='highlight']").attr("data-country-code");
                    console.log(profile)
                    app.ennableButton=true;
                    app.$store.commit('setSpinner',true);
                    app.$http.post(
                        app.$store.state.SERVER_URL+'/admin/save-project-manager',
                        profile,
                        {
                          headers: {
                                "X-Authorization": app.$cookie.get('X-Authorization')
                        }
                        }
                        ).then(function(response) {
                             console.log(response);
                             app.ennableButton=false;
                         if(response.data.status === "SUCCESS"){
                           if(app.projectManagerId!=null || app.projectManagerId !=''){
                             app.projectMangerList.splice(app.index,1,response.data.payLoad);
                           }else{
                              app.projectMangerList.unshift(response.data.payLoad);
                           }
                             $('#PMModel').modal('hide');
                         }
                         else{
                              app.errorMessage = response.data.errorMessage;
                              app.isError=true;
                              setTimeout(function () {
                              app.isError=false;
                            }, 3000)
                         }
                          app.$store.commit('setSpinner',false);
                     });
            }
        },

           setCountryData(editPm){
             var app = this;
             setTimeout(()=>{
               $(".selected-flag .iti-flag").attr('class', '');
               $(".selected-flag div:nth-child(1)").attr('class', 'iti-flag '+editPm.iso2);
               $(".selected-flag div:nth-child(2)").attr('class', 'selected-dial-code').text(editPm.internationalCallingCode);
               $('.country').removeClass('highlight active');
               $('*[data-country-code='+editPm.iso2+']').addClass('highlight active');
             },1)
           },
    }
    }

</script>
