<template>
    <div class="wrapper">
      <!-- Main Header -->
      <app-admin-header></app-admin-header>
      <app-admin-sidebar v-if="role== 'ADMIN'"></app-admin-sidebar>
        <Po-side-bar v-if="role== 'PRODUCT_OWNER'"></Po-side-bar>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        

        <!-- Main content -->
          <section class="content">
    
        <div class="row">

            <div class="outerbg">
                
                
                <section class="content-header">
        <div class="row">
            <div class="col-md-8">
                <div class="chatDiscription">
                  <a href="javascript:void(0)" data-id="1" data-name="User 1"><div class="friend"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg"> <p><strong>Miro Badev</strong><br/><span>mirobadev@gmail.com</span></p> <div class="status available"></div></div></a>
               </div>
            </div>
            <div class="col-md-3">
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
            </div>
    </div>
        </section>
                
                

                <div class="chatboxout">
                    <div class="overfolow_hide">
                    <div class="chatboxin">

                       <div class="iteration_loop" v-for="message in messageList">
                        <div class="chat-container">
                          <!--  <div class="chat-sender img"><img src="https://s24.postimg.org/7h2ei80qd/sahil_chat_avatar_08.png"></div>-->
                            <div class="chat-sender msg"><strong>Ashley Maddison</strong>
                                <div class="chatmsg"><!--Reset my Windows Password--> {{message}} </div>
                                <span class="date_right">7:45PM</span>
                            </div>
                        </div>


                        <div class="chat-container">
                            <div class="chat-respond msg ">
                                <div class="flippd">
                                    <strong>Helpdesk Assistant</strong>
                                    <div class="chatmsg"> <!--Hey Ashley! Done. Check your email for the password link and reset your password. Can I be of assistance to you for anything else?-->
                                        {{message}}
                                    </div>
                                     <span class="date_right">7:45PM</span>
                                </div>
                            </div>
                            <!--<div class="chat-respond img"><img src="https://s24.postimg.org/j4ruz10hh/chat_avatar_09.png"></div>-->
                        </div>
                    </div>



                    </div>
                    
                    
                 </div>
                   
                
                </div>

                
                <div class="row">
                     <div class="messageEnterBox">
                        <div class="form-group">
                            <textarea class="form-control message-text-area" rows="4" autofocus autocomplete="off" v-model="messageTitle" @keyup.enter="sendMessage" placeholder="Write a response..."></textarea>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    
</section>



    </div>
    </div>
</template>

<script>
      import  AdminSidebar  from  "../../SupperAdminSideBar.vue";
      import  AdminHeader  from  "../../adminHeader.vue";
    import  POSideBar  from  "../../poSideBar.vue";
   
    
    
     
    
    
    export default{
        data(){
            return{
             
                    'messageTitle':'',
                    role: this.$cookie.get('role'),
                
                messageList:[],
                
            }
        },
        components:{
            'appAdminSidebar': AdminSidebar,
            'appAdminHeader': AdminHeader,
            'Po-side-bar':POSideBar
        },
        methods:{
            
             sendMessage: function () {
                 var app = this;
               
              app.messageList.push(this.messageTitle);
              this.messageTitle='';
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
        height: 25px !important;
    }
 .input-group-addon {
    padding: 3px 12px;
    }
    
    
    .content {
   
    margin-top: -2.5% !important;
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
  background: #fff;
/*  border-radius: 5px;*/
    height: 66em;
    overflow: hidden;
    overflow-y: scroll;
    height: calc( 100vh - 200px);
  -webkit-box-shadow: 4px 4px 20px -1px rgba(59, 59, 59, 0.6);
  -moz-box-shadow: 4px 4px 20px -1px rgba(59, 59, 59, 0.6);
  box-shadow: 4px 4px 20px -1px rgba(59, 59, 59, 0.6);
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
    background-color: #E6E6E6;
  /*color: #fff;*/
    color: #F48806;
  box-sizing: border-box;
  /*width: calc(100% - 53px);*/
    width: 65%;
  margin-left: -9px;
    margin-top: 10px
}
.chatmsg {
  margin-top: 5px;
    word-break: break-all;
}
.chat-sender {
  display: inline-block;
  vertical-align: top;
}
.chat-container {
  margin-top: 15px;
  margin-bottom: 15px;
    animation: fadein 2s;
    -moz-animation: fadein 2s; /* Firefox */
    -webkit-animation: fadein 2s; /* Safari and Chrome */
    -o-animation: fadein 2s; /* Opera */
}
.chat-respond.msg {
  -webkit-clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%, 12px 70%);
  clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%, 12px 70%);
  padding: 9px 9px;
  padding-left: 21px;
 /* background-color: #E6E6E6;*/
    background-color: #aedd4e;
  color: #333;
  box-sizing: border-box;
 /* width: calc(100% - 53px);*/
    width: 65%;
  margin-right: -9px;
  transform: scale(-1, 1);
  -moz-transform: scale(-1, 1);
-webkit-transform: scale(-1, 1);
-o-transform: scale(-1, 1);
-ms-transform: scale(-1, 1);
   /* display: inline-block;
    float: right;
    clear: right;*/
    
    position: relative;
    right: -34%;
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
            bottom: 3%;
    margin: auto;
    position: absolute;
    left: 0px;
        padding: 10px 0px 9px 26px;
        box-shadow: 4px 4px 20px -1px rgba(59, 59, 59, 0.6);
    }
    
    .date_right{
            float: right;
    }
    
    
    
    
    
    
    
    
    
    
    
    
</style>