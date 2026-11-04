// this function was vibe coded.
function waitForElement(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const start = performance.now();

        function check() {
            const el = document.querySelector(selector);
            if (el) return resolve(el);

            if (performance.now() - start > timeout) {
                return reject("Timeout waiting for " + selector);
            }

            requestAnimationFrame(check);
        }

        check();
    });
}

// run the program and check if channel is on banned list
async function run() {
    const url = new URL(window.location.href);
    const path = url.pathname;

    // remove home page reccomendations
    if (path == '/') {
        console.log("home page");

        try {
            await waitForElement("#contents");
            const path1 = document.getElementById("contents");

            if (path1) {
                path1.parentNode.removeChild(path1);
            }

        } catch (e) {
            console.warn(e)
        }

        // watch page section
    } else if (path == '/watch') {
        console.log("watch window")
        try {
            if (!removedComments) {
                await waitForElement("#comments");
                await waitForElement("#related");
                await waitForElement("#panels"); // TODO: comment button
            }
            await waitForElement("#snippet");

            const path1 = document.getElementById("comments");
            const path2 = document.getElementById("related");
            const path3 = document.getElementById("panels"); // TODO: replace w/ comment button id/class

            if (path1 && path2 && path3) {
                path1.parentNode.removeChild(path1);
                path2.parentNode.removeChild(path2);
                path3.parentNode.removeChild(path3);
                removedComments = true;
            }

            var bannedChannels;
            // from what I know, chrome.get is contained in its own scope
            chrome.storage.local.get(['list'], (val) => {
                bannedChannels = val.list;

                const elements = document.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string");
                console.log(elements);

                for (item in elements) {
                    for (i in bannedChannels) {
                        if (elements[item].innerHTML == bannedChannels[i]) {
                            window.location.href = "https://www.quran.com";
                        }
                    }
                }
                console.log("Not in banned list!");
            });


        } catch (e) {
            console.warn(e);
        }
    }

}

var removedComments = false;

// Run on every YouTube navigation
window.addEventListener("yt-navigate-finish", run);
