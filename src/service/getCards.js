var $ = require('jquery');
import {addCard} from '../controller/card'

export var cardListData = {};
export function getCards(){

    $.get("http://localhost:3000/lists", function(data, status){
        
        let myLists = data;
        $('#cardList').empty();
        for (let index = 0; index < myLists.length; index++) {
            const card = myLists[index];
            cardListData[card.id] = card;
            addCard(card);
            
        }
    });

}