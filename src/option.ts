import { optionsStorage } from "./options-storage";

function getCommandListTextArea(): HTMLTextAreaElement {
  return <HTMLTextAreaElement>document.getElementById("suggest-list");
}

function validateJSON(option: string): boolean {
  let parsedData;
  try {
    parsedData = JSON.parse(option);
  } catch {
    return false;
  }

  return Array.isArray(parsedData);
}

function showStatusMessage(message: string) {
  const status = document.getElementById("status");
  status.textContent = message;
  setTimeout(function() {
    status.textContent = "";
  }, 2000);
}

async function saveOptions() {
  const t = getCommandListTextArea();

  if (validateJSON(t.value) === false) {
    showStatusMessage("JSON Parse error");
    return;
  }

  await optionsStorage.set({
    commandList: t.value
  });

  showStatusMessage("Options saved");
}

async function restoreOptions() {
  const options = await optionsStorage.getAll();
  const t = getCommandListTextArea();
  t.value = options.commandList;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
