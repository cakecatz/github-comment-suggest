import { optionsStorage } from "./options-storage";

function getCommandListTextArea(): HTMLTextAreaElement {
  return <HTMLTextAreaElement>document.getElementById("suggest-list");
}

async function saveOptions() {
  const t = getCommandListTextArea();
  await optionsStorage.set({
    commandList: t.value
  });

  const status = document.getElementById("status");
  status.textContent = "Options saved.";
  setTimeout(function() {
    status.textContent = "";
  }, 750);
}

async function restoreOptions() {
  const options = await optionsStorage.getAll();
  const t = getCommandListTextArea();
  t.value = options.commandList;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
