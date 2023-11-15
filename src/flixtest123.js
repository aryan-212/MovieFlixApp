import { MOVIES } from "flixhq-core";

const flixhq = new MOVIES.FlixHQ();
// Promise:
flixhq.search("the last of us").then((data) => console.log(data));

// Async/Await:
(async () => {
  const data = await flixhq.search("the last of us");
  console.log(data);
})();
