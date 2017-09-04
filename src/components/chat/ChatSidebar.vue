
<template>
<div>

<div id="chatSidebar">
	<div class="messagesCount" v-if="whiteListedChatUsers.length > 0">

		<span class="comment_Icon"><i class="fa fa-comments-o" aria-hidden="true"></i></span>
		<span class="Chart_h">Chat</span>
		<span class="chatAvailable" v-if="this.$root.stompClient.connected"><i class="chat-status-pos">Online</i></span>
		<span class="chatUnavailable" v-else><i class="chat-status-pos">Offline</i></span>


		<span class="badge badge-pill heading-badge" v-if="totalUnreadCount>0">{{totalUnreadCount}}</span>

		<span v-if="(this.role=='PROJECT_MANAGER') || (this.role=='ADMIN')" class="Chart_h pull-right" @click="newGroup()"><i class="fa fa-users" aria-hidden="true"></i>+</span>

	</div>


	<div class="searchName">
		<div id="imaginary_container">
			<div class="input-group stylish-input-group search-oval-border" v-if="whiteListedChatUsers.length > 5">


					<input type="text" class="form-control" placeholder="Search" v-model="searchIndex">
					<span class="input-group-addon">
						<button type="submit">
							<span class=""><i class="fa fa-search color-orange" aria-hidden="true"></i></span>
						</button>
					</span>


			</div>
		</div>
	</div>


	<ul class="scroll_ul">

		<li class="inner_chat_items" v-for="wlUser in whiteListedChatUsers" @click="openModal(wlUser)" v-show="searchResult(wlUser)">
		  <span class="li_image">
			<div v-if="wlUser.isGroup">
				 <img style="width: 40px; height: 40px;" src="/src/assets/images/group-icon.png"/>
			</div>
			<div v-else>
				<!-- <img :src="'https://api.adorable.io/avatars/200/'+wlUser.email" /> -->
				<img :src="$store.state.SERVER_URL+'/get-profile-pic/'+wlUser.id" />
				<div class="available" v-if="wlUser.isOnline"></div>
				<div class="unavailable" v-else></div>
			</div>
		  </span>
		  <span class="li_content">
			  <div v-if="wlUser.isGroup">
				  <p>{{wlUser.name}}</p>
			  </div>
			  <div v-else>
				  <p>{{wlUser.firstName}} {{wlUser.lastName}}</p>
				  <p>{{wlUser.email}}</p>
			  </div>
			  <span class="span-count" v-if="wlUser.unReadCount>0">{{wlUser.unReadCount}}</span>
		  </span>

		</li>


	 </ul>

</div>








</div>
</template>



<script>


	export default{
		data(){
			return{
				'searchIndex': '',
				'role': this.$store.getters.getLoggedInUser.role,
			}
		},
		mounted: function(){

		},
		methods:{
			openModal:function(chatUser){
				this.$store.commit('setChatUser', chatUser);
				var app = this;
				//$('#chat-inner').html('');
				$('#chat-text-message').html('');
				$('#chatModal')
				.on('shown.bs.modal', function() {
					var d = $('.chatboxout');
					d.scrollTop(d.prop("scrollHeight"));


					var chatterId = '';
					if(chatUser.isGroup){
						chatterId = chatUser.groupId;
					}
					else{
						chatterId = chatUser.id;
					}

					//console.log('Marking Messages As Seen !');
					app.$store.commit('setMessagesAsRead', chatUser);
					app.$root.stompClient.send("/chatbox-destination/mark-all-as-read", {}, JSON.stringify({
						'xAuth': app.$cookie.get('X-Authorization'),
						'senderId': chatterId,
						'isGroup' : chatUser.isGroup
					}));
				})
				.modal('show');
			},
			newGroup: function(){
				$('#newGroupModal').modal('show');
			},
			searchResult: function(wlUser){
				var app = this;
				var srIndex = app.searchIndex.trim();
				if(srIndex === ''){
					return true;
				}
				var fullStr = '';
				if(wlUser.isGroup){
					fullStr = wlUser.name;
				}
				else{
					fullStr = wlUser.firstName+wlUser.lastName+wlUser.email;
				}
				var patt = new RegExp(srIndex.toLowerCase());
				return patt.test(fullStr.toLowerCase());
			}
		},
		computed: {
			whiteListedChatUsers: function(){
				return this.$store.getters.getWhiteListedChatUsers;
			},
			totalUnreadCount: function(){
				var count = this.$store.getters.getTotalUnreadCount;
				if(count == 0){
					return '';
				}
				else{
					return count;
				}
			},
		},
	}
</script>










<style scoped="true">

#chatModal{

	position: absolute;
	top: 10px;
	right: 100px;
	bottom: 10px;
	left: 100px;
	z-index: 10040;
	overflow: auto;
	overflow-y: auto;
}
.search-oval-border .form-control{border:none !important;border-radius:25px !important;}
.search-oval-border .input-group-addon{border:none !important;border-radius:25px !important;}
.search-oval-border{border-radius:25px;border:2px solid #e7714d;}

#chatSidebar{
	width:100%;
	height:100%;
	}
#chatSidebar ul{
	padding:0; margin:0;
	list-style-type: none;
	}
#chatSidebar li{
	font-size:13px;
	}
#chatSidebar li:hover{
/*    background-color:rgba(0,0,0,0.1);*/
cursor: pointer;
	}
#chatSidebar li a{
	padding:8px 16px; color:#777; text-decoration:none; display:block;
	}
#chatSidebar li img {
	width: 32px;
	height: 32px;
	border-radius: 100%;
	margin-right: 10px;
}
.personsList li:hover, .generalChartBox li:hover {
   /* background: #ddd;
	border-left: 2px solid red;*/
}
.messagesCount {
	/* border: 1px solid #f5f5f5; */
	padding: 15px 15px;
}
.messagesCount span.comment_Icon {
	display: inline-block;
}
.messagesCount span {
	color: #d54f26;
	font-size: 18px;
	display: inline-block;
}
#imaginary_container{
	margin-top:0%; /* Don't copy this */
		margin-bottom: 2%;
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
  .searchName .input-group {
	position: relative;
	display: table;
	border-collapse: separate;
	width: 88%;
	margin:0 auto;
	  }
   div#chatSidebar ul {
	/*overflow-y: hidden !important;*/
	overflow-x: hidden;
	height: 37vh;
}
   div#chatSidebar ul:hover{
	 overflow-y: auto;
   }
	.searchName .input-group .form-control:first-child{
	border-radius: 0px;
	}
	.searchName span.input-group-addon {
   border-radius: 0px;
}
	.friend {
	height: auto;
		padding: 6px;
	border-bottom: 1px solid #e7ebee;
	position: relative;
		display: inline-block;
	width: 100%;
}
	.friend img {
	width: 40px;
	border-radius: 50%;
	margin: 8px 4px;
	float: left;
}
   .friend p {
	padding: 7px 0 0 0;
	float: left;
	width: 150px !important;
	overflow: hidden;
	text-overflow: ellipsis;
}
 .available {
	background: #26c281;
	border-radius: 50%;
	width: 15px;
	height: 15px;
	position: absolute;
	top: 60%;
		left: 50%;
	border: 2px solid #fff;
}

 .unavailable{
	background: #f00;
	border-radius: 50%;
	width: 15px;
	height: 15px;
	position: absolute;
	top: 60%;
		left: 50%;
	border: 2px solid #fff;
}


 .chatAvailable {
	background: #26c281;
	border-radius: 50%;
	width: 15px;
	height: 15px;
	position: relative;
	top: 25px;
	left:-64px;
	border: 2px solid #fff;
}

.chatUnavailable {
	background: #f00;
	border-radius: 50%;
	width: 15px;
	height: 15px;
	position: relative;
	left: -64px;
	top: 25px;
	border: 2px solid #fff;
}

.chat-status-pos{
		font-size: 12px;
    color: #a9a9a9;
    position: relative;
    left: 15px;
    top: -9px;
}

	.searchName input{
		height: 25px !important;
	}
 .searchName .input-group-addon {
	padding: 3px 12px;
	}

	.badge{
	   	background-color: #d54f26;
		position: absolute;
		top: 36%;
		right: 28px;
		font-size: 14px !important;
		padding: 4px 7px;
		z-index: 100;
			/*font-size: 10px !important;*/
	}



	.heading-badge{
	position: relative;
	top: -2px;
	right: -1px;
	color: white !important;
	}




	.email-span{
		  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
		margin-bottom: 0px;
		padding-top: 0px !important;
	}



</style>
