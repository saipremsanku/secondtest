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
                        <button type="button" class="btn btn-orange btn-lg" data-toggle="modal"  @click="clearModalData" >Add FinanceManager</button>
                    </div>
                </div>

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
                    <tr v-for="(fm,index) in financeManagerList">
                       <!-- <td></td>-->
                        <td>{{fm.firstName}} {{fm.lastName}}</td>
                        <td>{{fm.email}}</td>
                        <td>{{fm.internationalCallingCode + fm.mobileNumber}}</td>
                        <td v-if="fm.isAppUserActive">Active</td>
                         <td v-else>Suspend</td>
                       <td>
                           <div class="editStory">
                           <ul class="list-group storyList">
                                <li class="list-group-item trasparent-bg"><a type="button"  class="cursor-pointer" ><i class="fa fa-pencil " aria-hidden="true" @click="editFm(fm,index)"></i></a></li>
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

         <div class="modal fade" id="FMModel" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <div class="alert alert-danger error-color" v-if="isError">
                  {{errorMessage}}
                  </div>
                <h4 class="modal-title" v-if="showFm">Add New FinanceManager</h4>
                <h4 class="modal-title" v-else>Edit FinanceManager</h4>
              </div>
              <div class="modal-body">


                  <form id="FMForm" @submit.prevent="submitFMForm">
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

                        <div class="form-group" :class="{'input': true, 'is-danger': errors.has('password') }" v-if="showFm">
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
                              <button type="submit" class="btn btn-orange" v-if="showFm" :disabled="ennableButton">ADD</button>
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
                showFm:true,
                ennableButton:false,
                'firstName':'',
                'lastName':'',
                'email':'',
                'password':'',
                'mobileNumber':'',
                'isAppUserActive':true,
                 financeUserId:'',
                 internationalCallingCode:'',

                 financeManagerList:[],
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
            // app.$store.commit('setSpinner',true);
            app.$http.get(
                    app.$store.state.SERVER_URL+'/admin/get-finance-users',
                   {
                     headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')
                     },
                 }
            ).then(function(response) {
                console.log(response);
                // app.$store.commit('setSpinner',false);
                app.financeManagerList = response.data.payLoad; // assigning dat to the PM table
                console.log(app.financeManagerList)
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
                  app.financeUserId = '';
                  app.internationalCallingCode = '';
                  app.isAppUserActive=true;
                  app.showFm = true;
                   setTimeout(() => {
                    app.errors.clear();
                  }, 100);
                  $('#FMModel').modal('show');
            },

            editFm(editFm,index){
                var app = this;
                app.firstName = '';
                app.lastName = '';
                app.email = '';
                app.password = '';
                app.mobileNumber = '';
                app.isAppUserActive = '';
                app.financeUserId = '';
                app.internationalCallingCode = '';
                app.isAppUserActive=true;
                app.showFm = false;
                //$(".selected-dial-code").text('')
                app.setCountryData(editFm);
                app.firstName = editFm.firstName;
                app.lastName = editFm.lastName;
                app.email = editFm.email;
              //  app.password = editFm.password;
                app.isAppUserActive = editFm.isAppUserActive;
                app.financeUserId = editFm.financeUserId;
                app.internationalCallingCode = editFm.internationalCallingCode;
                app.mobileNumber = editFm.mobileNumber;
                app.isAppUserActive = editFm.isAppUserActive;;
                app.index = index;
                 app.errors.clear();
                 $('#FMModel').modal('show');
            },



            submitFMForm: function(e){
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
                    profile.financeUserId = app.financeUserId;
                    profile.internationalCallingCode = $(".selected-dial-code").text();
                    profile.iso2 = $(".country[class*='highlight']").attr("data-country-code");
                    console.log(profile)
                    app.ennableButton=true;
                    // app.$store.commit('setSpinner',true);
                    app.$http.post(
                        app.$store.state.SERVER_URL+'/admin/save-finance-user',
                        profile,
                        {
                          headers: {
                                "X-Authorization": app.$cookie.get('X-Authorization')
                        }
                        }
                        ).then(function(response) {
                             console.log('---save finace-manager---',response.data.payLoad);
                             console.log('SUCCESS------',response.data.status);
                             app.ennableButton=false;
                         if(response.data.status === "SUCCESS"){

                           if(app.financeUserId!=null && app.financeUserId !=''){
                             app.financeManagerList.splice(app.index,1,response.data.payLoad);
                           }else{
                            //  console.log("fm---===--0---------",response.data.errorMessage);
                              app.financeManagerList.push(response.data.payLoad);
                           }
                             $('#FMModel').modal('hide');
                         }
                         else{
                              app.errorMessage = response.data.errorMessage;
                              app.isError=true;
                              setTimeout(function () {
                              app.isError=false;
                            }, 3000)
                         }
                          // app.$store.commit('setSpinner',false);
                     });
            }
        },

           setCountryData(editFm){
             var app = this;
             setTimeout(()=>{
               $(".selected-flag .iti-flag").attr('class', '');
               $(".selected-flag div:nth-child(1)").attr('class', 'iti-flag '+editFm.iso2);
               $(".selected-flag div:nth-child(2)").attr('class', 'selected-dial-code').text(editFm.internationalCallingCode);
               $('.country').removeClass('highlight active');
               $('*[data-country-code='+editFm.iso2+']').addClass('highlight active');
             },1)
           },
    }
    }

</script>
