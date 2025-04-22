import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";

const DEFAULT_SETTINGS = {
  roundedCorners: false,
};

const storedSettings = browser && localStorage.getItem("settings");

export const settings: Writable<{ [key: string]: string | boolean }> = writable(
  Object.assign({}, DEFAULT_SETTINGS, JSON.parse(storedSettings || "[]")),
);

export function resetSettings() {
  settings.set(DEFAULT_SETTINGS);
}

settings.subscribe((value) => {
  if (browser) {
    return (localStorage.settings = JSON.stringify(value));
  }
});
