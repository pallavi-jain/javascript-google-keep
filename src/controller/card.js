var $ = require('jquery');
import { openEditModal, openConfirmation } from './toDoListModal';

export function addCard(cardData) {

    var cardId = cardData.id;

    var cardHolder = document.getElementById('cardList');
    var card = document.createElement('div');
    var id = 'card_' + cardId;
    card.setAttribute('id', cardId);
    card.className = 'card';
    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.setAttribute('id', 'card-body_' + cardId);
    card.appendChild(cardBody);
    var editId = 'card-edit_' + cardId;
    var deleteId = 'card-delete_' + cardId;
    var headerStr = `<div class="container"><div class="row">
    <div class="col-md-9"><h5>${cardData.card.name}</h5></div>
    <div class="col-md-3">
    <a role="button" class="btn pl-0 pr-0" aria-label="edit" id="${editId}"><i class="far fa-edit"></i></a>
    <a role="button" class="btn pl-0 pr-0" aria-label="delete" id="${deleteId}"><i class="fas fa-trash-alt"></i></a>
    </div></div></div>`;
    $(cardBody).append(headerStr);

    var todoList = document.createElement('ul');
    cardBody.appendChild(todoList);
    var task = cardData.card.data;

    for (let index = 0; index < task.length; index++) {
        const element = task[index];
        var listitem = document.createElement('li');
        var checkLabel = document.createElement('label');
        var checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.className = 'form-check-input';
        checkbox.checked = element.checked;

        checkLabel.appendChild(checkbox);
        checkLabel.appendChild(document.createTextNode(element.taskName));
        listitem.appendChild(checkLabel);
        todoList.appendChild(listitem);
    }
    var divFooter = document.createElement('div');
    divFooter.className = 'card-footer text-muted';
    var footerText = cardData.card.edited ? 'Updated on ' : 'Created on '
    var date = new Date(cardData.card.date);
    var dateString = date.toDateString() + ' ' + date.toLocaleTimeString();
    divFooter.appendChild(document.createTextNode(footerText + dateString));
    card.appendChild(divFooter);
    cardHolder.appendChild(card);


    $(document).on("click", "a#" + editId, function (e) {
        var editId = $(this).attr('id');
        var index = editId.split('_')[1];
        openEditModal(index);
    });

    $(document).on("click", "a#" + deleteId, function (e) {
        var editId = $(this).attr('id');
        var index = deleteId.split('_')[1];
        openConfirmation(index);
    });
}




