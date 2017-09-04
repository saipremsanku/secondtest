<template>
<!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

      <!-- Sidebar user panel (optional) -->

      <!-- Sidebar Menu -->
      <ul class="sidebar-menu">
        <!-- Optionally, you can add icons to the links -->
           <li><router-link to="/verify-user"><i class="fa fa-dashboard"></i>  <span>Dashboard</span></router-link></li>

      </ul>
      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
    export default{
        props: ['praposalId'],
        data(){
            return{

            }
        },
        created:function(){

             if((this.$cookie.get('isEmailVerified').localeCompare('true')==0) && (this.$cookie.get('isMobileVerified').localeCompare('true')==0)){
                    console.log('-------Admin Side Bar -----------');
                    this.$router.push('//product-owner/dashboard');
                }


        }
    }
</script>
