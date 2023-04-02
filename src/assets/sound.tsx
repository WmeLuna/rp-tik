import { common, webpack } from "replugged";
const { React } = common;
const classes: any = webpack.getBySource("embedAuthor");

export function SoundInfo(props: any) {
  const { data } = props;
  console.log(data);
  return (
    <>
      <div className={`RP-Tik-Sound ${classes.embedAuthor} ${classes.embedMargin}`}>
        <span className={classes.embedAuthorName}>{data.title}</span>
        <img alt="" className={classes.embedAuthorIcon} src={data.cover_thumb.url_list[0]}></img>
      </div>
    </>
  );
}
