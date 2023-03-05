import { common } from "replugged";
const { React } = common;
import "./slideshow.css";

function Slideshow(props: any) {
  const imageList = props.images;
  console.log(imageList);
  const images = imageList.map((image: any) => <img src={image.url}></img>);
  console.log(images);
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
  const { data } = props;
  return (
    <>
      <div className="stats">
        <span className="likes">❤️{intToString(data.statistics.likes)}</span>
        <span className="comments">💬{intToString(data.statistics.comments)}</span>
      </div>
      <span>{data.src.data.desc}</span>
    </>
  );
}

export function footer(e: any) {
  if (e.imagePost) {
    return (
      <>
        <div className="images">
          <Slideshow images={e.imagePost.images}></Slideshow>
        </div>
        <Description data={e}></Description>
      </>
    );
  }
  return (
    <>
      <Description data={e}></Description>
    </>
  );
}
