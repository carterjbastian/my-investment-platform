# Check Investor Status Sample Integration (Front-End)

This codebase implements the front-end for the Check Investor Status platform integration demo.

To implement a live demo of the C.I. platform integration, we create an interface for a fictional investment platform – MyInvestmentPlatform.

**Note: This MyInvestmentPlatform is a generic investment platform. Any time you read "MyInvestmentPlatform", you can substitute in the name of your platform.**

Our fictional platform lets users create accounts, store their information, and make investments (potentially with many different sponsors).

However, in order to make these investments, MyInvestmentPlatform users need to verify their accreditation status. For this, MyInvestmentPlatform has integrated with Check Investor Status.

This web app (partially implementing MyInvestmentPlatform) is a fully-functional example of the Check Investor Status platform integration and API.

This repo is a live demo – see this live at [platformintegrationdemo.com](https://www.platformintegrationdemo.com/).

## Tech Stack

This front-end demo was spun up with Create React App. It uses react, including webhooks (`useState` and `useEffect`) for structure and data management, and tailwindcss for styling.

## Integration Workflow

This user facing webapp hits a web server. That web server stores information about the platform's users, and interacts with the Check Investor Status API.

To integrate, we register our platform's user with Check Investor Status' API (step 1), and then link our user to a `portalLink` – a unique, dynamically-created "magic link" (step 2). When the user clicks this link, they can go through the Check Investor Status accreditation process. As they proceed through the accreditation process, the platform can check in on their progress (step 3).

You can see this entire process explained in detail in the [C.I. Platform API Documentation](https://www.platformintegrationdemo.com/docs/#integration-example).

## Where to look for examples

### `src/App.js`

This has components and renders the [main page](https://www.platformintegrationdemo.com/).

That includes a few instructional dumb components, and one smart component that interacts with the MyInvestmentPlatform API.

This Component:

- Implements a form to manually create a "MyInvestmentPlatform" user (step 1).
- Renders the user-facing MIP page inside a browser frame (step 2).
- Implements a button to fetch the [Investor Model](https://www.platformintegrationdemo.com/docs/#investor-model) for the MyInvestmentPlatform user created above (step 3).

### `src/MyInvestmentPlatformPage.js`

This is the only component separated out into its own file. That's because it's the one most-similar to what you, as a platform, would implement. This user-facing component is an "account" or "onboarding" page instructing the user to get accredited so they can continue with an investment.

This page implements a functional "get-accredited" button. If the user (or you) click this button, they'll be taken to their own persistent Accreditation portal in another tab with their information pre-populated with the information in their MyInvestmentPlatform account. They can leave and return to this tab at any point.

### `src/api.js`

This implements the API interactions between this web app and the MyInvestmentPlatfrom web server.

**Note that this web app doesn't interact directly with the Check Investor Status API. It always goes through the middleman of the MyInvestmentPlatform web server. Otherwise, our Auth secret key would be jeopardized.**

## Further Resources

The following are good resources for more information:

- [PlatformIntegrationDemo.com](https://www.platformintegrationdemo.com) is what this looks like (live)!
- The Check Investor Status [Integration & API Documentation](https://www.platformintegrationdemo.com/docs/) explains the details of the investor model, the endpoints the server hits, and the portalLinks used in this implementation.
- [MyInvestmentPlatform Web Server Repo](https://github.com/carterjbastian/my-investment-platform-api) implements the demo web server that this platform interacts with.
- Carter built this, is actively maintaining it, and is providing technical support to our platform clients. Reach out to [carter@checkinvestorstatus.com](mailto:carter@checkinvestorstatus.com) with any questions.
