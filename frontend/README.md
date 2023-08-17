This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Running the app

Tested on:
node version 20.5.0
yarn version 1.22.17

First, install dependencies with:

```bash
yarn
# or
npm install
```

Then, run the development server:

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Observations about the solution

In this app, we are using Next.js for its simplified routing scheme, out-of-the-box SSR capability, and ease of deployment on Vercel.

We used Next.js App router instead of Pages router for more flexibility, performance optimization, and future-proofing.

React Query is used to handle data fetching, querying, and caching. It makes it easier to handle infinite scrolling, refetching, and retries in the future.

React Query uses re-fetch on page focus. Since the mock backend randomly assigns EUR conversion values, it may appear that the prices jump all over the place. However, this is because the variation is too big. In an actual app, this implemented behavior would be ideal, as updating the values of the transactions in a desired behavior.

We used React.lazy and Suspense to lazy load the bigger components, reducing the initial JS bundle that needs to be loaded and improving the first page load time.

The DynamicTable component features mobile-specific column rendering. Along with defining the different columns and which field the data comes from, as well as custom rendering for each cell, the component also allows you to define which columns will show up or be hidden when inside the mobile breakpoint.

Shared components, hooks, and types are placed under src/, while the app/ folder is reserved for routing, and subfolders are able to hold feature-specific components, hooks, and types.

We used https://ui.shadcn.com/ for the component library. It is easy to use, supports TypeScript, completely customizable, and compatible with Tailwind CSS. Components are added using: npx shadcn-ui@latest add [component].

As described in the task requirements, I did not focus on styling the app or creating a visually striking landing page. I believe you are looking for someone who knows how to use a modern stack, builds for scale, and creates web apps with good performance. That's what this solution does. It is modern, well-structured, and performant with components that are modular and maintainable.





