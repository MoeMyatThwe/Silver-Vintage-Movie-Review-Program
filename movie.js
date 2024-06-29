
class Movie {
    constructor(name, genre, time, date, rating) {
        this.name = name;
        this.genre = genre;
        this.time = time;
        this.date = date;
        this.rating = rating;
    }

    displayMovieDetails() {
        console.log(`Name: ${this.name}`);
        console.log(`Genre: ${this.genre.join(", ")}`);
        console.log(`Running Time: ${this.time} mins`);
        console.log(`Release Date: ${this.date}`);
        console.log(`Rating: ${this.getAverageRating()}`);
        console.log('------------------------------------');
    }

    getAverageRating() {
        return (this.rating[1] / this.rating[0]).toFixed(1);
    }
}

module.exports = Movie;
