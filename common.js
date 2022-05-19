//Actions when changing a checkbox or field ---------------------------------------------------------
$(document).on('change click', '.step-question input', function () {
	$('.step .error-txt').hide(); //скрываем сообщение об ошибке
	$('.step .btn-next').removeClass('disabled'); // делаем визуально активной кнопку
});

/**/
function loadtest(){
	/*$('.preloader').css({'position': 'relative'});*/
	$('.all').addClass('second');
	$('#first').hide();
	$('#steps-wrap').show();
	$('#steps-wrap').addClass('animated fadeIn');
	$('html, body').animate({scrollTop:0}, 400);
	$('.error-txt').text('Выберите хотя бы один вариант');
	
	/*уменьшение фактоидов на шагах в зависимости от количества строк*/
	let fact1s = $('.step .facts .item1');
	let fact2s = $('.step .facts .item2');
	let fact1s_h = fact1s.height();
	let fact2s_h = fact2s.height();	
	
	let fact_height_max_st;
	
	if (fact1s_h>=fact2s_h) {
		fact_height_max_st = fact1s_h;
	} else {fact_height_max_st = fact2s_h;}
	
	let fact_fs_s = parseInt($('.step .facts .item').css('font-size'));
	let fact_lh_s = parseInt($('.step .facts .item').css('line-height'));
	let fact_pl_s = parseInt($('.step .facts .item').css('padding-left'));
	let fact_pr_s = parseInt($('.step .facts .item').css('padding-right'));
	
	while ((fact_height_max_st>41)&& (fact_fs_s>13)) {		
		fact_fs_s -= 0.5;
		fact_lh_s -= 0.5;
		fact_pl_s -= 2;
		fact_pr_s -= 2;	
		console.log(fact_height_max_st);
		fact1s.css({'font-size': fact_fs_s+'px', 'line-height': fact_lh_s+'px', 'padding-left': fact_pl_s+'px', 'padding-right': fact_pr_s+'px'});
		fact2s.css({'font-size': fact_fs_s+'px', 'line-height': fact_lh_s+'px', 'padding-left': fact_pl_s+'px', 'padding-right': fact_pr_s+'px'});
		fact1s_h = fact1s.height();
		fact2s_h = fact2s.height();
		
		if (fact1s_h>=fact2s_h) {
			fact_height_max_st = fact1s_h;
		} else {fact_height_max_st = fact2s_h;}
	}
	
	/*уменьшение фактоидов на шагах в зависимости от количества строк*/
						
	$('.error-txt').each(function(index, el){		
		let curr_step = $(this).parents('.step-question');
		let curr_step_ans = curr_step.find('.field input:checkbox');
		let curr_step_ans_txt = curr_step.find('.field input:text');
		if((curr_step_ans.length == 0) && (curr_step_ans_txt.length>=1)) {
			$(this).text('Введите значение');
		}
	});
	
	let desc_h_s1 =  $('.step1 .description-mob .txt p').height();
	
	if (desc_h_s1>=30) {
		$('.step1 .description-mob .txt').addClass('full').addClass('content_block');
		$('.step1 .description-mob .txt .full-text').fadeIn();
	}
	
	$('.content_toggle').click(function(){		
		$('.content_block').toggleClass('hide1');
  	    $('html, body').animate({scrollTop:intElemScrollTop}, 100);		
		return false;
	});

	let newUrl = new URL(document.location.href);
	
	newUrl.searchParams.append('page', 'step1');
	history.pushState('', '', newUrl);

	let stepQuestion = $('.step-question');
	let numQuestion = stepQuestion.length;	

	/***********************question numbering block***********************/
	$('.num-question').text(numQuestion); // sets the total number of questions
	$( '.step-question .n-question').each(function(index) { // sets the current number of question
		index1 = index+1;
		$(this).text(index1);
    });
	
	$( '.heading-num').each(function(index) { // sets the current number of question
		index1 = index+1;
		let numNul;
		if (index1<=9) {
			numNul = '0'+index1;
		} else {numNul=index1}
		$(this).text(numNul);
    });

	for(let i=0; i<numQuestion; i++) { $(".points").append("<i></i>"); } // adds the number of points equal to the number of questions

    //activates the point depending on the question sequence number
	$( '.points').each(function(index) {
		let actpoint = $(this).find("i");
		actpoint.eq(index).addClass("act");
	});
	/***********************question numbering block***********************/

	/***********************progress bar***********************/
	let arr = [];
	let numArr = numQuestion + 1;
	let stepArrNoRound = 100/numArr;
	let stepArr = Math.round(stepArrNoRound);
	let stepArr1 = stepArr;

	//each element of the array corresponds to the quantity of percents for each question
	while(stepArr<100){
	  let arr1 = arr.push(stepArr);
		stepArr += stepArr1;
    }

	// fills the progress bar with content and width
	$('.step-question .progress').each(function(index) {
		let styleElem = document.head.appendChild(document.createElement("style"));
		let persen = arr[1];
		index1 = index+1;
        styleElem.innerHTML = ".step"+index1 + " .progress:after {width:" +arr[index]+"%; content:'" +arr[index]+"%';}   .step"+index1+" .topimage {background-image: url(img/step"+index1+".jpg?"+new Date().getTime()+");}";
    });	
	/***********************progress bar***********************/
	
	/***********************the transition between steps***********************/
	let count=1;
	stepQuestion.each(function(index) {
		let ind = index+1;
        let next = ind+1;
		let prev = ind-1;
		let step_cur = $(this);
		$(this).find('.btn-next').click(function(){
			if (((step_cur.find('input:text').length <= 0) || (step_cur.find('input:text').val() == '')) && (step_cur.find(':checkbox:checked').length <= 0 ) 	) // для обоих
				{
					step_cur.find('.error-txt').fadeIn('fast'); 
					step_cur.find('.btn-next').addClass('disabled'); 
					return false;
				}

			else {forward(step_cur, next)}
		});
  	});
	
	$(document).on('keypress',function(e) {
		if(e.which == 13) {
			let count1 = count+1;
			if ((($('.step'+count).find('input:text').length <= 0) || ($('.step'+count).find('input:text').val() == '')) && ($('.step'+count).find(':checkbox:checked').length <= 0 ) 	) // для обоих
			{
				$('.step'+count).find('.error-txt').fadeIn('fast'); 
				$('.step'+count).find('.btn-next').addClass('disabled'); 
				return false;							
			}
			else {
				let ha = $('.step'+count);
				forward(ha, count1)
			}
		}
	});


	
	function forward(sc1, next1){
		count++;
		hide_current(sc1);
		$('.step .error-txt').hide();
		if (sc1.hasClass('step' + numQuestion)) {	
			$('.step-progress').fadeIn('fast');
			$('.step-progress').addClass('display-flex');
			setTimeout(function(){
				$('.step-progress').hide();
				$('.step-progress').removeClass('display-flex');
				$('.final').fadeIn('fast');
				$('.final').addClass('display-flex');				
				newUrl.searchParams.append('page', 'form');
				history.pushState('', '', newUrl);
				$("#validate-name").hide();
				$("#validate-phone").hide();
			}, 5000);
			moveProgressBar();
			numAnimate();
		}
		else {
			$('.content_block').removeClass('hide1');
			$('.step' + next1).fadeIn('fast');
			$('.step' + next1).addClass('display-flex');
			$('.step .error-txt').hide();	
			/**/
			newUrl.searchParams.append('page', 'step'+next1);
			history.pushState('', '', newUrl);
			let desc_h_sn =  $('.step'+next1+' .description-mob .txt p').height();
			console.log(desc_h_sn);
			
			if (desc_h_sn>=30) {
				$('.step'+next1+' .description-mob .txt').addClass('full').addClass('content_block');
				$('.step'+next1+' .description-mob .txt .full-text').fadeIn();
			}
		}		
	}
	
	function hide_current(sc) {
			sc.hide();
			sc.removeClass('display-flex');
			$('html, body').animate({scrollTop:0}, 400);
		}
	
	/***********************the transition between steps***********************/

	// progress
	// SIGNATURE PROGRESS
	function moveProgressBar() {
		let progressTotal = $('.progress-wrap').width();
		// on page load, animate percentage bar to data percentage length
		$('.progress-bar').animate({left: progressTotal}, 4000);
	}

	function numAnimate () {
		let number = 1;
		setInterval(function () {
		number++;
		if (number<=100) { $('.numbers').text(number); };
		}, 40);
	};

	/***********************Automatic setting of step content***********************/
	
	for (i=1; i<=numQuestion; i++) {
		answer_handler('.step'+i);	
	}
	
	function answer_handler(step_class) {		
		let answer_field = $(step_class+' .field');
		let data_array = answer_field.length;
		if (data_array > 4) {
			answer_field.wrapAll('<div class="row fields-row"></div>');
			let half = data_array/2;
			let halfRund = Math.ceil(half);
			answer_field.slice(0, halfRund).wrapAll('<div class="col1 col-xs-6">');
			answer_field.slice(halfRund, data_array).wrapAll('<div class="col1 col-xs-6">');
		}
	}
	
	var input = document.querySelector(".phone-test");
    if(input) {input.addEventListener("input", mask, false);}
	
	function setCursorPosition(pos, elem) {
		elem.focus();
		if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
		else if (elem.createTextRange) {
			var range = elem.createTextRange();
			range.collapse(true);
			range.moveEnd("character", pos);
			range.moveStart("character", pos);
			range.select()
		}
	}
	
	function mask(event) {		
		var matrix = this.defaultValue,
			i = 0,
			def = matrix.replace(/\D/g, "");

      
     //tv = this.value;
      if(this.value.charAt(4)==8) {
       //console.log('dolb');
   val = this.value.replace(/\D/g, "").replace(/8/, ""); }  else if (this.value.charAt(4)==7) {
      val = this.value.replace(/\D/g, "").replace(/7/, "");  
        
     } else {
        val = this.value.replace(/\D/g, "");
     }
      
			def.length >= val.length && (val = def);
			matrix = matrix.replace(/[_\d]/g, function(a) {
			return val.charAt(i++) || "_"
		});	   
		
		/*let first_char = val.charAt(0);		
		let second_char = val.charAt(1);
    let four_char = val.charAt(4);
		
		if (four_char == 8) {
			let matrix2 = matrix.replace("8", "");
			this.value = matrix2;
      console.log('four_char');
		} else if (four_char == 7) {
			let matrix7 = matrix.replace("7", "");
			this.value = matrix7;
		}		
		else {
			this.value = matrix;
		}	*/
		
		this.value = matrix;
		
		i = matrix.lastIndexOf(val.substr(-1));
		i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");
		setCursorPosition(i, this)
	}
	
	/*маска проверки телефона*/  
}


