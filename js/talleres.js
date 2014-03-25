var data = [
{		'id': 1,
		'taller': 'Taller de estr\u00e9s',
		'desc': '',
		'path': 'estres/',
		'images': [
		{ 	'id':1,
			'nextid':2,
			'beforeid':11,
			'real':'FH1.jpg',
			'mini':'1.jpg',
			'type':'galeria'
			
		},
		{ 	'id':2,
			'nextid':3,
			'beforeid':1,
			'real':'FH2.jpg',
			'mini':'2.jpg',
			'type':'galeria'
		},
		{ 	'id':3,
			'nextid':4,
			'beforeid':2,
			'real':'FH3.jpg',
			'mini':'3.jpg',
			'type':'galeria'
		},
		{ 	'id':4,
			'nextid':5,
			'beforeid':3,
			'real':'FH4.jpg',
			'mini':'4.jpg',
			'type':'galeria'
		},
		{ 	'id':5,
			'nextid':6,
			'beforeid':4,
			'real':'FH5.jpg',
			'mini':'5.jpg',
			'type':'galeria'
		},
		{ 	'id':6,
			'nextid':7,
			'beforeid':5,
			'real':'FH6.jpg',
			'mini':'6.jpg',
			'type':'galeria'
		},
		{ 	'id':7,
			'nextid':8,
			'beforeid':6,
			'real':'FH7.jpg',
			'mini':'7.jpg',
			'type':'galeria'
		},
		{ 	'id':8,
			'nextid':9,
			'beforeid':7,
			'real':'FH8.jpg',
			'mini':'8.jpg',
			'type':'galeria'
		},
		{ 	'id':9,
			'nextid':10,
			'beforeid':8,
			'real':'FH9.jpg',
			'mini':'9.jpg',
			'type':'galeria'
		},
		{ 	'id':10,
			'nextid':11,
			'beforeid':9,
			'real':'FH10.jpg',
			'mini':'10.jpg',
			'type':'galeria'
		},
		{ 	'id':11,
			'nextid':1,
			'beforeid':10,
			'real':'FH11.jpg',
			'mini':'11.jpg',
			'type':'galeria'
		}
	
	]
},
{
	'id':2,
	'taller': 'Taller "Ser Mujer"',
	'desc': '',
	'subt':'El reencuentro con los arquetipos femeninos.',
	'path': 'mujer1/',
	'images': [ {
		'id':1,
		'nextid':2,
		'beforeid':8,
		'real':'afiche.jpg',
		'mini':'9.jpg',
		'type':'afiche'
	},
	{ 	'id':2,
			'nextid':3,
			'beforeid':1,
			'real':'FH1.jpg',
			'mini':'1.jpg',
			'type':'galeria'
			
		},
		{ 	'id':3,
			'nextid':4,
			'beforeid':2,
			'real':'FH2.jpg',
			'mini':'2.jpg',
			'type':'galeria'
		},
		{ 	'id':4,
			'nextid':5,
			'beforeid':3,
			'real':'FH3.jpg',
			'mini':'3.jpg',
			'type':'galeria'
		},
		{ 	'id':5,
			'nextid':6,
			'beforeid':4,
			'real':'FH4.jpg',
			'mini':'4.jpg',
			'type':'galeria'
		},
		{ 	'id':6,
			'nextid':7,
			'beforeid':5,
			'real':'FH5.jpg',
			'mini':'5.jpg',
			'type':'galeria'
		},
		{ 	'id':7,
			'nextid':8,
			'beforeid':6,
			'real':'FH6.jpg',
			'mini':'6.jpg',
			'type':'galeria'
		},
		{ 	'id':8,
			'nextid':1,
			'beforeid':7,
			'real':'FH7.jpg',
			'mini':'7.jpg',
			'type':'galeria'
		}
	
	
	]
}/*,
{
	'id':3,
	'taller': 'Seminario 2',
	'desc': '',
	'path': 'mujer2/',
	'images': [
		{
		'id':1,
		'nextid':1,
		'beforeid':1,
		'real':'afiche.jpg',
		'mini':'1.jpg',
		'type':'afiche'
		}
	]
	
}*/
,
{
	'id':3,
	'taller': 'Taller de sueños',
	'desc': '',
	'path': 'sueno/',
	'images': [
		{
		'id':1,
		'nextid':1,
		'beforeid':1,
		'real':'1.jpg',
		'mini':'1.jpg',
		'type':'afiche'
		}
	]
	
},{
	'id':4,
	'taller': 'Taller de Primeros Auxilios',
	'desc': '',
	'path': 'auxilio/',
	'images': [
		{
		'id':1,
		'nextid':1,
		'beforeid':1,
		'real':'FH1.jpg',
		'mini':'p1.jpg',
		'type':'afiche'
		}
	]
	
},
{
	'id':5,
	'taller': 'Convenios',
	'desc': 'Alma-ba Terapias integrales, tiene convenios con distintas empresas, si desean formar parte de ellas, para más información escríbanos a <a href="mailto:contacto@almaba.cl">contacto@almaba.cl</a>',
	'path': 'afiche/',
	'images': [
		
	]
	
}
];

var selected = null;
var path = 'images/talleres/'
var selectedImage;
jQuery(document).ready(function(){
	/*
	for( var i = 0; i < data.images.length; i++) {
		var real = data.images[i].real;
		var mini = data.images[i].mini;
		var id = data.images[i].id;
		(new Image()).src = path + real;
		var html = '<div class="divInstMini"><img onclick="abrirModal('+id+')" class="imgInst" src="'+path+'pequenas/'+mini+'" /></div>';
		$('#divInstImage').append(html);
	}*/
	
	var html = '<h3 style="margin-left:10px;color:#666;font-size:1.5em;" class="paragraph">Galerias</h3><ul>';
	for(var i=0; i < data.length; i++) {
		var aux = data[i];
		html += '<li><a href="javascript:void(0);" style="font-size:1.3em;" id="a'+aux.id+'" class="paragraph" onclick="cargarTaller('+aux.id+');" > ' + aux.taller ;
		if(aux.subt != undefined && aux.subt != null) 
			html += '<br/><span style="font-size:11px;padding-left:13px;">' + aux.subt +'</span>';
		html += '</a></li>';
	}
	$('#contenido1').html(html);
	jQuery('#modalImagen').overlay({ mask: { color: '#000', loadSpeed: 200, opacity: 0.8},
		closeOnClick: false, closeOnEsc: true,left:"center",top:'5%'}); 
	
	$('.prev').click(function() {
		if(selectedImage != null) 
			cargarImagen(selectedImage.beforeid);
	})
	$('.next').click(function() {
		if(selectedImage != null) 
			cargarImagen(selectedImage.nextid);
	})
	
	$(document).keydown(function(e){
		if (e.keyCode == 37 || e.keyCode == 39) { 
			if(jQuery('#modalImagen').overlay().isOpened()) {
				if(e.keyCode == 37)
					jQuery('#prev').click();
				else
					jQuery('#next').click();
				return false;
			}
		}
	});
	$('#a1').click();
});

function cargarTaller(id) {
	
	for(var i = 0; i < data.length; i++) {
		if(data[i].id == id) {
			selected = data[i];
			break;
		}
	}
	var html = '';
	$('#textoTaller').html(selected.desc);
	for( var i = 0; i < selected.images.length; i++) {
		var real = selected.images[i].real;
		var mini = selected.images[i].mini;
		var id = selected.images[i].id;
		var carpeta = selected.path;
		(new Image()).src = path+carpeta+ real;
		html += '<div class="divTallerMini"><img onclick="abrirModal('+id+')" width="63" class="imgInst" src="'+path+carpeta+'mini/'+mini+'" /></div>';
	}
	$('#divTalleresImg').html(html);
}

function abrirModal(id) {
	cargarImagen(id);
	jQuery('#modalImagen').overlay().load();
}

function cargarImagen(id) {
	for( var i = 0; i < selected.images.length; i++) {
		if(id == selected.images[i].id) {
			selectedImage = selected.images[i];
			var real = selected.images[i].real;
			var carpeta = selected.path;
			var html = '<img class="imgInst" src="'+path+carpeta+real+'" />';
			if(selectedImage.type == 'galeria') {
				$('#modalImagen').removeClass('bigModal');
				$('#modalImagen').addClass('normalModal');
				$('#innerModalTaller').removeClass('bigInnerModal');
				$('#innerModalTaller').addClass('innerModal');
			} else {
				$('#modalImagen').removeClass('normalModal');
				$('#modalImagen').addClass('bigModal');
				$('#innerModalTaller').addClass('bigInnerModal');
				$('#innerModalTaller').removeClass('innerModal');
			}
			resize();

			jQuery('#innerModalTaller').html(html);
			break;
		}
	}
}

function resize() {
	var wWidth = $(window).width();
	var mWidth = $('#modalImagen').width();
	var dif = (wWidth - mWidth) / 2;
	jQuery('#modalImagen').css('left',dif+'px');
}