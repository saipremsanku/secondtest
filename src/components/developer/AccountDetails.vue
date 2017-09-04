<template>
    <div>
        <app-adminHeader></app-adminHeader>
        
        <!-- wizard section-->
        <section class="main_wizard_content">
            <div class="container">
                
                <div class="row margin_wizard_top">
                    <div class="col-md-10 col-md-offset-1">
                        <!-- wizard steps-->
                        <p>wizard steps</p>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-10 col-md-offset-1">
                        <div class="profile-main-content">
                            <div class="form-section  form-section-padding-others">
                                <h4 class="header_things">Where Would you like to recieve payment for your kick-ass work<br>
                                   
                                </h4>
                                
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="col-md-12 ">
                                            <label class="control-label label-newsize" >Bank Name </label>
                                        </div>
                                        <div class=" form-group customform-group">
                                          <div class="col-md-12">
                                            <input  name="hourlyrate" type="text" placeholder="Please Enter Account Number" class="form-control">
                                          </div>
                                        </div>
                                    </div>
                                 <div class="col-md-6">
                                        <div class="col-md-12">
                                            <label class="control-label label-newsize" >Account Number</label>
                                        </div>
                                        <div class=" form-group customform-group">
                                          <div class="col-md-12">
                                            <input  name="hourlyrate" type="text" placeholder="Please Enter Account Number" class="form-control">
                                          </div>
                                        </div>
                                    </div>
                              
                                    
                                </div>
                                
                                
                                <div class="row educ-border-bottom">
                                         <div class="form-group">
                                             <div class="col-md-12">
                                              <label for="comment"> Bank Address</label>
                                              <textarea class="form-control" rows="5" id="Work Description"></textarea>
                                                </div>
                                            </div>
                                     </div>
                                
                                <div class="row margintop-30">
                                    <div class=" form-group customform-group">
                                        <div class="col-md-4">
                                          <label class="col-md-12 control-label" >SWIFT Code</label>
                                          <div class="col-md-12">
                                            <input  name="hours" type="text" placeholder="SWIFT Code" class="form-control" >
                                          </div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                
                                
                            </div>
                        </div>
                        <div class="profile-main-content-footer text-center">
                        <button type="button" class="btn btn-gray"
                                @click="goprevious">Previous</button>
                        <button type="button" class="btn btn-orange" @click="changedStep">Next</button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </section><!-- wizard section-->
        
    </div>
</template>

<script>
    
   import adminHeader  from "../../adminHeader.vue"
    
    export default{
      props:['updateStep'],
        data(){
            return{
                
            }
        },
        methods:{
              changedStep: function(){
                this.updateStep=6;
                this.$emit('changedWizarStep',this.updateStep);
                console.log("profile page updateState"+this.updateStep);
            },
            goprevious: function(){
                 this.updateStep=4;
                this.$emit('changedWizarStep',this.updateStep);
                console.log("profile page updateState"+this.updateStep);
            }
            
        },
         components:{
            "app-adminHeader":adminHeader
        },
    }
</script>