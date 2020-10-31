module.exports = {
  siteMetadata: {
    title: `Guilmain Dorian`,
    description: `Learn more about me by exploring my personnal website created with Gatsby.js and a lot of CSS.`,
    author: `@craaftx`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Inter\:400,500,800`],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        name: `Guilmain Dorian - Porfolio`,
        short_name: `Dorian G`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        background_color: `#1d1d2d`,
        theme_color: `#1d1d2d`,
        display: `minimal-ui`,
      },
    },
  ],
}
