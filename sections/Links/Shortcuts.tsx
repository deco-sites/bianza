import Icon from "$store/components/ui/Icon.tsx";
import { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface Shortcut {
  label?: string;
  icon?: AvailableIcons;
  link?: string;
}

export interface Props {
  shortcuts?: Array<Shortcut>;
  onHover?: "Show label" | "Show tooltip";
}

export default function Shortcuts({
  shortcuts = [
    {
      label: "WhatsApp",
      icon: "WhatsApp",
      link: "/",
    },
    {
      label: "Chat",
      icon: "Message",
      link: "/",
    },
    {
      label: "Measurements",
      icon: "Ruler",
      link: "/",
    },
    {
      label: "Shipping",
      icon: "Truck",
      link: "/",
    },
    {
      label: "Returns",
      icon: "ArrowsPointingOut",
      link: "/",
    },
    {
      label: "Medidas",
      icon: "Hanger",
      link: "/",
    },
    {
      label: "Entrega",
      icon: "Clock",
      link: "/",
    },
  ],
  onHover = "Show label",
}: Props) {
  return (
    <div class="group relative flex flex-row translate-x-full float-right top-1/2 right-0 z-20 justify-center mt-9">
      {shortcuts?.map((shortcut) => {
        return (
          <a
            href={shortcut.link}
            target="_blank"
            class={`flex items-center h-10 bg-base-100 text-base-content border-solid border-2 border-black hover:bg-base-content hover:text-base-100  mt-[-2px] w-[200px] ${
              onHover === "Show tooltip" && "tooltip tooltip-left"
            }`}
            data-tip={shortcut.label}
          >
            <div class="w-10 flex justify-center">
              {shortcut.icon && <Icon id={shortcut.icon} size={24} />}
            </div>
            {(!onHover || onHover === "Show label") && (
              <div class="flex-none lg:group max-w-[200px] lg:group w-auto lg:group pr-2 duration-200">
                {shortcut.label}
              </div>
            )}
          </a>
        );
      })}
    </div>
  );
} 
