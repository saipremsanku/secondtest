<template>
<div>
    <div class="wrapper">
  <app-adminHeader></app-adminHeader>
        <div class="content-wrapper">
  <div class="container">
    <section class="feedbackContent">
      <div class="feedback">
         <h4>Feedback</h4>
      <div class="feedbackPadding">
      <div class="form-group" :class="{'input': true, 'is-danger': errors.has('title') }">
       <input type='text' class="form-control" placeholder="FeedBack Title" name="title" v-model="title" v-validate:title="'required'">
         <p class="text-danger" v-if="errors.has('title')">Please enter FeedBack title </p>
      </div>
      <div class="form-group" :class="{'input': true, 'is-danger': errors.has('description') }">
       <textarea class="form-control" placeholder="FeedBack Description" rows="5"  name="description" v-model="description" v-validate:description="'required'" ></textarea>
          <p class="text-danger" v-if="errors.has('description')">Please enter FeedBack description </p>
      </div>
      <div class="row">
       <form enctype="multipart/form-data" novalidate>
       <div class="col-md-12">

          <div class="col-md-2">
              <!-- <div class="uploadFile">
              <input type="file" multiple :name="file" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
               accept="image/*" class="input-file">
               </div> -->

          </div>
          <p class="text-danger" v-if="isFileLarge">File size exceed max. allowed limit of 5MB</p>
           <div class="col-md-10">
               <div class="row">
                   <div class="col-md-12">
                   <div class="col-md-4 file_upload"  v-for="(file,index) in files">

                       <div class="file_heigh_width">
                           <span class="fileUploadCss"><p>{{file.fileName}}</p> <a :href="url+file.fileDocumentId" download><i class="fa fa-download download_file" aria-hidden="true"></i></a ><i class="fa fa-times" aria-hidden="true" @click="deleteFile(file.fileDocumentId,index)"></i></span>
                       </div>
                   </div>
               </div>
               </div>
           </div>
       </div>
    </form>
  </div>
  <div class="row">
    <div class="text-center">
        <button type="button" class="btn btn-orange" @click="saveFeedBack()">Submit</button>
    </div>
</div>
</div>
</div>
    </section>
    <div class="feedback_table_height">
          <table class="table table-hover platform-table-color price-table">
           <tbody>
               <tr>
                 <th>title</th>
                 <th>Date</th>
                 <th>Description</th>
                 <th>Action</th>
               </tr>
               <tr class="text-center" v-for="(feedback,index) in feedBackList">
                 <td>{{feedback.feedbackTitle}}</td>
                 <td>{{feedback.feedbackDate}}</td>
                 <td>{{feedback.feedbackDescription}}</td>
                 <td>
                   <a type="button"  class="cursor-pointer"><span class="cmmnIcon color-orange" @click="editFeedBack(feedback,index)"><i aria-hidden="true" class="fa fa-pencil"></i></span></a>
                 </td>
               </tr>
           </tbody>
       </table>
     </div>

  </div>
</div>
</div>
</div>


</template>

<script>
   import adminHeader  from "../../adminHeader.vue"
   export default{
   data(){
   return{
     feedbackId:'',
      title:'',
      description:'',
     file:'',
     files:[],
     isFileValidate:false,
     isFileLarge:false,
     isFileEmpty:false,
     feedBackList:[],
     index:''

    }
  },
     components: {
    'appAdminHeader':adminHeader
  },
  mounted:function(){
        this.getFeedback();
  },
    methods:{

      filesChange(fieldName, fileList) {
    // handle file changes
        var app = this;
    const formData = new FormData();

    if (!fileList.length) return;

    // append the files to FormData
    Array
      .from(Array(fileList.length).keys())
      .map(x => {
        formData.append('file', fileList[x], fileList[x].name);
      });
      console.log("file size are ----");
      console.log(fileList[0].size);
    //console.log(ele.target.name);
    if(fileList[0].size <=5000000){
      app.isFileLarge= false;
    app.$http.post(app.$store.state.SERVER_URL +'/api/developer/upload-developer-id-proof', formData,
            {
                 headers: {
                        "X-Authorization": app.$cookie.get('X-Authorization')

                    },
            }).then((response) => {
                    console.log("response.playLoad.data");
                       app.files.push(response.data.payLoad);
                         app.isFileEmpty=false;
        }, (response) => {
      });
    }else{
      app.isFileLarge= true;

    }

  },
 deleteFile:function(fileId,index){
     var app =this;
     app.$http.post(app.$store.state.SERVER_URL +'/api/developer/delete-id-proof/'+fileId,app.dummyObject,
            {
                 headers: {
                        "X-Authorization": app.$cookie.get('X-Authorization')

                    },
            }).then((response) => {

                    console.log("response.playLoad.data"+response.data.payLoad);
                       app.files.splice(index,1);
        }, (response) => {
      });

},
  getFeedback: function(){
      var app = this;
      app.$http.get(
            app.$store.state.SERVER_URL+'/get-user-feedbacks',
           {
             headers: {
               "X-Authorization": app.$cookie.get('X-Authorization')
             },
         }
    ).then(function(response) {
        console.log(response);
           app.feedBackList = response.data.payLoad;

    });

  },
  editFeedBack(feedBack,index){
    this.feedbackId=feedBack.feedbackId;
    this.description = feedBack.feedbackDescription;
    this.title = feedBack.feedbackTitle;
    this.index = index;


    console.log(feedBack);
    console.log(index);


  },
  saveFeedBack: function(){
      var app= this;
      var feedback={};
      feedback.feedbackId = app.feedbackId;
      feedback.feedbackTitle = app.title;
      feedback.feedbackDescription = app.description;
        app.$validator.validateAll();
        if (!app.errors.any()) {

            app.$http.post(
                this.$store.state.SERVER_URL+'/save-feedback',
                feedback,
                {
                  headers: {
                        "X-Authorization": app.$cookie.get('X-Authorization')
                }
                }
                ).then(function(response) {
                     console.log(response);
                 if(response.data.status === "SUCCESS"){
                       app.title = '';
                       app.description = '';
                       setTimeout(() => {
                        app.errors.clear();
                          }, 10);
                      if(app.feedbackId!=null && app.feedbackId !=''){
                        app.feedBackList.splice(app.index,1,response.data.payLoad);

                      }else{
                           app.feedBackList.push(response.data.payLoad);
                      }


                 }
                 else{
                    console.log('error');
                     alert("Something went wrong");
                 }
             });
      }
  }






    }
  }
  </script>
