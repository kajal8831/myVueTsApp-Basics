import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(
    createAuth0({
      domain: "dev-xewlyc3gxt6ydpq1.us.auth0.com",
      clientId: "gzIwCMBEvZ35doSd98AstNaiRn3kwklV",
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  );

app.use(createPinia())
app.use(router)

app.mount('#app')
