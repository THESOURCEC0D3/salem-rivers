import { church, whatsappLink } from "../content/church";
import { WhatsAppIcon } from "./icons";

/**
 * Persistent, site-wide "reach a human" channel (architecture doc §2).
 * Fixed, above the fold of every page, clear of the bottom safe area.
 */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(
        `Hello ${church.name}! I have a question about visiting.`,
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-whatsapp px-4 py-3 text-white shadow-lg transition-[background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-whatsapp-hover hover:shadow-xl focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-whatsapp"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <WhatsAppIcon size={24} />
      <span className="hidden text-sm font-semibold sm:inline">
        Message us
      </span>
    </a>
  );
}
