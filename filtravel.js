/*********************************************************
*	A simple way to filter page's elements
*
*	With this plugin, you can search and filter elements
* of a page, showing or hiding him, by typing any text.
*
**********************************************************/

(function($){
$.fn.filtravel = function(options){
    var settings = $.extend({
                    filterString:"Filter: ",
                    searchOn:"fVal",
                    inputFilterId:"_inputTextFiltravel",
                    byClass: false,
					placeholder:"Type any text",
                    ignoreCase: true
                    }, options);

    var targetObj = this;
    
    function createInputFilter(){
		var inputHTML = settings.filterString
                    + '<input type="text" placeholder="'+settings.placeholder+'"'
		            +   'id="'+settings.inputFilterId+'" />';

        targetObj.html(inputHTML + '<br />' + targetObj.html());
        // set the function used to match the texts
        if (settings.ignoreCase){
            matchFunction = matchIgnoreCase;
        }else{
            matchFunction = match;
        }
        $('#'+settings.inputFilterId).keyup(function(){
                var typedText = $(this).val();
                search(typedText, matchFunction);
        });
    }
    
    function match(elementText, typedText){
        return elementText.match(typedText);
    }
    
    function matchIgnoreCase(elementText, typedText){
        var regex = new RegExp(typedText, "i");
        return (regex.exec(elementText));
    }
    
	function searchOnASpecificElement(element, text){
    	var elementText = element.attr(settings.searchOn);
		if (elementText){
        	if (matchFunction(elementText, text)){
            	element.show();
            }else{
                element.hide();
            }
        }
	}


    function search(text, matchFunction){
        targetObj.children().each(function(){
			searchOnASpecificElement($(this));
        });
		if (settings.byClass !== false){
			$('.' + settings.byClass).each(function(){
				searchOnASpecificElement($(this), text);
			});
		}
    }
    
    createInputFilter();
};
}(jQuery));
