import { cfg } from "..";
import { common, components, webpack } from "replugged";
const { React } = common;
const { ErrorBoundary } = components;
import "./slideshow.css";
import { SoundInfo } from "./sound";
const DiscordImage = (
  await webpack.waitForModule<Record<string, (props?: ImageProps) => JSX.Element>>(
    webpack.filters.bySource("().imagePlaceholderOverlay"),
  )
).Z;
function Slideshow(props: any) {
  const imageList = props.images;
  const images = imageList.map((image: any) => (
    <DiscordImage src={image.url} useFullWidth={true} width={200}></DiscordImage>
  ));
  return images;
}
function intToString(num: number) {
  //@ts-ignore
  num = num.toString().replace(/[^0-9.]/g, "");
  if (num < 1000) {
    return num;
  }
  let si = [
    { v: 1e3, s: "K" },
    { v: 1e6, s: "M" },
    { v: 1e9, s: "B" },
    { v: 1e12, s: "T" },
    { v: 1e15, s: "P" },
    { v: 1e18, s: "E" },
  ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
    if (num >= si[index].v) {
      break;
    }
  }
  return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}

function Description(props: any) {
  const tagsGone = cfg.get("hideTags");
  const { data } = props;
  if (tagsGone) {
    data.src.data.desc = data.src.data.original_client_text.markup_text
      .replaceAll(/<h id="\d+">#\w+<\/h>/gm, "")
      .replaceAll(/<rc>.+<\/rc>/gm, "")
      .replaceAll(/<m.+<\/m>/gm, "");
  }
  return (
    <>
      <div className="stats">
        <span className="likes">❤️{intToString(data.statistics.likes)}</span>
        <span className="comments">💬{intToString(data.statistics.comments)}</span>
      </div>
      <span>{data.src.data.desc}</span>
      <SoundInfo data={data.src.data.music}></SoundInfo>
    </>
  );
}

export function footer(e: any) {
  if (e.imagePost) {
    return (
      <ErrorBoundary>
        <div className="images">
          <Slideshow images={e.imagePost.images}></Slideshow>
        </div>
        <Description data={e}></Description>
      </ErrorBoundary>
    );
  }
  return (
    <>
      <Description data={e}></Description>
    </>
  );
}
