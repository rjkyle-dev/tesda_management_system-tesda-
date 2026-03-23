<template>
  <div class="h-full p-6 bg-gray-100">
    <div class="w-full mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">

      <!-- HEADER -->
      <h2 class="text-2xl font-semibold text-gray-800">
        Profile Information
      </h2>

      <!-- TOP UPLOAD SECTION -->
      <fieldset class="border border-gray-200 rounded-xl p-6">
        <legend class="px-3 text-sm font-semibold text-gray-600">
          Profile & E-Signature
        </legend>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">

          <!-- PROFILE PHOTO -->
          <div class="flex flex-col items-center gap-4">
            <p class="text-sm font-medium text-gray-700">
              Profile Photo
            </p>

            <img
              :src="profilePreview"
              alt="Profile Image"
              class="w-36 h-36 rounded-full object-cover border-4 border-gray-200 shadow-sm"
            />

            <label
              class="cursor-pointer px-4 py-2 text-sm rounded-lg border border-gray-300
                     hover:bg-gray-50 transition"
            >
              Upload Photo
              <input
                type="file"
                accept="image/*"
                class="hidden"
                @change="onProfileUpload($event)"
              />
            </label>
          </div>

          <!-- E-SIGNATURE -->
          <div class="flex flex-col items-center gap-4">
            <p class="text-sm font-medium text-gray-700">
              E-Signature
            </p>

            <div
              class="w-72 h-36 border-2 border-dashed border-gray-300
                     rounded-lg flex items-center justify-center bg-gray-50"
            >
              <img
                v-if="signaturePreview"
                :src="signaturePreview"
                alt="Signature"
                class="max-h-full object-contain"
              />
              <span v-else class="text-sm text-gray-400">
                No signature uploaded
              </span>
            </div>

            <label
              class="cursor-pointer px-4 py-2 text-sm rounded-lg border border-gray-300
                     hover:bg-gray-50 transition"
            >
              Upload Signature
              <input
                type="file"
                accept="image/*"
                class="hidden"
                @change="onSignatureUpload($event)"
              />
            </label>
          </div>

        </div>
      </fieldset>

      <!-- PERSONAL INFO -->
      <fieldset class="border border-gray-200 rounded-xl p-6">
        <legend class="px-3 text-sm font-semibold text-gray-600">
          Personal Information
        </legend>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              First Name
            </label>
            <input type="text" v-model="data.user_profile.fname" class="input-modern" placeholder="First Name" />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Middle Name
            </label>
            <input type="text" v-model="data.user_profile.mname" class="input-modern" placeholder="Middle Name" />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input type="text" v-model="data.user_profile.lname" class="input-modern" placeholder="Last Name" />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input type="text" v-model="data.user_profile.phone_number" class="input-modern w-auto" placeholder="Phone Number" maxlength="11" />
          </div>

        </div>
      </fieldset>

      <!-- ACTION -->
      <div class="flex justify-end">
        <button
          @click="saveProfile"
          class="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium
                 hover:bg-blue-700 transition"
        >
          Save Profile
        </button>
      </div>

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
            }
        }
    },
    props:{
      showNotification : Function,
    },
    created(){
      this.getUserInfo();
    },
    methods:{
    async saveProfile() {
      try {

        const payload = {
          user_id : this.data.id,
          fname: this.data.user_profile.fname,
          mname: this.data.user_profile.mname,
          lname: this.data.user_profile.lname,
          phone_number: this.data.user_profile.phone_number,
        };

        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}/user_profile/edit`,
          payload
        );

        this.showNotification(1,'Success','User info updated successfully!');

        if (response.data) {
          //
        }

      } catch (error) {
        console.error(error);
        this.showNotification(1,'Failed','User info failed to update!');
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

        this.showNotification(1,'Upload Success','Photo has been updated successfully!');
      } catch (error) {
        console.error(error);
        this.showNotification(0,'Upload Failed','Photo has failed to update!');
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

        this.showNotification(1,'Upload Success','E-signature has been updated successfully!');
      } catch (error) {
        console.error(error);
        this.showNotification(0,'Upload Failed','E-signature has failed to update!');
      }
    },
    async getUserInfo(){
        try {
            const res = await axios.get(
            `${process.env.VUE_APP_BASE_URL}/user/find_user/${this.$store.state.user.id}`
            );
            if (res.status === 200) {

              this.data = res.data;
              const resProfPic = this.data.profile_pic ?`${process.env.VUE_APP_BASE_URL}/user/get_img/${this.data.profile_pic}/img` : null;
              const resEsign = this.data.e_sign ? `${process.env.VUE_APP_BASE_URL}/user/get_img/${this.data.e_sign}/esign` : null;
              this.profilePreview = resProfPic;
              this.signaturePreview = resEsign;

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
