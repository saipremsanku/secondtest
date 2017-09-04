<template>
<div>
    <div class="row">
        <div class="col-md-12">
           <div class="alert fade in" :class="[success ? 'alert-success' : 'alert-danger']">
                 <a  class="close" @click="hideAlert()">×</a>
                 <span v-if="messageList !=null">
                   <p v-for="m in messageList"><span class="font-f "><i class="fa fa-exclamation-circle icon" aria-hidden="true"></i>{{m}}</span></p>
                 </span>

                 <span class="font-f " v-if="message!=null"><i class="fa fa-exclamation-circle icon" aria-hidden="true"></i> {{message}}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>

    export default {
      props: ['success','message','messageList'],

		  data(){
		      return{

              }
		  },


    created:function(){

        console.log("coll mounted method of alert--------------");
    /*        window.setTimeout(function() {
             $(".alert").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove();
           });
           }, 4000);

    }*/
  },
  mounted: function(){



    setTimeout(() => {
      var app = this;
    app.$emit("changeisaletShow",false);
  }, 1000)

},
  methods:{
    hideAlert : function(){
          var app = this;
        app.$emit("changeisaletShow",false);
        app.$emit("changeMessageList",'');



    }
  }
    }

</script>
<style scoped="true">
    .alert-danger{
    background-color: #f2dede !important;
    border: 1px solid #f2dede;
    min-width: 56px !important;
    color: #a94442;

    font-size: 15px;
    position: fixed;
    width: calc( 100% - 230px );
    z-index: 9999;
    top: 55px;
    right: 0;
    border-radius: 29px;
    }
    .alert-danger .font-f{
      font-size: 15px;
      color: #a94442;
    }
    .alert-danger .icon{
      padding-right: 4px;
    }
    .alert-success{
       background-color: #dff0d8 !important;
      border: 1px solid #b9eda4;
      color: #594444;

    font-size: 15px;
    position: fixed;
    width: calc( 100% - 230px );
    z-index: 9999;
    top: 55px;
    right: 0;
    border-radius: 29px;
    }

</style>
