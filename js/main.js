window.onload = function () {
	var s = Snap(1600, 1000);
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

	var leftHalf = s.g();
	for (y=0;y<4;y++) { // столбцы
		var col = s.g();
		for (i=0;i<4;i++) { // строки
			var cap = s.circle(y*(caps*2+indent)+caps+'mm', i*(caps*2+indent)+caps+'mm', caps+'mm', caps+'mm')
				.attr({
					fill: 'rgba(185, 185, 185, 0.19)',
					stroke: '#000',
					strokeWidth: '0.1mm',
					class: 'keyCap'
				});
			if ((i+y)%2==0) {
				var switcherX = y*(caps*2+indent)+caps-switches[0].x/2+'mm';
				var switcherY = i*(caps*2+indent)+caps-switches[0].y/2+'mm';
				var switcherWidth = switches[0].x+'mm';
				var switcherHeight = switches[0].y+'mm';
			} else {
				var switcherX = y*(caps*2+indent)+caps-switches[0].y/2+'mm';
				var switcherY = i*(caps*2+indent)+caps-switches[0].x/2+'mm';
				var switcherWidth = switches[0].y+'mm';
				var switcherHeight = switches[0].x+'mm';
			};
			// switch зарезервирован в js, поэтому switcher
			var switcher = s.rect(switcherX, switcherY, switcherWidth, switcherHeight)
				.attr({
					fill: 'transparent',
					stroke: '#000',
					strokeWidth: '0.1mm',
					class: 'keySwitch'
				});
			var key = s.g(switcher, cap).attr({
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

	// buttons
	$('#svgSave').click(function(){
		saveAs(new Blob([ unescape($('svg')[0].outerHTML) ], {type:"application/svg+xml"}), "keyboard.svg")
	});
	$('#toggleKeySwitches').click(function(){
		$('.keySwitch').toggleClass('hide');
	});
	$('#toggleKeyCaps').click(function(){
		$('.keyCap').toggleClass('hide');
	});
};