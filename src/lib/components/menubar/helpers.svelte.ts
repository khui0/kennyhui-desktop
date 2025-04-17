import { menubar } from "$lib/meta.svelte";

export function deactivateMenubar(): void {
  document.querySelector("[data-menubar-active]")?.removeAttribute("data-menubar-active");
  menubar.active = false;
  menubar.activeId = "";
}

export function activateMenubar(id: string): void {
  document.querySelector("[data-menubar]")?.setAttribute("data-menubar-active", "");
  menubar.active = true;
  menubar.activeId = id;
}
