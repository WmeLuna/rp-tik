import { common } from "replugged";
const { React } = common;

export function author(e) {
  return (
    <div className="tik-author">
      <span>{e.src.data.author.nickname}</span>
      <span>@{e.author.username}</span>
    </div>
  );
}
