		var wrapper = document.querySelector('.wrapper'),
			page = document.querySelectorAll('.page'),
			indicator = document.getElementById('indicator'),
			indicator_li = indicator.querySelectorAll('li');

		var yDeg = 0,	// page wrapper 회전 각도
			indicator_num = 1,
			indicator_length = $('.wrapper .page').size(), 	// 인디케이터 개수(페이지수)
			w = page[0].offsetWidth,	// 현재 페이지 width
			page_angle = 0,				// 페이지 4면체 각도
			page_vector = 0;			// 페이지 진행 방향 변수(1 or -1)

		var hammer = new Hammer(wrapper);


		// 페이지 초기화
		function init_page(){
			w = page[0].offsetWidth; // 페이지 width

			// page wrapper 정면으로 초기화
			wrapper.style.transform = 'translateZ(' + (-w/2) + 'px) rotateY(' + yDeg + 'deg)';
	
			// 3D page 4면체 위치 정의
			for(var i = 0; i < page.length; i++){
				page[i].style.transform = 'rotateY(' + page_angle + 'deg) translateZ(' + (w/2) + 'px)';
				page_angle += 90;
			}				
		}			

		// 인디케이터 초기화
		function init_indicator(){
			// 이미지 갯수 만큼 인디케이터 표시
			for(var i = 0; i < indicator_length; i++){
				indicator.innerHTML += '<li>' + (i+1) + '</li>';
			}		
			indicator_li = indicator.querySelectorAll('li'); // 목록
			show_indicator(indicator_num);		
		}

		function show_indicator(inum){
			// 현재 인디케이터 하이라이트 표시
			indicator_li[inum-1].setAttribute('class', 'active');
			yDeg = 90 * (inum - 1);
			yDeg = -(yDeg);
			wrapper.style.transform = 'translateZ(' + (-w/2) + 'px) rotateY(' + yDeg + 'deg)';

			// 인디케이터 표시
			for(var i = 0; i < indicator_li.length; i++){
				indicator_li[i].removeAttribute('class');
			}
			indicator_li[inum - 1].setAttribute('class', 'active');			
		}

		/* ---------------------------------------------------------------- */
		// 페이지 초기화
		init_page();
		init_indicator();
		console.log(indicator_num);

		/* ------------------- 이벤트 핸들러 ------------------------------ */
		for(var i =0; i < indicator_li.length; i++){
			indicator_li[i].addEventListener('click', function(){
				// 인디케이터 번호(정수로 변환)
				indicator_num = parseInt($(this).text());
				show_indicator(indicator_num);
			});
		}

		// 터치 방향 좌측 벡터
		hammer.on('panleft', function(ev){
			if(indicator_num < indicator_length){
				page_vector = 1;
			} else page_vector = 0;
		});

		// 터치 방향 우측 벡터
		hammer.on('panright', function(ev){
			if(indicator_num > 1){
				page_vector = -1;
			} else page_vector = 0;
		});

		// 터치를 떼는 순간
		hammer.on('panend', function(ev){
			indicator_num += page_vector;				
			show_indicator(indicator_num);
			console.log(ev.type +" gesture detected.");	
			console.log('next= '+ indicator_num);
		});

		// 문서 크기가 변경되면 초기화
		window.onresize = function(){
			init_page();	
		}
		
