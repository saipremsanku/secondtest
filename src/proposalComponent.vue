

<template>
<div>

<div class="panel panel-default accordion-platform">
    <div class="panel-heading">
        <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion" :href="'#'+proposal.id">
                         {{proposal.projectProposalStatus}}
                         <span class="proposal_date_formate" v-if="proposal.projectProposalStatus=='REJECTED'">
                            <span class="propodal_date_style">Sent on:</span> <span class="propodal_date">{{convertUtcToLocaDateTime(proposal.projectProposalSubmittedDateInMillis)}}</span>
                             <span class="propodal_date_style">Rejected on:</span> <span class="propodal_date">{{convertUtcToLocaDateTime(proposal.projectProposalRejectedDateInMillis)}}</span>
                        </span>
                            <span class="proposal_date_formate" v-if="proposal.projectProposalStatus=='ACCEPTED'">
                                    <span class="propodal_date_style">Sent on:</span> <span class="propodal_date">{{convertUtcToLocaDateTime(proposal.projectProposalSubmittedDateInMillis)}} </span>
                                     <span class="propodal_date_style">Accepted on:</span> <span class="propodal_date">{{convertUtcToLocaDateTime(proposal.projectProposalAcceptedDateInMillis)}}</span>
                                </span>
                               <span class="proposal_date_formate" v-if="proposal.projectProposalStatus=='SUBMITTED'">
                                        <span class="propodal_date_style">Sent on:</span> <span class="propodal_date">{{convertUtcToLocaDateTime(proposal.projectProposalSubmittedDateInMillis)}}</span>
                                    </span>





                       </a>
        </h4>
    </div>
    <div :id="proposal.id"  class="panel-collapse collapse" :class="{in: proposalStatus}">
        <div class="panel-body">
            <div class="proposal_contanier">
                <!--start style of project title-->
                <div class="proposal_title left_padding">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="col-md-2">
                                <p>Project Title</p>
                                <h4>{{projectTilte}} </h4>
                            </div>
                            <div class="col-md-2">
                                <p>Project ID</p>
                                <h4>#{{proposal.projectReferenceId}}</h4>
                            </div>
                            <div class="col-md-8">
                              <a :href="url" download  class="pull-right"><i class="fa fa-arrow-circle-o-down proposal-download-icon" aria-hidden="true"></i></a>

                            </div>
                        </div>
                    </div>
                </div>
                <!--end of projec tilte-->

                <div class="deliverables">
                    <h4>Deliverables</h4>

                </div>
                <div class="proposal_milestone left_padding" v-for=" (milestone,mileIndex) in regularMilestones">
                    <div class="row">
                        <div class="col-md-12">
                            <h5 class="milestone_heading">{{mileIndex+1}}. {{milestone.milestoneName}}</h5>
                            <ol>
                                <li v-for="(epics,epicIndex) in milestone.epics" class="epic_title">
                                    <p class="tilte border_bottom">{{mileIndex+1}}.{{epicIndex+1}} {{epics.epicName}}</p>
                                    <ol>
                                        <li v-for="(story,storyIn) in epics.userStorys">
                                            <p class="border_bottom">{{mileIndex+1}}.{{epicIndex+1}}.{{storyIn+1}} {{story.name}}</p>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div class="Schedule">
                    <h4>Schedule of Payment & Terms</h4>
                </div>

                <div class="proposal_table left_padding">
                    <table class="table proposal-table th-background font_weight">
                        <tbody>
                            <tr>
                                <th>Milestone</th>
                                <th>Effort</th>
                                <th>Payment Schedule</th>
                                <th>Amount to be Paid</th>
                            </tr>


                             <tr class="text-center">
                                <td>Advance</td>
                                <td>--</td>
                                 <td>{{proposal.percentageAdvance}}<span>%</span></td>
                                <td>{{proposal.percentageAdvance * proposal.quotationPrice/100}}</td>
                            </tr>
                            <tr class="text-center" v-for="milestone in regularMilestones">
                                <td>{{milestone.milestoneName}}</td>
                                <td>{{milestone.estimatedCompletionDays}}<span class="margine-left">days</span></td>
                                <td>{{milestone.percentagePaymentOnCompletion}}<span>%</span></td>
                                <td>{{milestone.percentagePaymentOnCompletion * proposal.quotationPrice/100}}</td>
                            </tr>
                            <tr class="proposal_footer">
                                <th> Total</th>
                                <th>{{proposal.estimatedProjectCompletionDays}}</th>
                                <th></th>
                                 <th class="color_white"><span>USD<span class="margine-left">{{proposal.quotationPrice}}</span></span></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="proposal_footer left_padding">
                    <p> 1. Invoice will be raised on completion of each milestone</p>
                    <p>2. PO will clear the invoice within 7 days of invoice being raised.</p>
                    <p>3. Change Request to be devised into addendum based on mutual agreement.</p>
                    <br/>

                </div>
                <div class="col-md-12">
                    <div class="form-group row customform-group">

                        <div class="row">
                          <div class="col-md-2 PM_marigin_left">
                                <a href="#" class="curs"  @click="openTermsModal(proposal)"><label for="5">Terms of Services</label>
                                </a>
                              </div>
                            </div>
                            <div class="row">

                              <div  v-if="proposal.projectProposalStatus=='REJECTED'">
                                <div class="well PM_marigin_left">
                                         <p>{{proposal.projectProposalRejectionReason}}</p>
                                  </div>
                              </div>


                            </div>

                        </div>



                    </div>
                </div>


                <div class="row">
                    <div class="col-md-12 text-center btn-accordion" v-if="$cookie.get('role').localeCompare('PROJECT_MANAGER')==0">
                                 <button type="button" class="btn btn-green " @click="sendProposalToPO(proposal.id)" v-if="proposal.projectProposalStatus =='DRAFT'" >SEND TO PRODUCT OWNER</button>
                            </div>
                </div>
            </div>
            <div class="modal fade terms" id="termsModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header" style="background-color: #e7714d;">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" style="color: white;">Terms of Service</h4>
                        </div>
                        <div class="modal-body">


                          <div v-html="termsHtml" class="termsModalData"></div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>
<script>

		export default {

		  props: ['proposal','projectTilte','index','isalertShow','success','message','messageList'],
		  data(){
		      return{
		        regularMilestones:[],
		        status:false,
              termsHtml:null,
                mobilePlatformTypes:[],
                  checkedNames:[],
                  in:'in',
                  isalert:false,
                  alertMessage:'',
                  url:this.$store.state.SERVER_URL +'/api/pm-admin/download-excel-sheet/'+this.proposal.id+"/"+this.$store.getters.getLoggedInUser.appUserId,
		      }
		  },
            components:{
                'alert-message':alert
            },
            computed:{
                proposalStatus : function(){
                    if(this.index ==0){
                        return true;

                       }else{
                              return false;
                       }

                },
                isAdmin:function(){
                  return  this.$store.getters.getLoggedInUser.role === 'ADMIN';
                },
            },
		  created: function () {
		  	 this.regularMilestones = this.proposal.milestones;
            console.log("proposal------------------->")
         console.log(this.proposal)
		  	 var indexToDelete = 0;
		  	 for(var i=0 ; i<this.regularMilestones.length ;i++){
		  	 	if(this.regularMilestones[i].isUnAssigned){
		  	 		indexToDelete = i;
		  	 	}
		  	 }
		  	 if (indexToDelete > -1) {
    			this.regularMilestones.splice(indexToDelete, 1);
			}
		  },
		  mounted: function(){
        console.log("project info---");
        console.log(this.$store.getters.getProjectInfo.projectLeadStatus);
           this.getProposalStatus();
		  },
		  methods:{
		  	isAccordionOpen: function(){
		  		if(this.proposal.projectProposalStatus.localeCompare('DRAFT')==0){
		  			return true;
		  		}
		  		return false;
		  	},
		  	getClassName: function(){
		  		if(this.proposal.projectProposalStatus.localeCompare('DRAFT')==0){
		  			return 'panel-collapse collapse in';
		  		}
		  		return 'panel-collapse collapse';
		  	},
		  	sendProposalToPO: function(propsalId){
		  		var app = this;
          app.$swal({
          title: 'Are you sure?',
          text: "This proposal will be visible to PO. ",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
          }).then(function () {

            $.ajax({
              url: app.$store.state.SERVER_URL+'/api/project-manager/submit-project-proposal/'+propsalId,
              type: 'POST',
              contentType: "application/json; charset=utf-8",
              dataType: "json",

              headers: {
                "X-Authorization": app.$cookie.get('X-Authorization')

              },

              success: function(data) {
                if(data.status === "SUCCESS"){


                  app.status = true;
                  //  PROPOSAL_SUBMITTED
                  var projectInfo =   app.$store.getters.getProjectInfo;
                  projectInfo.projectLeadStatus = 'PROPOSAL_SUBMITTED';
                  app.$store.commit('setProjectInfo', projectInfo);
                  console.log("projectInfo-------pm---------");
                  console.log(projectInfo);

                  app.proposal = data.payLoad;
                  app.$swal("Proposal has been sent to PO!", "", "success");
                  console.log("success");
                  console.log(data);


                }
                else{
                  console.log('error');
                  data.errorMessage
                  app.$emit("changeisaletShow",true);
                  app.$emit("changesuccess", false);
                  app.$emit("changemessage",data.errorMessage);
                  app.$emit("changeMessageList",data.payLoad);
                }
              }
            });
          })
		  	},
		  	getProposalStatus : function(){

		  	},
        openTermsModal: function(proposal){
          console.log("terms--------",proposal);
          this.termsAndService = proposal.termsHtml;
          $(".termsModalData").html(proposal.termsHtml);
        //  this.termsHtml = proposal.id;
          // this.$forceUpdate();

// this.$nextTick(() => {
// });
          console.log("update  termsAndHtml proposal--"+this.termsHtml);
						$('#termsModal').modal('show');
				},
        convertUtcToLocaDateTime(date){
         //console.log("convertStringtoDate------------------------>")
         var moment = require('moment-timezone');
         var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
         return moment(date).tz(timeZone).format('DD-MM-YYYY')
       },
		  }
		}

</script>
<style >


.panel-body {
    padding: 15px 15px 15px 0px;
}

.PO_Proposal .left_padding{
        padding-left: 15px;
         padding-left: 2%;
}

    body {
    background-color: #f9fafa;
}
.curs{
  cursor: pointer;
}



</style>
