// File: .eleventy.js
module.exports = function(eleventyConfig) {
  
  const { DateTime } = require("luxon");
  
  eleventyConfig.addFilter("date", (dateObj, format) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat(format);
  });

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLLL yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Passthrough Copy: Copia le cartelle nella build finale (_site).
  // I percorsi sono relativi alla root del progetto.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/js");
  
  // Passthrough Copy: File nella root del sito (SEO e LLM)
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/llms.txt": "llms.txt" });

  // Dizgli a Eleventy di usare la cartella `src` come input.
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes", // La cartella _includes è dentro src
      layouts: "_includes"  // Specifichiamo per sicurezza
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};