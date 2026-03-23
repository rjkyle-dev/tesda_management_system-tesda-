<template>
    <div class="flex-auto flex flex-col">

        <div class="flex items-center w-full bg-white">
        <div class="flex-none sm:flex-none">
            <button class="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 mx-4 my-2 rounded-lg duration-300" @click="openModal('add',0)">
                {{ $route.params.type == 2 ? 'Add PO Staff' : 'Add TC Staff' }}
            </button>
        </div>
          <div class="flex-none sm:flex-auto">
            <input type="text" class="font-bold border-gray-300 w-full rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500" placeholder="Search user.." @input="getAllData($event.target.value, 'search')">
        </div>
        <div class="flex-auto sm:flex-none">
            <div class="pagination_cmp px-3">
                <vue-awesome-paginate 
                :total-items="total_cnt" 
                :items-per-page="page_limit"
                v-model="page"
                @click="getAllData(null,null)">
                <template #prev-button>
                    <span>
                    <!-- <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="black"
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
                    </svg> -->
                    Prev
                    </span>
                </template>

                <template #next-button>
                    <span>
                    Next
                    <!-- <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="black"
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
                    </svg> -->
                    </span>
                </template>
                </vue-awesome-paginate>
            </div>
        </div>
    </div>

        <div class="bg-white m-4 p-4 rounded-md">


        <div class="relative scrollbar sm:rounded-lg mx-6 border border-1">

        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3 w-auto text-left">
                    Name
                    </th>
                    <th scope="col" class="px-6 py-3 w-auto text-left">
                    Email Address
                    </th>
                    <th scope="col" class="py-3 text-center">
                    Contact Number
                    </th>
                    <th scope="col" class="py-3 text-center w-28">
                    Date & Time added
                    </th>
                    <!-- <th scope="col" class="px-6 py-3 text-center">
                    Approval Status
                    </th> -->
                    <!-- <th scope="col" class="px-6 py-3 text-center w-10">
                    Released
                    </th> -->
                    <th scope="col" class="px-6 py-3 text-center w-28">
                    Actions
                    </th>
                </tr>
            </thead>
            <tbody>

            <tr v-if="alldata.length == 0">
                <td colspan="7" class="py-5 px-5">
                <!-- <img src="../assets/icon_empty_document.png" class="mx-auto h-24"/> -->
                <p class="w-full text-center mt-4 text-gray-500 text-sm">There are no files yet.</p>
                </td>
            </tr>

                <tr v-for="i in alldata" v-bind:key="i.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-200">
                    <td class="py-4 px-6 text-left w-auto">
                    {{checkIfEmpty(formatUserName(i.user_profile))}}
                    </td>
                    <td class="py-4 px-6 text-left w-auto">
                    {{checkIfEmpty(i.email)}}
                    </td>
                    <td class="py-4 px-2 text-center w-16">
                    {{i.user_profile ? i.user_profile.phone_number : '-'}}
                    </td>
                    <td class="px-2 py-4 text-center w-28">
                    {{getDateTimeFormat(i.datetime_added)}}
                    </td>
                    <td class="px-6 py-4 flex items-center w-auto">
                    <span class="flex items-center space-x-2 mx-auto">
                         <img src="../assets/icon_edit.png" class="h-4 w-auto cursor-pointer" @click="openModal('edit',i.id)">
                         <img src="../assets/action_icon_view.png" class="h-4 w-auto cursor-pointer" @click="openModal('view',i.id)">
                    </span>
                    </td>
                </tr>
                
            </tbody>
        </table>
                        
        </div>



</div>
        
    </div>

    <AddAccount v-if="show_Modal_Add" @close-modal="show_Modal_Add = false" :refreshData="refreshData" :showNotification="showNotification" :item_data="item_data"/>
  
</template>

<script>

import AddAccount from '@/components/Modals/AddAccount.vue';
import axios from 'axios';
import moment from 'moment';

export default{
    components: {
        AddAccount,
    },
    mounted(){
        this.refreshData();
    },
    props:{
        showNotification : Function
    },
    data(){
        return{
            alldata : '',
            page: 1,
            total_cnt: 0,
            total_pages : 0,
            page_limit : 25,
            show_Modal_Add : false,

            item_data : {
                id : 0,
                type: 0,
            }
        }
    },
    methods: {
        refreshData(){
            this.getAllData(null,null);
        },
        getDateTimeFormat(value){
        return moment(value).format('MMMM DD, YYYY h:mm a');
        },
        checkIfEmpty(val){
        if(val) return val;
        else return "-";
        },
        formatUserName(i){
            if(i != null){

                return i.lname + ", " + i.fname + " " + (i.mname ? i.mname : '');
            }
            else return "-";
        },
        openModal(action, id){
            this.item_data.action = action;
            this.item_data.id = id;
            this.item_data.type = this.$route.params.type;
            this.show_Modal_Add = true;
        },
        getAllData(search_value, type) {
            const params = {};

            if (search_value !== null && type) {
                params.value = search_value;
                params.type = type;
            }

            axios.get(
                `${process.env.VUE_APP_BASE_URL}/user/get_users_by_page/${this.$route.params.type}/${this.page}/${this.page_limit}`,
                { params }  
            )
            .then(res => {
                if (res.status === 200) {
                    this.alldata = res.data[0];
                    this.total_cnt = res.data[1];
                }
            });
        }
    },
    watch: {
    
    '$route': {
        immediate:true,
        handler(){
          this.refreshData();
        },
    },
    
    }

}

</script>