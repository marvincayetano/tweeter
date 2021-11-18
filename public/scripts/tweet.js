$(document).ready(function() {
  let length;
  let showValue;

  // Character counter checks if the length is more that 140
  $('#tweet-text').on('input', function() {
    length = this.value.length;

    if(length > 140) {
      $(this).siblings('div').children('.counter').addClass('font-red');
    } else {
      $(this).siblings('div').children('.counter').removeClass('font-red');
    }

    $(this).siblings('div').children('.counter').text(showValue = 140 - length);
  });
});