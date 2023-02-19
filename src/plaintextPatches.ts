import { types } from "replugged";

const patches: types.PlaintextPatch[] = [
  {
    replacements: [
      {
        // Message Indicator
        match: /var .,.,.=(.)\.className,.=.\.message,.=.\.children,.=.\.content,.=.\.onUpdate/,
        replace:
          "try {if($1?.message.content.match(window.rptik?.TT_DETECTION)){window.rptik?.receiver($1?.message)}} catch (e) {};$&",
      },
    ],
  },
];

export default patches;
