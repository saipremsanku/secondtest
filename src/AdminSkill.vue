<template>

   <div>
         <div class="manage-skill">
            <div class="row ">
            <div class="col-md-12 col-xs-12 col-sm-12">


                <div class="col-md-4 col-xs-4 col-sm-4">
                      <button type="button" class="btn btn-orange btn-lg" data-toggle="modal" @click="addSkillModal()">Add Skill</button>
                </div>
               <div class="col-md-4 col-xs-4 col-sm-4">


                </div>

                <div class="col-md-4 col-xs-4 col-sm-4">

                     <!-- <div id="custom-search-input">
                            <div class="form-group">
                        <div class="input-group">
                            <input type="text" class=" form-control search-class-radius" placeholder="Search" />
                           <div class="input-group-addon " style="border-radius: 0px 10px 10px 0px;">  <span class=" glyphicon glyphicon-search  search-class-radius-icon"></span></div>

                        </div>
                            </div>
                        </div> -->


                </div>
            </div>
            </div>
            </div>


               <table class="table table-hover platform-table-color price-table">
                <tbody>
                    <tr >
                        <th>Skill</th>
                        <th>Activty Type</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>
                    <tr class="text-center" v-for=" (skill,index) in skills">
                         <td>{{skill.name}}</td>
                         <td>{{skill.activityType}}</td>
                        <td v-if="skill.isActive">Active</td>
                        <td v-else>InActive</td>
                       <td>
                           <div class="editStory">
                           <ul class="list-group storyList">
                                <li class="list-group-item trasparent-bg"><a type="button"  class="cursor-pointer" ><i class="fa fa-pencil " aria-hidden="true" @click="editSkill(skill,index)"></i></a></li>
                                <!-- <li class="list-group-item trasparent-bg"><a type="button"  class="cursor-pointer"  ><i class="fa fa-trash-o trasparent-bg" aria-hidden="true"></i> Delete</a></li> -->
                                </ul>
                            </div>
                         </td>

                    </tr>
                </tbody>
            </table>


               <!-- add Skill  Modal  -->


                <div class="modal fade" id="SkillModel" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
                 <div class="modal-dialog" role="document">
                   <div class="modal-content">
                     <div class="modal-header">
                       <button type="button" class="close" data-dismiss="modal">&times;</button>
                       <div class="alert alert-danger error-color" v-if="isError">
                         {{errorMessage}}
                         </div>
                          <h4 class="modal-title" v-if="skill.skillId">Update Skill</h4>
                       <h4 class="modal-title" v-else>Add New  Skill</h4>
                     </div>
                     <div class="modal-body">
                       <div class="form-group">
                           <label for="sel1">Select Activity:</label>
                         <select class="form-control" id="Activity" v-model="skill.activityType"  name="activityType" :class="{'select': true, 'is-danger': errors.has('activityType')}" v-validate data-vv-rules="required">
                           <option value="" disabled selected>Select Activity </option>
                           <option v-for="activity in activityTypes" :value="activity">{{activity}}</option>
                         </select>
                           <p class="text-danger" v-if="errors.has('activityType')">Please Select Activity Type</p>
                               </div>

                               <div class="form-group" :class="{'input': true, 'is-danger': errors.has('skillName') }">
                                 <input type="text" class="form-control " id="skill" name="skillName"  v-model="skill.skillName" placeholder="Skill" v-validate data-vv-rules="required">
                                   <p class="text-danger" v-if="errors.has('skillName')">Please enter Skill  name</p>
                               </div>

                               <div class="form-group">

                                   <label class="radio-inline"><input type="radio" name="skill.isActive" value="true" v-model="skill.isActive" checked="checked" >Active</label>

                                   <label class="radio-inline"><input type="radio" name="skill.isActive" value="false" v-model="skill.isActive" checked="checked" >Inactive</label>

                                 </div>

                                 <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                                  <button type="button" class="btn btn-orange"  v-on:click="submitSkillForm" v-if="skill.skillId">Update</button>
                               <button type="button" class="btn btn-orange"  v-on:click="submitSkillForm" v-else>ADD</button>
                     </div>
                   </div>
                 </div>
               </div>


    </div>

</template>
<script>

     export default{
        data(){
            return{
                activityTypes:[],
                skills:[],
                 skill:{
                   
                   skillId:'',
                    'skillName':'',
                    'isActive':'',
                    'activityType':''
                },
                isError:false,
                errorMessage:'',
                index:''
            }

        },

         mounted: function(){
                var app = this;

             //get all skills

                 app.$http.get(
                        this.$store.state.SERVER_URL+'/api/dev-pm-admin/get-all-skills',
                       {
                         headers: {
                           "X-Authorization": app.$cookie.get('X-Authorization')
                         },
                     }
                ).then(function(response) {
                    // console.log("get all skills");
                    app.skills = response.data.payLoad;
                    //  console.log(app.skills);

                });

                app.$http.get(
                       this.$store.state.SERVER_URL+'/api/get-all-activity-types',
                      {
                        headers: {
                          "X-Authorization": app.$cookie.get('X-Authorization')
                        },
                    }
               ).then(function(response) {
                  app.activityTypes = response.data.payLoad;
                    //console.log("---------activty types-------------");
                  //  console.log(response.data.payLoad);
               });

        },
        methods:{
          addSkillModal(){
            var app =this;
            app.skill={};
            this.skill.activityType='';
            setTimeout(() => {
                app.errors.clear();
              }, 100);

          $('#SkillModel').modal('show');
        },
          editSkill(skill,index){
            this.index= index;
            // console.log("----skill ------------");
            // console.log(skill);
            // console.log(skill.activityType);
            this.skill.activityType = skill.activityType;
            this.skill.skillName = skill.name;
            this.skill.isActive=skill.isActive;
            this.skill.skillId = skill.id;
            // // this.skill = skill;
               $('#SkillModel').modal('show');




          },
            getActivity : function(){
                var app = this;


            },
            submitSkillForm: function(e){
                    e.preventDefault();
                    var app = this;

            // GET request
                // console.log("app skill are");
                // console.log( app.skills);

                app.$validator.validateAll();
              if (!app.errors.any()) {

            app.$http.post(
                app.$store.state.SERVER_URL+'/admin/save-skill',
                app.skill,
                {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')

                        },

                }

               ).then(function (response) {

                // console.log(response.data);
                if(response.data.status=="SUCCESS"){

                  if(app.skill.skillId!=null || app.skill.skillId!=''){
                        app.skills.splice(app.index,1,response.data.payLoad);

                  }else{
                    app.skills.push(response.data.payLoad);
                  }

                     $('#SkillModel').modal('hide');
                   }else{
                       console.log('Error!:', response.data.errorMessage);
                          app.errorMessage = response.data.errorMessage;
                          app.isError=true;
                          setTimeout(function () {
                          app.isError=false;
                        }, 3000)
                   }

               }, function (response) {
                 app.errorMessage ='Something went wrong';
                 app.isError=true;
                 setTimeout(function () {
                 app.isError=false;
               }, 3000)

                //console.log('Error!:', response.data);

              });
            }
              },


        }
    }



</script>
