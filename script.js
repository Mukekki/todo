const appendButton = document.querySelector('.button')
const value = document.querySelector('.input_text')
const comment = document.querySelector('.input_comment')
const important = document.querySelector('.important')
const listBody = document.querySelector('.list')

appendButton.addEventListener('click', (event) =>{
   if (event.target.dataset.send) {
      if (value.value == false || comment.value == false){
         console.error('huinya')
      } else{
      _createListItem(addItemToList())
      }
   };
});

let todo = [
   {id: 0 , value: 'попить пива' , comment: 'ну надо бы попить пива1' , important: true},
   {id: 1 , value: 'не попить пива', comment: 'ну надо бы попить пива2', important: true},
   {id: 2 , value: 'попить пива', comment: 'ну надо бы попить пива3', important: false}
];

let temp = 0;

const createNodeListItem = (object) => {
   const createDiv = document.createElement('div');
   createDiv.classList = 'list_item';
   createDiv.id = object.id;
   createDiv.insertAdjacentHTML('beforeend',`
            <div class="list_content">
               <div class="type_text">${object.value|| 'null'} </div>
               <div class="list_text">${object.comment || 'null'}</div>
            </div>
            <div class="list_buttons">
               <div class="edit_buttons" data-edit="true">редактировать</div>
               <div class="edit_buttons_danger" data-remove="true">удалить</div>
               <div class="done"><input type="checkbox">выполнено</div>
               <div class="list_important"><input type="checkbox" ${object.important ? 'checked' : ''}>Важно!</div>
            </div>
            `);
   listBody.appendChild(createDiv);
   return createDiv
}

class ListItem {
   
   constructor(object) {
      this.$render = createNodeListItem(object)
      // this.$element = document.getElementById(object.id)
      this.value = object.value;
      this.comment = object.comment;
      this.id = object.id
      this.$render.addEventListener('click', event =>{
         const edit = event.target.dataset.edit;
         if (edit === 'true') {
            this.#edit()
         }
         const remove = event.target.dataset.remove;
         if (remove === 'true'){
            this.#remove()
         }
      });
   };
   #edit() {
      createEditModal(this).then((content) => {
         this.appendContent(content)
         
      })
   }
   #remove() {
      createDeletedModal(this).then(() =>{
         this.$render.parentNode.removeChild(this.$render) 
         const index = todo.findIndex((object) =>{
            return object.id === this.id
         })
         todo.splice(index,1)
      }) 
   }
   appendContent(content) {
      const addHtml = this.$render.querySelector('.list_text')
      this.comment = content;
      addHtml.innerHTML = content;
      const index = todo.findIndex((object) =>{
         return object.id === this.id
      })
      todo[index].comment = content;
    }
}

const listCreate = () => {
   let i = 0;
   while (i < todo.length) {
      _createListItem(todo[i])
      i = i + 1;
      }
    
}

const _createListItem = (object) =>{
   _listitem = new ListItem ({
      id: object.id ,
      value: object.value,
      comment: object.comment,
      important: object.important
   })
   return _listitem;
}

const addItemToList = () => {
   const object = {
      id: todo[todo.length-1].id + 1 || 0,
      value: value.value,
      comment: comment.value,
   }

   if (important.checked === true){
      object.important = true;
   } else {
      object.important = false;
   }
   todo.push(object)
   return object
};


listCreate()
