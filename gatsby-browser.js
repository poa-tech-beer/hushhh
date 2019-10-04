/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import App from "./src/App"

import(
  /* webpackChunkName: "share-api-polyfill", webpackPrefetch: true */ `share-api-polyfill`
)

export const wrapRootElement = App
