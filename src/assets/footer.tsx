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

export function footer(e: any) {
  return (
    <>
      <div className="images">
        <Slideshow images={e.imagePost.images}></Slideshow>
      </div>
      <span>{e.src.data.desc}</span>
    </>
  );
}
