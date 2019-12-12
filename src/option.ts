function getCommandListTextArea(): HTMLTextAreaElement {
  return <HTMLTextAreaElement>document.getElementById("command-list");
}

function save_options() {
  const t = getCommandListTextArea();
  chrome.storage.sync.set(
    {
      commandList: JSON.parse(t.value)
    },
    function() {
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function() {
        status.textContent = "";
      }, 750);
    }
  );
}

function restore_options() {
  chrome.storage.sync.get(
    {
      commandList: []
    },
    function(items) {
      const t = getCommandListTextArea();
      t.value = JSON.stringify(items.commandList);
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
