<template>
  <div>

<div class="row">
      <div class="col-md-3 pull-left">
      </div>
      <div class="col-md-3 pull-right" >
        <button class="btn btn-md btn-orange defectsRaiseBtn pull-right"   @click="openLabelsModal()"><i class="fa fa-plus-circle" aria-hidden="true"></i>  New Labels</button>
      </div>
    </div>
    <div class="col-md-12">
           <form>
           <table class="table table-hover platform-table-color label-tbl">
            <tbody>
                <tr>
                </tr>
                <tr class="text-left" v-for="(label,index) in labelList">

                    <td v-if="label.defectLabelColourCode=='#FBC02D' || label.defectLabelColourCode=='#DBDF00'  || label.defectLabelColourCode=='#CCCCCC' || label.defectLabelColourCode=='#FFFFFF'"><button type="button"  class="btn btn-orange" v-bind:style="{background: label.defectLabelColourCode ,color:'#000000'}" :disabled="enableButton" @click="">{{label.defectLabelName}}</button></td>
                    <td v-else><button type="button" class="btn btn-orange" v-bind:style="{background: label.defectLabelColourCode}" :disabled="enableButton" @click="">{{label.defectLabelName}}</button></td>
                    <td><a type="button"  class="cursor-pointer "  @click="openEditLabelCaseModal(label,index)"><span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-pencil"></i></span></a></td>
                  <td><li class="list-group-item dev-edit-dele-icon" @click="deleteLabel(label,index)"><a type="button" class="cursor-pointer"><i class="fa fa-trash-o " aria-hidden="true"></i></a></li></td>
                </tr>
            </tbody>
        </table>
     </form>
   </div>
   <div class="modal fade" id="RaiseLabelModal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" role="document">
           <div class="modal-content">
              <div class="modal-header  no-border">
                 <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                   <h4 class="modal-title" v-if="defectLabelId">Update Label</h4>
                    <h4 class="modal-title" v-else >Create Label</h4>
              </div>
              <div class="modal-body padd0">
                <div class="alert alert-danger error-color" v-if="isError">
               {{errorMessage}}
                </div>
               <div class="tab-content">
                 <div class="row">
                    <div class="col-md-12">
                       <form  data-vv-scope="Defect-scope">
                          <div class="form-group paddx15" :class="{'input': true, 'is-danger': errors.has('Label-scope.defectLabelName') }">
                           <input type='text' class="form-control" placeholder="Label Title" name="defectLabelName" v-model="defectLabelName" v-validate:defectLabelName="'required'">
                             <p class="text-danger" v-if="errors.has('Defect-scope.defectLabelName')">Please enter label title </p>
                          </div>

                          <div class="color-picker text-center col-md-12">

                          <compact class="colour-picker" v-model="defectLabelColourCode" @change-color="onChange"></compact>
                        </div>
                          <div class="col-md-12 btn-ripple">
                             <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>

                             <button type="button" class="btn btn-orange" :disabled="enableButton" @click="raiseLabel" v-if="defectLabelId">Update</button>
                            <button type="button" class="btn btn-orange" :disabled="enableButton" @click="raiseLabel" v-else>ADD</button>
                          </div>

                       </form>
                    </div>
                 </div>
               </div>

             </div>
              </div>
           </div>
        </div>

   </div>
 </template>



 <script>
 import { Photoshop,Material,Compact,Swatches,Slider,Sketch} from 'vue-color'
 export default{
   props:["isDefectTabClicked"],
   data(){
     return{
       defectLabelColourCode: '#000000',
      //  {
      //   hex: '#194d33',
      //   hsl: {
      //     h: 150,
      //     s: 0.5,
      //     l: 0.2,
      //     a: 1
      //   },
      //   hsv: {
      //     h: 150,
      //     s: 0.66,
      //     v: 0.30,
      //     a: 1
      //   },
      //   rgba: {
      //     r: 25,
      //     g: 77,
      //     b: 51,
      //     a: 1
      //   },
      //   a: 1
      // },
// colors: defaultProps,
       isError:false,
       errorMessage:'',
       labelIndex:'',
       isSearched:true,
       totalLabelCount:'',
       index:'',
       defectLabelId:'',
       defectLabelName:'',
       selectedDefectStatus:'',
       labelList:[],
       selectedAppUserId:'',
       enableButton:false,
         url:this.$store.state.SERVER_URL +'/get-file/',
         getFileUrl:this.$store.state.SERVER_URL +'/get-file/',
         }
     },
     components: {
       Photoshop,
        Material,
        Compact,
        Swatches,
        Slider,
        Sketch
  },
     watch:{
   	   //  'isDefectTabClicked': function(newValue, oldValue) {
   		 //    //console.log("watch------------------>-"+newValue+"-  oldValue--"+oldValue)
        //    if(this.isDefectTabClicked){
        //      this.getAllStoryandEcpics();
        //    }
   		 //    },
   		  },
   	  isDefectTabClicked: {
   	    canReuse: true,
   	  },
     mounted: function() {
       this.getLabels();
     },
     computed:{
     },

     methods:{
       iterateRowNum(index){
         return (this.startDefectCount+index);
       },
       onChange (val) {
      this.defectLabelColourCode = value;
    },
       openLabelsModal: function(){
          $('#RaiseLabelModal').modal('show');
                this.defectLabelName='';
                this.defectLabelId=null;
                this.defectLabelColourCode='';
                setTimeout(() => {
                            // this.errors.clear('Defect-scope');
                   }, 100);

       },
       openEditLabelCaseModal(label , index){
        var app = this;
        this.defectLabelName=label.defectLabelName;
        this.defectLabelId=label.defectLabelId;
        this.defectLabelColourCode=label.defectLabelColourCode;
        app.index = index;
         $('#RaiseLabelModal').modal('show');
       },
       raiseLabel: function(){
        // Vue.http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);
            var app = this;
            var labels ={
            };
          //  console.log(app.storyTestCase);

            labels.defectLabelId  = app.defectLabelId;
            labels.defectLabelName=app.defectLabelName;

            labels.defectLabelColourCode=app.defectLabelColourCode;

            labels.defectLabelColourCode=app.defectLabelColourCode.hex;

            labels.projectId=this.$store.getters.getProjectInfo.projectId;
            app.$validator.validateAll('Defect-scope');
              if (!app.errors.any()) {
                app.enableButton=true;
                app.$store.commit('setSpinner',true);
            app.$http.post(app.$store.state.SERVER_URL +'/api/pm-admin/save-defect-label',labels,
               {
                    headers: {
                           "X-Authorization": app.$cookie.get('X-Authorization')
                       },

               }).then((response) => {
                 app.enableButton=false;
                 app.$store.commit('setSpinner',false);
                 if(response.data.status=='SUCCESS'){
                   app.enableButton=false;
                   if(app.defectLabelId!=null && app.defectLabelId !=''){
                       app.labelList.splice(app.index,1,response.data.payLoad);
                     app.enableButton=false;

                    $('#RaiseLabelModalEdit').modal('hide');
                   }else{
                     app.enableButton=false;
                    //  app.defectsList.push(response.data.payLoad);
                    if(!app.labelList){
                      app.labelList=[];
                    }
                    app.labelList.unshift(response.data.payLoad);
                    app.totalLabelCount += 1;
                   }
                   //console.log(response.data.payLoad);

                    $('#RaiseLabelModal').modal('hide');
                 }else{
                   app.$store.commit('setSpinner',false);
                   app.errorMessage = response.data.errorMessage;
                   app.isError=true;
                   setTimeout(function () {
                   app.isError=false;
                 }, 3000)
                   app.enableButton=false;
                 }

           }, (response) => {
             app.$store.commit('setSpinner',false);
         });
       }
       },
       getLabels: function() {
           var app = this;
           app.$store.commit('setSpinner', true);
           app.$http.get(
               app.$store.state.SERVER_URL + '/api/dev-pm-admin/get-defect-labels-in-project/'+this.$store.getters.getProjectInfo.projectId
               , {
                   headers: {
                       "X-Authorization": app.$cookie.get('X-Authorization')
                   },

               }
           ).then(function(response) {
               app.$store.commit('setSpinner',false);
               app.labelList=response.data.payLoad;


           });

       },
       deleteLabel(label , index){
         var app = this;
         app.defectLabelId = label;
             app.$http.post(
               app.$store.state.SERVER_URL+"/api/pm-admin/delete-defect-label" ,
               app.defectLabelId,
               {
                 headers: {
                   "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
                 },
               }
             ).then(function(response){
               console.log(response)
               if(response.data.status === 'SUCCESS'){
                   app.labelList.splice(index, 1);
               }else{
                 app.$emit('changeisaletShow',true);
                  app.$emit('changesuccess',false);
                    app.$emit('changemessage',response.data.errorMessage);
                 console.log("something went wrong !")
               }
             });
       },



 }
 }
 </script>
 <style scoped>
 .btn-orange{
   border: none;
 }
.colour-picker{
  margin-right: -5px !important;
  margin-left: -93px;
  width: 245px!important;
}
 </style>
