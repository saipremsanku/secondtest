<template>
    <div class="wrapper">
      <link rel="stylesheet" href="/src/assets/css/intlTelInput.css">
     <link rel="stylesheet" href="/src/assets/css/demo.css">
      <!-- Main Header -->
  <app-admin-sidebar></app-admin-sidebar>
      <app-admin-header></app-admin-header>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper productBacklog_Block">

            <el-tabs v-model="activeName" @tab-click="handleClick">
           <el-tab-pane label="Internal" name="Internal">

                <InternalDeveloper></InternalDeveloper>


           </el-tab-pane >
           <el-tab-pane label="External" name="External">

        <ExternalDeveloper></ExternalDeveloper>


           </el-tab-pane>

         </el-tabs>








        </div>

       <!--  <app-footer></app-footer>-->



        <!-- add Developer  Modal  -->

<!-- <div class="modal fade" id="squarespaceModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true"> -->



    </div>
</template>

<script>
import  AdminSidebar  from  "../../SupperAdminSideBar.vue";
  import  AdminHeader  from  "../../adminHeader.vue";
    import  Footer  from   "../../footer.vue";
    import InternalDeveloper from './InternalDeveloper.vue';
    import ExternalDeveloper from "./ExternalDeveloper.vue";



    export default{
        data(){
            return{
              developerList:[],
                   skillList:'',
                   dummyObject:{},
                   activeName:'Internal'
            }

        },
         components:{
             'appAdminSidebar': AdminSidebar,
            'appAdminHeader': AdminHeader,
            'InternalDeveloper':InternalDeveloper,
            'ExternalDeveloper':ExternalDeveloper,

        },


        methods: {
          handleClick(index,name){

          },

      }
    }
</script>
<style>

<style>
