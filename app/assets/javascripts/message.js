$(function(){

  function buildHTML(message){
    if (message.image){
      var html = `<div class="contents" data-message-id=${message.id}>
                    <div class="contents__top">
                      <div class="name">
                        ${message.user_name}
                      </div>
                      <div class="date">
                        = ${message.created_at}
                      </div>
                    </div>
                    <div class="contents__bottom">
                      <p class="contents__bottom__content">
                        ${message.content}
                      </p>
                    </div>
                    <img src=${message.image} >
                  </div>`
      return html;
    }else{
      var html = `<div class="contents" data-message-id=${message.id}>
                    <div class="contents__top">
                      <div class="name">
                        ${message.user_name}
                      </div>
                      <div class="date">
                        = ${message.created_at}
                      </div>
                    </div>
                    <div class="contents__bottom">
                      <p class="contents__bottom__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
      return html;
    };
  }

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

    .done(function(data){
      var html = buildHTML(data);
      $('.ChatSpace').append(html);
      $('.ChatSpace').animate({ scrollTop: $('.ChatSpace')[0].scrollHeight})
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました");
    })
  });
});