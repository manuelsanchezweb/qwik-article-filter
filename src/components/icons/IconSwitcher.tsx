import { IconQwik, IconReact, IconVue } from "./Icons";

import { component$ } from "@builder.io/qwik";

export const IconSwitcher = component$(
  ({ icon, classIcon }: { icon: string; classIcon?: string }) => {
    function renderIcon(icon: string) {
      switch (icon) {
        case "react":
          return <IconReact classIcon={classIcon} />;
        case "vue":
          return <IconVue classIcon={classIcon} />;
        case "qwik":
          return <IconQwik classIcon={classIcon} />;

        default:
          return <IconReact classIcon={classIcon} />;
      }
    }

    return renderIcon(icon);
  }
);
