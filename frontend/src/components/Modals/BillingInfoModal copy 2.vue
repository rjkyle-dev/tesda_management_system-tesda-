<template>

   <div class="fixed inset-0 z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  
  <!-- Background overlay -->
  <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <!-- Modal container -->
  <div class="absolute inset-0 flex items-center justify-center overflow-y-auto">
    
    <div 
      class="w-full h-full flex items-center justify-center animate__animated animate__slideInUp" 
      ref="modal"
    >
      <div class="bg-white shadow w-full h-full overflow-auto">
        
        <!-- Top Tab Bar -->
        <div class="flex justify-between items-center p-4 border-b bg-primary-600">
          <h2 class="text-lg font-medium text-white">{{ title }}</h2>
          <button 
            @click="closeModal"
            class="text-white hover:text-red-600 text-xl font-bold focus:outline-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <!-- Modal content -->
        <div class="p-6">

           <!-- Shared Wrapper (Optional) -->
            <div class="w-full px-4">

            <!-- Stepper Wrapper -->
            <div class="max-w-5xl mx-auto overflow-x-auto py-6 bg-white rounded-xl shadow">
                <div class="flex items-center w-full px-4">
                <template v-for="(item, index) in sortedBtypes" :key="item.bt_id.id">
                    
                    <!-- Step -->
                    <div class="flex flex-col items-center min-w-[80px] z-10">
                    <div
                    class="flex items-center justify-center w-10 h-10 rounded-full font-semibold shadow bg-opacity-80"
                    :class="{
                        'bg-green-600 text-white': item.status == 1,   // Completed
                        'bg-red-500 text-white': item.status == 2,     // Denied
                        'bg-orange-400 text-white': item.status == 3,  // Revised
                        'bg-gray-200 text-gray-600': !item.status      // Default
                    }"
                    >
                    {{ item.order_num }}
                    </div>
                    <div class="mt-2 text-sm font-medium text-gray-800 text-center truncate w-max">
                        {{ item.bt_id.abbre }}
                    </div>
                    </div>

                    <!-- Connector -->
                    <div
                    v-if="index < sortedBtypes.length - 1"
                    class="flex-1 h-0.5 mx-2" :class="item.status > 0 ? 'bg-green-600' : 'bg-gray-200'"
                    ></div>

                </template>
                </div>
            </div>

            <!-- Details Container -->
            <div class="max-w-5xl mx-auto bg-white rounded-xl shadow p-6 mt-6 space-y-4">
                <!-- Title -->
                <h2 class="text-2xl font-bold text-gray-800 mb-4">
                {{ data.tc_id ? data.tc_id.description : '-' }}
                </h2>

                <!-- Detail Rows -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
                
                <div>
                    <div class="font-semibold text-gray-600">PQM Code:</div>
                    <div class="mt-1">{{ data.ctrl_num ? data.ctrl_num : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Status:</div>
                    <div class="mt-1">
                    <span
                        class="px-2 py-1 rounded-full text-xs font-semibold"
                        :class="getStatusBadgeClass(data.status_id)"
                    >
                        {{ getStatusMainText(data.status_id) }}
                    </span>
                    </div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Batch name:</div>
                    <div class="mt-1">{{ data.batch_name ? data.batch_name : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Scholarship Type:</div>
                    <div class="mt-1">{{ data.sc_id ? data.sc_id.description : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Qualification:</div>
                    <div class="mt-1">{{ data.q_id ? data.q_id.description : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">No. of Slots:</div>
                    <div class="mt-1">{{ data.num_pax ? data.num_pax : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Approved No. of Slots:</div>
                    <div class="mt-1">{{ data.approved_pax ? data.approved_pax : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">No. of Hours:</div>
                    <div class="mt-1">{{ data.q_id ? data.q_id.hrs : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Training Duration:</div>
                    <div class="mt-1">{{ data.date_start ? getDateFormat(data.date_start) : '-' }} - {{ data.date_end ? getDateFormat(data.date_end) : '-' }}</div>
                </div>

                <div class="col-span-2" v-if="data.remarks">
                    <div class="font-semibold text-gray-600">Remarks:</div>
                    <div class="mt-1">
                        <div v-if="parsedRemarks.length">
                            <div v-for="(remark, index) in parsedRemarks" :key="index" class="mb-2 p-2 rounded-lg border">
                                <div class="flex items-center gap-1">
                                    <span>Status: </span>
                                    <span
                                        class="px-2 py-1 rounded-full text-xs font-semibold"
                                        :class="getStatusBadgeClassRemarks(remark.status)"
                                    >
                                        {{ remark.status }}
                                    </span>
                                </div>
                                
                                <div class="text-gray-700 my-2">"{{ remark.remarks ? remark.remarks : 'No remarks' }}"</div>
                                <div class="font-semibold text-gray-800 whitespace-pre-line"><span class="font-thin">by: </span> {{ remark.name }}</div>
                                <div class="text-gray-600 text-sm italic">{{ new Date(remark.datetime_added).toLocaleString() }}</div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                

                </div>

                

                <!-- Update Form -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700" v-if="selectedStatus > 0">
                
                <div v-if="selectedStatus == 1">
                    <div class="font-semibold text-gray-600">Input Approved No. of Slots: </div>
                    <input v-model="data.approved_pax" type="number" class="mt-1 rounded-lg border-gray-200"/>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Remarks: (if any) </div>
                    <textarea v-model="remarks" rows="2" class="mt-1 rounded-lg border-gray-200 w-full"></textarea>
                </div>
                

                </div>

                <div class="flex items-center gap-2 justify-end" v-if="(data.status_id == 0 || data.status_id == 2) && $store.state.user.ut_id.description == 'PO Staff'">
                    <button class="px-4 py-2 my-2 rounded-lg duration-300 text-sm" @click="showUpdateForm(1)" :class="selectedStatus == 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'" :disabled="isSubmitting">
                        Approve
                    </button>
                    <button class="px-4 py-2 my-2 rounded-lg duration-300 text-sm" @click="showUpdateForm(2)" :class="selectedStatus == 2 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'" :disabled="isSubmitting">
                        Disapprove
                    </button>
                    <button class="px-4 py-2 my-2 rounded-lg duration-300 text-sm" @click="showUpdateForm(3)" :class="selectedStatus == 3 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-800'" :disabled="isSubmitting">
                        Revise
                    </button>

                    <button class="px-4 py-2 my-2 rounded-lg duration-300 text-sm bg-blue-500 text-white" v-if="selectedStatus > 0" @click="updateStatus">
                        Submit
                    </button>
                </div>
            </div>

            <!-- Billing Upload Container -->

            <!-- Inner Modal (Billing Upload Form) -->
            <div v-if="showUpdateBilling" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative overflow-auto max-h-[90vh]">
                <h3 class="text-lg font-semibold mb-4">{{ billing_data.bt_id.description }}</h3>

                <!-- Your form goes here -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-sm text-gray-700">
                    <!-- File Upload (spans 2 columns) -->
                    <div class="sm:col-span-2">
                    <label class="block font-semibold text-gray-600 mb-1">Upload Billing File</label>

                    <div
                        class="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-400 transition"
                        @dragover.prevent
                        @drop.prevent="handleFileDrop"
                        @click="triggerFileInput"
                    >
                        <svg class="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-2a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1z" />
                        </svg>
                        <p class="text-gray-500 text-sm text-center">
                        Drag and drop your file here or <span class="text-blue-500 font-medium underline">click to upload</span>
                        </p>
                        <input type="file" ref="fileInput" id="fileInput" class="hidden" @change="handleFileChange"
                        accept=".pdf, .xls, .xlsx" />
                    </div>

                    <div v-if="selectedFile" class="mt-2 text-gray-600 text-sm">
                        Selected File: <strong>{{ selectedFile.name }}</strong>
                    </div>
                    </div>

                    <div class="col-span-2">
                    <div class="font-semibold text-gray-600">Total Budget</div>
                    <h2 class="text-2xl">{{ formatPeso(billing_data.total_payment ) }}</h2>
                    </div>

                    <!-- Utilized Budget -->
                    <div>
                    <div class="font-semibold text-gray-600">Utilized Budget</div>
                    <input v-model="billing_data.total_utilized" type="number" step="0.01"
                        class="mt-1 rounded-lg border-gray-200 w-full" />
                    </div>

                     <!-- Unutilized Budget -->
                     <div>
                    <div class="font-semibold text-gray-600">Unutilized Budget</div>
                    <input v-model="billing_data.total_unutilized" type="number" step="0.01"
                        class="mt-1 rounded-lg border-gray-200 w-full" disabled=""/>
                    </div>

                    <div>
                    <div class="font-semibold text-gray-600">Dropped Trainees</div>
                    <input v-model="billing_data.total_dropped" type="number"
                        class="mt-1 rounded-lg border-gray-200 w-auto"/>
                    </div>

                    <!-- Due Date -->
                    <!-- <div>
                    <div class="font-semibold text-gray-600">Due Date</div>
                    <input v-model="billing_data.datetime_due" type="date"
                        class="mt-1 rounded-lg border-gray-200 w-full" />
                    </div> -->
                </div>

                <!-- Submit and Close -->
                <div class="flex items-center gap-2 justify-end mt-6">
                    <button @click="updateBillingData" class="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm">
                    Submit
                    </button>
                    <button @click="showUpdateBilling = false" class="text-gray-600 hover:text-gray-800 text-sm">
                    Cancel
                    </button>
                </div>

                <!-- Close inner modal -->
                <button @click="showUpdateBilling = false" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    ✕
                </button>
                </div>
            </div>

            <!-- Billing Period Container -->
           <template v-for="(item, index) in sortedBPeriods" :key="item.id">
            <div 
            class="relative max-w-5xl mx-auto rounded-xl shadow p-6 mt-6 overflow-hidden space-y-6 transition-all duration-300"
            :class="[
                item.status === 1 ? 'bg-green-100' :
                item.status === 2 ? 'bg-red-100' :
                item.status === 3 ? 'bg-orange-100' :
                'bg-white',
                !canEditBillingItem(item, index) ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''
            ]"
            >
                
                
                <!-- Title -->
                <div class="flex items-center gap-4 flex-wrap mb-2">

                <!-- Circle with Number -->
                <div class="h-6 w-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-semibold">
                    {{ item.order_num }}
                </div>

                <!-- Title -->
                <h2 class="text-2xl font-bold text-gray-800">
                    {{ item.bt_id ? item.bt_id.description : '-' }}
                </h2>

                

                <!-- Icon -->
                <img 
                src="../../assets/action_icon_edit.png" 
                class="h-5 w-5" 
                @click="showUpdateBillingModal(item)" 
                v-if="$store.state.user.ut_id.description === 'TC Staff' && (canEditBillingItem(item, index) && item.status != 1)" 
                />
                </div>

                <!-- Detail Rows -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
                <div>
                    <div class="font-semibold text-gray-600">Due date:</div>
                    <div class="mt-1">{{ item.datetime_due ? getDateFormat(item.datetime_due) : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Date and time submitted:</div>
                    <div class="mt-1">{{ item.datetime_submit ? getDateTimeFormat(item.datetime_submit) : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Status:</div>
                    <div class="mt-1">
                    <span
                        class="px-2 py-1 rounded-full text-xs font-semibold"
                        :class="getStatusBadgeClass(item.status)"
                    >
                        {{ getStatusText(item.status) }}
                    </span>
                    </div>
                </div>

                 <div>
                    <div class="font-semibold text-gray-600">Dropped Trainees:</div>
                    <div class="mt-1">{{ item.total_dropped ? item.total_dropped : '-' }}</div>
                </div>

                <div class="col-span-2">
                    <div class="font-semibold text-gray-600">Total Budget:</div>
                    <h2 class="text-2xl">{{ item.total_payment ? formatPeso(item.total_payment) : '-' }}</h2>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Utilized Budget:</div>
                    <div class="mt-1">{{ item.total_utilized ? formatPeso(item.total_utilized) : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Unutilized Budget:</div>
                    <div class="mt-1">{{ item.total_unutilized ? formatPeso(item.total_unutilized) : '-' }}</div>
                </div>

                <div>
                    <div class="font-semibold text-gray-600">Date and time actioned:</div>
                    <div class="mt-1">{{ item.datetime_actioned ? getDateTimeFormat(item.datetime_actioned) : '-' }}</div>
                </div>

                <div>
                    <div>
                        <button class="font-semibold text-gray-600 hover:text-blue-600 focus:outline-none">
                        File
                        </button>
                    </div>
                    <div class="mt-1">
                        <span @click="openFile(item.uploaded_file)" :class="item.uploaded_file ? 'cursor-pointer hover:text-blue-600 duration-300 underline' : 'cursor-default'">{{ item.uploaded_file ? item.uploaded_file : 'No attached file yet' }}</span>
                    </div>
                </div>

                <div class="col-span-2">
                    <div class="font-semibold text-gray-600">Remarks:</div>
                    <div class="mt-1 overflow-y-auto h-auto max-h-40">
                        <div>
                            <!-- Render parsed remarks for this item -->
                            <div v-if="parseBillingRemarks(item.remarks).length">
                            <div
                                v-for="(remark, index) in parseBillingRemarks(item.remarks)"
                                :key="index"
                                class="mb-2 p-2 rounded-lg border bg-white"
                            >
                                <div class="flex items-center gap-1">
                                <span>Status:</span>
                                <span
                                    class="px-2 py-1 rounded-full text-xs font-semibold"
                                    :class="getStatusBadgeClassRemarks(remark.status)"
                                >
                                    {{ remark.status }}
                                </span>
                                </div>

                                <div class="text-gray-700 my-2">
                                {{ remark.remarks ? remark.remarks : 'No remarks' }}
                                </div>

                                <div class="font-semibold text-gray-800 whitespace-pre-line">
                                <span class="font-thin">by:</span> {{ remark.name }}
                                </div>

                                <div class="text-gray-600 text-sm italic">
                                {{ formatDate(remark.datetime_added) }}
                                </div>
                            </div>
                            </div>

                        </div>
                    </div>
                </div>


                </div>

                <!-- Disabled Message -->
                <div v-if="!canEditBillingItem(item, index)" class="text-xs text-red-600 italic">
                Complete and approve the previous billing period to enable this one.
                </div>

                 <!-- Update Form -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700" v-if="item.status == 0 && $store.state.user.ut_id.description == 'PO Staff'">
                
                       
                <div>
                    <div class="font-semibold text-gray-600">Remarks: (if any) </div>
                    <textarea v-model="item.tempRemark" rows="2" class="mt-1 rounded-lg border-gray-200 w-full"></textarea>
                </div>
                

                </div>

                <div class="flex items-center gap-2 justify-start" v-if="item.status == 0 && $store.state.user.ut_id.description == 'PO Staff'">
                    <button class="px-4 py-2 my-2 rounded-lg duration-300 text-sm bg-gray-200 text-gray-800 hover:text-white" :class="isSubmitting ? 'bg-gray-100' : 'hover:bg-green-500 bg-gray-200'" @click="updateBillingStatement(item, 1)" :disabled="isSubmitting">
                        Approve
                    </button>
                    <button class="px-4 py-2 my-2 rounded-lg duration-300 text-sm bg-gray-200 text-gray-800 hover:text-white" :class="isSubmitting ? 'bg-gray-100' : 'hover:bg-red-500 bg-gray-200'" @click="updateBillingStatement(item, 2)" :disabled="isSubmitting">
                        Disapprove
                    </button>
                    <button class="px-4 py-2 my-2 rounded-lg duration-300 text-sm bg-gray-200 text-gray-800 hover:text-white" :class="isSubmitting ? 'bg-gray-100' : 'hover:bg-orange-500 bg-gray-200'" @click="updateBillingStatement(item, 3)" :disabled="isSubmitting">
                        Revise
                    </button>

                </div>
            </div>
            </template>
           

            

            </div>



          <!-- Your modal content here -->
        </div>

      </div>
    </div>

  </div>
</div>
        
    
    
    
        
    </template>
    
    <script>
    import axios from 'axios';
    import moment from 'moment';

    export default{
        props: {
            item_data : Object,
            refreshData : Function,
            showNotification : Function,
        },
        computed: {
        parsedRemarks() {
            try {
                const remarks = JSON.parse(this.data.remarks || '[]');
                return remarks.sort((a, b) => new Date(b.datetime_added) - new Date(a.datetime_added));
            } catch (err) {
                return [];
            }
        },
         sortedBtypes() {
            return this.all_btypes
            ? this.all_btypes.map((bt) => {
                const match = this.all_billing_periods.find(
                    (bp) => bp.bt_id.id === bt.bt_id.id
                );

                let status = null;
                if (match) status = match.status;

                return {
                    ...bt,
                    status,
                };
                }).sort((a, b) => a.order_num - b.order_num)
            : [];
        },
        sortedBPeriods() {
            return this.all_billing_periods
                ? this.all_billing_periods
                    .slice() // clone to avoid mutation
                    .sort((a, b) => a.order_num - b.order_num)
                    .map(item => ({
                        ...item,
                        tempRemark: item.tempRemark || '' // attach UI-only field
                    }))
                : [];
        }
        },
        data(){
            return{
                title : '',
                action : '',
                remarks : null,
                data : {
                    id : 0,
                    ctrl_num : null,
                    tc_id : null,
                    sc_id : null,
                    q_id : null,
                    batch_name : null,
                    num_pax : null,
                    billed_amount : null,
                    isWorkback : null,
                    remarks : null,
                    status_id : 1,
                    datetime_received : null,
                    datetime_billed : null,
                    datetime_added : '',
                    uploaded_by : this.$store.state.user.id,
                },
                all_btypes : [],
                all_billing_periods : [],
                selectedStatus : null,
                inputted_code : null ,

                // Track the uploaded file
                selectedFile: null,
                // Your data model for form
                billing_data: {
                    id : null,
                    ctrl_num : null,
                    sc_id : null,
                    bt_id : null,
                    order_num : null,
                    datetime_actioned : null,
                    status : 0,
                    remarks : null,
                    user_id : this.$store.state.user.id,
                    total_payment: null,
                    datetime_due: null,
                    uploaded_file : null,
                    total_utilized : null,
                    total_unutilized : null,
                    total_dropped : null,
                    file_data: null, // This will store the actual file object
                },
                showForm: true, // Whether to show the form or not
                currentBillingName: '', // Name of the current Billing
                showUpdateBilling : false, 
                isSubmitting : false,
            }   
        },
        methods: {
            parseBillingRemarks(remarks) {
            try {
                const parsed = JSON.parse(remarks || '[]');

                // Sort by datetime_added descending (newest first)
                return parsed.sort((a, b) => new Date(b.datetime_added) - new Date(a.datetime_added));
                
                // ⬅️ If you want oldest first, reverse the comparison:
                // return parsed.sort((a, b) => new Date(a.datetime_added) - new Date(b.datetime_added));
            } catch (err) {
                console.error('Failed to parse remarks:', err);
                return [];
            }
            },
            formatDate(dateStr) {
                return new Date(dateStr).toLocaleString();
            },
            canEditBillingItem(item, index) {

                if(this.data.status_id === 1){
                    // If it's the first item (index 0), check if main record status is approved (status_id == 1)
                    if (index === 0 && this.data.status_id === 1) {
                        return true; // First item enabled if status_id is 1
                    }

                    // If any previous item has status null or is not approved, disable the current item
                    for (let i = 0; i < index; i++) {
                        const prevItem = this.sortedBPeriods[i];
                        if (prevItem.status === null || prevItem.status !== 1) {
                            return false; // Disable if any previous item is not approved
                        }
                    }

                    // Enable current item if all previous items are approved (status === 1)
                    return true;
                }
                
            }
            ,
            showUpdateBillingModal(data){
                this.billing_data = data;
                this.billing_data.total_utilized = data.total_payment;
                this.showUpdateBilling = true;
            },
            openFile(path){
                window.open(process.env.VUE_APP_BASE_URL + '/billing_periods/get_file/' + encodeURIComponent(path));
            },

    // Handle form submission
    updateBillingData() {

        if(this.billing_data.file_data == null){
            this.showNotification(0,"No attached file","Please upload file");
            return;
        }
        else if(this.billing_data.total_dropped == null){
            this.showNotification(0,"No value for Total Dropped Trainees","Please input total dropped trainees");
            return;
        }
        else{

            this.isSubmitting = true;

            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const timestamp = date + ' ' + time;


            this.billing_data.status = 0;
            this.billing_data.datetime_submit = timestamp;
            this.billing_data.user_id = this.$store.state.user.id;
            axios.post(process.env.VUE_APP_BASE_URL + '/billing_periods/upload_file', this.billing_data.file_data)
            .then((res)=>{

                if(res.status == 201){

                    
                    axios.post(process.env.VUE_APP_BASE_URL + '/billing_periods/edit', this.billing_data)
                    .then((res2)=>{

                        if(res2.status == 201){

                            this.isSubmitting = false;

                            this.showNotification(1,"Success","Billing Record updated!");
                            this.refreshData();
                            this.findData();
                            this.selectedStatus = null;
                            this.showUpdateBilling = false;
                        }

                       
                    });

                }
                
            });
        }
       
    },
             // Handle file drop
            handleFileDrop(event) {
            const files = event.dataTransfer.files;
            if (files.length > 0) {
                this.selectedFile = files[0];
                var fileArray = this.selectedFile.name.split(".");
                var fileExt = fileArray[fileArray.length - 1].toLowerCase().trim();

                this.billing_data.uploaded_file = this.data.ctrl_num + "_" + this.billing_data.bt_id.abbre + "." + fileExt;  // Set the uploaded file name

                const formdata = new FormData();
                
                formdata.append("file", this.selectedFile, this.data.ctrl_num + "_" +  this.billing_data.bt_id.abbre + "." + fileExt);
                this.billing_data.file_data = formdata;
            }
            },

            // Trigger the hidden file input on click
            triggerFileInput() {
            this.$refs.fileInput.click();
            },

            // Handle file selection
            handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedFile = file;

                var fileArray = this.selectedFile.name.split(".");
                var fileExt = fileArray[fileArray.length - 1].toLowerCase().trim();

                this.billing_data.uploaded_file = this.data.ctrl_num + "_" +  this.billing_data.bt_id.abbre + "." + fileExt;  // Set the uploaded file name

                const formdata = new FormData();
                
                formdata.append("file", this.selectedFile, this.data.ctrl_num + "_" +  this.billing_data.bt_id.abbre + "." + fileExt);
                this.billing_data.file_data = formdata;
            }
            },
            showUpdateForm(status){

                // const today = new Date();

                this.selectedStatus = status;
                // this.inputted_code = 'PQM-'+ today.getFullYear() +'-' + (this.data.sc_id ? this.data.sc_id.abbre : '') + '-CODE HERE-0000';
                // if(this.selectedStatus){
                //     //
                // }
            },
            updateBillingStatement(item, status) {
                this.isSubmitting = true;

                const newRemark = {
                    user_id: this.$store.state.user.id,
                    name: this.formatUserName(this.$store.state.user.user_info),
                    remarks: item.tempRemark || '', // use static input
                    status: this.getStatusText(status),
                    datetime_added: this.getDefaultTimeFormat(),
                };

                // Parse existing remarks
                let remarksArray = [];
                try {
                    if (item.remarks && typeof item.remarks === 'string') {
                        remarksArray = JSON.parse(item.remarks);
                    }
                } catch (err) {
                    remarksArray = [];
                }

                remarksArray.push(newRemark);

                const new_data = {
                    id: item.id,
                    status: status,
                    remarks: JSON.stringify(remarksArray),
                    datetime_actioned: this.getDefaultTimeFormat(),
                };

                axios.post(process.env.VUE_APP_BASE_URL + '/billing_periods/update_status', new_data)
                    .then((res) => {
                        if (res.status === 201) {
                            this.isSubmitting = false;
                            this.showNotification(1, "Success", "Billing Statement updated!");
                            this.refreshData();
                            this.findData();

                            // Clear temp remark
                            item.tempRemark = '';
                        }
                    });
            },
            updateStatus() {
                this.isSubmitting = true;

                const newRemark = {
                    user_id: this.$store.state.user.id, // assuming you store user ID here
                    name: this.formatUserName(this.$store.state.user.user_info), // assuming you store user name here
                    remarks: this.remarks,
                    status: this.getStatusText(this.selectedStatus),
                    datetime_added: this.getDefaultTimeFormat(),
                };

                // If remarks is a stringified JSON array, parse it. If not, initialize.
                let remarksArray = [];
                try {
                    if (this.data.remarks) {
                        remarksArray = JSON.parse(this.data.remarks);
                    }
                } catch (err) {
                    // handle invalid JSON
                    remarksArray = [];
                }

                // Push the new remark
                remarksArray.push(newRemark);

                const new_data = {
                    id: this.data.id,
                    status_id: this.selectedStatus,
                    sc_id: this.data.sc_id,
                    ctrl_num: this.inputted_code,
                    remarks: JSON.stringify(remarksArray), // save as stringified JSON
                    approved_pax: this.data.approved_pax,
                };

                axios.post(process.env.VUE_APP_BASE_URL + '/billing_records/update_status', new_data)
                    .then((res) => {
                        if (res.status == 201) {
                            this.isSubmitting = false;
                            this.showNotification(1, "Success", "Record updated!");
                            this.refreshData();
                            this.findData();
                            this.selectedStatus = null;
                        }
                    });
            },
            formatPeso(value) {
                if (value == null || isNaN(value)){
                    return '-';
                }
                else if(value == 0){
                    return new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    }).format(0);
                }
                else{
                    return new Intl.NumberFormat('en-PH', {
                    style: 'currency',
                    currency: 'PHP',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    }).format(value);
                }
            },
            getBookmarkTriangleClass(status) {
            let color = 'bg-gray-400';
            if (status === 1) color = 'bg-green-500';
            else if (status === 2) color = 'bg-red-500';
            else if (status === 3) color = 'bg-orange-400';

            return `w-0 h-0 border-t-[40px] border-t-transparent border-l-[40px] ${color} border-r-0 border-b-0`;
            },
            getStatusBadgeClassRemarks(status) {
                switch (status) {
                case 'Approved':
                    return 'bg-green-100 text-green-800';
                case 'Completed':
                    return 'bg-green-100 text-green-800';
                case 'Disapproved':
                    return 'bg-red-100 text-red-800';
                case 'Revised':
                    return 'bg-orange-100 text-orange-800';
                default:
                    return 'bg-gray-100 text-gray-600';
                }
            },
            getStatusBadgeClass(status) {
                switch (status) {
                case 1:
                    return 'bg-green-100 text-green-800';
                case 2:
                    return 'bg-red-100 text-red-800';
                case 3:
                    return 'bg-orange-100 text-orange-800';
                default:
                    return 'bg-gray-100 text-gray-600';
                }
            },
            getStatusText(status) {
                switch (status) {
                case 0:
                    return 'Pending';
                case 1:
                    return 'Completed';
                case 2:
                    return 'Denied';
                case 3:
                    return 'Revised';
                default:
                    return 'No action yet';
                }
            },
            getStatusMainText(status) {
                switch (status) {
                case 1:
                    return 'Approved';
                case 2:
                    return 'Denied';
                case 3:
                    return 'Revised';
                default:
                    return 'Pending';
                }
            },
            getDefaultTimeFormat(){
                const today = new Date();
                const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const timestamp = date + ' ' + time;
                return timestamp;
            },
            getDateTimeFormat(value){
            return moment(value).format('MMMM DD, YYYY h:mm a');
            },
            getDateFormat(value){
            return moment(value).format('MMMM DD, YYYY');
            },
            formatUserName(i){
                if(i != null){
                    return i.lname + ", " + i.fname + " " + (i.mname ? i.mname : '') + " " + (i.suffix ? i.suffix : '');
                }
                else return "-";
            },
            getBillingSetTypes(id){
                axios.get(process.env.VUE_APP_BASE_URL + '/billing_set_types/find_by_sc_id/' + id)
                .then((res)=>{
                
                    if(res.status == 200){
                        this.all_btypes = res.data;
                    }
                    
                })
                .catch(err => {
                    console.error(err);
                    this.showNotification('Error fetching bill types', 'error');
                });
            },
            getBillingPeriods(ctrl_num){
                axios.get(process.env.VUE_APP_BASE_URL + '/billing_periods/find_by_ctrl_num/' + ctrl_num)
                .then((res)=>{
                
                    if(res.status == 200){
                        this.all_billing_periods = res.data;
                    }
                    
                })
                .catch(err => {
                    console.error(err);
                    this.showNotification('Error fetching bill types', 'error');
                });
            },
            findData(){
                axios.get(process.env.VUE_APP_BASE_URL + '/billing_records/find/' + this.data.id)
                .then((res)=>{
                
                    if(res.status == 200){
                
                        this.data = res.data;
                        this.title = this.data.batch_name;
                        this.getBillingSetTypes(this.data.sc_id.id);
                        this.getBillingPeriods(this.data.ctrl_num);
                
                    }
                    
                })
                .catch(err => {
                    console.error(err);
                    this.showNotification('Error fetching data', 'error');
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

                this.findData();
                
                
            },
            immediate:true
          },
          "billing_data.total_utilized": {
            immediate: true,
            handler(newVal) {
                if(newVal && (newVal <= this.billing_data.total_payment)) {
                    this.billing_data.total_unutilized = this.billing_data.total_payment - this.billing_data.total_utilized;
                }
                else{
                    this.billing_data.total_unutilized = 0;
                    this.billing_data.total_utilized = 0;
                }
            },
          }
        }
    }
        
    </script>

    <style>
/* Fade transition for steps */
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>