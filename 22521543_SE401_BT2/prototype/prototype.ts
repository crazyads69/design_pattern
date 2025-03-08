// Define EntertainmentProgram interface
interface EntertainmentProgram {
  id: number;
  name: string;
  duration: number;
  genre: string;
}

// Define Movie class implementing EntertainmentProgram interface
class Movie implements EntertainmentProgram {
  // Define public properties
  public id: number;
  public name: string;
  public duration: number;
  public genre: string = "movie";

  // Define constructor
  constructor(id: number, name: string, duration: number, genre: string) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.genre = genre;
  }

  // Define clone method to clone the object
  public clone(): Movie {
    return new Movie(this.id, this.name, this.duration, this.genre);
  }
}

// Define TVShow class implementing EntertainmentProgram interface
class TVShow implements EntertainmentProgram {
  // Define public properties
  public id: number;
  public name: string;
  public duration: number;
  public genre: string = "tv_show";

  // Define constructor
  constructor(id: number, name: string, duration: number, genre: string) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.genre = genre;
  }

  // Define clone method to clone the object
  public clone(): TVShow {
    return new TVShow(this.id, this.name, this.duration, this.genre);
  }
}

// Define MusicEvent class implementing EntertainmentProgram interface
class MusicEvent implements EntertainmentProgram {
  // Define public properties
  public id: number;
  public name: string;
  public duration: number;
  public genre: string = "music_event";

  // Define constructor
  constructor(id: number, name: string, duration: number, genre: string) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.genre = genre;
  }

  // Define clone method to clone the object
  public clone(): MusicEvent {
    return new MusicEvent(this.id, this.name, this.duration, this.genre);
  }
}

// Usage
const movie = new Movie(1, "Inception", 120, "movie");
const tvShow = new TVShow(2, "Breaking Bad", 60, "tv_show");
const musicEvent = new MusicEvent(3, "Coachella", 180, "music_event");

const clonedMovie = movie.clone();
const clonedTVShow = tvShow.clone();
const clonedMusicEvent = musicEvent.clone();

// Change name of cloned movie
clonedMovie.name = "Interstellar";

// Change name of cloned TV show
clonedTVShow.name = "Game of Thrones";

// Change name of cloned music event
clonedMusicEvent.name = "Tomorrowland";

// Output
console.log("Original Movie:", movie);
console.log("Cloned Movie:", clonedMovie);

console.log("Original TV Show:", tvShow);
console.log("Cloned TV Show:", clonedTVShow);

console.log("Original Music Event:", musicEvent);
console.log("Cloned Music Event:", clonedMusicEvent);
