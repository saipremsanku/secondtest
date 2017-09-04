<template>
<div>




        <section class="test-run-execution-details">

          <table class="table table-hover platform-table-color price-table">
           <tbody>
             <!-- <p>{{testRunDefectList}}</p> -->
               <tr>
                   <th>Defect Id</th>
                   <th>Title</th>
                   <th>Test Case Id</th>
                   <th>Created By</th>
                   <th>Created on</th>
                   <th>Assign To</th>
                   <th>Status</th>
               </tr>
               <tr class="text-center" v-for="defect in testRunDefectList">
                   <td>{{defect.defectIdentifier}}</td>
                   <td>{{defect.defectTitle}}</td>
                   <td>
                     <p v-for=" testCaseId in defect.testCaseIdentifierList">
                     {{testCaseId}}
                   </p>
                   </td>
                   <td>{{defect.defectOpenedBy}}</td>
                    <td>{{getLocalDate(defect.defectOpenedDateInMillis)}}</td>
                   <td>{{defect.appUserFullName}}</td>
                   <td>

                     <p class="badge badge-cst bg-orange" v-if="defect.defectStatus=='OPEN'">Open</p>
                         <p class="badge badge-cst bg-green" v-if="defect.defectStatus=='CLOSED'">Closed</p>
                             <p class="badge badge-cst bg-blue" v-if="defect.defectStatus=='REOPENED'">Reopen</p>
                                 <p class="badge badge-cst yellow-color" v-if="defect.defectStatus=='FIXED_IN_CODE'">Fixed</p>

                     </td>
               </tr>



           </tbody>
       </table>

        </section>

    </div>
</template>
<script>

export default {
  props: ['testRunDefectList'],
  data() {
    return {

    }
  },
  components: {

  },
  methods:{
    getLocalDate:function(date){
      var moment = require('moment-timezone');
    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // console.log("convertStringtoDate------------------------>"+timeZone)
    return moment(date).tz(timeZone).format('DD-MM-YYYY HH:mm')
    }
  }
}
</script>
