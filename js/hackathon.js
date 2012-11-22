/*global $:false, ap:false */

$(function () {
    "use strict";
    
    /*
    <section id="shows-template" class=" template">
						<div class="parentCategory">
							<a href="#/3" class="">back to Shows</a>
						</div>
						<h2></h2>
						<img />
						<p></p>
					</section>
					*/
	function tmplArticle(article){
		var articleView = $('<section>').append('<div class="parentCategory"><a href="#/3" class="">back to Shows</a></div>');
			
			var heading = $('<h2>').text(article.tittel);
			articleView.append(heading);
			if(article.media && article.media.w480) {
				var image = $('<img>').attr({src: article.media.w480});
				articleView.append(image);
			}
		return articleView;
	}

	if(ap.shows){

		var articles = [];
		ap.shows.forEach(function (article) {
			articles.push(tmplArticle(article));
		});
		$('#shows').append(articles);

	}


});