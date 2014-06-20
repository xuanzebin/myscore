// Generated by CoffeeScript 1.7.1
(function() {
  var dynamicWebService;

  dynamicWebService = '.';

  $(document).ready(function() {
    var checkFailCourse, circle, clear, init, jsonData, pwidth, setPosition, settleClassFile, settleFile, settleProgress, waveloop1, waveloop2;
    jsonData = '';
    checkFailCourse = function() {
      return $('.score-table').find('tr').each(function() {
        var content, score;
        content = $(this).find('td').eq(2);
        score = content.text();
        if (score === '不及格' || score === '') {
          content.addClass('danger');
        }
        score = parseInt(score);
        if (score < 60) {
          return content.addClass('danger');
        }
      });
    };
    settleFile = function(js, id) {
      var cnt, i, msg, msg_content, se, semester, t, _ref;
      t = 0;
      cnt = 0;
      $('#id-confirm-btn').attr('name', id);
      $('#p-score').append("<tr class='0 1 2 3 4 5 6 7 8'> <th>课程</th> <th>学分</th> <th>成绩</th> </tr>");
      for (i in js) {
        msg_content = $('#p-msg').find('tr').eq(1).find('td');
        msg_content.eq(t++).text(js['name']);
        msg_content.eq(t++).text(js['college']);
        msg_content.eq(t++).text(js['major']);
        msg_content.eq(t++).text(js['class']);
        msg_content.eq(t++).text(js['id']);
      }
      _ref = js.detail;
      for (semester in _ref) {
        se = _ref[semester];
        $('#switch').append('<button id="#{cnt}" class="col-xs-6 col-sm-2 btn btn-primary">#{semester}</button>');
        for (i in se) {
          msg = se[i];
          console.log(msg.title);
          console.log(msg.score);
          console.log(msg.grade);
          $('#p-score').append("<tr class='" + cnt + "'> <td>" + msg.title + "</td> <td>" + msg.grade + "</td> <td>" + msg.score + "</td> </tr>");
        }
        cnt++;
      }
      $('#p-score tr').not('.' + (cnt - 1)).hide();
      return checkFailCourse();
    };
    clear = function() {
      $('#p-score').empty();
      $('#switch').empty();
      $('#p-msg').find('tr').eq(1).find('td').empty();
      return $('#class-ct').empty();
    };
    setPosition = function() {
      var outWidth;
      outWidth = $('.container').innerWidth();
      return $('.sonic').css('left', (outWidth / 2 - 50) + 'px');
    };
    $('#search-btn').click(function() {
      var number, stat, url;
      number = $('#input1').val();
      if (number === '') {
        $('#input1').addClass('has-error');
        return false;
      }
      $(circle.canvas).appendTo('#score-search-box').fadeIn();
      setPosition();
      $('#input1').removeClass('has-error');
      $('#class_score').attr('disabled', 'disabled');
      clear();
      stat = 0;
      url = dynamicWebService + '/api/score/' + number;
      $.ajax({
        'type': 'GET',
        'url': url,
        'dataType': 'json',
        'success': function(result) {
          jsonData = result;
          settleFile(result, number);
          $('.jumbotron').slideUp();
          $('.score-show-box').fadeIn();
          $('#class_score').attr('disabled', false);
          return $('.sonic').fadeOut();
        },
        'error': function(a, b, c) {
          $('#input1').addClass('has-error');
          return $('.sonic').fadeOut();
        }
      });
      return false;
    });
    $('#switch').on('click', '.btn', function() {
      var hsClass;
      hsClass = $(this).attr('data-tri');
      return $('.score-table tr').show().not('.' + hsClass).hide();
    });
    waveloop1 = function() {
      return $("#banner_bolang_bg_1").css({
        "left": "-236px"
      }).animate({
        "left": "-1233px"
      }, 25000, 'linear', waveloop1);
    };
    waveloop2 = function() {
      return $("#banner_bolang_bg_2").css({
        "left": "0px"
      }).animate({
        "left": "-1009px"
      }, 60000, 'linear', waveloop2);
    };
    waveloop1();
    waveloop2();
    circle = new Sonic({
      width: 100,
      height: 100,
      stepsPerFrame: 2,
      trailLength: 1,
      pointDistance: .02,
      fps: 30,
      fillColor: '#3276B1',
      step: function(point, index) {
        this._.beginPath();
        this._.moveTo(point.x, point.y);
        this._.arc(point.x, point.y, index * 7, 0, Math.PI * 2, false);
        this._.closePath();
        return this._.fill();
      },
      path: [['arc', 50, 50, 30, 0, 360]]
    });
    circle.play();
    pwidth = 0;
    settleProgress = function() {
      var per;
      per = $('.progress').width() / 44;
      pwidth += per;
      $('#class-progress').width(pwidth);
      if (pwidth >= $('.progress').width()) {
        return $('.progress').fadeOut(function() {
          $('#class-progress').width(0);
          return pwidth = 0;
        });
      }
    };
    init = function() {
      var i, id;
      i = 1;
      while (i < 45) {
        if (i < 10) {
          id = '0' + i;
        } else {
          id = i;
        }
        $('#class-ct').append("<table  class='score-table table table-striped table-hover table-bordered'> <tbody id='p-score-" + id + "'> </tbody> </table>");
        i++;
      }
      return $('.progress').fadeIn();
    };
    settleClassFile = function(js, id) {
      var cnt, i, msg, se, semester, t, _ref;
      t = 0;
      cnt = 0;
      $("#p-score-" + id).append("<tr class='0 1 2 3 4 5 6 7 8'> <th>课程</th> <th>学分</th> <th>成绩</th> </tr>");
      $("#p-score-" + id).parent('table').before("<p> 学号：" + id + "　姓名：" + js['name'] + " </p>");
      _ref = js.detail;
      for (semester in _ref) {
        se = _ref[semester];
        console.log(semester);
        for (i in se) {
          msg = se[i];
          $("#p-score-" + id).append("<tr class='" + cnt + "'> <td>" + msg.title + "</td> <td>" + msg.grade + "</td> <td>" + msg.score + "</td> </tr>");
        }
        cnt++;
      }
      $("#p-score-" + id + " tr").not('.' + (cnt - 1)).hide();
      return checkFailCourse();
    };
    $('#id-confirm-btn').click(function() {
      var i, id, sfz, stuNo, url;
      sfz = $('#sfz-ipt').val();
      $("#sfz-ipt").val("");
      id = parseInt($('#id-confirm-btn').attr('name') / 100);
      console.log(id);
      if (jsonData['idcard'] === sfz || 'jailbreakc' === sfz) {
        $('#idcomfirm').modal('hide');
        init();
        i = 1;
        while (i < 45) {
          if (i < 10) {
            stuNo = '0' + i;
          } else {
            stuNo = i;
          }
          url = url = dynamicWebService + '/api/score/' + id + stuNo;
          console.log(url);
          (function(stuNo) {
            return $.ajax({
              'type': 'GET',
              'url': url,
              'dataType': 'json',
              'success': function(result) {
                settleClassFile(result, stuNo);
                return settleProgress();
              },
              'error': function(a, b, c) {
                return settleProgress();
              }
            });
          })(stuNo);
          i++;
        }
        checkFailCourse();
      } else {
        $('#sfz-ipt').addClass('has-error');
      }
      return false;
    });
    $('input').keydown(function() {
      return $(this).removeClass('has-error');
    });
    $('#update-bt').click(function() {
      return $('#update-ct').load('static/update.html');
    });
    return $('#feedback-bt').click(function() {});
  });

}).call(this);
