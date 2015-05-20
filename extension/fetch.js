var drmcq = {};

drmcq.download = function(path, prefix) {
  var name = path.replace(/^.*[\\\/]/, '');
  var a = document.createElement('a');
  a.href = path;
  a.download = prefix + '_' + name;
  a.click();
  return a.download;
};

drmcq.cursor = 1;

drmcq.setName = '';

drmcq.result = [];

drmcq.printed = false;

var fetchFunc = function() {
  var item = {};
  item.question = {};

  if (drmcq.setName.length === 0) {
    drmcq.setName = $('.col-md-12:eq(1) h2').html();
  }
  item.name = drmcq.setName + ' Question ' + drmcq.cursor;
  var img = $('#mcqContent .img-responsive:eq(0)');
  item.imgName = img.length ? drmcq.download(img.prop('src'), drmcq.setName) : '';
  item.questionStr = $('#mcqContent p:eq(0)').html();

  var i = 0;
  for (i=0; i<$('#choices .btn').length; ++i) {
    item.question[$('#choices .btn:eq('+i+')').html()] = $('#choices .btn:eq('+i+')').parent().contents()[1].nodeValue;
  }
  $('#choices .btn:eq(0)').get(0).click();
  $('#choices .btn-success').waitUntilExists(function(){
    item.answer = $('#choices .btn-success').html();
    drmcq.result.push(item);
    drmcq.cursor++;
    var nextQuestion = $('.order:eq('+ (drmcq.cursor-1) +')');
    if (nextQuestion.length) {
      nextQuestion.get(0).click();
      setTimeout(fetchFunc, 2000);
    } else {
      if (!drmcq.printed) {
        console.log(JSON.stringify(drmcq.result, null, 4));
        drmcq.printed = true;
      }
    }
  }, true);
};

fetchFunc();
