var drmcq = {};

drmcq.download = function(path, prefix, item) {
  var name = path.replace(/^.*[\\\/]/, '');
  var a = document.createElement('a');
  a.href = path;
  a.download = prefix + '_' + name;
  item.imgName = a.download;
  a.click();
};

drmcq.cursor = 1;

drmcq.setName = '';

drmcq.result = [];

drmcq.printed = false;

$('#choices').waitUntilExists(function() {
  var item = {};
  item.question = {};

  if (drmcq.setName.length === 0) {
    drmcq.setName = $('.col-md-12:eq(1) h2').html();
  }
  item.name = drmcq.setName + ' Question ' + drmcq.cursor;
  var img = $('#mcqContent .img-responsive:eq(0)');
  drmcq.download(img.prop('src'), drmcq.setName, item);
  var i = 0;
  for (i=0; i<$('#choices .btn').length; ++i) {
    item.question[$('#choices .btn:eq('+i+')').html()] = $('#choices .btn:eq('+i+')').parent().contents()[1].nodeValue;
    $('#choices .btn:eq('+i+')').get(0).click();
  }
  $('#choices .btn-success').waitUntilExists(function(){
    item.answer = $('#choices .btn-success').html();
    drmcq.result.push(item);
    drmcq.cursor++;
    var nextQuestion = $('.order:eq('+ (drmcq.cursor-1) +')');
    if (nextQuestion.length) {
      nextQuestion.get(0).click();
    } else {
      if (!drmcq.printed) {
        console.log(JSON.stringify(drmcq.result, null, 4));
        drmcq.printed = true;
      }
    }
  }, true);
});
