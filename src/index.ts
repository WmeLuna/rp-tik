/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/require-await */
import { Injector, Logger, settings } from "replugged";
import { removeEmbed, updateMessage } from "./utils";
import { provider } from "./assets/provider";
import { footer } from "./assets/footer";
import { author } from "./assets/author";

const inject = new Injector();
const logger = Logger.plugin("RP-Tik");

interface Settings {
  hideTags?: boolean;
}

const defaultSettings: Partial<Settings> = {
  hideTags: false,
};

export { Settings } from "./Settings";

export const cfg = await settings.init<Settings, keyof typeof defaultSettings>(
  "com.wmeluna.RP-Tik",
  defaultSettings,
);

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
    url: message.content.match(TT_DETECTION)[0],
    footer: {
      text: null,
    },
  };
  let api = new URL(message.content.match(TT_DETECTION)[0]);
  api.hostname = "tiktxk.wmeluna.workers.dev";
  fetch(api)
    .then((e) => e.json())
    .then((e) => {
      embed.thumbnail = {
        url: e.src.data.video.dynamic_cover.url_list[0],
        proxy_url: e.src.data.video.dynamic_cover.url_list[0],
        height: e.video.height,
        width: e.video.width,
      };
      embed.author = {
        name: author(e),
        icon_url: e.src.data.author.avatar_thumb.url_list[0],
        proxy_icon_url: e.src.data.author.avatar_thumb.url_list[0],
      };
      embed.video = {
        url: e.video.url,
        proxy_url: e.video.url,
        height: e.video.height,
        width: e.video.width,
      };
      embed.footer.text = footer(e);
      if (e.imagePost) {
        embed.thumbnail = {};
        embed.video = {};
        embed.footer.text = footer(e);
      }
      embed.type = "video";
      embed.color = "0x8334eb";
      updateMessage(message);
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
