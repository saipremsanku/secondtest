<template>
    <div class="wrapper">
      <!-- Main Header -->
  <app-admin-sidebar></app-admin-sidebar>
      <app-admin-header></app-admin-header>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
      <section class="content">
        <!-- add button for the PM -->
              <div class="row">
                    <div class="col-md-6 margin-bottom-10 ">
                        <button type="button" class="btn btn-orange btn-lg" data-toggle="modal"   @click="addCoupn()">Add Coupon</button>
                    </div>
                </div>
          <!-- add button for the PM -->

          <!-- table data for the pm list -->
               <table class="table table-hover platform-table-color price-table">
                <tbody>
                    <tr >

                        <th>Coupon Name</th>
                        <th> Coupon Type</th>
                        <th>expiry date</th>
                        <th>Status</th>
                        <!-- <th>Action</th> -->
                    </tr>
                    <tr class="text-center" v-for="(coupon,index) in couponList">

                        <td>{{coupon.couponName}}</td>
                        <td>
                          <span v-if="coupon.couponType=='PRODUCT_OWNER_SIGNUP'">
                             Product Owner SignUp
                        </span>
                        <span v-if="coupon.couponType=='DEVELOPER_SIGNUP'">
                          Developer SignUp
                        </span>
                        </td>
                        <td>{{convertUtcToLocaDateTime(coupon.couponExpiryDateInMillis)}}</td>
                        <td>

                          <span v-if="coupon.isCouponActive">
                            Active
                          </span>
                          <span v-else>
                            Inactive
                          </span>

                        </td>
                       <!-- <td>
                           <div class="editStory">
                           <ul class="list-group storyList">
                                <li class="list-group-item trasparent-bg"><a type="button"  class="cursor-pointer" ><i class="fa fa-pencil " aria-hidden="true"  @click="editCoupon(coupon,index)"></i></a></li>
                                <li class="list-group-item trasparent-bg"><a type="button"  class="cursor-pointer"  ><i class="fa fa-trash-o trasparent-bg" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                         </td> -->
                    </tr>
                </tbody>
            </table>
           <!-- table data for the pm list -->

        </section>
        </div>

       <!--  <app-footer></app-footer>-->



        <!-- add Coupan  Modal  -->




        <div class="modal fade" id="couponModel" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
         <div class="modal-dialog" role="document">
           <div class="modal-content">
             <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal">&times;</button>
               <div class="alert alert-danger error-color" v-if="isError">
                 {{errorMessage}}
                 </div>
               <h4 class="modal-title">Add New Coupon</h4>
             </div>
             <div class="modal-body">
                 <form id="PMForm" @submit.prevent="submitCouponForm">
                       <div class="form-group" :class="{'input': true, 'is-danger': errors.has('couponName') }">
                         <input type="text" class="form-control "  name="couponName" v-model="coupon.couponName" placeholder=" coupon Name" v-validate data-vv-rules="required">
                             <p class="text-danger" v-if="errors.has('couponName')">Please enter coupon name</p>
                       </div>
                       <div class="form-group" :class="{'input': true, 'is-danger': errors.has('couponExpiryDate') }">
                         <datepicker class="form-control " :format="format" placeholder="DD/YY/MMMM" name="couponExpiryDate" v-model="coupon.couponExpiryDate" v-validate data-vv-rules="required"></datepicker>
                           <p class="text-danger" v-if="errors.has('couponExpiryDate')">Please enter expairy date</p>
                       </div>

                       <div class="form-group" :class="{'select': true, 'is-danger': errors.has('couponType') }">
                           <select class="form-control" name="couponType" v-model="coupon.couponType" v-validate data-vv-rules="required">
                               <option disabled value="" >Select coupon type </option>
                                 <option value="PRODUCT_OWNER_SIGNUP">Project Owner </option>
                                 <option value="DEVELOPER_SIGNUP">Developer</option>
                         </select>
                           <p class="text-danger" v-if="errors.has('couponType')">Please select coupon type</p>
                      </div>

                     <div class="form-group">
                         <label class="radio-inline"><input type="radio" name="coupon.isCouponActive" value="true" v-model="coupon.isCouponActive">Active</label>
                         <label class="radio-inline"><input type="radio" name="coupon.isCouponActive" value="false" v-model="coupon.isCouponActive">Inactive</label>
                       </div>

                             <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                             <button type="submit" class="btn btn-orange" >ADD</button>

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
    import Datepicker from 'vuejs-datepicker';

    export default{
        data(){
            return{
              format:'dd/MMM/yyyy',
                coupon:{
                'couponName':'',
                'couponExpiryDate':'',
                'isCouponActive':'',
                couponType:'',
                index:''
                },
                 couponList:[],
                 isError:false,
                 errorMessage:''

            }
        },
         components:{
             'appAdminSidebar': AdminSidebar,
            'appAdminHeader': AdminHeader,
             Datepicker,

        },
        mounted:function(){
            var app = this;
            app.$store.commit('setSpinner',true);
            app.$http.get(
                    this.$store.state.SERVER_URL+'/admin/get-all-coupons',
                   {
                     headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')
                     },
                 }
            ).then(function(response) {
                console.log(response);
                app.$store.commit('setSpinner',false);
                app.couponList= response.data.payLoad; // assigning dat to the PM table
                console.log(app.couponList);
            });
            
        },

        methods:{

          convertUtcToLocaDateTime(date){
           var moment = require('moment-timezone');
           var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          // console.log("convertStringtoDate------------------------>"+date)
           return moment(date).tz(timeZone).format('DD/MMM/YYYY')
          },
          addCoupn(){
            this.coupon={};
            this.coupon.couponType='',
            setTimeout(() => {
             this.errors.clear();
               }, 100);
            $('#couponModel').modal('show');
          },
          editCoupon(copun,index){
            console.log(copun);
          this.coupon = copun;
          this.index = index;
        $('#couponModel').modal('show');

          },
            submitCouponForm: function(e){
                    //form submission
                    e.preventDefault();
                    var app = this;
                  app.$validator.validateAll();
                if (!app.errors.any()) {
                    console.log(app.coupon);
                    app.coupon.couponExpiryDate = moment(app.coupon.couponExpiryDate).format('YYYY-MM-DD');
                    console.log(app.coupon.couponExpiryDate);
            app.$http.post(
                app.$store.state.SERVER_URL+'/admin/add-coupon',
                app.coupon,
                {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')

                        },

                }

               ).then(function (response) {
                console.log(response.data);
                if(response.data.status=="SUCCESS"){
                  if(app.coupon.couponId!=null || app.coupon.couponId!=''){
                      app.couponList.splice(app.index,1,response.data.payLoad);
                  }else{
                     app.couponList.push(response.data.payLoad);
                  }
                    $('#couponModel').modal('hide');
                    console.log('response ----------are------------------');
                      console.log(app.coupon.couponExpiryDate);
                    app.coupon={};
                    setTimeout(() => {

                     app.errors.clear();
                   }, 10);


                   }else{
                          app.errorMessage = response.data.errorMessage;
                            app.isError=true;
                              setTimeout(function () {
                                  app.isError=false;
                                  }, 3000)

                                  }


            }, function (response) {
              app.errorMessage = 'Something went wrong'
              app.isError=true;
              setTimeout(function () {
              app.isError=false;
            }, 3000)
                console.log('Error!:', response.data);

            });
                }

            },
        }
    }
</script>
