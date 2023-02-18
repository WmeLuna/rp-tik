/* eslint-disable @typescript-eslint/naming-convention */
import { Injector, Logger } from "replugged";
//import fetch from "node-fetch";
import { removeEmbed, updateMessage } from "./utils";
const inject = new Injector();
const logger = Logger.plugin("RP-Tik");

const TT_DETECTION = new RegExp(
  /\bhttps?:\/\/(?:m|www|vm)\.tiktok\.com\/(?:.*\/)?(?:(?:v|embed|video|t)\/|\?shareId=|\&item_id=)?(\d+|\w+)\b/gm,
);

export async function start(): Promise<void> {
  // @ts-expect-error adding to window
  window.rptik = {
    receiver,
    TT_DETECTION,
  };
}

async function receiver(message: DiscordMessage): Promise<void> {
  // if a stored password leads to the decrypted string, skip the modal
  logger.log(message);
  await buildEmbed(message);
  /*await iteratePasswords(message).then((res: string | false) => {
    if (res) return void buildEmbed(message, res);
    return void buildDecModal({ message });
  });*/
}
export function stop(): void {
  inject.uninjectAll();
}
export async function buildEmbed(message: DiscordMessage): Promise<void> {
  if (message.embeds.length == 1) {
    if (message.embeds[0]?.provider?.name?.includes("TikTok")) {
      removeEmbed(message);
    } else {
      return Promise.resolve();
    }
  }

  let embed = {
    type: "rich",
    provider: {
      name: "RP-Tik",
    },
    color: "0x383838",
    description: "Loading...",
    thumbnail: {},
    video: {},
    author: {
      name: null,
      icon_url: null,
      proxy_icon_url: null,
    },
    /*thumbnail: {
      url: "",
      proxy_url: "",
      height: 200,
      width: 200,
    },
    video: {
      url: "",
      proxy_url: "",
      height: 200,
      width: 200,
    },*/

    // @ts-expect-error its not fucking null
    url: message.content.match(TT_DETECTION)[0],
    footer: {
      text: null,
    },
  }; // @ts-expect-error its not fucking null
  let api = new URL(message.content.match(TT_DETECTION)[0]);
  api.hostname = "tiktxk.wmeluna.workers.dev";
  fetch(api)
    .then((e) => e.json())
    .then((e) => {
      logger.log(e);
      embed.thumbnail = {
        url: e.src.data.video.dynamic_cover.url_list[0],
        proxy_url: e.src.data.video.dynamic_cover.url_list[0],
        height: e.video.height,
        width: e.video.width,
      };
      embed.author = {
        name: e.author.username,
        icon_url: e.src.data.author.avatar_thumb.url_list[0],
        proxy_icon_url: e.src.data.author.avatar_thumb.url_list[0],
      };
      embed.video = {
        url: e.video.url,
        proxy_url: e.video.url,
        height: e.video.height,
        width: e.video.width,
      };
      embed.footer.text = e.src.data.desc;
      embed.type = "video";
      embed.color = "0x8334eb";
      logger.log(e.src.data.desc);
      updateMessage(message);
      //return Promise.resolve();
    })
    .catch((e) => {
      logger.error(e);
    });
  /*embed.thumbnail.url = `https://tiktxk.com/meta/${req.data.id}/image`;
  embed.thumbnail.proxyURL = `https://tiktxk.com/meta/${req.data.id}/image`;

  embed.video.url = `https://tiktxk.com/meta/${req.data.id}/video`;
  embed.video.proxyURL = `https://tiktxk.com/meta/${req.data.id}/video`;
*/
  // Convert discords existing embeds to sendable ones. Prevents existing embeds from breaking
  //message.embeds = message.embeds.map((embed: rawDiscordEmbed) => cleanupEmbed(embed));
  message.embeds.push(embed);
  updateMessage(message);
  return Promise.resolve();
}
