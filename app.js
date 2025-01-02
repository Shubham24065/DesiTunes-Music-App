// Access global data for artists and songs
const { artists, songs } = window;

// Debugging: Log all artists and songs to the console
console.log({ artists, songs }, "App Data");

document.addEventListener("DOMContentLoaded", () => {
  const artistContainer = document.getElementById("menu");
  const songCardsContainer = document.getElementById("song-cards");
  const selectedArtist = document.getElementById("selected-artist");
  const artistLinks = document.getElementById("artist-links");

  // Generate artist buttons
  artists.forEach((artist) => {
    const button = document.createElement("button");
    button.textContent = artist.name;
    button.addEventListener("click", () => displayArtistSongs(artist));
    artistContainer.appendChild(button);
  });

  /**
   * Displays songs for the selected artist
   * @param {Object} artist - The artist object
   */
  function displayArtistSongs(artist) {
    // Update the selected artist's name
    selectedArtist.textContent = artist.name;

    // Update artist links (e.g., Instagram, YouTube)
    artistLinks.innerHTML = "";
    artist.urls.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.name;
      a.target = "_blank";
      artistLinks.appendChild(a);
      artistLinks.appendChild(document.createTextNode(" | "));
    });

    // Filter songs for the selected artist
    const filteredSongs = songs.filter((song) => song.artistId === artist.artistId);

    // Clear previous song cards
    songCardsContainer.innerHTML = "";

    // Generate and display cards for each song
    filteredSongs.forEach((song) => {
      const songCard = createSongCard(song);
      songCardsContainer.appendChild(songCard);
    });
  }

  /**
   * Creates a card element for a song
   * @param {Object} song - The song object
   * @returns {HTMLElement} - The song card element
   */
  function createSongCard(song) {
    const card = document.createElement("div");
    card.classList.add("card");

    // Add song image
    const songImg = document.createElement("img");
    songImg.src = song.imageUrl;
    songImg.alt = song.title;
    songImg.addEventListener("click", () => window.open(song.url, "_blank"));

    // Add song title
    const title = document.createElement("h3");
    title.textContent = song.title;

    // Add song year
    const year = document.createElement("time");
    year.textContent = `Year: ${song.year}`;

    // Add song duration
    const duration = document.createElement("span");
    const minutes = Math.floor(song.duration / 60);
    const seconds = song.duration % 60;
    duration.textContent = `Duration: ${minutes}:${seconds.toString().padStart(2, "0")}`;

    // Append elements to the card
    card.appendChild(songImg);
    card.appendChild(title);
    card.appendChild(year);
    card.appendChild(duration);

    return card;
  }

  // Display songs for the first artist on page load
  displayArtistSongs(artists[0]);
});
