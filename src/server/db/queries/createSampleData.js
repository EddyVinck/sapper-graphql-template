import { Post } from "../resources/post/post.model";
import { User } from "../resources/user/user.model";

const sampleUser = {
  email: "user@svelte.dev",
  password: "password",
  permissions: {
    createPost: true,
    editOwnPost: true,
    editAnyPost: false,
    deleteOwnPost: true,
    deleteAnyPost: false,
  },
};

const sampleAdmin = {
  email: "admin@svelte.dev",
  password: "password",
  permissions: {
    createPost: true,
    editOwnPost: true,
    editAnyPost: true,
    deleteOwnPost: true,
    deleteAnyPost: true,
  },
};

let sampleUserPosts = [
  {
    title: "Sapper is Powered by Svelte",
    content: `
<p>Sapper is an application framework powered by Svelte — build bigger apps with a smaller footprint</p>
`,
  },
  {
    title: "Best of both worlds",
    content: `
<blockquote>
  <p>Sapper is in early development, and some things may change before we hit version 1.0. This document is a work-in-progress. If you get stuck, reach out for help in the <a href="https://svelte.dev/chat" target="_blank">Discord chatroom</a>.</p>
  <p>See the <a href="migrating">migration guides</a> for help upgrading from older versions.</p>
</blockquote>
    
<h3>
  <span id="What_is_Sapper" class="offset-anchor"></span>
  <a href="docs#What_is_Sapper" class="anchor" aria-hidden="true"></a>
  What is Sapper?
</h3>
<p>Sapper is a framework for building extremely high-performance web apps. You're looking at one right now! There are two basic concepts:</p>
<ul>
  <li>Each page of your app is a <a href="https://svelte.dev" target="_blank">Svelte</a> component</li>
  <li>You create pages by adding files to the <code>src/routes</code> directory of your project. These will be server-rendered so that a user's first visit to your app is as fast as possible, then a client-side app takes over</li>
</ul>
<p>Building an app with all the modern best practices — code-splitting, offline support, server-rendered views with client-side hydration — is fiendishly complicated. Sapper does all the boring stuff for you so that you can get on with the creative part.</p>
<p>You don't need to know Svelte to understand the rest of this guide, but it will help. In short, it's a UI framework that compiles your components to highly optimized vanilla JavaScript. Read the <a href="https://svelte.dev/blog/svelte-3-rethinking-reactivity" target="_blank">introductory blog post</a> and the <a href="https://svelte.dev/tutorial" target="_blank">tutorial</a> to learn more.</p>
`,
  },
];

let sampleAdminPosts = [
  {
    title: "Admins are the best",
    content: "<p>It's true.</p>",
    isFeatured: true,
  },
];

const createSamplePosts = async (users) => {
  console.log("🛠   Creating a few posts...");
  const user = users.find((u) => u.email === sampleUser.email);
  const admin = users.find((u) => u.email === sampleAdmin.email);
  sampleUserPosts = sampleUserPosts.map((post) => ({
    ...post,
    author: user._id,
  }));
  sampleAdminPosts = sampleAdminPosts.map((post) => ({
    ...post,
    author: admin._id,
  }));
  return await Post.create([...sampleUserPosts, ...sampleAdminPosts]);
};

async function getSampleUsers() {
  const users = await User.find({
    email: {
      $in: [sampleUser.email, sampleAdmin.email],
    },
  })
    .populate("post")
    .execPopulate();
  return users;
}
const usersFoundMessage =
  '⭐  You can log in with "user@svelte.dev" or "admin@svelte.dev". Their passwords are "password".';

// ! Only run this in development and when the database is connected !
export async function createSampleDataIfDbEmpty() {
  try {
    console.log("🔎  Checking if database empty...");
    let sampleAccounts = await getSampleUsers();

    if (sampleAccounts.length > 0) {
      console.log("✔   Users found!");
      console.log(usersFoundMessage);

      console.log({ sampleAccounts });

      // Check if those users have any posts
      const foundPosts = sampleAccounts.reduce((prev, user) => {
        // don't bother with the content, it's too long.
        const _posts = user.posts.map((post) => ({
          author: post.author,
          title: post.title,
          isFeatured: post.isFeatured,
        }));
        return prev.concat(_posts);
      }, []);

      console.log({ foundPosts });

      if (foundPosts.length > 0) {
        console.log("🔎  Posts found!");
        console.log({ posts: foundPosts });
        // if  the found users have any posts, stop running this function
        return;
      }
      await createSamplePosts(sampleAccounts);
      console.log("✔   Posts created!");

      return;
    }

    // If no users present, create a few users
    console.log("🛠   Creating a few users...");
    await User.create([sampleUser, sampleAdmin]);
    sampleAccounts = await getSampleUsers();
    console.log("✔   created sample user and admin!");
    console.log(usersFoundMessage);
    const posts = await createSamplePosts(sampleAccounts);
    console.log("✔   Posts created!");
    console.log({ posts });

    sampleAccounts = await getSampleUsers();
    console.log(sampleAccounts);
    return console.log("✔   createSampleDataIfDbEmpty done!");
  } catch (error) {
    console.error(
      "Something went wrong in `createSampleDataIfDbEmpty`: ",
      error
    );
  }
}
