import { MOVIES } from "flixhq-core";
import readline from "readline";

const flixhq = new MOVIES.FlixHQ();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter something: ", (input) => {
  flixhq.search(input).then((data) => console.log(data));

  // Async/Await:
  (async () => {
    const data = await flixhq.search(input);
    console.log(data);
  })();
  rl.close();
});

// Promise:
// flixhq.search("the last of us").then((data) => console.log(data));

// // Async/Await:
// (async () => {
//   const data = await flixhq.search("the last of us");
//   console.log(data);
// })();

// Promise:

//   moviesSection: {
//     trending: { trendingMovies: [Array], trendingTVShows: [Array] },
//     latestTvShows: [
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//     ],
//     latestMovies: [
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//     ],
//     comingSoon: [
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//       [Object],
//     ],
//  },
