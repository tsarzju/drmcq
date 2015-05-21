var questionList = data;
$(function(){
  var cursor = window.localStorage.getItem('cursor');
  if (!cursor) {
    cursor = 0;
  }
  load(cursor);
  $('#prev').on('click', function() {
    if (cursor>0) {
      cursor--;
      load(cursor);
    }
  });

  $('#next').on('click', function() {
    if (cursor<questionList.length-1) {
      cursor++;
      load(cursor);
    }
  });

  $('#go').on('click', function() {
    var no = Number($('#questionNo').val());
    if (no) {
      var tempCursor = no - 1;
      if (tempCursor >=0 && tempCursor <questionList.length) {
        cursor = tempCursor;
        load(cursor);
      }
    }
  });

  $('body').on('keypress', function(e) {
    if (e.keyCode == 13) {
      $('#go').trigger('click');
    }
  });
});

function load(cursor) {
  window.localStorage.setItem('cursor', cursor);
  var question = questionList[cursor];
  $('#questionNo').val(Number(cursor)+1);
  $('#questionName').html(question.name);
  $('#questionStr').html(question.questionStr);
  $('#questionImg').prop('src', 'img/' + question.imgName);
  if (question.imgName.length>0) {
    $('#questionImg').show();
  } else {
    $('#questionImg').hide();
  }
  $('#choices').html('');
  $.each(question.question, function(key, value) {
    var div = $('<div class="alert alert-info question"></div>');
    div.html(key + ' : ' + value);
    div.on('click', function() {
      $(this).removeClass('alert-info');
      $(this).addClass(key == question.answer ? 'alert-success' : 'alert-danger');
    });
    $('#choices').append(div);
    $('#choices').append($('<p>'));
  });
}
