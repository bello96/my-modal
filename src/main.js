import { createApp } from 'vue'
import App from './App.vue'
import Store from './store'

import Antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(Antd).use(ElementPlus).use(Store).mount('#app')

