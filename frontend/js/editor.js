// flex2html DEMO 頁的 JSON
let currentCard = {
    "type": "bubble",
    "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
            {
                "type": "text",
                "text": "Hello, World!",
                "weight": "bold",
                "size": "xl"
            }
        ]
    }
};

// 新增元件
function addComponent(type) {
    const component = createComponent(type);
    currentCard.body.contents.push(component);
    updatePreview();
}

// 建立元件
function createComponent(type) {
    switch (type) {
        case 'box':
            return {
                type: 'box',
                layout: 'vertical',
                contents: []
            };
        case 'text':
            return {
                type: 'text',
                text: '新文字',
                size: 'md'
            };
        case 'image':
            return {
                type: 'image',
                url: 'https://example.com/image.jpg',
                size: 'full'
            };
        case 'button':
            return {
                type: 'button',
                action: {
                    type: 'uri',
                    label: '按鈕',
                    uri: 'https://example.com'
                }
            };
        default:
            return null;
    }
}

// 會員卡片欄位對應
function fillFormFromCard(card) {
    try {
        document.getElementById('mainImage').value = (card.body.contents[0] && card.body.contents[0].url) || '';
        document.getElementById('mainTitle').value = (card.body.contents[3] && card.body.contents[3].text) || '';
        document.getElementById('subTitle').value = (card.body.contents[4] && card.body.contents[4].contents && card.body.contents[4].contents[0] && card.body.contents[4].contents[0].text) || '';
        document.getElementById('avatar').value = (card.body.contents[6] && card.body.contents[6].contents && card.body.contents[6].contents[0] && card.body.contents[6].contents[0].contents && card.body.contents[6].contents[0].contents[0] && card.body.contents[6].contents[0].contents[0].url) || '';
        document.getElementById('avatarLink').value = (card.body.contents[6] && card.body.contents[6].contents && card.body.contents[6].contents[0] && card.body.contents[6].contents[0].action && card.body.contents[6].contents[0].action.uri) || '';
        document.getElementById('buttonText').value = (card.body.contents[7] && card.body.contents[7].contents && card.body.contents[7].contents[0] && card.body.contents[7].contents[0].action && card.body.contents[7].contents[0].action.label) || '';
        document.getElementById('buttonUrl').value = (card.body.contents[7] && card.body.contents[7].contents && card.body.contents[7].contents[0] && card.body.contents[7].contents[0].action && card.body.contents[7].contents[0].action.uri) || '';
        document.getElementById('textColor').value = (card.body.contents[3] && card.body.contents[3].color) ? card.body.contents[3].color : '#000000';
        document.getElementById('displayName').value = (card.body.contents[6] && card.body.contents[6].contents && card.body.contents[6].contents[1] && card.body.contents[6].contents[1].contents && card.body.contents[6].contents[1].contents[0] && card.body.contents[6].contents[1].contents[0].text) || '';
        document.getElementById('memberId').value = (card.body.contents[2] && card.body.contents[2].contents && card.body.contents[2].contents[0] && card.body.contents[2].contents[0].contents && card.body.contents[2].contents[0].contents[1] && card.body.contents[2].contents[0].contents[1].text) || '';
    } catch (e) {
        alert('初始卡片資料格式有誤，請檢查 JSON 結構');
    }
}

function updateCardFromForm() {
    try {
        if (!currentCard.body.contents[0]) currentCard.body.contents[0] = {};
        currentCard.body.contents[0].url = document.getElementById('mainImage').value;
        if (!currentCard.body.contents[3]) currentCard.body.contents[3] = {};
        currentCard.body.contents[3].text = document.getElementById('mainTitle').value;
        currentCard.body.contents[3].color = document.getElementById('textColor').value;
        if (!currentCard.body.contents[4]) currentCard.body.contents[4] = {contents:[{}]};
        if (!currentCard.body.contents[4].contents) currentCard.body.contents[4].contents = [{}];
        if (!currentCard.body.contents[4].contents[0]) currentCard.body.contents[4].contents[0] = {};
        currentCard.body.contents[4].contents[0].text = document.getElementById('subTitle').value;
        currentCard.body.contents[4].contents[0].color = document.getElementById('textColor').value;
        if (!currentCard.body.contents[6]) currentCard.body.contents[6] = {contents:[{contents:[{}],action:{}}]};
        if (!currentCard.body.contents[6].contents) currentCard.body.contents[6].contents = [{contents:[{}],action:{}}];
        if (!currentCard.body.contents[6].contents[0]) currentCard.body.contents[6].contents[0] = {contents:[{}],action:{}};
        if (!currentCard.body.contents[6].contents[0].contents) currentCard.body.contents[6].contents[0].contents = [{}];
        if (!currentCard.body.contents[6].contents[0].contents[0]) currentCard.body.contents[6].contents[0].contents[0] = {};
        currentCard.body.contents[6].contents[0].contents[0].url = document.getElementById('avatar').value;
        if (!currentCard.body.contents[6].contents[0].action) currentCard.body.contents[6].contents[0].action = {};
        currentCard.body.contents[6].contents[0].action.uri = document.getElementById('avatarLink').value;
        if (!currentCard.body.contents[7]) currentCard.body.contents[7] = {contents:[{action:{}}]};
        if (!currentCard.body.contents[7].contents) currentCard.body.contents[7].contents = [{action:{}}];
        if (!currentCard.body.contents[7].contents[0]) currentCard.body.contents[7].contents[0] = {action:{}};
        if (!currentCard.body.contents[7].contents[0].action) currentCard.body.contents[7].contents[0].action = {};
        currentCard.body.contents[7].contents[0].action.label = document.getElementById('buttonText').value;
        currentCard.body.contents[7].contents[0].action.uri = document.getElementById('buttonUrl').value;
        if (!currentCard.body.contents[6].contents[1]) currentCard.body.contents[6].contents[1] = {contents:[{}]};
        if (!currentCard.body.contents[6].contents[1].contents) currentCard.body.contents[6].contents[1].contents = [{}];
        if (!currentCard.body.contents[6].contents[1].contents[0]) currentCard.body.contents[6].contents[1].contents[0] = {};
        currentCard.body.contents[6].contents[1].contents[0].text = document.getElementById('displayName').value;
        if (!currentCard.body.contents[2]) currentCard.body.contents[2] = {contents:[{contents:[{},{}]}]};
        if (!currentCard.body.contents[2].contents) currentCard.body.contents[2].contents = [{contents:[{},{}]}];
        if (!currentCard.body.contents[2].contents[0]) currentCard.body.contents[2].contents[0] = {contents:[{},{}]};
        if (!currentCard.body.contents[2].contents[0].contents) currentCard.body.contents[2].contents[0].contents = [{},{}];
        if (!currentCard.body.contents[2].contents[0].contents[1]) currentCard.body.contents[2].contents[0].contents[1] = {};
        currentCard.body.contents[2].contents[0].contents[1].text = document.getElementById('memberId').value;
    } catch (e) {}
    updatePreview();
}

function bindFormEvents() {
    const ids = ['mainImage','mainTitle','subTitle','avatar','avatarLink','buttonText','buttonUrl','textColor','displayName','memberId'];
    ids.forEach(id => {
        document.getElementById(id).addEventListener('input', updateCardFromForm);
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    fillFormFromCard(currentCard);
    bindFormEvents();
    updatePreview();
});

// 直接貼上/編輯 JSON
function editJsonDirectly() {
    const json = prompt('請貼上 Flex Message JSON：', JSON.stringify(currentCard, null, 2));
    if (json) {
        try {
            currentCard = JSON.parse(json);
            updatePreview();
        } catch (e) {
            alert('JSON 格式錯誤');
        }
    }
}

// 分享到 LINE
function shareToLine() {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
}

// 更新預覽
function updatePreview(retry = 0) {
    // 使用 flex2html 渲染預覽
    if (window.flex2html) {
        try {
            flex2html('flex2html', deepClone(currentCard));
        } catch (e) {
            document.getElementById('flex2html').innerHTML = '<span style="color:red;">flex2html 渲染失敗</span>';
        }
    } else if (retry < 5) {
        setTimeout(() => updatePreview(retry + 1), 300);
        return;
    } else {
        document.getElementById('flex2html').innerHTML = '<span style="color:red;">flex2html 載入失敗</span>';
    }
    // JSON 文字預覽
    const previewElement = document.getElementById('preview');
    previewElement.innerHTML = JSON.stringify(currentCard, null, 2);
    // 顯示 JSON 內容
    const jsonView = document.getElementById('json-view');
    if (jsonView) {
        jsonView.textContent = JSON.stringify(currentCard, null, 2);
    }
}

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// 儲存卡片
async function saveCard() {
    try {
        const response = await fetch('/api/cards/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: currentCard,
                type: 'flex'
            })
        });

        const result = await response.json();
        if (result.success) {
            alert('卡片儲存成功！');
        } else {
            alert('儲存失敗：' + result.message);
        }
    } catch (error) {
        console.error('儲存錯誤：', error);
        alert('儲存時發生錯誤');
    }
}

// 預覽卡片
function previewCard() {
    const previewUrl = `/preview/?data=${encodeURIComponent(JSON.stringify(currentCard))}`;
    window.open(previewUrl, '_blank');
}

function renderFlex2html() {
    console.log('window.flex2html:', window.flex2html);
    if (window.flex2html) {
        try {
            flex2html('flex2html', deepClone(currentCard));
        } catch (e) {
            document.getElementById('flex2html').innerHTML = '<span style="color:red;">flex2html 渲染失敗</span>';
        }
    } else {
        document.getElementById('flex2html').innerHTML = '<span style="color:red;">flex2html 尚未載入</span>';
    }
}

function previewFlex2html() {
    localStorage.setItem('flex2html-preview', JSON.stringify(currentCard));
    window.open('/flex2html-test/preview.html', '_blank');
} 