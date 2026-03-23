<template>

    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
        <div class="fixed z-10 inset-0 overflow-y-auto my-4">
        
        <div class="flex items-center sm:items-center justify-center min-h-full px-8 py-2 sm:p-0 animate__slideInUp" ref="modal">
        
            <div class="bg-white shadow rounded-lg w-1/3">
            <div class="p-6">
                <h3 class="text-md font-bold leading-6 text-gray-900">{{title}}</h3>

                <!-- <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">User type</p>  
        
                    <select v-model="data.ut_id" class="font-bold border-gray-300 w-auto rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                        <option v-for="i in alltypes" :id="i.id" :key="i.id" :value="i.id">
                            {{ i.description }}
                        </option>
                    </select>
                </div> -->
                <div class="my-2" v-if="data.ut_id.id == 3 || data.ut_id == 3">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Training Center</p>
        
                    <select v-model="data.tc_id" :disabled="action == 'view'" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                        <option v-for="i in alltc" :key="i.id" :value="i.id">{{ i.description }}</option>
                    </select>
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Email address <span class="text-xs text-red-500 ml-2">{{ errors.email }}</span></p>
        
                    <input type="email" v-model="data.email" :disabled="action == 'view'" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div>

                <div class="my-2" v-if="action == 'add'">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Password <span class="text-xs text-red-500 ml-2">{{ errors.password }}</span></p>
        
                    <input type="password" v-model="data.password" :disabled="action == 'view'" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div>

                <div class="my-2" v-if="action == 'add'">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Confirm Password <span class="text-xs text-red-500 ml-2">{{ errors.cpassword }}</span></p>
        
                    <input type="password" v-model="data.cpassword" :disabled="action == 'view'" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div>

                <div>

                    <div class="my-2">
                        <p class="text-sm text-gray-600 mb-2 flex items-center">First Name</p>
            
                        <input type="text" v-model="data.user_profile.fname" :disabled="action == 'view'" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                    </div>

                     <div class="my-2">
                        <p class="text-sm text-gray-600 mb-2 flex items-center">Middle Name</p>
            
                        <input type="text" v-model="data.user_profile.mname" :disabled="action == 'view'" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                    </div>

                     <div class="my-2">
                        <p class="text-sm text-gray-600 mb-2 flex items-center">Last Name</p>
            
                        <input type="text" v-model="data.user_profile.lname" :disabled="action == 'view'" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                    </div>

                    <div class="my-2">
                        <p class="text-sm text-gray-600 mb-2 flex items-center">Gender</p>
            
                        <select v-model="data.user_profile.gender" :disabled="action == 'view'" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Phone number</p>

                    <input
                        type="text"
                        v-model="data.user_profile.phone_number"
                        :disabled="action === 'view'"
                        class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        maxlength="11"
                        @input="onlyNumbers($event)"
                    >
                    </div>

                </div>

                <div class="mt-5 text-end">
                    <button type="button" v-if="action != 'view'" @click="confirmAction" class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:text-xs">{{ btn_name }}</button>
                    <button type="button" @click="closeModal" class="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 font-medium text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 sm:text-xs ml-2">Cancel</button>
                </div>
            </div>
            </div>
    
            </div>
        </div>
    
    </div>
        
    
    
    
        
    </template>
    
    <script>
    import axios from 'axios';

    export default{
        props: {
            item_data : Object,
            refreshData : Function,
            showNotification : Function,
        },
        data(){
            return{
                alltypes : '',
                alltc : '',
                title : '',
                action : '',
                data : {
                    id : 0,
                    ut_id : 0,
                    tc_id : null,
                    email : '',
                    password : '',
                    cpassword : '',
                    isApproved: 1,
                    isActive: 1,
                    datetime_added : '',
                    user_profile : {
                        user_id : null,
                        fname : null,
                        mname : null,
                        lname : null,
                        gender : 'Male',
                        phone_number: null,
                    },
                },
                
                btn_name : '',
                errors : {
                    description : '',
                },
                
            }
        },
        methods: {
            onlyNumbers(event) {
                // Remove non-numeric characters
                event.target.value = event.target.value.replace(/\D/g, '');
                // Sync with v-model
                this.data.user_profile.phone_number = event.target.value;
            },
            findData(){
                axios.get(process.env.VUE_APP_BASE_URL + '/user/find_user/' + this.data.id)
                .then((res)=>{
                
                    if(res.status == 200){
                
                        this.data = res.data;
                        
                
                    }
                    
                });
            },
            async confirmAction(){

                const today = new Date();
                const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const timestamp = date + ' ' + time;

                
                if(this.action == "add"){

                    this.data.datetime_added = timestamp;

                    this.errors.description = '';

                    var valid = true;

                    if(this.data.email == ''){
                        this.errors.email = "* Please input email";
                        valid = false;
                    }
                    else if(this.data.password == ''){
                        this.errors.password = "* Please input password";
                        valid = false;
                    }
                    else if(this.data.cpassword == ''){
                        this.errors.cpassword = "* Please input confirm password";
                        valid = false;
                    }
                    else if(this.data.password != this.data.cpassword){
                        this.errors.cpassword = "* Password does not match";
                        valid = false;
                    }
                    if(valid){
                        axios.post(process.env.VUE_APP_BASE_URL + '/user/register', this.data)
                        .then((res) => {
                            if (res.status === 201) {
                                const userId = res.data.id;

                                this.data.user_profile.user_id = userId;

                                axios.post(process.env.VUE_APP_BASE_URL + '/user_profile/add', this.data.user_profile)
                                    .then((res) => {
                                        if (res.status === 201) {
                                            this.showNotification(1, "Success", "User added!");
                                            this.refreshData();
                                            this.closeModal();
                                        }
                                    });
                            }
                        });
                    }
                    
                }
                else if(this.action == "edit"){

                    try {
                        const userRes = await axios.post(process.env.VUE_APP_BASE_URL + '/user/edit', this.data);

                        if (userRes.status === 201) {

                            console.log(this.data.user_profile);
                        const profileRes = await axios.post(process.env.VUE_APP_BASE_URL + '/user_profile/edit', this.data.user_profile);

                        if (profileRes.status === 201) {
                            this.showNotification(1, "Success", "User and profile updated!");
                            this.refreshData();
                            this.closeModal();
                        } else {
                            this.showNotification(3, "Error", "Failed to update user profile.");
                        }
                        } else {
                        this.showNotification(3, "Error", "Failed to update user.");
                        }
                    } catch (error) {
                        console.error(error);
                        this.showNotification(3, "Error", "An unexpected error occurred.");
                    }

                }

                
                
            },
            getTrainingCenters(){
                axios.get(process.env.VUE_APP_BASE_URL + '/training_centers/get_all')
                .then((res)=>{
                
                    if(res.status == 200){
                        this.alltc = res.data;
                        this.data.tc_id = this.data.ut_id.id == 2 ? res.data[0].id : null;
                    }
                    
                });
            },
            closeModal(){
                this.$refs.modal.classList.remove('animate__slideInUp');
                this.$refs.modal.classList.add('animate__slideOutDown');

                setTimeout(() => {
                    this.$emit('close-modal');
                }, 300)
            }
        },
        watch: {
            item_data: {
            handler(val){
                this.data.id = val.id;
                this.data.ut_id = val.type;
                this.action = val.action;

                this.getTrainingCenters();

                if(this.action == "add"){
                    this.title = "Add User";
                    this.btn_name = "Add";
                }
                else if(this.action == "edit"){
                    this.title = "Edit User";
                    this.btn_name = "Edit";
                    this.findData();
                }
                else if(this.action == "view"){
                    this.title = "User Information";
                    this.btn_name = "";
                    this.findData();
                }
                
                
            },
            immediate:true
          }
        }
    }
        
    </script>