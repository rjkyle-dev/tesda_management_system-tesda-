<template>

    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
        <div class="fixed z-10 inset-0 overflow-y-auto my-4">
        
        <div class="flex items-center sm:items-center justify-center min-h-full px-8 py-2 sm:p-0 animate__slideInUp" ref="modal">
        
            <div class="bg-white shadow rounded-lg w-1/3">
            <div class="p-6">
                <h3 class="text-md font-bold leading-6 text-gray-900">{{title}}</h3>


                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Name <span class="text-xs text-red-500 ml-2">{{ errors.description }}</span></p>
        
                    <input type="text" v-model="data.description" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Abbreviation <span class="text-xs text-red-500 ml-2">{{ errors.abbre }}</span></p>
        
                    <input type="text" v-model="data.abbre" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">
                    Billing Order Sequence
                    </p>

                    <!-- Dropdown -->
                    <select
                    v-model="selectedBillingType"
                    @change="addBillingOrder"
                    class="border rounded px-3 py-1 text-sm"
                    >
                    <option disabled value="">Select Billing Type</option>
                    <option
                        v-for="type in allbillingtypes"
                        :key="type.id"
                        :value="type.id"
                    >
                        {{ type.description }}
                    </option>
                    </select>

                    <!-- Tags (Horizontal Order Display) -->
                    <div class="flex flex-wrap mt-3 gap-2">
                        <div
                            v-for="(order, index) in allorder"
                            :key="order.id"
                            class="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center"
                        >
                            <!-- Delete Icon -->
                            <img src="../../assets/action_icon_delete.png" class="h-5 w-5 mr-2" @click="deleteBillingOrder(order)"/>
                            
                            <!-- Display Order Number and Billing Type Description -->
                            {{ index + 1 }}. {{ order.bt_id.description }}
                        </div>
                    </div>
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
        data(){
            return{
                title : '',
                action : '',
                data : {
                    id : 0,
                    description : '',
                    abbre : '',
                    datetime_added : '',
                },
                btn_name : '',
                errors : {
                    description : '',
                },
                allbillingtypes: [],
                allorder: [],
                selectedBillingType: '',
                pass_data : {
                    sc_id : null,
                }
            }
        },
        methods: {
            deleteBillingOrder(order) {
            // Create payload with the order ID and the associated billing type ID
            const payload = {
                id: order.id,
            };

            // Send a DELETE request to remove the order from the backend
            axios.post(process.env.VUE_APP_BASE_URL + "/billing_set_types/delete", payload)
                .then((res) => {
                    if (res.status == 201) {
                        this.showNotification(1, "Success", "Billing Order Deleted");

                        // Remove the order from the allorder list locally
                        const index = this.allorder.findIndex((item) => item.id === order.id);
                        if (index !== -1) {
                            this.allorder.splice(index, 1); // Remove the item from the array
                        }

                        // Reindex the remaining orders
                        this.allorder.forEach((order, idx) => {
                            order.order_num = idx + 1; // Set order_num to be sequential
                        });

                        // Now, let's delete the billing type from allbillingtypes if the order's bt_id exists
                        const btIndex = this.allbillingtypes.findIndex(
                            (type) => type.id === order.bt_id.id
                        );
                        if (btIndex !== -1) {
                            this.allbillingtypes.splice(btIndex, 1);
                        }
                    }
                })
                .catch((err) => {
                    console.error("Error deleting billing order:", err);
                    this.showNotification(2, "Error", "Failed to delete Billing Order");
                });
        },
            addBillingOrder() {
            if (!this.selectedBillingType) return;

            const payload = {
                sc_id: this.data.id,
                bt_id: this.selectedBillingType,
                order_num: this.allorder.length + 1,
            };


            axios.post(process.env.VUE_APP_BASE_URL +'/billing_set_types/add',
                payload
                )
                .then((res) => {
                if (res.status == 201) {
                    this.showNotification(1,'Success','Billing Type Added');
                    this.getBillingOrder(); // Refresh list
                    this.selectedBillingType = '';
                }
                });
            },
            getBillingOrder(){
                if(this.allorder.length > 0) this.allorder.splice(0);

                axios.get(process.env.VUE_APP_BASE_URL + '/billing_set_types/find_by_sc_id/' + this.data.id)
                .then((res)=>{
                    if(res.status == 200){
                
                        this.allorder = res.data;
                        
                
                    }
                    
                });
            },
            getBillingTypes(){
               
                axios.get(process.env.VUE_APP_BASE_URL + '/billing_types/get_all')
                .then((res)=>{
                
                    if(res.status == 200){
                
                        this.allbillingtypes = res.data;
                        
                
                    }
                    
                });
            },
            findData(){
                axios.get(process.env.VUE_APP_BASE_URL + '/scholarships/find/' + this.data.id)
                .then((res)=>{
                
                    if(res.status == 200){
                
                        this.data.id = res.data.id;
                        this.data.description = res.data.description;
                        this.data.abbre = res.data.abbre;

                        this.getBillingOrder();
                        
                
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
                        axios.post(process.env.VUE_APP_BASE_URL + '/scholarships/add', this.data)
                        .then((res)=>{

                            if(res.status == 201){

                                    this.showNotification(1,"Success","Scholarship added!");
                                    this.refreshData();
                                    this.closeModal();
                                

                            }
                            
                        });
                    }
                    
                }
                else if(this.action == "edit"){
                    axios.post(process.env.VUE_APP_BASE_URL + '/scholarships/edit', this.data)
                    .then((res)=>{

                        if(res.status == 201){
                            
                            this.showNotification(1,"Success","Scholarship updated!");
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

                this.getBillingTypes();

                if(this.action == "add"){
                    this.title = "Add Scholarship";
                    this.btn_name = "Add";
                }
                else if(this.action == "edit"){
                    this.title = "Edit Scholarship";
                    this.btn_name = "Edit";
                    this.findData();
                }
                
                
            },
            immediate:true
          }
        }
    }
        
    </script>