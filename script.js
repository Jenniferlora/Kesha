console.log("Script.js linked!");
// https://itunes.apple.com/search?parameterkeyvalue
// key1=value1&key2=value2&key3=value3
// https://itunes.apple.com/search?term=ke$ha&media=music&entity=album

// ex:https://itunes.apple.com/lookup?amgArtistId=2035613&entity=song&limit=5&sort=recent
// https://itunes.apple.com/search?term=ke$ha&media=music&entity=album&limit=5&sort=recent

// 1. The first section should render an *unordered list* of all of her albums.  Give this section a header that says "Ke$ha's Albums!" with an 'aqua' background.

// https://playwave.herokuapp.com/



function renderAll() {
	$.ajax({
		type: "GET",
		url: 'https://playwave.herokuapp.com/ke$ha',
		contentType: "application/json",
		dataType: "json",
		success: function(response) {
			for(let i =0; i < response.data.length; i++){
        const song_name = `${response.data[i].artist.name} - ${response.data[i].title_short}`
        const song_image = response.data[i].album.cover_medium
        const mp3snippet =response.data[i].preview
        
        const song_template = document.createElement('div')
        
        const template =
          `
          <div class="album-wrapper">
          <div class="shadow-layer"></div>
          <img src="${song_image}" alt="">
          <div class="bottom-panel">
          <div class="song-title">
          ${song_name}
          </div>
          <div class="btn-wrapper">
          <button class="play">
          <img src="https://img.icons8.com/ios-glyphs/50/000000/play--v1.png"/>
          </button>
          </div>
          </div>
          </div>
          `
          
          song_template.innerHTML = template
          
          song_template.onclick = function(){
            $('.player').show()
            const audio = document.querySelector('.player')

            $('.source-reader').attr("src", mp3snippet);
            audio.pause();
            audio.load()
            audio.play();
          }
      
          $("#first").append(song_template)
      
      }


		},
		error: function(response) {
				console.log(response);
		}
})
kidFriendly()
}

// 2. The second section should render images of her albums *that are not explicit* (gotta protect the children).  Albums that are explicit should not be rendered.  Give this section a header that says "Ke$ha's Kid Friendly Jams" and a background that is 'rebeccapurple'.

async function kidFriendly () {
  await $.ajax({
		type: "GET",
		url: 'https://itunes.apple.com/search?term=ke$ha&media=music&entity=album',
		contentType: "application/json",
		dataType: "json",
    success: function(data){
      const albums = data.results


      var $second = $("<div>").attr("id", "second");
      $("body").append($second);
      mostRecent();
      albums.forEach(function (album) {
        if (album.collectionExplicitness === "notExplicit") {
          // console.log(album.collectionName + album.releaseDate);
          var albumImage = album.artworkUrl100;
          // console.log(albumImage);
    
          var $albumCovers = $("<div>").attr("class", "covers kid");
          $albumCovers.data = album.collectionName;
          $albumCovers.css("background-image", `url(${albumImage})`);
          // console.log($albumCovers);
          $second.append($albumCovers);
        }
      });
    
    },
    error: function(err){
      console.log("error occured", err);
    }
  })
}

// 3. The third section should return her 5 most recent tracks.  Give this section a header that says "Ke$ha's Latest Hits".
function mostRecent() {
  $.ajax({
    method: "GET",
    url: "https://itunes.apple.com/search?term=ke$ha&media=music&entity=song&sort=recent&limit=5",
    dataType: "JSONP",
    success: function (data) {
      // console.log(data);
      var $header = $("<h1>", { text: ` Ke$ha's Latest Hits` }).attr('class', 'kesha-albums')
      $("body").append($header);
      var $third = $("<div>").attr("id", "third");
      $("body").append($third);

      var recentSongs = data.results;
      recentSongs.forEach(function (song) {
        var songImage = song.trackViewUrl;
        console.log(songImage);

        var $albumCovers = $("<div>").attr("class", "covers recent");
        $albumCovers.text(song.trackName);
        $albumCovers.attr("data", song.trackName);

        $albumCovers.css(
          "background-image",
          `url(https://cdn3.iconfinder.com/data/icons/buttons/512/Icon_3-512.png`
        );
        $albumCovers.on("click", playsong);
        // console.log($albumCovers);
        $third.append($albumCovers);
      });
    },
  });
}

//Trying to add song snippet.
function playsong(event) {
  var song = event.target.data;
  // console.log(song);
}

renderAll();
