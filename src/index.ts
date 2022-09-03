import { GistBox } from "gist-box";
import table from "text-table";
import Parser from "rss-parser";
require('dotenv').config();

const rssParser: Parser<> = new Parser();

(async () => {
  const { GIST_ID, GH_TOKEN, WP_RSS_LINK } = process.env;

  if (!GIST_ID || !GH_TOKEN || !WP_RSS_LINK) {
    console.error('ERR:missing necessary settings');
    return;
  }

  try {
    const res = await rssParser.parseURL(WP_RSS_LINK); 
  } catch (err) {

  }

})();