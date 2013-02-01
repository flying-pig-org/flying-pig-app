'use strict';

/* Services */

angular.module('faqServices', ['ngResource']).
	factory('Faq', function($resource){
		return $resource('data/faq.json', {}, {
			query: {method:'GET'}

		});
	});


angular.module('stateServices', ['ngResource']).
	factory('State', function() {
		var State = {
		}
		return State;
	});