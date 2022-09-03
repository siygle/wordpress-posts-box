import { GistBox } from "gist-box";
import table from "text-table";
import Parser from "rss-parser";
require('dotenv').config();

type feedData = {
  title: string,
}
type itemData = {
  title: string,
  creator: string,
}

const rssParser: Parser<feedData, itemData> = new Parser();

(async () => {
  const { GIST_ID, GH_TOKEN, WP_RSS_LINK } = process.env;

  if (!GIST_ID || !GH_TOKEN || !WP_RSS_LINK) {
    console.error('ERR:missing necessary settings');
    return;
  }

  const posts: string[][] = [];
  try {
    const res = await rssParser.parseURL(WP_RSS_LINK); 
    console.log('info', res.title);
    res.items.forEach(item => {
      console.log('Item:', item.title, ' by ', item.creator);
      posts.push([item.title, '']);
    })

    const gistTable = table(
      [
        [res.title, ''],
        ['Lastest Articles', '👇'],
        ...posts
      ],
      { align: ['l', 'r'], stringLength: () => 25}
    );
    const box = new GistBox({ id: GIST_ID, token: GH_TOKEN });
    await box.update({ filename: 'wordpress-blog-latest.md', content: gistTable });
  } catch (err) {
    throw new Error(`Cannot fetch the blog posts: ${err.message}`);
  }
})();