<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <ul class="sidebar-menu">
        <router-link :to="'/developer/dashboard'" tag="li" active-class="active"><a><i class="fa fa-dashboard"></i>Dashboard</a></router-link>
        <router-link  :to="''" tag="li"> <a class="side-bar-bold"><i class="fa fa-rocket" aria-hidden="true"></i>{{projectName}}</i></a></router-link>

        <router-link :to="'/developer/backlog'" tag="li" active-class="active" class="sidebar-margin-leaft"><a><i class="fa fa-th"></i>Product Backlog</a></router-link>
        <router-link :to="'/developer/task-board/'+this.$store.getters.getDevProjectInfo.projectId" tag="li" active-class="active" class="sidebar-margin-leaft"><a><i class="fa fa-tasks" aria-hidden="true"></i></i>Task Board</a></router-link>
        <router-link :to="'/developer/test-library'" tag="li" active-class="active" class="sidebar-margin-leaft"><a><i class="fa fa-dashboard"></i>Quality Assurance</a></router-link>
      </ul>

    <div class="personsList">
        <chat-side-bar></chat-side-bar>
    </div>
    </section>
  </aside>
</template>

<script>

import ChatSidebar from '../chat/ChatSidebar.vue';

    export default{
        data(){
            return{
              projectName:null
            }
        },
        components:{
            'chat-side-bar':ChatSidebar
        },
        created: function(){
               this.projectName = this.$store.getters.getDevProjectInfo.projectName;
        }
    }
</script>
