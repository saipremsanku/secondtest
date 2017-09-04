<template>
<div class="wrapper">
  <link rel="stylesheet" href="/src/assets/css/intlTelInput.css">
 <link rel="stylesheet" href="/src/assets/css/demo.css">
  <!-- Main Header -->
<app-admin-sidebar></app-admin-sidebar>
  <app-admin-header></app-admin-header>
  <!-- <section class="content"> -->
  <div class="content-wrapper">
	<section class="content">
    <div class="col-md-12 master-text">
      <div class="col-md-3">
        <div class="form-group">
       <input type="text" class="form-control" placeholder="version number" v-model="versionNumber">
   </div>

      </div>
      <div class="col-md-9">
        <p> <b>Please Include MSA keywords (^DATE^, ^CLIENT_NAME^, ^CLIENT_ADDRESS^) in TermsAndCondition</b></P>
      </div>
    </div>
    <div class="col-md-12">
     <textarea name="projectSpecsHtml" class="form-control" id="editor1" rows="20" style="height: 700px;"cols="80" v-model="projectSpecsHtml" ></textarea>
    </div>
    <div class="col-md-12 master-text">
      <div class="col-md-3">
        <div class="form-group">
       <!-- <input type="text" class="form-control" placeholder="version number" v-model="versionNumber"> -->
   </div>

      </div>
      <div class="col-md-2 col-md-offset-3">
  <button type="button" class="btn btn-orange btn-lg" @click="submitTermsAndCondition()">Submit </button>
      </div>
    </div>
</section>

  </div>
</div>
</template>
    <script src="https://cdn.ckeditor.com/4.6.2/standard/ckeditor.js"></script>
<script>
import  AdminSidebar  from  "../../SupperAdminSideBar.vue";
  import  AdminHeader  from  "../../adminHeader.vue";
  import Datepicker from 'vuejs-datepicker';

      export default{
          data(){
              return{
                projectSpecsHtml:'',
                versionNumber:'',
              }
            },
            components:{
                'appAdminSidebar': AdminSidebar,
               'appAdminHeader': AdminHeader,
               Datepicker
             },

             mounted:function(){

               setTimeout(function () {
                    CKEDITOR.replace( 'editor1' );
                    CKEDITOR.resize( '100%', '777',true);
             }, 500)
             setTimeout(function () {
                  $('.cke_contents').css( "height", "700px" );
           }, 1000)


             },
             methods:{
               submitTermsAndCondition(){
                 var app = this;
                 var editor_contents = CKEDITOR.instances["editor1"].getData();
                    // var dataObj = $('#TermsAndConditionModal').serializeArray().reduce(function(obj, item) {
                    //     obj[item.name] = item.value;
                    //     return obj;
                    // }, {});

console.log("---editor value---",editor_contents);
                    var dataObj={};
                    if(editor_contents){
                        //console.log(dataObj);
                        dataObj.termsHtml = editor_contents;
                        dataObj.versionNumber = app.versionNumber;

                    }
                    app.$store.commit('setSpinner',true);
                 $.ajax({
                 url: app.$store.state.SERVER_URL+'/admin/save-master-service-agreement',
                 type: 'POST',
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                 data: JSON.stringify(dataObj),
                       headers: {
                     "X-Authorization": app.$cookie.get('X-Authorization')

                          },


                 success: function(data) {
                   app.$store.commit('setSpinner',false);
                   if(data.status === "SUCCESS"){
                       app.$store.commit('setSpinner',false);
                        app.$router.push('/admin/project-setting');
                   }else{
                       app.$store.commit('setSpinner',false);
                        app.$swal("Oops...", "Something went wrong!", "error");
                   }
               }
              });

               },
             }
          }

</script>
<style scoped>
.master-text {
    margin-top: 5px;
    margin-bottom: 32px !important;
    text-align: center;
}
</style>
