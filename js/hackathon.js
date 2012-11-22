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

	function tmplArticle(article, category, categoryText,  i, limit){
		var articleView = $('<section class="jqModal">').append('<div class="parentCategory"><a href="#/'+
			category+'" class="">back to '+
			categoryText+'</a></div>');
			
			var heading = $('<h2>').text(article.tittel);
			articleView.append(heading);
			if(article.media && article.media.w480) {
				var image = $('<img>').attr({src: article.media.w480});
				articleView.append(image);
			}
			articleView.append('<div class="hidden preview">'+article.description+'</div>');
			if(i+1 < limit){
				articleView.append('<div class="parentCategory"><a href="#/'+category+'/'+(i+2)+
				'" class="">see next</a></div>');
			}else{
				articleView.append('<div class="parentCategory"><a href="#/'+category+
				'" class="">back to top</a></div>');
			}
			
		return articleView;
	}

	function appendArticles(list, name, text, showsColumn){
		var articles = [];
		var length = list.length;
		list.forEach(function (article, i) {
			articles.push(tmplArticle(article, showsColumn, text,  i, length));
		});
		$(name).append(articles);
	}


	if(ap.shows){
		appendArticles(ap.shows, '#shows', "Shows", 3);
	}

	if(ap.forside){
		appendArticles(ap.forside, '#forside', "Forside", 1);
	}


	if(ap.sport){
		appendArticles(ap.sport, '#sport', "Sport", 1);
	}


});