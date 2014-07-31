/*!
 *
 * jQuery linksToSelect
 *
 * Converts a group of links to a select
 *
 * @author 			Tim Bennett
 * @version 		1.0
 *
 * Download the latest version at www.texelate.co.uk/lab/links-to-select/
 *
 * Open source under the MIT license:
 *
 * Copyright (c) 2014 Tim Bennett, Texelate Ltd, www.texelate.co.uk
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
;(function($){

	$.fn.linksToSelect = function(options) {  
	
		/**
		 * Defaults
		 */
		var defaults = {  
			
			dataSelectDefault: 		'select-default',				// Acts as a default empty option  E.g. -- Please choose --
			disabledClass: 			'links-to-select-disable',		// If this class is present the option is disabled
			ignoredClass: 			'links-to-select-ignore',		// If this class is present the option is ignored
			selectedClass: 			'links-to-select-selected',		// If this class is present the option is set as selected
			idPrefix: 				'links-to-select-',				// Each select has this plus the selector number  E.g. links-to-select-3
			selectClass: 			'links-to-select'				// Each select is wrapped in a div  E.g. <div class="links-to-select"><select.../select></div>
			
		};
		
		
		/**
		 * Options
		 */
		var options = $.extend(defaults, options);
		
		
		/**
		 * Element counter
		 */
		var elementCounter = 1;
		
		
		/**
		 * Warning prefix
		 */
		var warningPrefix = 'linksToSelect Warning: ';


		/**
		 * Return each object
		 */
		return this.each(function() {
		
		
			/**
			 * Cache element(s)
			 */
			var $this = $(this);
			
			
			/**
			 * Start off the drop down
			 */
			var newElement = '<div id="' + options.idPrefix + elementCounter + '" class="' + options.selectClass + '"><select id="select-' + options.idPrefix + elementCounter + '" class="' + options.selectClass + '">';
			
			
			/**
			 * Add the select default, if any
			 */
			if(options.dataSelectDefault != '') {
			
				if($this.data(options.dataSelectDefault) && $this.data(options.dataSelectDefault) != '') {
				
					newElement += '<option value="">' + $this.data(options.dataSelectDefault) + '</option>';
				
				}
			
			}
			
			
			/**
			 * Count number of links added
			 */
			var linksAdded = 0;
			
			
			/**
			 * Go through each link
			 */
			$this.find('a')
			     .each(function() {
			
				// Add the link
				linksAdded++;
				
				// Cache element
				var $link = $(this);
				
				// Check for ignore class
				if($link.hasClass(options.ignoredClass) === false) {
				
					// Issue a warning if the href is invalid
					if($link.attr('href') == '' || typeof $link.attr('href') === 'undefined') {
					
						console.log(warningPrefix + 'Invalid link detected for select #' + elementCounter);
					
					}
				
					// Start off option - note we don't encode this as you would assume it's already encoded
					newElement += '<option value="' + $link.attr('href') + '"';
					
					// Check for disabled class, then selected
					if($link.hasClass(options.disabledClass) === true) {
					
						newElement += ' disabled';
					
					}
					else if($link.hasClass(options.selectedClass) === true) {
					
						newElement += ' selected';
					
					}
					
					// Finish option - don't convert special hcars for the same reason as above
					newElement += '>' + $link.html() + '</option>';
				
				}
			
			});
			
			
			/**
			 * Issue a warning if no link is added
			 */
			if(linksAdded === 0) {
			
				console.log(warningPrefix + 'No links added for select #' + elementCounter);
				
			}
			
			
			/**
			 * Finish off the drop down
			 */
			newElement += '</select></div>';
			 
			 
			/**
			 * Append it to the document
			 */
			$this.after(newElement);
			
			
			/**
			 * Add the event listener
			 */
			$('select#select-' + options.idPrefix + elementCounter).on('change', function() {

	           // Update the URL
	           window.location.href = $(this).val();
			            
			});
			 
			 
			/**
			 * Increment the element counter
			 */
			elementCounter ++;
		
		});			
	
	};

})(jQuery);