# `$= dv.current().file.folder.split('/').pop() + ' / ' + dv.current().file.name`

```meta-bind-button
label: New plugin resource
icon: file-plus
style: primary
tooltip: Add a new plugin resource
actions:
  - type: templaterCreateNote
    templateFile: '_templates/resources/plugins_template.md'
    folderPath: 'Resources/Plugins'
    fileName: 'New Plugin Resource'
    openNote: true
```

## Obsidian & Obsidian Plugins

```dataview
table without ID
	link( file.name, firstvalue(reverse(split(file.folder, "/"))) + " / " + file.name ) as File,
	ext_links as Links
from "Resources/Plugins" or "Resources/Obsidian"
where ext_links
sort file.folder
```
