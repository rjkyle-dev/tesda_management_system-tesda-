<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 overflow-y-auto my-4">
        
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

                <select 
                    v-model="data.fiscal_yr"
                    class="font-bold border-gray-300 w-auto rounded-md text-sm 
                        focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                >
                    <option 
                    v-for="year in years" 
                    :key="year" 
                    :value="year"
                    >
                    {{ year }}
                    </option>
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
  class="fixed inset-0 z-[110] flex items-center justify-center bg-black bg-opacity-60"
>
  <div class="relative z-[1] bg-white p-6 rounded shadow-lg w-1/2 max-h-[90vh] overflow-y-auto">
    <h3 class="text-lg font-semibold mb-3">Generated Billing Record Info</h3>

    <p class="mt-2 text-gray-600"><strong class="text-gray-800">Control number:</strong> {{ data.ctrl_num ? data.ctrl_num : 'No data' }}</p>
    <p class="mt-2 text-gray-600"><strong class="text-gray-800">Batch name:</strong> {{ data.batch_name ? data.batch_name : 'No data' }}</p>
    <p class="mt-2 text-gray-600"><strong class="text-gray-800">Training Center:</strong> {{ data.tc_id ? findValue(data.tc_id,'tc_id') : 'No data' }}</p>
    <p class="mt-2 text-gray-600"><strong class="text-gray-800">Scholarship:</strong> {{ data.sc_id ?  findValue(data.sc_id,'sc_id') : 'No data' }}</p>
    <p class="mt-2 text-gray-600"><strong class="text-gray-800">Qualification:</strong> {{ data.q_id ?  findValue(data.q_id,'q_id') : 'No data' }}</p>
    <p class="mt-2 text-gray-600"><strong class="text-gray-800">Qualification days:</strong> {{ q_days ? q_days : 'No data' }}</p>
    <p class="mt-2 text-gray-600"><strong class="text-gray-800">Approved Slots:</strong> {{ data.num_pax ? data.num_pax : 'No data' }}</p>
    <p class="mt-2 text-gray-600"><strong class="text-gray-800">Training Date:</strong> {{ data.date_start ? getDateFormat(data.date_start) : 'No data' }} - {{ data.date_end ? getDateFormat(data.date_end) : 'No data' }}</p>

    <!-- Billing Period Table -->
    <div class="p-4 flex flex-col space-y-2">
      <div class="border rounded-lg overflow-hidden">
        <div class="max-h-64 overflow-y-auto"> <!-- Table Scroll -->
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

                <!-- Editable Submission Date -->
                <td class="px-4 py-2 text-sm text-gray-700">
                    <input 
                    type="date" 
                    class="rounded-lg text-sm px-2 py-1" 
                    v-model="i.datetime_due"
                    />
                </td>

                <td class="px-4 py-2 text-sm text-gray-900">
                    <input 
                    type="number" 
                    class="rounded-lg text-sm px-2 py-1" 
                    v-model.number="i.total_payment" 
                    />
                </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Students Upload & Table -->
      <div class="flex flex-col space-y-2">
        <div class="flex items-center gap-2">
          <label class="block font-semibold text-gray-600">Upload Trainees</label>
          <div v-if="selectedFileStudent" class=" text-gray-600 text-sm">
            (Selected File: <strong>{{ selectedFileStudent.name }}</strong>)
          </div>
        </div>

        <!-- Upload Area -->
        <div
          class="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-400 transition"
          @dragover.prevent
          @drop.prevent="handleFileDropStudents"
          @click="triggerFileInputStudents"
        >
          <svg class="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4a1 1 0 01-1-1v-2a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1z" />
          </svg>
          <p class="text-gray-500 text-sm text-center">
            Drag and drop your file here or
            <span class="text-blue-500 font-medium underline">click to upload</span>
          </p>
          <input type="file" ref="fileInputStudents" id="fileInputStudents" class="hidden" @change="handleFileChangeStudents" accept=".xls, .xlsx" />
        </div>

        <!-- Student Table -->
        <div class="max-h-64 overflow-y-auto border rounded-lg">
          <table class="min-w-full border-collapse text-xs">
            <thead class="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th class="px-4 py-2 border">#</th>
                <th class="px-4 py-2 border">First Name</th>
                <th class="px-4 py-2 border">Last Name</th>
                <th class="px-4 py-2 border">Extension</th>
                <th class="px-4 py-2 border">Middle Name</th>
                <th class="px-4 py-2 border">SG Number</th>
                <th class="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, index) in student_rows"
                :key="index"
                :class="row.status === 'dropped' || row.status === 'absent' ? 'bg-red-300 text-gray-800 bg-opacity-50' : 'bg-white text-gray-800'"
              >
                <td class="border px-4 py-2 text-center">{{ index + 1 }}</td>
                <td class="border px-4 py-2"><input type="text" v-model="row.fname" class="w-full border rounded px-2 py-1 text-xs" /></td>
                <td class="border px-4 py-2"><input type="text" v-model="row.lname" class="w-full border rounded px-2 py-1 text-xs" /></td>
                <td class="border px-4 py-2"><input type="text" v-model="row.extension" class="w-full border rounded px-2 py-1 text-xs" /></td>
                <td class="border px-4 py-2"><input type="text" v-model="row.mname" class="w-full border rounded px-2 py-1 text-xs" /></td>
                <td class="border px-4 py-2"><input type="text" v-model="row.sg_number" class="w-full border rounded px-2 py-1 text-xs" /></td>
                <td class="border px-4 py-2 text-center">
                  <button @click="deleteRow(index)" class="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Add Row Button -->
          <div class="mt-2">
            <button @click="addRow" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">+ Add Row</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex items-center justify-end mt-4 gap-2">
      <button
        @click="submitBilling"
        class="px-4 py-2 rounded"
        :class="isSubmitting ? 'bg-gray-200 text-gray-800' : 'bg-primary-600 text-white'"
      >
        Submit Billing
      </button>
      <button @click="showChildModal = false" class="px-4 py-2 bg-gray-200 text-gray-800 rounded">Close</button>
    </div>
  </div>
</div>
  </Teleport>
</template>
    
    <script>
    import axios from 'axios';
    import moment from 'moment';
    import * as XLSX from "xlsx";

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
                selectedFileStudent: null,
                student_rows : [],
                billing_data: {
                    id : null,
                    ctrl_num : null,
                    sc_id : null,
                    bt_id : null,
                    order_num : null,
                    status : 0,
                    remarks : null,
                    user_id : this.$store.state.user.id,
                    total_payment: null,
                    datetime_due: null,
                },
            }
        },
        methods: {
            generateFiscalYears(isWorkback) {

            const currentYear = new Date().getFullYear();

            const years = [];
            const nextYear = currentYear + 1;

            if (isWorkback == 0) {
                // Only current and next fiscal year
                years.push(`${currentYear - 1}-${currentYear}`);
                years.push(`${currentYear}-${nextYear}`);
            } else {
                // Full list back to 2019–2020
                const startYear = 2020; // beginning of the second year
                for (let y = nextYear; y >= startYear; y--) {
                years.push(`${y - 1}-${y}`);
                }
            }

            return years;
            },
            addRow() {
            this.student_rows.push({
                fname: "",
                lname: "",
                extension: "",
                mname: "",
                sg_number: "",
                payment: 0,
                status: "active", 
            });
            },
            deleteRow(index) {
            this.student_rows.splice(index, 1);
            },
            triggerFileInputStudents() {
            this.$refs.fileInputStudents.click();
            },

            handleFileChangeStudents(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedFileStudent = file;
                this.parseExcelFile(file);
            }
            },

            handleFileDropStudents(event) {
            const file = event.dataTransfer.files[0];
            if (file) {
                this.selectedFileStudent = file;
                this.parseExcelFile(file);
            }
            },
            parseExcelFile(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

                this.student_rows = jsonData.map((row) => ({
                fname: row["First Name"] || "",
                lname: row["Last Name"] || "",
                extension: row["Extension"] || "",
                mname: row["Middle Name"] || "",
                sg_number: row["SG Number"] || "",
                }));
            };
            reader.readAsArrayBuffer(file);
            },
            submitBilling() { 
                const today = new Date();
                const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const timestamp = date + ' ' + time;

                this.data.datetime_added = timestamp;

                const invalid = this.list_billing_periods.filter(i => i.total_payment <= 0);
                if (invalid.length > 0) {
                    this.showNotification(0, "Incomplete payments", "Some values must be greater than 0.");
                    return;
                }

                if(this.student_rows.length == 0){
                    this.showNotification(0, "No uploaded trainees", "Please upload or create new trainees manually.");
                    return;
                }

                this.isSubmitting = true;

                axios.post(process.env.VUE_APP_BASE_URL + '/billing_records/add', this.data)
                .then((res) => {
                    if (res.status === 201) {

                        const billingRecordId = res.data.id;

                        const billingPeriodsPayload = this.list_billing_periods.map(bp => ({
                            ...bp,
                            billing_record_id: billingRecordId
                        }));

                        axios.post(process.env.VUE_APP_BASE_URL + '/billing_periods/add', billingPeriodsPayload)
                        .then((res2) => {
                            if (res2.status === 201) {

                                const traineesPayload = [];

                                this.list_billing_periods.forEach(bp => {
                                    const numTrainees = this.student_rows.length;
                                    const perTraineeCost = numTrainees > 0 ? bp.total_payment / numTrainees : 0;

                                    this.student_rows.forEach(student => {
                                        traineesPayload.push({
                                            fname: student.fname,
                                            mname: student.mname,
                                            lname: student.lname,
                                            extension: student.extension,
                                            sg_number: student.sg_number,
                                            training_cost: perTraineeCost, 
                                            ctrl_num: this.data.ctrl_num,
                                            bt_id: bp.bt_id
                                        });
                                    });
                                });

                                axios.post(process.env.VUE_APP_BASE_URL + '/trainees/add_many', traineesPayload)
                                .then((res3) => {
                                    if (res3.status === 201) {
                                        this.isSubmitting = false;
                                        this.showNotification(1, "Success", "Bill and trainees added!");
                                        this.refreshData();
                                        this.closeModal();
                                    }
                                }).catch(err => {
                                    this.isSubmitting = false;
                                    this.showNotification(0, "Error", "Failed to add trainees.");
                                    console.error(err);
                                });

                            }
                        }).catch(err => {
                            this.isSubmitting = false;
                            this.showNotification(0, "Error", "Failed to add billing periods.");
                            console.error(err);
                        });

                    }
                }).catch(err => {
                    this.isSubmitting = false;
                    this.showNotification(0, "Error", "Failed to add billing record.");
                    console.error(err);
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
            "data.isWorkback": {
            immediate: true,
            handler(newValue) {
                this.years = this.generateFiscalYears(newValue);
                this.data.fiscal_yr = this.years[0];
            }
            },
            item_data: {
            handler(val){


                this.generateFiscalYears(val.isWorkback);
                // this.years = [];

                // const startYear = 2020;
                // const endYear = currentYear + 1; // include next fiscal year

                // for (let y = endYear; y >= startYear + 1; y--) {
                // const fiscalYear = `${y - 1}-${y}`;
                // this.years.push(fiscalYear);
                // }

                // this.data.fiscal_yr = this.years[0];

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