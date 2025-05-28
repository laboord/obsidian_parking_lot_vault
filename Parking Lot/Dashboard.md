# `$= dv.current().file.folder.split('/').pop() + ' / ' + dv.current().file.name`

```meta-bind-button
label: New parking lot page
icon: file-plus
style: primary
tooltip: Add a new parking lot page
actions:
  - type: templaterCreateNote
    templateFile: '_templates/parking_lot/create_parking_lot_file.md'
```

## Pages

```dataviewjs
const folders = ['Parking Lot/Personal', 'Parking Lot/Work'];

const pages = dv.pages('"Parking Lot/Personal" or "Parking Lot/Work"');
const grouped = {};
pages.forEach(page => {
	const folder = page.file.folder;
	if (!grouped[folder]) grouped[folder] = [];
	grouped[folder].push(page);
})

for (let folder of Object.keys(grouped).sort()) {
	const folderList = folder.split('/');
	folderList.shift();
	dv.header(3, folderList.join(' / '));
	dv.list(grouped[folder].map(p => dv.fileLink(`${folder}/${p.file.name}`, false, p.file.name)));
}
```

## Tasks

> [!tasks-by-tag]+ By Tag
> 
> ```tasks
> not done
> folder includes {{ query.file.folder }}
> filter by function task.description.length > 0
> 
> group by function \
> 	const tags = task.file.tags; \
> 	return tags.length > 0 ? task.file.tags.map((tag) => tag.split('/')[0]) : 'No Tag'
> 
> group by function \
> 	const tags = task.file.tags; \
> 	return tags.length > 0 ? task.file.tags.map((tag) => tag.split('/').length > 1 ? tag.split('/')[1] : '') : ''
> 
> sort by due date reverse, priority
> ```

> [!tasks-by-file]+ By File
> 
> ```tasks
> not done
> folder includes {{ query.file.folder }}
> filter by function task.description.length > 0
> group by function `[[${task.file.pathWithoutExtension}]]`
> sort by due date reverse, priority
> ```

> [!done]- Completed
> 
> ```tasks
> done
> folder includes {{ query.file.folder }}
> ```