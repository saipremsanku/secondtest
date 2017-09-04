<template>
    <div>
        <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>

      <div class="content-wrapper">
        <section class="main_wizard_content">
            <div class="mgb-50">
                <div class="dev-wizard-heading text-center">
                    <h4>Profile</h4>
            </div>
        <div class="row margin_wizard_top">
                    <div class="col-md-10 col-md-offset-1">
                          <div class="stepwizard">
                            <div class="stepwizard-row setup-panel">
                                <div class="stepwizard-step1">
                                    <a href="#step-1" type="button" class="btn btn-primary btn-circle1 switch-class" v-if="getWizardStep ==1" >Info</a>
                                    <a href="#step-1" type="button" class="btn btn-default btn-circle1" v-else disabled="disabled" >Info</a>

                                </div>
                                <div class="stepwizard-step1">
                                    <a href="#step-2" type="button" class="btn btn-default btn-circle1 switch-class" v-if="getWizardStep ==2" >Skills</a>
                                    <a href="#step-2" type="button" class="btn btn-default btn-circle1" v-else  disabled="disabled" >Skills</a>

                                </div>
                                <div class="stepwizard-step1">
                                    <a href="#step-3" type="button" class="btn btn-default btn-circle1 switch-class" v-if="getWizardStep ==3" >Education</a>
                                    <a href="#step-3" type="button" class="btn btn-default btn-circle1" v-else  disabled="disabled" >Education</a>

                            </div>
                                   <div class="stepwizard-step1">
                                    <a href="#step-4" type="button" class="btn btn-default btn-circle1 switch-class" v-if="getWizardStep ==4" >Employment</a>
                                       <a href="#step-4" type="button" class="btn btn-default btn-circle1" v-else  disabled="disabled" >Employment</a>

                                    </div>

                            </div>
                        </div>
                    </div>
                </div>





        <!-- wizard section-->

        <app-profile v-if="getWizardStep ==1" ></app-profile>
         <app-skill-sets  v-if="getWizardStep ==2" ></app-skill-sets>
        <app-education  v-if="getWizardStep ==3" ></app-education>
        <app-employement  v-if="getWizardStep ==4"></app-employement>

      <!--  <app-account-details  v-if="wizardStep ==5" :updateStep="wizardStep" @changedWizarStep="wizardStep = $event"></app-account-details>
        <app-payment-method  v-if="wizardStep ==6" :updateStep="wizardStep" @changedWizarStep="wizardStep = $event"></app-payment-method>-->

     </div>
    </section>
    </div>
    </div>
    </div>
</template>

<script>

    import adminHeader  from "../../adminHeader.vue"
    import Profile from './Profile.vue';
    import Educcation from './Education.vue';
    import Employement from './Employement.vue';
    import SkillSets from './SkillSets.vue';
    import AccountDetails from './AccountDetails.vue';
     import PaymentMethod from './DevSelectPayMethod.vue';



    export default{
        data(){
            return{

            }
        },
         created: function(){
            console.log("this. update step"+this.updateStep);
        },
        methods:{

        },
         components:{
            "app-adminHeader":adminHeader,
             "app-profile":Profile,
             "app-education":Educcation,
             "app-employement":Employement,
             "app-skill-sets":SkillSets,
             "app-account-details":AccountDetails,
             "app-payment-method":PaymentMethod
        },
      /*  mounted: function(){

        this.$store.commit('setDeveloperWizardStep', 4);
        },*/
        computed:{

              getWizardStep () {
                    return this.$store.getters.getDeveloperWizardStep
                    }

        }
    }
</script>
<style scoped="true">
body{
    margin-top:40px;
}

    .container{
        margin-bottom: 50px;
    }
.stepwizard-step1 p {
    margin-top: 10px;
}

.stepwizard-row {
    display: table-row;
}

.stepwizard {
    display: table;
    width: 100%;
    position: relative;
}

.stepwizard-step1 button[disabled] {
    opacity: 1 !important;
    filter: alpha(opacity=100) !important;
}

.stepwizard-row:before {
    top: 50%;
    bottom: 0;
    position: absolute;
    content: " ";
    width: 75%;
    height: 1px;
    background-color: #ccc;
    z-order: 0;
    left: 12% !important;

}

.stepwizard-step1 {
    display: table-cell;
    text-align: center;
    position: relative;
}

.btn-circle1 {
  width: 73px !important;
  height: 29px !important;
  text-align: center;
  padding: 6px 0;
  font-size: 11px;
  line-height: 1.428571;
  border-radius: 16px;
}

.btn-active-new {
     background-color: none;
    border-color: none;
    color: #fff;
}

    .btn-primary {
    background-color: #e7714d !important;
    border-color: #e7714d !important;
}
 .switch-class{
        background-color: #53c4d3 !important;
        border-color: #53c4d3 !important;
        color: white;
 }

/*.btn-default {
    background-color: white !important;
    color: #131212 !important;
    border-color: #ab9c9c !important;

    }*/


.container{
  min-height: 90vh;
}
/*.content-wrapper{
  height: 94vh;
}*/




</style>
