//ADD new To do 
const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');

const lisItem = document.querySelector('.list-group-item');
const popup = document.querySelector('.popup');
const gPop = document.querySelector('.popup-wrapper');
const btn = document.querySelector('.btn');
const search = document.querySelector('.search input');
var input1 = document.getElementById("input");
const k = input1.value
var Delete = document.querySelectorAll(".delete")
gPop.style.display = "none";
let todo;
var html = `
<li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${todo}</span>
          <i class="fas fa-trash delete"></i>
</li>
`;


/***************reusable function********************/

/* Function pour l'alert et le popup qui va etre afficher (time control)*/
function start(duree) {
   var o = document.getElementById("sp");
   if (duree > 0) {
      o.innerHTML = duree;
      gPop.style.display = "block";
      setTimeout("start(" + duree + " -1)", 1000);
   } else {
      alert("enter a valid to do");
      o.innerHTML = "Au revoir";
      gPop.style.display = "none";
      popup.style.visibility = "hidden";

   }
};


/* Function Creation dynamique du POPUP */

function create() {
   const div = document.createElement('div');
   div.classList.add('popup-close');
   div.setAttribute('id', 'closing');
   const text = document.createTextNode('X');
   div.appendChild(text);
   popup.append(div);
   const div2 = document.createElement('div');
   div2.classList.add('popup-content');
   const html = `
   <span id="sp">1</span>
   <h2>Fill the Input</h2>
   <p>Don't forget</p>
   <a href="#">Return</a>`;
   div2.innerHTML = html;
   popup.append(div2);

}

/* Function generation dynamique des TODOS */

function generateTemp(todo) {
   var html = `
   <li class="list-group-item d-flex justify-content-between align-items-center">
             <span>${todo}</span>
             <i class="fas fa-trash delete" onclick="Cclick(this)" ></i>
   </li>
   `;

   const position = "beforeend"
   list.insertAdjacentHTML(position, html);

};



/* function pour controller l'evenement et pour ne pas etre repeté à chaque clique */
function onetime(node, type, callback) {

   node.addEventListener(type, function (e) {

      e.target.removeEventListener(e.type, arguments.callee);

      return callback(e);
   });
}

onetime(gPop, 'click', handler);

function handler(e) {

   if (e.target.id = 'closing') {

      gPop.style.display = "none";
   }
}

/***************Fin reusable function********************/




/************* Adding TO DO**************/

//Eventlistner Add TODOS
btn.addEventListener('click', e => {


   if (!input1.value) {
      alert("please enter a valid todo ")


   } else {
      generateTemp(input1.value)
   }

   input1.value = ""



});

/************* Fin Adding TO DO**************/



/*************Deleting  TO DO**************/
function Cclick(OK) {

   OK.parentNode.remove()



}

/************* Fin Deleting  TO DO**************/




/************************************* SEARCH ITEM********************************************/
//filtering Todos :

//we will apply a class to the Todos that dont match and the that class will

// have keyup event 


const retrieve = (term) => {
   //console.log(list.children); //html collection
   Array.from(list.children)
      .filter((item) => {
         return !item.textContent.includes(term);
      })
      .forEach((item) => {
         return item.classList.add("filtre");
      });

   Array.from(list.children)
      .filter((item) => {
         return item.textContent.includes(term);
      })
      .forEach((item) => {
         return item.classList.remove("filtre");
      });
};

search.addEventListener("keyup", () => {
   const term = search.value.trim();
   retrieve(term);
});

/*************************************Fin SEARCH ITEM********************************************/