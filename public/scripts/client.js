/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function renderTweets(tweetArr) {
  return tweetArr.map(tweet => createTweetElement(tweet));
}

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
    const { value }= e.target.text;

    // Append error here
    $(".error").empty();

    if(value.trim() === "") {
      $(".error").append(createError("Cannot tweet empty humming."))
      return;
    } else if(value.length > 140) {
      $(".error").append(createError("That humming is way too long."))
      return;
    }

    // $.ajax({
    //        type: "POST",
    //        data: e.target.text.serialize(),
    //        success: function(data) {
    //          console.log(data)
    //        }
    //      });
  });


  function loadTweets() {
    $.get('/tweets').then(data => {
      $("main").append(renderTweets(data));
    });
  }

  loadTweets();
});
