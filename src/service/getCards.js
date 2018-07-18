var $ = require('jquery');
import {addCard, cardsData} from '../controller/card'

export var cardListData = {};
export var totalCards = 0;
export function getCards(){

    $.get("http://localhost:3000/lists", function(data, status){
        
        let myLists = data;
        $('#cardList').empty();
        totalCards = myLists.length;
        myLists.sort(function (a, b) {
            return a.card.order - b.card.order;
          });
        for (let index = 0; index < myLists.length; index++) {
            const card = myLists[index];
            cardListData[card.id] = card;
            addCard(card);
            cardsData[card.id] = card;
        }
    });

}