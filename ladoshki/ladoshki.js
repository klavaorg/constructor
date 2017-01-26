window.onload = function () {
	var s = Snap(1600, 1000).attr({
		id: 'svgCanvas',
	});
	var caps = 15/2;
	var indent = 1.5;

	var switches = [
		{
			'name': 'Matias',
			'x': 15.5,
			'y': 12.8
		},
		{
			'name': 'Cherry',
			'x': 12.8,
			'y': 15.5
		},
		{
			'name': 'Советские',
			'x': 12.8,
			'y': 15.5
		}
	];

	// подгружаем корпус
	var keyboardCase;
	Snap.load('ladoshki.svg', function(loadedFragment) {
		s.g().attr({
			id: 'keyboardCase',
			class: 'hide'
		}).append(loadedFragment).drag();
	});

	var leftHalf = s.g();
	for (y=0;y<4;y++) { // столбцы
		var col = s.g();
		for (i=0;i<4;i++) { // строки
			var keyCap = s.circle(y*(caps*2+indent)+caps+'mm', i*(caps*2+indent)+caps+'mm', caps+'mm', caps+'mm')
				.attr({
					fill: 'rgba(185, 185, 185, 0.19)',
					stroke: '#000',
					strokeWidth: '0.1mm',
					class: 'keyCap'
				});
			if ((i+y)%2==0) {
				var keySwitchX = y*(caps*2+indent)+caps-switches[0].x/2+'mm';
				var keySwitchY = i*(caps*2+indent)+caps-switches[0].y/2+'mm';
				var keySwitchWidth = switches[0].x+'mm';
				var keySwitchHeight = switches[0].y+'mm';
			} else {
				var keySwitchX = y*(caps*2+indent)+caps-switches[0].y/2+'mm';
				var keySwitchY = i*(caps*2+indent)+caps-switches[0].x/2+'mm';
				var keySwitchWidth = switches[0].y+'mm';
				var keySwitchHeight = switches[0].x+'mm';
			};
			var keySwitch = s.rect(keySwitchX, keySwitchY, keySwitchWidth, keySwitchHeight)
				.attr({
					fill: 'transparent',
					stroke: '#000',
					strokeWidth: '0.1mm',
					class: 'keySwitch'
				});
			var key = s.g(keySwitch, keyCap).attr({
				class: 'key'
			});
			col.add(key).attr({
				class: 'col'
			}).drag();
		};
		leftHalf.add(col).attr({
			class: 'half'
		});
	};
	var rightHalfMatrix = new Snap.Matrix()
	rightHalfMatrix.translate(700, 0).scale(-1, 1);
	var rightHalf= leftHalf.clone().transform(rightHalfMatrix);

	// кнопки
	$('#svgSave').click(function(){
		saveAs(new Blob([ unescape($('svg')[0].outerHTML) ], {type:"application/svg+xml"}), "keyboard.svg")
	});
	$('#toggleKeySwitches').click(function(){
		$('.keySwitch').toggleClass('hide');
	});
	$('#toggleKeyCaps').click(function(){
		$('.keyCap').toggleClass('hide');
	});
	$('#toggleKeyboardCase').click(function(){
		$('#keyboardCase').toggleClass('hide');
	});
};