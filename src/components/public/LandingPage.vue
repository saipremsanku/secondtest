<template>
  <div class="landing">

    <div class="navbar-wrapper">

  		<nav class="navbar navbar-fixed-top workfall-navbar">
  			<div class="container container-margin">
  				<div class="navbar-header navbar-logo">
  					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
  					<span class="sr-only">Toggle navigation</span>
  					<span class="icon-bar"></span>
  					<span class="icon-bar"></span>
  					<span class="icon-bar"></span>
  					</button>
            <a class="navbar-brand" href="#home" v-smooth-scroll="{ duration: 1000, offset: -70 }">
              <img src="/src/assets/images/platform_Asset 7.png" alt="logo image">
              <!-- Workfall -->

               </a>
              <span class="wrokfall-title"> <a href="#home" v-smooth-scroll="{ duration: 1000, offset: -70 }">Workfall</a></span>
  				</div>
  				<div id="navbar" class="navbar-collapse collapse">
  					<ul class="nav navbar-nav main-navbar-details">

                        <li><a href="#ceo" v-smooth-scroll="{ duration: 1000, offset: -70 }">CEO <small class="new-ceo top-ceo-icon">^</small></a></li>

              		<!--<li class=" dropdown"><a href="#ceo" class="dropdown-toggle active" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" v-smooth-scroll="{ duration: 1000, offset: -70 }">CEO<small class="new-ceo top-ceo-icon">^</small></a> </li>-->


                    <li ><a href="#why-it-works"  v-smooth-scroll="{ duration: 1000, offset: -70 }">Why It Works</a> </li>


                     <li><a href="#how-it-works"  v-smooth-scroll="{ duration: 1000, offset: -70 }">How It Works</a> </li>

                    <li><a href="#contactUs"  v-smooth-scroll>Contact</a> </li>


  					</ul>
  					<ul class="nav navbar-nav navbar-right">
                <router-link tag="li" to="/product-owner/sign-up"  ><a>Sign Up</a></router-link>
                      <router-link tag="li" to="/login"  ><a>Login</a></router-link>

  					</ul>
  				</div>

  			</div>
  		</nav>

  </div>

<div class="landing-wrapper">
    <div class="landing-container">


<section class="content ">




  <section class="first-section" id="home">
    <div class="banner-content container">
      <h1 class="text-center first-heading padding-landing-color">Get Work Done. Now.</h1>
      <p class="text-center first-section-title padding-landing-color">Stop contracting freelancers. <router-link to="/product-owner/sign-up" class="start-link">Start</router-link> getting work Delivered.</p>

         <p class="top-leading-subtitle text-center landing-pg-text">Workfall designs, develops and delivers your software product without you ever having to worry about managing tech teams.<br> This frees you up to better manage your business while we take full ownership of your product development.</p>

    </div>

  </section>



  <section class="section-section  aligment  common-section ceo-section" id="ceo">
    <div class="container">
    <div class="row">
    <div class="col-md-12">
    <div class="ceo-image text-center ceo-div-padding">

        <h2>Meet the New CEO<small class="new-ceo">^</small></h2>
      <p class="second-section-sub-title landing-ceo-title "><span class="new-ceo-title padding-landing-color">^</span>Chief <i>End to End</i> Officer </p>
      <h3 class="second-section-sub-comment ">Your Single <i>End-to-End</i> Point of Contact </h3>

<div class=" col-md-11 col-md-offset-1 text-center">
     <img src="/src/assets/images/super ceo.png" alt="logo image" class="logo-right img-responsive image-ceo-padding image-ceo-height">
   </div>
   </div>
   </div>
   </div>
   </div>

  </section>




  <section class=" aligment  common-section" id="why-it-works">

     <div class="container">
       <div class="row text-center">
           <div class="col-md-12">
                <h2>Why It Works </h2>
            </div>
        </div>

<div class="row  marging-right ">


<div class="col-md-6 col-xs-12">
  <div class=" landing-bg one">



    <div class="post-container padding-landing">
        <div class="post-thumb"><img src="/src/assets/images/platformcod.png " class="img-pmargin" alt="logo image" /></div>
        <div class="post-content text-center">
            <h4 class="post-title">Commitment Of Delivery</h4>
            <p class="">Workfall takes end-to-end ownership of your product's development - from ideation to final delivery.</p>
          </div>
    </div>




  <!-- <h4>Commitment Of Delivery</h4>
  <img src="/src/assets/images/platformcod.png" alt="logo image" class=" img-responsive"> -->
</div>

</div>

<div class="col-md-6 col-xs-12">
    <div class=" landing-bg two">
      <div class="post-container padding-landing">
          <div class="post-thumb"><img src="/src/assets/images/platformsceo.png" alt="logo image"class="img-pmargin"/></div>
          <div class="post-content text-center">
              <h4 class="post-title">Single Point of Contact</h4>
              <p class="">The CEO<span class="ceo-icon">^</span> remains your sole liasioning officer for <i>all</i> tasks. <br>They aren't called CEOs for nothing !</p></div>
      </div>

</div>
</div>

</div>
<div class="row bg-white marging-right">

  <div class="col-md-6 col-xs-12">
        <div class=" landing-bg one">

          <div class="post-container padding-landing">
  <div class="post-thumb-right"><img src="/src/assets/images/platformpromise.png" alt="logo image"class="img-pmargin"></div>
              <div class="post-content-right text-center">
                  <h4 class="post-title">Promises Made = Promises Kept</h4>
                  <p class="">The same CEO<span class="ceo-icon">^</span> who negotiates the agreement with you is also responsible for delivering the product. Accountability stays with the person who creates it !</p></div>

          </div>


    </div>

  </div>

  <div class="col-md-6 col-xs-12">
  <div class=" landing-bg two">


    <div class="post-container padding-landing">
<div class="post-thumb-right"> <img src="/src/assets/images/platform_transparency.png" alt="logo image" class="img-pmargin"></div>
        <div class="post-content-right text-center">
            <h4 class="post-title">Transparency</h4>
            <p >The CEO<span class="ceo-icon">^</span> creates your product's specs with razor sharp accuracy which eliminates scope disambiguities. And with real-time tracking, you'll always have a clear picture of the work status.</p>
          </div>

    </div>
  </div>
</div>


     </div>









     <div class="row bg-white marging-right ">


     <div class="col-md-6 col-xs-12">
       <div class=" landing-bg one">



         <div class="post-container padding-landing">
             <div class="post-thumb"><img src="/src/assets/images/platform_Asset 11.png"  class="img-pmargin"  alt="logo image" /></div>
             <div class="post-content text-center">
                 <h4 class="post-title">Best Developers</h4>
                 <p class="">Workfall conducts thorough personal and technical due-diligence to ensure only the best developers build your product.</p>
               </div>
         </div>




       <!-- <h4>Commitment Of Delivery</h4>
       <img src="/src/assets/images/platformcod.png" alt="logo image" class=" img-responsive"> -->
     </div>

     </div>

     <div class="col-md-6 col-xs-12">
         <div class=" landing-bg two">
           <div class="post-container padding-landing">
               <div class="post-thumb"><img src="/src/assets/images/platformmbp.png" alt="logo image" class="img-pmargin img-responsive"/></div>
               <div class="post-content text-center">
                   <h4 class="post-title">Milestone Based Payment</h4>
                   <p class="">With payments dependent on delivery milstones, your risks get mitigated and we get compelled to deliver the very best !</p></div>
           </div>

     </div>
     </div>

     </div>







   </div>
</section>
<!-- <div class="arrow-left">
</div> -->


  <section class="section-four image-three-padding aligment common-section" id="how-it-works">
    <div class="container">
    <div class="row">
    <div class="col-md-12 text-center">
      <h2>How It Works</h2>
       <img src="/src/assets/images/platformhowitworks.png" alt="logo image" class="logo-right img-responsive image-four-height  how-it-work">
     </div>
     </div>
     </div>

  </section>






  <div class="section-contactus common-section" id="contactUs">
    <div class="container">
        <div class="row">
            <div class="col-md-12 text-center">
                <h2>Contact US</h2>
            </div>

            <div class="col-md-4 col-md-offset-5 paddingleft0">
                <h4>Singapore</h4>
                <ul class="footercontact footer-address">
              <li><i class="fa fa-bank"></i><!-- Thrymr Software PTE Limited <br> -->
                                  71Ayer Rajah Crescent,<br>
                                  #03-11 <br>
                                  Singapore-139951</li>
              <!-- <li><i class="fa fa-phone"></i><a> </a></li> -->
              <li><i class="fa fa-envelope"></i> <a href="mailto:contact@thrymr.net"> contact@thrymr.net</a></li>
            </ul>
            </div>
        </div>

    </div>


  </div>

</section>
</div>
</div>
  <!-- <div class="container">
        <section class="landig-first-section">
                 <p>Hi ppoppopopop</p>
      <img src="/src/assets/images/imgFirst.png" alt="logo image">

        </section>
      </div> -->







  </div>
</template>
<script>
export default{
  data(){
    return{

    }
  },
  created: function () {
        // $.getScript('/src/assets/js/scroll.js');
      //  console.log("coll the login vue--------------");
      if((this.$cookie.get('X-Authorization') != null) && (this.$cookie.get('role') != null)){
        var app =this;
        app.errors.clear()
          this.$router.push('/post-login');
      }
      this.$store.commit('setForgotEmail','');

  },
}
</script>
<style>


</style>
