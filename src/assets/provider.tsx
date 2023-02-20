import { common, components } from "replugged";
const { React } = common;
const { Tooltip } = components;

export function provider() {
  return (
    <Tooltip text="RP-Tik">
      <svg
        viewBox={"0 0 16 18.653"}
        fill="var(--text-normal)"
        width="16"
        height="16"
        style={{ marginBottom: -3 }}>
        <path d="M11.646 0c.308 2.647 1.785 4.225 4.354 4.393V7.37c-1.489.146-2.793-.341-4.309-1.259v5.568c0 7.074-7.712 9.284-10.812 4.214-1.992-3.263-.772-8.988 5.619-9.217v3.14a9.142 9.142 0 0 0-1.483.364c-1.421.481-2.227 1.382-2.003 2.972.431 3.044 6.016 3.945 5.552-2.003V.006h3.084z" />
      </svg>
      <span> RP-Tik</span>
    </Tooltip>
  );
}
