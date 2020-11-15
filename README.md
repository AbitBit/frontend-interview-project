# Frontend interview project

This is my response to the FE interview of Dixa. I changed the build / infrastructure of the project and added two components. I decided not to refactor any current components.

- [npm package](https://www.npmjs.com/package/d-i-task)
- [Demo](https://dixatest.netlify.app/)

I had to **remove the tests** from the build. They run fine locally for me, but fail for mdx stories on CircleCI. Unfortunately, I do not have enough time to look for the root cause.

**SPOILERS AHEAD** 🙈 🙈

## Changes related to build

### Rollup

I removed **CRA** from the project. The decision was mainly due to the package being bloated and it is not made for libraries.

I decided to go with **Rollup** instead of Webpack as the integration is smoother with Sass.

The library supports **code splitting** and has also a single point of entry `index.js` that exports all the components, their props and the hooks.

As a side note, I would have chosen to ship a full JS/TS library and would have implemented [styled-component](https://styled-components.com/) or similar solution instead.

I choose not ship the dependencies of the library with Rollup, although it provides tree shaking on the node_modules and third parties dependencies , to allow for a minor and patch updates of the dependencies.

I added a build, pre-build and post-build script to build the library and ship it.

### Semantic Release

I added [semantic-release](https://github.com/semantic-release/semantic-release) to automate Sem versioning. It has a lot of features out of the box that makes it a solid publishing tool.

### Netlify

I added [Netlify](https://www.netlify.com/) for deployment. I integrated it with the current CircleCI build to deploy after the whole CI runs, instead of a change on the master branch of the repo.

### CI

Change the CI to integrate the new added scripts. I integrated CircleCI to the repo and added env variables to allow for semantic release and netlify cli(s) to run.

## Infra changes:

I added several scripts to allow for a custom `npm link` as it will not work out of the box with the current infrastructure. After using link run `npm run watch` to watch for changes in the project and rebuild to reflect the changes on the consumer. The tweak is needed as npm link is running from the `/build` folder.

I added recommended extensions and settings that are nice to the repo. (for **Visual Studio Code** only. it is the IDE I use.)  
The user will be prompted to install the extension if he does not have them.

I also added **pre-hook** commit to prevent the user from pushing code with linting issues. **Prettier** could be added to the hook as well.

I upgraded Storybook to **V6** to use mdx stories instead of CSF. (Just a preference. 😃 I work with both SB and [React Styleguidist](https://react-styleguidist.js.org/) in my current company and I prefer mdx based documentation.)

## Components

I added two components `Button` and `ListItem`. Both have mdx documentation.

`Button` is a simple component wrapping the `<button />` and adding a few features on top of it.

`ListItem` is a component to be used for example as a sidebar, implementing a keyboard and voice accessible ListBox, through the use of two hooks passed to the parent and the component.

You will find examples and more details on the documentation. 🎉
