/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/require-await */
import { Injector, Logger } from "replugged";
import { removeEmbed, updateMessage } from "./utils";
import { provider } from "./assets/provider";
const inject = new Injector();
const logger = Logger.plugin("RP-Tik");

const TT_DETECTION = new RegExp(
  /\bhttps?:\/\/(?:m|www|vm)\.tiktok\.com\/(?:.*\/)?(?:(?:v|embed|video|t)\/|\?shareId=|&item_id=)?(\d+|\w+)\b/gm,
);

export async function start(): Promise<void> {
  // @ts-expect-error adding to window
  window.rptik = {
    receiver,
    TT_DETECTION,
  };
}

async function receiver(message: DiscordMessage): Promise<void> {
  //logger.log(message);
  await buildEmbed(message);
}
export function stop(): void {
  inject.uninjectAll();
}
export async function buildEmbed(message: DiscordMessage): Promise<void> {
  if (message.embeds.length == 1) {
    if (message.embeds[0]?.provider?.name?.includes?.("TikTok")) {
      removeEmbed(message);
    } else {
      return Promise.resolve();
    }
  }

  let embed = {
    type: "rich",
    provider: {
      name: provider(),
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
      //logger.log(e);
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
      if (e.imagePost) {
        // @ts-expect-error its string
        embed.footer.text = `⚠️ Slide Shows are not fully implemented!\n${String(e.src.data.desc)}`;
      }
      embed.type = "video";
      embed.color = "0x8334eb";
      //logger.log(e.src.data.desc);
      updateMessage(message);
      //return Promise.resolve();
    })
    .catch((e) => {
      logger.error(e);
      embed.description = `Error!`;
      updateMessage(message);
    });

  message.embeds.push(embed);
  updateMessage(message);
  return Promise.resolve();
}
