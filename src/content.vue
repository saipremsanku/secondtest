<template id="step-navigation-step-template">
            <li v-bind:class="indicatorclass">
                <div class="step"><i :class="step.icon_class"></i></div>
                <div class="caption hidden-xs hidden-sm">
                    Step {{ step.id }}
                </div>
            </li>
        </template>




      <script>
          import Vue from 'vue';

 Vue.component('step-navigation-step', {
    template: '#step-navigation-step-template',

    props: ['step', 'currentstep'],

    computed: {
        indicatorclass: function() {
            return {
                'active': (this.step.id == this.currentstep),
                'complete': (this.currentstep > this.step.id)
            }
        }
    }
});



</script>