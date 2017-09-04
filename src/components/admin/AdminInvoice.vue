<template>
    <div class="wrapper">
      <link rel="stylesheet" href="/src/assets/css/intlTelInput.css">
     <link rel="stylesheet" href="/src/assets/css/demo.css">
      <!-- Main Header -->
    <app-admin-sidebar v-if="role=='ADMIN'"></app-admin-sidebar>
      <app-fm-sidebar v-else></app-fm-sidebar>

      <app-admin-header></app-admin-header>
      <div class="content-wrapper">
        <section  class="content po-inv">
        <div class="col-md-12">
               <form>
               <table class="table table-hover platform-table-color po-invoice-tbl">
                <tbody>
                    <tr>
                        <th>Invoice No.</th>
                        <th>
                          Amount(USD)
                        </th>

                        <!-- <th v-if="invoice.status==='PAID'>Payment Date</> -->
                        <th>Status</th>
                        <th>PayBy Date</th>
                    </tr>
                    <tr class="text-left" >
                        <td>ram123424
                         <br>
                  <span @click="readEmail(email.activityId)" class="admin-title-underline "><i class="fa fa-file-text" aria-hidden="true"> download</i></span> /
                  <span @click="readEmail(email.activityId)" class="admin-title-underline "><i class="fa fa-file-text" aria-hidden="true"> read</i></span>
                        </td>
                        <td>
                        500$
                        <br>
                        12-03-2017 5:36:14
                        </td>
                        <!-- <td>12-03-2017 05:37;35("paymentdate")</td> -->
                        <td>PENDING</td>
                        <td>  12-03-2017 5:36:14</td>
                    </tr>
                    <tr class="text-left" >
                        <td>ram123424
                         <br>
                  <span @click="readEmail(email.activityId)" class="admin-title-underline "><i class="fa fa-file-text" aria-hidden="true"> download</i></span> /
                  <span @click="readEmail(email.activityId)" class="admin-title-underline "><i class="fa fa-file-text" aria-hidden="true"> read</i></span>
                        </td>
                        <td>
                        500$
                        <br>
                        12-03-2017 5:36:14
                        </td>
                        <!-- <td>12-03-2017 05:37;35("paymentdate")</td> -->
                        <td>PENDING</td>
                        <td>  12-03-2017 5:36:14</td>
                    </tr>
                    <tr class="text-left" >
                        <td>ram123424
                         <br>
                  <span @click="readEmail(email.activityId)" class="admin-title-underline "><i class="fa fa-file-text" aria-hidden="true"> download</i></span> /
                  <span @click="readEmail(email.activityId)" class="admin-title-underline "><i class="fa fa-file-text" aria-hidden="true"> read</i></span>
                        </td>
                        <td>
                        500$
                        <br>
                        12-03-2017 5:36:14
                        </td>
                        <!-- <td>12-03-2017 05:37;35("paymentdate")</td> -->
                        <td>PENDING</td>
                        <td>  12-03-2017 5:36:14</td>
                    </tr>
                    <tr class="text-left" >
                        <td>ram123424
                         <br>
                  <span @click="readEmail(email.activityId)" class="admin-title-underline "><i class="fa fa-file-text" aria-hidden="true"> download</i></span> /
                  <span @click="readEmail(email.activityId)" class="admin-title-underline "><i class="fa fa-file-text" aria-hidden="true"> read</i></span>
                        </td>
                        <td>
                        500$
                        <br>
                        12-03-2017 5:36:14
                        </td>
                        <!-- <td>12-03-2017 05:37;35("paymentdate")</td> -->
                        <td>PENDING</td>
                        <td>  12-03-2017 5:36:14</td>
                    </tr>
                    <tr class="text-left" >
                        <td>ram123424
                         <br>
                  <span @click="readEmail(email.activityId)" class="admin-title-underline "><i class="fa fa-file-text" aria-hidden="true"> download</i></span> /
                  <span @click="readEmail(email.activityId)" class="admin-title-underline "><i class="fa fa-file-text" aria-hidden="true"> read</i></span>
                        </td>
                        <td>
                        500$
                        <br>
                        12-03-2017 5:36:14
                        </td>
                        <!-- <td>12-03-2017 05:37;35("paymentdate")</td> -->
                        <td>PENDING</td>
                        <td>  12-03-2017 5:36:14</td>
                    </tr>
                    <tr class="text-left" >
                        <td>ram123424
                         <br>
                  <span @click="readEmail(email.activityId)" class="admin-title-underline "><i class="fa fa-file-text" aria-hidden="true"> download</i></span> /
                  <span @click="readEmail(email.activityId)" class="admin-title-underline "><i class="fa fa-file-text" aria-hidden="true"> read</i></span>
                        </td>
                        <td>
                        500$
                        <br>
                        12-03-2017 5:36:14
                        </td>
                        <!-- <td>12-03-2017 05:37;35("paymentdate")</td> -->
                        <td>PENDING</td>
                        <td>  12-03-2017 5:36:14</td>
                    </tr>
                    <tr class="text-left" >
                        <td>ram123424
                         <br>
                  <span @click="readEmail(email.activityId)" class="admin-title-underline "><i class="fa fa-file-text" aria-hidden="true"> download</i></span> /
                  <span @click="readEmail(email.activityId)" class="admin-title-underline "><i class="fa fa-file-text" aria-hidden="true"> read</i></span>
                        </td>
                        <td>
                        500$
                        <br>
                        12-03-2017 5:36:14
                        </td>
                        <!-- <td>12-03-2017 05:37;35("paymentdate")</td> -->
                        <td>PENDING</td>
                        <td>  12-03-2017 5:36:14</td>
                    </tr>
                    <tr class="text-left" >
                        <td>ram123424
                         <br>
                  <span @click="readEmail(email.activityId)" class="admin-title-underline "><i class="fa fa-file-text" aria-hidden="true"> download</i></span> /
                  <span @click="readEmail(email.activityId)" class="admin-title-underline "><i class="fa fa-file-text" aria-hidden="true"> read</i></span>
                        </td>
                        <td>
                        500$
                        <br>
                        12-03-2017 5:36:14
                        </td>
                        <!-- <td>12-03-2017 05:37;35("paymentdate")</td> -->
                        <td>PENDING</td>
                        <td>  12-03-2017 5:36:14</td>
                    </tr>

                </tbody>
            </table>
         </form>
        <!-- </section> -->
       </div>
      </section>
      </div>




    </div>
</template>


<script>
    import  AdminSidebar  from  "../../SupperAdminSideBar.vue";
    import adminHeader from "../../adminHeader.vue";
    import  FmSidebar  from  "../../fmSidebar.vue";
    /*import POSideBar from "./poSideBar.vue";*/
     import ProductOwnerSidebar from "../../ProductOwnerSidebar.vue";
    import projectCards from "../../projectCards.vue";


    export default {
        data(){
            return{
                products:'',
                message: 'hello how are you ',
                role:''
            }

        },
        components:{
            "appAdminHeader":adminHeader,
            'appAdminSidebar': AdminSidebar,
            'appFmSidebar':FmSidebar,
            "app-product-owner-sidebar":ProductOwnerSidebar,
            "app-projectCards":projectCards,
        },
        mounted: function(){
            this.role = this.$cookie.get('role');
            // this.getProductList()
        },
         methods:{
//           getProductList: function(){
//               var app = this;
//               var url = this.$store.state.SERVER_URL+'/api/product-owner/my-project-leads';
//               //if(app.role == "PRODUCT_OWNER"){
//               //    url =  'this.$store.state.SERVER_URL+'/api/product-owner/my-project-leads'
//               //}
//               // else if(app.role == "PROJECT_MANAGER"){
//               //      url = 'this.$store.state.SERVER_URL+'/get-pm-project-leads-requested'
//               // }
//                //console.log("url    "+url);
//
//
//
//               app.axios.defaults.headers.common['X-Authorization'] =app.$cookie.get('X-Authorization') ;
//                 app.$store.commit('setSpinner',true);
//               app.axios.get(this.$store.state.SERVER_URL+'/api/product-owner/my-project-leads')
//                           .then(function (response) {
//                               app.$store.commit('setSpinner',false);
//                             //console.log("product s----------------------------");
//                              //console.log(response);
//                               app.products = response.data.payLoad;
//                   //console.log("products "+app.products);
//                           })
//                           .catch(function (error) {
//                             console.log(error);
//                           });
//
//             /*  app.$http.get(
//                     url ,
//                  {
//                      headers: {
//                        "X-Authorization": app.$cookie.get('X-Authorization')
//
//                      },
//
//                  }
//             ).then(function(response) {
//                   alert()
//                   console.log(response.data.payLoad);
//                   app.products = response.data.payLoad;
//                   console.log("products "+app.products);
//               });
// */
//             }
//         },

}
    }
</script>
