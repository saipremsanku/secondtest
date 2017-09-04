<template>
<div>
	<section class="content">
		<!-- add button for the PM -->
		<div class="col-md-12 pull-right">
<div class="col-md-10 ">
<!-- <div class="center"><button data-toggle="modal" data-target="#squarespaceModal" class="btn btn-primary center-block">Click Me</button></div> -->
<!-- <div class="center"><button data-toggle="modal" data-target="#squarespaceModal" class="btn btn-primary center-block">Click Me</button></div> -->
<button type="button" class="btn btn-orange btn-lg" data-toggle="modal" @click="addDeveloprModal()">Add developer</button>


				<div class="pull-right" v-if="showResultsCount">
				<span style="color: #808080;">{{searchResults}} results</span>
				</div>
</div>


			<div class="col-md-2 ">
				<div id="custom-search-input">

					<div class="input-group">

						<input type="text" class="form-control input-sm" placeholder="Search" v-model="searchIndex"/>
						<span class="input-group-btn">
							<button class="btn btn-info btn-lg" type="button">
								<i class="fa fa-search"></i>
							</button>
						</span>
					</div>
				</div>
			</div>
		</div>



			<form>
					 <table class="table table-hover platform-table-color price-table table-uat-th-alignment">
           <tbody id="dev-table">
								<tr>
										<th>Dev ID</th>
										<th>Name</th>
										<th>Email</th>
										<th>Mobile No</th>
										<th>Skill Set</th>
										<!-- <th>Type</th> -->
										<!-- <th>Verification Status</th> -->
										<th>Status</th>
										<!-- <th>Active/Suspend</th> -->
										<th>Edit </th>
										<th>Profile</th>
										<!-- <th>Actions </th> -->

								</tr>

								<tr  v-for="(developer,index) in developerList" v-show="searchResult(developer)">

										<td>{{developer.developerId}}</td>
										<td>{{developer.firstName}}  {{developer.lastName}}</td>
										<td>{{developer.email}} <strong v-if="developer.isEmailVerified"><i class="fa fa-check-square master-agremnt" aria-hidden="true"></i></strong>
										<strong v-if="!developer.isEmailVerified"><i class="fa fa-times admin_unassign" aria-hidden="true"></i></strong></td>
										<td>{{developer.mobileNumber}} <strong v-if="developer.isMobileVerified"><i class="fa fa-check-square master-agremnt" aria-hidden="true"></i></strong>
										<strong v-if="!developer.isMobileVerified"><i class="fa fa-times admin_unassign" aria-hidden="true"></i></strong></td>
										<td>
											<p v-for="skill in developer.developerSkillInfos">{{skill.skillName}}</p>

										</td>
										<!-- <td>
											<span v-if="developer.developerType=='EXTERNAL'">
												External
											</span>
											<span v-else>
												Internal
											</span>

										</td> -->
										<!-- <td>Verification</td> -->
										<!-- <td>
											{{getStatus(developer.developerRegistrationStatus)}}
										</td> -->
										<td>
											<span v-if="developer.isAppUserActive">
												Active
											</span>
											<span v-else>
												Suspend
											</span>
										</td>

										<td>
												 <span v-if="developer.developerType=='INTERNAL'">
														 <a class="edit-dev-link" @click="editDeveloper(developer,index)">Edit</a>
										</span>


										</td>
										<td>
											<router-link :to="'/admin/developer-profile/'+developer.developerId" class="edit-dev-link">details</router-link>
										</td>

<!--
									 <td>
											<div class="form-group" v-if="developer.developerRegistrationStatus!='DRAFT'">
													<button type="button" class="btn btn-orange-admin-assing btn-lg" @click="approvedDeveloper(developer,index)" v-if="developer.developerRegistrationStatus!='APPROVED'">Approve</button>
													<button type="button" class="btn btn-orange-admin-assing btn-lg" @click="rejectDeveloper(developer,index)" v-if="developer.developerRegistrationStatus!='REJECTED'">Reject</button>
											</div>
									 </td> -->

								</tr>


						</tbody>
				</table>
			 <!-- table data for the pm list -->
		 </form>
		</section>



						<div class="modal fade" id="developerModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" data-backdrop="static" data-keyboard="false" aria-hidden="true">
						 <div class="modal-dialog" role="document">
							 <div class="modal-content">
								 <div class="modal-header">
									 <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
										<div class="alert alert-danger error-color" v-if="isError">
											{{errorMessage}}
											</div>

										 <h4 class="modal-title" v-if="developer.appUserId!=null">Update Developer</h4>
										 <h4 class="modal-title" v-else>Add Developer</h4>
								 </div>
								 <div class="modal-body">
									 <div class="spinner" v-if="isSpinnerShow">
									 <!-- <img src="./assets/images/reload.gif" alt="ProfileImage"> -->
									 <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
									 </div>
										 <div class="row">
												 <div class="col-md-12">
															 <form id="form-1">


																 <div class="form-group" :class="{'input': true, 'is-danger': errors.has('firstName') }">
																	 <input class="form-control"  type="text"  placeholder="First Name" name="firstName" v-model="developer.firstName" v-validate data-vv-rules="required">
																	 <p class="text-danger" v-if="errors.has('firstName')">Please Enter Developer Name</p>
																 </div>
																 <div class="form-group" :class="{'input': true, 'is-danger': errors.has('lastName') }">
																	 <input class="form-control"  type="text"  placeholder="Last Name" name="lastName"  v-model="developer.lastName" v-validate data-vv-rules ="required">
																			<p class="text-danger" v-if="errors.has('lastName')">Please Enter Developer Last Name</p>
																 </div>
																 <div class="form-group" :class="{'input': true, 'is-danger': errors.has('email') }">
																	 <input class="form-control"  type="email"  placeholder="Email" name="email" v-model="developer.email" v-validate data-vv-rules ="required|email">
																		 <p class="text-danger" v-if="errors.has('email')">Please Enter Developer Email</p>
																 </div>
																 <div  v-if="!developer.developerId" class="form-group" :class="{'input': true, 'is-danger': errors.has('developer.password') }">
																	 <input class="form-control"  type="password"  placeholder="Password" name="password" v-model="developer.password" v-validate data-vv-rules ="required|min:8">
																			<p class="text-danger" v-if="errors.has('password')">Please Enter Developer Password</p>
																 </div>




																 <div class="form-group" :class="{'input': true, 'is-danger': errors.has('mobileNumber') }">
																	 <input  id="phone" class="form-control"  type="tel"  min="1"  placeholder="Mobile No." name="mobileNumber" v-model="developer.mobileNumber" v-validate data-vv-rules ="required">
																		 <p class="text-danger" v-if="errors.has('mobileNumber')">Please Enter Developer MobileNumber</p>
																 </div>

																 <div class="row">
																	 <div class="col-md-4">
																		 <div class="col-md-12">
																			 <label class="control-label admin_dev-skill_label">Skill</label>
																		 </div>
																	 </div>

																	 <div class="col-md-4">
																		 <div class="col-md-12">
																			 <label class="control-label admin_dev-skill_label">Competency Level</label>
																		 </div>
																	 </div>
																	 <div class="col-md-4">
																		 <div class="col-md-12">
																			 <label class="control-label admin_dev-skill_label">Experience (Month)</label>
																		 </div>
																	 </div>


																 </div>
																 <!-- row one -->

																 <form  data-vv-scope="skill-one-scope">

																 <div class="row developer-skill-margin">
																	 <div class="col-md-4">
																		 <div class="col-md-12">
																			 <select class="form-control" v-model="skill1" name="skill1" :class="{'select': true, 'is-danger': errors.has('skill-one-scope.skill1')}" v-validate:skill1="'required'" >
																		<option  value="">Select skill</option>
																		<option  v-for="skill in skillList"  :value="skill"> {{skill.name}}</option>

																	 </select>
																			 <p class="text-danger" v-if="errors.has('skill-one-scope.skill1')">Please specify atleast 1 skill</p>

																		 </div>
																	 </div>

																	 <div class="col-md-4">
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

																	 <div class="col-md-4">
																		 <div class="col-md-12">
																			 <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('skill-one-scope.skillExperience1') }">
																				 <input name="skillExperience1" v-model="skillExperience1" type="text" v-validate:skillExperience1="'required|numeric'" class="form-control text-align-right">
																				 <p class="text-danger" v-if="errors.has('skill-one-scope.skillExperience1')">Please specify experience </p>
																			 </div>
																		 </div>
																	 </div>



																 </div>

															 </form>
																 <!-- row two -->
																 <form  data-vv-scope="skill-two-scope">
																 <div class="row developer-skill-margin" >
																	 <div class="col-md-4">
																			 <div class="col-md-12">
																				 <select class="form-control" v-model="skill2"  name="skill2" :class="{'select': true, 'is-danger': errors.has('skill-two-scope.skill2')}" v-validate:skill2="'not_in:skill1.name'" >
																					<option  value="">Select skill</option>
																					<option  v-for="skill in skillList"  :value="skill"  v-if="!(skill1 === skill)"> {{skill.name}}</option>
																		 </select>
																		 <span v-if="skill2!=''">
																				 <p class="text-danger" v-if="errors.has('skill-two-scope.skill2')">Please specify atleast 1 skill</p>
																		</span>
																			 </div>

																	 </div>

																	 <div class="col-md-4">
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

																	 <div class="col-md-4">
																		 <div class="col-md-12">
																			 <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('skill-two-scope.skillExperience2') }">
																				 <input name="skillExperience2" v-model="skillExperience2" type="text" v-validate:skillExperience2="'required|numeric'" class="form-control text-align-right">
																					 <span v-if="skill2!=''">
																				 <p class="text-danger" v-if="errors.has('skill-two-scope.skillExperience2')">Please specify experience </p>
																			 </span>
																			 </div>

																		 </div>
																	 </div>

																 </div>
															 </form>

																 <!-- row 3 -->
															 <form  data-vv-scope="skill-three-scope">
																 <div class="row developer-skill-margin" >
																	 <div class="col-md-4">
																		 <div class="col-md-12">
																			 <select class="form-control" v-model="skill3" name="skill3" :class="{'select': true, 'is-danger': errors.has('skill-three-scope.skill3')}" v-validate:skill3="'required'">
																		<option  value="">Select skill</option>
																		<option  v-for="skill in skillList"  :value="skill" v-if="!(skill1 === skill || skill2 === skill)">
																			{{skill.name}}
																		</option>
																	 </select>
																		 <span v-if="skill3!=''">
																			 <p class="text-danger" v-if="errors.has('skill-three-scope.skill3')">Please specify atleast 1 skill</p>
																		 </span>



																		 </div>
																	 </div>

																	 <div class="col-md-4">
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

																	 <div class="col-md-4">
																		 <div class="col-md-12">

																			 <div class="row form-group customform-group" :class="{'input': true, 'is-danger': errors.has('skill-three-scope.skillExperience3') }">
																				 <input name="skillExperience3" v-model="skillExperience3" type="text" v-validate:skillExperience3="'required|numeric'" class="form-control text-align-right">
																					 <span v-if="skill3!=''">
																				 <p class="text-danger" v-if="errors.has('skill-three-scope.skillExperience3')">Please specify experience </p>
																			 </span>
																			 </div>

																		 </div>
																	 </div>

																 </div>
															 </form>
															 <div class="form-group" :class="{'select': true, 'is-danger': errors.has('isAppUserActive') }">
																 <select class="form-control ctryLst" v-model="developer.isAppUserActive"  name="isAppUserActive" v-validate data-vv-rules ="required">
																					<option  value="true">Active</option>
																					<option  value="false" >Suspend</option>
																	 </select>
																		 <!-- <p class="text-danger" v-if="errors.has('isAppUserActive')">Please Select Status</p> -->
															 </div>

																	 <div style="margin-top:10px" class="btn-ripple">
																		<button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
																		<button type="button" class="btn btn-orange" @click="submitDeveloper" v-if="developer.appUserId!=null">Update</button>

																	 <button type="button" class="btn btn-orange" @click="submitDeveloper" v-else>ADD</button>
																 </div>
															 </form>
												 </div>
										 </div>
								 </div>
							 </div>
						 </div>
					 </div>

				 </div>




</template>


<script>
			import  AdminSidebar  from  "../../SupperAdminSideBar.vue";
				import  AdminHeader  from  "../../adminHeader.vue";
					import  Footer  from   "../../footer.vue";
		import Datepicker from 'vuejs-datepicker';

		export default{
				data(){
						return{
							searchIndex:'',
							searchResults: 0,
							showResultsCount: false,
							developerList:[],
							developer:{
								appUserId:'',
								developerId:'',
								firstName :null,
								lastName:null,
								email:null,
								password:null,
								mobileNumber:null,
								internationalCallingCode:'',
								developerSkillInfos:[],
								isAppUserActive:true,
								iso2:'',
								isMobileVerified:'',
								isEmailVerified:'',

							},

							 developerSkillInfoId3:'',
							developerSkillInfoId2:'',
							developerSkillInfoId1:'',
							 skill1:'',
							skill2:'',
							skill3:'',
							competencyLevel1:'',
							competencyLevel2:'',
							competencyLevel3:'',
						 skillExperience1:'',
						 skillExperience2:'',
						 skillExperience3:'',


									 skillList:'',
									 dummyObject:{},
									 indexDeveloper:'',
									 isSpinnerShow:false,
									 errorMessage:'',
									 isError:false,
									 activeName:'Internal'


						}


				},
				 components:{
						 'appAdminSidebar': AdminSidebar,
						'appAdminHeader': AdminHeader,
						 Datepicker,




				},
				created : function(){
					$.getScript('/src/assets/js/intlTelInput.js'); // calling the wizard js when component load
					$.getScript('/src/assets/js/country.js'); // calling the wizard js when component load
				},
				mounted:function(){
					 this.getDevelopers();
					 this.getSkillsDetail();
				},
				methods: {

					addDeveloprModal : function(){
						 this.developer ={};
						 this.developer.isAppUserActive=true;

						 this.developerSkillInfoId3='';
						this.developerSkillInfoId2='';
						this.developerSkillInfoId1='';
						this. skill1='';
						this.skill2='';
						this.skill3='';
						this.competencyLevel1='';
						this.competencyLevel2='';
						this.competencyLevel3='';
					 this.skillExperience1='';
					 this.skillExperience2='';
					 this.skillExperience3='';

						 this.indexDeveloper='';
						 this.isSpinnerShow =false;


						$('#developerModal').modal('show');
						setTimeout(() => {
						 this.errors.clear();
								this.errors.clear('skill-one-scope');
									 this.errors.clear('skill-two-scope');
											this.errors.clear('skill-three-scope');

					 }, 100);

					},
					handleClick(index,name){

					},
					getSkillsDetail: function(){
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

					getDevelopers: function(){
								console.log("developer coll  are----------------------------------------");
								var app = this;
								app.$store.commit('setSpinner',true);
								app.$http.get(
												this.$store.state.SERVER_URL+'/admin/get-all-internal-developers',
											 {
												 headers: {
													 "X-Authorization": app.$cookie.get('X-Authorization')
												 },
										 }
								).then(function(response) {
										app.developerList = response.data.payLoad; // assigning dat to the PM table
										app.$store.commit('setSpinner',false);
								});
					},


				approvedDeveloper : function(developer,index){
					var app = this;
					app.$swal({
					title: 'Approve Developer',
					text: "This will allow his allocation to the projects.",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes'
					}).then(function () {
						app.$http.post(app.$store.state.SERVER_URL + '/admin/approve-developer/'+developer.developerId, app.dummyObject,
										{

												 headers: {
																"X-Authorization": app.$cookie.get('X-Authorization')

														},

										}).then((response) => {
											app.developerList[index] = response.data.payLoad;
											//  app.$swal("", "Approving this developer will allow his allocation to the projects.", "success");

								}, (response) => {
							});
					})
			},
				rejectDeveloper: function(developer,index){
					var app = this;
					app.$swal({
					title: 'Reject Developer',
					text: "On rejection, this developer profile will be filtered out while project allocation.",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes'
					}).then(function () {
					app.$http.post(app.$store.state.SERVER_URL + '/admin/reject-developer/'+developer.developerId, app.dummyObject,
									{
											 headers: {
															"X-Authorization": app.$cookie.get('X-Authorization')
													},
								}).then((response) => {
													console.log("response.playLoad"+index);
														app.developerList[index] = response.data.payLoad;
							}, (response) => {
								console.log("exception------"+response.data);
						});
						})
				},
				getStatus : function(status){
					if(status === 'DRAFT'){
						return 'Draft';

					}else if(status ==='PENDING_APPROVAL'){
						return 'PendingApproval';

					}else if (status === 'APPROVED'){
							return 'Approved';

				} else if (status == 'REJECTED'){
					return "rejected";

				}
			},

			submitDeveloper : function(){
			//  e.preventDefault();
				var app = this;

						var skills=[];
								if((app.skill1 !=null && app.skill1!='')){
									// app.$validator.validateAll('skill-two-scope');
						var obj1={
								'skillId': app.skill1.id,
								'skillCompetency': app.competencyLevel1,
								'skillExperience': app.skillExperience1,
								 'developerSkillInfoId': app.developerSkillInfoId1,
						};
						 skills.push(obj1);
					}
					console.log("---------skill2---------------");
					console.log(app.skill2);



						if((app.skill2 !=null && app.skill2!='')){
							console.log("inside skill2---------------------");
							app.$validator.validateAll('skill-two-scope');
							var obj2={
								'skillId': app.skill2.id,
								'skillCompetency': app.competencyLevel2,
									'skillExperience': app.skillExperience2,
									'developerSkillInfoId':app.developerSkillInfoId2,
						}
							 skills.push(obj2);

						};
								if((app.skill3 !=null && app.skill3!='')){
									app.$validator.validateAll('skill-three-scope');
							var obj3={
								'developerSkillInfoId': app.developerSkillInfoId3,
								'skillId': app.skill3.id,
								'skillCompetency': app.competencyLevel3,
								'skillExperience': app.skillExperience3,
								'developerSkillInfoId':app.developerSkillInfoId3,
						};
						 skills.push(obj3);
					}

					if (app.skill2 == '' || app.skill2 == null) {
						app.errors.clear('skill-two-scope');
					}
					if (app.skill3 == '' || app.skill3 == null) {
						app.errors.clear('skill-three-scope');
					}
					var countryCode = $(".selected-dial-code").text();
						 app.developer.internationalCallingCode = countryCode;
						 app.developer.iso2  = $(".country[class*='highlight']").attr("data-country-code");
						 app.developer.developerSkillInfos = skills;
						 app.$validator.validateAll('skill-one-scope');


						// app.$validator.validateAll();
						console.log()
						 if (!app.errors.any()) {
									app.isSpinnerShow=true;
								 app.$http.post(app.$store.state.SERVER_URL + '/admin/save-internal-developer', app.developer,
								{
										 headers: {
														"X-Authorization": app.$cookie.get('X-Authorization')
												},
							}).then((response) => {
												console.log("response.playLoad");
												if(response.data.status=='SUCCESS'){
													if(app.developer.appUserId != null && app.developer.appUserId !=''){
															app.developerList[app.indexDeveloper]=response.data.payLoad;

													}else{
															app.developerList.push(response.data.payLoad);
													}
													 app.isSpinnerShow=false;
													$('#developerModal').modal('hide');
												}else{
													 app.isSpinnerShow=false;
															app.errorMessage = response.data.errorMessage;
															app.isError=true;
															setTimeout(function () {
															app.isError=false;
														}, 3000)
												}

						}, (response) => {
							app.isSpinnerShow=false;
								 app.errorMessage ='Something went wrong';
								 app.isError=true;
								 setTimeout(function () {
								 app.isError=false;
							 }, 3000)
						 app.isSpinnerShow=false;
							console.log("exception------"+response.data);
					});
				}
			},
			editDeveloper : function(developer,index){
				console.log("--------------------------edit developer------------------");
					var app =this;
					app.developer ={};
					app.skills ={};
					app.indexDeveloper = index;
					app.developer = developer;
					console.log("edit deveopr are--------");
					console.log(app.developer.developerSkillInfos);

						if(developer.developerSkillInfos != null){
							for(var i=0 ; i< developer.developerSkillInfos.length ; i++){
								 if(i == 0){
										 app.skill1 =developer.developerSkillInfos[0].skillObject;
										 app.developerSkillInfoId1 = developer.developerSkillInfos[0].developerSkillInfoId;
										 app.competencyLevel1 = developer.developerSkillInfos[0].skillCompetency;
										 app.hourlyrate1 = developer.developerSkillInfos[0].desiredBillingPerHour;
										 app.skillExperience1 = developer.developerSkillInfos[0].skillExperience;
										}
								 if(i == 1){
										 app.skill2 =developer.developerSkillInfos[1].skillObject;
										 app.developerSkillInfoId2 = developer.developerSkillInfos[1].developerSkillInfoId;
										 app.competencyLevel2 = developer.developerSkillInfos[1].skillCompetency;
										 app.hourlyrate2 = developer.developerSkillInfos[1].desiredBillingPerHour;
										 app.skillExperience2 = developer.developerSkillInfos[1].skillExperience;
										}
								 if(i == 2){
										 app.skill3 =developer.developerSkillInfos[2].skillObject;
										 app.developerSkillInfoId3 =developer.developerSkillInfos[2].developerSkillInfoId;
										 app.competencyLevel3 = developer.developerSkillInfos[2].skillCompetency;
										 app.hourlyrate3 = developer.developerSkillInfos[2].desiredBillingPerHour;
										 app.skillExperience3 = developer.developerSkillInfos[2].skillExperience;
										}
								}
						}

						$('#developerModal').modal('show');
						console.log(developer);
					},

					searchResult: function(developer){
						var app = this;
						var srIndex = app.searchIndex.trim();
						if(srIndex === ''){
							app.showResultsCount = false;
							return true;
						}
						var fullStr = developer.firstName+developer.lastName+developer.email+developer.mobileNumber;
						if(developer.developerSkillInfos != null){
							developer.developerSkillInfos.forEach(function(skillInfo) {
									fullStr += skillInfo.skillName;
							});
						}
						var patt = new RegExp(srIndex.toLowerCase());
						app.showResultsCount = true;
						return patt.test(fullStr.toLowerCase());
					},
			},

				watch: {
	        'searchIndex': function(){
							setTimeout(() => {
									this.searchResults = $('#dev-table tr:visible').length;
							}, 100);
	      }
	    }
		}
</script>
