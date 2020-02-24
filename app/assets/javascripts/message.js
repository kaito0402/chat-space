$(function(){      

  var buildHTML = function(message) {
    var html_part = `<div class="contents" data-message-id=` + message.id + `>` +
                      `<div class="contents__top">` +
                        `<div class="contents__top__name">` +
                          message.user_name +
                        `</div>` +
                        `<div class="contents__top__date">` +
                          message.created_at +
                        `</div>` +
                      `</div>` +
                      `<div class="contents__bottom">`;

    if (message.content && message.image) {
      var html = html_part +
          `<p class="contents__bottom__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    }  else if (message.content) {
      var html = html_part +
          `<p class="contents__bottom__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      var html = html_part +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    };
      return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildHTML(message);
      $('.ChatSpace').append(html);
      $('.ChatSpace').animate({ scrollTop: $('.ChatSpace')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました");
    });
  });
  
    var reloadMessages = function(){
      var last_message_id = $('.contents:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })

      .done(function(messages) {
        if (messages.length !== 0) {  
          var insertHTML = '';
          $.each(messages, function(i, message){
            insertHTML += buildHTML(message)
          });
          $('.ChatSpace').append(insertHTML);
          $('.ChatSpace').animate({ scrollTop: $('.ChatSpace')[0].scrollHeight});
        }
      })
      .fail(function() {
        console.log('error');
      });
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
});
