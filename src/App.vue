<template>
	<div id="app">
	   <router-view></router-view>
		 <!-- <cube-spin></cube-spin> -->


<div class="spinner" v-if="isSpinnerShow">

			 <cube-spin></cube-spin>


</div>

			<footer class="main-footer footer">
				<div class="row">

					<div class="pull-right">
						<!-- <p>{{getLogddeInUser}}</p> -->
						<span v-if="getLogddeInUser.appUserId!=null" class="admin-margin">
								<router-link to="/feedback" >Feedback</router-link>
							</span>
						&copy; <strong><a href="http://thrymr.net" target="_blank" style="color: #F47521">Thrymr</a></strong> Software Pte. Ltd. &nbsp;
					</div>
				</div>
			</footer>

<div class="modal fade" id="chatModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	  <div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-body " id="scrollModel">

								<section class="content-header">
									<div class="row">
										<div class="col-md-6">
											<div class="chatDiscription">
											  <a href="javascript:void(0)" data-id="1" data-name="User 1">
												  <div class="friend chat_window">

													  	<div v-if="currentChatUser.isGroup" @click="openAddUserToGroupModal">
													  		<img src="./assets/images/group-icon.png" />
															<p class="chat_window_para">{{currentChatUser.name}}</p>
															<p>{{getGroupMemberNames}}</p>
													  	</div>

													  	<div v-else>
															<!-- <img :src="'https://api.adorable.io/avatars/200/'+currentChatUser.email"> -->
															<img :src="$store.state.SERVER_URL+'/get-profile-pic/'+currentChatUser.id" />
															<p class="chat_window_para">{{currentChatUser.firstName}} {{currentChatUser.lastName}}</p>
															<p>{{currentChatUser.email}}</p>
														</div>

													  <div class="status available"></div>
													</div>
											</a>
										   </div>
										</div>
										<div class="col-md-3">
											<!--
											<div class="searchContacts">
												<div id="imaginary_container">
												<div class="input-group stylish-input-group">
													<input type="text" class="form-control"  placeholder="Search" >
													<span class="input-group-addon">
														<button type="submit">
															<span>

															<i class="fa fa-search" aria-hidden="true"></i>
															</span>
														</button>
													</span>
												</div>
												</div>
											</div>
											-->

										</div>

									<!--
									<div class="col-md-1" v-if="currentChatUser.isGroup">
										<span class="chat_close" @click="openAddUserToGroupModal"><i class="fa fa-plus"></i></span>
									</div>
									 -->

									<div class="col-md-2 col-md-offset-1" v-if="currentChatUser.isGroup">
										<span class="close chat_close" data-dismiss="modal" @click="closeModal"><i class="fa fa-close"></i></span>
									</div>

									<div class="col-md-3" v-else>
										<span class="close chat_close" data-dismiss="modal" @click="closeModal"><i class="fa fa-close"></i></span>
									</div>
									</div>
								</section>


								<div class="chatboxout" @scroll="handleScroll">
								<div class="overfolow_hide">
								<div id="chatScroll" class="chatboxin">
								<div id="chat-inner" class="iteration_loop" v-for="message in currentChatMessages">
									<div class="row commanMSG" v-if="showDate(message)">
										<div class="col-md-3 col-md-offset-3" style="margin-left: 42%;">
										<span class="badge">{{humanReadableDate(message.time)}}</span>
										</div>
									</div>


									<div class="chat-container" v-if="message.received">
										<div class="chat-sender msg commanMSG">
											<strong v-if="showGroupSenderName(message)" style="font-size: 15px;">{{message.senderFirstName}} {{message.senderLastName}}</strong>
											<div class="chatmsg">
											<span style="white-space: pre;">{{message.message}}</span></div>
											<span class="date_right">{{humanReadableTime(message.time)}}</span>
										</div>
									</div>


									<div class="chat-container" v-else>
										<div class="chat-respond msg commanMSG">
											<div class="flippd">
												<!-- <strong>{{message.firstName}} {{message.lastName}}</strong> -->
												<div class="chatmsg"><span style="white-space: pre;">{{message.message}}</span></div>
												<span class="date_right">{{humanReadableTime(message.time)}}</span>
											</div>
										</div>
									</div>



								</div>

								<!-- {{lastDate = null}} -->


								</div>
								</div>
								</div>








			</div>





			 <div class="messageEnterBox">


			 		<!-- <picker set="apple" @click="addEmoji" title="I feel.." emoji="+1" :per-line="24"></picker> -->


					<textarea id="chat-text-message" class="form-control message-text-area" rows="2" autofocus autocomplete="off" v-model="textMessage" @keyup.enter="sendMessage" placeholder="Write a message..."></textarea>




			</div>







		</div>
	  </div>
	</div>




<!-- New Group Modal -->

<div class="modal fade group_modal" id="newGroupModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-body " id="scrollModel">
				<section class="content-header">
						<div class="row">
								<div class="col-md-6">
										<div class="chatDiscription">
											<a href="javascript:void(0)" data-id="1" data-name="User 1">

														<div class="friend chat_window">
															<h4 class="group_heading">New Group</h4>
														</div>
										</a>
									 </div>
								</div>
								<div class="col-md-3">
								</div>
								<div class="col-md-3">
						<span  class="close chat_close group_close" data-dismiss="modal"><i class="fa fa-close"></i></span>
						</div>
						</div>
				</section>
				<section class="add_group">
					<div class="row">
						<div class="col-md-12">
							<div class="gropu_center">
							<div class="form-group">
									 <input type="text" class="form-control group_input" name="groupName" v-model="groupName" placeholder="Group Name">
								 </div>
									 <button type="button" class="btn  group_button" @click="saveGroup()">Save</button>
						</div>
					</div>
					</div>
				</section>
			</div>
		</div>
	</div>
</div>








<!-- Add Users to Group Modal -->

<div class="modal fade group_modal_users" id="addUsersToGroupModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-body " id="scrollModel">
				<section class="content-header">
						<div class="row">
							<div class="col-md-6">
								<div class="chatDiscription">
									<a href="javascript:void(0)" data-id="1" data-name="User 1">
										<div class="friend chat_window">
											<h4 class="group_heading">{{currentChatUser.name}} </h4>
										</div>
									</a>
							 	</div>
							</div>
							<div class="col-md-3">
							</div>
							<div class="col-md-3">
								<span  class="close chat_close group_close" data-dismiss="modal"><i class="fa fa-close"></i></span>
							</div>
						</div>
				</section>


				<section class="add_group">
					<div class="row">
						<div class="col-md-12">
							<div class="gropu_center">
								<div class="form-group">

									<h4>Participants</h4>
									<div v-for="user in currentChatUser.memberArray" >
										{{user.firstName}} {{user.lastName}} ({{user.email}})
										<br>
									</div>

								</div>
							</div>
						</div>
					</div>
				</section>


				<section class="add_group">
					<div class="row">
						<div class="col-md-12">
							<div class="gropu_center">
								<div class="form-group">

									<!-- <select multiple v-model="selectedUsers" class="form-control group_input chosen-select" name="selectedUsers" >
										<option disabled value="">Please Select Users</option>

										<option v-for="user in remainingChatUsers" :value="user.id" >
										{{user.firstName}} {{user.lastName}}</option>
									</select>   -->

									            <v-select multiple v-model="selectedUsers" :options="remainingChatUsers" placeholder="Please select users" ></v-select>


								</div>
								<button type="button" class="btn  group_button" @click="addUserToGroupModal()">Add</button>
							</div>
						</div>
					</div>
				</section>

			</div>
		</div>
	</div>
</div>










</div>



</template>
<style>
 content-wrapper, .right-side, .main-footer{
	margin-left: 0px !important;
}
.content {
			/*min-height: 808px;*/
}
	.container{
		padding-bottom: 16px;

	}
</style>


<script>




import { Picker } from 'emoji-mart-vue';
import { Emoji } from 'emoji-mart-vue';
// import CubeSpin from 'vue-loading-spinner';
import CubeSpin from '././components/public/CustomSqureGrid.vue';


var dateFormat = require('dateformat');
// var now = new Date();
// dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
export default {
	name:'appvue',
	data(){
		return{
			//role:this.$cookie.get('role'),
		   role:this.$store.getters.getLoggedInUser.role,
			'textMessage':'',
			'groupName':'',
			'moreMessages': true,
			'selectedUsers':[],
			ishavingPM:''
		}
	},
	components: {
    	'picker': Picker,
    	'emoji': Emoji,
			CubeSpin


  	},
  	created: function(){
			role:this.$store.getters.getLoggedInUser.role


	},
	mounted: function(){
    app.role=this.$store.getters.getLoggedInUser.role;


		// .isPoHavingManagerForProjectLead=this.$store.getters.getIsPoHavingManagerForProjectLead.isPoHavingManagerForProjectLead;

		this.$store.commit('refreshState');
		setInterval(this.checkSocketConnection, 10000);
		this.$store.commit('setSpinner',false);
		console.log("app create and destory----");
		setTimeout(() => {
		!function() {
			var app=this;
			var t;
			if (t = window.driftt = window.drift = window.driftt || [], !t.init) return t.invoked ? void (window.console && console.error && console.error("Drift snippet included twice.")) : (t.invoked = !0,
			t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ],
			t.factory = function(e) {
				return function() {
					var n;
					return n = Array.prototype.slice.call(arguments), n.unshift(e), t.push(n), t;
				};
			}, t.methods.forEach(function(e) {
				t[e] = t.factory(e);
			}), t.load = function(t) {
				var e, n, o, i;
				e = 3e5, i = Math.ceil(new Date() / e) * e, o = document.createElement("script"),
				o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + i + "/" + t + ".js",
				n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
			});
		}();
		drift.SNIPPET_VERSION = '0.3.1';
		drift.load('dusdusgfvryb');
		drift.identify('USER_ID_2',{email:'email@admin.com'});
		 drift.identify('USER_ID_2',{email:'email@admin.com',phoneNumber:'5-555-555-5555'});
		 drift.reset();
		drift.track('Page Loaded');
		// // drift.track('Exported',{exportedObject:'2015_users'});
		// // drift.track('Shared Content',{contentId:1,contentName:'Proposal',contentType:'document',method:'Email'});
		 drift.page();
		// // drift.page("HomePage");
		 drift.debug();
		 drift.debug(true);


		if(app.role==="PROJECT_MANAGER" || app.role==="DEVELOPER" || app.role==="ADMIN" || app.role==="FINANCE_USER"){
		drift.on('ready',function(api){
			api.widget.hide();
		});
		}
		else if(app.getHavingPM){
			alert();
			drift.on('ready',function(api){
				api.widget.hide();
			});
		} else{
			drift.on('ready',function(api){
				api.widget.show();
			});
		}
	},0);

		// caches.open('').then(function(cache) {
    //     cache.delete('').then(function(response) {
    //        console.log('your cache entry has been deleted');
    //     });
    // });

	},
	methods:{

		addEmoji: function(emoji){
			//console.log(obj);
			//this.textMessage+= "<emoji :emoji=\"{ unified: \'"+emoji.unified+"\'}\"></emoji>";
			this.textMessage+= '<emoji :emoji=\"'+JSON.stringify(emoji)+'\"></emoji>';
		},

		checkSocketConnection: function(){
			// if((this.$cookie.get('X-Authorization') != null) && (this.$cookie.get('role') != null) && (this.$cookie.get('isEmailVerified').localeCompare('true')===0) && (this.$cookie.get('isMobileVerified').localeCompare('true')==0)){
					if((this.$root.stompClient == null) || (!this.$root.stompClient.connected)){
						this.$store.commit('setAllChatUsersOffline');
						//console.log('Chat Socket Disconnected... Trying to Reconnect.');
						this.$root.startSocket();
					}

					if((this.$root.stompClientNotifications == null) || (!this.$root.stompClientNotifications.connected)){
						//console.log('Notifications Socket Disconnected... Trying to Reconnect.');
						this.$root.startNotificationsSocket();
					}
			//}
		},

		showDate: function(message){
			var app = this;
			var currIndex = app.$store.getters.getChatUserMessages.indexOf(message);
			if(currIndex == 0){
				return true;
			}
			else{
				var oldD = dateFormat(new Date(app.$store.getters.getChatUserMessages[(currIndex-1)].time), "ddd, d mmm");
				var newD = dateFormat(new Date(message.time), "ddd, d mmm");
				if(oldD === newD){
					return false;
				}
				else{
					return true;
				}
			}
		},
		humanReadableDate: function(millis){
			return dateFormat(new Date(millis), "ddd, d mmm");
		},
		humanReadableTime: function(millis){
			//var date = new Date(millis).toString("MMM dd");
			//return date.toString("MMM dd");
			return dateFormat(new Date(millis), "HH:MM");
		},
		sendMessage: function (e) {
			var app = this;
			if(e.ctrlKey || e.altKey){
				this.textMessage = this.textMessage+'\n';
			}
			else{
					if(app.textMessage.trim() != ''){

						if (app.textMessage.charAt(app.textMessage.length - 1) === '\n') {
							app.textMessage = app.textMessage.substr(0, app.textMessage.length - 1);
						}

						e.view.scrollY = e.view.scrollY+35+'px';
						//console.log(e.view.scrollY+35+'px');

						var chatId = '';
						if(app.$store.getters.getChatUser.isGroup){
							chatId = app.$store.getters.getChatUser.groupId;
						}
						else{
							chatId = app.$store.getters.getChatUser.id;
						}

						var mBean = {'message': app.textMessage};

						app.$store.commit('setChatUserMessage', {'isGroup': app.$store.getters.getChatUser.isGroup, 'id': chatId, 'isReceived':false, 'mBean': mBean, 'time': new Date().getTime()});
						app.$root.stompClient.send("/chatbox-destination/send-direct-message", {}, JSON.stringify({
							'xAuth': app.$cookie.get('X-Authorization'),
							'receipientId': chatId,
							'message': this.textMessage,
							'isGroup': app.$store.getters.getChatUser.isGroup
						}));

						app.textMessage='';
						var d = $('.chatboxout');
						d.scrollTop(d.prop("scrollHeight"));
					}

			}




		},
		closeModal: function(){
			$('#chat-inner').html('');
			this.moreMessages = true;
			var app = this;
				//console.log('Marking Messages As Seen !');
				app.$store.commit('setMessagesAsRead', app.$store.getters.getChatUser);

                var chatterId = '';
                if(app.currentChatUser.isGroup){
                	chatterId = app.currentChatUser.groupId;
                }
                else{
                	chatterId = app.currentChatUser.id;
                }
                app.$root.stompClient.send("/chatbox-destination/mark-all-as-read", {}, JSON.stringify({
                    'xAuth': app.$cookie.get('X-Authorization'),
                    'senderId': chatterId,
                    'isGroup' : app.currentChatUser.isGroup
                }));

			this.$store.commit('setChatUser', {});
			app.selectedUsers = [];
		},
		saveGroup: function(){
			var app = this;
			$.ajax({
					url: this.$store.state.CHATBOX_URL + '/create-new-group',
					type: 'POST',
					contentType: "application/json; charset=utf-8",
					//dataType: "json",
					data: JSON.stringify({xAuth: app.$cookie.get('X-Authorization'), groupName: app.groupName }),
					success: function(data) {
						//console.log(data);
						app.$store.commit('setNewGroup', data);
						app.groupName = '';
						$('#newGroupModal').modal('hide');
					}
				});
		},
		handleScroll: function(e){
			//console.log("scroll down");

			var currentScrollPosition = e.srcElement.scrollTop;
			if (currentScrollPosition <= 100) {
				//console.log("About to reach top "+this.moreMessages);
				this.callServerForMoreMessages();
		  	}



						// var currentScrollPosition = e.srcElement.scrollTop;
						//  currentScrollPosition = currentScrollPosition - 40;
						//  console.log("currrent scroll postion"+currentScrollPosition);
						//             if (currentScrollPosition > this.scrollPosition) {
						//                 console.log("Scrolling down");
						//             }
						//             this.scrollPosition = currentScrollPosition;









		},
		callServerForMoreMessages: function(){
			var app = this;
			if(this.moreMessages){

					this.moreMessages = false;
					//console.log("Calling server for more messages");

					var earliestMessageTime = 0;
					if((app.currentChatMessages != null) &&  (app.currentChatMessages.length > 0)){
						earliestMessageTime = app.currentChatMessages[0].time
					}

					// app.$root.stompClient.send("/chatbox-destination/request-more-direct-messages", {}, JSON.stringify({
					// 	'xAuth': app.$cookie.get('X-Authorization'),
					// 	'receipientId': app.currentChatUser.id,
					// 	'earliestMessageTime': earliestMessageTime
					// }));


					$.ajax({
							url: app.$store.state.CHATBOX_URL + '/request-more-direct-messages',
							type: 'POST',
							contentType: "application/json; charset=utf-8",
							data: JSON.stringify({xAuth: app.$cookie.get('X-Authorization'), receipientId: app.currentChatUser.id, earliestMessageTime: earliestMessageTime }),
							success: function(data) {
								app.$store.commit('setMoreMessages', data);
								app.moreMessages = true;
							}
						});


			}

		},
		openAddUserToGroupModal: function(){
			var app = this;
			if(app.currentChatUser.isGroup){
				$('#addUsersToGroupModal')
				.on('shown.bs.modal', function() {
                	//$(".chosen-select").chosen();
                })
				.modal('show');
			}
		},
		addUserToGroupModal: function(){
			var app = this;
			if(app.currentChatUser.isGroup){

				var appUserIds=[];
				for(var selOption of app.selectedUsers){
					appUserIds.push(selOption.value);
				}

				$.ajax({
					url: this.$store.state.CHATBOX_URL + '/add-users-group',
					type: 'POST',
					contentType: "application/json; charset=utf-8",
					//dataType: "json",
					data: JSON.stringify({xAuth: app.$cookie.get('X-Authorization'), groupId: app.currentChatUser.groupId, userIdList:appUserIds }),
					success: function(data) {
						app.selectedUsers=[];
						app.$store.commit('setUsersToGroup', data);
						$('#addUsersToGroupModal').modal('hide');
					}
				});
			}
		},
		showGroupSenderName: function(message){
			if(!this.currentChatUser.isGroup){
				return false;
			}
			var app = this;
			var currIndex = app.$store.getters.getChatUserMessages.indexOf(message);
			if(currIndex == 0){
				return true;
			}
			else{
				var oldSN = app.$store.getters.getChatUserMessages[(currIndex-1)].senderFirstName+app.$store.getters.getChatUserMessages[(currIndex-1)].senderLastName;
				var newSN = message.senderFirstName+message.senderLastName;
				if(oldSN === newSN){
					return false;
				}
				else{
					return true;
				}
			}
		},


	},
	computed: {
		getHavingPM(){
				return this.$store.getters.getIsPoHavingManagerForProjectLead;
		},
		getLogddeInUser: function(){
			 return this.$store.getters.getLoggedInUser;
		},
		isSpinnerShow: function(){
			return this.$store.getters.getSpinner;
		},
		currentChatUser: function(){
			return this.$store.getters.getChatUser;
		},
		currentChatMessages: function(){
			return this.$store.getters.getChatUserMessages;
		},
		getGroupMemberNames: function(){
			var app = this;
			var names = '';
			if(app.currentChatUser != null && app.currentChatUser.memberArray != null){
				for (var i = 0; i < app.currentChatUser.memberArray.length; i++) {
					names += app.currentChatUser.memberArray[i].firstName+' '+app.currentChatUser.memberArray[i].lastName.substring(0,1)+', ';
				}
			}
			return names.slice(0, -2);
		},
		remainingChatUsers: function(){
			var app = this;
			var groupMemberIds = [];
			if((app.currentChatUser == null) || (app.currentChatUser.memberArray == null)){
				return [];
			}
			app.currentChatUser.memberArray.forEach(function(grpMember){
				groupMemberIds.push(grpMember.id);
			});
			var remChatUsers = [];
			app.whiteListedChatUsers.forEach(function(user) {
    			if(!user.isGroup){
    				if(groupMemberIds.indexOf(user.id) === -1){
						//remChatUsers.push(user);
						remChatUsers.push({label: user.firstName+' '+user.lastName, value: user.id});
    				}
    			}
			});
			return remChatUsers;
		},
		whiteListedChatUsers: function(){
			return this.$store.getters.getWhiteListedChatUsers;
		},
	}
}
</script>




<style scoped="true">
	section.content-header {
	background: rgb(244, 117, 33) !important;
	border: 1px solid rgb(244, 117, 33);
   /* padding: 15px 20px;*/
	color: #fff !important;
		height: auto;
	overflow: hidden;
}
	.friend {
   height: auto;
	position: relative;
}
	.friend p{
	padding: 7px 0 0 0;
	float: left;
	width: auto !important;
}
	 li img{
	width: 32px;
	height: 32px;
	border-radius: 100%;
	margin-right: 10px;
}
.friend img {
	width: 40px;
	border-radius: 50%;
	margin: 8px 4px;
	float: left;
}
	.content-header {
	position: relative;
	padding: 0px;
}
	.chatDiscription {
	   height: auto;
	overflow: hidden;
}
	#imaginary_container{
	margin-top:6%; /* Don't copy this */
}
.stylish-input-group .input-group-addon{
	background: white !important;
}
.stylish-input-group .form-control{
	border-right:0;
	box-shadow:0 0 0;
	border-color:#ccc;
}
.stylish-input-group button{
	border:0;
	background:transparent;
}

 .input-group .form-control:first-child{
	border-top-right-radius: 0px;
	border-bottom-right-radius: 0px;
	border-bottom-left-radius:20px !important;
	border-top-left-radius: 20px !important;
	}
	span.input-group-addon {
	border-bottom-right-radius: 20px !important;
	border-top-right-radius: 20px !important;
}
	div#imaginary_container input{
		height: 30px !important;
	}
 .input-group-addon {
	padding: 3px 12px;
	}


	.content {

	margin-top: -3% !important;
}

	/******start styles for chart box****/

/** =====================
 * Responsive
 ========================*/
@media only screen and (max-width: 766px) {
	.comments-container {
		width: 480px;

	}
	.comments-list .comment-box {
		width: 390px;
	}
	.reply-list .comment-box {
		width: 320px;
	}
}
	/**end of styles for chart box***/




	.outerbg {
  /*width: 100%;*/
  width: 90%;
  /*max-width: 610px;*/
  margin: 20px;
  padding: 30px 0;
  margin: 0 auto;
  /*background: url('https://s24.postimg.org/63armx1h1/sahil_sahil_chatsbg.png');*/
  background-repeat: no-repeat;
  background-size: 100% 100%;
		position: relative;
}
.chatboxout {
  font-family: open sans;
  font-size: 12px;
  line-height: 17px;
  box-sizing: border-box;
 /* max-width: 400px;*/
  margin: 0 auto;
  padding: 10px;
 /* background: #fff;*/
/*  border-radius: 5px;*/
	height: 62vh;
	overflow: hidden;
	overflow-y: auto;
 /* -webkit-box-shadow: 4px 4px 20px -1px rgba(59, 59, 59, 0.6);
  -moz-box-shadow: 4px 4px 20px -1px rgba(59, 59, 59, 0.6);
  box-shadow: 4px 4px 20px -1px rgba(59, 59, 59, 0.6);*/
}
.chatboxin {
  box-sizing: border-box;
 /* border: 1px solid rgba(208, 208, 208, 1);*/
  /*border-radius: 5px;*/
  padding: 5px 15px;
		margin-bottom: 6% !important;
}
.chat-sender.msg {
  -webkit-clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%, 12px 70%);
  clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%, 12px 70%);
  padding: 9px 9px;
  padding-left: 21px;
 /* background-color: #5D5D5D;*/
   /* background-color: #E6E6E6;*/
	background-color: #ffffff;
  /*color: #fff;*/
	color: #F48806;
  box-sizing: border-box;
  /*width: calc(100% - 53px);*/
	width: 55%;
  margin-left: -9px;
	margin-bottom: 0px;
	border-radius: 10px;

}
.chatmsg {
  margin-top: 5px;
	 font-size: 15px;
	font-weight: 400;
}
.chat-sender {
  display: inline-block;
  vertical-align: top;
}
.chat-container {
  margin-top: 5px;
  margin-bottom: 5px;
	animation: fadein 1s;
	-moz-animation: fadein 1s; /* Firefox */
	-webkit-animation: fadein 1s; /* Safari and Chrome */relative
	-o-animation: fadein 1s; /* Opera */
}
.chat-respond.msg {
  -webkit-clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%, 12px 70%);
  clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%, 12px 70%);
  padding: 9px 9px;
  padding-left: 21px;
 /* background-color: #E6E6E6;*/
	background-color: #a0e77d;
  color: #333;
  box-sizing: border-box;
 /* width: calc(100% - 53px);*/
	width: 55%;
  margin-right: -9px;
  transform: scale(-1, 1);
  -moz-transform: scale(-1, 1);
-webkit-transform: scale(-1, 1);
-o-transform: scale(-1, 1);
-ms-transform: scale(-1, 1);
   /* display: inline-block;
	float: right;
	clear: right;*/
	margin-bottom: 0px;
	position: relative;
	right: -45%;
	border-radius: 10px;
}
.chat-respond.msg strong {
/*  color: #F48806;*/
	color: #f40646;
}
.chat-respond {
  display: inline-block;
  vertical-align: top;
}
.flippd {
  width: 100%;
  transform: scale(-1, 1);rirht
  -moz-transform: scale(-1, 1);
-webkit-transform: scale(-1, 1);
-o-transform: scale(-1, 1);
-ms-transform: scale(-1, 1);
}
@keyframes fadein {
	from {
		opacity: 0;
	-webkit-transform: translate3d(0, 100%, 0);
	transform: translate3d(0, 100%, 0);
	}
	to {
	   opacity: 1;
	-webkit-transform: none;
	transform: none;
	}
}
@-moz-keyframes fadein { /* Firefox */
	from {
	   opacity: 0;
	-webkit-transform: translate3d(0, 100%, 0);
	transform: translate3d(0, 100%, 0);
	}
	to {
		 opacity: 1;
	-webkit-transform: none;
	transform: none;
	}
}
@-webkit-keyframes fadein { /* Safari and Chrome */
	from {
	   opacity: 0;
	-webkit-transform: translate3d(0, 100%, 0);
	transform: translate3d(0, 100%, 0);
	}
	to {
	   opacity: 1;
	-webkit-transform: none;
	transform: none;
	}
}
@-o-keyframes fadein { /* Opera */
	from {
	   opacity: 0;
	-webkit-transform: translate3d(0, 100%, 0);
	transform: translate3d(0, 100%, 0);
	}
	to {
		 opacity: 1;
	-webkit-transform: none;
	transform: none;
	}
}

	.message-text-area{
			border-radius: 4px;
				resize: none;
				border: 0px;
				padding: 10px 15px;
	}
		  .message-text-area:focus{
				border: 0px solid #ccc;
			}
		.messageEnterBox {
			padding: 10px;
	background-color: #eaeaea;
	border-top: 1px solid #c6c6c6;
}
	.date_right{
			float: right;
		color: #666;
		font-style: italic;
		font-size: 10px;

	}


 /*  #chatModal .colse-button-style{
		font-size: 43px;
	line-height: 1px;
	top: 9px;
	position: absolute;
	 left: 0; relative
	right: 2px;
	}*/



	#scrollModel {
	position: relative;
	height: 630px;
		padding: 0px !important;
	overflow: hidden;
		background-image: url(../src/assets/images/chat1.jpg);
		background-color: transparent;
		background-size: cover
}

	.chat_close span{ color: #fff !important}
	.chat_close{
	background-color: white;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	line-height: 30px;
	opacity: 1;
	text-align: center;
	color: #f47521;
	font-size: 12px;
	position: absolute;
	right: 14%;
	margin-top: 10px;
	top: 14%;
	}
	.chat_window p{margin-bottom: 0px !important;padding: 0px}
	.chat_window p{
		float: inherit !important;
		color: #fff;
		padding-left: 10px;
	}
	.chat_window_para{
		padding-top: 7px !important;
		font-weight: 700
	}


.group_modal_users .modal-lg {
    width: 50% !important;
}

.group_modal_users #scrollModel{
  height: auto !important;
}

.group_modal_users .gropu_center{
width: 52%;
text-align: center;
margin: auto;
padding-top: 10px;
padding-bottom: 11px;
}

.group_modal_users .group_button{
width: 53%;
background-color: #f47521;
color: white;
font-weight: 800;
font-size: 15px;
}

.group_modal_users .group_input{
  height: 20vh !important;
}





</style>
