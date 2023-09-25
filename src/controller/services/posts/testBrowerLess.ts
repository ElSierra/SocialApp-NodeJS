import ogs from "open-graph-scraper";

const options = { url: "https://www.youtube.com/watch?v=Wm6LX9a-sLA" };
ogs(options).then((data) => {
  const { error, html, result, response } = data;
  //   console.log("error:", error); // This returns true or false. True if there was an error. The error itself is inside the result object.
  //   console.log("html:", html);
  //@ts-ignore
  console.log("result:", result?.ogImage[0]?.url); // This contains all of the Open Graph results
  //console.log("response:", response); // This contains response from the Fetch API
});
