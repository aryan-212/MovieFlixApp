import express from "express";
import cors from "cors";

const app = express();
app.use( cors() );

const apiResponse = {
  slider: [
    {
      image:
        "https://img.flixhq.to/xxrz/1200x600/379/ea/35/ea3599e89a8c6b4e966d1abab3ee2402/ea3599e89a8c6b4e966d1abab3ee2402.jpg",
      title: "The Creator",
      detail: [ Object ],
      description:
        "Amid a future war between the human race and the forces of artificial intelligence, a hardened ex-special forces agent grieving the disappearance of his wife...",
      url: "https://flixhq.to/movie/watch-the-creator-100849",
    },
    {
      image:
        "https://img.flixhq.to/xxrz/1200x600/379/a5/c1/a5c1674ed733c43933cd11e877f050b5/a5c1674ed733c43933cd11e877f050b5.jpg",
      title: "Loki",
      detail: [ Object ],
      description:
        'After stealing the Tesseract during the events of "Avengers: Endgame." an alternate version of Loki is brought to the mysterious Time Variance Authority, a...',
      url: "https://flixhq.to/tv/watch-loki-42258",
    },
    {
      image:
        "https://img.flixhq.to/xxrz/1200x600/379/05/45/05459ef32d9ace3b1fec571dfc08a8ce/05459ef32d9ace3b1fec571dfc08a8ce.jpg",
      title: "Expend4bles",
      detail: [ Object ],
      description: "",
      url: "https://flixhq.to/movie/watch-the-expendables-4-16861",
    },
    {
      image:
        "https://img.flixhq.to/xxrz/1200x600/379/6f/0d/6f0da2da38d52695d03be78f3e0a7045/6f0da2da38d52695d03be78f3e0a7045.jpg",
      title: "Mission: Impossible - Dead Reckoning Part One",
      detail: [ Object ],
      description: "",
      url: "https://flixhq.to/movie/watch-mission-impossible-7-68135",
    },
    {
      image:
        "https://img.flixhq.to/xxrz/1200x600/379/4c/ee/4cee1bdde99bf089d44e4b3dbb8399e4/4cee1bdde99bf089d44e4b3dbb8399e4.jpg",
      title: "The Equalizer 3",
      detail: [ Object ],
      description:
        "Robert McCall finds himself at home in Southern Italy but he discovers his friends are under the control of local crime bosses. As events turn deadly, McCall...",
      url: "https://flixhq.to/movie/watch-the-equalizer-3-99865",
    },
    {
      image:
        "https://img.flixhq.to/xxrz/1200x600/379/85/09/8509eafa6b10694de8fe9027e415ecdf/8509eafa6b10694de8fe9027e415ecdf.jpg",
      title: "The Nun II",
      detail: [ Object ],
      description:
        "Set four years after the ending of the the nun, this follows Sister Irene as she investigates a murder at a boarding school in France. While investigating she...",
      url: "https://flixhq.to/movie/watch-the-nun-ii-100063",
    },
    {
      image:
        "https://img.flixhq.to/xxrz/1200x600/379/e6/03/e60320897cc0cd1686cdaf6526dd436d/e60320897cc0cd1686cdaf6526dd436d.jpg",
      title: "The Retirement Plan",
      detail: [ Object ],
      description:
        "When Ashley and her young daughter Sarah get caught up in a criminal enterprise that puts their lives at risk, she turns to the only person who can help: her...",
      url: "https://flixhq.to/movie/watch-the-retirement-plan-100294",
    },
    {
      image:
        "https://img.flixhq.to/xxrz/1200x600/379/e2/b5/e2b55f91a4e250e486f1a1084357fc1a/e2b55f91a4e250e486f1a1084357fc1a.jpg",
      title: "Gran Turismo",
      detail: [ Object ],
      description:
        "The ultimate wish fulfillment tale of a teenage Gran Turismo player whose gaming skills won him a series of Nissan competitions to become an actual professional...",
      url: "https://flixhq.to/movie/watch-gran-turismo-98845",
    },
    {
      image:
        "https://img.flixhq.to/xxrz/1200x600/379/fe/74/fe7471ce85c019b6445563bfcf27c9b0/fe7471ce85c019b6445563bfcf27c9b0.jpg",
      title: "Blue Beetle",
      detail: [ Object ],
      description:
        "Recent college grad Jaime Reyes returns home full of aspirations for his future, only to find that home is not quite as he left it. As he searches to find his...",
      url: "https://flixhq.to/movie/watch-blue-beetle-99433",
    },
    {
      image:
        "https://img.flixhq.to/xxrz/1200x600/379/31/f2/31f2df4f1ad949cf6e9b14ae4dda9c9c/31f2df4f1ad949cf6e9b14ae4dda9c9c.jpg",
      title: "The Last Voyage of the Demeter",
      detail: [ Object ],
      description:
        "The crew of the merchant ship Demeter attempts to survive the ocean voyage from Carpathia to London as they are stalked each night by a merciless presence...",
      url: "https://flixhq.to/movie/watch-the-last-voyage-of-the-demeter-99376",
    },
    {
      image:
        "https://img.flixhq.to/xxrz/1200x600/379/c9/ac/c9ac99534c0ddb68d6ea82088913cc9c/c9ac99534c0ddb68d6ea82088913cc9c.jpg",
      title: "Indiana Jones and the Dial of Destiny",
      detail: [ Object ],
      description:
        "The plot is said to be based on one of the other books in the series.",
      url: "https://flixhq.to/movie/watch-indiana-jones-5-9984",
    },
    {
      image:
        "https://img.flixhq.to/xxrz/1200x600/379/52/bf/52bf282a0f729fcee351085a1fb2adf7/52bf282a0f729fcee351085a1fb2adf7.jpg",
      title: "Heart of Stone",
      detail: [ Object ],
      description:
        "An intelligence operative for a shadowy global peacekeeping agency races to stop a hacker from stealing its most valuable — and dangerous — weapon.",
      url: "https://flixhq.pe/movie/watch-heart-of-stone-99160",
    },
  ],
};

// Route to fetch movies
app.get( "/api/movies", ( req, res ) =>
{
  // Here, you might send the apiResponse data as the response
  res.json( apiResponse );
} );

// Start the server
const PORT = process.env.PORT || 4000;
app.listen( PORT, () =>
{
  console.log( `Server running on port ${ PORT }` );
} );

export default apiResponse;

// // Function to extract arrays for specific keys
// function extractArraysFromResponse(response) {
//   const arrays = {};

//   // Specify keys for which you want arrays
//   const keysToExtract = ["image", "title", "url"];

//   keysToExtract.forEach((key) => {
//     arrays[key] = response.slider.map((item) => item[key]);
//   });

//   arrays["description"] = response.slider.map(
//     (item) => item["description"] || ""
//   );
//   arrays["detail"] = response.slider.map((item) => item["detail"] || {});

//   return arrays;
// }

// // Extract arrays for specific keys
// const arraysForKeys = extractArraysFromResponse(apiResponse);

// // Output the arrays for specific keys
// console.log(arraysForKeys);
