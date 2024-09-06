// 搜索功能：根据用户输入实时过滤平台
function filterPlatforms() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const platforms = document.querySelectorAll('.platform');

    platforms.forEach(platform => {
        const platformName = platform.getAttribute('data-name').toLowerCase();
        if (platformName.includes(searchInput)) {
            platform.style.display = 'block';
        } else {
            platform.style.display = 'none';
        }
    });
}

// 排序功能：根据用户选择的排序条件对平台进行排序
function sortPlatforms() {
    const sortValue = document.getElementById('sort').value;
    const platformsContainer = document.getElementById('platforms');
    const platforms = Array.from(document.querySelectorAll('.platform'));

    let sortedPlatforms = [];

    if (sortValue === 'name') {
        sortedPlatforms = platforms.sort((a, b) => {
            const nameA = a.getAttribute('data-name').toLowerCase();
            const nameB = b.getAttribute('data-name').toLowerCase();
            return nameA.localeCompare(nameB);
        });
    } else if (sortValue === 'free') {
        sortedPlatforms = platforms.sort((a, b) => {
            const freeA = a.getAttribute('data-free') === 'true';
            const freeB = b.getAttribute('data-free') === 'true';
            return freeB - freeA;
        });
    }

    // 重新排列 DOM 中的元素
    platformsContainer.innerHTML = '';
    sortedPlatforms.forEach(platform => platformsContainer.appendChild(platform));
}
