/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "azul": "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-marinho": "bg-[#000080] ring-[#000080]",
  "verde": "bg-[#00a71f] ring-[#000080]",
  "branco": "bg-[#fffff] ring-[#00000]",
  "rose": "bg-[#ffcbdb] ring-[#ffcbdb]",
  "cinza": "bg-[#808080] ring-[#808080]",
  "cinza-escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "laranja": "bg-[#FFA500] ring-[#FFA500]",
  "marrom": "bg-[#964b00] ring-[#964b00]",
  "preto": "bg-[#000000] ring-[#000000]",
  "verde-clara": "bg-[#90EE90] ring-[#90EE90]",
  "vermelho": "bg-[#FF0000] ring-[#FF0000]",
  "amarelo": "bg-[#ffff00] ring-[#ffff00]",

  // Color variants - only applied when no color as content is passed
  "active": "text-base-content ring-1 ring-black rounded-full",
  "disabled": "line-through text-neutral-content rounded-full",
  "default": "text-base-content bg-base-100 rounded-full",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active: "text-base-content ring-1 ring-black rounded-full",
  disabled: "line-through text-neutral-content rounded-full",
  default: "text-base-content bg-base-100 rounded-full",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div class="avatar placeholder text-sm font-light h-6">
      <div
        class={`${
          colors[content] ?? colors[variant]
        } border-[1px] border-black`}
      >
        <span class="uppercase ">
          {colors[content] ? "" : content.substring(0, 2)}
        </span>
      </div>
    </div>
  );
}

export default Avatar;
