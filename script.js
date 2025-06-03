function handleClick(action) {
  const responseElement = document.getElementById('response');
  
  if (action === 'buy') {
    // 添加动画效果
    responseElement.style.opacity = '0';
    responseElement.textContent = '快上号！';
    // 触发重绘以实现淡入效果
    setTimeout(() => responseElement.style.opacity = '1', 50);
  } else {
    responseElement.textContent = '😭';
    responseElement.style.opacity = '1';
  }
}


// 添加躲避鼠标功能
const runButton = document.getElementById('runButton');
let isHovering = false;

// 眼睛跟随鼠标功能
document.addEventListener('mousemove', (e) => {
  const eyes = document.querySelectorAll('.eye');
  eyes.forEach(eye => {
    const eyeRect = eye.getBoundingClientRect();
    const eyeX = eyeRect.left + eyeRect.width/2;
    const eyeY = eyeRect.top + eyeRect.height/2;
    
    const deltaX = e.clientX - eyeX;
    const deltaY = e.clientY - eyeY;
    const angle = Math.atan2(deltaY, deltaX);
    
    // 控制眼球移动范围
    const maxDistance = 4;
    const moveX = Math.cos(angle) * maxDistance;
    const moveY = Math.sin(angle) * maxDistance;
    
    eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});


document.addEventListener('mousemove', (e) => {
  if (!isHovering) return;
  
  const buttonRect = runButton.getBoundingClientRect();
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  
  // 计算安全距离
  const safeDistance = 100;
  const newX = mouseX < window.innerWidth/2 ? 
    buttonRect.left + safeDistance : 
    buttonRect.left - safeDistance;
  
  const newY = mouseY < window.innerHeight/2 ? 
    buttonRect.top + safeDistance : 
    buttonRect.top - safeDistance;

  // 应用新位置
  runButton.style.left = `${newX}px`;
  runButton.style.top = `${newY}px`;
});

runButton.addEventListener('mouseenter', () => isHovering = true);
runButton.addEventListener('mouseleave', () => isHovering = false);