//Name : Moe Myat Thwe
//Class : DIT/FT/1A/07
//Admin Number : 2340362

var input = require('readline-sync');  
var Movie = require('./movie'); 

var genre = ["Adventure", "Action", "Drama", "Fantasy", "Sci-Fi", "Thriller", "Crime", "Mystery", "Horror"]; 

// Initializing movies
var movie1 = new Movie("Black Panther: Wakanda Forever 2022", [genre[0], genre[1], genre[2], genre[3], genre[4], genre[5]], 161, "11 Nov 2022", [9, 42]);
var movie2 = new Movie("Avatar: The Way of Water", [genre[0], genre[4]], 192, "16 Dec 2022", [4, 15]);
var movie3 = new Movie("Fast X", [genre[6], genre[1], genre[7], genre[5]], 43, "19 May 2023", [28, 60]);
var movie4 = new Movie("Ant-Man and the Wasp: Quantumania", [genre[0], genre[1]], 120, "16 Feb 2023", [18, 80]);
var movie5 = new Movie("M3GAN", [genre[8], genre[7], genre[5]], 102, "6 Jan 2023", [20, 70]);

var movieList = [movie1, movie2, movie3, movie4, movie5]; 

console.log('Welcome to Silver Vintage Movie Review Program');
var userName = input.question('Please enter your name: '); 

do {
    console.log(`\nHi ${userName}, please select your choice:
        1. Display All Movies
        2. Add Movie
        3. Add Rating
        4. Latest 3 Release Date
        5. Filter by Genre
        6. 3 Most Popular Movies
        7. Edit Movie
        8. Delete Movie
        9. Exit`);

    var userOption = input.question('\t>>'); 

    switch (userOption) {
        case '1':
            // Display all movies
            movieList.forEach(movie => movie.displayMovieDetails());
            break;

        case '2':
            // Add new movie
            var nameList = movieList.map(movie => movie.name.toUpperCase());
            var newMovieName;
            do {
                newMovieName = input.question("\n\tPlease enter Movie's name: ");
                if (nameList.includes(newMovieName.toUpperCase()) || newMovieName.length === 0) {
                    console.log('\tPlease enter a unique movie name!');
                }
            } while (nameList.includes(newMovieName.toUpperCase()) || newMovieName.length === 0);

            function genreMenu() {
                console.log("\n\tPlease enter Movie's genre(s):");
                genre.forEach((g, index) => console.log(`\t${index + 1}) ${g}`));
            }

            var newMovieGenre;
            do {
                genreMenu();
                var inputIndex = input.question('\t>>').replace(/\s/g, '').split(",");
                var isValid = inputIndex.every(i => i > 0 && i <= genre.length && !isNaN(i));
                if (isValid) {
                    newMovieGenre = inputIndex.map(i => genre[i - 1]);
                } else {
                    console.log('\tPlease enter valid genre option(s)!');
                }
            } while (!newMovieGenre);

            var newMovieDate = input.question("\n\tPlease enter Movie's release date: ");
            var newMovieTime;
            do {
                newMovieTime = input.question("\n\tPlease enter Movie's running time (mins): ");
                if (newMovieTime <= 0 || isNaN(newMovieTime) || newMovieTime % 1 !== 0) {
                    console.log('\tPlease enter a valid running time!');
                }
            } while (newMovieTime <= 0 || isNaN(newMovieTime) || newMovieTime % 1 !== 0);

            movieList.push(new Movie(newMovieName, newMovieGenre, newMovieTime, newMovieDate, [0, 0]));
            break;

        case '3':
            // Add rating
            function getMovieNames() {
                console.log('\n\tSelect the movie to add a rating: ');
                movieList.forEach((movie, index) => console.log(`\t${index + 1}) ${movie.name}`));
                console.log(`\t${movieList.length + 1}) Go Back to Main Menu`);
            }

            do {
                getMovieNames();
                var selectedMovie = input.question("\t>>");
                if (selectedMovie > 0 && selectedMovie <= movieList.length && selectedMovie % 1 === 0) {
                    var newRating;
                    do {
                        newRating = input.question(`\n\tEnter your rating for "${movieList[selectedMovie - 1].name}" (1 to 5 inclusive): `);
                        if (newRating >= 1 && newRating <= 5) {
                            movieList[selectedMovie - 1].rating[0]++;
                            movieList[selectedMovie - 1].rating[1] += parseFloat(newRating);
                        } else {
                            console.log('\n\tEnter a valid rating!');
                        }
                    } while (!(newRating >= 1 && newRating <= 5));
                } else if (selectedMovie != movieList.length + 1) {
                    console.log('\n\tKindly enter a valid input!');
                }
            } while (selectedMovie != movieList.length + 1);
            break;

        case '4':
            // Show latest 3 release dates
            var releaseDateList = movieList.map(movie => Date.parse(movie.date)).sort().reverse().slice(0, 3);
            var latestMovies = movieList.filter(movie => releaseDateList.includes(Date.parse(movie.date)));

            console.log('\n\tThe latest 3 movies are:');
            latestMovies.forEach((movie, index) => console.log(`\t${index + 1}) ${movie.date} - ${movie.name}`));
            break;

        case '5':
            // Filter by movie genre
            var sortedGenres = [...genre].sort();
            function genreMenuList() {
                console.log('\n\tPlease select a genre: ');
                sortedGenres.forEach((i, index) => console.log(`\t${index + 1}) ${i}`));
            }

            do {
                genreMenuList();
                var genreChoice = input.question('\t>>');
                if (genreChoice > 0 && genreChoice <= sortedGenres.length && !isNaN(genreChoice) && genreChoice % 1 === 0) {
                    var selectedGenre = sortedGenres[genreChoice - 1];
                    var filteredMovies = movieList.filter(movie => movie.genre.includes(selectedGenre));
                    console.log(`\n\tYou have selected "${selectedGenre}" genre`);
                    filteredMovies.forEach((movie, index) => console.log(`\t${index + 1}) ${movie.name}`));
                } else {
                    console.log('\tPlease enter a valid genre input!');
                }
            } while (!(genreChoice > 0 && genreChoice <= sortedGenres.length && !isNaN(genreChoice) && genreChoice % 1 === 0));
            break;

        case '6':
            // Show 3 most popular movies-----------
            var popularMovies = movieList.slice().sort((a, b) => b.getAverageRating() - a.getAverageRating()).slice(0, 3);
            //shallow copy of the movieList array,slice() ensures that the original movieList is not modified during sorting. 
            //sorts the copied array in descending order
            // returns a new array containing only the first three elements of the sorted array.
            console.log('\n\tThe three most popular movies are:');
            popularMovies.forEach((movie, index) => console.log(`\t${index + 1}) ${movie.name} (Rating: ${movie.getAverageRating()})`));
            break;

        case '7':
            // Edit movie details
            function getMovieNames() {
                console.log('\n\tSelect the movie to edit: ');
                movieList.forEach((movie, index) => console.log(`\t${index + 1}) ${movie.name}`));
                console.log(`\t${movieList.length + 1}) Go Back to Main Menu`);
                }
    
            do {
                getMovieNames();
                var selectedMovie = input.question("\t>>");
                if (selectedMovie > 0 && selectedMovie <= movieList.length && selectedMovie % 1 === 0) {
                    var movie = movieList[selectedMovie - 1];
                    var editOption;
                    do {
                        console.log(`\nEditing "${movie.name}"`);
                        console.log('\t1. Edit Name');
                        console.log('\t2. Edit Genre');
                        console.log('\t3. Edit Running Time');
                        console.log('\t4. Edit Release Date');
                        console.log('\t5. Go Back');
                        editOption = input.question('\t>>');
    
                        switch (editOption) {
                            case '1':
                                var newName = input.question("\n\tEnter new name: ");
                                movie.name = newName;
                                break;
                            case '2':
                                genreMenu();
                                var newGenre = input.question('\t>>').replace(/\s/g, '').split(",").map(i => genre[i - 1]);
                                movie.genre = newGenre;
                                break;
                            case '3':
                                var newTime;
                                do {
                                    newTime = input.question("\n\tEnter new running time (mins): ");
                                    if (newTime <= 0 || isNaN(newTime) || newTime % 1 !== 0) {
                                        console.log('\tPlease enter a valid running time!');
                                    }
                                } while (newTime <= 0 || isNaN(newTime) || newTime % 1 !== 0);
                                movie.runningTime = newTime;
                                break;
                            case '4':
                                var newDate = input.question("\n\tEnter new release date: ");
                                movie.date = newDate;
                                break;
                            case '5':
                                console.log('\tReturning to main menu...');
                                break;
                            default:
                                console.log('\tPlease enter a valid input!');
                        }
                    } while (editOption != '5');
                } else if (selectedMovie != movieList.length + 1) {
                    console.log('\n\tKindly enter a valid input!');
                }
            } while (selectedMovie != movieList.length + 1);
            break;

        case '8':
            // Delete movie
            function getMovieNamesForDelete() {
                console.log('\n\tSelect the movie to delete: ');
                movieList.forEach((movie, index) => console.log(`\t${index + 1}) ${movie.name}`));
                console.log(`\t${movieList.length + 1}) Go Back to Main Menu`);
            }

            do {
                getMovieNamesForDelete();
                var selectedMovieToDelete = input.question("\t>>");
                if (selectedMovieToDelete > 0 && selectedMovieToDelete <= movieList.length && selectedMovieToDelete % 1 === 0) {
                    var movieToDelete = movieList[selectedMovieToDelete - 1];
                    var confirmation = input.question(`\n\tAre you sure you want to delete "${movieToDelete.name}"? (yes/no): `);
                    if (confirmation.toLowerCase() === 'yes') {
                        movieList.splice(selectedMovieToDelete - 1, 1);
                        console.log('\n\tMovie deleted successfully!');
                    } else {
                        console.log('\n\tDeletion cancelled.');
                    }
                } else if (selectedMovieToDelete != movieList.length + 1) {
                    console.log('\n\tKindly enter a valid input!');
                }
            } while (selectedMovieToDelete != movieList.length + 1);
            break;

        case '9':
            console.log('Thank you & goodbye!');
            break;

        default:
            console.log('Please enter a valid input.');
    }
} while (userOption != '9');
        

