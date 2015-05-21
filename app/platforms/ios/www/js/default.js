var questionList = data;
$(function(){
  var cursor = 0;

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
});

function load(cursor) {
  var question = questionList[cursor];
  $('#questionNo').val(cursor+1);
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
    var link = $('<a href="#"></a>');
    link.html(value);
    link.on('click', function() {
      $('#result').html(key == question.answer ? 'Correct!' : 'Wrong');
    });
    $('#choices').append(link);
    $('#choices').append($('<p>'));
  });
}
