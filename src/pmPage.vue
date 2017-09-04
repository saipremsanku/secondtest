<template>
    <div class="wrapper">
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
      <app-adminSidebar></app-adminSidebar>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <!-- Main content -->
        <section class="content">
                <div class="row">
                    <div class="col-md-4">
                     <h2 class="sub_heading">All Projects</h2>
                    </div>
                    <div class="col-md-4 col-md-offset-1">
                        <div class="input-search">
                            <input type="text" class="form-control" placeholder="search">
                            <i class="fa fa-search"></i>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <select class="form-control cst-formcontrol">
                            <option>Sort By</option>
                        </select>
                    </div>
                </div>
          <!-- Your Page Content Here -->
          <app-pmCards></app-pmCards>
            
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
        <strong>Copyright &copy; 2016 <a href="#">Company</a>.</strong> All rights reserved.
      </footer>


      <!-- Add the sidebar's background. This div must be placed
           immediately after the control sidebar -->
      <div class="control-sidebar-bg"></div>
    </div>
</template>


<script>
    import  adminHeader  from "./adminHeader.vue"
    import  adminSidebar  from "./adminSidebar.vue"
    import  Cards  from "./pmCards.vue"
   
    
    export default {
        components:{
            "app-adminHeader":adminHeader,
            "app-adminSidebar":adminSidebar,
            "app-pmCards":Cards
        }
    }
</script>