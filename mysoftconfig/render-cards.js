document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('page-title').textContent = configData.title;
    document.getElementById('page-subtitle').textContent = configData.subtitle;

    const contentArea = document.getElementById('content-area');
    
    // 合并所有分类的软件项目
    configData.categories.forEach(category => {
        category.items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'software-card';
            
            // 卡片头部
            const header = document.createElement('div');
            header.className = 'card-header';
            
            // 标题区域
            const titleArea = document.createElement('div');
            titleArea.className = 'card-title';
            
            const icon = document.createElement('span');
            icon.textContent = category.icon;
            icon.style.fontSize = '1.5em';
            
            const title = document.createElement('h3');
            title.textContent = item.name;
            
            titleArea.appendChild(icon);
            titleArea.appendChild(title);
            
            // 版本号徽章
            if (item.version) {
                const versionBadge = document.createElement('span');
                versionBadge.className = 'version-badge';
                versionBadge.textContent = `v${item.version}`;
                titleArea.appendChild(versionBadge);
            }
            
            // 标签区域
            const tagsArea = document.createElement('div');
            tagsArea.className = 'card-tags';
            
            // 使用tags字段，如果没有则回退到settings的前3个
            const displayTags = item.tags || (item.settings ? item.settings.slice(0, 3) : []);
            displayTags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag.length > 20 ? tag.substring(0, 20) + '...' : tag;
                tagsArea.appendChild(tagElement);
            });
            
            // 最后修改日期
            const lastModified = document.createElement('span');
            lastModified.className = 'last-modified';
            if (item.lastModified) {
                lastModified.textContent = `📅 ${item.lastModified}`;
                lastModified.title = '最后修改时间';
            }
            
            // 展开图标
            const expandIcon = document.createElement('span');
            expandIcon.className = 'expand-icon';
            expandIcon.textContent = '▼';
            
            header.appendChild(titleArea);
            header.appendChild(tagsArea);
            if (item.lastModified) {
                header.appendChild(lastModified);
            }
            header.appendChild(expandIcon);
            
            // 详细内容区域
            const details = document.createElement('div');
            details.className = 'card-details';
            
            const description = document.createElement('p');
            description.className = 'card-description';
            description.textContent = item.description;
            details.appendChild(description);
            
            if (item.settings && item.settings.length > 0) {
                const settingsList = document.createElement('ul');
                settingsList.className = 'settings-list';
                item.settings.forEach(setting => {
                    const listItem = document.createElement('li');
                    listItem.textContent = setting;
                    settingsList.appendChild(listItem);
                });
                details.appendChild(settingsList);
            }
            
            card.appendChild(header);
            card.appendChild(details);
            
            // 点击展开/收起
            card.addEventListener('click', () => {
                card.classList.toggle('expanded');
            });
            
            contentArea.appendChild(card);
        });
    });
});