  <template id="step-template">
        <div class=" row step-wrapper text-right"  v-bind:class="{ 'active': active }">
        <div class=" col-md-11">
            <button
                    class="btn btn-gray"
                    @click="lastStep"
                    :disabled="firststep">
                Back
            </button>
            <button
                    class="btn btn-orange"
                    @click="nextStep"
                    :disabled="laststep">
                Next
            </button>
            <button
                    class="btn btn-orange"
                    v-if="laststep" data-target="#preview_requestedform" data-toggle="modal">
                Proceed to Submit
            </button>
        </div>
        </div>
    </template>


<script>

     import Vue from 'vue';

Vue.component('step', {
    template: '#step-template',

    props: ['step', 'stepcount', 'currentstep'],

    computed: {
        active: function() {
            return (this.step.id == this.currentstep)
        },

        firststep: function() {
            return (this.currentstep == 1)
        },

        laststep: function() {
            return (this.currentstep == this.stepcount)
        }
    },

    methods: {
        nextStep: function() {
            this.$dispatch('step-change', ++this.currentstep);

        },

        lastStep: function() {
            this.$dispatch('step-change', --this.currentstep)
        }
    }
});
</script>