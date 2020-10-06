const $ = {};

const createModalButtons = (buttons = []) => {
   if (buttons.length === 0){
      return document.createElement('div')
   }
   const wrap = document.createElement('div')
   buttons.forEach(button => {
      const $button = document.createElement('button')
      $button.textContent = button.text
      $button.onclick = button.handler
      $button.classList.add(button.class)
      wrap.appendChild($button)
   })
   wrap.classList.add('modal-footer')

   return wrap
}


const createEditModal = (object) => {
return new Promise ((resolve, reject) => {
      object.closable = false;
      object.deleted = false;
      object.buttons = [
            {text: 'применить',
            class: 'edit_buttons',
            handler() {
               const inputChangeValue = document.querySelector('.change-text')
               const content = inputChangeValue.value
               editModal.close()
               setTimeout(() => {
                  editModal.remove() 
               }, 300);
               resolve(content)
            }
         },
            {text: 'отменить',
            class: 'edit_buttons_danger', 
            handler() {
               editModal.close()
               setTimeout(() => {
                  editModal.remove() 
               }, 300);
            }
         }
      ]
      const editModal = $.modal(object)
      setTimeout(() => {
         editModal.open()
      }, 100);
   })
}

const createDeletedModal = (object) => {
   return new Promise ((resolve, reject) => {
         object.closable = false,
         object.deleted = true;
         object.buttons = [
               {text: 'удалить',
               class: 'edit_buttons_danger',
               handler() {
                  deleteModal.close()
                  setTimeout(() => {
                     deleteModal.remove() 
                  }, 300);
                  resolve()
               }
            },
               {text: 'отменить',
               class: 'edit_buttons', 
               handler() {
                  deleteModal.close()
                  setTimeout(() => {
                     deleteModal.remove() 
                  }, 300);
               }
            }
         ]
         const deleteModal = $.modal(object)
         setTimeout(() => {
            deleteModal.open()
         }, 100);
      })
   }



const _createModal = (options) => {
   const modal = document.createElement('div')
   modal.classList.add('modal')
   modal.insertAdjacentHTML('afterbegin', `
         <div class="modal_background" data-close="true">
               <div class="modal_content">
                  <div class="modal_head">
                  <div class="modal_title">${options.deleted === true ? 'Вы собираетесь удалить задачу:' : 'Редактирование задачи'} "${options.value || 'окно'}"</div>
                     ${ options.closable ? `<div class="modal_exit" data-close="true">&times;</div>` : ''}
                     </div>
                  <div class="modal_text">оно содержит значение : <span>${options.comment}</span>
                  ${!options.deleted === true ? `<div>Введите новое значение: <input type="text" class="change-text" id="change-text"></div>` : ''}
                  </div>
               </div> 
         </div>
   `)
   const footer = createModalButtons(options.buttons)
   const modalbody = modal.querySelector('.modal_text')
   modalbody.parentNode.insertBefore(footer,modalbody.nextSibling)
   document.body.appendChild(modal)
   return modal
}


$.modal = function (options) {
   const $modal = _createModal(options) 

   const _modal = {
      open() {
         $modal.classList.add('open')
      },
      close() {
            $modal.classList.add('close');
            $modal.classList.remove('open');
      },
      remove() {
            $modal.parentNode.removeChild($modal)
      }
   }

   $modal.addEventListener('click', event => {
      if (event.target.dataset.close) {
         _modal.close()
         setTimeout(() => {
            _modal.remove()
         }, 300);
      }
   })

   return _modal
}

