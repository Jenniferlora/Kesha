console.log('Script.js linked!');
// https://itunes.apple.com/search?parameterkeyvalue
// key1=value1&key2=value2&key3=value3
// https://itunes.apple.com/search?term=ke$ha&media=music&entity=album

// ex:https://itunes.apple.com/lookup?amgArtistId=2035613&entity=song&limit=5&sort=recent
// https://itunes.apple.com/search?term=ke$ha&media=music&entity=album&limit=5&sort=recent

// 1. The first section should render an *unordered list* of all of her albums.  Give this section a header that says "Ke$ha's Albums!" with an 'aqua' background.

function renderAll() {
	$.ajax({
		method: 'GET',
		url: 'https://itunes.apple.com/search?term=ke$ha&media=music&entity=album',
		dataType: 'JSONP',
		success: function(data) {
			console.log(data);

			const albums = data.results;
			console.log(albums);

			var $body = $('body');
			var $first = $('<div>').attr('id', 'first');
			$body.append($first);

			var $header = $('<header>', { text: `Ke$ha's Albums!` });
			$first.append($header);

			var $list = $('<ul>');
			$list.attr('id', 'list');
			$first.append($list);

			console.log($body);
			console.log($list);
			console.log($header.text());

			albums.forEach(function(album) {
				var albumName = album.collectionName;
				var $listItem = $('<li>');
				$listItem.text(albumName);
				$list.append($listItem);
			});
			kidFriendly(albums);
		},
	});
}

// 2. The second section should render images of her albums *that are not explicit* (gotta protect the children).  Albums that are explicit should not be rendered.  Give this section a header that says "Ke$ha's Kid Friendly Jams" and a background that is 'rebeccapurple'.

function kidFriendly(albums) {
	var $header = $('<header>', { text: ` Ke$ha's Kid Friendly Jams` });
	$('body').append($header);
	var $second = $('<div>').attr('id', 'second');
	$('body').append($second);
	mostRecent();
	albums.forEach(function(album) {
		if (album.collectionExplicitness === 'notExplicit') {
			console.log(album.collectionName + album.releaseDate);
			var albumImage = album.artworkUrl100;
			console.log(albumImage);

			var $albumCovers = $('<div>').attr('class', 'covers kid');
			$albumCovers.data = album.collectionName;
			$albumCovers.css('background-image', `url(${albumImage})`);
			console.log($albumCovers);
			$second.append($albumCovers);
		}
	});
}

// 3. The third section should return her 5 most recent tracks.  Give this section a header that says "Ke$ha's Latest Hits".
function mostRecent() {
	$.ajax({
		method: 'GET',
		url:
			'https://itunes.apple.com/search?term=ke$ha&media=music&entity=song&sort=recent&limit=5',
		dataType: 'JSONP',
		success: function(data) {
			console.log(data);
			var $header = $('<header>', { text: ` Ke$ha's Latest Hits` });
			$('body').append($header);
			var $third = $('<div>').attr('id', 'third');
			$('body').append($third);
			console.log(data);
			var recentSongs = data.results;
			recentSongs.forEach(function(song) {
				var songImage = song.trackViewUrl;
				console.log(songImage);

				var $albumCovers = $('<div>').attr('class', 'covers recent');
				$albumCovers.text(song.trackName);
				$albumCovers.attr('data', song.trackName);
				var pic = song.artworkUrl60;
				$albumCovers.css(
					'background-image',
					`url(https://cdn3.iconfinder.com/data/icons/buttons/512/Icon_3-512.png`
				);
				$albumCovers.on('click', playsong);
				console.log($albumCovers);
				$third.append($albumCovers);
			});
		},
	});
}
//Trying to add song snippet.
function playsong(event) {
	var song = event.target.data;
	console.log(song);
}

renderAll();
