---
ext_links:
  - "[Templater Documentation](https://silentvoid13.github.io/Templater/)"
---

# `$= dv.current().file.folder.split('/').pop() + ' / ' + dv.current().file.name`

```meta-bind-button
label: Back to Resources Dashboard
icon: forward
style: primary
tooltip: Back to Resources Dashboard
actions:
  - type: open
    link: Resources/Dashboard|Dashboard
```

## External Links

```dataviewjs
const container = this.container;
const extLinks = dv.current().ext_links;
if (extLinks && extLinks != '[]()' && extLinks != '') {
	await dv.view('_utilities/resources', { container: container, extLinks: extLinks });
} else {
	dv.paragraph('No external links added yet.');
}
```
