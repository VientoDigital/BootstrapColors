$(function() {
	'use strict';
	$('input[type=text]').prev('label').before('<div class="bootstrap-color"></div>');
	$('input[type=text]').bootstrapColor();
	$('input[type=text]').on('keyup',function(){
		$(this).bootstrapColor();
	});

	$('input[type=text]').colpick({
		layout:'rgbhex',
		submit:true,
		colorScheme:'light',
		onSubmit:function(hsb,hex,rgb,el,bySetColor) {
			$(el).css('border-color','#'+hex);
			$(el).css('border-width','3px');
		if(!bySetColor) {
			$(el).val('#'+hex);
			$('input[type=text]').bootstrapColor();
		}	
	}}).keyup(function(){
		$(this).colpickSetColor(this.value);
	});

});

(function($){
	'use strict';

	var COLORS = {
		legalColors : /^[#|rgb|hsl|AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGrey|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|Darkorange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkSlateGrey|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DimGrey|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Grey|Green|GreenYellow|HoneyDew|HotPink|IndianRed |Indigo |Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGrey|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSlateGrey|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|SlateGrey|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen]/i,
		lessColors : ['@blue','@green','@red','@yellow','@orange','@pink','@purple','@linkColor','@linkColorHover','@textColor','@black','@grayDarker','@grayDark','@gray','@grayLight','@grayLighter','@white','@heroUnitHeadingColor','@heroUnitLeadColor','@navbarBackground','@navbarBackgroundHighlight','@navbarText','@navbarBrandColor','@navbarLinkColorActive','@navbarLinkColorHover','@navbarLinkBackgroundActive','@navbarLinkBackgroundHover','@navbarSearchBackground','@navbarSearchBackgroundFocus','@navbarSearchBorder','@navbarSearchPlaceholderColor','@dropdownBackground','@dropdownBorder','@dropdownLinkColor','@dropdownLinkColorHover','@dropdownLinkBackgroundHover','@tableBackground','@tableBackgroundAccent','@tableBackgroundHover','@tableBorder','@placeholderText','@inputBackground','@inputBorder','@inputDisabledBackground','@formActionsBackground','@btnPrimaryBackground','@btnPrimaryBackgroundHighlight','@warningText','@warningBackground','@errorText','@errorBackground','@successText','@successBackground','@infoText','@infoBackground','@body-bg', '@code-color', '@code-bg', '@pre-color', '@pre-bg', '@pre-border-color', '@brand-primary', '@brand-success', '@brand-warning', '@brand-danger', '@brand-info', '@text-color', '@link-color', '@link-color-hover', '@component-active-bg', '@btn-default-color', '@btn-default-bg', '@btn-default-border', '@btn-success-color', '@btn-success-bg', '@btn-success-border', '@btn-primary-color', '@btn-primary-bg', '@btn-primary-border', '@btn-warning-color', '@btn-warning-bg', '@wbtn-warning-border', '@btn-info-color', '@btn-info-bg', '@btn-info-border', '@btn-danger-color', '@btn-danger-bg', '@btn-danger-border', '@btn-hover-color', '@state-success-text', '@state-success-bg', '@state-success-border', '@state-warning-text', '@state-warning-bg', '@state-warning-border', '@state-danger-text', '@state-danger-bg', '@state-danger-border', '@state-info-text', '@state-info-bg', '@state-info-border', '@alert-text', '@alert-bg', '@alert-border', '@alert-danger-text', '@alert-danger-bg', '@alert-danger-border', '@alert-success-text', '@alert-success-bg', '@alert-success-border', '@alert-info-text', '@alert-info-bg', '@alert-info-border', '@navbar-default-color', '@navbar-default-bg', '@navbar-inverse-color', '@navbar-inverse-bg', '@navbar-inverse-link-color', '@navbar-inverse-link-hover-color', '@navbar-inverse-link-hover-bg', '@navbar-default-link-color', '@navbar-default-link-hover-color', '@navbar-default-link-hover-bg', '@navbar-default-link-active-color', '@navbar-default-link-active-bg', '@navbar-default-link-disabled-color', '@navbar-default-link-disabled-bg', '@navbar-default-brand-color', '@navbar-default-brand-hover-color', '@navbar-default-brand-hover-bg', '@navbar-default-toggle-hover-bg', '@navbar-default-toggle-icon-bar-bg', '@navbar-default-toggle-border-color', '@navbar-inverse-color', '@navbar-inverse-bg', '@navbar-inverse-link-color', '@navbar-inverse-link-hover-color', '@navbar-inverse-link-hover-bg', '@navbar-inverse-link-active-color', '@navbar-inverse-link-active-bg', '@navbar-inverse-link-disabled-color', '@navbar-inverse-link-disabled-bg', '@navbar-inverse-brand-color', '@navbar-inverse-brand-hover-color', '@navbar-inverse-brand-hover-bg', '@navbar-inverse-toggle-hover-bg', '@navbar-inverse-toggle-icon-bar-bg', '@navbar-inverse-toggle-border-color', '@nav-link-hover-bg', '@nav-disabled-link-color', '@nav-disabled-link-hover-color', '@nav-open-link-hover-color', '@nav-open-caret-border-color', '@nav-pills-active-link-hover-color', '@nav-pills-active-link-hover-bg', '@nav-tabs-active-link-hover-color', '@nav-tabs-active-link-hover-bg', '@nav-tabs-active-link-hover-border-color', '@nav-tabs-justified-link-border-color', '@nav-tabs-justified-active-link-border-color', '@table-bg', '@table-bg-accent', '@table-bg-hover', '@table-border-color', '@input-color', '@input-bg', '@input-border', '@legend-color', '@legend-border-color', '@input-color', '@input-bg', '@input-border', '@input-bg-disabled', '@input-color-placeholder', '@legend-color', '@legend-border-color', '@input-group-addon-bg', '@input-group-addon-border-color', '@dropdown-bg', '@dropdown-border', '@dropdown-fallback-border', '@dropdown-caret-color', '@dropdown-divider-bg', '@dropdown-link-color', '@dropdown-link-hover-color', '@dropdown-link-hover-bg', '@dropdown-link-active-color', '@dropdown-link-active-bg', '@dropdown-link-disabled-color', '@panel-bg', '@panel-inner-border', '@panel-footer-bg', '@panel-default-text', '@panel-default-border', '@panel-default-heading-bg', '@panel-primary-text', '@panel-primary-border', '@panel-primary-heading-bg', '@panel-success-text', '@panel-success-border', '@panel-success-heading-bg', '@panel-info-text', '@panel-info-border', '@panel-info-heading-bg', '@panel-warning-text', '@panel-warning-border', '@panel-warning-heading-bg', '@panel-danger-text', '@panel-danger-border', '@panel-danger-heading-bg', '@well-bg', '@accordion-border-bg', '@badge-color', '@badge-bg', '@badge-link-hover-color', '@badge-active-color', '@badge-active-bg', '@breadcrumb-color', '@breadcrumb-bg', '@breadcrumb-active-color', '@jumbotron-bg', '@jumbotron-color', '@jumbotron-heading-color', '@modal-content-bg', '@modal-backdrop-bg', '@modal-backdrop-bg', '@modal-content-border-color', '@modal-header-border-color', '@modal-content-fallback-border-color', '@modal-backdrop-bg', '@modal-header-border-color', '@carousel-control-color', '@carousel-indicator-border-color', '@carousel-indicator-active-bg', '@carousel-caption-color', '@list-group-bg', '@list-group-hover-bg', '@list-group-active-bg', '@list-group-border', '@list-group-active-border', '@list-group-active-color', '@thumbnail-bg', '@thumbnail-caption-padding', '@thumbnail-border', '@progress-bg', '@progress-bar-warning-bg', '@progress-bar-color', '@progress-bar-bg', '@progress-bar-danger-bg', '@progress-bar-success-bg', '@progress-bar-info-bg', '@pagination-bg', '@pagination-active-color', '@pagination-border', '@pagination-disabled-color', '@pagination-active-bg', '@pager-disabled-color', '@label-default-bg', '@label-primary-bg', '@label-success-bg', '@label-info-bg', '@label-warning-bg', '@label-danger-bg', '@tooltip-color', '@tooltip-bg', '@tooltip-arrow-color', '@popover-bg', '@popover-title-bg', '@popover-arrow-outer-fallback-color', '@popover-arrow-color', '@popover-arrow-outer-color', '@popover-border-color', '@popover-fallback-border-color', '@close-color', '@text-muted', '@headings-small-color', '@blockquote-border-color', '@abbr-border-color', '@blockquote-small-color', '@page-header-border-color', '@hr-border', '@gray-darker', '@gray-dark', '@gray-light', '@gray-lighter', '@ddd', '@fff'],
		grays : {
			'@black':                 '#000',
			'@grayDarker':            '#222',
			'@grayDark':              '#333',
			'@gray':                  '#555',
			'@grayLight':             '#999',
			'@grayLighter':           '#eee',
			'@white':                 '#fff',
			'@gray-darker':           '#222',
			'@gray-dark':             '#333',
			'@gray-light':            '#999',
			'@gray-lighter':          '#eee',
			'@ddd':                   '#ddd',
			'@fff':                   '#fff',
		}
	};

	$.fn.bootstrapColor = function() {

		this.each(function() {
			var color = $(this).val().length > 0 ? $(this).val() : '',
			i = COLORS.lessColors.indexOf(color),
			label,
			pattern,
			labelText;

			if(i >= 0) {
				if(COLORS.grays[color]) {
					color = COLORS.grays[color];
				}
				else {
					color = $('label:contains('+COLORS.lessColors[i]+')').css('color');
				}
			}
			label = $(this).prev('label');
			pattern = $(label.prev('div'));
			labelText = label.text();
			$(label).css('color',color);
			$(label).css('text-shadow','0px 0px 1px #999');
			pattern.css('background-color',color);
		});
		return this;
	};
})(jQuery);
