<template>
<div>



  <div class="row">
    <div class="lg-container col-md-10 col-md-offset-1">
      <div class="profile-main-content">
        <div class="form-section  form-section-padding-others">
          <h4 class="header_things">Things you are best at<br>
                                    <small>(atleast 1 required)</small>
                                </h4>
          <div class="row">
            <div class="col-md-3">
              <div class="col-md-12">
                <label class="control-label label-newsize">Skill</label>
              </div>
            </div>

            <div class="col-md-3">
              <div class="col-md-12">
                <label class="control-label label-newsize">Competency Level</label>
              </div>
            </div>
            <div class="col-md-3">
              <div class="col-md-12">
                <label class="control-label label-newsize">Experience (Month)</label>
              </div>
            </div>

            <div class="col-md-3">
              <div class="col-md-12">
                <label class="control-label label-newsize">Hourly Rate (USD)</label>
              </div>
            </div>
          </div>
          <!-- row one -->

          <form  data-vv-scope="skill-one-scope">

          <div class="row developer-skill-margin">
            <div class="col-md-3">
              <div class="col-md-12">
                <select class="form-control" v-model="skill1" name="skill1" :class="{'select': true, 'is-danger': errors.has('skill-one-scope.skill1')}" v-validate:skill1="'required'">
             <option  value="">Select skill</option>
             <option  v-for="skill in skillList"  :value="skill"
                      :selected="skill == skill1"> {{skill.name}}</option>
            </select>
                <p class="text-danger" v-if="errors.has('skill-one-scope.skill1')">Please specify atleast 1 skill</p>

              </div>
            </div>

            <div class="col-md-3">
              <div class="col-md-12">
                <select class="form-control" v-model="competencyLevel1" name="competencyLevel1" :class="{'select': true, 'is-danger': errors.has('skill-one-scope.competencyLevel1')}" v-validate:competencyLevel1="'required'">
                <option  value="">Select competency</option>
               <option value="EXPERT">Average</option>
               <option value="PROFICIENT">Proficient</option>
               <option value="AVERAGE">Expert</option>
           </select>
                <p class="text-danger" v-if="errors.has('skill-one-scope.competencyLevel1')">Please select a competency level </p>
              </div>
            </div>

            <div class="col-md-3">
              <div class="col-md-12">
                <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('skill-one-scope.skillExperience1') }">
                  <input name="skillExperience1" v-model="skillExperience1" type="text" v-validate:skillExperience1="'required|numeric'" class="form-control text-align-right">
                  <p class="text-danger" v-if="errors.has('skill-one-scope.skillExperience1')">Please specify experience </p>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <div class="col-md-12">
                <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('skill-one-scope.hourlyrate1') }">
                  <input v-model="hourlyrate1" name="hourlyrate1" type="text" class="form-control text-align-right" v-validate:hourlyrate1="'required|numeric'">
                  <p class="text-danger" v-if="errors.has('skill-one-scope.hourlyrate1')">Please specify hourly rate</p>
                </div>
              </div>
            </div>

          </div>

        </form>
          <!-- row two -->
          <form  data-vv-scope="skill-two-scope">
          <div class="row developer-skill-margin" >
            <div class="col-md-3">
                <div class="col-md-12">
                  <select class="form-control" v-model="skill2" name="skill2"  :class="{'select': true, 'is-danger': errors.has('skill-two-scope.skill2')}" v-validate:skill2="'required'">
               <option  value="">Select skill</option>
               <option  v-for="skill in skillList"  :value="skill"
                        > {{skill.name}}</option>
              </select>
                  <span v-if="skill2!=''">
                  <p class="text-danger" v-if="errors.has('skill-two-scope.skill2')">Please specify atleast 1 skill</p>
                </span>
                </div>
            </div>

            <div class="col-md-3">
              <div class="col-md-12">
                <select class="form-control" v-model="competencyLevel2" name="competencyLevel2" :class="{'select': true, 'is-danger': errors.has('skill-two-scope.competencyLevel2')}" v-validate:competencyLevel2="'required'">
                <option  value="">Select competency</option>
               <option value="EXPERT">Average</option>
               <option value="PROFICIENT">Proficient</option>
               <option value="AVERAGE">Expert</option>
             </select>
               <span v-if="skill2!=''">
                <p class="text-danger" v-if="errors.has('skill-two-scope.competencyLevel2')">Please select a competency level </p>
              </span>
              </div>
            </div>

            <div class="col-md-3">
              <div class="col-md-12">
                <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('skill-two-scope.skillExperience2') }">
                  <input name="skillExperience2" v-model="skillExperience2" type="text" v-validate:skillExperience2="'required|numeric'" class="form-control text-align-right">
                    <span v-if="skill2!=''">
                  <p class="text-danger" v-if="errors.has('skill-two-scope.skillExperience2')">Please specify experience </p>
                </span>
                </div>

              </div>
            </div>

            <div class="col-md-3">
              <div class="col-md-12">
                <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('skill-two-scope.hourlyrate2') }">
                  <input v-model="hourlyrate2" name="hourlyrate2" type="text" class="form-control text-align-right" v-validate:hourlyrate2="'required|numeric'">
                    <span v-if="skill2!=''">
                  <p class="text-danger" v-if="errors.has('skill-two-scope.hourlyrate2')">Please specify hourly rate</p>
                </span>
                </div>

              </div>
            </div>
          </div>
        </form>

          <!-- row 3 -->
        <form  data-vv-scope="skill-three-scope">
          <div class="row developer-skill-margin" >
            <div class="col-md-3">
              <div class="col-md-12">
                <select class="form-control" v-model="skill3" name="skill3"  :class="{'select': true, 'is-danger': errors.has('skill-three-scope.skill3')}" v-validate:skill3="'required'">
             <option  value="">Select skill</option>
             <option  v-for="skill in skillList"  :value="skill">
               {{skill.name}}
             </option>
            </select>
              <span v-if="skill3!=''">
                <p class="text-danger" v-if="errors.has('skill-three-scope.skill3')">Please specify atleast 1 skill</p>
              </span>



              </div>
            </div>

            <div class="col-md-3">
              <div class="col-md-12">

                <select class="form-control" v-model="competencyLevel3" name="competencyLevel3" :class="{'select': true, 'is-danger': errors.has('skill-three-scope.competencyLevel3')}" v-validate:competencyLevel3="'required'">
                <option  value="">Select competency</option>
               <option value="EXPERT">Average</option>
               <option value="PROFICIENT">Proficient</option>
               <option value="AVERAGE">Expert</option>
              </select>
                <span v-if="skill3!=''">
                <p class="text-danger" v-if="errors.has('skill-three-scope.competencyLevel3')">Please select a competency level </p>
              </span>



              </div>
            </div>

            <div class="col-md-3">
              <div class="col-md-12">

                <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('skill-three-scope.skillExperience3') }">
                  <input name="skillExperience3" v-model="skillExperience3" type="text" v-validate:skillExperience3="'required|numeric'" class="form-control text-align-right">
                  <p class="text-danger" v-if="errors.has('skill-three-scope.skillExperience3')">Please specify experience </p>
                </div>

              </div>
            </div>
            <div class="col-md-3">
              <div class="col-md-12">

                <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('skill-three-scope.hourlyrate3') }">
                  <input v-model="hourlyrate3" name="hourlyrate3" type="text" class="form-control text-align-right" v-validate:hourlyrate3="'required|numeric'">
                    <span v-if="skill3!=''">
                  <p class="text-danger" v-if="errors.has('skill-three-scope.hourlyrate3')">Please specify hourly rate</p>
                </span>
                </div>

              </div>
            </div>
          </div>
        </form>

          <div class="row margintop-30">
            <div class=" form-group customform-group">
              <div class="col-md-12">
                <label class="col-md-3 control-label">Hours per week you are available for work</label>
                <div class="col-md-3">
                  <div class="col-md-12">
                    <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('hours') }">
                      <input name="hours" v-model="hours" type="text" v-validate:hours="'required|numeric|min_value:1'" class="form-control text-align-right">
                      <p class="text-danger" v-if="errors.has('hours')">Please555 specify your weekly availability</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="profile-main-content-footer text-center">
        <button type="button" class="btn btn-gray pull-left" @click="goprevious">Back</button>
        <button type="button" class="btn btn-orange pull-right" @click="submitSkill">Next</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import adminHeader from "../../adminHeader.vue"

export default {
  props: ['updateStep'],
  data() {
    return {
      developerSkillInfoId3: '',
      developerSkillInfoId2: '',
      developerSkillInfoId1: '',
      skill1: '',
      skill2: '',
      skill3: '',
      hourlyrate1: '',
      hourlyrate2: '',
      hourlyrate3: '',
      competencyLevel1: '',
      competencyLevel2: '',
      competencyLevel3: '',
      skillExperience1: '',
      skillExperience2: '',
      skillExperience3: '',
      hours: "",
      developerId: '',

      skillList: ''

    }
  },
  mounted: function() {
    this.getSkillsDetail();
    this.getDevSkills();
  },
  methods: {

    goprevious: function() {
      // this.updateStep=1;
      this.$store.commit('setDeveloperWizardStep', 1);

      //this.$emit('changedWizarStep',this.updateStep);
      console.log("profile page updateState" + this.updateStep);
    },




    getSkillsDetail: function() {
      var app = this;
      app.$http.get(
        this.$store.state.SERVER_URL + '/api/dev-pm-admin/get-all-skills', {
          headers: {
            "X-Authorization": app.$cookie.get('X-Authorization')

          },

        }
      ).then(function(response) {

        app.skillList = response.data.payLoad;


      });

    },
    getDevSkills() {


      var app = this;
      app.$store.commit('setSpinner',true);
      app.$http.get(
        this.$store.state.SERVER_URL + '/api/developer/get-developer-skills', {
          headers: {
            "X-Authorization": app.$cookie.get('X-Authorization')

          },

        }
      ).then(function(response) {
        app.$store.commit('setSpinner',false);
        app.hours = response.data.payLoad.availabilityPerWeek;
        app.developerId = response.data.payLoad.developerId;
        console.log(response.data.payLoad.availabilityPerWeek);
        for (var i = 0; i < response.data.payLoad.skills.length; i++) {

          if (i == 0) {
            app.skill1 = response.data.payLoad.skills[0].skillObject;
            app.developerSkillInfoId1 = response.data.payLoad.skills[0].developerSkillInfoId;
            app.competencyLevel1 = response.data.payLoad.skills[0].skillCompetency;
            app.hourlyrate1 = response.data.payLoad.skills[0].desiredBillingPerHour;
            app.skillExperience1 = response.data.payLoad.skills[0].skillExperience;
          }

          if (i == 1) {
            app.skill2 = response.data.payLoad.skills[1].skillObject;
            app.developerSkillInfoId2 = response.data.payLoad.skills[1].developerSkillInfoId;
            app.competencyLevel2 = response.data.payLoad.skills[1].skillCompetency;
            app.hourlyrate2 = response.data.payLoad.skills[1].desiredBillingPerHour;
            app.skillExperience2 = response.data.payLoad.skills[1].skillExperience;
          }
          if (i == 2) {
            app.skill3 = response.data.payLoad.skills[2].skillObject;
            //   console.log(app.skills.skill3);
            app.developerSkillInfoId3 = response.data.payLoad.skills[2].developerSkillInfoId;
            app.competencyLevel3 = response.data.payLoad.skills[2].skillCompetency;
            app.hourlyrate3 = response.data.payLoad.skills[2].desiredBillingPerHour;
            app.skillExperience3 = response.data.payLoad.skills[2].skillExperience;
          }

        }
        setTimeout(() => {
         app.errors.clear();
           }, 10);
        //app.skillList = response.data.payLoad;


      });



    },



    // GET request
    submitSkill: function() {

      var app = this;

      var skills = [];

      if (app.skill1 != '' && app.skill1 != null) {
        var obj1 = {
          'developerSkillInfoId': this.developerSkillInfoId1,
          'skillId': this.skill1.id,
          'skillCompetency': this.competencyLevel1,
          'desiredBillingPerHour': this.hourlyrate1,
          'skillExperience': this.skillExperience1,
        };
        skills.push(obj1);
      }
      if (app.skill2 != '' && app.skill2 != null) {
         app.$validator.validateAll('skill-two-scope');
        var obj2 = {
          'developerSkillInfoId': this.developerSkillInfoId2,
          'skillId': this.skill2.id,
          'skillCompetency': this.competencyLevel2,
          'desiredBillingPerHour': this.hourlyrate2,
          'skillExperience': this.skillExperience2,
        };
        skills.push(obj2);
      }
      if (app.skill3 != '' && app.skill3 != null) {
         app.$validator.validateAll('skill-three-scope');
        var obj3 = {
          'developerSkillInfoId': this.developerSkillInfoId3,
          'skillId': this.skill3.id,
          'skillCompetency': this.competencyLevel3,
          'desiredBillingPerHour': this.hourlyrate3,
          'skillExperience': this.skillExperience3,
        }
        skills.push(obj3);
      };
      if (app.skill2 == '' || app.skill2 == null) {
        app.errors.clear('skill-two-scope');
      }
      if (app.skill3 == '' || app.skill3 == null) {
        app.errors.clear('skill-three-scope');
      }

      var obj = {};
      obj.availabilityPerWeek = this.hours;
      obj.skills = skills;

      console.log(obj);
    //  app.$validator.validateAll();
      app.$validator.validateAll('skill-one-scope');
        if (!app.errors.any()) {
          console.log("----------------------in side---------skills----------------");
      app.$http.post(
        app.$store.state.SERVER_URL + '/api/developer/save-developer-skills',
        obj, {
          headers: {
            "X-Authorization": app.$cookie.get('X-Authorization')

          },

        }

      ).then(function(response) {
        console.log(response.data.status);
        if (response.data.status == "SUCCESS") {
          //app.skills= response.data.payload;
          console.log("--if---" + response.data.status);
          app.$store.commit('setDeveloperWizardStep', 3);
          //app.$emit('changedWizarStep',app.updateStep);
        } else {
          console.log('Error!:', response.data.errorMessage);
        }


      }, function(response) {
        console.log('Error!:', response.data);

      });
    }

    }

  },
  components: {
    "app-adminHeader": adminHeader
  },
}
</script>
<style  scoped="true">
.input-hidden {
  display: none !important;
}
</style>
