<template>

    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
        <div class="fixed z-10 inset-0 overflow-y-auto my-4">
        
        <div class="flex items-center sm:items-center justify-center min-h-full px-8 py-2 sm:p-0">
        
            <div class="bg-white shadow rounded-lg w-1/3 fadeInSlide">
            <div class="p-6">
                <h3 class="text-md font-bold leading-6 text-gray-900">{{title}}</h3>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Type</p>

                    <select v-model="data.isTitle" @change="disableText()" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500">
                        <option value="0">Module</option>
                        <option value="1">Parent Module</option>
                    </select>
        
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Name <span class="text-xs text-red-500 ml-2">{{ errors.name }}</span></p>
        
                    <input type="text" v-model="data.name" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500" placeholder="-">
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Title <span class="text-orange-500 ml-2">(For tab name)</span> <span class="text-xs text-red-500 ml-2">{{ errors.title }}</span></p>
        
                    <input type="text" v-model="data.title" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500" placeholder="-">
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Description <span class="text-orange-500 ml-2">(Menu information)</span> </p>
        
                    <textarea rows="2" v-model="data.description" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500" placeholder="-">
                        </textarea>
                </div>

                <div class="my-2" v-if="data.isTitle == 0">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Link <span class="text-orange-500 ml-2">(For URL directory)</span> <span class="text-xs text-red-500 ml-2">{{ errors.link }}</span></p>
        
                    <input type="text" v-model="data.link" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500" placeholder="-" :disabled="data.isTitle == 1">
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Upload Icon <span class="text-xs text-red-500 ml-2">{{ errors.profile_pic }}</span></p>
                    
                    <div class="flex items-center mb-2 gap-2">
                        <p v-if="action != 'add'" class="flex-auto text-sm text-gray-600 flex items-center border border-gray-300 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 px-3 py-2">{{ data.profile_pic }}</p> 

                        <button v-if="action != 'add'" type="button" @click="viewFile" class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-xs">View</button>
                    </div>
                    <input v-if="action != 'view'" type="file" id="fileupload" ref="fileupload" @change="onFileChange" class="border border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"/>
                
                </div>

                <div class="mt-5 text-end">
                    <button type="button" @click="confirmAction" class="inline-flex items-center justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-xs">{{ btn_name }}</button>
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
                    id : 0,
                    name : '',
                    title : '',
                    link : '/',
                    datetime_added : '',
                    order_num : 0,
                    parent_id : 0,
                    position : 1,
                    profile_pic : '',
                    isTitle : 0,
                    description : null,
                },
                btn_name : '',
                errors : {
                    name : '',
                    title: '',
                    link : '',
                    profile_pic : '',
                    description : '',
                },
                
            }
        },
        methods: {
            disableText(){
                if(this.data.isTitle == 1){
                    this.data.link = '/';
                }
                else{
                    this.data.link = '/';
                }
            },
            viewFile(){
                window.open(process.env.VUE_APP_BASE_URL + "/user_menu/get_file/" + this.data.profile_pic + '/png');
            },
            onFileChange(e){

                var fileData =  e.target.files[0];

                if(fileData != '' || fileData != null){

                    var fileName = "";
                    var fileExt = "";

                    var fileArray = fileData.name.split(".");

                    for(var i = 0; i < fileArray.length; i++){
                
                if(i == fileArray.length - 2){
                  fileArray[i] = fileArray[i].replace(/[^a-zA-Z0-9 _-]/g, '');
                  fileName += fileArray[i];
                }
                else{
                    fileName += fileArray[i] + "."; 
                }
                
                if(i == fileArray.length - 2) break;

                

            }

                    fileExt = fileArray[fileArray.length - 1].toLowerCase().trim();

                    if(fileExt != "png"){
                        this.showNotification(0,'Invalid file extension','Please upload only PNG files.');
                    }
                    else{
                        this.data.profile_pic = fileName + "."+ fileExt;
                    }

                }
                

                

            },
            findData(){
                axios.get(process.env.VUE_APP_BASE_URL + '/user_menu/find/' + this.data.id)
                .then((res)=>{
                
                    if(res.status == 200){
                
                        this.data.name = res.data.name;
                        this.data.title = res.data.title;
                        this.data.link = res.data.link;
                        this.data.profile_pic = res.data.profile_pic;
                        this.data.isTitle = res.data.isTitle;
                        this.data.description = res.data.description;
                        
                
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

                    this.errors.name = '';
                    this.errors.title = '';
                    this.errors.link = '';
                    this.errors.profile_pic = '';

                    var valid = true;

                    if(this.data.name == ''){
                        this.errors.name = "* Please input name";
                        valid = false;
                    }
                    if(this.data.title == ''){
                        this.errors.title = "* Please input title";
                        valid = false;
                    }
                    if(this.data.link == ''){
                        this.errors.link = "* Please input link";
                        valid = false;
                    }
                    if(this.data.profile_pic == ''){
                        this.errors.profile_pic = "* Please input link";
                        valid = false;
                    }
                    if(valid){

                        this.data.profile_pic = "default_menu_icon.png";

                        axios.post(process.env.VUE_APP_BASE_URL + '/user_menu/add', this.data)
                        .then((res)=>{

                            if(res.status == 201){

                                const formdata = new FormData();
                                var file_input = document.getElementById('fileupload').files[0];
                                
                                formdata.append("file", file_input);
                                axios.post(process.env.VUE_APP_BASE_URL + '/user_menu/upload_icon', formdata)
                                .then((res)=>{

                                    if(res.status == 201){
                                        this.showNotification(1,"Success","Menu added!");
                                        this.refreshData();
                                        this.closeModal();
                                    }
                                    
                                });

                                
                                
                            }
                            
                        });
                    }
                    
                }
                else if(this.action == "edit"){


                    axios.post(process.env.VUE_APP_BASE_URL + '/user_menu/edit', this.data)
                    .then((res)=>{

                        if(res.status == 201){

                            const formdata = new FormData();
                            var file_input = document.getElementById('fileupload').files[0];
                            
                            formdata.append("file", file_input);
                            axios.post(process.env.VUE_APP_BASE_URL + '/user_menu/upload_icon', formdata)
                            .then((res)=>{

                                if(res.status == 201){
                                    this.showNotification(1,"Success","Menu updated!");
                                    this.refreshData();
                                    this.closeModal();
                                }
                                
                            });
                            
                            

                        }
                        
                    });
                }

                
                
            },
            closeModal(){
                this.$emit('close-modal');
            }
        },
        watch: {
            item_data: {
            handler(val){
                this.data.id = val.id;

                this.action = val.action;

                if(this.action == "add"){
                    this.title = "Add Menu";
                    this.btn_name = "Add";
                }
                else if(this.action == "edit"){
                    this.title = "Edit Menu";
                    this.btn_name = "Edit";
                    this.findData();
                }
                
                
            },
            immediate:true
          }
        }
    }
        
    </script>