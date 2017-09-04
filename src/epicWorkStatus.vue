<template>
    <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
      <app-adminSidebar></app-adminSidebar>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header custom-content-header">
            <ol class="breadcrumb">
                <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                <li class="active">Milestone</li>
            </ol>
            <div class="row">
                <div class="col-md-3 mainheader">
                    <p>Project Title</p>
                    <h4>GHCl Marketing Dashbaord</h4>
                </div>
                <div class="col-md-2 mainheader">
                    <p>Project Status</p>
                    <p class="badge-paragraph">Milestone 1</p>
                </div>
                <div class="col-md-2 mainheader">
                    <p>Project ID</p>
                    <h4>#0455</h4>
                </div>
                <div class="col-md-2 text-right">
                    <button type="button" class="btn btn-orange btn-sm btn-view">View RequstedFrom</button>
                </div>
            </div>
            <ul class="nav nav-tabs custom-tab">
                <li class="active">
                    <a href="#work_status" data-toggle="tab">
                    Work Status </a>
                </li>
                <li>
                    <a href="#uat_issues" data-toggle="tab">
                    UAT Issues </a>
                </li>
            </ul>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="tab-content">
                <div class="tab-pane active" id="work_status">
                    <app-workStatus></app-workStatus>
                </div>
                <div class="tab-pane" id="uat_issues">
                    <app-uatIssues></app-uatIssues>
                </div>
            </div>
          <!-- Your Page Content Here -->
        </section>
        <!-- /.content -->
      </div>
      <!-- /.content-wrapper -->

      <!-- Main Footer -->
      <footer class="main-footer">
        <!-- To the right -->
        <div class="pull-right hidden-xs">
          Designed and developed by Thrymr Software
        </div>
        <!-- Default to the left -->
        <strong>Copyright &copy; 2017 <a href="http://thrymr.net" class="color-pf">Thrymr Software</a>.</strong> All rights reserved.
      </footer>

    



      <!-- Add the sidebar's background. This div must be placed
           immediately after the control sidebar -->
      <div class="control-sidebar-bg"></div>
    </div>
</template>

<script>
    
    import  adminHeader  from "./adminHeader.vue"
    import  adminSidebar  from "./adminSidebar.vue"
    import  workStatus  from "./workStatus.vue"
    import  uatIssues  from "./uatIssues.vue"
   

   
        
    export default {
           name: 'app',
            data () {
                return {
                   
                    
                }
            },
            created: function () {
                this.fetchUsers();      
            },         
            components:{
                "app-adminHeader":adminHeader,
                "app-adminSidebar":adminSidebar,
                "app-workStatus":workStatus,
                "app-uatIssues":uatIssues
            },
            methods: {
                clickHandler() {
                      

                    }
            
          }
 
}
  
</script>