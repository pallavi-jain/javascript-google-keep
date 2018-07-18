var $ = require('jquery');
require('jquery-ui');
import   * as todoListModalService from '../service/toDoListModalService';
import * as getCardsService from '../service/getCards'

var addItemBtn = document.getElementById('addNewItem');
addItemBtn.addEventListener('click', onAddBtnClick);
var editModeId;
var editMode = false;
let timeStampObj = {};
export function onAddBtnClick() {

    var itemIndex = $("ul#taskList-ul").children().length + 1;
    var taskItem = $('#addItem').val().trim();
    var task_li_str;
    if (!editMode) {
        let removeItem = 'removeBtn_' + itemIndex;
        let taskId = 'task_' + itemIndex;
        task_li_str = `<li class="mb-2 ml-4" id="li_${itemIndex}">
        <div id="${taskId}" class="task"><span>${taskItem}</span></div><button id="${removeItem}" type="button" class="btn btn-primary btn-sm deleteItem"> X </button>
    </li>`;
    } else {
        let liId = 'li_' + editModeId + '_' + itemIndex;
        let inputId = 'input_' + editModeId + '_' + itemIndex;
        let checkId = 'check_' + editModeId + '_' + itemIndex;
        let removeItem = 'removeBtn_' + editModeId + '_' + itemIndex;
        let taskItem = $('#addItem').val().trim();
        task_li_str = `<li class="mb-2 ml-4" id="${liId}"><div class="row"><div class="col-md-11">
        <input type="checkbox" id="${checkId}" class="form-check-input mt-3 checkboxPopup">
        <input id="${inputId}" class="form-control" type="text" value="${taskItem}"></div><div class="col-md-1 pl-0"><button id="${removeItem}" type="button" class="btn btn-primary btn-sm deleteItem"> X </button>
</div></div></li>`
    }


    $('ul#taskList-ul').append(task_li_str);
    $('#addListCardModal').modal('handleUpdate');
    $('#addItem').val('');
}

export function onSaveNewCardBtnClick() {
    var cardInfo = {};
    cardInfo.date = Date.now();

    cardInfo.name = $('#todoListTitle').val().trim();
    cardInfo.data = [];

    if (!editMode) {
        $("ul#taskList-ul li").each(function (index) {
            let taskObj = {};
            taskObj.checked = false;
            let liId = $(this).attr('id');
            let splitStr = liId.split('_');
            splitStr.shift();
            let substr = splitStr.join('_');
            let taskId = 'task_' + substr;
            taskObj.taskName = String($('#' + taskId + ' span').text()).trim();
            cardInfo.data.push(taskObj);
        });
    } else {
        $("ul#taskList-ul li").each(function (index) {
            let taskObj = {};
            let liId = $(this).attr('id');
            let splitStr = liId.split('_');
            splitStr.shift();
            let id_substr = splitStr.join('_');
            let checkId = 'check_' + id_substr;
            let inputId = 'input_' + id_substr;
            taskObj.checked = $('#' + checkId).is(":checked");
            taskObj.date = taskObj.checked  ? timeStampObj[checkId]  : '';
            taskObj.taskName = String($('#' + inputId).val()).trim();
            cardInfo.data.push(taskObj);
            cardInfo.edited = true;
        });
    }

    todoListModalService.addCardData(cardInfo, onDataSave, editModeId);
}

export function openEditModal(index) {
    editMode = true;
    editModeId = index;
    let cardInfo = getCardsService.cardListData[index];
    $('#todoListTitle').val(cardInfo.card.name);
    $("ul#taskList-ul").empty();

    for (let i = 0; i < cardInfo.card.data.length; i++) {
        const element = cardInfo.card.data[i];
        var liId = 'li_' + index + '_' + i;
        var inputId = 'input_' + index + '_' + i;
        var checkId = 'check_' + index + '_' + i;
        var isChecked = element.checked ? 'checked' : '';
        var removeItem = 'removeBtn_' + index + '_' + i;
        var task_li_str = `<li class="mb-2 ml-4" id="${liId}"><div class="row"><div class="col-md-11">
        <input type="checkbox" id="${checkId}" ${isChecked} class="form-check-input mt-3 checkboxPopup">
        <input id="${inputId}" class="form-control" type="text"  value="${element.taskName}"></div><div class="col-md-1 pl-0">
        <button id="${removeItem}" type="button" class="btn btn-primary btn-sm deleteItem"> X </button></div></div>
    </li>`
        $('ul#taskList-ul').append(task_li_str);
    }

    $('#addListCardModal').modal('handleUpdate');
    $('#addListCardModal').modal('show');
}

var deleteIndex;
export function openConfirmation(index) {
    deleteIndex = index;
    $("#deleteConfirmationModal").modal('show');
}

var deletebtn = document.getElementById('deleteConfirmbtn');
deletebtn.addEventListener('click', onDeleteClick);

function onDeleteClick(e) {
    todoListModalService.deleteCardData(onDataDelete, deleteIndex);
}

function onDataDelete() {
    $('#deleteConfirmationModal').modal('hide');
    getCardsService.getCards();
}

function onDataSave() {
    $('#addListCardModal').modal('hide');
    getCardsService.getCards();
}

$('#addListCardModal').on('hidden.bs.modal', function (e) {
    // do something...
    editMode = false;
    editModeId = undefined;
    deleteIndex = undefined;
    timeStampObj = {};
    $('#taskList-ul').empty();
    $('#todoListTitle').val('');
});

var saveNewCardBtn = document.getElementById('saveCardBtn');
saveNewCardBtn.addEventListener('click', onSaveNewCardBtnClick);

$(document).on("click", ".deleteItem", function (e) {
    let deleteItemId = $(e.currentTarget).attr('id');
    let splitStr = deleteItemId.split('_');
    splitStr.shift();
    let substr = splitStr.join('_');
    let liId = 'li_' + substr;
    $('#' + liId).remove();
});

$(document).on("change", ".checkboxPopup", function (e) {
     
    timeStampObj[$(e.currentTarget).attr('id')] = Date.now();
});
