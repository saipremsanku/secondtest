<template>
<div>
  <section class="content">
<div class="row">
  <div class="col-md-3">
           <div class="form-group pm_mile">
                             <select class="form-control select_option" v-model="selectedItem" @change="selectMilestone(selectedItem)">
                                      <option :value="proposal"  :selected="true">Project</option>
                                      <option v-for=" milestone in milestones" :value="milestone" >{{milestone.milestoneName}}</option>
                               </select>
                           </div>
    </div>
    </div>

<div class="row">
    <div class="col-md-12">
        <table class="table platform-table-color price-table table-striped table-hover">
                <tbody>
                    <tr>
                        <th class="activity-right">Activity Type</th>
                        <th class="activity-right">Est Hours</th>
                        <th class="activity-right">Hourly Weightage</th>
                        <th class="activity-right">Value Weightage</th>
                        <th class="activity-right">Fair Price</th>
                        <th class="activity-right">Suggestive Price</th>
                        <th class="activity-right">Price Quoted</th>
                    </tr>
                    <tr class="text-right" v-if="selectedItem !=null">
                        <td>Analysis</td>
                        <td class="text-right">
                          <span v-if="selectedItem.estimatedAnalysisHours !=null">
                          {{selectedItem.estimatedAnalysisHours}}
                        </span>
                        </td>
                        <td class="text-right">{{selectedItem.percentageOfEstimatedAnalysisHours}} %</td>
                        <td class="text-right">{{selectedItem.percentageOfSuggestivePriceForEstimatedAnalysisHours}} %</td>
                        <td class="text-right">{{selectedItem.fairPriceForEstimatedAnalysisHours}}</td>
                        <td class="text-right" v-if="(selectedItem.suggestivePriceForEstimatedAnalysisHours != null)">{{selectedItem.suggestivePriceForEstimatedAnalysisHours.toLocaleString()}}</td>
                        <td class="text-right" v-else>0</td>
                        <td class="text-right" style="font-weight: bold;" v-if="(selectedItem.quotationPriceForEstimatedAnalysisHours != null)">{{selectedItem.quotationPriceForEstimatedAnalysisHours.toLocaleString()}}</td>
                        <td class="text-right" style="font-weight: bold;" v-else>0</td>

                    </tr>
                    <tr class="text-right" v-if="selectedItem != null">
                        <td>Design</td>
                        <td class="text-right">{{selectedItem.estimatedDesignHours}}</td>
                        <td class="text-right">{{selectedItem.percentageOfEstimatedDesignHours}} %</td>
                        <td class="text-right">{{selectedItem.percentageOfSuggestivePriceForEstimatedDesignHours}} %</td>
                        <td class="text-right">{{selectedItem.fairPriceForEstimatedDesignHours}}</td>
                        <td class="text-right" v-if="(selectedItem.suggestivePriceForEstimatedDesignHours != null)">{{selectedItem.suggestivePriceForEstimatedDesignHours.toLocaleString()}}</td>
                        <td class="text-right" v-else>0</td>
                        <td class="text-right" style="font-weight: bold;" v-if="(selectedItem.quotationPriceForEstimatedDesignHours != null)">{{selectedItem.quotationPriceForEstimatedDesignHours.toLocaleString()}}</td>
                        <td class="text-right" style="font-weight: bold;" v-else>0</td>

                    </tr>
                    <tr class="text-right" v-if="selectedItem!=null">
                        <td>Front End</td>
                        <td class="text-right">{{selectedItem.estimatedFrontEndHours}}</td>
                        <td class="text-right">{{selectedItem.percentageOfEstimatedFrontEndHours}} %</td>
                        <td class="text-right">{{selectedItem.percentageOfSuggestivePriceForEstimatedFrontEndHours}} %</td>
                        <td class="text-right">{{selectedItem.fairPriceForEstimatedFrontEndHours}}</td>
                        <td class="text-right" v-if="(selectedItem.suggestivePriceForEstimatedFrontEndHours != null)">{{selectedItem.suggestivePriceForEstimatedFrontEndHours.toLocaleString()}}</td>
                        <td class="text-right" v-else>0</td>
                        <td class="text-right" style="font-weight: bold;" v-if="(selectedItem.quotationPriceForEstimatedFrontEndHours != null)">{{selectedItem.quotationPriceForEstimatedFrontEndHours.toLocaleString()}}</td>
                        <td class="text-right" style="font-weight: bold;" v-else>0</td>

                    </tr>
                    <tr class="text-right" v-if="selectedItem!=null">
                        <td>Back End</td>
                        <td class="text-right">{{selectedItem.estimatedBackendHours}}</td>
                        <td class="text-right">{{selectedItem.percentageOfEstimatedBackendHours}} %</td>
                        <td class="text-right">{{selectedItem.percentageOfSuggestivePriceForEstimatedBackendHours}} %</td>
                        <td class="text-right">{{selectedItem.fairPriceForEstimatedBackendHours}}</td>
                        <td class="text-right" v-if="(selectedItem.suggestivePriceForEstimatedBackendHours != null)">{{selectedItem.suggestivePriceForEstimatedBackendHours.toLocaleString()}}</td>
                        <td class="text-right" v-else>0</td>
                        <td class="text-right" style="font-weight: bold;" v-if="(selectedItem.quotationPriceForEstimatedBackendHours != null)">{{selectedItem.quotationPriceForEstimatedBackendHours.toLocaleString()}}</td>
                        <td class="text-right" style="font-weight: bold;" v-else>0</td>

                    </tr>
                    <tr class="text-right" v-if="selectedItem!=null">
                        <td>Quality Assurance</td>
                        <td class="text-right">{{selectedItem.estimatedQAHours}}</td>
                        <td class="text-right">{{selectedItem.percentageOfEstimatedQAHours}} %</td>
                        <td class="text-right">{{selectedItem.percentageOfSuggestivePriceForEstimatedQAHours}} %</td>
                        <td class="text-right">{{selectedItem.fairPriceForEstimatedQAHours}}</td>
                        <td class="text-right" v-if="(selectedItem.suggestivePriceForEstimatedQAHours != null)">{{selectedItem.suggestivePriceForEstimatedQAHours.toLocaleString()}}</td>
                        <td class="text-right" v-else>0</td>
                        <td class="text-right" style="font-weight: bold;" v-if="(selectedItem.quotationPriceForEstimatedQAHours != null)">{{selectedItem.quotationPriceForEstimatedQAHours.toLocaleString()}}</td>
                        <td class="text-right" style="font-weight: bold;" v-else>0</td>

                    </tr>
                    <tr class="text-right" v-if="selectedItem!=null">
                        <td>DevOps</td>
                        <td class="text-right">{{selectedItem.estimatedSupportHours}}</td>
                        <td class="text-right">{{selectedItem.percentageOfEstimatedSupportHours}} %</td>
                        <td class="text-right">{{selectedItem.percentageOfSuggestivePriceForEstimatedSupportHours}} %</td>
                        <td class="text-right">{{selectedItem.fairPriceForEstimatedSupportHours}}</td>
                        <td class="text-right" v-if="(selectedItem.suggestivePriceForEstimatedSupportHours != null)">{{selectedItem.suggestivePriceForEstimatedSupportHours.toLocaleString()}}</td>
                        <td class="text-right" v-else>0</td>
                        <td class="text-right" style="font-weight: bold;" v-if="(selectedItem.quotationPriceForEstimatedSupportHours)">{{selectedItem.quotationPriceForEstimatedSupportHours.toLocaleString()}}</td>
                        <td class="text-right" style="font-weight: bold;" v-else>0</td>

                    </tr>
                    <tr class="text-right" v-if="selectedItem!=null">
                        <td>iOS</td>
                        <td class="text-right">{{selectedItem.estimatedIosHours}}</td>
                        <td class="text-right">{{selectedItem.percentageOfEstimatedIosHours}} %</td>
                        <td class="text-right">{{selectedItem.percentageOfSuggestivePriceForEstimatedIosHours}} %</td>
                        <td class="text-right">{{selectedItem.fairPriceForEstimatedIosHours}}</td>
                        <td class="text-right" v-if="(selectedItem.suggestivePriceForEstimatedIosHours != null)">{{selectedItem.suggestivePriceForEstimatedIosHours.toLocaleString()}}</td>
                        <td class="text-right" v-else>0</td>
                        <td class="text-right" style="font-weight: bold;" v-if="(selectedItem.quotationPriceForEstimatedIosHours != null)">{{selectedItem.quotationPriceForEstimatedIosHours.toLocaleString()}}</td>
                        <td class="text-right" style="font-weight: bold;" v-else>0</td>

                    </tr>
                    <tr class="text-right" v-if="selectedItem!=null">
                        <td>Android</td>
                        <td class="text-right">{{selectedItem.estimatedAndroidHours}}</td>
                        <td class="text-right">{{selectedItem.percentageOfEstimatedAndroidHours}} %</td>
                        <td class="text-right">{{selectedItem.percentageOfSuggestivePriceForEstimatedAndroidHours}} %</td>
                        <td class="text-right">{{selectedItem.fairPriceForEstimatedAndroidHours}}</td>
                        <td class="text-right" v-if="(selectedItem.suggestivePriceForEstimatedAndroidHours != null)">{{selectedItem.suggestivePriceForEstimatedAndroidHours.toLocaleString()}}</td>
                        <td class="text-right" v-else>0</td>
                        <td class="text-right" style="font-weight: bold;" v-if="(selectedItem.quotationPriceForEstimatedAndroidHours != null)">{{selectedItem.quotationPriceForEstimatedAndroidHours.toLocaleString()}}</td>
                        <td class="text-right" style="font-weight: bold;" v-else>0</td>

                    </tr>


                </tbody>
                <tfoot class="price-footer">
                     <tr class="text-right" v-if="selectedItem!=null">
                         <td class="color-orange"></td>
                         <td class="text-right" v-if="(selectedItem.estimatedTotalHours != null)">{{selectedItem.estimatedTotalHours.toLocaleString()}}</td>
                         <td class="text-right" v-else>0</td>
                         <td class="text-right"></td>
                         <td class="text-right"></td>
                         <td class="text-right">USD {{selectedItem.fairPriceForEstimatedTotalHours}}</td>
                         <td width="12%" class="text-right" v-if="(selectedItem.suggestivePriceForEstimatedTotalHours != null)">USD {{selectedItem.suggestivePriceForEstimatedTotalHours.toLocaleString()}}</td>
                         <td width="12%" class="text-right" v-else></td>

                         <td v-if="(selectedItem.suggestivePriceForEstimatedTotalHours < selectedItem.quotationPriceForEstimatedTotalHours)"class="text-right" style="font-size: 16px; color: lightgreen;">USD {{getQuoteAmount(selectedItem)}}</td>

                         <td v-else class="text-right" style="font-size: 16px; color: #FFBF00;">USD {{getQuoteAmount(selectedItem)}}</td>

                     </tr>
                 </tfoot>
            </table>
        </div>
    </div>



            <!-- end table for milestones -->
          </section>
    </div>

</template>
<script>
    export default {
    props:['proposal','selectedItem','milestones'],

             data () {
                    return {

                }
            },
            created: function () {
                console.log("coll mounted in payment");

            },
            methods:{

                getQuoteAmount : function (selectedItem){
                    if(selectedItem.quotationPriceForEstimatedTotalHours != null){
                        return selectedItem.quotationPriceForEstimatedTotalHours.toLocaleString();
                    }
                    return '';
                },

                selectMilestone : function(onchangedItem){

                this.selectedItem = onchangedItem;

                }

    }
  }

</script>
