
<template>

<div class="wrapper">
    <!-- Main Header -->
    <app-adminHeader></app-adminHeader>
    <div v-if="loggedInRole === 'ADMIN'">
        <AdminSidebar></AdminSidebar>

    </div>

    <div v-if="loggedInRole === 'PROJECT_MANAGER'">
        <pmSidebar :projectRequestId="projectRequestId"></pmSidebar>
    </div>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Project information dynamic data  -->

        <alert-component v-show="isalertShow" :success="success" :message="message" @changeisaletShow="isalertShow=$event">
        </alert-component>



        <div v-if="loggedInRole === 'ADMIN'">
            <AdminProjectHeader></AdminProjectHeader>
        </div>
        <div v-if="loggedInRole === 'PROJECT_MANAGER'">
            <projectInfoHeader></projectInfoHeader>
        </div>
        <!-- <h2 class="sub_heading story com-padding">QA</h2> -->

        <section class="content-header  remove-tab-shadow  nav-remove-content-padding">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="Test Cases" name="TestCase">

                    <section class="content content-padding-top test-content">
                        <div class="PMepicContainer">
                            <div class="row mangeEpic">
                                <div class="">
                                    <div class="col-md-3 col-lg-2 text-center ">
                                        <div class="row">
                                            <div class="manageEpicBlock btn-ripple mgt-0">
                                                <button class="btn btn-orange btn-lg pull-left" data-toggle="modal" v-if="!isAdmin" @click="openTestScenarioModal"><i class="fa fa-plus-circle epic-btn-icon" aria-hidden="true"></i> Add Test Scenario</button>
                                                <br>
                                                <ul class="list-group epicAdd mangeEpic epic-active">
                                                    <li :class="{ 'active' : isSelected(index) }" class="list-group-item " v-for="(testScenario,index) in testScenarioList" v-on:click="getAllTestCases(testScenario,index)">

                                                        <div class="row">
                                                            <div class="col-md-12 text-left"><span class="epicName pull-left">{{testScenario.testScenarioIdentifier}}</span></div>
                                                        </div>

                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-9 col-lg-10">
                                    <div class="epicMessage story" v-if="clickedTestScenario!=''">
                                        <div class="storyTitle">


                                            <div class="row">
                                                <div class="col-md-10">
                                                    <p class="estValue">#{{clickedTestScenario.testScenarioIdentifier}}</p>
                                                </div>
                                                <div class="col-md-2 paddLeft_0 text-right">
                                                    <span class="shift-right-li-epic editEpic" v-if="!isAdmin">
                                     <a type="button"  class="cursor-pointer "  @click="editTestScenarioModal(clickedTestScenario)"><span class="edit_Epic"><i class="fa fa-pencil" aria-hidden="true" ></i></span></a>
                                                    <a type="button" class="cursor-pointer " @click="deleteTestScenario(clickedTestScenario)"><span class="edit_Epic"><i class="fa fa-trash-o " aria-hidden="true" ></i></span></a>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <p style="margin: 0px;">{{clickedTestScenario.testScenarioDescription}}</p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <p class="estValue">Epic - {{clickedTestScenario.epicName}}</p>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-12">
                                                    <p class="estValue">Story - {{clickedTestScenario.userStoryName}}</p>
                                                </div>
                                            </div>

                                            <p class="estValue">Created on: <span>{{convertUtcToLocaDateTime(clickedTestScenario.createdDateInMillis)}}</span></p>
                                            <p class="no-border-bottom">{{clickedTestScenario.description}}</p>

                                        </div>

                                        <appTestCases :projectLeadStatus="projectLeadStatus" :clickedTestScenario="clickedTestScenario" :testCasesList="testCasesList" :success="success" :message="message" :isalertShow="isalertShow" @changeisaletShow="isalertShow=$event" @changesuccess="success=$event"
                                        @changemessage="message=$event"></appTestCases>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>




                </el-tab-pane>
                <el-tab-pane label="Test Run" name="TestRun">
                    <app-test-run :testRunList="testRunList" :allEpicStorys="allEpicStorys" isalertShow="isalertShow" success="success" message="message" @changeSuccess="success=$event" @changeMessage="message=$event" @changeIsalertShow="isalertShow=$event"></app-test-run>
                </el-tab-pane>

                <el-tab-pane label="Defects" name="Defect" class="pagintion-margin-bottom">
                    <section class="content content-padding-top test-content">
                        <app-Defects :isDefectTabClicked="isDefectTabClicked"></app-Defects>
                    </section>
                </el-tab-pane>
                <el-tab-pane label="Labels" name="Labels" class="pagintion-margin-bottom">
                    <section class="content content-padding-top test-content">
                          <app-Labels :isDefectTabClicked="isLabelTabClicked"></app-Labels>
                    </section>
                </el-tab-pane>

                <el-tab-pane label="UAT Issues" name="UATIssue" class="pagintion-margin-bottom">
                    <section class="content content-padding-top test-content">
                        <app-uat-issue :isDefectTabClicked="isUatClicked"></app-uat-issue>
                    </section>
                </el-tab-pane>

            </el-tabs>

        </section>

        <!-- Main content -->


    </div>



    <!-- add Test Scenario  -->

    <div class="modal fade" id="addTestScenario" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" v-if="testScenario.id">Update Test Scenario</h4>
                    <h4 class="modal-title" v-else>Add Test Scenario</h4>
                </div>




                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">

                            <form id="epicForm" @submit.prevent="addTestScenario">

                                <div class="form-group epic" :class="{'textarea': true, 'is-danger': errors.has('testScenario.testScenarioDescription')}">
                                    <textarea class="form-control" name="testScenarioDescription" v-model="testScenario.testScenarioDescription" placeholder="Test Scenario" v-validate data-vv-rules="required"></textarea>
                                    <p class="text-danger" v-if="errors.has('testScenarioDescription')">Please specify test scenario</p>
                                </div>
                                <div class="form-group">
                                    <select class="form-control" name="epicId" @change="getAllStory" v-model="testScenario.epicId" :class="{'select': true, 'is-danger': errors.has('epicId')}" v-validate data-vv-rules="required">
                                        <option value="">Select Epic</option>
                                        <option v-for="epic in epics" :value="epic.id">{{epic.name}}</option>
                                    </select>
                                    <p class="text-danger" v-if="errors.has('epicId')">Please select epic</p>
                                </div>
                                <div class="form-group">
                                    <select class="form-control" name="userStoryId" v-model="testScenario.userStoryId" :class="{'select': true, 'is-danger': errors.has('userStoryId')}" v-validate data-vv-rules="required">
                                        <option value="">Select Story</option>
                                        <option v-for="story in storys" :value="story.id">{{story.name}}</option>
                                    </select>
                                    <p class="text-danger" v-if="errors.has('userStoryId')">Please select Story</p>
                                </div>
                                <button type="button" class="btn btn-gray" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-orange" :disabled="enableButton" v-if="testScenario.id">Update</button>
                                <button type="submit" class="btn btn-orange" :disabled="enableButton" v-else>ADD</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>





</div>

</template>

<script>


import adminHeader from "../../adminHeader.vue"
import footer from "../../footer.vue"
import pmSidebar from "../../ProjectSidebar.vue"
import POStory from '../../POStory.vue';
import TestCases from './TestCases.vue';
import projectInfoHeader from "../../projectInfoHeader.vue";
import Defects from './Defects.vue';
import Labels from './Labels.vue';
import TestRun from './TestRun.vue'
import AdminSidebar from "../../SupperAdminSideBar.vue";
import adminProjectHeader from "../admin/adminProjectHeader.vue";
import AlertComonent from "../alert/Alert.vue";
import UATIssue from "../productOwner/UATIssue.vue"


export default {
    data() {
            return {
              isUatClicked:false,
                isError: false,
                errorMessage: '',
                isalertShow: false,
                success: '',
                message: '',
                loggedInRole: this.$store.getters.getLoggedInUser.role,
                activeName: 'TestCase',
                projectRequestId: '',
                epics: [],
                testScenarioList: [],
                testCasesList: [],
                selectedEpic: '',

                projectProposalId: '',
                clickedTestScenario: '',
                epicIndex: '',
                projectLeadStatus: false,
                activeClass: '',
                selected: 0,
                storys: '',
                testScenarioIndex: '',
                storyId: '',
                enableButton: false,
                activeTaskId: '',
                testScenario: {
                    testScenarioDescription: '',
                    projectId: '',
                    epicId: '',
                    userStoryId: '',
                    id: '',

                },
                isDefectTabClicked: false,
                isLabelTabClicked:false,
                testRunList: [],
                allEpicStorys: []
            }
        },
        components: {
            "app-adminHeader": adminHeader,
            "pmSidebar": pmSidebar,
            "appTestCases": TestCases,
            "projectInfoHeader": projectInfoHeader,
            "app-Defects": Defects,
            "app-Labels": Labels,
            "app-test-run": TestRun,
            'AdminSidebar': AdminSidebar,

            'appFooter': footer,
            'AdminProjectHeader': adminProjectHeader,
            "alert-component": AlertComonent,
            "app-uat-issue":UATIssue
        },
        created: function() {
            this.projectRequestId = this.$route.params.projectRequestId;
            if (this.$route.query.showDefect) {
                this.activeName = 'Defect';
            }
        },
        watch: {
            '$route': function(newRoute, oldRoute) {
                if (oldRoute.fullPath != newRoute.fullPath) {
                    if (this.$route.query.showDefect) {
                        this.activeName = 'Defect';
                    }
                }
            },
            route: {
                canReuse: true,
            },
        },
        mounted: function() {
            this.getAllEpicAndStorys();
            this.getAllTestScenario();
            // /api/dev-pm/get-test-cases-in-project/2
        }, computed: {
            isAdmin: function() {
                return this.loggedInRole === 'ADMIN';
            },
        },
        methods: {

            isSelected(index) {
                    var app = this;
                    return index === app.selected
                },
                getAllTestCases: function(testScenario, index) {

                    var app = this;
                    app.selected = index;
                    app.testScenarioIndex = index

                    app.clickedTestScenario = testScenario;
                    console.log("test senosfsfds-");
                    console.log(app.clickedTestScenario)
                        // app.storyId = testScenario.userStoryId;
                    app.$store.commit('setSpinner', true);
                    app.$http.get(
                        this.$store.state.SERVER_URL + '/api/dev-pm/get-test-cases-by-test-scenario/' + testScenario.id, {
                            headers: {
                                "X-Authorization": app.$cookie.get('X-Authorization')
                            },
                        }
                    ).then(function(response) {
                        app.$store.commit('setSpinner', false);
                        app.testCasesList = response.data.payLoad;
                        //console.log(app.testCasesList);
                    });
                },
                showEditAndDelete(projectStatus) {
                    var app = this;
                    if (projectStatus == 'REQUESTED' || projectStatus == 'REVISION_REQUESTED') {
                        app.projectLeadStatus = true;
                    }
                },

                getAllEpicAndStorys: function() {
                    var app = this;
                    app.$http.get(
                        this.$store.state.SERVER_URL + '/api/po-pm/get-all-epic-and-story-of-project/' + app.$route.params.projectRequestId, {
                            headers: {
                                "X-Authorization": app.$cookie.get('X-Authorization')
                            },
                        }
                    ).then(function(response) {
                        if (response.data.payLoad) {
                            app.epics = response.data.payLoad.epicList;
                            app.showEditAndDelete(response.data.payLoad.projectLeadStatus);
                        }
                        if (app.epics.length > 0) {
                            app.storys = app.epics[0].userStorys;
                            app.activeClass = 'active';
                        }
                    });


                },

                getAllTestScenario: function() {
                    var app = this;
                    app.$http.get(
                        this.$store.state.SERVER_URL + '/api/dev-pm/get-test-scenarios-in-project/' + app.$store.getters.getProjectInfo.projectId, {
                            headers: {
                                "X-Authorization": app.$cookie.get('X-Authorization')
                            },
                        }
                    ).then(function(response) {
                        if (response.data.status === 'SUCCESS') {
                            app.testScenarioList = response.data.payLoad;
                            if (app.testScenarioList && app.testScenarioList.length > 0) {
                                app.getAllTestCases(app.testScenarioList[0], 0);
                            }
                        }
                        console.log(response)
                    });
                },

                openTestScenarioModal: function() {
                    var app = this;
                    app.testScenario = {};
                    app.testScenario.epicId = '';
                    app.testScenario.userStoryId = '';
                    $('#addTestScenario').modal('show');
                    setTimeout(() => {
                        app.errors.clear();
                    }, 100);

                },
                editTestScenarioModal(clickedTestScenario) {
                    console.log(clickedTestScenario)
                    var app = this;
                    app.enableButton = false;
                    app.testScenario = {};
                    app.testScenario = app.clickedTestScenario;
                    var epic = '';
                    for (epic of app.epics) {
                        console.log(epic)
                        if (app.testScenario.epicId === epic.id) {
                            app.storys = epic.userStorys
                            break;
                        }
                    }

                    console.log(app.testScenario);
                    //
                    // console.log(app.clickedTestScenario)
                    // console.log(app.TestScenarioObject)
                    $('#addTestScenario').modal('show');
                },
                deleteTestScenario(clickedTestScenario) {
                    var app = this;
                    app.testScenario = clickedTestScenario;
                    app.$swal({
                        title: 'Are you sure?',
                        text: "This test scenario may contain test case. Deleting test scenario will delete all its test cases as well!",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes'
                    }).then(function() {
                        app.$http.post(
                            app.$store.state.SERVER_URL + '/api/dev-pm/delete-test-scenario',
                            app.testScenario, {
                                headers: {
                                    "X-Authorization": app.$cookie.get('X-Authorization')
                                },
                            }
                        ).then(function(response) {

                            if (response.data.status === "SUCCESS") {

                                app.testScenarioList.splice(app.testScenarioIndex, 1);
                                app.storys = [];
                                app.clickedTestScenario = '';

                            } else {
                            //    app.errorMessage = response.data.errorMessage;
                              //  app.isError = true;
                                app.isalertShow=true;
                                app.success=false;
                                app.message= response.data.errorMessage;

                                // app.$emit('changeisaletShow',true);
                                //  app.$emit('changesuccess',false);
                                //    app.$emit('changemessage',response.data.errorMessage);
                                console.log(response.data.errorMessage);
                            }
                        });
                    })

                },


                getAllStory: function() {

                    var app = this;
                    var epic = '';
                    for (epic of app.epics) {
                        console.log(epic)
                        if (app.testScenario.epicId === epic.id) {
                            app.storys = epic.userStorys
                            break;
                        }
                    }
                },


                addTestScenario(e) {
                    e.preventDefault();
                    var app = this;
                    app.$validator.validateAll()
                    app.testScenario.projectId = app.$store.getters.getProjectInfo.projectId;
                    if (!app.errors.any()) {
                        app.enableButton = true;
                        app.$store.commit('setSpinner',true);
                        app.$http.post(
                            app.$store.state.SERVER_URL + '/api/dev-pm/save-test-scenario',
                            app.testScenario, {
                                headers: {
                                    "X-Authorization": app.$cookie.get('X-Authorization')
                                },
                            }
                        ).then(function(response) {
                            app.enableButton = false;
                            app.$store.commit('setSpinner',false);
                            console.log("updated test scenarop ======= ")
                            console.log(response)
                            $('#addTestScenario').modal('hide');
                            if (response.data.status === 'SUCCESS') {
                                app.enableButton = false;
                                if (app.testScenario.id) {
                                    app.testScenarioList[app.testScenarioIndex] = response.data.payLoad;
                                    app.clickedTestScenario = response.data.payLoad;
                                } else {
                                    app.testScenarioList.push(response.data.payLoad);
                                }
                            } else {
                                app.enableButton = false;
                                console.log("error is coming")
                            }
                        })
                    }

                },
                handleClick: function(tab, event) {
                    console.log(tab.name);
                    if (tab.name == 'TestRun') {
                        this.getTestRun();
                        this.getAllEpicStory();
                        this.isDefectTabClicked = false;
                        this.isUatClicked=false;
                    } else if (tab.name === 'Defect') {
                        this.isDefectTabClicked = true;
                        this.isUatClicked=false;
                    }else if (tab.name === 'UATIssue') {
                        this.isUatClicked = true;
                        this.isDefectTabClicked = false;
                    }
                    else if (tab.name === 'Labels') {
                        this.isLabelTabClicked = true;
                        this.isUatClicked = false;
                    }

                    //console.log(event);
                },

                getTestRun() {

                    var app = this;
                    app.$http.get(
                        app.$store.state.SERVER_URL + '/api/dev-pm-admin/get-test-execution-runs-in-project/' + app.$store.getters.getProjectInfo.projectId, {
                            headers: {
                                "X-Authorization": app.$cookie.get('X-Authorization')
                            },
                        }
                    ).then(response => {
                        if (response.data.status == 'SUCCESS') {
                            console.log('get all test run-----------------');
                            app.testRunList = response.data.payLoad;
                        } else {

                        }

                    }, response => {

                    });
                },

                getAllEpicStory() {

                    var app = this;
                    app.$http.get(
                        app.$store.state.SERVER_URL + '/api/dev-pm-admin/get-epics-in-project/' + app.$store.getters.getProjectInfo.projectId, {
                            headers: {
                                "X-Authorization": app.$cookie.get('X-Authorization')
                            },
                        }
                    ).then(response => {
                        if (response.data.status == 'SUCCESS') {
                            console.log('get all test run--epic and story---------------');
                            app.allEpicStorys = response.data.payLoad;
                        } else {

                        }
                        // success callback
                    }, response => {
                        // error callback
                    });
                    //
                },
                convertUtcToLocaDateTime(date) {
                    var moment = require('moment-timezone');
                    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                    //console.log("convertStringtoDate------------------------>"+timeZone)
                    return moment(date).tz(timeZone).format('DD-MM-YYYY')
                },
        }
}

</script>
