<template>
<!-- Left side column. contains the logo and sidebar -->
<div>
  <aside class="main-sidebar">
      <section class="sidebar">
          <div class="generalChartBox">
            <ul class="sidebar-menu">

            <router-link to="/fm/dashboard" tag="li" active-class="active" ><a><i class="fa fa-link "></i>Projects</a></router-link>
          <router-link :to="'/'+fm+'/invoice'"  tag="li" active-class="active" >
        <a>  <i class="fa fa-link"></i>Invoices</a></router-link>
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
               fm:'fm'
                }
            },
        components:{
            'chat-side-bar':ChatSidebar
        }

        }

</script>
