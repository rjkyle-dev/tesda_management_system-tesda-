<template>

    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
        <div class="fixed z-10 inset-0 overflow-y-auto my-4">
        
        <div class="flex items-center sm:items-center justify-center min-h-full px-8 py-2 sm:p-0 animate__slideInUp" ref="modal">
        
            <div class="bg-white shadow rounded-lg w-1/2">
            <div class="p-6">
                <h3 class="text-md font-bold leading-6 text-gray-900">{{title}}</h3>

                <div v-if="action == 'edit'" class="my-2 grid grid-cols-1 sm:grid-cols-1 gap-2">
                    <div>
                    <p class="text-sm text-gray-600 mb-2 flex items-center">List of Scholarships</p>

                    <!-- Dropdown -->
                    <select
                    v-model="selectedScholarship"
                    @change="addScholarship"
                    class="border rounded px-3 py-1 text-sm w-full"
                    >
                    <option disabled value="">Select Scholarship</option>
                    <option
                        v-for="type in allscholarships"
                        :key="type.id"
                        :value="type.id"
                    >
                        {{ type.description }}
                    </option>
                    </select>

                    <!-- Tags (Horizontal Order Display) -->
                    <div class="flex flex-col mt-3 gap-2">
                        <div
                            v-for="i in list_all_scholarships"
                            :key="i.id"
                            class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center"
                        >
                            <!-- Delete Icon -->
                            <img src="../../assets/action_icon_delete.png" class="h-5 w-5 mr-2" @click="deleteListScholarship(i.id)"/>
                            
                            <!-- Display Order Number and Billing Type Description -->
                            {{ i.description }}
                        </div>
                    </div>

                    </div>

                    <div>
                    <p class="text-sm text-gray-600 mb-2 flex items-center">List of Qualifications</p>

                    <!-- Dropdown -->
                    <select
                    v-model="selectedQualification"
                    @change="addQualification"
                    class="border rounded px-3 py-1 text-sm w-full"
                    >
                    <option disabled value="">Select Qualification</option>
                    <option
                        v-for="type in allqualifications"
                        :key="type.id"
                        :value="type.id"
                    >
                        {{ type.description + " - " + type.hrs+ "hrs"}}
                    </option>
                    </select>

                    <!-- Tags (Horizontal Order Display) -->
                    <div class="flex flex-col mt-3 gap-2">
                        <div
                            v-for="i in list_all_qualifications"
                            :key="i.id"
                            class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center"
                        >
                            <!-- Delete Icon -->
                            <img src="../../assets/action_icon_delete.png" class="h-5 w-5 mr-2" @click="deleteQualification(i.id)"/>
                            
                            <!-- Display Order Number and Billing Type Description -->
                            {{ i.description + " - " + i.hrs + "hrs" }}
                        </div>
                    </div>
                    </div>
                    
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
        deleteQualification(id) {
            this.list_all_qualifications =
                this.list_all_qualifications.filter(item => item.id !== id);

            const index = this.data.list_q_id.indexOf(id);

            if (index !== -1) {
            this.data.list_q_id.splice(index, 1);
            }
        },
        deleteListScholarship(id) {
          this.list_all_scholarships =
                this.list_all_scholarships.filter(item => item.id !== id);

            const index = this.data.list_sc_id.indexOf(id);

            if (index !== -1) {
            this.data.list_sc_id.splice(index, 1);
            }
        },
        stringifyQualifications(data){
            var new_data = [];
            new_data = JSON.parse(data);
            if(this.allqualifications.length > 0){
                for(var i = 0; i < new_data.length; i++){
                    let u = this.allqualifications.find(item => item.id === new_data[i]); 
                    this.list_all_qualifications.push({
                        id : u.id,
                        description : u.description,
                        hrs : u.hrs
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
                hrs : u.hrs,
            });
            }
            this.selectedQualification = '';
        },
        async getQualifications(){
            if(this.allqualifications.length > 0) this.allqualifications.splice(0);

            await axios.get(process.env.VUE_APP_BASE_URL + '/qualifications/get_all')
            .then((res)=>{
                if(res.status == 200){
            
                    this.allqualifications = res.data;
                    
            
                }
                
            });
        },
        async getScholarships(){
            if(this.allscholarships.length > 0) this.allscholarships.splice(0);

            await axios.get(process.env.VUE_APP_BASE_URL + '/scholarships/get_all')
            .then((res)=>{
                if(res.status == 200){
            
                    this.allscholarships = res.data;
                    
            
                }
                
            });
        },
            async findData(){
                await axios.get(process.env.VUE_APP_BASE_URL + '/training_centers/find/' + this.data.id)
                .then((res)=>{
                
                    if(res.status == 200){
                
                        this.data.id = res.data.id;
                        this.data.description = res.data.description;
                        this.data.abbre = res.data.abbre;
                        this.data.address= res.data.address;
                        this.data.region= res.data.region;
                        this.data.province= res.data.province;
                        this.data.tc_type_id = res.data.tc_type_id;


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


                if(this.action == "edit"){


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
                async handler(val) {
                this.data.id = val.id;
                this.action = val.action;

                // Load reference data FIRST
                await Promise.all([
                    this.getScholarships(),
                    this.getQualifications()
                ]);

                // Then load training center data
                if (this.action === "edit" || this.action === "view") {
                    await this.findData();
                }

                if (this.action === "add") {
                    this.title = "Add Training Center";
                    this.btn_name = "Add";
                } else if (this.action === "edit") {
                    this.title = "Edit Training Center";
                    this.btn_name = "Edit";
                } else if (this.action === "view") {
                    this.title = "Training Center Information";
                }
                },
                immediate: true
            }
            }

    }
        
    </script>