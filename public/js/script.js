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
    var likesNode = document.querySelector(".likes-number");

    imageNode.setAttribute("src", data.image);
    imageNode.setAttribute("id", data.key);
    likesNode.innerHTML = data.likes;

}

function enableLikes() {
    var likeButton = document.querySelector(".like-button");

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
enableLikes();
