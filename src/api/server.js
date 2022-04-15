//"miragejs": "^0.1.35",

import {
  Server,
  Model,
  Factory,
  belongsTo,
  hasMany,
  association,
  RestSerializer,
} from "miragejs";

import { nanoid } from "@reduxjs/toolkit";

import faker from "faker";
import { sentence, paragraph, article, setRandom } from "txtgen";
import { parseISO } from "date-fns";
import seedrandom from "seedrandom";

const IdSerializer = RestSerializer.extend({
  serializeIds: "always",
});

// Set up a seeded random number generator, so that we get
// a consistent set of users / entries each time the page loads.
// This can be reset by deleting this localStorage value,
// or turned off by setting `useSeededRNG` to false.

let usersData = [
  {
    id: nanoid(),
    name: "Stephanie",
    isOnline: true,
    img: "https://randomuser.me/api/portraits/med/women/5.jpg",
  },
  {
    id: nanoid(),
    name: "Julie",
    isOnline: true,
    img: "https://randomuser.me/api/portraits/med/women/6.jpg",
  },
  {
    id: nanoid(),
    name: "Terrence ",
    isOnline: true,
    img: "https://randomuser.me/api/portraits/med/women/7.jpg",
  },
  {
    id: nanoid(),
    name: "Bradley ",
    isOnline: false,
    img: "https://randomuser.me/api/portraits/med/men/5.jpg",
  },
  {
    id: nanoid(),
    name: "Regina ",
    isOnline: true,
    img: "https://randomuser.me/api/portraits/med/women/8.jpg",
  },
  {
    id: nanoid(),
    name: "Dana ",
    isOnline: false,
    img: "https://randomuser.me/api/portraits/med/women/9.jpg",
  },
];

let useSeededRNG = false;

let rng = seedrandom();

if (useSeededRNG) {
  let randomSeedString = localStorage.getItem("randomTimestampSeed");
  let seedDate;

  if (randomSeedString) {
    seedDate = new Date(randomSeedString);
  } else {
    seedDate = new Date();
    randomSeedString = seedDate.toISOString();
    localStorage.setItem("randomTimestampSeed", randomSeedString);
  }

  rng = seedrandom(randomSeedString);
  setRandom(rng);
  faker.seed(seedDate.getTime());
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(rng() * (max - min + 1)) + min;
}

const randomFromArray = (array) => {
  const index = getRandomInt(0, array.length - 1);
  return array[index];
};

const notificationTemplates = [
  "poked you",
  "says hi!",
  `is glad we're friends`,
  "sent you a gift",
];

new Server({
  routes() {
    this.namespace = "fakeApi";

    // this.timing = 2000

    this.resource("users");
    this.resource("posts");
    this.resource("comments");

    const server = this;

    this.post("/posts", function (schema, req) {
      const data = this.normalizedRequestAttrs();
      data.date = new Date().toISOString();

      // Work around some odd behavior by Mirage that's causing an extra
      // user entry to be created unexpectedly when we only supply a userId.
      // It really want an entire Model passed in as data.user for some reason.
      const user = schema.users.find(data.userId);
      data.user = user;

      if (data.content === "error") {
        throw new Error("Could not save the post!");
      }

      const result = server.create("post", data);
      return result;
    });

    this.get("/posts/:postId/comments", (schema, req) => {
      const postId = req.params.postId;
      const post = schema.posts.find(postId);
      return post.comments;
    });

    this.get("/notifications", (schema, req) => {
      const numNotifications = getRandomInt(1, 5);

      let pastDate;

      const now = new Date();

      if (req.queryParams.since) {
        pastDate = parseISO(req.queryParams.since);
      } else {
        pastDate = new Date(now.valueOf());
        pastDate.setMinutes(pastDate.getMinutes() - 15);
      }

      // Create N random notifications. We won't bother saving these
      // in the DB - just generate a new batch and return them.
      const notifications = [...Array(numNotifications)].map(() => {
        const user = randomFromArray(schema.db.users);
        const template = randomFromArray(notificationTemplates);
        return {
          id: nanoid(),
          date: faker.date.between(pastDate, now).toISOString(),
          message: template,
          user: user.id,
          read: false,
          isNew: true,
        };
      });

      return { notifications };
    });
  },

  models: {
    user: Model.extend({
      posts: hasMany(),
    }),
    post: Model.extend({
      user: belongsTo(),
      comments: hasMany(),
    }),
    comment: Model.extend({
      post: belongsTo(),
    }),
    notification: Model.extend({}),
  },
  factories: {
    user: Factory.extend({
      id() {
        return nanoid();
      },
      firstName() {
        return faker.name.firstName();
      },
      lastName() {
        return faker.name.lastName();
      },
      name() {
        return faker.name.findName(this.firstName, this.lastName);
      },
      username() {
        return faker.internet.userName(this.firstName, this.lastName);
      },

      afterCreate(user, server) {
        server.createList("post", 3, { user });
      },
    }),
    post: Factory.extend({
      id() {
        return nanoid();
      },
      title() {
        return sentence();
      },
      date() {
        return faker.date.recent(7);
      },
      content() {
        return article(1);
      },
      reactions() {
        return {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        };
      },
      afterCreate(post, server) {
        server.createList("comment", 3, { post });
      },

      user: association(),
    }),

    comment: Factory.extend({
      id() {
        return nanoid();
      },
      date() {
        return faker.date.past(2);
      },
      text() {
        return paragraph();
      },
      post: association(),
    }),
  },
  serializers: {
    user: IdSerializer,
    post: IdSerializer,
    comment: IdSerializer,
  },
  seeds(server) {
    server.createList("user", 3);
    server.create("user", { img: usersData[0].img });
    server.create("user", { img: usersData[1].img });
    server.create("user", { img: usersData[2].img });
    server.create("user", { img: usersData[3].img });
    server.create("user", { img: usersData[4].img });
    server.create("user", { img: usersData[5].img });
  },
});
