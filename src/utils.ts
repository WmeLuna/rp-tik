/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-undefined */

import { common } from "replugged";

export function cleanupEmbed(embed: rawDiscordEmbed): DiscordEmbed {
  /* backported code from MLV2 rewrite */
  // @ts-expect-error Already Cleaned
  if (!embed.id) return embed;
  // @ts-expect-error Empty Array
  const retEmbed: DiscordEmbed = {};
  if (typeof embed.rawTitle === "string") retEmbed.title = embed.rawTitle;
  if (typeof embed.rawDescription === "string") retEmbed.description = embed.rawDescription;
  if (typeof embed.referenceId !== "undefined") retEmbed.reference_id = embed.referenceId;
  if (typeof embed.color === "string") retEmbed.color = embed.color;
  if (typeof embed.type !== "undefined") retEmbed.type = embed.type;
  if (typeof embed.url !== "undefined") retEmbed.url = embed.url;
  if (typeof embed.provider === "object")
    retEmbed.provider = { name: embed.provider.name, url: embed.provider.url };
  if (typeof embed.footer === "object")
    retEmbed.footer = {
      text: embed.footer.text,
      icon_url: embed.footer.iconURL,
      proxy_icon_url: embed.footer.iconProxyURL,
    };
  if (typeof embed.author === "object")
    retEmbed.author = {
      name: embed.author.name,
      url: embed.author.url,
      icon_url: embed.author.iconURL,
      proxy_icon_url: embed.author.iconProxyURL,
    };
  if (typeof embed.timestamp === "object" && embed.timestamp._isAMomentObject)
    retEmbed.timestamp = embed.timestamp.milliseconds();
  if (typeof embed.thumbnail === "object") {
    if (
      typeof embed.thumbnail.proxyURL === "string" ||
      (typeof embed.thumbnail.url === "string" && !embed.thumbnail.url.endsWith("?format=jpeg"))
    ) {
      retEmbed.thumbnail = {
        url: embed.thumbnail.url,
        proxy_url:
          typeof embed.thumbnail.proxyURL === "string"
            ? embed.thumbnail.proxyURL.split("?format")[0]
            : undefined,
        width: embed.thumbnail.width,
        height: embed.thumbnail.height,
      };
    }
  }
  if (typeof embed.image === "object") {
    retEmbed.image = {
      url: embed.image.url,
      proxy_url: embed.image.proxyURL,
      width: embed.image.width,
      height: embed.image.height,
    };
  }
  if (typeof embed.video === "object") {
    retEmbed.video = {
      url: embed.video.url,
      proxy_url: embed.video.proxyURL,
      width: embed.video.width,
      height: embed.video.height,
    };
  }
  if (Array.isArray(embed.fields) && embed.fields.length) {
    // @ts-expect-error ???
    retEmbed.fields = embed.fields.map((e) => ({
      name: e.rawName,
      value: e.rawValue,
      inline: e.inline,
    }));
  }
  return retEmbed;
}

export function updateMessage(message: unknown): void {
  common.fluxDispatcher.dispatch({
    type: "MESSAGE_UPDATE",
    message,
  });
}

export function removeEmbed(message: DiscordMessage): void {
  for (let embed in message.embeds) {
    if (message.embeds[embed]?.provider?.name?.includes("TikTok")) {
      message.embeds.splice(embed, 1);
    }
  }
  updateMessage(message);
}
