const appendButton = document.querySelector('.button');
const value = document.querySelector('.input_text');
const comment = document.querySelector('.input_comment');
const important = document.querySelector('.important');
const listBody = document.querySelector('.list');

appendButton.addEventListener('click', (event) =>{
   if (event.target.dataset.send) {
      if (value.value == false || comment.value == false){
         OpenErrorModal()
      } else{
      _createListItem(addItemToList())
      };
   };
});
const getArray = () =>{
   const array = localStorage.getItem('todo');
   let todo = JSON.parse(array)
   if (todo === null){
      return []
   } else return todo
};

let todo = getArray();

const setArray = () => {
   localStorage.setItem('todo', JSON.stringify(todo))
}

{/*  */}
let temp = 0;

const createNodeListItem = (object) => {
   const createDiv = document.createElement('div');
   if (object.important === true){
      createDiv.classList = 'list_item important'
      } else {
         createDiv.classList = 'list_item'
      };
   if (object.complited === true) {
      createDiv.style.background = 'rgba(111, 252, 123, 0.7)';
      createDiv.style.textDecoration = 'line-through';
   } else {
      createDiv.style.background = 'none'
      };
   createDiv.id = object.id;
   createDiv.insertAdjacentHTML('beforeend',`
      <div class="list_content">
         <div class="type_text">${object.value|| ''} </div>
         <div class="list_text">${object.comment || ''}</div>
      </div>
      <div class="list_buttons">
         <div class="edit_buttons" data-edit="true">редактировать</div>
         <div class="edit_buttons_danger" data-remove="true">удалить</div>
      </div>
`);
   listBody.insertBefore(createDiv, listBody.firstChild)
   return createDiv
};
class ListItem {
   
   constructor(object) {
      this.$render = createNodeListItem(object),
      this.value = object.value,
      this.comment = object.comment,
      this.id = object.id,
      this.important = object.important,
      this.complited = object.complited,
      this.$render.addEventListener('click', event =>{
         const edit = event.target.dataset.edit;
         if (edit === 'true') {
            this.#edit()
         };
         const remove = event.target.dataset.remove;
         if (remove === 'true'){
            this.#remove()
         };
      });
   };
   #edit() {
      createEditModal(this).then((content) => {
         this.#appendContent(content)
         setArray();
      });
   };
   #remove() {
      createDeletedModal(this).then(() =>{
         this.$render.parentNode.removeChild(this.$render) 
         const index = todo.findIndex((object) =>{
            return object.id === this.id
         });
         todo.splice(index,1);
         setArray();
      }); 
   };
   #appendContent(content) {
      const addHtml = this.$render.querySelector('.list_text');
      this.comment = content.value;
      addHtml.innerHTML = content.value;
      this.important = content.important;

      if (content.important === true) {
         this.$render.classList = 'list_item important'
      } else {
         this.$render.classList = 'list_item'
      };
      
      if(content.complited === true) {
         this.complited = true
         this.$render.style.background = 'rgba(111, 252, 123, 0.7)'
         this.$render.style.textDecoration = 'line-through';
      } else {
         this.complited = false
         this.$render.style.background = 'none'
         this.$render.style.textDecoration = 'none'
      };

      const index = todo.findIndex((object) =>{
         return object.id === this.id
      });
      todo[index].important = content.important;
      todo[index].comment = content.value;
      todo[index].complited = content.complited;
      setArray()
    }
};

const listCreate = () => {
   let i = 0;
   while (i < todo.length) {
      _createListItem(todo[i])
      i = i + 1;
      }
};

const _createListItem = (object) =>{
   _listitem = new ListItem ({
      id: object.id ,
      value: object.value,
      comment: object.comment,
      important: object.important,
      complited: object.complited
   })
   return _listitem;
};

const addItemToList = () => {
   const idCreate = () => {
      if (todo.length > 0) {
         return todo[todo.length-1].id + 1
      } else {
         return 0
      }
   };

   const object = {
      id: idCreate(),
      value: value.value,
      comment: comment.value,
   };

   if (important.checked === true){
      object.important = true;
   } else {
      object.important = false;
   };
   object.complited = false
   todo.push(object);
   setArray();
   value.value = '';
   comment.value = '';
   return object
};

listCreate()