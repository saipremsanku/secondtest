<template>
<!-- Left side column. contains the logo and sidebar -->
<div>
  <aside class="main-sidebar">
      <section class="sidebar">
     <!-- <ul class="sidebar-menu">
            <li>
            <router-link to="/admin/all-project-requirement">
            <i class="fa fa-link"></i> <span>All Projects</span></router-link>
            </li>

            <li>
            <router-link to="/admin/project-manager">
            <i class="fa fa-link"></i> <span>ProjectManager</span></router-link>
            </li>

            <li>
            <router-link to="/admin/project-setting">
            <i class="fa fa-link"></i> <span>Setting</span></router-link>
            </li>

            <li>
            <router-link to="/admin/coupons">
            <i class="fa fa-link"></i> <span>Coupons</span></router-link>
            </li>




      </ul>-->
   <!--  <chat-side-bar></chat-side-bar>-->
          <div class="generalChartBox">
            <ul class="sidebar-menu">

            <router-link to="/admin/all-project-requirement" tag="li" active-class="active" ><a><i class="fa fa-link "></i>Projects</a></router-link>
            <!-- <router-link to="/admin/all-project-requirement" tag="li" active-class="active">
          <a>  <i class="fa fa-link"></i><span>All Projects</span></a></router-link> -->



          <router-link to="/admin/product-owner"  tag="li" active-class="active" >
        <a>  <i class="fa fa-link"></i>Product Owners</a></router-link>

            <router-link to="/admin/ceo"  tag="li" active-class="active" >
          <a>  <i class="fa fa-link"></i>CEOs</a></router-link>


          <router-link to="" tag="li" class="treeview sub-menu">
            <a><i class="fa fa-link" aria-hidden="true"></i>
              <span>Finance</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-down pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu sub-tree-menu">
                <router-link to="/admin/fm" tag="li" active-class="active"><a><i class="fa fa-link" aria-hidden="true"></i>Finance User</a></router-link>
                <router-link :to="'/'+admin+'/invoice'" tag="li" active-class="active"><a><i class="fa fa-link" aria-hidden="true"></i>Invoices</a></router-link>
            </ul>
          </router-link>
          <!-- <router-link to="/admin/fm"  tag="li" active-class="active" >
        <a>  <i class="fa fa-link"></i>FinanceManager</a></router-link> -->

        <router-link to="" tag="li" class="treeview sub-menu">
          <a><i class="fa fa-link" aria-hidden="true"></i>
            <span>Developers</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-down pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu sub-tree-menu">
            <router-link to="/admin/developer-info" tag="li" active-class="active">
            <a><i class="fa fa-link"></i>Developers List</a></router-link>
              <router-link to="/admin/developer-reports" tag="li" active-class="active">
               <a><i class="fa fa-link" aria-hidden="true"></i>Developers Report</a></router-link>
          </ul>
        </router-link>

            <router-link to="/admin/coupons" tag="li" active-class="active">
            <a><i class="fa fa-link"></i>Coupons</a></router-link>
            <router-link to="/admin/project-setting" tag="li" active-class="active">
            <a><i class="fa fa-link"></i>Settings</a></router-link>

            <router-link to="/admin/feedback" tag="li" active-class="active">
            <a><i class="fa fa-link"></i>Feedback</a></router-link>
            <router-link to="" tag="li" class="treeview sub-menu">
              <a><i class="fa fa-link" aria-hidden="true"></i>
                <span>Reports</span>
                <span class="pull-right-container">
                  <i class="fa fa-angle-down pull-right"></i>
                </span>
              </a>
              <ul class="treeview-menu sub-tree-menu">
                  <router-link to="/admin/userActivity" tag="li" active-class="active"><a><i class="fa fa-link" aria-hidden="true"></i>User Activity</a></router-link>
                  <router-link to="/admin/smsActivity" tag="li" active-class="active"><a><i class="fa fa-link" aria-hidden="true"></i>SMS Activity</a></router-link>
                <router-link to="/admin/emailActivity" tag="li" active-class="active"><a><i class="fa fa-link" aria-hidden="true"></i>Email Activity</a></router-link>

              </ul>


            </router-link>






      </ul>

          </div>
          <div class="personsList">
              <chat-side-bar></chat-side-bar>
          </div>
    </section >


  </aside>


    </div>
</template>

<script>
    import ChatSidebar from '../src/components/chat/ChatSidebar.vue';

    export default{
        data(){
            return{
              admin:'admin'
                }
            },
        components:{
            'chat-side-bar':ChatSidebar
        },
        computed:{
          isAdmin:function(){
          return this.$store.getters.getLoggedInUser.role ==='ADMIN';
        },


        }

        }

</script>
