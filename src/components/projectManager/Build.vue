<template>



  <div>
     <div class="m-b-m-10 btn-ripple">
        <button class="btn btn-orange btn-lg "  data-toggle="modal" @click="openStoryModel"><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;Add Build</button>
     </div>
     <div class="panel-group PM_epic_accordion" id="accordion" role="tablist" aria-multiselectable="true" >
     <div class="storyContent">

     <!--start of accrodian-->
     <div  style="margin-top: 5px;border: 1px solid #cac0c0;">
     <div class="edit_delete_details">
       <div class="col-md-12 col-lg-12">
         <div class="col-md-7 col-lg-8 col-sm-6 col-xs-12">
         <!-- <span data-toggle="collapse" :data-target="'#demo'+story.id"> -->
             <!-- <span data-toggle="collapse" :data-target="'#demo'+story.id"> -->
             <span data-toggle="collapse" data-target="#demoId">
           <span class="accordianSym">  <i aria-hidden="true" class="fa fa-plus-circle"></i>
           </span>
         </span>



         <span class="storyName"><b>build name</b></span>

         </div>
          <div class="col-md-2 col-lg-2 col-sm-6 col-xs-12 text-right paddRight_0">
            <div class="addTask">
            <button class="btn btn-orange btn-sm pull-right" ><i class="fa fa-plus-circle" aria-hidden="true" ></i> open build</button>
            </div>
          </div>
           <!-- <div class="col-md-3 col-lg-2 col-sm-6 col-xs-12 paddRight_0">
             <div class="col-md-6 col-lg-6 paddRight_0">
             <span class="cmmnIcon color-orange" ><i aria-hidden="true" class="fa fa-clock-o" v-tooltip="showEstimatedTime(story)"></i> <p class="timeBlock estValue paddLeft_0" >E: {{calcTotal(story)}} <span v-if="story.taskActualHours != 0 && isProjectAvailable">&nbsp;&nbsp;A: {{story.taskActualHours}}</span> </p></span>
             </div>
              <div class="col-md-2 col-lg-3">
             <span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-pencil cursor-pointer" @click="editStory(story,index)" v-if="projectLeadStatus"></i></span>
             </div>
              <div class="col-md-2 col-lg-3">
             <span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-trash-o cursor-pointer"  @click="deleteStory(story,index)" v-if="projectLeadStatus"></i></span>
             </div>



           </div> -->
       </div>


       <div  class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
         <p class="storyDescription">build description</p>
       </div>

     </div>



       <!-- <div :id="'demo'+story.id"  class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo" > -->
         <div id="demoId"  class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo" >
        <div class="panel-body">

         <!-- task list  for -->
           <div class="row" >
             <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
               <div class="openEditDelete">
                 <div class="col-md-12 col-lg-12 col-xs-12 col-sm-12 border_btm">
                   <!-- edit build  -->
                     <div class="col-md-1 col-lg-1"><p class=" estValue"><a class="edit-dev-link" @click="editBuild()">#edit build</a></p></div>
                     <div class="col-md-6 col-lg-7 col-sm-6 col-xs-12">build name</div>
                     <div class="col-md-2 col-lg-2 paddRight-0 paddLeft-0">
                       <div class="col-md-4 col-lg-4 color-orange fs-12"><b>appUser Name</b></div>
                       <!-- <div v-if="task.taskStatus === 'APPROVED_BY_PM'" class="col-md-8 col-lg-8 text-right paddRight-0 paddLeft-0"><span class="colorOrange">{{shortStatus(task.taskStatus)}}</span></div>
                       <div v-else-if="task.taskStatus === 'ASSIGNED'" class="col-md-8 col-lg-8 text-right paddRight-0 paddLeft-0"><span class="colorBlue1">{{shortStatus(task.taskStatus)}}</span></div>
                       <div v-else-if="task.taskStatus === 'WORK_IN_PROGRESS'" class="col-md-8 col-lg-8 text-right paddRight-0 paddLeft-0"><span class="colorYellow">{{shortStatus(task.taskStatus)}}</span></div>
                       <div v-else-if="task.taskStatus === 'CREATED'" class="col-md-8 col-lg-8 text-right paddRight-0 paddLeft-0"><span class="colorRed">{{shortStatus(task.taskStatus)}}</span></div>
                       <div v-else class="col-md-8 col-lg-8 text-right paddRight-0 paddLeft-0"><span class="colorGreen">{{shortStatus(task.taskStatus)}}</span></div> -->
                     </div>
                     <div class="col-md-3 col-lg-2 col-sm-6 col-xs-12 paddRight_0">
                     <div class="col-md-6 col-lg-6 paddRight_0 "><span class="cmmnIcon color-orange"><i aria-hidden="true" class="fa fa-clock-o"> </i> <p class="timeBlock estValue paddLeft_0" > t1</p></span>
                     </div>

                     <!-- <div class="col-md-2 col-lg-2" v-if="!(task.hasMovedToWIPFirstTime || task.taskStatus === 'CANCELLED')"><span class="cmmnIcon color-yash" @click="deleteTask(story , index, task , taskIndex)"><i aria-hidden="true" class="fa fa-trash-o"></i></span> -->
                     </div>
                   </div>
                 </div>
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
export default{
  data(){
    return{

    }
  },
  methods:{
    editBuild(){
      console.log('edit build');
    }
  }
}
</script>
