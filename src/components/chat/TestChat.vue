
<template>



<div>


    <div class="wrapper">
        <!-- Main Header -->
        <app-adminHeader></app-adminHeader>
        <div class="content-wrapper">
            <section class="content">
                <h2 class="text-center">Profile</h2>
                <div class="row">
                   
                    <div class="col-md-12">
            
                       
                        <div class="profile-main-content">
                             <div class="row">
                              <div class="col-md-2">
                                       <div class="image-section">
                                                            <div class="col-md-12">
                                                                <div class="image-border margin-left-class">
                                                                    <img src="../../assets/images/avatar.png" alt="ProfileImage">
                                                                     <label>
                                                                    <button type="button" class="btn btn-attachemnet btn-attachemnet-second-step">
                                                                        upload photo
                                                                    </button>
                                                                        <input type="file" class="input-hidden"  name="file" V-model="file" @change="onFileChange">
                                                                         
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                              
                            </div>
                         <div class="col-md-10">
                            <div class="form-section">
                                <form id="profileForm">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class=" form-group customform-group">
                                                <label class="col-md-12 control-label label-newsize">First Name</label>
                                                <div class="col-md-12">
                                                    <input name="firstName" type="text" class="form-control" v-model="profile.firstName">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class=" form-group customform-group">
                                                <label class="col-md-12 control-label label-newsize">Last Name</label>
                                                <div class="col-md-12">
                                                    <input name="lastName" type="text" class="form-control" v-model="profile.lastName">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class=" form-group customform-group">
                                                <label class="col-md-12 control-label label-newsize">E-Mail</label>
                                                <div class="col-md-12">
                                                    <input name="email" type="email" class="form-control" v-model="profile.email">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class=" form-group customform-group">
                                                <label class="col-md-12 control-label label-newsize">Contact No.</label>
                                                <div class="col-md-12">
                                                    <input name="mobileNumber" type="text" class="form-control" v-model="profile.mobileNumber">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class=" form-group customform-group">
                                                <label class="col-md-12 control-label label-newsize">Country</label>
                                                <div class="col-md-12">
                                                    <select class="form-control" v-model="profile.countryId">
                                        <option  value="" disabled>Select country</option>
                                                <option  v-for="country in countryList" :value="country.id" :selected="country.id == profile.countryId">{{country.name}}</option>
                                            </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class=" form-group customform-group">
                                                <label class="col-md-12 control-label label-newsize">City</label>
                                                <div class="col-md-12">
                                                    <input name="city" type="text" class="form-control" v-model="profile.city">
                                            
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class=" form-group customform-group">
                                                <label class="col-md-12 control-label label-newsize">Zipcode</label>
                                                <div class="col-md-12">
                                                    <input name="postalCode" type="text" class="form-control" v-model="profile.postalCode">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class=" form-group customform-group">
                                                <label class="col-md-12 control-label label-newsize">Full Address</label>
                                                <div class="col-md-12">
                                                    <textarea rows="5" class="form-control" name="line1Address" v-model="profile.line1Address"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                              
                                </form>

                            </div>
    </div>
                        
        </div>
    </div>
                        <div class="profile-main-content-footer text-center">
                            <button type="button" class="btn btn-orange" @click="updateProfile()">Update</button>
                        </div>

                    </div>
                </div>
            </section>
        </div>


    </div>


</div>


</template>

<script>
    
     import adminHeader  from "../../adminHeader.vue"
    
    export default{

        data(){
            return{
                profile:{
                 firstName:'',
                lastName:'',
                email:'',
                mobileNumber:'',
                countryName:'',
                city:'',
                postalCode:'',
                line1Address:'',
                attachedfiles:'',
                countryId:'',
                developerId:''
                    
                },
                countryList:'',
                file:'',
                files:[]
              
                   
            }
        },
        mounted: function(){
            this.getProfileDetails();
            this.getallCountry();
        },   
        methods:{
            
          filesChange(fieldName, fileList) {
            var app = this;
            const formData = new FormData();

            if (!fileList.length) return;

        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append('file', fileList[x], fileList[x].name);
          });
        app.$http.post('http://localhost:8084/data/multipart-store', formData,
                {
                }).then((response) => {
                           app.files.push(fileList[0]);
            }, (response) => {
          });
              
              
      },
            
            
         getProfileDetails: function(){
            var app = this;
                app.$http.get(
                    this.$store.state.SERVER_URL + '/api/developer/get-developer-details', {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')

                        },

                    }
                ).then(function(response) {
                    
                    app.profile = response.data.payLoad;
                    console.log(response.data.payLoad);
                    //app.profile.firstName =
                      

                      console.log("get profile details-----");
                   // console.log(app.profile);
               

                });

        },
            getallCountry: function(){
            var app = this;
                app.$http.get(
                    this.$store.state.SERVER_URL + '/get-all-countries', {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')

                        },

                    }
                ).then(function(response) {
                    
                    app.countryList = response.data.payLoad;
                    console.log(app.countryList);
               

                });

        },
            
            
            updateProfile: function(){
            var app =this;
             app.$http.post(
            app.$store.state.SERVER_URL+'/api/developer/update-developer-profile', 
                app.profile,
                {
                        headers: {
                            "X-Authorization": app.$cookie.get('X-Authorization')

                        },
  
                }
            
               ).then(function (response) {
                console.log(response.data);
                if(response.data.status=="SUCCESS"){
                    app.profile= response.data.payload;
                   }else{
                       console.log('Error!:', response.data.errorMessage);
                   }
                 
                
            }, function (response) {
                console.log('Error!:', response.data);
               
            });
            },
       
        },
         components:{
            "app-adminHeader":adminHeader
        },
    }
    

    
</script>

<style scoped="true">
    
    .form-section{
        padding-top: 25px !important;
        
    }
    .margin-left-class{
            margin-left: 26px;
    }
    
   .btn-attachemnet{
            left: -23px !important;
    position: relative !important;
    top: -15px !important;
       border: none !important;
    }
    
    .form-section{
    padding-top: 25px !important;
    left: -31px !important;
    position: relative;
}
    
    .profile-main-content {
    height: auto;
    position: relative;
    width: 80%;
    margin: auto;
}
    
</style>