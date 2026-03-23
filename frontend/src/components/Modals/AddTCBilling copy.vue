<template>

    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
        <div class="fixed z-10 inset-0 overflow-y-auto my-4">
        
        <div class="flex items-center sm:items-center justify-center min-h-full px-8 py-2 sm:p-0 animate__slideInUp" ref="modal">
        
            <div class="bg-white shadow rounded-lg w-full sm:w-full md:w-1/2">
            <div class="p-6">
                <h3 class="text-md font-bold leading-6 text-gray-900">{{title}}</h3>

                <!-- <div class="my-2" v-if="data.isWorkback == 0">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Status</p>
        
                    <select v-model="data.status_id" class="font-bold border-gray-300 w-1/4 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                        <option value="0">Pending</option>
                        <option value="1">Approved</option>
                        <option value="2">Declined</option>
                    </select>
                </div> -->

                <div class="my-2" v-if="action == 'edit'">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Status</p>
        
                    <p class="font-bold border border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 p-2">
                        {{ data.status_id == 3 ? 'Revise' : data.status_id == 2 ? 'Denied' : data.status_id == 1 ? 'Approved' : 'Pending'}}
                    </p>
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Fiscal Year</p>
                    <select v-model="data.fiscal_yr" class="font-bold border-gray-300 w-auto rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500" :disabled="data.isWorkback == 0">
                    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                    </select>
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Control Number <span v-if="action == 'edit'" class="text-xs text-orange-500 ml-2">Note: If changing this field, you have to generate billing again</span></p>
        
                    <input type="text" v-model="data.ctrl_num" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Batch Name <span class="text-xs text-red-500 ml-2">{{ errors.batch_name }}</span></p>
        
                    <input type="text" v-model="data.batch_name" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Training Center</p>
        
                    <select v-model="data.tc_id" :disabled="$store.state.user.ut_id.description == 'TC Staff'" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                        <option v-for="i in alltypes_tc" :id="i.id" :key="i.id" :value="i.id">
                            {{ i.description }}
                        </option>
                    </select>
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Scholarship <span v-if="action == 'edit'" class="text-xs text-orange-500 ml-2">Note: If changing this field, you have to generate billing again</span></p>
        
                    <select v-model="data.sc_id" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                        <option v-for="i in alltypes_sc" :id="i.id" :key="i.id" :value="i.id">
                            {{ i.description }}
                        </option>
                    </select>
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Qualification</p>
        
                    <select v-model="data.q_id" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                        <option v-for="i in alltypes_q" :id="i.id" :key="i.id" :value="i.id">
                            {{ i.description }}
                        </option>
                    </select>
                </div> 

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Total Number of Pax <span class="text-xs text-red-500 ml-2">{{ errors.num_pax }}</span></p>
        
                    <input type="number" v-model="data.num_pax" class="font-bold border-gray-300 w-1/5 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div>

                <div class="my-2" v-if="data.isWorkback == 1">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Billed Amount <span class="text-xs text-red-500 ml-2">{{ errors.billed_amount }}</span></p>
        
                    <input type="number" v-model="data.billed_amount" class="font-bold border-gray-300 w-1/4 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div>

                <div class="my-2" v-if="data.isWorkback == 1">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Date Billed <span class="text-xs text-red-500 ml-2">{{ errors.datetime_billed }}</span></p>
        
                    <input type="date" v-model="data.datetime_billed" class="font-bold border-gray-300 w-auto rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div>

                <div class="my-2" v-if="data.isWorkback == 1">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Date Received <span class="text-xs text-red-500 ml-2">{{ errors.datetime_received }}</span></p>
        
                    <input type="date" v-model="data.datetime_received" class="font-bold border-gray-300 w-auto rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div>

                <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Training Date Start <span class="text-xs text-red-500 ml-2">{{ errors.date_start }}</span></p>
        
                    <input type="date" v-model="data.date_start" class="font-bold border-gray-300 w-auto rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div>

                <div class="my-2" v-if="action == 'edit'">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Training Date End <span class="text-xs text-red-500 ml-2">{{ errors.date_end }}</span></p>
        
                    <input type="date" v-model="data.date_end" class="font-bold border-gray-300 w-auto rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div>

                <!-- <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Training Date End <span class="text-xs text-red-500 ml-2">{{ errors.date_end }}</span></p>
        
                    <input type="date" v-model="data.date_end" class="font-bold border-gray-300 w-auto rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                </div> -->

                <!-- <div class="my-2">
                    <p class="text-sm text-gray-600 mb-2 flex items-center">Remarks</p>
        
                    <textarea rows="2" v-model="data.remarks" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                    </textarea>
                </div> -->

                <div class="my-2">
                <!-- Confirmation checkbox -->
                <div class="flex items-center">
                    <input
                    id="confirmation"
                    type="checkbox"
                    v-model="isChecked"
                    class="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label for="confirmation" class="ml-2 text-sm text-gray-700">
                    All details are correct and ready for {{ action == 'edit' ? 'update' : 'submission'}}
                    </label>
                </div>

                </div>


                <div class="mt-5 justify-end flex items-center gap-2">
                    <button v-if="action=='add' && isChecked" type="button" @click="generateRecord" class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:text-xs">Generate</button>
                    <button v-if="action=='edit' && isChecked" type="button" @click="confirmAction" class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:text-xs">Update</button>
                    <button v-if="action=='edit' && isChecked" type="button" @click="generateRecord" class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:text-xs">Get Generated Bill</button>
                    <!-- <button type="button" @click="confirmAction" class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:text-xs">{{ btn_name }}</button> -->
                    <button type="button" @click="closeModal" class="inline-flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 font-medium text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 sm:text-xs">Cancel</button>
                </div>
            </div>
            </div>
    
            </div>
        </div>
    
    </div>
        
    
    <!-- Child Modal -->
    <div
      v-if="showChildModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
    >
      <div class="bg-white p-6 rounded shadow-lg w-1/2 relative z-60">
        <h3 class="text-lg font-semibold mb-3">Generated Billing Record Info</h3>
        <p class="mt-2 text-gray-600"><strong class="text-gray-800">Control number:</strong> {{ data.ctrl_num ? data.ctrl_num : 'No data' }}</p>
        <p class="mt-2 text-gray-600"><strong class="text-gray-800">Batch name:</strong> {{ data.batch_name ? data.batch_name : 'No data' }}</p>
        <p class="mt-2 text-gray-600"><strong class="text-gray-800">Training Center:</strong> {{ data.tc_id ? findValue(data.tc_id,'tc_id') : 'No data' }}</p>
        <p class="mt-2 text-gray-600"><strong class="text-gray-800">Scholarship:</strong> {{ data.sc_id ?  findValue(data.sc_id,'sc_id') : 'No data' }}</p>
        <p class="mt-2 text-gray-600"><strong class="text-gray-800">Qualification:</strong> {{ data.q_id ?  findValue(data.q_id,'q_id') : 'No data' }}</p>
        <p class="mt-2 text-gray-600"><strong class="text-gray-800">Qualification days:</strong> {{ q_days ? q_days : 'No data' }}</p>
        <p class="mt-2 text-gray-600"><strong class="text-gray-800">Approved Slots:</strong> {{ data.num_pax ? data.num_pax : 'No data' }}</p>
        <p class="mt-2 text-gray-600"><strong class="text-gray-800">Training Date:</strong> {{ data.date_start ? getDateFormat(data.date_start) : 'No data' }} - {{ data.date_end ? getDateFormat(data.date_end) : 'No data' }}</p>

       <div class="p-4">
            <div class="border rounded-lg overflow-hidden">
                <div class="max-h-64 overflow-y-auto"> <!-- Set max height here -->
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-100 sticky top-0 z-10">
                    <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Billing Type</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Submission Date</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Payment</th>
                    </tr>
                    </thead>

                    <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="i in list_billing_periods" :key="i.id">
                        <td class="px-4 py-2 text-sm text-gray-900">{{ i.bt.abbre }}</td>

                        <td class="px-4 py-2 text-sm text-gray-700">
                        {{ getDateFormat(i.datetime_due) }}
                        </td>

                        <td class="px-4 py-2 text-sm text-gray-900">
                        <input
                            type="number"
                            class="rounded-lg text-sm"
                            v-model.number="i.total_payment"
                        />
                        </td>
                    </tr>
                    </tbody>

                </table>
                </div>
            </div>
            </div>



        <div class="flex items-center justify-end mt-4 gap-2">
            <button
            @click="submitBilling"
            class="px-4 py-2 rounded"
            :class="isSubmitting ? 'bg-gray-200 text-gray-800' : 'bg-primary-600 text-white'"
            >
            Submit Billing
            </button>
            <button
            @click="showChildModal = false"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded"
            >
            Close
            </button>
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
        data(){
            return{
                selectedYear : '',
                years : [],
                isSubmitting : false,
                showChildModal : false,
                alltypes_tc : [],
                alltypes_sc : '',
                alltypes_bt : '',
                alltypes_q : '',
                title : '',
                action : '',
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
                    date_end : null,
                    date_start : null,
                    fiscal_yr : null,
                },
                btn_name : '',
                errors : {
                    description : '',
                },
                list_billing_periods : [],
                q_days : null,
                isChecked : false,
                
            }
        },
        methods: {
            submitBilling(){
                const today = new Date();
                const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const timestamp = date + ' ' + time;

                this.data.datetime_added = timestamp;

                const invalid = this.list_billing_periods.filter(i => i.total_payment <= 0);
                if (invalid.length > 0) {
                    this.showNotification(0,"Incomplete payments","Some values must be greater than 0.");
                    return;
                }

                 this.isSubmitting = true;

                axios.post(process.env.VUE_APP_BASE_URL + '/billing_records/add', this.data)
                .then((res)=>{

                    if(res.status == 201){

                        axios.post(process.env.VUE_APP_BASE_URL + '/billing_periods/add', this.list_billing_periods)
                        .then((res2)=>{

                            if(res2.status == 201){

                                    this.isSubmitting = false;

                                    this.showNotification(1,"Success","Bill added!");
                                    this.refreshData();
                                    this.closeModal();
                                

                            }
                            
                        });
                        

                    }
                    
                });
            },
            addWeekdays(daysToAdd,tag_type) {

            if(this.data.date_start && this.data.date_end){
                
                var startDate = null;
                if(tag_type == 'start train') startDate = this.data.date_start;
                else if(tag_type == 'end train') startDate = this.data.date_end;
                else if(tag_type == 'end assessment'){
                    startDate = this.list_billing_periods[this.list_billing_periods.length - 1].datetime_due;
                }

                const result = new Date(startDate)
                let addedDays = 0

                while (addedDays < daysToAdd) {
                    result.setDate(result.getDate() + 1)
                    const day = result.getDay()
                    if (day !== 0 && day !== 6) {
                    addedDays++
                    }
                }

                return moment(result).format('YYYY-MM-DD')
            }
            else{
                return '-';
            }

            
            },
            getDateFormat(value){
            return moment(value).format('MMMM DD, YYYY');
            },
            generateRecord(){

                if(this.data.ctrl_num == null){
                    this.showNotification(0,'Control number missing','Please input required field.');
                    return;
                }
                else if(this.data.batch_name == null){
                    this.showNotification(0,'Batch name missing','Please input required field.');
                    return;
                }
                else if(this.data.num_pax == null){
                    this.showNotification(0,'Number of pax missing','Please input required field.');
                    return;
                }
                else if(this.data.date_start == null){
                    this.showNotification(0,'Training starting date missing','Please input required field.');
                    return;
                }

                const result = new Date(this.data.date_start)
                let addedDays = 0

                while (addedDays < this.q_days) {
                    result.setDate(result.getDate() + 1)
                    const day = result.getDay()
                    if (day !== 0 && day !== 6) {
                    addedDays++
                    }
                }

                this.data.date_end = moment(result).format('YYYY-MM-DD');
             
                this.showChildModal = true;

                if(this.list_billing_periods.length > 0) this.list_billing_periods.splice(0);

                axios.get(process.env.VUE_APP_BASE_URL + '/billing_set_types/find_by_sc_id/' + this.data.sc_id)
                .then((res)=>{
                
                    if(res.status == 200){
                        res.data.sort(function(a, b){
                            if(a.order_num > b.order_num) { return 1; }
                            if(a.order_num < b.order_num) { return -1; }
                            return 0;
                        });

                        for(var i = 0; i < res.data.length; i++){
                            this.list_billing_periods.push({
                                ctrl_num : this.data.ctrl_num,
                                sc_id : this.data.sc_id,
                                bt_id : res.data[i].bt_id.id,
                                bt : res.data[i].bt_id,
                                order_num : res.data[i].order_num,
                                total_payment : 0,
                                datetime_due : this.addWeekdays(res.data[i].bt_id.days, res.data[i].bt_id.tag_type)
                            })
                        }
                        

                    }
                });
            },
            getQualifications(data){

                if(data){
                    axios.get(process.env.VUE_APP_BASE_URL + '/qualifications/get_all')
                    .then((res)=>{
                    
                        if(res.status == 200){
                            res.data.sort(function(a, b){
                                if(a.description > b.description) { return 1; }
                                if(a.description < b.description) { return -1; }
                                return 0;
                            });

                            const allowedIds = data;

                            const filteredData = res.data.filter(item =>
                            allowedIds.includes(item.id)
                            );

                            this.alltypes_q = filteredData;
                            this.data.q_id = this.alltypes_q[0].id;
                            this.q_days = this.alltypes_q[0].days;

                        }
                    });
                }

                 

            },
            getScholarships(data){

                if(data){
                    axios.get(process.env.VUE_APP_BASE_URL + '/scholarships/get_all')
                    .then((res)=>{
                    
                        if(res.status == 200){
                            res.data.sort(function(a, b){
                                if(a.description > b.description) { return 1; }
                                if(a.description < b.description) { return -1; }
                                return 0;
                            });

                            const allowedIds = data;

                            const filteredData = res.data.filter(item =>
                            allowedIds.includes(item.id)
                            );

                            this.alltypes_sc = filteredData;
                            this.data.sc_id = this.alltypes_sc[0].id;

                        }
                    });
                }
               
            },
            getTypes(){
                axios.get(process.env.VUE_APP_BASE_URL + '/training_centers/get_all')
                .then((res)=>{
                
                    if(res.status == 200){
                        this.alltypes_tc = res.data.sort(function(a, b){
                            if(a.description > b.description) { return 1; }
                            if(a.description < b.description) { return -1; }
                            return 0;
                        });

                        if(this.$store.state.user.tc_id) this.data.tc_id = this.$store.state.user.tc_id.id;

                        const index = res.data.findIndex(item => item.id === this.$store.state.user.tc_id.id);

                        this.getQualifications(res.data[index].list_q_id);
                        this.getScholarships(res.data[index].list_sc_id);
                    }
                    
                });

            },
            findValue(value,type){
                const findTC = value => this.alltypes_tc.find(item => item.id === value)?.description || null;
                const findSC = value => this.alltypes_sc.find(item => item.id === value)?.description || null;
                const findQ = value => this.alltypes_q.find(item => item.id === value)?.description || null;

                if(type == 'tc_id') return findTC(value);
                else if(type == 'sc_id') return findSC(value);
                else if(type == 'q_id') return findQ(value);
            },
            findData(){
                axios.get(process.env.VUE_APP_BASE_URL + '/billing_records/find/' + this.data.id)
                .then((res)=>{
                
                    if(res.status == 200){
                
                        this.data.id = res.data.id;
                        this.data.status_id = res.data.status_id;
                        this.data.ctrl_num = res.data.ctrl_num;
                        this.data.num_pax = res.data.num_pax;
                        this.data.billed_amount = res.data.billed_amount;
                        this.data.datetime_billed = moment(res.data.datetime_billed).format('YYYY-MM-DD');
                        this.data.datetime_received = moment(res.data.datetime_received).format('YYYY-MM-DD');
                        this.data.remarks = res.data.remarks;
                        this.data.batch_name = res.data.batch_name;
                        this.data.date_start = moment(res.data.date_start).format('YYYY-MM-DD');
                        this.data.date_end = moment(res.data.date_end).format('YYYY-MM-DD');
                        this.data.fiscal_yr = res.data.fiscal_yr;
                        
                
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

                    if(this.data.ctrl_num == ''){
                        this.errors.ctrl_num = "* Please input control number";
                        valid = false;
                    }
                    else if(this.data.batch_name == ''){
                        this.errors.batch_name = "* Please input batch name";
                        valid = false;
                    }
                    else if(this.data.num_pax <= 0 || this.data.num_pax == null){
                        this.errors.num_pax = "* Please input total number of pax";
                        valid = false;
                    }
                    else if(this.data.billed_amount <= 0 || this.data.billed_amount == null){
                        this.errors.billed_amount = "* Please input billed amount";
                        valid = false;
                    }
                    else if(this.data.datetime_billed == null){
                        this.errors.datetime_billed = "* Please input date billed";
                        valid = false;
                    }
                    else if(this.data.datetime_received == null){
                        this.errors.datetime_received = "* Please input date received";
                        valid = false;
                    }
                    if(valid){
                        axios.post(process.env.VUE_APP_BASE_URL + '/billing_records/add', this.data)
                        .then((res)=>{

                            if(res.status == 201){

                                    this.showNotification(1,"Success","Bill added!");
                                    this.refreshData();
                                    this.closeModal();
                                

                            }
                            
                        });
                    }
                    
                }
                else if(this.action == "edit"){

                    if(this.data.status_id == 3) this.data.status_id = 0;
                    axios.post(process.env.VUE_APP_BASE_URL + '/billing_records/edit', this.data)
                    .then((res)=>{

                        if(res.status == 201){
                            
                            this.showNotification(1,"Success","Bill updated!");
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

                const currentYear = new Date().getFullYear();
                this.years = [];

                const startYear = 2020;
                const endYear = currentYear + 1; // include next fiscal year

                for (let y = endYear; y >= startYear + 1; y--) {
                const fiscalYear = `${y - 1}-${y}`;
                this.years.push(fiscalYear);
                }

                this.data.fiscal_yr = this.years[0];

                this.data.id = val.id;
                
                this.action = val.action;
                this.data.isWorkback = val.isWorkback;
                this.getTypes();

                if(this.action == "add"){
                    if(val.isWorkback == 1){
                        this.title = "Add Workback";
                        this.data.status_id = 1;
                    }
                    else{
                        this.title = "Create Bill";
                        this.data.status_id = 0;
                    }
                    
                    this.btn_name = "Add";
                }
                else if(this.action == "edit"){
                    this.title = "Edit Bill";
                    this.btn_name = "Edit";
                    this.findData();
                }
                
                
            },
            immediate:true
          }
        }
    }
        
    </script>