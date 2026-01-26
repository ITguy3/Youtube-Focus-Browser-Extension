# Youtube-Focus-Browser-Extension
A jerryrigged chromium browser extension that blocks user-selected YouTube channels. This extension will also block the comment section and the related tab to prevent doom scrolling :]

# Setup Instructions
Go to the Extensions page in your browser. Turn on Developer mode and look for the button that says `Load Unpacked`. Click on the repo folder - it  should now appear as an extension.

# How to Use
The channel blacklist is empty by default. Simply enter the names of the channels you want to ban (capitalization matters) and click `add` to add them to the list. The extension should now redirect you to a different website everytime you attempt to watch a video of a channel that is banned. The extension redirects to [quran.com](https://quran.com) by default, however you can change this in the `content.js` file if you'd like.