
<template>
<div>
    <nav class="navbar navbar-default top-navbar workfall-navbar">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">
            <img src="/src/assets/images/platform_Asset 7.png" alt="logo image">
            <!-- Workfall -->

             </a>
          <router-link class="wrokfall-title" to="/">Workfall</router-link>
          <!--
          <a class="navbar-brand" href="/">The PlatForm</a>
          -->
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right custom-navbar">
            <li><router-link to="/login">Login</router-link></li>
            <li>
              <router-link to="/product-owner/sign-up" class="nav-btn">Register</router-link>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container -->
    </nav><!-- /.navbar -->
    </div>
</template>
<style scoped>
.container {
    padding-bottom: 3px;
}
</style>
