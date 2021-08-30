import { createApp } from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue'
import ElementPlus from 'element-plus'

import "ant-design-vue/dist/antd.css";
import 'element-plus/dist/index.css'

createApp(App).use(Antd).use(ElementPlus).mount('#app')

