const policyLinks = document.querySelectorAll('.policy-toc a');

function updateCurrentTopic() {
  for (const link of policyLinks) {
    if (link.hash === window.location.hash) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  }
}

window.addEventListener('hashchange', updateCurrentTopic);
updateCurrentTopic();
