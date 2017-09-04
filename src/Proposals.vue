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
        <!-- Project information dynamic data  -->
        <div v-if="loggedInRole === 'ADMIN'">
          <AdminProjectHeader></AdminProjectHeader>
        </div>
          <div v-if="loggedInRole === 'PROJECT_MANAGER'">
             <projectInfoHeader ></projectInfoHeader>
          </div>

        <!-- Main content -->
        <section class="content">
          <div class="alert alert-danger error-color" v-if="isError">
         {{errorMessage}}
          </div>
        <!-- <h2 class="sub_heading story">Proposals</h2> -->
        <div class="panel-group PO_Proposal" id="accordion">
                <proposalComponent :proposal="proposal" :projectTilte="projectName"
                 v-for="(proposal,index) in proposalArray"
                  :index="index"
                  :isalertShow="isalertShow"
                  :success="success"
                  :message="message"
                  :messageList="messageList"
                   @changeisaletShow="isalertShow=$event"
                   @changesuccess="success=$event"
                   @changemessage="message=$event"
                   @changeMessageList = "messageList= $event"

                  ></proposalComponent>

          </div>

        </section>

      </div>
      <div class="control-sidebar-bg"></div>
    </div>
</template>


<script>
    import  adminHeader  from "./adminHeader.vue"
    import  pmSidebar  from "./ProjectSidebar.vue"
    import  proposalComponent  from "./proposalComponent.vue"
    import alert from "././components/alert/Alert.vue";
    import projectInfoHeader from "./projectInfoHeader.vue";
    import AlertComonent from "../src/components/alert/Alert.vue"
    import  AdminSidebar  from  "./SupperAdminSideBar.vue";
    import  adminProjectHeader  from  "./components/admin/adminProjectHeader.vue";
    export default {
        name: 'app',
        data () {
          return {
              loggedInRole: this.$store.getters.getLoggedInUser.role,
              projectRequestId:this.$route.params.projectRequestId,
              proposalArray:[],
              projectName:'',
              isalertShow:false,
              success:false,
              message:'',
              messageList:[],
              isError:false,
              errorMessage:'',
          }
        },
        components:{
            "app-adminHeader":adminHeader,
            "pmSidebar":pmSidebar,
            "proposalComponent":proposalComponent,
            "projectInfoHeader":projectInfoHeader,
            "alert-component":AlertComonent,
            'AdminSidebar': AdminSidebar,
            'AdminProjectHeader':adminProjectHeader,
        },
        created: function(){
        this.getErrorMessage();
      },
      methods:{
        getPropasals(){
        var app = this;
          app.$store.commit('setSpinner', true);
        app.$http.get(
                  this.$store.state.SERVER_URL+'/api/po-pm/get-project-proposals-for-lead/'+this.projectRequestId,
                 {
                   headers: {
                     "X-Authorization": app.$cookie.get('X-Authorization')
                   },
               }
          ).then(function(response) {
            app.$store.commit('setSpinner', false);
             if(response.data.status=='SUCCESS'){
                app.projectName = response.data.payLoad[0];
                app.proposalArray = response.data.payLoad[1];
                console.log("-----------get all proposal---------------------");
                console.log(app.proposalArray);
           }else{
             app.errorMessage = response.data.payLoad;
             app.isError=true;
             setTimeout(function () {
             app.isError=false;
           }, 3000)
         }
       });


     },
     getErrorMessage(){
     var app = this;
     app.$http.get(
               this.$store.state.SERVER_URL+'/api/pm-admin/create-agreement-for-proposal-in-lead/'+this.projectRequestId,
              {
                headers: {
                  "X-Authorization": app.$cookie.get('X-Authorization')
                },
            }
       ).then(function(response) {
         app.getPropasals();
          if(response.data.status=='SUCCESS'){
             app.projectName = response.data.payLoad[0];
             app.proposalArray = response.data.payLoad[1];

             console.log("-----------get all proposal---------------------");
             console.log(app.proposalArray);
        }else{
          app.getPropasals();
          app.errorMessage = response.data.payLoad;
          app.isError=true;
          setTimeout(function () {
          app.isError=false;
        }, 3000)
      }
    });


   }
      }
    }
</script>
<style scoped>
.content {
    padding-bottom: 3%;
}
.label {
    margin-left: 39px;
}
</style>
