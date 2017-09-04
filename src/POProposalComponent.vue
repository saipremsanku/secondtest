

<template>
<div>

    <div class="panel panel-default accordion-platform">
        <div class="panel-heading">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" :href="'#'+proposal.id">
                         {{proposalStatusShow}}
                      <span class="proposal_date_formate" v-if="proposal.projectProposalStatus=='REJECTED'">
                         <span class="propodal_date_style">Received on:</span> <span class="propodal_date">{{convertUtcToLocaDateTime(proposal.projectProposalSubmittedDateInMillis)}}</span>
                          <span class="propodal_date_style">Rejected on:</span> <span class="propodal_date">{{convertUtcToLocaDateTime(proposal.projectProposalRejectedDateInMillis)}}</span>
                     </span>
                         <span class="proposal_date_formate" v-if="proposal.projectProposalStatus=='ACCEPTED'">
                                 <span class="propodal_date_style">Received on:</span> <span class="propodal_date">{{convertUtcToLocaDateTime(proposal.projectProposalSubmittedDateInMillis)}}</span>
                                  <span class="propodal_date_style">Accepted on:</span> <span class="propodal_date">{{convertUtcToLocaDateTime(proposal.projectProposalAcceptedDateInMillis)}}</span>
                             </span>
                            <span class="proposal_date_formate" v-if="proposal.projectProposalStatus=='SUBMITTED'">
                                     <span class="propodal_date_style">Received on:</span> <span class="propodal_date">{{convertUtcToLocaDateTime(proposal.projectProposalSubmittedDateInMillis)}}</span>
                                 </span>

                   </a>
            </h4>
        </div>
        <div :id="proposal.id" class="panel-collapse collapse " :class="{in: proposalStatus}">
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
                                    <h4>#{{projectLeadId}}</h4>
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
                                    <th class="color_white"><span>USD<span class="margine-left">{{proposal.quotationPrice}}</span></span>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="proposal_footer left_padding">
                        <p> 1. Invoice will be raised on completion of each milestone</p>
                        <p>2. PO will clear the invoice within 7 days of invoice being raised.</p>
                        <p>3. Change Request to be devised into addendum based on mutual agreement.</p>
                        <br/>

                        <!--      <p>By Approving this quote, you agree to <a href="#">Terms & Conditions.</a></p>-->
                    </div>






                    <div class="col-md-12">
                        <div class="form-group row customform-group">

                            <div class="row">
                                <div class="col-md-9" style="left: 2%;" v-if="proposal.projectProposalStatus=='SUBMITTED'">

                                    <input type="checkbox" name="isMsaAccepted" value="true" v-model="isMsaAccepted"> I agree to the
                                    <a href="#" style="cursor: pointer;" @click="openTermsModal(proposal)"><label for="5">Terms of Services</label>
                                    </a>

                                    <p  class="validatlion_error" v-show="isAccept">Please tick 'Terms of Services' to accept this proposal.</p>
                                </div>
                                <div class="col-md-9" style="left: 2%;" v-else>
                                  <!-- <p>{{isMsaAccepted}}</p> -->
                                    <input type="checkbox" value="true" v-model="proposal.isMsaAccepted" disabled> I agree to the <a href="#" style="cursor: pointer;" @click="openTermsModal(proposal)"><label for="5">Terms of Services</label></a>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div class="row">
                        <span v-if="checkStatus()">
																<div class="col-md-12 text-center btn-accordion" v-if="$cookie.get('role').localeCompare('PRODUCT_OWNER')==0">
																<button type="button" class="btn btn-green" v-touch-ripple @click="acceptProposal(proposal.id)">ACCEPT</button>

																<button type="button" class="btn btn-orange"  v-touch-ripple @click="rejectProposalMessage(proposal.id)">REQUEST FOR REVISION</button>
																</div>
													</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--modal for rejectrevision message-->

    <div class="modal fade" id="RejectRevision" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Request for Proposal Revision</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <form  @submit.prevent="rejectProposal">

                                <div class="form-group">
                                    <textarea class="form-control" name="description" v-model="description" placeholder="Please elaborate on required revision"
                                     v-validate="'required'"></textarea>
                                       <p  class="validatlion_error" v-show="isErrorRevision">Please share details of revision required</p>
                                </div>
                                <button type="button" class="btn btn-gray" v-touch-ripple data-dismiss="modal">Cancel</button>
                                <button type="submit" class="btn btn-orange" :disabled="enableButton" v-touch-ripple>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!--modal for NDA message-->


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
</template>
<script>

import { SERVER_URL} from './main.js';
		export default {
		  props: ['proposal','projectTilte','index','proposalLength'],
		  data(){
		      return{
            enableButton:false,
		        regularMilestones:[],
		        status:false,
                 isNdaAccepted:'',
                  isMsaAccepted:'',
                  rejectProposalId:'',
                  description:'',
                  in:'in',
                  isErrorRevision:false,
                  isAccept:false,
                  projectLeadId:this.$store.getters.getProjectInfo.projectReferenceId,
                  termsAndService:'',
                  termsHtml:null,

		      }
		  },
		  created: function () {
      //  console.log(this.proposal);
        console.log("lead id---------------"+this.$store.getters.getProjectInfo.projectLeadGeneratedId);
        console.log(this.$store.getters.getProjectInfo);
		  	 this.regularMilestones = this.proposal.milestones;
		  	 var indexToDelete = 0;
		  	 for(var i=0 ; i<this.regularMilestones.length ;i++){
		  	 	if(this.regularMilestones[i].isUnAssigned){
		  	 		indexToDelete = i;
		  	 	}
		  	 }
		  	 if (indexToDelete > -1) {
    			//this.regularMilestones.splice(indexToDelete, 1);
			}
		  },
            computed:{
                proposalStatus: function(){
                    console.log(this.index);
                    if(this.index ===0){
                        return true;
                    }else{
                        return false;
                    }

                },

                 proposalStatusShow: function(){
                if(this.proposal.projectProposalStatus=='SUBMITTED'){
                    if(this.proposalLength==1){
                       return 'Proposal'
                       }else{
                            return ('Current Proposal ' +('(Revision '+' #'+(this.proposalLength - (this.index+1)))+')');
                       }

                }else if(this.proposal.projectProposalStatus=='REJECTED'){

                    if(this.proposalLength >=1 && this.proposalLength == (this.index+1)){
                        return ' First Proposal'
                    }else{
                            return ('Revision '+' #'+(this.proposalLength - (this.index+1)));
                       }

             }else if(this.proposal.projectProposalStatus=='ACCEPTED'){
                       return 'Accepted Proposal'
                      }else{
                          return this.proposal.projectProposalStatus
                      }
            }
            },

		  mounted: function(){
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
        checkStatus: function(){

          console.log(this.proposal.projectProposalStatus );
          if(this.proposal.projectProposalStatus.localeCompare('SUBMITTED')==0){
            return true;

          }
          return false;
        },
        acceptProposal: function(propsalId){

               var value = $("#termsModal").html();
              // alert($("#termsModal").html);
            var app = this;
                var object = {};
                if(app.isMsaAccepted != ''){
                  object.isMsaAccepted = true;

                }
                  object.termsHtml = value;

                if(app.isMsaAccepted !=null && app.isMsaAccepted != '' && app.isMsaAccepted !=false){
                  app.isAccept=false;
                object.projectProposalId = propsalId;


                app.$swal({
                title: 'Are you sure?',
                text: "Are you sure you want to accept the proposal?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
                }).then(function () {


                              $.ajax({
                                            url: app.$store.state.SERVER_URL+'/api/product-owner/accept-project-proposal',
                                            type: 'POST',
                                            contentType: "application/json; charset=utf-8",
                                            dataType: "json",
                                            data: JSON.stringify(object),
                                                headers: {
                                                    "X-Authorization": app.$cookie.get('X-Authorization')

                                                        },

                                           success: function(data) {
                                             if(data.status === "SUCCESS"){
                                                  console.log(data);
                                                app.status = true;
                                                 app.proposal = data.payLoad;


                                                 var projectInfo =   app.$store.getters.getProjectInfo;
                                                  projectInfo.projectLeadStatus = 'CLOSED_SUCCESSFULLY';
                                                  console.log("po ----accept proposal----------");
                                                  console.log(projectInfo);
                                                  app.$store.commit('setProjectInfo', projectInfo);

                                                 console.log(app.proposal);
                                              console.log("success");

                                                  app.$swal("Thanks for accepting proposal. Please make Advance payment to kickstart project work !", "", "success");
                                             }
                                             else{
                                                app.$swal("Oops...", data.errorMessage, "error");
                                             }
                                         }
                                        });
                                      });
                                      }else{
                                        app.isAccept = true;
                                      }
              // }
      },
              rejectProposalMessage: function(propsalId){

                  this.rejectProposalId = propsalId;
                  $('#RejectRevision').modal('show');

              },
		  	rejectProposal: function(){
		  		var app = this;

             var object ={};
                object.projectProposalId = app.rejectProposalId;
                   object.projectProposalRejectionReason = app.description;

                   app.$store.commit('setSpinner', true);
                   app.enableButton=true;
                if(app.description != null && app.description !=''){

                      app.isErrorRevision =false;

						 	$.ajax({
                           	url: this.$store.state.SERVER_URL+'/api/product-owner/reject-project-proposal',
                           	type: 'POST',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify(object),

                                headers: {
                                    "X-Authorization": app.$cookie.get('X-Authorization')

                                        },

                           success: function(data) {
                               app.$store.commit('setSpinner', false);
                               app.enableButton=false;
                             if(data.status === "SUCCESS"){
                                 $('#RejectRevision').modal('hide');
                                app.status = true;
                             	console.log("success");
                                 console.log(data)

                                   var projectInfo =   app.$store.getters.getProjectInfo;
                                    projectInfo.projectLeadStatus = 'REVISION_REQUESTED';
                                    console.log("po ----reject proposal----------");
                                    console.log(data.payLoad);
                                    app.$store.commit('setProjectInfo', projectInfo);
                                     app.proposal = data.payLoad;


                                    // app.$store.commit("setProjectInfo",app.$store.getters.getProjectInfo.projectLeadStatus ='Working On proposal');
                                       app.$swal("Thanks for sharing your feedback. Your CE'O will get in touch with you shortly!", "", "success");
                             }
                             else{
                                console.log('error');
                                 app.$swal("Oops...", data.errorMessage, "error");

                             }
                         }
                        });
                      }else{
                        app.isErrorRevision =true;
                      }

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
<style scoped="true">
   .terms .modal-dialog {
    width: 50% !important;
}
  .terms .modal-body{
            height: 85vh;
    overflow: hidden;
    overflow-y: scroll;
    }
</style>
