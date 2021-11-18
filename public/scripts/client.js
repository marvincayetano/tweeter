/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Loop through an array of tweets then returning array of elements
function renderTweets(tweetArr) {
  return (tweetArr.map(tweet => createTweetElement(tweet))).reverse();;
}


// Creates a single element using a literal string for the component
function createTweetElement(tweetObj) {
  return  `
  <article class="tweet-container">
        <header class="tweet-header">
          <div>
            <img src="${tweetObj["user"]["avatars"]}" alt="" />
            <span>${tweetObj["user"]["name"]}</span>
          </div>

          <span class="tweet-tag">${tweetObj["user"]["handle"]}</span>
        </header>
        <h4 class="tweet-description">
        ${tweetObj["content"]["text"]}
        </h4>
        <footer class="tweet-footer">
          <span>${timeago.format(tweetObj["created_at"])}</span>
          <div class="tweet-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <div class="tweet-icon-heart">
              <i class="fas fa-heart"></i>
              <span>1</span>
            </div>
          </div>
        </footer>
      </article>
  `;
}

// Creates an element with error message
function createError(message) {
  return `
          <div class="tweet-error">
            <span>
            ${message}
            </span>
          </div>
  `;
}

$(function() {
  $("#formNewTweet").submit(function(e) {
    e.preventDefault();
    const { value } = e.target.text;

    // Append error here
    $(".error").empty();

    if(value.trim() === "") {
      $(".error").append(createError("Cannot tweet empty humming."))
      $(".tweet-error").slideUp();
      $(".tweet-error").slideDown();
      return;
    } else if(value.length > 140) {
      $(".error").append(createError("That humming is way too long. Only 140 humming characters are allowed!"))
      $(".tweet-error").slideUp();
      $(".tweet-error").slideDown();
      return;
    }

    const safeHTML = `text=${escape(value)}`;

    $.post("/tweets", safeHTML, function(){
      $("article").remove();
      loadTweets();
      $("#tweet-text").val('');
      $(".counter").text('140');
    });
  });

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  function loadTweets() {
    $.get('/tweets').then(data => {
      $("main").append(renderTweets(data));
    });
  }

  loadTweets();
});
