<template>

 <section class="content-header-align custom-content-header">
   <div class="row productBacklog_Block">
     <div class="col-md-12" v-if="role == 'PRODUCT_OWNER'">

       <div class="col-md-4" v-if="projectInfo.isProjectAvailable">
         <div class="col-md-4 col-lg-4 col-sm-4 col-xs-4">
           <div class="progress marsk-as-com-bottom active oval-border">
             <div class="progress-bar " :style="progressWidth()">
             <span>{{this.$store.getters.getProjectCompletionPercenatge}}%</span>
             </div>
           </div>
         </div>
       </div>

       <!-- <div class="col-md-4">
       </div>
       <div class="col-md-3">

       </div> -->
       <div class="col-md-2">
           <h5 class="pull-right"><span v-if="projectLeadId != null">#{{projectLeadId}}</span></h5>
         </div>

           <div class="col-md-3">
                <h5><span class=" pull-right">
                  <span class="badge badge-cst bg-ongoing" v-if="projectInfo.isProjectAvailable">On going</span>
                  <span v-else>
                  <span class="badge badge-cst bg-blue" v-if="projectInfo.projectLeadStatus=='DRAFT'">Draft</span>
                    <span class="badge badge-cst bg-green" v-if="projectInfo.projectLeadStatus=='PROPOSAL_SUBMITTED'">Proposal Ready</span>
                      <span class="badge badge-cst bg-orange" v-if="projectInfo.projectLeadStatus=='CLOSED_SUCCESSFULLY'">Advance Awaited</span>
                        <span class="badge badge-cst yellow-color" v-if="projectInfo.projectLeadStatus=='REQUESTED'">Working On Proposal</span>
                          <span class="badge badge-cst yellow-color" v-if="projectInfo.projectLeadStatus=='REVISION_REQUESTED'">Working on Proposal</span>
                        </span>
                    </span>
                  </h5>
           </div>
           <div>
             <h5 class="pull-right">
              <!-- <router-link  :to="'/ceo/project-mananger-profile/'+this.$store.getters.getProjectInfo.projectManagerId" > -->
                      {{ceoName}}
                        <!-- </router-link> -->
                           </h5>
           </div>


        </div>

        <div class="col-md-12" v-if="role == 'PROJECT_MANAGER'">

          <div class="col-md-4" v-if="projectInfo.isProjectAvailable">
            <div class="col-md-4 col-lg-4 col-sm-4 col-xs-4">
              <div class="progress marsk-as-com-bottom active oval-border">
                <div class="progress-bar " :style="progressWidth()">
                <span>{{this.$store.getters.getProjectCompletionPercenatge}}%</span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-2">
              <h5 class="pull-right"><span v-if="projectLeadId != null">#{{projectLeadId}}</span></h5>
            </div>
              <div class="col-md-3">
                   <h5><span class=" pull-right">
                     <span class="badge badge-cst bg-ongoing" v-if="projectInfo.isProjectAvailable">On going</span>
                     <span v-else>
                     <span class="badge badge-cst bg-blue" v-if="projectInfo.projectLeadStatus=='DRAFT'">Draft</span>
                       <span class="badge badge-cst bg-green" v-if="projectInfo.projectLeadStatus=='PROPOSAL_SUBMITTED'">Proposal Ready</span>
                         <span class="badge badge-cst bg-orange" v-if="projectInfo.projectLeadStatus=='CLOSED_SUCCESSFULLY'">Advance Awaited</span>
                           <span class="badge badge-cst yellow-color" v-if="projectInfo.projectLeadStatus=='REQUESTED'">Working On Proposal</span>
                             <span class="badge badge-cst yellow-color" v-if="projectInfo.projectLeadStatus=='REVISION_REQUESTED'">Working on Proposal</span>
                       </span>
                     </span>
                     </h5>
              </div>
              <div class="col-md-3">

                <h5 class="pull-right">
                   <router-link  :to="'/product-manager/product-owner-profile/'+this.productOwnerId" >
                         {{poName}}
                           </router-link>
                              </h5>
              </div>

           </div>


           <div class="row" v-if="role == 'ADMIN'">
             <div class="col-md-7">


               <header  class="admin-project-header">
                 <nav>
                   <ul class="admin-project-header">
                     <router-link :to="'/'+admin+'/project-task-analysis/'+this.projectRequestId" tag="li" active-class="active" v-if="this.$store.getters.getProjectInfo.isProjectAvailable"> <a class="side-bar-bold"><i class="fa fa-rocket" aria-hidden="true"></i>{{this.$store.getters.getProjectInfo.name}}</a></router-link>
                     <router-link to="" tag="li" active-class="" v-else> <a class="side-bar-bold"><i class="fa fa-rocket" aria-hidden="true"></i></i></a>{{this.$store.getters.getProjectInfo.name}}</router-link>

                     <!-- <router-link to="" tag="li"><h4><a class="side-bar-bold" style="color: #e7714d" v-else><i class="fa fa-rocket" aria-hidden="true"></i>&nbsp;{{this.$store.getters.getProjectInfo.name}}</a></h4></router-link> -->
                     <router-link :to="'/'+admin+'/project-request/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"><a><i class="fa fa-list-alt"></i></a></router-link>
                     <router-link :to="'/'+admin+'/project-backlog/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"><a><i class="fa fa-th"></i></a></router-link>
                     <router-link :to="'/'+admin+'/project-milestones/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"> <a><i class="fa fa-flag-checkered"></i></a></router-link>
                     <router-link :to="'/'+admin+'/project-commercials/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"><a><i class="fa fa-usd"></i></a></router-link>
                     <router-link :to="'/'+admin+'/project-proposals/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft"><a><i class="fa fa-gavel"></i></a></router-link>
                     <router-link :to="'/'+admin+'/project-task-board/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft" v-if="this.$store.getters.getProjectInfo.projectId"><a><i class="fa fa-cubes"></i></a></router-link>
                     <router-link :to="'/'+admin+'/test-library/'+this.projectRequestId" tag="li" active-class="active" class="sidebar-margin-leaft" v-if="this.$store.getters.getProjectInfo.projectId"><a><i class="fa fa-check-square"></i></a></router-link>
                     <router-link :to="'/admin/assign-developer/'+this.$store.getters.getProjectInfo.projectId" tag="li" active-class="active" class="sidebar-margin-leaft" v-if="this.$store.getters.getProjectInfo.projectId"><a><i class="fa fa-users"></i></a></router-link>

                   </ul>
                 </nav>
               </header>













             </div>
             <div class="col-md-5">

             <div class="col-md-4" v-if="projectInfo.isProjectAvailable">

                 <div class="progress marsk-as-com-bottom active oval-border">
                   <div class="progress-bar " :style="progressWidth()">
                   <span>{{this.$store.getters.getProjectCompletionPercenatge}}%</span>
                   </div>
                 </div>

             </div>

             <div class="col-md-2">
                 <h5 class="pull-right"><span v-if="projectLeadId != null">#{{projectLeadId}}</span></h5>
               </div>
                 <div class="col-md-3">
                      <h5><span class=" pull-right">
                        <span class="badge badge-cst bg-ongoing" v-if="projectInfo.isProjectAvailable">On going</span>
                        <span v-else>
                        <span class="badge badge-cst bg-blue" v-if="projectInfo.projectLeadStatus=='DRAFT'">Draft</span>
                          <span class="badge badge-cst bg-green" v-if="projectInfo.projectLeadStatus=='PROPOSAL_SUBMITTED'">Proposal Ready</span>
                            <span class="badge badge-cst bg-orange" v-if="projectInfo.projectLeadStatus=='CLOSED_SUCCESSFULLY'">Advance Awaited</span>
                              <span class="badge badge-cst yellow-color" v-if="projectInfo.projectLeadStatus=='REQUESTED'">Working On Proposal</span>
                                <span class="badge badge-cst yellow-color" v-if="projectInfo.projectLeadStatus=='REVISION_REQUESTED'">Working on Proposal</span>
                          </span>
                        </span>
                        </h5>
                 </div>
                 <div class="col-md-3">

                   <h5 class="pull-right">
                      <router-link  :to="'/product-manager/product-owner-profile/'+this.productOwnerId" >
                            {{poName}}
                              </router-link>
                                 </h5>
                 </div>

               </div>

              </div>




   </div>
 </section>

 </template>

 <script>

export default {

 data(){
   return{
     admin:'admin',
     projectLeadId:this.$store.getters.getProjectInfo.projectReferenceId,
     role: this.$store.getters.getLoggedInUser.role,
     poName : this.$store.getters.getProjectInfo.productOwnerFullName,
      ceoName : this.$store.getters.getProjectInfo.projectManagerName,
     productOwnerId: this.$store.getters.getProjectInfo.appUserId,
     projecLead:this.$store.getters.getProjectInfo.projectLeadId,
     isProjectAvailable:this.$store.getters.getProjectInfo.isProjectAvailable,
     projectCompletionPercentage : this.$store.getters.getProjectCompletionPercenatge,
       projectRequestId:this.$store.getters.getProjectInfo.id,
   }
 },

 computed:{
   projectInfo: function(){
     return this.$store.getters.getProjectInfo;
   }
 },
 methods:{
   progressWidth: function(){
        return "width:" +this.$store.getters.getProjectCompletionPercenatge+ "%";
   },
 },

}

 </script>
