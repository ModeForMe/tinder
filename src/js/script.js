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
    var loadingGif = new Image();
    loadingGif.src = "https://mir-s3-cdn-cf.behance.net/project_modules/disp/4ef13910395367.560e43c184ee6.gif";

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
    var lovesNode = document.querySelector(".loves-number");
    var peopleOrPerson = document.querySelector(".people-person");
    var loveOrLoves = document.querySelector(".love-loves");

    imageNode.setAttribute("src", data.image);

    imageNode.onload = function () {
        imageNode.setAttribute("id", data.key);
        designerNode.innerHTML = data.designer;
        lovesNode.innerHTML = data.likes;
        peopleOrPerson.innerHTML = data.likes == 1 ? "person" : "people";
        loveOrLoves.innerHTML = data.likes == 1 ? "loves" : "love";

        if ($(".designer-name").css("display") === "none") {
            $(".loves").show();
            $(".designer-name").show();
            $(".next-button").show();
            $(".love-button").show();
        }
    };

}

function addEventListeners(data) {
    var startButton = document.querySelector(".start-button");
    var nextButton = document.querySelector(".next-button");
    var loveButton = document.querySelector(".love-button");
    var productId;

    if (document.querySelector(".product-image") && startButton && nextButton && loveButton) {

        startButton.addEventListener("click", function() {
            $(".product-image").attr("src", "https://mir-s3-cdn-cf.behance.net/project_modules/disp/4ef13910395367.560e43c184ee6.gif");
            $(".start-button").hide();
            $(".intro-copy").hide();
            getRandomProduct(data);
        });

        nextButton.addEventListener("click", function() {
            productId = document.querySelector(".product-image").getAttribute("id");
            getRandomProduct(data);
            increaseSkips(productId);
        });

        loveButton.addEventListener("click", function() {
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
