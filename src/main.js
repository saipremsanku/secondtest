import Vue from 'vue';
import VueRouter from 'vue-router';
import VueSweetAlert from 'vue-sweetalert';

import VeeValidate from 'vee-validate';
// import store from './store/store.js'

import App from './App.vue';
import HomePage from './HomePage.vue';
import POSignUpPage from './POSignUp.vue';
import PostLoginComponent from './PostLoginComponent.vue';
import projects from './projects.vue';
import requestedForm from './requestedForm.vue';
import step from './steps.vue';
import milestone from './milestone.vue';
import PODashboard from './PODashboard.vue';
import ProductOwnerInvoice from './components/productOwner/ProductOwnerInvoice.vue';
import AdminInvoice from './components/admin/AdminInvoice.vue';
import userVerification from './userVerification.vue';
import  ForgotPassword from './components/public/ForgotPassword.vue';
import  ResetPasswordMsg from './components/public/SendMailMsg.vue';
import ResetPassword from './components/public/ResetPassword.vue';
import ChangePassword from './components/public/ChangePassword.vue';
import LandingPage from './components/public/LandingPage.vue';
import ForgotPassSuccessMsg from './components/public/ForgotPassSuccessMsg.vue';


import FinanceUserdashboard from './components/FinanceUser/FinanceUserdashboard.vue';

import Notifications from './components/public/Notifications.vue';

import FeedBack from './components/public/FeedBack.vue';

import PMDashboard from './PMDashboard.vue';
import ProjectTaskAnalysis from './components/projectManager/ProjectTaskAnalysis.vue';
import PMTaskLibrary from './components/projectManager/TaskLibrary.vue';

import POUATIssue from './components/productOwner/UATIssue.vue';
import ReleaseManagement from './components/productOwner/ReleaseManagement.vue';

import proposals from './Proposals.vue';

import epic from './epicWorkStatus.vue';
import login from './login.vue';
import pm from './pmPage.vue';
import PMepic from './Epic.vue';
import POepic from './POEpic.vue';
import price from './price.vue';
import {store} from './store/store'
import Draggable from 'vuedraggable';
import projectManager from './ProjectManager.vue';
import financeManager from './FinanceManager.vue';
import AdminSetting from './AdminSetting.vue';
import AdminDashBoard from './AdminDashBoard.vue'
import AdminProjectRequirement from  './AdminProjectRequirement.vue'
import  POMilestone from   './POMilestone.vue'
import  POProposal from   './POProposal.vue'
import POPrice from  './POPrice.vue';
import AdminCoupon from './AdminCoupon.vue'
import AdminProductOwner from './components/admin/ProductOwner.vue'
import AdminProductOwnerProfile from './components/admin/ProductOwnerProfile.vue'
import ProjectManagerProfile from './components/admin/ProjectManagerProfile.vue'
import MasterAgreement from './components/admin/MasterAgreement.vue'

import UpdateProfile from './UpdateProfile.vue'


import DeveloperWizard from  './components/developer/DeveloperWizard.vue'
import DevloperSignUp from './components/developer/DeveloperSingUp.vue'
import DeveloperDashboard from  './components/developer/DeveloperDashBoard.vue'
import ChatMessages from  './components/chat/ChatMessages.vue'
import developerCoupon from './components/developer/CouponCode.vue'
import DeveloperBacklog from './components/developer/DeveloperBacklog.vue'
import DeveloperTaskBoard from './components/developer/DeveloperTaskBoard.vue'
import DeveloperTaskLibrary from './components/developer/DeveloperTaskLibrary.vue'


import developerInfo from './components/admin/developerInfo.vue'
import DeveloperReports from './components/admin/DeveloperReports.vue'
import UserActivity from './components/admin/UserActivity.vue'
import SmsActivity from './components/admin/SmsActivity.vue'
import EmailActivity from './components/admin/EmailActivity.vue'
import Team from './components/admin/Team.vue'
import AdminDeveloperProfile from './components/admin/AdminDeveloperProfile.vue'
import TaskCard from './components/projectManager/TaskCard.vue'

import TestChat from  './components/chat/TestChat.vue'

import ProductOwnerProfile from './components/projectManager/ProductOwnerProfile.vue'
import POTaskBoard from './components/productOwner/POTaskBoard.vue';
import GSignInButton from 'vue-google-signin-button';
import FBSignInButton from 'vue-facebook-signin-button'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueClip from 'vue-clip'
 import VueTouchRipple from 'vue-touch-ripple'
import moment from 'moment'
 import VTooltip from 'v-tooltip'

 import vueSmoothScroll from 'vue-smooth-scroll'
Vue.use(vueSmoothScroll)

 import Element from 'element-ui'

 import FeedBackDetails from './components/admin/FeedBackDetails.vue';
 import Intl from 'intl';

 import QualityAssurance from './components/productOwner/QualityAssurance.vue';
 import ToggleButton from 'vue-js-toggle-button';
  Vue.use(ToggleButton)

  Vue.use(Element)
Vue.use(Intl);

// import 'chart.js';
// import 'hchs-vue-charts';
//
// Vue.use(window.VueCharts);
import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'
import { Photoshop } from 'vue-color'

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

Vue.use(VueChartkick, { Chartkick })

 Vue.use(VTooltip)


Vue.use(VueTouchRipple)



Vue.use(VueClip)


Vue.use(VueAxios, axios)


var VueCookie = require('vue-cookie');


var VueResource = require('vue-resource');
var draggable = require('vuedraggable')
Vue.use(VeeValidate);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueSweetAlert);
Vue.use(Draggable);

Vue.use(VueCookie);

Vue.use(GSignInButton)
Vue.use(FBSignInButton)

var cron = require('node-cron');

//var Stomp = require('stompjs');
var Stomp = require("stompjs/lib/stomp.js").Stomp;
var SockJS = require('sockjs-client');

const routes = [
  {path: '/',component:LandingPage},
	{path:'/home',component:HomePage},
	{path:'/login',component:login},
	{path:'/logout',component:HomePage},
	{path:'/post-login',component:PostLoginComponent},
	{path:'/product-owner/sign-up',component:POSignUpPage},
	{path:'/verify-user',component:userVerification},
	{path:'/verify-email/:id/:emailConfirmationKey', component:userVerification},
    {path:'/profile' , component:UpdateProfile},
    {path:'/forgot-password', component:ForgotPassword},
    {path:'/reset-password-message/:email', component:ResetPasswordMsg},
	{path:'/reset-password/:id/:emailConfirmationKey', component:ResetPassword},
	{path: '/change-password', component:ChangePassword},
    {path: '/forgot-password-success-msg/:email', component:ForgotPassSuccessMsg},

    {path: '/all-notification', component:Notifications},



	{path:'/product-owner/dashboard', component:PODashboard},
  {path:'/product-owner/invoice', component:ProductOwnerInvoice},
  {path:'/:admin/invoice', component:AdminInvoice},
	{path:'/product-owner/new-project', component:requestedForm},
	{path:'/product-owner/project-request/:projectLeadId', component:requestedForm},
	{path: '/product-owner/get-epics/:projectRequestId',component: POepic},
	 {path: '/project-owner/project-milestones/:projectRequestId',component: POMilestone},

	 {path: '/project-owner/project-proposals/:projectRequestId',component: POProposal},
	 {path:'/project-owner/project-commercials/:projectRequestId' , component:POPrice},
	 {path: '/product-owner/get-messages' , component:ChatMessages},
   {path: '/product-owner/uat-issue/:projectRequestId',component:POUATIssue},
   {path: '/product-owner/release-management/:projectRequestId',component:ReleaseManagement},
   {path: '/product-owner/quality-assurance/:projectRequestId',component:QualityAssurance},
   {path:'/product-owner/task-board/:projectRequestId', component: POTaskBoard},

  {path:'/fm/dashboard', component:FinanceUserdashboard},
	{path:'/ceo/dashboard', component:PMDashboard},
  {path:'/:ceo/project-task-analysis/:projectRequestId', component:ProjectTaskAnalysis},

	{path:'/:ceo/project-request/:projectLeadId', component:requestedForm},

	{path:'/:ceo/project-backlog/:projectRequestId', component:PMepic},
	{path:'/:ceo/project-milestones/:projectRequestId',component:milestone},
	{path:'/:ceo/project-commercials/:projectRequestId' , component:price},
	{path:'/:ceo/project-proposals/:projectRequestId' , component:proposals},
	{path:'/:ceo/project-task-board/:projectRequestId', component:TaskCard},
	{path:'/:ceo/test-library/:projectRequestId' , component:PMTaskLibrary},
  {path:'/:ceo/project-mananger-profile/:projectMangerId',component: ProjectManagerProfile},
	{path:'/product-manager/product-owner-profile/:productOwnerId', component: ProductOwnerProfile},
  {path:'/admin/product-owner-profile/:productOwnerId',component:AdminProductOwnerProfile},




	// {path:'/step',component:step},
	// {path:'/epic',component:epic},
	// {path:'/quotations',component:quotations},
	// {path:'/pm',component:pm},
	// {path:'/price', component:price},

	{path: '/admin/ceo' , component:projectManager},
  {path: '/admin/fm' , component:financeManager},
	{path: '/admin/project-setting' , component:AdminSetting},
	{path: '/admin/dashboard' , component:AdminDashBoard},
	{path: '/admin/all-project-requirement' , component:AdminProjectRequirement},
	{path: '/admin/coupons' , component:AdminCoupon},
	{path: '/admin/developer-profile/:id' , component:AdminDeveloperProfile},
	{path: '/admin/get-messages' , component:ChatMessages},
    {path:'/admin/developer-info',component:developerInfo},
    {path:'/admin/developer-reports',component:DeveloperReports},
    {path:'/admin/userActivity',component:UserActivity},
    {path:'/admin/smsActivity',component:SmsActivity},
      {path:'/admin/emailActivity',component:EmailActivity},
	{path:'/admin/assign-developer/:id',component:Team},
     {path:'/admin/product-owner', component:AdminProductOwner},
     {path:'/admin/feedback', component:FeedBackDetails},
       {path:'/admin/master-agreement', component:MasterAgreement},
	{path: '/developer/task-board/:projectId', component:DeveloperTaskBoard},
    {path: '/developer/test-library',component:DeveloperTaskLibrary},



    {path:'/developer/sign-up',component:DevloperSignUp},
    {path: '/developer/profile' , component:DeveloperWizard},
    {path: '/developer/dashboard' , component:DeveloperDashboard},
    {path: '/developer/get-coupon' , component:developerCoupon},
    {path: '/test' , component:TestChat},
		{path: '/developer/backlog' , component:DeveloperBacklog},
    {path: '/feedback', component:FeedBack},
];

var publicRoutes = [
	'/','/logout','/login', '/product-owner/sign-up','/developer/sign-up','/forgot-password','/reset-password-message',
  '/reset-password/:id/:emailConfirmationKey','/change-password','/forgot-password-success-msg/:email'
];

const router = new VueRouter({
	routes,
	mode:'history',
	history:true
});

router.beforeEach((to, from, next) => {
	if(publicRoutes.indexOf(to.path) == -1){


    // if((store.getters.getIsPoHavingManagerForProjectLead) ||(store.getters.getLoggedInUser.role==="PROJECT_MANAGER" || store.getters.getLoggedInUser.role==="DEVELOPER" || store.getters.getLoggedInUser.role==="ADMIN" || store.getters.getLoggedInUser.role ==="FINANCE_USER")){
    //   console.log("call  root role area----");
    //   setTimeout(() => {
    //   drift.on('ready',function(api){
    //    api.widget.hide();
    //  });
    //  },1000);
    //
    // }

    // console.log("old router--",to);

	}
  // if((to.path ==='/login') || (to.path === '/')){
  //   setTimeout(() => {
  //   drift.on('ready',function(api){
  //    api.widget.show();
  //  });
  //  },1000);
  //
  // }
   next();
});






var app = new Vue({
	el: '#app',
	router,
	store,
	data(){
		return{
			stompClient: null,
			stompClientNotifications: null,
      isAdmin:'',
		}
	},
	mounted: function(){
		var thisApp = this;
		cron.schedule('*/10 * * * * *', function(){
			//console.log('running task every 10 secs');
			$.get('/version.txt', function(latestVer){
				var currentVer = thisApp.$store.getters.getVersion;
				//console.log(currentVer+'---'+latestVer);
				if(currentVer != latestVer){
					thisApp.$store.commit('setVersion', latestVer);
          caches.open('').then(function(cache) {
              cache.delete('').then(function(response) {
                 console.log('your cache entry has been deleted');
              });
          });
					if(currentVer.trim()!=''){
						//console.log('Refreshing to get latest version');
						window.location.href = '';
					}
				}
			});
      thisApp.startFileServer();

		});


	},
	created: function () {

		this.checkLoggedInUser();
      // this.isAdmin =

		//this.startSocket();
	},
	watch:{
	    '$route': function(newRoute, oldRoute) {
		      if(oldRoute.fullPath != newRoute.fullPath){
	         if( newRoute.fullPath.startsWith("/forgot-password-success-msg/") || newRoute.fullPath.startsWith("/reset-password-message/")){}
	        else if(!(this.$store.getters.getLoggedInUser && this.$store.getters.getLoggedInUser.xAuth)){
		          this.checkLoggedInUser();
		        }
		      }

		    },
		  },
	  route: {
	    canReuse: true,
	  },
    computed:{
      getAdminRole: function(){
        return this.$store.getters.getLoggedInUser.role;
      }

    },
	methods:{
    startFileServer: function(){
      var thisApp=this;
    if(thisApp.getAdminRole=='ADMIN'){
    thisApp.$http.get(
         thisApp.$store.state.FILE_URL+'/data/test',
          {

        }
      ).then((response) => {
      if(response.data.status === 'SUCCESS'){
              thisApp.$store.commit("setFileServer",true);

      }else{
               thisApp.$store.commit("setFileServer",false);
      }
      }, (response) => {
          thisApp.$store.commit("setFileServer",false);
      });
    }
  },

		startSocket: function(){
			var thisApp = this;
			var socket = new SockJS(this.$store.state.CHATBOX_URL+'/thrymr-chatbox-websocket');
			this.stompClient = Stomp.over(socket);
			this.stompClient.debug = () => {};
			this.stompClient.connect({'xAuth': thisApp.$cookie.get('X-Authorization')}, function (frame) {
				console.log('Chat Socket Connected To: ' + frame);
				thisApp.stompClient.subscribe('/chatbox-subscribe/receive-direct-message/'+thisApp.$cookie.get('X-Authorization'), function (response) {
					//console.log('Received Msg: '+JSON.parse(response.body));
					var parsedResponse = JSON.parse(response.body);

					if(parsedResponse.returnType === 'WHITE_LIST'){
						thisApp.$store.commit('setWhiteListedChatUsers', parsedResponse.payLoad);
					}

					// if(parsedResponse.returnType === 'WHITE_LIST_GROUPS'){
					// 	thisApp.$store.commit('setWhiteListedChatGroups', parsedResponse.payLoad);
					// }

					if(parsedResponse.returnType === 'DIRECT_MESSAGE'){
						thisApp.$store.commit('setChatUserMessage', {'isGroup': parsedResponse.isGroup, 'id': parsedResponse.id, 'isReceived':true, 'mBean':parsedResponse.payLoad, 'time': parsedResponse.timeInMillis});
					}

					if(parsedResponse.returnType === 'ONLINE_LIST'){
						thisApp.$store.commit('setOnlineChatUsers', parsedResponse.payLoad);
					}

					// if(parsedResponse.returnType === 'MORE_MESSAGES'){
					// 	thisApp.$store.commit('setMoreMessages', parsedResponse);
					// }


					if(parsedResponse.returnType === 'NEW_GROUP'){
						thisApp.$store.commit('setNewGroup', parsedResponse.payLoad);
					}

					if(parsedResponse.returnType === 'NEW_CHATTER'){
						thisApp.$store.commit('setNewChatter', parsedResponse.payLoad);
					}

				});

				thisApp.stompClient.send("/chatbox-destination/get-white-list", {}, JSON.stringify({
					'xAuth': thisApp.$cookie.get('X-Authorization'),
				}));


			}
				// ,function(message) {
				// 	// check message for disconnect
    			// 	console.log(message);
				// }
			);
		},

		startNotificationsSocket: function(){
			var thisApp = this;
			var socket = new SockJS(this.$store.state.SERVER_URL+'/the-platform-websocket');
			this.stompClientNotifications = Stomp.over(socket);
			this.stompClientNotifications.debug = () => {};
			this.stompClientNotifications.connect({'xAuth': thisApp.$cookie.get('X-Authorization')}, function (frame) {
				//console.log('Notifications Socket Connected To:---------------- ' + frame);
				thisApp.stompClientNotifications.subscribe('/the-platform-subscribe/receive-notification/'+thisApp.$cookie.get('X-Authorization'), function (response) {
          // console.log('Received Notifications Msg: '+JSON.parse(response.body));
					  var parsedResponse = JSON.parse(response.body);
						// console.log(parsedResponse);

					if(parsedResponse.returnType === 'TASK_LIST'){
            if(parsedResponse.role === 'PROJECT_MANAGER' || parsedResponse.role === 'PRODUCT_OWNER'){
              thisApp.$store.commit('setTaskArrayToProject', parsedResponse);
            }if(parsedResponse.role === 'DEVELOPER'){
              thisApp.$store.commit('setDeveloperTaskArrayToProject', parsedResponse);
            }
            if(parsedResponse.notificationList){
              thisApp.$store.commit('setSocketNotificationList',parsedResponse.notificationList);
            }
					}else if(parsedResponse.returnType === 'NOTIFICATION'){
						thisApp.$store.commit('setSocketNotificationList',parsedResponse.notificationList);
					}else if(parsedResponse.returnType === 'LOGOUT'){
            thisApp.$cookie.delete('X-Authorization');
            thisApp.$cookie.delete('role');
            thisApp.$cookie.delete('isMobileVerified');
            thisApp.$cookie.delete('isEmailVerified');

            thisApp.$store.commit('clearState');
            thisApp.$router.push('/login');
					}else if(parsedResponse.returnType === 'SMS'){
            thisApp.$store.commit('setSmsCount',parsedResponse.payLoad);
          }

					// if(parsedResponse.returnType === 'WHITE_LIST_GROUPS'){
					// 	thisApp.$store.commit('setWhiteListedChatGroups', parsedResponse.payLoad);
					// }

					// if(parsedResponse.returnType === 'MORE_MESSAGES'){
					// 	thisApp.$store.commit('setMoreMessages', parsedResponse);
					// }

				});

				// thisApp.stompClient.send("/chatbox-destination/get-white-list", {}, JSON.stringify({
				// 	'xAuth': thisApp.$cookie.get('X-Authorization'),
				// }));

			});
		},


		checkLoggedInUser:function(){





			if(publicRoutes && publicRoutes.indexOf(this.$route.path) == -1){

        //console.log(this.$route.path+"===================="+this.$route.path.startsWith("/reset-password/"))

        if(this.$route.path.startsWith("/reset-password/")){
            //console.log("/reset-password/")
          this.$router.push(this.$route.path);
        }
        else if(this.$route.path.startsWith('/verify-email')){
          this.emailVerification();
        }
				else if((this.$cookie.get('X-Authorization') == null) || (this.$cookie.get('role') == null) || (this.$cookie.get('isEmailVerified') == null) || (this.$cookie.get('isMobileVerified') == null)){
					this.$store.commit('setPostLoginURL', this.$route.path);
					//console.log('User not logged In. Going to Login page');
					this.$router.push('/login');
				}
				// if((this.$cookie.get('isEmailVerified').localeCompare('false')==0) && (this.$route.path.startsWith('/verify-email'))){
        //   if(this.$cookie.get('role').localeCompare('PRODUCT_OWNER')==0){
        //     if(this.$route.path.startsWith('/verify-email')){
        //       this.emailVerification();
        //       console.log("email verification check",localeCompare)
        //     }else{
        //         this.$router.push('/product-owner/dashboard');
        //     }
        //
        //   }else{
        //     this.emailVerification();
        //   }
        //
				// }
				// if((this.$cookie.get('isEmailVerified').localeCompare('false')==0) || (this.$cookie.get('isMobileVerified').localeCompare('false')==0)){
				// 	console.log('User not verified. Going to Verifcation page');

				// 	this.$router.push('/verify-user');
				// }
				if((!this.$store.getters.getLoggedInUser.isEmailVerified) || (!this.$store.getters.getLoggedInUser.isMobileVerified)){
					//console.log('User not verified. Going to Verifcation page');
          if(this.$cookie.get('role').localeCompare('PRODUCT_OWNER')==0){
						this.$router.push('/product-owner/dashboard');
					}else{
            this.$router.push('/verify-user');
          }

				}
				if(this.$route.path.startsWith('/product-owner')){
					if(this.$cookie.get('role').localeCompare('PRODUCT_OWNER')!=0){
						processLogout();
					}
				}
				if(this.$route.path.startsWith('/ceo')){
					if(this.$cookie.get('role').localeCompare('PROJECT_MANAGER')!=0){
            if(this.$cookie.get('role').localeCompare('ADMIN')!=0){
              //console.log("processed to logout ---------"+this.$cookie.get('role'));
              processLogout();
            }

					}
				}
				if(this.$route.path.startsWith('/admin')){
					if(this.$cookie.get('role').localeCompare('ADMIN')!=0){
						processLogout();
					}
				}
				if(this.$route.path.startsWith('/developer/')){
					if(this.$cookie.get('role').localeCompare('DEVELOPER')!=0){
						processLogout();
					}
				}
				if((this.stompClient == null) || (!this.stompClient.connected)){
					//console.log('Not Connected!!: '+this.$root.stompClient);
					this.startSocket();
				}

			}
		},
			emailVerification(){
				var app =this;

				var id = this.$route.path.split('/')[2];
				 var key = this.$route.path.split('/')[3];

				  app.$http.get(
					this.$store.state.SERVER_URL + '/verify-email-confirmation-key-with-app-user-id?appUserId='+id+'&key='+key, {
						headers: {
							"X-Authorization": app.$cookie.get('X-Authorization')
						},

					}
				).then(function(response) {

			   if(response.data.status === 'SUCCESS'){
              console.log("hefuehdfhejhfhhfh",response.data.payLoad);
          //  app.$store.commit('setLoggedInUser',response.data.payLoad)
				    app.$cookie.set('isEmailVerified',response.data.payLoad.isEmailVerified, 1);
				    app.$store.commit('setLoggedInUserEmailStatus', response.data.payLoad.isEmailVerified);
								app.$swal({
									  title: 'Email Verified !',
									  text: 'Thank you for confirming your email.',
									  timer: 4000
									  }).then(
									  function () {
									  		if(app.$store.getters.getLoggedInUser.isMobileVerified){
										   		//app.$router.push('/post-login');
										   		location.href = '/post-login'
									 		}
									 		else{
									 			location.href = '/verify-user';
									 		}
									  },
									  // handling the promise rejection
									  function (dismiss) {
										//if (dismiss === 'timer') {
											//location.href = '/verify-user';

									 if(app.$cookie.get('isMobileVerified').localeCompare('false')==0){
										   //this.$router.push('/verify-user');

										   location.href = '/verify-user';
									 }
									 else{

									 	app.$router.push('/post-login');

										// if(this.$cookie.get('role').localeCompare('PRODUCT_OWNER')!=0){
										// 	app.$router.push('/product-owner/dashboard');
										// }
										// if(this.$cookie.get('role').localeCompare('DEVELOPER')!=0){
										// 	app.$router.push('/developer/dashboard');
										// }
									 }

								 }
							   )

							 }else{

							//app.$router.push('/verify-user');
							location.href = '/verify-user';
					 }


				}, response =>{
					  app.$swal(
							  'Oops...',
							  'Something went wrong!',
							  'error'
							)

				  });


			}
	},
  render: h => h(App),
});
