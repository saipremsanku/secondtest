<template>
    <div>
        <div class="">

           <table class="table table-hover table-fixed platform-table-color price-table">
                <tbody>
                    <tr>
                        <th>Milestone</th>
                        <!-- <th>Total Hours</th> -->
                        <th>No.of Days</th>
                        <th>To be Paid</th>
                        <th>Quote Amount</th>
                        <!--<th>Invoice</th>
                        <th>Status</th>
                        <th>Payment Details</th>-->
                    </tr>
                    <tr class="text-center">
                        <td>Advance</td>

                        <td>-</td>
                        <td class="pdx-5p">
                            <div class="input-group">
                              <input type="text" class="form-control text-right" name="estimatedProjectCompletionDays" v-model.number="percentageAdvance"  readonly="readonly">
                              <div class="input-group-addon">%</div>
                            </div>
                        </td>
                        <td>USD {{percentageAdvance*quotationPrice/100}}</td>
                        <!--<td>adv invoice.pdf</td>
                        <td class="text-center">
                            <p class="badge-paragraph bg-green">Paid</p>
                        </td>
                        <td>Payment Details</td>-->
                    </tr>
                   <!-- <div>
                     <vform inline-template>
                        <div>-->
                    <tr class="text-center" v-for=" (milestone ,index) in milestones">
                        <input type="hidden" name="id" :value="milestone.id">
                        <td>
                          {{milestone.milestoneName}}<br>

                        </td>
                       <!--  <td>{{milestone.estimatedTotalHours}}</td> -->
                        <td class="pdx-5p">
                            <div class="input-group full-width">
                              <input type="" class="form-control text-right" name="estimatedCompletionDays" v-model.number ="milestone.estimatedCompletionDays"  readonly="readonly">
                            </div>
                        </td>
                        <td class="pdx-5p">
                            <div class="input-group">
                              <input type="" class="form-control text-right" name="percentagePaymentOnCompletion" v-model.number ="milestone.percentagePaymentOnCompletion"  readonly="readonly">
                              <div class="input-group-addon">%</div>
                            </div>
                        </td>
                        <td>USD {{((quotationPrice * milestone.percentagePaymentOnCompletion)/100) }}</td>
                        <!--<td>adv invoice.pdf</td>
                        <td class="text-center">
                            <p class="badge-paragraph bg-orange">Pending</p>
                        </td>
                        <td>Payment Details</td>-->
                    </tr>
          <!--      </div>
               </vform>
                </div>-->
                </tbody>
               <tfoot class="price-footer">
                    <tr class="text-center">
                         <td class="color-orange">Total</td>
                        <!-- <td>{{totalEstimatehour}} hrs</td> -->
                        <td>{{estimatedCompletionDays}} Days</td>
                        <td>
                           {{perPayCompletion}} %
                        </td>
                        <td>USD {{quotationPrice}}</td>
                        <!--<td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>-->
                    </tr>
                </tfoot>
            </table>
            <div class="row text-center">
           <!--  <button type="button" class="btn btn-orange" >Save</button> -->

            </div>

        </div>

    </div>
</template>

<script>
      export default {
          props:['projectRequestId'],
                data () {
                    return {
                    projectProposalId:'',
                    projectId:'',
                    milestones:[],
                    proposal:'',
                    projectName:'',
                    projectProposalStatus:'',
                    projectProposalIndicativePrice:'',
                    quotationPrice:'',
                    percentageAdvance:'',
                }
            },
            mounted: function () {
                this.getLatestProposal();
            },
            computed: {
              totalEstimatehour: function(){
                  var estm =0;
                  for(var i=0 ; i<this.milestones.length ;i++){
                      estm = estm + this.milestones[i].estimatedTotalHours;
                  }
                  return estm;
                  //this.milestones.estimatedTotalHours
              },
              estimatedCompletionDays: function(){

                   var days =0;
                  for(var i=0 ; i<this.milestones.length ;i++){
                      console.log("days"+this.milestones[i].estimatedCompletionDays);
                      days = days + this.milestones[i].estimatedCompletionDays;
                  }
                  return days;

                  /*this.milestones.estimatedProjectCompletionDays*/
              },
              perPayCompletion: function(){
                  var percentage = 0;

                   for(var i=0 ; i<this.milestones.length ;i++){
                      if((this.milestones[i].percentagePaymentOnCompletion == null) || (this.milestones[i].percentagePaymentOnCompletion=='') || (isNaN(this.milestones[i].percentagePaymentOnCompletion))){
                        console.log('isNAN!!');
                        this.milestones[i].percentagePaymentOnCompletion = 0;
                      }
                        percentage += this.milestones[i].percentagePaymentOnCompletion;
                    }
                    percentage += this.percentageAdvance;
                    console.log('Total Percentage: '+percentage);
                  return percentage;
              },
              quotationAmt: function(){

              }

          },

           methods: {
            getLatestProposal: function(){
            var app = this;
            var prid = this.projectRequestId;
            // app.projectId = localStorage.getItem("projectLeadId");
                     //get latest praposal based project id
            // alert()
              app.$store.commit('setSpinner',true);
            app.$http.get(
                    this.$store.state.SERVER_URL+'/api/po-pm/get-project-proposal-for-lead/'+prid,
                   {
                     headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')
                    },
                   }
            ).then(function(response) {
                  app.$store.commit('setSpinner',false);
                  console.log("responxe id---");
                  console.log(response.data.payLoad.id+'dddddddddddd');

                  app.projectProposalId = response.data.payLoad.id;
                  app.milestones = response.data.payLoad.milestones;
                  app.projectName = response.data.payLoad.projectName;
                  app.projectProposalStatus = response.data.payLoad.projectProposalStatus;
                  app.projectProposalIndicativePrice = response.data.payLoad.projectProposalIndicativePrice;
                  app.quotationPrice = response.data.payLoad.quotationPrice;

                  app.percentageAdvance = response.data.payLoad.percentageAdvance;

            });


        },

       /* quotationForm: function(){
            // e.preventDefault();
            console.log("coll methods ");
                    var app = this;




              var obj1 = {

             };
            obj1.projectProposalId = this.projectProposalId;
            obj1.quotationPrice = this.quotationPrice;
            obj1.percentageAdvance =  this.percentageAdvance;
            obj1.estimatedProjectCompletionDays =  this.estimatedProjectCompletionDays;
            obj1.milestones=[]
                $("tbody tr").each(function() {
                    var obj = {};
                     obj.id = $(":input[name=id]", this).val();
                    if(obj.id !=null && obj.id != ''){
                    obj.estimatedCompletionDays = $(":input[name=estimatedCompletionDays]", this).val();
                    obj.percentagePaymentOnCompletion = $(":input[name=percentagePaymentOnCompletion]", this).val();
                   obj1.milestones.push(obj);
                    }
                });

            $.ajax({
                           url: this.$store.state.SERVER_URL+'/api/project-manager/save-project-proposal',
                           type: 'POST',
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                           data: JSON.stringify(obj1),
                                headers: {
                                    "X-Authorization": app.$cookie.get('X-Authorization')
                                        },
                               success: function(data) {
                             if(data.status === "SUCCESS"){
                              alert("sucess save ");

                             }
                             else{
                                console.log('error');
                             }
                         }
                        });



        }*/
      }

      }





</script>
