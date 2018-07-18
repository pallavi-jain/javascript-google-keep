
var $ = require('jquery');


import 'bootstrap'
import '../styles/sass/styles.scss';

import {getCards, cardListData} from './service/getCards';
import {onAddBtnClick, onSaveNewCardBtnClick} from './controller/toDoListModal';


$( document ).ready(function() {
    
    getCards();
    
});