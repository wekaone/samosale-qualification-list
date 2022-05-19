//jQuery.ajaxSetup({ async: false });

var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

$("#sms-send").on("click", function() {
  clearErrors();
  var phone = $("#phone")
    .val()
    .trim();
  if (phone.length < 10) {
    $("#validate-phone").show();
    return;
  }

  // if it start without 7 or 8
  if (phone.length == 10) phone = "7" + phone;
  $.get("sms.php?phone=" + phone, function(data) {
    // do nothing
  });

  $("#smscode").show();
  $("#phone").prop("disabled", true);
  //$("#sms-send").prop('disabled', true);
});

$("#close-btn").on("click", function() {
  clearErrors();
  $("#phone").prop("disabled", false);
  $("#sms-send").prop("disabled", false);
  $("#code-send").prop("disabled", false);
});

//submit
$("#form-sms").on("submit", function(e) {
  e.preventDefault();
  var form = $(this);
  var isValid = true;
  clearErrors();
  
  if(isValid = true) {	  
	  $('#checkign').fadeIn();
  } else {
		$('#checkign').hide();
  }  

  if ($("#form-sms input[name='name']").val().trim().length == 0) {
    $("#validate-name").show();
    isValid = false;
  }
  
  /*проверка имени*/
    var reName = /^[A-zА-яЁё\s]*$/iu;  
    var myName = $("#form-sms input[name='name']").val();
	var outputName = "Используйте буквы A-z, А-я";
    if (reName.test(myName) && ($("#form-sms input[name='name']").val().trim().length >= 1)) {

	} else {
		isValid = false;		
		$("#validate-name").show();
		$("#validate-name").text(outputName);
		$('#checkign').hide();
	}
/*проверка имени*/


let outputTel = "Введите номер, например: +7 ххх ххх хх хх";
let myTel = $("#form-sms input[name='tel']").val();	
let arr = [];
for (var i = 0; i < myTel.length; i++){
		if ((myTel[i] == "0") || (myTel[i] == "1") || (myTel[i] == "2") || (myTel[i] == "3") || (myTel[i] == "4") || (myTel[i] == "5") || (myTel[i] == "6") || (myTel[i] == "7") || (myTel[i] == "8") || (myTel[i] == "9")) {
			arr.push(myTel[i]);
		}
	}
	
if (arr.length < 11) {
	isValid = false;
	$("#validate-phone").show();
	$("#validate-phone").text(outputTel);
	$('#checkign').hide();
}

/*проверка телефона*/
	/*function test_same_digit(num) {
		const first = num % 10;
		while (num) {
			if (num % 10 !== first) return false;
			num = Math.floor(num / 10);
		}
		return true
	}
	
	let reTel;
	let myTel = $("#form-sms input[name='tel']").val();
	let myTel0 = myTel[0];
    let myTel1 = myTel[1];
	let outputTel = "Введите номер, например: +7 ххх ххх хх хх";	
	
	if(isSafari) {
		let arr = [];
		for (var i = 0; i < myTel.length; i++){
				if ((myTel[i] == "0") || (myTel[i] == "1") || (myTel[i] == "2") || (myTel[i] == "3") || (myTel[i] == "4") || (myTel[i] == "5") || (myTel[i] == "6") || (myTel[i] == "7") || (myTel[i] == "8") || (myTel[i] == "9")) {
					arr.push(myTel[i]);
				}
			}
			
		 if (arr.length < 11) {
			isValid = false;
			$("#validate-phone").show();
			$("#validate-phone").text(outputTel);
			$('#checkign').hide();
		}	
	} else {
		if ((myTel0=='8') || ((myTel0=='+')&&(myTel1=='7'))) {
				reTel = /^((8|7|\+7)[\- ]?){1}(\(?\d{3}\)?[\- ]?){1}[\d]{3}[\s\-]?[\d]{2}[\s\-]?[\d]{2}$/;	 			
				
			}else{				
				reTel = /^((8|7|\+7|\+38|\+380|\+375|\+43|\+355|\+376|\+32|\+359|\+387|\+44|\+36|\+49|\+350|\+30|\+353|\+45|\+353|\+354|\+34|\+39|\+34928|\+357|\+3395|\+371|\+370|\+423|\+352|\+389|\+356|\+373|\+377|\+31|\+47|\+48|\+351|\+840|\+40|\+378|\+381|\+421|\+386|\+380|\+298|\+358|\+33|\+382|\+420|\+41|\+46|\+372)[\- ]?){1}(\(?\d{2,4}\)?[\- ]?){1}[\d]{3}[\s\-]?[\d]{2}[\s\-]?[\d]{2}$/;
		}
		let correctTel = reTel.test(myTel);
		if (!correctTel || test_same_digit(myTel)) {
			isValid = false;
			$("#validate-phone").show();
			$("#validate-phone").text(outputTel);
			$('#checkign').hide();
		}
	}*/
/*проверка телефона*/ 

  if (
    $("#form-sms input[name='tel']")
      .val()
      .trim().length < 10
  ) {
    $("#validate-phone").show();
    isValid = false;
  } else {
    var code = $("#code")
      .val()
      .trim();
    $.get("validate_code.php?code=" + code, function(data) {
      if (parseInt(data) == 0) {
        $("#code-send").prop("disabled", true);
      } else {
        if ($("#smscode").css("display") == "none") {
          $("#validate-auth").show();
          isValid = false;
        } else {
          $("#validate-code").show();
          isValid = false;
        }
      }
    });
  }

  if (isValid) {
    $("#phone").prop("disabled", false);
    $.ajax({
      url: "send.php",
      type: "POST",
      data: form.serialize(),
      success: function(data) {
        if (data == "true") {
		  $('#btn-kviz').val('Отправка...').attr('disabled', 'true');
		  $('#checkign').html('&#10004; Отправка данных на сервер');
		  $('form input[type="text"]').val("");
          $('form input[type="tel"]').val("");
          $('form input[type="email"]').val("");
          $('form input[type="checkbox"]').val("");		  
          window.location.href = "thanks.php";
        } else {
          $(".message-error")
            .attr("id", "message-error")
            .html(data)
            .slideDown(300);
        }
      }
    });
  }
});

function clearErrors() {
  $("#validate-name").hide();
  $("#validate-phone").hide();
  $("#validate-code").hide();
  $("#validate-auth").hide();
  $("#validate-email").hide();
}
