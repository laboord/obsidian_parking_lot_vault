<%*
// Temporary Templater file path.
const tempFilePath = tp.file.path(true);

// ========== User Input ==========
// Ask if use existing folder or create a new folder
const useExistingFolder = await tp.system.prompt('Do you want to use an existing folder [y|n]?', 'y');
if (!useExistingFolder) {
	new Notice('Creation cancelled - folder path missing.');
	return;
}

// Get the folder path
let selectedFolder = null;
if (useExistingFolder.toLowerCase() === 'y') {
	const allFolders = tp.app.vault.getAllFolders();
	const folders = [
		...new Set(
			allFolders.map(f => f.path)
		)
	].sort();
	selectedFolder = await tp.system.suggester((folder) => folder, folders);
	// Ask if user wants to add a subfolder
	const addSubfolder = await tp.system.prompt('Add a subfolder to this path? [y|n]', 'n');
	if (!addSubfolder) {
		new Notice('Creation cancelled - folder path missing.');
		return;
	}
	
	if (addSubfolder.toLowerCase() === 'y') {
		const subfolder = await tp.system.prompt('Enter a subfolder name (e.g., Accounting)', '');
		if (!subfolder) {
			new Notice('Creation cancelled - folder path missing.');
			return;
		}
		selectedFolder = `${selectedFolder}/${subfolder}`;
	}
} else {
	selectedFolder = await tp.system.prompt('Enter a folder path relative to the vault root (e.g., Parking Lot/Work/Accounting)', 'Parking Lot/');
}
if (!selectedFolder) {
	new Notice('Creation cancelled - folder path missing.');
	return;
}

// Get the file name
const fileName = await tp.system.prompt('Enter file name (e.g., Excel)', null);
if (!fileName) {
	new Notice('Creation cancelled - file name missing.');
	return;
}

// ========== File Creation ==========
// Check if the folder exists, if not, create it
const folderExists = tp.app.vault.getFolderByPath(selectedFolder);
if (!folderExists) {
	await tp.app.vault.createFolder(selectedFolder);
}

// Get the template file
const templateFile = tp.file.find_tfile('_templates/parking_lot/parking_lot_file_template.md');

// Check if the file exists, if not, create it
const fileExists = tp.app.vault.getAbstractFileByPath(`${selectedFolder}/${fileName}$.md`);
if (!fileExists) {
	await tp.file.create_new(templateFile, fileName, false, selectedFolder);
}

// Open the file
const newFile = await fileExists;
if (newFile) {
	await tp.app.workspace.getLeaf(true).openFile(newFile);
}

// Delete the temporary Templater file.
setTimeout(async () => {
	  const tempFile = tp.app.vault.getAbstractFileByPath(tempFilePath);
	  if (tempFile) {
		    await tp.app.vault.delete(tempFile);
	  }
}, 500);
%>