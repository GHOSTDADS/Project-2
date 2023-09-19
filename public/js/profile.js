function executeRoute(x) {
    // Simulate route being successful
    if (true) {  // replace 'true' with your route success condition
      displaySuccessMessage(x);
    } else {
      // Handle failure
    }
}

function executeDelete(x) {
  // Simulate route being successful
  if (true) {  // replace 'true' with your route success condition
    displayDeleteMessage(x);
  } else {
    // Handle failure
  }
}


function displayDeleteMessage(message) {
  const modal = document.getElementById("delete-modal");
  const modalMessage = document.getElementById("delete-modal-message");
  const closeModal = modal.querySelector(".modal-close");
  
  modalMessage.textContent = message;
  modal.classList.add("is-active");
  
  closeModal.addEventListener("click", function() {
    modal.classList.remove("is-active");
    //takes you back to homepage after making a cocktail
    document.location.replace('/profile');
  });
}




  function displaySuccessMessage(message) {
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    const closeModal = modal.querySelector(".modal-close");
  
    modalMessage.textContent = message;
    modal.classList.add("is-active");
  
    closeModal.addEventListener("click", function() {
      modal.classList.remove("is-active");
      //takes you back to homepage after making a cocktail
      document.location.replace('/');
    });
  }
  
document.addEventListener('DOMContentLoaded', function () {
    const cocktailSubmit = document.getElementById('cocktail-form');
    const ingredientForm = document.getElementById('ingredients');
    const addIngredientButton = document.getElementById('addIngredient');
    // const deleteCocktailBtn = document.querySelectorAll('.btn-danger');
    let ingredientCounter = 1;

    //event listner for adding more ingredient slots on the form
    addIngredientButton.addEventListener('click', function () {
        if(ingredientCounter <= 9){
        ingredientCounter++;
        const newInput = document.createElement('input');
        const newDiv = document.createElement('div');
        const newControl = document.createElement('div');
        newDiv.classList.add('field');
        newControl.classList.add('control');
        newInput.classList.add('input');
        newInput.type = 'text';
        newInput.name = `Ingredient${ingredientCounter}`;
        newInput.placeholder = `Ingredient ${ingredientCounter}`;
        newControl.appendChild(newInput);
        newDiv.appendChild(newControl);
        ingredientForm.appendChild(newDiv);
        }
    });

    //event listner for deleting cocktails youve made.
    document.addEventListener('click', function (e) {
      if (e.target.closest(".btn-danger")){
        let target = e.target.closest('.btn-danger');
        let targetID = target.dataset.id;
        console.log('/api/cocktails/'+targetID);


        fetch(('/api/cocktails/'+targetID), {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            // executeDelete( "COCKTAIL DEBETED");
            
        var pageloader = document.getElementById('delete-loader');
        if (pageloader) {
          pageloader.classList.add('is-active');
          var pageloaderTimeout = setTimeout( function() {
          pageloader.classList.remove('is-active');
          clearTimeout(pageloaderTimeout);
          document.location.replace('/profile');
        }, 3000 );
        }
        })
        .catch(error => {
            console.error('Error:', error);
            executeDelete( "OH NO COCKTAIL couldnt be debeted: \n" + error);
        });
      }
 

    });

    //event listner for adding cocktails to database.
    cocktailSubmit.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(cocktailSubmit);
        const ingredients = {};
        for (const [key, value] of formData.entries()) {
            ingredients[key] = value;
        }
        // Send ingredients data to fetch api/cocktails POST route to add to database.
        fetch('/api/cocktails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredients),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            var pageloader = document.getElementById('success-loader');
            if (pageloader) {
              pageloader.classList.add('is-active');
              var pageloaderTimeout = setTimeout( function() {
              pageloader.classList.remove('is-active');
              clearTimeout(pageloaderTimeout);
              document.location.replace('/');
            }, 3000 );
            }
        })
        .catch(error => {
            console.error('Error:', error);
            executeDelete( "OH NO COCKTAIL couldnt be created: \n" + error);
        });
    });
});

