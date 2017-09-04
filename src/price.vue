<template>
    <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
      <div v-if="loggedInRole === 'ADMIN'">
        <AdminSidebar></AdminSidebar>
      </div>
        <div v-if="loggedInRole === 'PROJECT_MANAGER'">
      <pmSidebar :projectRequestId="projectRequestId"></pmSidebar>
    </div>
      <alert-component
      v-show="isalertShow"
       :success="success"
        :message="message"
        :messageList="messageList"
        @changeisaletShow="isalertShow=$event" >
    </alert-component>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <div v-if="loggedInRole === 'ADMIN'">
          <AdminProjectHeader></AdminProjectHeader>
        </div>
          <div v-if="loggedInRole === 'PROJECT_MANAGER'">
             <projectInfoHeader ></projectInfoHeader>
          </div>
           <!-- <h2 class="sub_heading story com-padding">Commercials</h2> -->
        <!-- Content Header (Page header) -->
        <!-- <section class="content-header  remove-tab-shadow  nav-remove-content-padding custom-content-header">

            <ul class="nav nav-tabs nav-remove-mar-top   custom-tab">
                <li class="active">
                    <a href="#Payment" data-toggle="tab">
                    Payment Terms </a>
                </li>
                <li>
                    <a href="#Activity-wise" data-toggle="tab" @click="getActivityData()">
                    Activity Wise </a>
                </li>

            </ul>
        </section> -->


<section class="content-header  remove-tab-shadow  nav-remove-content-padding">
    <el-tabs v-model="activeName" @tab-click="handleClick">
   <el-tab-pane label="Payment Terms" name="Payment">

     <app-payment
                  :projectRequestId="projectRequestId"
                  :isalertShow="isalertShow"
                  :success="success"
                  :message="message"
                  :messageList="messageList"
                   @changeisaletShow="isalertShow=$event"
                   @changesuccess="success=$event"
                   @changemessage="message=$event"
                   @changeMessageList = "messageList= $event"
                  ></app-payment>


   </el-tab-pane >
   <el-tab-pane label="Milestone / Activity Wise" name="Activity">
     <activity-wise-pricing
         :proposal="proposal"
         :selectedItem="selectedItem"
         :milestones="milestones" >
       </activity-wise-pricing>

   </el-tab-pane>

 </el-tabs>
 </section>


        <!-- Main content -->
        <!-- <section class="content">
            <div class="tab-content">
                <div class="tab-pane active" id="Payment">
                    <app-payment
                                 :projectRequestId="projectRequestId"
                                 :isalertShow="isalertShow"
                                 :success="success"
                                 :message="message"
                                 :messageList="messageList"
                                  @changeisaletShow="isalertShow=$event"
                                  @changesuccess="success=$event"
                                  @changemessage="message=$event"
                                  @changeMessageList = "messageList= $event"
                                 ></app-payment>
                </div>
                <div class="tab-pane" id="Activity-wise">
                    <activity-wise-pricing
                        :projectRequestId="projectRequestId"
                                           ></activity-wise-pricing>
                </div>

            </div>

        </section> -->

      </div>








      <!-- Add the sidebar's background. This div must be placed
           immediately after the control sidebar -->
      <div class="control-sidebar-bg"></div>
    </div>
</template>
<script scr=""></script>
<script>

    import  adminHeader  from "./adminHeader.vue"
    import  pmSidebar  from "./ProjectSidebar.vue"
    import  payment  from "./payment.vue"
      //  import projectInfoHeader from "./projectInfoHeader.vue";
    import alertBox from ".././src/components/alert/Alert.vue"
    import ActivityWisePricing from "../src/components/projectManager/ActicityWisePricing.vue"
    import AlertComonent from "../src/components/alert/Alert.vue"
    import projectInfoHeader from "./projectInfoHeader.vue"
    import  AdminSidebar  from  "./SupperAdminSideBar.vue";
    import  adminProjectHeader  from  "./components/admin/adminProjectHeader.vue";

    export default {
           name: 'app',
            data () {
                return {
                  loggedInRole: this.$store.getters.getLoggedInUser.role,
                   projectName:'',
                   projectProposalId:'',
                    projectId:'',
                    qutation:'',
                    milestones:'',
                    activeName:'Payment',
                    success:false,
                    projectRequestId: this.$route.params.projectRequestId,
                    isalertShow:false,
                    isShow:true,
                    message:'',
                    messageList:[],
                    proposal:'',
                    selectedItem:'',
                    milestones:[]

                }
            },
            mounted: function () {
                //this.fetchUsers();
                 console.log("coll mounted in price");
                // this.getProjectDetails()
                console.log(this.projectRequestId);
            },
            components:{
                "app-adminHeader":adminHeader,
                "pmSidebar":pmSidebar,
                "app-payment":payment,
                 "alert-box":alertBox,
                "activity-wise-pricing":ActivityWisePricing,
                "alert-component":AlertComonent,
                "projectInfoHeader":projectInfoHeader,
                'AdminSidebar': AdminSidebar,
                'AdminProjectHeader':adminProjectHeader,
            },
            methods: {

              handleClick:function(tab, event) {
                  console.log(tab.name);
                  if(tab.name =='Activity'){
                    this.getActivityDetails();
                  }
                  console.log(event);
                },

            clickHandler() {
                  localStorage.getItem("projectLeadId");

                },
                getActivityDetails:function(){
                  var app = this;
                    app.$store.commit('setSpinner',true);
                  app.$http.get(
                          this.$store.state.SERVER_URL+'/api/project-manager/get-activity-wise-estimated-hours/'+app.$route.params.projectRequestId,
                         {
                           headers: {
                             "X-Authorization": app.$cookie.get('X-Authorization')
                          },
                         }
                  ).then(function(response) {
                      app.$store.commit('setSpinner',false);
                    app.isShow=false;
                    app.proposal = response.data.payLoad;
                    app.selectedItem =response.data.payLoad;
                    app.milestones = response.data.payLoad.milestones;
                    // console.log("getActivityDetails--------------------------------------->")
                    // console.log(response.data.payLoad);
                    // console.log(app.milestones);
                  });
                },

            getProjectDetails:function(){
                var app = this;
                 app.$http.get(
                    this.$store.state.SERVER_URL+'/api/po-pm/get-project-proposal-for-lead/'+app.$route.params.projectRequestId,
                   {
                     headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')

                     },

                 }
            ).then(function(response) {
                  console.log("responxe id---");
                  console.log(response.data.payLoad.id+'dddddddddddd');
                  app.projectName = response.data.payLoad.projectName;
            });
          },





    },

}

</script>
