
var $ = require('jquery');
import 'jquery-ui';
import 'bootstrap'
import '../styles/sass/styles.scss';
import * as cardService from './service/getCards';

$( document ).ready(function() {
    
    cardService.getCards();
    
});