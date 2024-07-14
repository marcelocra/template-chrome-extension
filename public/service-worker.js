// const DEV = true;

console.log("hey");

// if (DEV) {
//   async function getCurrentTabId() {
//     let queryOptions = { active: true };
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab.id;
//   }

//   function reloadClient() {
//     location.reload();
//   }

//   chrome.runtime.onInstalled.addListener(() => {
//     console.log("hey2");
//     const ws = new WebSocket("ws://localhost:8000");

//     ws.addEventListener("message", async (event) => {
//       console.log("hey3");

//       if (event.data === "reload") {
//         console.log("hey4");
//         const tabId = await getCurrentTabId();
//         ws.send("reloading the client with id: " + tabId);
//         chrome.scripting
//           .executeScript({
//             target: { tabId },
//             func: reloadClient,
//           })
//           .then(() => console.log("done"));
//       }
//     });
//   });
// }
