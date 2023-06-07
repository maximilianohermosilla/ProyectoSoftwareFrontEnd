export default function RenderPopUp(title, text){
    return `
    <div class="modal fade in" id="popupModal" role="dialog" tabindex="-1" aria-labelledby="popupTitle" data-show="true">
    <div class="modal-dialog">
      <div class="modal-content confirm-dialog">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="popupTitle"><h3>${title}</h3></h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body flex-center">
          <br>
          <span id="popupText">${text}</span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" id="popupButton" data-bs-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div>  
    `;
}