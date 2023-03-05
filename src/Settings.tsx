import { cfg } from ".";
import { common, components, util } from "replugged";
const { React } = common;
const { SwitchItem } = components;

export function Settings(): React.ReactElement {
  return (
    <div>
      <SwitchItem {...util.useSetting(cfg, "hideTags")}>Hide Hashtags</SwitchItem>
    </div>
  );
}
