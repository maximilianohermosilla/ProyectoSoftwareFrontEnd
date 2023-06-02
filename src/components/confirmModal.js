export default function RenderConfirmModal(title, text){
    return `
    <div class="modal fade in" id="confirmModal" role="dialog" tabindex="-1" aria-labelledby="confirmModalTitle">
    <div class="modal-dialog">
      <div class="modal-content confirm-dialog">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="confirmModalTitle"><strong>${title}</strong></h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body flex-center">
          <span id="confirmModalText">${text}</span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-success" id="confirmModalButton" data-bs-dismiss="modal">Confirmar</button>
        </div>
      </div>
    </div>
  </div>  
  <div class="container-fluid" id="popUpContainer">
    <!-- popup.js -->
  </div> 
    `;
}