function getRandomProduct() {
    var request = new XMLHttpRequest();

    request.open('GET', '/api/products/random', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);

            displayProduct(data);

        }
    };

    request.send();
}

function displayProduct(data) {
    var imageNode = document.querySelector(".product-image");
    var designerNode = document.querySelector(".designer-name");
    var likesNode = document.querySelector(".likes-number");

    imageNode.setAttribute("src", data.image);
    imageNode.setAttribute("id", data.key);
    designerNode.innerHTML = data.designer;
    likesNode.innerHTML = data.likes;

}

function addEventListeners() {
    var nextButton = document.querySelector(".next-button");
    var likeButton = document.querySelector(".like-button");

    nextButton.addEventListener("click", function() {
        getRandomProduct();
    });

    likeButton.addEventListener("click", function() {
        increaseLikes();
    });
}

function increaseLikes() {
    var request = new XMLHttpRequest();
    var productId = document.querySelector(".product-image").getAttribute("id");

    request.open('GET', '/api/products/' + productId + "/like", true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);

            getRandomProduct();

        }
    };

    request.send();
}

getRandomProduct();
addEventListeners();
