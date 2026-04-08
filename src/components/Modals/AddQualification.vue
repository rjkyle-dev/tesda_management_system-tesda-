<template>

    <div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
        <div class="fixed z-10 inset-0 overflow-y-auto my-4">
        
        <div class="flex items-center sm:items-center justify-center min-h-full px-8 py-2 sm:p-0 animate__slideInUp" ref="modal">
        
            <div class="bg-white shadow rounded-lg w-1/3">
            <div class="p-6">
                <h3 class="text-md font-bold leading-6 text-gray-900">{{title}}</h3>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Category</p>
        
                    <select v-model="data.category_id" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                        <option v-for="i in allcategories" :id="i.id" :key="i.id" :value="i.id">
                            {{ i.description }}
                        </option>
                    </select>
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Name <span class="text-xs text-red-500 ml-2">{{ errors.description }}</span></p>
        
                    <input type="text" v-model="data.description" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">
                        Training Hour/s 
                        <span class="text-xs text-red-500 ml-2">{{ errors.hrs }}</span>
                    </p>

                    <input 
                        type="number" 
                        v-model="data.hrs" 
                        class="font-bold border-gray-300 w-full sm:w-1/4 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">
                        Training Day/s 
                        <span class="text-xs text-red-500 ml-2">{{ errors.days }}</span>
                    </p>

                    <input 
                        type="number" 
                        :value="days" 
                        readonly
                        class="font-bold border-gray-300 w-full sm:w-1/4 rounded-md text-sm bg-gray-100">
                </div>


                <div class="mt-5 text-end">
                    <button type="button" @click="confirmAction" class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:text-xs">{{ btn_name }}</button>
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
        computed: {
        days() {
            if (!this.data.hrs) return 0
            return Math.round(this.data.hrs / 8)
        }
        },
        data(){
            return{
                title : '',
                action : '',
                data : {
                    id : 0,
                    description : null,
                    hrs : null,
                    days : null,
                    category_id : null,
                    datetime_added : '',
                },
                btn_name : '',
                errors : {
                    description : '',
                },
                allcategories : '',
                
            }
        },
        methods: {
            findData(){
                axios.get(process.env.VUE_APP_BASE_URL + '/qualifications/find/' + this.data.id)
                .then((res)=>{
                
                    if(res.status == 200){
                
                        this.data.id = res.data.id;
                        this.data.description = res.data.description;
                        this.data.hrs = res.data.hrs;
                        this.data.days = res.data.days;
                        this.data.category_id = res.data.category_id.id;
                        
                
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
                        axios.post(process.env.VUE_APP_BASE_URL + '/qualifications/add', this.data)
                        .then((res)=>{

                            if(res.status == 201){

                                    this.showNotification(1,"Success","Qualification added!");
                                    this.refreshData();
                                    this.closeModal();
                                

                            }
                            
                        });
                    }
                    
                }
                else if(this.action == "edit"){
                    axios.post(process.env.VUE_APP_BASE_URL + '/qualifications/edit', this.data)
                    .then((res)=>{

                        if(res.status == 201){
                            
                            this.showNotification(1,"Success","Qualification updated!");
                            this.refreshData();
                            this.closeModal();

                        }
                        
                    });
                }

                
                
            },
            getCategories(){
                axios.get(process.env.VUE_APP_BASE_URL + '/categories/get_all')
                .then((res)=>{
                
                    if(res.status == 200){
                        this.allcategories = res.data.sort(function(a, b){
                            if(a.description > b.description) { return 1; }
                            if(a.description < b.description) { return -1; }
                            return 0;
                        });
                        this.data.category_id = res.data[0].id;
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

                this.action = val.action;

                this.getCategories();

                if(this.action == "add"){
                    this.title = "Add Qualification";
                    this.btn_name = "Add";
                }
                else if(this.action == "edit"){
                    this.title = "Edit Qualification";
                    this.btn_name = "Edit";
                    this.findData();
                }
                
                
            },
            immediate:true
          }
        }
    }
        
    </script>