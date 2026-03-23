<template>

    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
        <div class="fixed z-10 inset-0 overflow-y-auto my-4">
        
        <div class="flex items-center sm:items-center justify-center min-h-full px-8 py-2 sm:p-0 animate__slideInUp" ref="modal">
        
            <div class="bg-white shadow rounded-lg w-1/2">
            <div class="p-6">
                <h3 class="text-md font-bold leading-6 text-gray-900">{{title}}</h3>


                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Name <span class="text-xs text-red-500 ml-2">{{ errors.description }}</span></p>
        
                    <input type="text" v-model="data.description" :disabled="action == 'view'" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Abbreviation <span class="text-xs text-red-500 ml-2">{{ errors.abbre }}</span></p>
        
                    <input type="text" v-model="data.abbre" :disabled="action == 'view'" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Training Center Type <span class="text-xs text-red-500 ml-2">{{ errors.address }}</span></p>
        
                    <select v-model="data.tc_type_id" :disabled="action == 'view'" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                        <option v-for="i in alltctypes" :id="i.id" :key="i.id" :value="i.id">
                            {{ i.description }}
                        </option>
                    </select>
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Address <span class="text-xs text-red-500 ml-2">{{ errors.address }}</span></p>
        
                    <textarea rows="2" v-model="data.address" :disabled="action == 'view'" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                    </textarea>
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Province <span class="text-xs text-red-500 ml-2">{{ errors.province }}</span></p>
        
                    <input type="text" v-model="data.province" :disabled="action == 'view'" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"/>
                    
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Region <span class="text-xs text-red-500 ml-2">{{ errors.region }}</span></p>
        
                    <input type="text" v-model="data.region" :disabled="action == 'view'" class="font-bold border-gray-300 w-auto rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"/>
                    
                </div>

                <div v-if="action != 'add'" class="my-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
  
                <!-- Administrator Dropdown -->
                <!-- <div class="relative">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Administrator</p>
                    <input
                    type="text"
                    :disabled="action == 'view'"
                    v-model="data.admin_name"
                    @focus="showAdminDropdown = true"
                    @input="filterAdminList"
                    @blur="hideAdminDropdown"
                    class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    autocomplete="off"
                    />
                    <ul v-if="showAdminDropdown && filteredAdmins.length"
                        class="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto rounded-md shadow-md text-sm">
                    <li
                        v-for="user in filteredAdmins"
                        :key="user.id.id"
                        @mousedown.prevent="selectAdmin(user)"
                        class="px-4 py-2 hover:bg-primary-100 cursor-pointer"
                    >
                        {{ formatUserName(user.id) }}
                    </li>
                    </ul>
                </div> -->

                <!-- Scholarship Focal Dropdown -->
                <!-- <div class="relative">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Scholarship Focal Tst</p>
                    <input
                    type="text"
                    :disabled="action == 'view'"
                    v-model="data.sf_name"
                    @focus="showSfDropdown = true"
                    @input="filterSfList"
                    @blur="hideSfDropdown"
                    class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    autocomplete="off"
                    />
                    <ul v-if="showSfDropdown && filteredSfs.length"
                        class="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto rounded-md shadow-md text-sm">
                    <li
                        v-for="user in filteredSfs"
                        :key="user.id.id"
                        @mousedown.prevent="selectSf(user)"
                        class="px-4 py-2 hover:bg-primary-100 cursor-pointer"
                    >
                        {{ formatUserName(user.id) }}
                    </li>
                    </ul>
                </div> -->


                </div>

                <div class="mt-5 text-end">
                    <button v-if="action != 'view'" type="button" @click="confirmAction" class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:text-xs">{{ btn_name }}</button>
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
                title : '',
                action : '',
                data : {
                    id : null,
                    description : null,
                    abbre : null,
                    address : null,
                    province : null,
                    region : null,
                    datetime_added : null,
                    tc_type_id : null,
                    administrator_id : null,
                    admin_name : null,
                    sc_focal_id : null,
                    sf_name : null,
                    list_sc_id : [],
                    list_q_id : [],
                },
                btn_name : '',
                errors : {
                    description : '',
                },
                alltctypes : '',
                allUsers: [],              // Shared list of users
                filteredAdmins: [],
                filteredSfs: [],
                showAdminDropdown: false,
                showSfDropdown: false,

                selectedQualification : '',
                selectedScholarship : '',

                allqualifications : [],
                allscholarships : [],

                list_all_scholarships: [],
                list_all_qualifications: []
            }
        },
        methods: {
        stringifyQualifications(data){
            var new_data = [];
            new_data = JSON.parse(data);
            if(this.allqualifications.length > 0){
                for(var i = 0; i < new_data.length; i++){
                    let u = this.allqualifications.find(item => item.id === new_data[i]); 
                    this.list_all_qualifications.push({
                        id : u.id,
                        description : u.description
                    })
                }
            }
           
        },
        stringifyScholarships(data){
            var new_data = [];
            new_data = JSON.parse(data);
            if(this.allscholarships.length > 0){
                for(var i = 0; i < new_data.length; i++){
                    let u = this.allscholarships.find(item => item.id === new_data[i]); 
                    this.list_all_scholarships.push({
                        id : u.id,
                        description : u.description
                    })
                }
            }
           
        },
        addScholarship() {
            const id = this.selectedScholarship;
            if (id && !this.data.list_sc_id.includes(id)) {
            this.data.list_sc_id.push(id);
            let u = this.allscholarships.find(item => item.id === id);  
            this.list_all_scholarships.push({
                id : u.id,
                description : u.description,
            });
            }
            this.selectedScholarship = '';
        },
        addQualification() {
            const id = this.selectedQualification;
            if (id && !this.data.list_q_id.includes(id)) {
            this.data.list_q_id.push(id);
            let u = this.allqualifications.find(item => item.id === id);  
            this.list_all_qualifications.push({
                id : u.id,
                description : u.description,
            });
            }
            this.selectedQualification = '';
        },
        getQualifications(){
            if(this.allqualifications.length > 0) this.allqualifications.splice(0);

            axios.get(process.env.VUE_APP_BASE_URL + '/qualifications/get_all')
            .then((res)=>{
                if(res.status == 200){
            
                    this.allqualifications = res.data;
                    
            
                }
                
            });
        },
        getScholarships(){
            if(this.allscholarships.length > 0) this.allscholarships.splice(0);

            axios.get(process.env.VUE_APP_BASE_URL + '/scholarships/get_all')
            .then((res)=>{
                if(res.status == 200){
            
                    this.allscholarships = res.data;
                    
            
                }
                
            });
        },
        formatUserName(i){
            if(i != null){
                return i.lname + ", " + i.fname + " " + (i.mname ? i.mname : '') + " " + (i.suffix ? i.suffix : '');
            }
            else return "-";
        },
        async getAllUsers() {
            try {
            const res = await axios.get(process.env.VUE_APP_BASE_URL + '/user/get_users'); // Replace with your API
            this.allUsers = res.data;
            } catch (err) {
            console.error('Failed to fetch users:', err);
            }
        },

        // Admin Field Logic
        filterAdminList() {
            const keyword = this.data.admin_name.toLowerCase();
           
            this.filteredAdmins = this.allUsers.filter(user =>
            this.formatUserName(user.id).toLowerCase().includes(keyword)
            );
        },
        selectAdmin(user) {
            this.data.admin_name = this.formatUserName(user.id);
            this.data.administrator_id = user.id.id;
            this.showAdminDropdown = false;
        },
        hideAdminDropdown() {
            setTimeout(() => {
            this.showAdminDropdown = false;
            }, 150);
        },

        // Scholarship Focal Logic
        filterSfList() {
            const keyword = this.data.sf_name.toLowerCase();
            this.filteredSfs = this.allUsers.filter(user =>
            this.formatUserName(user.id).toLowerCase().includes(keyword)
            );
        },
        selectSf(user) {
            this.data.sf_name = this.formatUserName(user.id);
            this.data.sc_focal_id = user.id.id;
            this.showSfDropdown = false;
        },
        hideSfDropdown() {
            setTimeout(() => {
            this.showSfDropdown = false;
            }, 150);
        },
            getTrainingCenterTypes(){
                axios.get(process.env.VUE_APP_BASE_URL + '/training_centers_type/get_all')
                .then((res)=>{
                
                    if(res.status == 200){
                        this.alltctypes = res.data;
                        this.data.tc_type_id = res.data[0].id;
                    }
                    
                });
            },
            findData(){
                axios.get(process.env.VUE_APP_BASE_URL + '/training_centers/find/' + this.data.id)
                .then((res)=>{
                
                    if(res.status == 200){
                
                        this.data.id = res.data.id;
                        this.data.description = res.data.description;
                        this.data.abbre = res.data.abbre;
                        this.data.address= res.data.address;
                        this.data.region= res.data.region;
                        this.data.province= res.data.province;
                        this.data.tc_type_id = res.data.tc_type_id;

                        if(res.data.administrator_id){
                           this.data.administrator_id = res.data.administrator_id.id;
                           this.data.admin_name = this.formatUserName(res.data.administrator_id.user_info); 
                        }

                        if(res.data.sc_focal_id){
                           this.data.sc_focal_id = res.data.sc_focal_id.id;
                           this.data.sf_name = this.formatUserName(res.data.sc_focal_id.user_info); 
                        }

                        if(res.data.list_sc_id){
                            this.data.list_sc_id = JSON.parse(res.data.list_sc_id);
                            this.stringifyScholarships(res.data.list_sc_id);
                        }
                        if(res.data.list_q_id){
                            this.data.list_q_id = JSON.parse(res.data.list_q_id);
                            this.stringifyQualifications(res.data.list_q_id);
                        } 
                        
                    }
                    
                });
            },
            confirmAction(){

                const today = new Date();
                const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const timestamp = date + ' ' + time;

                

                if(this.action == "add"){

                    this.data.datetime_added = timestamp;

                    this.errors.description = '';

                    var valid = true;

                    if(this.data.description == ''){
                        this.errors.description = "* Please input description";
                        valid = false;
                    }
                    if(valid){
                        axios.post(process.env.VUE_APP_BASE_URL + '/training_centers/add', this.data)
                        .then((res)=>{

                            if(res.status == 201){

                                    this.showNotification(1,"Success","Training Center added!");
                                    this.refreshData();
                                    this.closeModal();
                                

                            }
                            
                        });
                    }
                    
                }
                else if(this.action == "edit"){


                    if(this.data.list_q_id) this.data.list_q_id = JSON.stringify(this.data.list_q_id);
                    if(this.data.list_sc_id) this.data.list_sc_id = JSON.stringify(this.data.list_sc_id);

                    axios.post(process.env.VUE_APP_BASE_URL + '/training_centers/edit', this.data)
                    .then((res)=>{

                        if(res.status == 201){
                            
                            this.showNotification(1,"Success","Training Center updated!");
                            this.refreshData();
                            this.closeModal();

                        }
                        
                    });
                }

                
                
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

                this.action = val.action;

                this.getAllUsers();
                this.getTrainingCenterTypes();
                this.getScholarships();
                this.getQualifications();
                

                if(this.action == "add"){
                    this.title = "Add Training Center";
                    this.btn_name = "Add";
                    
                }
                else if(this.action == "edit"){
                    this.title = "Edit Training Center";
                    this.btn_name = "Edit";
                    this.findData();
                }
                else if(this.action == "view"){
                    this.title = "Training Center Information";
                    this.btn_name = "";
                    this.findData();
                }

                
                
                
            },
            immediate:true
          }
        }
    }
        
    </script>