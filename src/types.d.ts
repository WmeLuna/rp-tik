/* eslint-disable @typescript-eslint/naming-convention */
/* taken from https://github.com/SammCheese/invisible-chat/blob/NewReplugged/src/invisiblechat.d.ts */

interface DiscordMedia {
  url: string;
  proxy_url?: string;
  height?: number;
  width?: number;
}

interface rawDiscordMedia extends Omit<DiscordMedia, "proxy_url"> {
  proxyURL: string;
}

interface DiscordEmbed {
  title: string;
  reference_id?: string;
  type: "rich" | "image" | "video" | "gifv" | "article" | "link";
  description?: string;
  url?: string;
  timestamp?: ISO8601;
  color?: string | number;
  footer?: {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
  };
  image?: DiscordMedia;
  thumbnail?: DiscordMedia;
  video?: DiscordMedia;
  provider?: {
    name?: string;
    url?: string;
  };
  author?: {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
  };
  fields?: [
    {
      name: string;
      value: string;
      inline?: boolean;
    },
  ];
}

interface rawDiscordEmbed {
  id: number;
  type: "rich" | "image" | "video" | "gifv" | "article" | "link";
  rawTitle: string;
  rawDescription: string;
  referenceId: string;
  url?: string;
  color?: string | number;
  timestamp: ISO8601;
  image?: rawDiscordMedia;
  thumbnail?: rawDiscordMedia;
  video?: rawDiscordMedia;
  footer?: {
    text: string;
    iconURL?: string;
    iconProxyURL?: string;
  };
  author?: {
    name: string;
    url?: string;
    iconURL?: string;
    iconProxyURL: string;
  };
  provider?: {
    name?: string;
    url?: string;
  };
  fields?: [
    {
      rawName: string;
      rawValue: string;
      inline?: boolean;
    },
  ];
}

interface ISO8601 {
  milliseconds: () => ISO8601;
  _isAMomentObject: boolean;
}

interface DiscordMessage {
  channel: object;
  content: string;
  embeds: Arrays<DiscordEmbed>;
}

interface ImageProps {
  alt?: string;
  className?: string;
  height?: number;
  imageClassName?: string;
  limitResponsiveWidth?: unknown;
  mediaLayoutType?: "MOSAIC" | "STATIC";
  minHeight?: number;
  minWidth?: number;
  original?: string;
  src?: string;
  readyState?: "ERROR" | "LOADING" | "READY";
  renderItem?: unknown;
  tabIndex?: number;
  useFullWidth?: boolean;
  width?: number;
  zoomable?: boolean;
  onBlur?(e: React.FocusEvent): void;
  onClick?(e: React.MouseEvent): void;
  onContextMenu?(e: React.MouseEvent): void;
  onFocus?(e: React.FocusEvent): void;
  onMouseEnter?(e: React.MouseEvent): void;
}
