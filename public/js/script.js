function getAllProducts() {
    var request = new XMLHttpRequest();

    request.open('GET', '/api/products/all', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);

            addEventListeners(data);
            getRandomProduct(data);
            preloadImages(data);

        }
    };

    request.send();
}

function preloadImages(data) {

    $(data).each(function(){
        $('<img/>')[0].src = this.image;
    });

}

function getRandomProduct(data) {

    var numberOfProducts = data.length;
    var randomNumber = Math.floor(Math.random() * numberOfProducts) + 1;

    displayProduct(data[randomNumber]);

}

function displayProduct(data) {
    var imageNode = document.querySelector(".product-image");
    var designerNode = document.querySelector(".designer-name");
    var likesNode = document.querySelector(".likes-number");
    var peopleOrPerson = document.querySelector(".people-person");
    var wantOrWants = document.querySelector(".want-wants");

    imageNode.setAttribute("src", data.image);

    imageNode.onload = function () {
        imageNode.setAttribute("id", data.key);
        designerNode.innerHTML = data.designer;
        likesNode.innerHTML = data.likes;
        peopleOrPerson.innerHTML = data.likes == 1 ? "person" : "people";
        wantOrWants.innerHTML = data.likes == 1 ? "wants" : "want";
    };

}

function addEventListeners(data) {
    var nextButton = document.querySelector(".next-button");
    var likeButton = document.querySelector(".like-button");

    var productId = document.querySelector(".product-image").getAttribute("id");

    nextButton.addEventListener("click", function() {
        getRandomProduct(data);
        increaseSkips(productId);
    });

    likeButton.addEventListener("click", function() {
        getRandomProduct(data);
        increaseLikes(productId);
    });
}

function increaseLikes(productId) {
    var request = new XMLHttpRequest();

    request.open('GET', '/api/products/' + productId + "/like", true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);

        }
    };

    request.send();
}

function increaseSkips(productId) {
    var request = new XMLHttpRequest();

    request.open('GET', '/api/products/' + productId + "/skip", true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);

        }
    };

    request.send();
}

getAllProducts();
