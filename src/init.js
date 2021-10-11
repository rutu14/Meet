import '@/plugins';
import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import {getDate,getDay} from '@/filter/date';
import Loading from '@/components/utils/Loading';
import Alert from '@/components/utils/Alert';

import '@/services/configureAxios';
import titleMixin from './mixins/titlemixins'

Vue.mixin( titleMixin );
Vue.filter( 'date' , getDate );
Vue.filter( 'day' , getDay );

Vue.component( 'Loading', Loading );
Vue.component( 'Alert', Alert );
