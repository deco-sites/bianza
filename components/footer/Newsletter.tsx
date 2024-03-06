import { invoke } from "$store/runtime.ts";
import { clx } from "$store/sdk/clx.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={clx(
        "flex flex-col gap-4",
        tiled && "lg:flex-row lg:w-full lg:justify-between",
      )}
    >
      <div class="flex flex-col gap-4 text-black">
        {content?.title && (
          <h4 class={tiled ? "text-2xl lg:text-3xl" : "text-md text-[#1c1b1f]"}>
            {content?.title}
          </h4>
        )}
        {content?.description && <div>{content?.description}</div>}
      </div> 
      <div class="flex flex-col gap-4">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap gap-3">
            <input
              name="email"
              class="flex-auto md:flex-none input md:w-80 text-base-content border-transparent border-b-stone-950 rounded-none bg-[#f4f4f4]"
              placeholder={content?.form?.placeholder || "Digite seu email"}
            />
            <button
              type="submit"
              class="btn disabled:loading bg-black text-[#fff]"
              disabled={loading}
            >
              {content?.form?.buttonText || "Inscrever"}
            </button>
          </div>
        </form> 
        {content?.form?.helpText && (
          <div
            class="text-[11px] text-black"
            dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
          />
        )}
      </div>
    </div>
  );
}

export default Newsletter;
