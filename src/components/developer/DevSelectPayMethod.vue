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
                                <h5 class="header_things">One last step and your Signup will be Completed. We appreciate your patience for filling up the details
                                 </h5>
                                
                                
                                <div class="row educ-border-bottom">
                                     <div class="col-md-12">
                                    <h5>One-Time Sign Up Fee $30 </h5>
                                    </div>
                                </div>
                                
                                <div class="row educ-border-bottom">
                                     <div class="col-md-12">
                                    <h5>Select Payment Method </h5>
                                    </div>
                                </div>
                                
                                 <div class="row educ-border-bottom">
                                     <div class="col-md-12">
                                         <div class="radio">
                                          <label><input type="radio" name="optradio">Creadit Card</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row educ-border-bottom">
                                     <div class="col-md-12">
                                         <div class="radio">
                                          <label><input type="radio" name="optradio">Debit Card</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row educ-border-bottom">
                                     <div class="col-md-12">
                                    <div class="radio">
                                          <label><input type="radio" name="optradio">Net Banking</label>
                                        </div>
                                    </div>
                                </div>
                                
                              </div>
                            </div>
                      
                        <div class="profile-main-content-footer text-center">
                        <button type="button" class="btn btn-gray" @click="goprevious">Previous</button>
                        <button type="button" class="btn btn-orange">Submit</button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </section><!-- wizard section-->
        
    </div>
</template>
<script>
 $('#datetimepicker1').datetimepicker();
$('#datetimepicker2').datetimepicker();
</script>
<script>
    
   import adminHeader  from "../../adminHeader.vue"
    import Datepicker from 'vuejs-datepicker';
    
    export default{
            props:['updateStep'],
        data(){
            return{
                
            }
        },
        methods:{
          
             goprevious: function(){
                 this.updateStep=5;
                this.$emit('changedWizarStep',this.updateStep);
                console.log("profile page updateState"+this.updateStep);
            }
            
            
        },
         components:{
            "app-adminHeader":adminHeader,
             Datepicker
        },
    }
</script>