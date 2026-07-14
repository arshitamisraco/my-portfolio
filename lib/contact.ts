/**
 * Single source of truth for the contact page + form.
 *
 * ── Where messages go ────────────────────────────────────────
 * The direct-email link and the form both reach CONTACT_EMAIL below.
 *
 * ── To turn the form on ──────────────────────────────────────
 * The form posts to Web3Forms (no backend, no npm install). Get a free
 * access key — it takes about a minute and needs no account:
 *
 *   1. Go to https://web3forms.com
 *   2. Enter arshitamisraco@gmail.com as the destination address
 *   3. Web3Forms emails you an access key (a UUID)
 *   4. Paste it into WEB3FORMS_ACCESS_KEY below, replacing the placeholder
 *
 * The access key is meant to be public — it only lets people SEND to your
 * inbox, never read it — so it is safe to commit and ship in client code.
 *
 * Until a real key is set, the /contact page still works: the "email me
 * directly" mailto link is always live, and the form shows a short notice
 * instead of a broken submit.
 */

/** Destination inbox for the direct-email link and form submissions. */
export const CONTACT_EMAIL = "arshitamisraco@gmail.com";

/** Public Web3Forms access key. Replace the placeholder — see notes above. */
export const WEB3FORMS_ACCESS_KEY: string = "c9cf6ca1-fbbe-4f8f-b774-846c676e934a";

/** True once a real Web3Forms key has been pasted in above. */
export const CONTACT_FORM_ENABLED =
  WEB3FORMS_ACCESS_KEY.length > 0 &&
  WEB3FORMS_ACCESS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY";
