import prisma from "../../../lib/prisma/init";
const userId = "64e516f6095eb7bbcafd6473";
const userId2 = "64e5169c095eb7bbcafd6472";
const data = [
  {
    postText:
      "Just had the most delicious dinner at that new restaurant downtown!",
    userId,
  },
  {
    postText: "Excited to start my new job next week! Wish me luck!",
    userId:userId2,
  },
  {
    postText:
      "Spent the day hiking in the mountains. The views were breathtaking!",
    userId,
  },
  {
    postText: "Celebrating my birthday with friends and family tonight. 🎉🎂",
  },
  {
    postText:
      "Visited an art gallery today and got inspired by all the creativity.",
    userId:userId2,
  },
  {
    postText: "Loving the book I'm currently reading. Highly recommend!",
    userId,
  },
  {
    postText: "Trying out a new hobby - painting. It's so relaxing!",
    userId:userId2,
  },
  {
    postText:
      "Attended an amazing live concert last night. The energy was incredible!",
    userId,
  },
  {
    postText:
      "Spent the afternoon volunteering at the local animal shelter. 🐶❤️",
    userId,
  },
  {
    postText:
      "Just finished a coding marathon. My project is finally complete!",
    userId,
  },
  {
    postText:
      "Exploring a new city this weekend. Can't wait to see what it has to offer!",
    userId:userId2,
  },
  {
    postText:
      "Cooked a homemade meal from scratch. It turned out better than expected!",
    userId,
  },
  {
    postText:
      "Reflecting on the past year and setting new goals for the future.",
    userId:userId2,
  },
  {
    postText:
      "Attended a thought-provoking seminar on AI and its implications.",
    userId,
  },
  {
    postText: "Enjoying a lazy Sunday with a cup of coffee and a good book.",
    userId:userId2,
  },
  {
    postText: "Visited my favorite museum today. So much history in one place!",
    userId,
  },
  {
    postText: "Had a great workout at the gym. Feeling energized!",
    userId:userId2,
  },
  {
    postText:
      "Binge-watching my favorite TV show. Can't believe I'm on the last season!",
    userId,
  },
  {
    postText:
      "Took a spontaneous road trip with friends. Adventures are the best!",
    userId:userId2,
  },
  {
    postText:
      "Attending a workshop on photography. Excited to enhance my skills!",
    userId:userId2,
  },
  {
    postText: "Spent the day at the beach. Sun, sand, and relaxation.",
    userId,
  },
  {
    postText:
      "Started learning a new instrument. It's never too late to pursue passions!",
    userId:userId2,
  },
  {
    postText:
      "Exploring the local farmers' market and trying delicious fresh produce.",
    userId,
  },
];

prisma.post.createMany({
  data,
}).then((e)=>{
    console.log(e)
}).catch(e=>{
    console.log(e)
});
