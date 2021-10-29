var $addEntry = document.querySelector('.add-entry');
$addEntry.addEventListener('click', showModal);

var $overlay = document.querySelector('.overlay');
var $modalBox = document.querySelector('.modal-box');
function showModal(event) {
  $overlay.classList.remove('hidden');

}
