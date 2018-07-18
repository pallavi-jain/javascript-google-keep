var $ = require('jquery');
require('jquery-ui');
require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/disable-selection');
import 'bootstrap'
import '../styles/sass/styles.scss';
import * as cardService from './service/getCards';

$( document ).ready(function() {
    
    cardService.getCards();
    
});
$( function() {
    $( "#taskList-ul" ).sortable();
    $( "#taskList-ul" ).disableSelection();

    $( "#cardList" ).sortable({});
    $( "#cardList" ).disableSelection();
  } );


