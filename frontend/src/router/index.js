import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';

const routes = [
  {
    path: '/osms',
    meta: { title: 'Online Scholarship Management System', name: 'Index', parent: true },
    component: () => import('../components/Layouts/IndexLayout.vue'),
    children: [
      {
        path: 'login',
        alias: '/',
        component: () => import('../views/LoginView.vue'),
        meta: { title: 'Login', ParentName: 'Index'}
      },
      // {
      //   path: '/al',
      //   alias: '/al',
      //   component: () => import('../views/AdminLoginView.vue'),
      //   meta: { title: 'Admin Login', ParentName: 'Index'}
      // },
      // {
      //   path: '/signup',
      //   alias: '/signup',
      //   component: () => import('../views/SignUpView.vue'),
      //   meta: { title: 'Sign up', ParentName: 'Index'}
      // }
    ]
  },
  {
    path: '/home',
    meta: { title: 'Home', name: 'Home', parent: true },
    component: () => import('../components/Layouts/DashboardLayout.vue'),
    children: [
      {
        path: '/dashboard',
        alias: '/dashboard',
        component: () => import('../views/DashboardView.vue'),
        meta: { title: 'Dashboard', ParentName: 'Home'}
      },
      {
        path: '/billing_record',
        alias: '/billing_record',
        component: () => import('../views/BillingRecordView.vue'),
        meta: { title: 'Billing Record', ParentName: 'Home'}
      },
      {
        path: '/training_centers',
        alias: '/training_centers',
        component: () => import('../views/TrainingCentersView.vue'),
        meta: { title: 'Training Centers', ParentName: 'Home'}
      },
      {
        path: '/qualification',
        alias: '/qualification',
        component: () => import('../views/QualificationView.vue'),
        meta: { title: 'Qualification', ParentName: 'Home'}
      },
      {
        path: '/scholarship',
        alias: '/scholarship',
        component: () => import('../views/ScholarshipView.vue'),
        meta: { title: 'Scholarship', ParentName: 'Home'}
      },
      {
        path: '/reports',
        alias: '/reports',
        component: () => import('../views/ReportsView.vue'),
        meta: { title: 'Reports', ParentName: 'Home'}
      },
      {
        path: '/analytics',
        alias: '/analytics',
        component: () => import('../views/AnalyticsView.vue'),
        meta: { title: 'Analytics', ParentName: 'Home'}
      },
      {
        path: '/billings/:isWorkback',
        alias: '/billings/:isWorkback',
        component: () => import('../views/TCBillingsView.vue'),
        meta: { title: 'Billings', ParentName: 'Home'}
      },
      {
        path: '/accounts/:type',
        alias: '/accounts/:type',
        component: () => import('../views/AccountsView.vue'),
        meta: { title: 'Accounts', ParentName: 'Home'}
      },
      {
        path: '/training_center_staffs',
        alias: '/training_center_staffs',
        component: () => import('../views/TCStaffsView.vue'),
        meta: { title: 'Training Center Staffs', ParentName: 'Home'}
      },
      {
        path: '/user_menu',
        alias: '/user_menu',
        component: () => import('../views/UtilityUserMenuView.vue'),
        meta: { title: 'Utility User Menu', ParentName: 'Home'}
      },
      {
        path: '/assign_user_menu',
        alias: '/assign_user_menu',
        component: () => import('../views/AssignUserTypeMenuView.vue'),
        meta: { title: 'Assign User Type', ParentName: 'Home'}
      },
      {
        path: '/billing_types',
        alias: '/billing_types',
        component: () => import('../views/BillingTypesView.vue'),
        meta: { title: 'Billing Types', ParentName: 'Home'}
      },
      {
        path: '/profile',
        alias: '/profile',
        component: () => import('../views/ProfileView.vue'),
        meta: { title: 'My Profile', ParentName: 'Home'}
      },
      {
        path: '/categories',
        alias: '/categories',
        component: () => import('../views/CategoryView.vue'),
        meta: { title: 'Categories', ParentName: 'Home'}
      },
      {
        path: '/security',
        alias: '/security',
        component: () => import('../views/SecurityView.vue'),
        meta: { title: 'Security', ParentName: 'Home'}
      },
      {
        path: '/notifications',
        alias: '/notifications',
        component: () => import('../views/NotificationsView.vue'),
        meta: { title: 'Notifications', ParentName: 'Home'}
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let role = store.state.user;
  if (to.matched.some(record => record.meta.Index)) {
      if (!role) {
          next({ path: '/osms'})
      } else {
        document.title = "OSMS - " + to.meta.title;
        next()
      }
  }
  else {
    document.title = "OSMS - " + to.meta.title;
      next()
  }
})

router.beforeEach((to, from, next) => {
  store.commit('SET_LOADING', true);
  next();
});

router.afterEach(() => {
  store.commit('SET_LOADING', false);
});

export default router
