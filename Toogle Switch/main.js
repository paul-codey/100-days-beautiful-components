document.addEventListener('DOMContentLoaded', () => {
  feather.replace();
  setupToggleSwitch();
});

function setupToggleSwitch() {
  const toggleButton = document.getElementById('toggle-button');
  const toggleCircle = document.getElementById('toggle-circle');
  const modeText = document.getElementById('mode-text');
  let enabled = false;

  toggleButton.addEventListener('click', () => {
    enabled = !enabled;

    // Update toggle appearance
    if (enabled) {
      toggleButton.classList.remove('bg-gray-300');
      toggleButton.classList.add('bg-blue-600');

      toggleCircle.classList.remove('translate-x-1');
      toggleCircle.classList.add('translate-x-11');

      // Change icon to moon
      toggleCircle.innerHTML = '<i data-feather="moon" class="text-blue-600" width="16" height="16"></i>';

      // Update mode text
      modeText.textContent = 'Dark Mode';
      
    } else {
      toggleButton.classList.remove('bg-blue-600');
      toggleButton.classList.add('bg-gray-300');

      toggleCircle.classList.remove('translate-x-11');
      toggleCircle.classList.add('translate-x-1');

      // Change icon to sun
      toggleCircle.innerHTML = '<i data-feather="sun" class="text-yellow-500" width="16" height="16"></i>';

      // Update mode text
      modeText.textContent = 'Light Mode';
    }

    feather.replace();
  });
}
