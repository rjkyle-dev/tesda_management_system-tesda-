<template>
  <div class="h-full p-6 bg-gray-100">
    <div class="w-full mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">

      <!-- HEADER -->
      <h2 class="text-2xl font-semibold text-gray-800">
        Security Settings
      </h2>

      <!-- Email -->
      <fieldset class="border border-gray-200 rounded-xl p-6">
        <legend class="px-3 text-sm font-semibold text-gray-600">
          User Credential
        </legend>

        <div class="grid grid-cols-1 md:grid-cols-1 gap-6 my-2">

          <div class="w-1/2">
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Email address
            </label>
            <input type="text" v-model="data.email" class="input-modern" placeholder="Email address" />
          </div>

        </div>

         <!-- ACTION -->
        <div class="flex justify-end">
          <button
            @click="saveEmailAddress"
            class="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium
                  hover:bg-blue-700 transition text-sm"
          >
            Update Email Address
          </button>
        </div>
      </fieldset>

      <!-- Password -->
      <fieldset class="border border-gray-200 rounded-xl p-6">
        <legend class="px-3 text-sm font-semibold text-gray-600">
          Change Password
        </legend>

        <div class="grid grid-cols-1 md:grid-cols-1 gap-6 my-2">

  <div class="w-1/2">
    <label class="block mb-1 text-sm font-medium text-gray-700">
      Old Password
    </label>
    <div class="relative">
      <input
        :type="showOldPassword ? 'text' : 'password'"
        v-model="new_pass_data.old_pw"
        class="input-modern pr-16"
        placeholder="Input your old password"
      />
      <button
        type="button"
        @click="showOldPassword = !showOldPassword"
        class="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700 text-sm font-medium"
      >
        {{ showOldPassword ? 'Hide' : 'Show' }}
      </button>
    </div>
  </div>

  <div class="w-1/2">
    <label class="block mb-1 text-sm font-medium text-gray-700">
      New Password
    </label>
    <div class="relative">
      <input
        :type="showNewPassword ? 'text' : 'password'"
        v-model="new_pass_data.new_pw"
        class="input-modern pr-16"
        placeholder="Input your new password"
      />
      <button
        type="button"
        @click="showNewPassword = !showNewPassword"
        class="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700 text-sm font-medium"
      >
        {{ showNewPassword ? 'Hide' : 'Show' }}
      </button>
    </div>
  </div>

  <div class="w-1/2">
    <label class="block mb-1 text-sm font-medium text-gray-700">
      Confirm Password
    </label>
    <div class="relative">
      <input
        :type="showConfirmPassword ? 'text' : 'password'"
        v-model="new_pass_data.confirm_pw"
        class="input-modern pr-16"
        placeholder="Re-enter your password"
      />
      <button
        type="button"
        @click="showConfirmPassword = !showConfirmPassword"
        class="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700 text-sm font-medium"
      >
        {{ showConfirmPassword ? 'Hide' : 'Show' }}
      </button>
    </div>
  </div>

</div>

         <!-- ACTION -->
        <div class="flex justify-end">
          <button
            @click="savePassword"
            class="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium
                  hover:bg-blue-700 transition text-sm"
          >
            Update Password
          </button>
        </div>
      </fieldset>

     

    </div>
  </div>
</template>



<script>

import axios from 'axios';

export default{
    data(){
        return{
            profilePreview: null,
            signaturePreview: null,
            data : {
              user_profile: {
                fname : null,
                lname : null,
                mname : null,
                phone_number: null,
              }
            },
            new_pass_data: {
              id: null,
              old_pw : null,
              new_pw : null,
              confirm_pw : null,
            },
            showOldPassword: false,
            showNewPassword: false,
            showConfirmPassword: false
        }
    },
    props:{
      showNotification : Function,
    },
    created(){
      this.getUserInfo();
    },
    methods:{
    async saveEmailAddress() {
      try {
        const new_data = {
          id : this.$store.state.user.id,
          email : this.data.email,
        }
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/user/edit_email`,
          new_data
        );

        this.showNotification(1,'Success','User email updated successfully!');

        if (response.data) {
          //
        }

      } catch (error) {
        console.error(error);
        this.showNotification(1,'Failed','User info failed to update!');
      }
    },
    async savePassword() {
      try {
        this.new_pass_data.id = this.$store.state.user.id;

        if(!this.new_pass_data.old_pw){
          this.showNotification(0, 'Missing field', 'Please input old password');
          return;
        }
        else if(!this.new_pass_data.new_pw){
          this.showNotification(0, 'Missing field', 'Please input new password');
          return;
        }
        else if(!this.new_pass_data.confirm_pw){
          this.showNotification(0, 'Missing field', 'Please input confirm password');
          return;
        }
        else if(this.new_pass_data.new_pw != this.new_pass_data.confirm_pw){
          this.showNotification(0, 'Missing field', 'New and confirm password do not match');
          return;
        }

        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/user/edit_password`,
          this.new_pass_data
        );

        this.showNotification(1, 'Success', response.data.message);

      } catch (error) {
        console.error(error);

        const message =
          error.response?.data?.message || 'User info failed to update!';

        this.showNotification(0, 'Failed', message);
      }
    },
    async onProfileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.profilePreview = URL.createObjectURL(file);

      const formData = new FormData();
      formData.append("file", file);

      try {
        await axios.post(
          process.env.VUE_APP_BASE_URL + "/user/upload_pic/" + this.$store.state.user.id,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.$toast?.success("Profile photo uploaded");
      } catch (error) {
        console.error(error);
        this.$toast?.error("Failed to upload profile photo");
      }
    },
    async onSignatureUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.signaturePreview = URL.createObjectURL(file);

      const formData = new FormData();
      formData.append("file", file);

      try {
        await axios.post(
          process.env.VUE_APP_BASE_URL + "/user/upload_esign/" + this.$store.state.user.id,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.$toast?.success("Signature uploaded");
      } catch (error) {
        console.error(error);
        this.$toast?.error("Failed to upload signature");
      }
    },
    async getUserInfo(){
        try {
            const res = await axios.get(
            `${process.env.VUE_APP_BASE_URL}/user/find_user/${this.$store.state.user.id}`
            );
            if (res.status === 200) {

              this.data = res.data;
              console.log(this.data);
              const resProfPic = this.data.profile_pic ?`${process.env.VUE_APP_BASE_URL}/user/get_img/${this.data.profile_pic}/img` : null;
              const resEsign = this.data.e_sign ? `${process.env.VUE_APP_BASE_URL}/user/get_img/${this.data.e_sign}/esign` : null;
              this.profilePreview = resProfPic ? resProfPic : null;
              this.signaturePreview = resEsign ? resEsign : null;

            } else {
            return '-';
            }
        } catch (e) {
            console.error(e);
            return '-';
        }
    },

    },
}
</script>
