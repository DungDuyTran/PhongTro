// "use client";
// import { useEffect } from "react";

// declare global {
//   interface Window {
//     CozeWebSDK?: {
//       WebChatClient: new (config: any) => void;
//     };
//   }
// }

// const CozeChatWidget = () => {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src =
//       "https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/oversea/index.js";
//     script.async = true;

//     script.onload = () => {
//       if (window.CozeWebSDK?.WebChatClient) {
//         new window.CozeWebSDK.WebChatClient({
//           config: {
//             bot_id: "7516211434234249234", // ✅ Bot ID từ Coze
//           },
//           componentProps: {
//             title: "Coze Chat 💬",
//           },
//           auth: {
//             type: "token",
//             token:
//               "pat_bSqZNUJuHA4hpODrWKDjPg7y9jfsu4AECMpxbQWRxwfdwN8KLFwFxWvkzfSbBO7D",
//             onRefreshToken: () =>
//               "pat_bSqZNUJuHA4hpODrWKDjPg7y9jfsu4AECMpxbQWRxwfdwN8KLFwFxWvkzfSbBO7D",
//           },
//         });
//       } else {
//         console.error("CozeWebSDK not found!");
//       }
//     };

//     document.body.appendChild(script);
//   }, []);

//   return null;
// };

// export default CozeChatWidget;
import React from "react";

const page = () => {
  return <div></div>;
};

export default page;
