<template>
</template>

<script>

		export default {
				data(){
					return{

					}
				},
				created: function () {
						var postLoginURL = this.$store.getters.getPostLoginURL;
						if(postLoginURL.localeCompare('') != 0){
							this.$store.commit('setPostLoginURL', '');
							this.$router.push(postLoginURL);
						}

						if(this.$cookie.get('role').localeCompare('PRODUCT_OWNER')==0){
							if((this.$cookie.get('isEmailVerified').localeCompare('false')==0) || (this.$cookie.get('isMobileVerified').localeCompare('false')==0)){

											this.$router.push('/verify-user');
							}else{
										this.$router.push('/product-owner/dashboard');
							}



					 } else if((this.$cookie.get('role').localeCompare('PRODUCT_OWNER')==0) ||(this.$cookie.get('role').localeCompare('DEVELOPER')==0) ){
								if((this.$cookie.get('isEmailVerified').localeCompare('false')==0) || (this.$cookie.get('isMobileVerified').localeCompare('false')==0)){
										console.log('User not verified. Going to Verifcation page in post Login components');
										this.$router.push('/verify-user');
								}else{

										this.$root.startSocket();
										this.$root.startNotificationsSocket();
										if(this.$cookie.get('role').localeCompare('PRODUCT_OWNER')==0){
											if((this.$cookie.get('isEmailVerified').localeCompare('false')==0) || (this.$cookie.get('isMobileVerified').localeCompare('false')==0)){

															this.$router.push('/verify-user');
											}else{
														this.$router.push('/product-owner/dashboard');
											}



										}
               if(this.$cookie.get('role').localeCompare('DEVELOPER')==0){
                  this.$router.push('/developer/dashboard');
              }

								}
						}
						else if(this.$cookie.get('role').localeCompare('PROJECT_MANAGER')==0){
								this.$root.startSocket();
								this.$root.startNotificationsSocket();
								if((this.$cookie.get('isEmailVerified').localeCompare('false')==0) || (this.$cookie.get('isMobileVerified').localeCompare('false')==0)){

                       	this.$router.push('/verify-user');
								}else{
											this.$router.push('/ceo/dashboard');
								}

						}
						else if(this.$cookie.get('role').localeCompare('FINANCE_USER')==0){
								this.$root.startSocket();
								this.$root.startNotificationsSocket();
								if((this.$cookie.get('isEmailVerified').localeCompare('false')==0) || (this.$cookie.get('isMobileVerified').localeCompare('false')==0)){

                       	this.$router.push('/verify-user');
								}else{
											this.$router.push('/fm/dashboard');
								}

						}
						else if(this.$cookie.get('role').localeCompare('ADMIN')==0){
								this.$root.startSocket();
								this.$root.startNotificationsSocket();
								this.$router.push('/admin/dashboard');
						}
				}
		}

</script>
