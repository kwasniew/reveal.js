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
		var articleView = $('<section>').append('<div class="parentCategory"><a href="#/'+
			category+'" class="">back to '+
			categoryText+'</a></div>');
			
			var heading = $('<h4 class="jqModal articleTitle">').html(article.tittel);
			articleView.append(heading);
			if(article.media && article.media.w480) {
				var image = $('<img class="jqModal">').attr({src: article.media.w480});
				articleView.append(image);
			}
			articleView.append($('<div class="hidden articleLink"></div>').append('http://www.corsproxy.com/'+article.jsonnewsml.substring(7)));
			if(i+1 < limit){
				articleView.append('<div class="seeNext"><a href="#/'+category+'/'+(i+2)+
				'">see next</a></div>');
			}else{
				articleView.append('<div class="seeNext"><a href="#/'+category+
				'">back to top</a></div>');
			}
			
		return articleView;
	}


	function appendArticles(list, name, text, showsColumn){
		var articles = [];
		var length = list.length;
		list.forEach(function (article, i) {
			article.bodycontent = "<p>Ny T-banelinje fra \u00d8kern til Furuset og videre til Ahus blir for dyrt for Oslo. Ruter ansl\u00e5r at det vil koste over 20 milliarder kroner tilsammen \u00e5 bygge det T-banenettet befolkningen har behov for de neste \u00e5rene (se faktaramme).<\/p><p>- Der m\u00e5 staten ta et st\u00f8rre ansvar. Tunge investeringer som T-bane til Fornebu og Ahus er noe vi ikke klarer med kommunale budsjetter, og staten b\u00f8r engasjere seg sterkere. Det er ogs\u00e5 god milj\u00f8politikk, men vi klarer ikke ta det alene, sier Vinje.<\/p><p>L\u00f8rensvingen, som er ansl\u00e5tt \u00e5 koste en milliard kroner, l\u00e5ner Oslo kommune penger til.<\/p><p>- Oslo har satset p\u00e5 kollektivnett i veldig mange \u00e5r, men det har kostet, og staten b\u00f8r v\u00e6re med p\u00e5 \u00e5 bidra. Det enorme investeringsbehovet kan jeg ikke se hvordan Oslo ellers skal kunne m\u00f8te. Og det tror jeg de begynner \u00e5 skj\u00f8nne, sier Vinje.<\/p><p>Hvis kollektivnettet ikke bygges ut, vil det bli enda tettere k\u00f8er p\u00e5 veiene inn og ut av Oslo. Og det er ikke bare Oslos problem at veiene ikke kan ta av for trafikken. B\u00e5de E6, E18, Trondheimsveien, riksvei 150 og riksvei 190 er Statens vegvesens ansvar.<\/p><p>- Det er riksveiene, statens veier, det kommer til \u00e5 g\u00e5 mest utover, sier Vinje.<\/p><h2>Flinke oslofolk<\/h2><p>Byutviklingsbyr\u00e5d B\u00e5rd Folke Fredriksen h\u00e5per Akershus ogs\u00e5 blir med p\u00e5 kollektivplanene.<\/p><p>- Oslofolk er flinke til \u00e5 bruke kollektivtrafikken. V\u00e5re pendlere er dessverre ikke det i like stor grad. Men derfor samarbeider vi med Akershus for \u00e5 se hele omr\u00e5det under ett. Oslo og Akershus er ett bolig- og arbeidsmarked, sier Fredriksen.<\/p><p>Fornebubanen, T-baneforbindelsen til Fornebu, kan f\u00e5 stoppesteder vestover som gj\u00f8r at det kan bygges tettere for eksempel mellom Sk\u00f8yen og V\u00e6ker\u00f8. Ogs\u00e5 der m\u00e5 staten v\u00e6re med og spleise, mener Vinje.<\/p><p>- Akkurat hvor traseene g\u00e5r og stasjonene blir liggende, skal vi v\u00e6re \u00e6rlige og si at vi er i startfasen p\u00e5.<\/p><h2>Staten lover ingenting<\/h2><p>I Groruddalen, der det er planlagt utbygging av mellom 30.000 og 50.000 boliger, har politikerne planlagt en linje som g\u00e5r p\u00e5 tvers. Ruter mener den b\u00f8r g\u00e5 fra \u00d8kern og Furuset, og etter hvert videre til Ahus. Dette blir den aller dyreste nye strekningen.<\/p><p>- Det er naturlig at staten er med. Erfaringene fra byggingen av T-baneringen viser at investeringer i kollektivtrafikk f\u00f8rer til betydelig boligbygging langs traseen, sier Fredriksen.<\/p><p>Men staten, ved Samferdselsdepartementet, kan ikke love Oslo penger til milliardutbyggingen.<\/p><p>- Regjeringen er i sluttfasen i arbeidet med ny Nasjonal transportplan. Disse sp\u00f8rsm\u00e5lene m\u00e5 vi komme tilbake til ved fremleggelse v\u00e5ren 2013, sier statssekret\u00e6r Lars Erik Bartnes.<\/p><p>Oslopakke tre er 75 milliarder kroner som skal brukes p\u00e5 veier og kollektivtrafikk i Oslo og Akershus, og det er allerede et samarbeid mellom staten, Oslo og Akershus, i tillegg til bompenger.<\/p><p>Oslopakke 3-pengene skal brukes til \u00e5 forlenge Operatunnelen vestover, slik at det kan bygges boliger p\u00e5 Filipstad. N\u00e5r Manglerudtunnelen bygges, en snarvei fra E6 s\u00f8rover til E6 nordover, vil det kunne bygges boliger n\u00e6rmere Ring 3.<\/p>";
			articles.push(tmplArticle(article, showsColumn, text,  i, length));
		});
		$(name).append(articles);

		//list.length = 3;

	}


    var forsidePromise = $.getJSON('http://www.corsproxy.com/lisa.aftenposten.no/win8tabletfeeds/?publication=ap&section=sectionFeedForside&n=20', function(data) {
        ap.forside = data.seksjon.filter(function(data) {
            return data.media.w480 !== undefined && data.media.w480.length > 0;
        });
        if(ap.forside){
            ap.forside.length = 10;
            appendArticles(ap.forside, '#forside', "Forside", 1);
        }
    }, function() {
        if(ap.forside){
            appendArticles(ap.forside, '#forside', "Forside", 1);
        }

    });

    var kulturPromise = $.getJSON('http://www.corsproxy.com/lisa.aftenposten.no/win8tabletfeeds/?publication=ap&section=sectionFeedKultur&n=20', function(data) {
        ap.kultur = data.seksjon.filter(function(data) {
            return data.media.w480 !== undefined && data.media.w480.length > 0;
        });
        if(ap.kultur){
            ap.kultur.length = 10;
            appendArticles(ap.kultur, '#kultur', "Kultur", 3);
        }
    }, function() {
        if(ap.kultur){
            appendArticles(ap.kultur, '#kultur', "Kultur", 3);
        }

    });

    var sportPromise = $.getJSON('http://www.corsproxy.com/lisa.aftenposten.no/win8tabletfeeds/?publication=ap&section=sectionFeedSport&n=20', function(data) {
        ap.sport = data.seksjon.filter(function(data) {
            return data.media.w480 !== undefined && data.media.w480.length > 0;
        });
        if(ap.sport){
            ap.sport.length = 10;
            appendArticles(ap.sport, '#sport', "Sport", 2);
        }
    }, function() {
        if(ap.sport){
            appendArticles(ap.sport, '#sport', "Sport", 2);
        }

    });


    $.when.apply($, [forsidePromise, kulturPromise, sportPromise]).done(function () {

        }).always(function(){
        	// Full list of configuration options available here:
			// https://github.com/hakimel/reveal.js#configuration
			Reveal.initialize({
				controls: false,
				progress: false,
				history: true,
				center: true,
				rollingLinks: false,
                //transition: 'default',//concave/zoom/linear/none

				theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
				transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/none

				// Optional libraries used to extend on reveal.js
				dependencies: [
					{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
					
					{ src: 'plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } }
				]
			});



        	 var myOpen = function(dialog) {
                 var link = $("section.present section.present").first().find('.articleLink').text();
                 var title = $("section.present section.present").first().find(".articleTitle").text();

                 $.getJSON(link, function(data) {
                     var html = data.bodycontent;
                     console.log(html);
                     $("#article").html(html);
                     $("#articleTitle").html(title);
                     dialog.w.show();
                 });
                };
                $("#dialog").jqm({onShow: myOpen});

                $(".logo").click(function() {
                    Reveal.toggleOverview();
                });
        });










});