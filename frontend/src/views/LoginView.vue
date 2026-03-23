<template>
    <div class="login-shell relative min-h-screen w-full overflow-hidden">

        <!-- Ambient background -->
        <div class="login-bg" aria-hidden="true" />
        <div class="login-blob login-blob--a" aria-hidden="true" />
        <div class="login-blob login-blob--b" aria-hidden="true" />
        <div class="login-blob login-blob--c" aria-hidden="true" />
        <div class="login-grid" aria-hidden="true" />

        <div class="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-10 px-4 py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:py-10">

            <!-- Landing copy -->
            <section class="login-hero w-full max-w-xl animate__fadeIn text-center lg:text-left">
                <p class="login-eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cyan-100/90 backdrop-blur-sm">
                    <span class="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
                    Technical Education and Skills Development Authority
                </p>

                <h1 class="login-title font-display text-5xl font-semibold leading-tight text-white sm:text-5xl lg:text-[3.25rem]">
                   <span class="login-title-accent block sm:inline text-8xl">OS</span>
                   <span class="login-title-accent block sm:inline text-8xl">MS</span>   
                    <!-- <span class="login-title-accent block sm:inline">clarified by data.</span> -->
                </h1>

                <p class="mt-5 max-w-md text-base leading-relaxed text-slate-300/95 lg:mx-0 mx-auto">
                    An Online Scholarship Management System with Descriptive Analytics for TESDA Davao de Oro
                </p>

                <!-- <ul class="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start" role="list">
                    <li class="login-pill">
                        <svg class="h-4 w-4 text-cyan-300/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        Scholarship Billing Management System
                    </li>
                    <li class="login-pill">
                        <svg class="h-4 w-4 text-cyan-300/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Performance Evaluation Module (Weighted Scoring Algorithm)
                    </li>
                    <li class="login-pill">
                        <svg class="h-4 w-4 text-cyan-300/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Descriptive Analytics Dashboard & Reporting
                    </li>
                </ul> -->
            </section>

            <!-- Floating login card -->
            <div class="login-float-wrap w-full max-w-md flex-shrink-0">
                <div class="login-float-ring" aria-hidden="true" />
                <div class="login-card animate__fadeIn">
                    <div class="mb-8 flex flex-col items-center text-center">
                        <img
                            src="../assets/logo.png"
                            alt=""
                            class="h-20 w-20 sm:h-24 sm:w-24 drop-shadow-md"
                        />
                        <h2 class="mt-4 font-display text-2xl font-semibold tracking-tight text-slate-800">
                            Welcome back
                        </h2>
                        <p class="mt-1 text-sm text-slate-500">
                            Sign in to your OSMS account
                        </p>
                    </div>

                    <form class="space-y-5" @submit.prevent="loginAccount">

                        <div class="relative">
                            <input
                                id="login-email"
                                v-model="data.email"
                                type="email"
                                autocomplete="email"
                                @focus="focusField = 'email'"
                                @blur="handleBlur('email')"
                                class="login-input peer"
                            />
                            <label
                                for="login-email"
                                class="login-label"
                                :class="{
                                    'login-label--float': data.email || focusField === 'email',
                                }"
                            >
                                Email
                            </label>
                        </div>

                        <div class="relative">
                            <input
                                id="login-password"
                                v-model="data.password"
                                :type="showPassword ? 'text' : 'password'"
                                autocomplete="current-password"
                                @focus="focusField = 'password'"
                                @blur="handleBlur('password')"
                                class="login-input peer pr-14"
                            />
                            <label
                                for="login-password"
                                class="login-label"
                                :class="{
                                    'login-label--float': data.password || focusField === 'password',
                                }"
                            >
                                Password
                            </label>
                            <button
                                type="button"
                                @click="togglePassword"
                                class="absolute right-3 top-1/2 z-[1] -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-primary-600 transition hover:bg-primary-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
                            >
                                {{ showPassword ? 'Hide' : 'Show' }}
                            </button>
                        </div>

                        <button
                            type="submit"
                            class="login-submit w-full rounded-xl py-3.5 text-sm font-semibold tracking-wide text-white shadow-lg shadow-primary-600/25 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                        >
                            Sign in
                        </button>

                        <transition name="alert">
                            <div
                                v-if="showAlert"
                                role="alert"
                                @click="showAlert = false"
                                class="flex cursor-pointer select-none items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 shadow-sm animate-shake"
                            >
                                <span>{{ alertMsg }}</span>
                                <button
                                    type="button"
                                    class="shrink-0 rounded-md p-1 font-bold text-red-600/70 hover:bg-red-100 hover:text-red-800"
                                    @click.stop="showAlert = false"
                                >
                                    ✕
                                </button>
                            </div>
                        </transition>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <LoadingView v-if="isLoading"/>
</template>

<script>

import axios from 'axios';
import LoadingView from './LoadingView.vue';

export default{
    components : {
        LoadingView
    },
    data(){
        return{
            isLoading : false,

            showPassword : false,
            focusField : null,

            data : {
                email : '',
                password : '',
            },

            alertMsg : '',
            showAlert : false,
            alertTimeout : null,
        }
    },
    methods: {
        triggerAlert(message){
            this.alertMsg = message;
            this.showAlert = true;

            if(this.alertTimeout){
                clearTimeout(this.alertTimeout);
            }

            this.alertTimeout = setTimeout(() => {
                this.showAlert = false;
            }, 4000);
        },
        togglePassword(){
            this.showPassword = !this.showPassword;
        },

        handleBlur(field){
            if(!this.data[field]){
                this.focusField = null;
            }
        },

        loginAccount(){

            this.alertMsg = '';
            this.isLoading = true;

            if(this.data.email == ''){
                this.triggerAlert('Please input email');
                this.isLoading = false;
                return;
            }
            else if(this.data.password == ''){
                this.triggerAlert('Please input password');
                this.isLoading = false;
                return;
            }

            axios.post(process.env.VUE_APP_BASE_URL + '/auth/login', this.data)
            .then((res)=>{

                if(res.data.status == 302){

                    this.$store.commit('UPDATE_USER',res.data.user);
                    this.$router.push('/dashboard').then(() => {
                        this.isLoading = false;
                        this.data.email = "";
                        this.data.password = "";
                        this.showPassword = false;
                        this.focusField = null;
                    });

                }
                else if(res.data.status == 404){
                    this.isLoading = false;
                    this.triggerAlert(res.data.message);

                }
            })
            .catch((error) => {
                this.isLoading = false;

                if (error.response && error.response.data && error.response.data.message) {
                    this.triggerAlert(error.response.data.message);
                } else {
                    this.triggerAlert("Something went wrong. Please try again.");
                }
            })

        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700&display=swap');

.login-shell {
    font-family: 'DM Sans', system-ui, sans-serif;
}

.font-display {
    font-family: 'Fraunces', Georgia, serif;
}

/* Deep animated backdrop */
.login-bg {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse 120% 80% at 10% 20%, rgba(40, 139, 168, 0.45) 0%, transparent 50%),
        radial-gradient(ellipse 90% 70% at 90% 10%, rgba(14, 165, 233, 0.22) 0%, transparent 45%),
        radial-gradient(ellipse 70% 50% at 50% 100%, rgba(15, 23, 42, 0.95) 0%, transparent 55%),
        linear-gradient(165deg, #0c1222 0%, #0f172a 40%, #0c4a6e 100%);
    animation: login-bg-shift 18s ease-in-out infinite alternate;
}

@keyframes login-bg-shift {
    0% {
        filter: hue-rotate(0deg) saturate(1);
    }
    100% {
        filter: hue-rotate(-12deg) saturate(1.08);
    }
}

.login-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    opacity: 0.55;
}

.login-blob--a {
    width: 420px;
    height: 420px;
    top: -120px;
    right: -80px;
    background: rgba(40, 139, 168, 0.55);
    animation: login-blob-drift 22s ease-in-out infinite;
}

.login-blob--b {
    width: 320px;
    height: 320px;
    bottom: 10%;
    left: -100px;
    background: rgba(56, 189, 248, 0.35);
    animation: login-blob-drift 18s ease-in-out infinite reverse;
}

.login-blob--c {
    width: 200px;
    height: 200px;
    bottom: 25%;
    right: 15%;
    background: rgba(165, 243, 252, 0.2);
    animation: login-blob-drift 14s ease-in-out infinite;
}

@keyframes login-blob-drift {
    0%, 100% {
        transform: translate(0, 0) scale(1);
    }
    33% {
        transform: translate(24px, -18px) scale(1.05);
    }
    66% {
        transform: translate(-16px, 12px) scale(0.98);
    }
}

.login-grid {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 70%);
    pointer-events: none;
}

.login-title-accent {
    background: linear-gradient(120deg, #67e8f9 0%, #a5f3fc 45%, #e0f2fe 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.login-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(15, 23, 42, 0.35);
    padding: 0.5rem 0.85rem;
    font-size: 0.8125rem;
    font-weight: 500;
    color: rgba(226, 232, 240, 0.95);
    backdrop-filter: blur(8px);
}

/* Floating card stack */
.login-float-wrap {
    position: relative;
    perspective: 1200px;
}

.login-float-ring {
    position: absolute;
    inset: -3px;
    border-radius: 1.75rem;
    background: linear-gradient(135deg, rgba(103, 232, 249, 0.35), rgba(40, 139, 168, 0.25), rgba(165, 243, 252, 0.15));
    opacity: 0.75;
    filter: blur(12px);
    z-index: 0;
    animation: login-float-y 5s ease-in-out infinite;
}

.login-card {
    position: relative;
    z-index: 1;
    border-radius: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.65);
    background: rgba(255, 255, 255, 0.92);
    box-shadow:
        0 4px 6px -1px rgba(15, 23, 42, 0.06),
        0 25px 50px -12px rgba(15, 23, 42, 0.22),
        0 0 0 1px rgba(255, 255, 255, 0.5) inset;
    backdrop-filter: blur(20px);
    padding: 2rem 1.75rem;
    animation: login-float-y 5s ease-in-out infinite;
}

@media (min-width: 640px) {
    .login-card {
        padding: 2.5rem 2.25rem;
    }
}

@keyframes login-float-y {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

.login-input {
    width: 100%;
    height: 3.25rem;
    border-radius: 0.75rem;
    border: 1px solid rgb(226 232 240);
    background: rgb(248 250 252 / 0.9);
    padding: 1.25rem 1rem 0.5rem;
    font-size: 0.9375rem;
    color: rgb(15 23 42);
    transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
}

.login-input:hover {
    border-color: rgb(203 213 225);
}

.login-input:focus {
    outline: none;
    border-color: #288ba8;
    box-shadow: 0 0 0 3px rgba(40, 139, 168, 0.2);
    background: #fff;
}

.login-label {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 0.9375rem;
    color: rgb(100 116 139);
    transition: all 0.2s ease;
}

.login-label--float {
    top: 0.55rem;
    transform: translateY(0);
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: rgb(71 85 105);
}

.login-submit {
    background: linear-gradient(135deg, #288ba8 0%, #1e6b82 100%);
}

.login-submit:hover {
    background: linear-gradient(135deg, #2592b3 0%, #288ba8 100%);
    box-shadow: 0 12px 24px -8px rgba(40, 139, 168, 0.45);
}

.login-submit:active {
    transform: translateY(1px);
}

.alert-enter-active,
.alert-leave-active {
    transition: all 0.3s ease;
}

.alert-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.alert-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-5px); }
    40% { transform: translateX(5px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
}

.animate-shake {
    animation: shake 0.4s ease;
}
</style>
