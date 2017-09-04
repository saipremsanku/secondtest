<template>
    <div>
      <!-- Main Header -->
      <app-adminHeader></app-adminHeader>
        <dev-sidebar></dev-sidebar>

      <div>

        <section class="content" v-if="isEligibale">

   <app-projectCards :projectList="projects"></app-projectCards>
                <!-- <router-link :to="'/developer/dashboard'" tag="li" active-class="active" ><a><i class="fa fa-dashboard "></i>Dashboard</a></router-link>
                <router-link to="" tag="li" active-class="active" ><a><i class="fa fa-dashboard "></i>Project Name</a></router-link>
                 <router-link :to="'/developer/backlog'" tag="li" active-class="active" ><a><i class="fa fa-dashboard "></i>back Long</a></router-link>
                 <router-link :to="'/developer/task-board'" tag="li" active-class="active" ><a><i class="fa fa-dashboard "></i>Task Board</a></router-link>
                  <router-link :to="'/developer/test-library'" tag="li" active-class="active" ><a><i class="fa fa-dashboard "></i>Test Library</a></router-link> -->

            <!-- <h1> Developer dashBoard</h1> -->

        </section>

          <section class="content" v-else>
            <span v-if="isAvailable && isAvailable.appUserId!=null">
                  <developer-profile></developer-profile>
                </span>
        </section>
      </div>
      <div class="control-sidebar-bg"></div>
    </div>
</template>
<script>
    import adminHeader from "../../adminHeader.vue";
    import DeveloperSidebar from './DeveloperSidbar.vue';
    import porjectCard from   './DeveloperProjectCard.vue'
    import DeveloperWizard from './DeveloperWizard.vue'
    export default {
        data(){
            return{
              projects:'',
              projectName:null
            }
        },
        components:{
            "app-adminHeader":adminHeader,
            "dev-sidebar":DeveloperSidebar,
            "app-projectCards":porjectCard,
            "developer-profile":DeveloperWizard

        },
        created: function(){


        },
        mounted: function(){
            this.role = this.$cookie.get('role');
            this.getProductList();
        },
        computed:{
            isEligibale:function(){
                return this.$store.getters.getLoggedInUser.isDeveloperEligible
            },
            isAvailable: function(){
              this.$store.getters.getLoggedInUser;
            }
        },
         methods:{
          getProductList: function(){
              var app = this;

              var url = this.$store.state.SERVER_URL+'/api/developer/get-developer-projects';
              console.log(app.$store.getters.getLoggedInUser)
              console.log(app.$store.getters.getLoggedInUser.xAuth+"   url ==============  "+url)
              app.$store.commit('setSpinner',true);
              app.$http.get(
                      url ,
                   {
                       headers: {
                         "X-Authorization": app.$store.getters.getLoggedInUser.xAuth
                       },

                   }
              ).then(function(response) {
                app.$store.commit('setSpinner',false);
                    console.log(response.data.payLoad);
                    app.projects = response.data.payLoad;
                    console.log("products ----------------------------------");
                    console.log(app.projects);
                });
            }
        },
    }
</script>
