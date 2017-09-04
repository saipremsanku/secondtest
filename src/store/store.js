import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store =  new Vuex.Store({
	state: {

isPoHavingManagerForProjectLead:false,
		pageReftesh:true,
		version : '',
		SERVER_URL : '',
		FILEBOX_URL:'',
		CHATBOX_URL : '',
		GOOGLE_CLIENT_ID:'',
		GOOGLE_CAPTCHA_ID:'',
		spinner:false,
		loggedInUser : {},
		postLoginURL : '',
		devloperWizardStep:1,
		mobileNumber:'',
		email:'',
		forgotEmail:'',
		whiteListedChatUsers : [],
		chatUser : {},
		projectInfo:{},
		devProjectInfo:{},
		adminProjecLeadInfo: {},
		projectTaskList:{},
		backlogList:[],
		workInProgressList:[],
		completedByDeveloperList:[],
		verifiedList:[],
		developerTaskList:{},
		developerOwnBacklogList:[],
		developerOtherBacklogList:[],
		developerWorkInProgressList:[],
		developerCompletedByDeveloperList:[],
		developerVerifiedList:[],

		notificationList:[],
    projectCompletionPercenatge:'',
		smsCount:'',
		fileServer:''
	},
	getters: {
		getSmsCount(state){
			return state.smsCount;
		},
		getFileServer(state){
			return state.fileServer;
		},

		getPageRefresh(state){
			return state.pageReftesh;
		},
		getIsPoHavingManagerForProjectLead(state){
			return state.isPoHavingManagerForProjectLead;
		},
		getProjectCompletionPercenatge(state){
			return state.projectCompletionPercenatge;
		},
		getVersion(state){
			return state.version;
		},

		getSpinner(state){
			return state.spinner;
		},

		getNotificationList(state) {
			if(state.notificationList == null){
				return [];
			}
			return state.notificationList.sort(function(a, b) {
				return (b.notificationId - a.notificationId);
			});
		},
		getForgotEmail(state){
				return state.forgotEmail;
		},
		getLoggedInUser(state) {
			return state.loggedInUser;
		},

		getLoggedInUserEmailStatus(state) {
			return state.loggedInUser.isEmailVerified;
		},

		getLoggedInUserMobileStatus(state) {
			return state.loggedInUser.isMobileVerified;
		},

		getPostLoginURL(state) {
			return state.postLoginURL;
		},
		getDeveloperWizardStep(state){
			return state.devloperWizardStep;
		},
		getMobileNumber(state){
		   return  state.mobileNumber;
		},
		getEmail(state){
			return state.email;
		},
		getWhiteListedChatUsers(state){
			return state.whiteListedChatUsers;
		},
		getChatUser(state){
			return state.chatUser;
		},
		getChatUserMessages(state){
			// var u;
			// for (u of state.whiteListedChatUsers) {
			// if(u.id === state.chatUser.id){
			// return u.messages;
			// }
			// }
			return state.chatUser.messages;
		},
		getTotalUnreadCount(state){
			var count = 0
			for(var i = 0; i < state.whiteListedChatUsers.length; i++){
				count += state.whiteListedChatUsers[i].unReadCount;
			}
			return count;
		},
		getProjectInfo(state){
	 		return state.projectInfo;
		},
	 	getAdminProjecLeadInfo(state){
			return state.adminProjecLeadInfo;
	  	},
	  	getDevProjectInfo(state){
	  		return state.devProjectInfo;
		},
		getProjectTaskList(state){
	  		return state.projectTaskList;
		},
		getProjectDeveloperList(state){
	  		return state.projectTaskList.developerList;
		},
		getDeveloperTaskList(state){
	  		return state.developerTaskList;
		},
// project task list getting
		getBacklogList(state){

			return state.backlogList;
		},

		getWorkInProgressList(state){

 		 return state.workInProgressList;
		},
		getCompletedByDeveloperList(state){

 		 return state.completedByDeveloperList;
		},

		getVerifiedList(state){
		 return state.verifiedList;
		},

		// developer task list getting

		getDeveloperOwnBacklogList(state){

			return state.developerOwnBacklogList;
		},
		getDeveloperOtherBacklogList(state){

			return state.developerOtherBacklogList;
		},

		getDeveloperWorkInProgressList(state){

 		 return state.developerWorkInProgressList;
		},
		getDeveloperCompletedByDeveloperList(state){

 		 return state.developerCompletedByDeveloperList;
		},

		getDeveloperVerifiedList(state){
		 return state.developerVerifiedList;
		},



	},
	mutations: {
		setFileServer(state, fileServer){
			state.fileServer = fileServer;
		},
		setSmsCount(state, smsCount){
			state.smsCount = smsCount;
		},
		setPageRefresh(state,pageReftesh){
		  state.pageReftesh = pageReftesh;
		},
		setIsPoHavingManagerForProjectLead(state,isPoHavingManagerForProjectLead){
		  state.isPoHavingManagerForProjectLead = isPoHavingManagerForProjectLead;
		},
		setProjectCompletionPercenatge(state, projectCompletionPercenatge){
			state.projectCompletionPercenatge = projectCompletionPercenatge;
		},
		setVersion(state, version){
			state.version = version;
		},
		setSpinner(state,spinner){
			state.spinner = spinner;
		},
		setForgotEmail(state,forgotEmail){
		    state.forgotEmail=forgotEmail;
		},
		setLoggedInUser(state, user){
			state.loggedInUser = user;
		},
		setLoggedInUserEmailStatus(state, status){
			state.loggedInUser.isEmailVerified = status;
		},
		setLoggedInUserMobileStatus(state, status){
			state.loggedInUser.isMobileVerified = status;
		},
		setPostLoginURL(state, url){
			state.postLoginURL = url;
		},
		setPOCouponCode(state, couponStatus){
			state.loggedInUser.isPOEligible = couponStatus;
		},
		setDeveloperWizardStep(state, wizardStep){
			state.devloperWizardStep = wizardStep;
		},
		setMobileNumber(state, mobileNumber){
			state.mobileNumber = mobileNumber;
		},
		setEmail(state, email){
			state.email = email;
		},
		setWhiteListedChatUsers(state, whiteListedChatUsers){
			//state.whiteListedChatUsers = whiteListedChatUsers;
			state.whiteListedChatUsers = [];
			var uniqueGroupsIds = [];
			var uniqueChattersIds = [];
			//DeDup
			for(var i = 0; i < whiteListedChatUsers.length; i++){
				if(whiteListedChatUsers[i].isGroup){
					if(uniqueGroupsIds.indexOf(whiteListedChatUsers[i].groupId) === -1) {
	  					state.whiteListedChatUsers.push(whiteListedChatUsers[i]);
	  					uniqueGroupsIds.push(whiteListedChatUsers[i].groupId);
					}
				}
				else{
					if(uniqueChattersIds.indexOf(whiteListedChatUsers[i].id) === -1) {
	  					state.whiteListedChatUsers.push(whiteListedChatUsers[i]);
	  					uniqueChattersIds.push(whiteListedChatUsers[i].id);
					}
				}

			}
			//Sort acc to lastMessageTime
			state.whiteListedChatUsers.sort(function(a, b) {
				return (b.lastMessageTime - a.lastMessageTime);
			});

		},

		setChatUser(state, chatUser){
			state.chatUser = chatUser;
		},
		setChatUserMessage(state, m){
			for(var i = 0; i < state.whiteListedChatUsers.length; i++){

				if((state.whiteListedChatUsers[i].isGroup && state.whiteListedChatUsers[i].groupId === m.id)||(!state.whiteListedChatUsers[i].isGroup && state.whiteListedChatUsers[i].id === m.id)){
					state.whiteListedChatUsers[i].messages.push({'received':m.isReceived, 'message':m.mBean.message, 'time':m.time, 'senderFirstName':m.mBean.senderFirstName, 'senderLastName':m.mBean.senderLastName});
					state.whiteListedChatUsers[i].lastMessageTime = m.time;
					if(m.isReceived){
						if(state.whiteListedChatUsers[i].isGroup){
							if((state.chatUser === null) || (state.chatUser.groupId === null) || (state.chatUser.groupId !== m.id)){
								state.whiteListedChatUsers[i].unReadCount++;
							}
						}
						else{
							if((state.chatUser === null) || (state.chatUser.id === null) || (state.chatUser.id !== m.id)){
								state.whiteListedChatUsers[i].unReadCount++;
							}
						}
					}
					break;
				}

			}
			state.whiteListedChatUsers.sort(function(a, b) {
				return (b.lastMessageTime - a.lastMessageTime);
			});
		},
		setMessagesAsRead(state, currentChatUser){
			// var groupMatch = false;
			// var dmMatch = false;
			for(var i = 0; i < state.whiteListedChatUsers.length; i++){
				// groupMatch = ((currentChatUser.isGroup) &&
				// (state.whiteListedChatUsers[i].id ===
				// currentChatUser.groupId));
				// dmMatch = ((!currentChatUser.isGroup) &&
				// (state.whiteListedChatUsers[i].id === currentChatUser.id));

				if(
				 ((currentChatUser.isGroup) && (state.whiteListedChatUsers[i].groupId === currentChatUser.groupId))
				 ||
				 ((!currentChatUser.isGroup) && (state.whiteListedChatUsers[i].id === currentChatUser.id))
				){
				// if(groupMatch || dmMatch){
					state.whiteListedChatUsers[i].unReadCount = 0;
					break;
				}




				// if(state.whiteListedChatUsers[i].id === currentChatUser.id){
				// state.whiteListedChatUsers[i].unReadCount = 0;
				// break;
				// }
			}
		},
		setOnlineChatUsers(state, onlineChatUsers){
			for(var i = 0; i < state.whiteListedChatUsers.length; i++){
				for(var j = 0; j < onlineChatUsers.length; j++){
					if(state.whiteListedChatUsers[i].id === onlineChatUsers[j].id){
						state.whiteListedChatUsers[i].isOnline = onlineChatUsers[j].isOnline;
					}
				}
			}
		},

		setMoreMessages(state, moreMessages){

			for(var i = 0; i < state.whiteListedChatUsers.length; i++){
				if(state.whiteListedChatUsers[i].id === moreMessages.id){
					state.whiteListedChatUsers[i].messages = moreMessages.payLoad.concat(state.whiteListedChatUsers[i].messages);
					break;
				}
			}

		},

		setNewGroup(state, group){
			var c = 0;
			state.whiteListedChatUsers.forEach(function(wlGroup){
  				if(wlGroup.isGroup){
  					if(wlGroup.groupId == group.groupId){
  						c++;
  					}
  				}
			});
			if(c == 0){
				state.whiteListedChatUsers.push(group);
				state.whiteListedChatUsers.sort(function(a, b) {
					return (b.lastMessageTime - a.lastMessageTime);
				});
			}
		},

		setNewChatter(state, chatter){
			var c = 0;
			state.whiteListedChatUsers.forEach(function(wlUser){
  				if(!wlUser.isGroup){
  					if(wlUser.id == chatter.id){
  						c++;
  					}
  				}
			});
			if(c == 0){
				state.whiteListedChatUsers.push(chatter);
				state.whiteListedChatUsers.sort(function(a, b) {
					return (b.lastMessageTime - a.lastMessageTime);
				});
			}
		},


		setProjectInfo(state , projectInfo){
		  state.projectInfo = projectInfo;
		},
		setAdminProjecLeadInfo(state , adminProjecLeadInfo){
		  state.adminProjecLeadInfo = adminProjecLeadInfo;
		},
		setDevProjectInfo(state, devProjectInfo){
		  state.devProjectInfo = devProjectInfo;
		},
		setUsersToGroup(state , group){
			for(var i = 0; i < state.whiteListedChatUsers.length; i++){
				if(state.whiteListedChatUsers[i].groupId === group.groupId){
					state.whiteListedChatUsers[i].memberArray = state.whiteListedChatUsers[i].memberArray.concat(group.memberArray);
					break;
				}
			}
		},

		setAllChatUsersOffline(state){
			for(var i = 0; i < state.whiteListedChatUsers.length; i++){
				if(!state.whiteListedChatUsers[i].isGroup){
					state.whiteListedChatUsers[i].isOnline = false;
				}
			}
		},

		setProjectTaskList(state , projectTaskList){

		    state.projectTaskList = projectTaskList;
				state.backlogList=[];
				state.completedByDeveloperList = [];
				state.workInProgressList = [];
				state.verifiedList = [];

			if(state.projectTaskList.taskList != null){
				 var task;
				for(task of state.projectTaskList.taskList){

					if(task.taskStatus === 'CREATED' || task.taskStatus === 'ASSIGNED'){
						state.backlogList.push(task);
					}else if(task.taskStatus === 'WORK_IN_PROGRESS'){
						 state.workInProgressList.push(task);
					}else if(task.taskStatus === 'COMPLETED_BY_DEVELOPER'){
						 state.completedByDeveloperList.push(task);
					}else if(task.taskStatus === 'APPROVED_BY_PM'){
						state.verifiedList.push(task);
					}

				}

				state.backlogList.sort(function(firstTask, secondtask) {
				return (secondtask.taskId - firstTask.taskId);
				});
				state.workInProgressList.sort(function(firstTask, secondtask) {
					return (secondtask.taskId - firstTask.taskId);
				});
				state.completedByDeveloperList.sort(function(firstTask, secondtask) {
					return (secondtask.taskId - firstTask.taskId);
				});
				state.verifiedList.sort(function(firstTask, secondtask) {
					return (secondtask.taskId - firstTask.taskId);
        });
		 }
		},

		setTaskToProject(state, task){

			if(state.projectTaskList.projectId === task.projectId && state.projectTaskList.taskList){
				var match = false;
				for(var i = 0; i < state.projectTaskList.taskList.length; i++){
					if(state.projectTaskList.taskList[i].taskId === task.taskId){
						state.projectTaskList.taskList[i] = task;
						match = true;
						break;
					}
				}
				if(!match){
					state.projectTaskList.taskList.push(task);
				}

				state.backlogList=[];
				state.completedByDeveloperList = [];
				state.workInProgressList = [];
				state.verifiedList = [];

				if(state.projectTaskList.taskList != null){
  				 var task;
  				for(task of state.projectTaskList.taskList){

  					if(task.taskStatus === 'CREATED' || task.taskStatus === 'ASSIGNED'){
  						state.backlogList.push(task);
  					}else if(task.taskStatus === 'WORK_IN_PROGRESS'){
  						 state.workInProgressList.push(task);
  					}else if(task.taskStatus === 'COMPLETED_BY_DEVELOPER'){
  						 state.completedByDeveloperList.push(task);
  					}else if(task.taskStatus === 'APPROVED_BY_PM'){
  						state.verifiedList.push(task);
  					}

  				}
				}
  				state.backlogList.sort(function(firstTask, secondtask) {
  				return (secondtask.taskId - firstTask.taskId);
  				});
  				state.workInProgressList.sort(function(firstTask, secondtask) {
  					return (secondtask.taskId - firstTask.taskId);
  				});
  				state.completedByDeveloperList.sort(function(firstTask, secondtask) {
  					return (secondtask.taskId - firstTask.taskId);
  				});
  				state.verifiedList.sort(function(firstTask, secondtask) {
  					return (secondtask.taskId - firstTask.taskId);
          });
		   }
		 },


		setTaskArrayToProject(state, obj){
			if(state.projectTaskList.projectId === obj.projectId){
				for(var j=0; j<obj.payLoad.length; j++){
					var match = false;
					if(state.projectTaskList.taskList && state.projectTaskList.taskList != null){

					for(var i = 0; i < state.projectTaskList.taskList.length; i++){
						if(state.projectTaskList.taskList[i].taskId === obj.payLoad[j].taskId){
							if(!(obj.payLoad[j].taskStatus === 'SOFT_DELETED' || obj.payLoad[j].taskStatus === 'CANCELLED')){
								state.projectTaskList.taskList[i] = obj.payLoad[j];
							}else{
							state.projectTaskList.taskList.splice(i,1);
							}
							match = true;
							break;
						}
					}
					if(!match){
						state.projectTaskList.taskList.push(obj.payLoad[j]);
					}
				}else{
					state.projectTaskList.taskList = [];
					state.projectTaskList.taskList.push(obj.payLoad[j]);
				}
        }
					state.backlogList=[];
					state.completedByDeveloperList = [];
					state.workInProgressList = [];
					state.verifiedList = [];
					if(state.projectTaskList.taskList != null){
						 var task;
						for(task of state.projectTaskList.taskList){

							if(task.taskStatus === 'CREATED' || task.taskStatus === 'ASSIGNED'){
								state.backlogList.push(task);
							}else if(task.taskStatus === 'WORK_IN_PROGRESS'){
								 state.workInProgressList.push(task);
							}else if(task.taskStatus === 'COMPLETED_BY_DEVELOPER'){
								 state.completedByDeveloperList.push(task);
							}else if(task.taskStatus === 'APPROVED_BY_PM'){
								state.verifiedList.push(task);
							}

						}
          }
						state.backlogList.sort(function(firstTask, secondtask) {
						return (secondtask.taskId - firstTask.taskId);
						});
						state.workInProgressList.sort(function(firstTask, secondtask) {
							return (secondtask.taskId - firstTask.taskId);
						});
						state.completedByDeveloperList.sort(function(firstTask, secondtask) {
							return (secondtask.taskId - firstTask.taskId);
						});
						state.verifiedList.sort(function(firstTask, secondtask) {
							return (secondtask.taskId - firstTask.taskId);
						});

			}
		},

  // developer setting task list

   setDeveloperTaskList(state, developerTaskList){
       state.developerTaskList= [];
		   state.developerTaskList = developerTaskList;
			 state.developerOwnBacklogList=[];
			 state.developerOtherBacklogList=[];
       state.developerWorkInProgressList = [];
			 state.developerCompletedByDeveloperList = [];
			 state.developerVerifiedList = [];

		 if(state.developerTaskList && state.developerTaskList.taskList != null){
				var task;
			 for(task of state.developerTaskList.taskList){
				 if(task.taskStatus === 'CREATED' || task.taskStatus === 'ASSIGNED'){
          if(task.appUserId === state.loggedInUser.appUserId){
						 state.developerOwnBacklogList.push(task);
					}else{
						 state.developerOtherBacklogList.push(task);
					}
				}else if(task.taskStatus === 'WORK_IN_PROGRESS'){
					state.developerWorkInProgressList.push(task);
				}else if(task.taskStatus === 'COMPLETED_BY_DEVELOPER'){
					state.developerCompletedByDeveloperList.push(task);
				}else if(task.taskStatus === 'APPROVED_BY_PM'){
					state.developerVerifiedList.push(task);
				}

			 }

			 state.developerOtherBacklogList.sort(function(firstTask, secondtask) {
				 return (secondtask.taskId - firstTask.taskId);
			 });
			 state.developerOwnBacklogList.sort(function(firstTask, secondtask) {
				 return (secondtask.taskId - firstTask.taskId);
			 });
			 state.developerWorkInProgressList.sort(function(firstTask, secondtask) {
				 return (secondtask.taskId - firstTask.taskId);
			 });
			 state.developerCompletedByDeveloperList.sort(function(firstTask, secondtask) {
				 return (secondtask.taskId - firstTask.taskId);
			 });
			 state.developerVerifiedList.sort(function(firstTask, secondtask) {
				 return (secondtask.taskId - firstTask.taskId);
			 });

			 }
	 },
// updating and adding the developer task

  setDeveloperTaskToProject(state, taskObject){
	if(state.developerTaskList.projectId === taskObject.projectId){
		var match = false;
		for(var i = 0; i < state.developerTaskList.taskList.length; i++){
			if(state.developerTaskList.taskList[i].taskId === taskObject.taskId){
				state.developerTaskList.taskList[i] = taskObject;
				match = true;
				break;
			}
		}
		if(!match){
			state.developerTaskList.taskList.push(taskObject);
		}
		state.developerOwnBacklogList=[];
		state.developerOtherBacklogList=[];
		state.developerWorkInProgressList = [];
		state.developerCompletedByDeveloperList = [];
		state.developerVerifiedList = [];
		for(var task of state.developerTaskList.taskList){
			 	 if(task.taskStatus === 'CREATED' || task.taskStatus === 'ASSIGNED'){
			 		if(task.appUserId === state.loggedInUser.appUserId){
			 			 state.developerOwnBacklogList.push(task);
			 		}else{
			 			 state.developerOtherBacklogList.push(task);
			 		}
			 	}else if(task.taskStatus === 'WORK_IN_PROGRESS'){
			 		state.developerWorkInProgressList.push(task);
			 	}else if(task.taskStatus === 'COMPLETED_BY_DEVELOPER'){
			 		state.developerCompletedByDeveloperList.push(task);
			 	}else if(task.taskStatus === 'APPROVED_BY_PM'){
			 		state.developerVerifiedList.push(task);
			 	}

	  }

		  state.developerOtherBacklogList.sort(function(firstTask, secondtask) {
		 	 return (secondtask.taskId - firstTask.taskId);
		  });
		  state.developerOwnBacklogList.sort(function(firstTask, secondtask) {
		 	 return (secondtask.taskId - firstTask.taskId);
		  });
		  state.developerWorkInProgressList.sort(function(firstTask, secondtask) {
		 	 return (secondtask.taskId - firstTask.taskId);
		  });
		  state.developerCompletedByDeveloperList.sort(function(firstTask, secondtask) {
		 	 return (secondtask.taskId - firstTask.taskId);
		  });
		  state.developerVerifiedList.sort(function(firstTask, secondtask) {
		 	 return (secondtask.taskId - firstTask.taskId);
		  });
  }
},


setDeveloperTaskArrayToProject(state, obj){
	if(state.developerTaskList && state.developerTaskList.projectId === obj.projectId){

		for(var j=0; j<obj.payLoad.length; j++){
     if(state.developerTaskList.taskList && state.developerTaskList.taskList != null){

			var match = false;
			for(var i = 0; i < state.developerTaskList.taskList.length; i++){
				if(state.developerTaskList.taskList[i].taskId === obj.payLoad[j].taskId){

					if(!(obj.payLoad[j].taskStatus === 'SOFT_DELETED' || obj.payLoad[j].taskStatus === 'CANCELLED')){
						state.developerTaskList.taskList[i] = obj.payLoad[j];
					}

					state.developerTaskList.taskList[i] = obj.payLoad[j];
					match = true;
					break;
				}
			}
			if(!match){
				state.developerTaskList.taskList.push(obj.payLoad[j]);
			}
		}else{
			state.developerTaskList.taskList = [];
			state.developerTaskList.taskList.push(obj.payLoad[j]);
		}
		}

		state.developerOwnBacklogList=[];
		state.developerOtherBacklogList=[];
		state.developerWorkInProgressList = [];
		state.developerCompletedByDeveloperList = [];
		state.developerVerifiedList = [];
		for(var task of state.developerTaskList.taskList){
				 if(task.taskStatus === 'CREATED' || task.taskStatus === 'ASSIGNED'){
					if(task.appUserId === state.loggedInUser.appUserId){
						 state.developerOwnBacklogList.push(task);
					}else{
						 state.developerOtherBacklogList.push(task);
					}
				}else if(task.taskStatus === 'WORK_IN_PROGRESS'){
					state.developerWorkInProgressList.push(task);
				}else if(task.taskStatus === 'COMPLETED_BY_DEVELOPER'){
					state.developerCompletedByDeveloperList.push(task);
				}else if(task.taskStatus === 'APPROVED_BY_PM'){
					state.developerVerifiedList.push(task);
				}

		}

			state.developerOtherBacklogList.sort(function(firstTask, secondtask) {
			 return (secondtask.taskId - firstTask.taskId);
			});
			state.developerOwnBacklogList.sort(function(firstTask, secondtask) {
			 return (secondtask.taskId - firstTask.taskId);
			});
			state.developerWorkInProgressList.sort(function(firstTask, secondtask) {
			 return (secondtask.taskId - firstTask.taskId);
			});
			state.developerCompletedByDeveloperList.sort(function(firstTask, secondtask) {
			 return (secondtask.taskId - firstTask.taskId);
			});
			state.developerVerifiedList.sort(function(firstTask, secondtask) {
			 return (secondtask.taskId - firstTask.taskId);
			});

  }
},

		setSocketNotificationList(state,notificationList){
			var isNeedToAdd = true;
			if(notificationList){
				var notification='';
			for (notification of notificationList) {
				if((notification.appUserId === state.loggedInUser.appUserId) && (notification.role === state.loggedInUser.role)){
					for (var not of state.notificationList) {
						if(not.notificationId === notification.notificationId){
							isNeedToAdd = false;
							break;
						}
					}
					if(isNeedToAdd){
						state.notificationList.push(notification);
					}
				}
			}
		 }
		},
	setNotificationList(state,notificationList){
      state.notificationList = notificationList;
	},
	updateNotificationList(state,index){
		var notification = state.notificationList[index];
		notification.isRead = true;
		state.notificationList.splice(index, 1, notification);
		//state.notificationList[index] = notification;
	},
		refreshState(state){
			state.SERVER_URL = 'http://localhost:8084';
			state.FILEBOX_URL='http://localhost:8082'
			state.CHATBOX_URL = 'http://localhost:8888';
			state.GOOGLE_CLIENT_ID = '618723682862-qmup80trsk4ho035v4ln1vc3vk2nu3el.apps.googleusercontent.com';
			state.GOOGLE_CAPTCHA_ID = '6Ld67ykUAAAAAEU2vfelmPLwDtzyeIKTeGGUvCdB';
		},
		clearState(state){
			state.spinner=false;
			state.isPoHavingManagerForProjectLead=false;
			state.loggedInUser = {};
			state.postLoginURL = '';
			state.devloperWizardStep=1;
			state.mobileNumber='';
			state.email='',
			state.forgotEmail='';
			state.whiteListedChatUsers = [];
			state.chatUser = {};
			state.projectInfo={};
			state.devProjectInfo={};
			state.adminProjecLeadInfo= {};
			state.projectTaskList={};
			state.backlogList=[];
			state.workInProgressList=[];
			state.completedByDeveloperList=[];
			state.verifiedList=[];
			state.developerTaskList={};
			state.developerOwnBacklogList=[];
			state.developerOtherBacklogList=[];
			state.developerWorkInProgressList=[];
			state.developerCompletedByDeveloperList=[];
			state.developerVerifiedList=[];
			state.notificationList=[];
		}
	},

	plugins: [createPersistedState()]
});
