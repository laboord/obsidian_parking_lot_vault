function createExternalLinksList({container, extLinks}) {
    let unorderedList = document.createElement('ul');
    unorderedList.className = 'has-list-bullet';
    
    let i = 0;
    extLinks.forEach(mdLink => {
        let linkText = '';
        let linkUrl = '';
    
        const linkTextMatch = mdLink.match(/\[(.+)\]/);
        if (linkTextMatch) {
            linkText = linkTextMatch[1];
        }
    
        const linkUrlMatch = mdLink.match(/\((.+)\)/);
        if (linkUrlMatch) {
            linkUrl = linkUrlMatch[1];
        }
    
        let listItem = document.createElement('li');
        listItem.setAttribute('data-line', `${i}`);
        listItem.setAttribute('dir', 'auto');
    
        let span = document.createElement('span')
        span.className = 'list-bullet';
    
        let link = document.createElement('a');
        link.setAttribute('data-tooltip-position', 'top');
        link.ariaLabel = linkUrl;
        link.rel = 'noopener nofollow';
        link.className = 'external-link';
        link.href = linkUrl;
        link.target = '_blank';
        link.textContent = linkText;
    
        listItem.appendChild(span);
        listItem.appendChild(link);
        unorderedList.appendChild(listItem);
    });
    
    let div = document.createElement('div');
    div.className = 'el-ul';
    div.appendChild(unorderedList);
    
    container.appendChild(div);
}

createExternalLinksList(input);
