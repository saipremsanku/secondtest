<template>
<!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">

    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

      <!-- Sidebar user panel (optional) -->

      <!-- Sidebar Menu -->
      <ul class="sidebar-menu">
        <!-- Optionally, you can add icons to the links -->

        <router-link :to="'/product-owner/dashboard'" tag="li" active-class="active"><a><i class="fa fa-dashboard"></i>Dashboard</a></router-link>
          <!-- <router-link :to="'/product-owner/invoice'" tag="li" active-class="active"><a><i class="fa fa-money"></i>Payments</a></router-link> -->

        <!--
        <li><a href="/projects"><i class="fa fa-link"></i> <span>Projects</span></a></li>
        -->

      </ul>

          <div class="personsList">
              <chat-side-bar></chat-side-bar>
          </div>

      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>
</template>

<script>

    import ChatSidebar from '../src/components/chat/ChatSidebar.vue';

    export default{
        props: ['inProject'],
        data(){
            return{

            }
        },
        components:{
            'chat-side-bar':ChatSidebar
        },
        created: function(){
          //alert(this.inProject);
        }
    }
</script>
