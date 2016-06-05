'use strict';

if (document.cookie.indexOf('itemsSeen=') === -1) {
    // Create empty array in cookie if it does not already exist, expire in 30 days
    var date = new Date();
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
    document.cookie = 'itemsSeen=[]; expires=' + date.toUTCString();
    document.cookie = 'cookie_expiry=' + Date.parse(date) + '; expires=' + date.toUTCString();
}

function getAllProducts() {
    var request = new XMLHttpRequest();

    request.open('GET', '/api/products/all', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);

            addEventListeners(data);
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
    var itemsSeen = JSON.parse(document.cookie.split("itemsSeen=").pop().split(";").shift());
    var expires = document.cookie.split("cookie_expiry=").pop().split(";").shift();
    var unseenData = data.filter(function(item) {
        return itemsSeen.indexOf(item.key) === -1;
    });
    var numberOfProducts = unseenData.length;

    if (numberOfProducts > 0) {
        var randomNumber = Math.floor(Math.random() * numberOfProducts);

        itemsSeen.push(unseenData[randomNumber].key);
        displayProduct(unseenData[randomNumber]);
        document.cookie = 'itemsSeen=' + JSON.stringify(itemsSeen) + '; expires=' + new Date(Number(expires)); 
    } else {
        window.location = '/end';
    }
}

function displayProduct(data) {
    var imageNode = document.querySelector(".product-image");
    var designerNode = document.querySelector(".designer-name");
    var likesNode = document.querySelector(".likes-number");
    var peopleOrPerson = document.querySelector(".people-person");
    var likeOrLikes = document.querySelector(".like-likes");

    imageNode.setAttribute("src", data.image);

    imageNode.onload = function () {
        imageNode.setAttribute("id", data.key);
        designerNode.innerHTML = data.designer;
        likesNode.innerHTML = data.likes;
        peopleOrPerson.innerHTML = data.likes == 1 ? "person" : "people";
        likeOrLikes.innerHTML = data.likes == 1 ? "likes" : "like";

        if ($(".designer-name").css("display") === "none") {
            $(".likes").show();
            $(".designer-name").show();
            $(".next-button").show();
            $(".like-button").show();
        }
    };

}

function addEventListeners(data) {
    var startButton = document.querySelector(".start-button");
    var nextButton = document.querySelector(".next-button");
    var likeButton = document.querySelector(".like-button");
    var productId;

    if (document.querySelector(".product-image") && startButton && nextButton && likeButton) {

        startButton.addEventListener("click", function() {
            $(".start-button").hide();
            getRandomProduct(data);
        });

        nextButton.addEventListener("click", function() {
            productId = document.querySelector(".product-image").getAttribute("id");
            getRandomProduct(data);
            increaseSkips(productId);
        });

        likeButton.addEventListener("click", function() {
            productId = document.querySelector(".product-image").getAttribute("id");
            getRandomProduct(data);
            increaseLikes(productId);
        });
    }
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
