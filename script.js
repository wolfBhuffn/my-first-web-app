document.addEventListener('DOMContentLoaded', () => {
    const changeTextBtn = document.getElementById('changeTextBtn');
    const dynamicParagraph = document.getElementById('dynamicParagraph'); 

    let clickCount = 0; 

    changeTextBtn.addEventListener('click', () => {
        clickCount++; 
        if (clickCount === 1) {
            dynamicParagraph.textContent = 'Youclicked the button for the first time! Good job!';
        } else if (clickCount === 2) {
            dynamicParagraph.textContent = 'Clicked again! This is dynamic content in action.'
        } else {
            dynamicParagraph.textContent = `You've clicked ${clickCount} times! Keep goning!`;
        }
    });
    console.log('Script loaded and running!');
});