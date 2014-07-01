/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function(config){
	config.title = false;
	config.allowedContent = true;
	config.extraPlugins = 'upload,audio,video,linker,mathjax';
	config.toolbar = [
		{ name: 'document', items: ['Templates' ] },
		{ name: 'clipboard', items: [ 'Undo', 'Redo' ] },
		{ name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', '-', 'RemoveFormat' ] },
		{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
		{ name: 'links', items: ['Linker', 'Unlink'] },
		{ name: 'insert', items: ['Table', 'Smiley', 'SpecialChar', 'Upload', 'Audio', 'Video', 'Mathjax'] },
		{ name: 'styles', items: ['Format', 'Font', 'FontSize'] }
	];

	config.linkShowAdvancedTab = false;
	config.linkShowTargetTab = false;

	config.allowedContent = true;

	config.smiley_images= [];
	config.smiley_descriptions= [];

	var moodsPath = $('head')
		.children('link')
		.attr('href')
		.split('/theme.css')[0] + '/../img/icons/';

	config.smiley_path = moodsPath;
	config.smiley_images= ['angry-panda-small.png', 'dreamy-panda-small.png', 'happy-panda-small.png',
	'joker-panda-small.png', 'love-panda-small.png', 'proud-panda-small.png', 'sad-panda-small.png',
	'tired-panda-small.png', 'worried-panda-small.png'];
	config.smiley_descriptions= ['En colère', 'Rêveur', 'Content', 'Farceur', 'Amoureux',
	'Fier', 'Triste', 'Fatigué', 'Embêté'];
	config.templates_replaceContent = false;
	config.font_names = 'Arial;Times New Roman;Verdana;EcritureA;KGJune;Comic Sans MS';
	config.fontSize_sizes = "8/8px;10/10px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px";
};
