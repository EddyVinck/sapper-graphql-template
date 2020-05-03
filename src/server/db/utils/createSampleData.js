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
  avatar: "admin.png",
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
    title: "What is this template for?",
    slug: "what-is-sapper-graphql-template",
    html: `
			<p>I made this template so I can use it to scaffold projects easily with <code>degit</code>. I'm sharing it because it might be of use to other developers as well.
			</p>
			<p>
				It allows you to use GraphQL with Svelte. It supports server side rendering as well. See the <a href="https://github.com/EddyVinck/sapper-graphql-template"><code>eddyvinck/sapper-graphql-template</code> repository on GitHub</a>.
			</>
			<p>🐦 Please follow me on Twitter: <a href="https://twitter.com/Veinq_" target="_blank" rel="noopener">@veinq_</a> for updates. I also post a lot about a lot of web development related things that might interest you.</p>
			<p>Thanks for checking it out!</p>
			<p>- Eddy</p>
		`,
  },
  {
    title: "What is Sapper?",
    slug: "what-is-sapper",
    html: `
			<p>First, you have to know what <a href='https://svelte.dev'>Svelte</a> is. Svelte is a UI framework with a bold new idea: rather than providing a library that you write code with (like React or Vue, for example), it's a compiler that turns your components into highly optimized vanilla JavaScript. If you haven't already read the <a href='https://svelte.dev/blog/frameworks-without-the-framework'>introductory blog post</a>, you should!</p>

			<p>Sapper is a Next.js-style framework (<a href='blog/how-is-sapper-different-from-next'>more on that here</a>) built around Svelte. It makes it embarrassingly easy to create extremely high performance web apps. Out of the box, you get:</p>

			<ul>
				<li>Code-splitting, dynamic imports and hot module replacement, powered by webpack</li>
				<li>Server-side rendering (SSR) with client-side hydration</li>
				<li>Service worker for offline support, and all the PWA bells and whistles</li>
				<li>The nicest development experience you've ever had, or your money back</li>
			</ul>

			<p>It's implemented as Express middleware. Everything is set up and waiting for you to get started, but you keep complete control over the server, service worker, webpack config and everything else, so it's as flexible as you need it to be.</p>
		`,
  },

  {
    title: "How to use Sapper",
    slug: "how-to-use-sapper",
    html: `
			<h2>Step one</h2>
			<p>Create a new project, using <a href='https://github.com/Rich-Harris/degit'>degit</a>:</p>

			<pre><code>npx degit "sveltejs/sapper-template#rollup" my-app
			cd my-app
			npm install # or yarn!
			npm run dev
			</code></pre>

			<h2>Step two</h2>
			<p>Go to <a href='http://localhost:3000'>localhost:3000</a>. Open <code>my-app</code> in your editor. Edit the files in the <code>src/routes</code> directory or add new ones.</p>

			<h2>Step three</h2>
			<p>...</p>

			<h2>Step four</h2>
			<p>Resist overdone joke formats.</p>
		`,
  },
  {
    title: "What is GraphQL?",
    slug: "what-is-graphql",
    html: `
			<p>GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.</p>
		`,
  },

  {
    title: "Why the name?",
    slug: "why-the-name",
    html: `
			<p>In war, the soldiers who build bridges, repair roads, clear minefields and conduct demolitions — all under combat conditions — are known as <em>sappers</em>.</p>

			<p>For web developers, the stakes are generally lower than those for combat engineers. But we face our own hostile environment: underpowered devices, poor network connections, and the complexity inherent in front-end engineering. Sapper, which is short for <strong>S</strong>velte <strong>app</strong> mak<strong>er</strong>, is your courageous and dutiful ally.</p>
		`,
  },

  {
    title: "How is Sapper different from Next.js?",
    slug: "how-is-sapper-different-from-next",
    html: `
			<p><a href='https://github.com/zeit/next.js'>Next.js</a> is a React framework from <a href='https://zeit.co'>Zeit</a>, and is the inspiration for Sapper. There are a few notable differences, however:</p>

			<ul>
				<li>It's powered by <a href='https://svelte.dev'>Svelte</a> instead of React, so it's faster and your apps are smaller</li>
				<li>Instead of route masking, we encode route parameters in filenames. For example, the page you're looking at right now is <code>src/routes/blog/[slug].svelte</code></li>
				<li>As well as pages (Svelte components, which render on server or client), you can create <em>server routes</em> in your <code>routes</code> directory. These are just <code>.js</code> files that export functions corresponding to HTTP methods, and receive Express <code>request</code> and <code>response</code> objects as arguments. This makes it very easy to, for example, add a JSON API such as the one <a href='blog/how-is-sapper-different-from-next.json'>powering this very page</a></li>
				<li>Links are just <code>&lt;a&gt;</code> elements, rather than framework-specific <code>&lt;Link&gt;</code> components. That means, for example, that <a href='blog/how-can-i-get-involved'>this link right here</a>, despite being inside a blob of HTML, works with the router as you'd expect.</li>
			</ul>
		`,
  },

  {
    title: "How can I get involved?",
    slug: "how-can-i-get-involved",
    html: `
			<p>We're so glad you asked! Come on over to the <a href='https://github.com/sveltejs/svelte'>Svelte</a> and <a href='https://github.com/sveltejs/sapper'>Sapper</a> repos, and join us in the <a href='https://svelte.dev/chat'>Discord chatroom</a>. Everyone is welcome, especially you!</p>
		`,
  },
  {
    title: "Sapper is Powered by Svelte",
    html: `
<p>Sapper is an application framework powered by Svelte — build bigger apps with a smaller footprint</p>
`,
  },
  {
    title: "Best of both worlds",
    html: `
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
    html: "<p>It's true.</p>",
    isFeatured: true,
  },
];

const createSamplePosts = async (users) => {
  console.log("🛠 Creating a few posts...");
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
  const posts = await Post.create([...sampleUserPosts, ...sampleAdminPosts]);
};

async function getSampleUsers() {
  const users = await User.find({
    email: {
      $in: [sampleUser.email, sampleAdmin.email],
    },
  }).exec();

  return users;
}
const usersFoundMessage =
  '⭐ You can log in with "user@svelte.dev" or "admin@svelte.dev". Their passwords are "password".';

// ! Only run this in development and when the database is connected !
export async function createSampleDataIfDbEmpty() {
  try {
    console.log("🔎 Checking if database empty...");
    let sampleAccounts = await getSampleUsers();

    if (sampleAccounts.length > 0) {
      console.log("✔ Example users found!");
      console.log(usersFoundMessage);

      const posts = await Post.find({
        author: {
          $in: sampleAccounts.map((acc) => acc._id),
        },
      });

      if (posts.length > 0) {
        console.log(`✔ ${posts.length} example posts found!`);
        // if  the found users have any posts, stop running this function
        return;
      }
      await createSamplePosts(sampleAccounts);
      console.log("✔ Posts created!");

      return;
    }

    // If no users present, create a few users
    console.log("🛠 Creating a few users...");
    await User.create([sampleUser, sampleAdmin]);
    sampleAccounts = await getSampleUsers();
    console.log("✔ created sample user and admin!");
    console.log(usersFoundMessage);
    const posts = await createSamplePosts(sampleAccounts);
    console.log("✔ Posts created!");

    return console.log("✔ createSampleDataIfDbEmpty done!");
  } catch (error) {
    console.error(
      "Something went wrong in `createSampleDataIfDbEmpty`: ",
      error
    );
  }
}
