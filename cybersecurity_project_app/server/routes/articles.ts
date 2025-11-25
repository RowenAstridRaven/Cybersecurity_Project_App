import RSSParser from "rss-parser";
import express from "express";

const router = express.Router();
const port = process.env.PORT || 5000;

const parser = new RSSParser();

interface Feeds{
    name_of_site:string;
    url:string;
    api:string;
}

//This is for each article RSS feed that is used
const feeds: Feeds[]  = [
    {name_of_site: 'Hacker News', url: 'https://feeds.feedburner.com/TheHackersNews', api: '/hackernews'}, 
    {name_of_site: 'Security Magazine', url: 'https://www.securitymagazine.com/rss/15', api: '/securitymagazine'}, 
    {name_of_site: 'Security Week', url: 'https://www.securityweek.com/feed/', api: '/securityweek'},
    {name_of_site: 'Graham Cluley', url: 'https://grahamcluley.com/feed/', api: '/grahamcluley'},
    {name_of_site: 'Schneier', url: 'https://www.schneier.com/feed/atom/', api: '/schneier'},
    {name_of_site: 'Dark Reading RSS Feed', url: 'https://www.darkreading.com/rss.xml', api: '/darkreading'},
    //TO ADD article rss feed
    //{name_of_site: '', url: '', api: '/'},
];

// This defines the API endpoint to fetch and parse the RSS feed from all the feeds above
for (const current_feed of feeds) {
    router.get(`${current_feed.api}`, async (req, res) => {
        try {
            const feedUrl = `${current_feed.url}`;
            const feed = await parser.parseURL(feedUrl);
    
            // Map each item to a simplified article object
            const articles = feed.items.map((item) => ({
            title: item.title,
            link: item.link,
            snippet: item.contentSnippet || '',
            pubDate: item.pubDate || ''
            }));
    
            res.json(articles);
        } catch (err) { //If there is an error
            console.error(`Error fetching the ${current_feed.name_of_site} feed:`, err);
            res.status(500).json({ error: `Failed to fetch the ${current_feed.name_of_site} feed` });
        }
    });
}


export default router;