/* eslint-disable @typescript-eslint/no-empty-object-type */
import type messages from "@/i18n/messages/en.json";

type Messages = typeof messages;

declare global {
  interface IntlMessages extends Messages {}
}
