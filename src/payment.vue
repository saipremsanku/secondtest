<template>
    <div>

  <section class="content">

                <div class="col-md-9">
                    <div class="row">
                    <div class="top_price_div PM_price_margin">


                        <!-- TODO: Get Fair Price from server -->
                        <div class="col-md-3 border-right">
                            <p>Fair Price: USD {{projectProposalFairPrice}}</p>
                        </div>

                        <div class="col-md-3 border-right">
                            <p>Suggestive Price: USD {{projectProposalIndicativePrice}}</p>
                        </div>

                        <div class="col-md-6">

                            <p class="para_float text-right">Quotation:
                            <span :class="{ 'control': true }">
                            <input type="number"  min="1" step="1"
                              class="price_ip text-right"  v-model.number="quotationPrice" name="quotationPrice" v-validate="'required|decimal'" :class="{'input': true, 'is-danger': errors.has('quotationPrice') }"/>
                              USD
                            <span v-show="errors.has('quotationPrice')" class="validatlion_error display_inline-block"> Please enter Quotation Amount</span>
                            </span>
                            </p>
                        </div>
                    </div>
                    </div>

            </div>
            <div class="fixed-table-height">
           <table class="table table-hover table-fixed platform-table-color price-table">
                <tbody>
                    <tr>
                        <th>Milestone</th>
                        <th>Total Hours</th>
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
                        <td class="text-center">-</td>
                        <td class="pdx-5p">
                            <div class="input-group">
                              <input type="number" class="form-control text-right"  v-model.number ="percentageAdvance">
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
                          {{'A:'+milestone.estimatedAnalysisHours+' | D:'+milestone.estimatedDesignHours+' | F:'+milestone.estimatedFrontEndHours+' | B:'+milestone.estimatedBackendHours
                          +' | Q:'+milestone.estimatedQAHours+' | S:'+milestone.estimatedSupportHours+' | I:'+milestone.estimatedIosHours+' | AD:'+milestone.estimatedAndroidHours}}
                        </td>
                        <td>{{milestone.estimatedTotalHours}}</td>
                        <td class="pdx-5p">
                            <div class="input-group full-width">
                              <input type="number" min="1" class="form-control text-right" name="estimatedCompletionDays" v-model.number ="milestone.estimatedCompletionDays">
                            </div>
                        </td>
                        <td class="pdx-5p">
                            <div class="input-group">
                              <input type="number" min="1"  class="form-control text-right" name="percentagePaymentOnCompletion" v-model.number ="milestone.percentagePaymentOnCompletion">
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
                        <td>{{totalEstimatehour}} hrs</td>
                        <td>{{totalestimatedCompletionDays}} Days</td>
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
          </div>
            <div class="row text-center" v-if="projectProposalStatus=='DRAFT'">
            <button  type="button" class="btn btn-orange" @click="quotationValidation">Save</button>
            </div>

</section>

    </div>
</template>

<script>
      export default {

          props:['projectRequestId','isalertShow','success','message','messageList'],
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
                    percentageAdvance:0,
                    projectProposalFairPrice:0,
                }
            },
            mounted: function () {
                console.log("coll mounted in payment");
                this.getLatestProposal();
            },
            computed: {
              isAdmin:function(){
                return  this.$store.getters.getLoggedInUser.role === 'ADMIN';
              },
              totalEstimatehour: function(){
                  var estm =0;
                  var app = this;
                  for(var i=0 ; i<this.milestones.length ;i++){
                           if((this.milestones[i].estimatedTotalHours == null) || (this.milestones[i].estimatedTotalHours=='') ||
                              (isNaN(this.milestones[i].estimatedTotalHours))){
                               this.milestones[i].estimatedTotalHours =0;
                           }

                      estm += this.milestones[i].estimatedTotalHours;
                  }
                  return estm;
                  //this.milestones.estimatedTotalHours
              },
              totalestimatedCompletionDays: function(){
                  console.log("for estimatedCompletionDays");
                   var days =0;
                  for(var i=0 ; i<this.milestones.length ;i++){
                      console.log("for loop");
                          if((this.milestones[i].estimatedCompletionDays == null) || (this.milestones[i].estimatedCompletionDays=='') || (isNaN(this.milestones[i].estimatedCompletionDays))){
                               console.log("if loop");
                              this.milestones[i].estimatedCompletionDays= 0;
                          }
                            days += this.milestones[i].estimatedCompletionDays;

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
                    if((this.percentageAdvance == null) || (this.percentageAdvance=='') || (isNaN(this.percentageAdvance))){
                      console.log("is nan");
                      this.percentageAdvance = 0;
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
                  console.log("responxe id------------>");
                  console.log(response);

                  app.projectProposalId = response.data.payLoad.id;
                  app.milestones = response.data.payLoad.milestones;
                  app.projectName = response.data.payLoad.projectName;
                  app.projectProposalStatus = response.data.payLoad.projectProposalStatus;
                  app.projectProposalIndicativePrice = response.data.payLoad.projectProposalIndicativePrice;
                  app.quotationPrice = response.data.payLoad.quotationPrice;
                  app.projectProposalFairPrice = response.data.payLoad.projectProposalFairPrice;
                  if(response.data.payLoad.percentageAdvance==0){
                     app.percentageAdvance =response.data.payLoad.projectProposalIndicativePercentageAdvance;
                  }else{
                     app.percentageAdvance = response.data.payLoad.percentageAdvance;
                  }


            });

        },
        quotationValidation:function(){

            var app = this;
       app.$emit("changeMessageList",null);
      if((app.quotationPrice == null) || (app.quotationPrice=='') || (isNaN(app.quotationPrice))){


        app.$emit("changeisaletShow",true);
       app.$emit("changesuccess", false);
       app.$emit("changemessage","Quotation Amount should be positive integer only");

      }else{
          // var indicativePrice = (app.projectProposalIndicativePrice -((app.projectProposalIndicativePrice * 20)/100));
        if(app.quotationPrice >= app.projectProposalFairPrice){
          if(app.perPayCompletion == 100){
            app.quotationForm();
          }else{
             app.$emit("changeisaletShow",true);
             app.$emit("changesuccess", false);
             app.$emit("changemessage","Amount to be paid for all milestones should add upto to 100%, Please try again");

          }

        }else{
           app.$emit("changeisaletShow",true);
          app.$emit("changesuccess", false);
          app.$emit("changemessage","Quotation amount cannot be less than FairPrice");
        }

      }


        },

        quotationForm: function(){
            // e.preventDefault();
            console.log("coll methods ");
                    var app = this;




              var obj1 = {

             };
            obj1.projectProposalId = this.projectProposalId;
            obj1.quotationPrice = this.quotationPrice;
            obj1.percentageAdvance =  this.percentageAdvance;
            obj1.estimatedProjectCompletionDays =  this.totalestimatedCompletionDays;
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

                    app.$emit("changeMessageList",null);

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
                            app.$emit("changeisaletShow",true);
                            app.$emit("changesuccess",true);
                            app.$emit("changemessage","Successfully saved !");

                             }
                             else{
                                  app.$emit("changeisaletShow",true);
                                 app.$emit("changesuccess", false);
                                app.$emit("changemessage",data.errorMessage);
                                app.$emit("changeMessageList",data.payLoad);
                                console.log("list of error messages----------------------------");
                                console.log(data.payLoad);
                                console.log('error');
                                 //app.$destroy();

                             }
                         }
                        });



        }
      },
          destroy:function(){
              console.log("coll destory--------");
          }

      }





</script>
