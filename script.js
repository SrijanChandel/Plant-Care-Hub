const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const menuToggle = $('.menu-toggle');
const nav = $('.main-nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
$$('.main-nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

const selections = {light: 'low', time: 'little'};
$$('.choice').forEach(button => button.addEventListener('click', () => {
  const group = button.dataset.group;
  selections[group] = button.dataset.value;
  $$(`.choice[data-group="${group}"]`).forEach(b => b.classList.toggle('selected', b === button));
}));

const plants = {
  low: {
    little: {name:'Snake Plant', image:'snake-image', tag:'A GREAT PLACE TO START', description:'Architectural leaves, an easygoing nature, and no need to water on a strict schedule.', facts:['◐ Low to bright indirect light','⌁ Let soil dry between watering']},
    some: {name:'ZZ Plant', image:'zz-image', tag:'A STEADY COMPANION', description:'Glossy green leaves and a patient pace make this a good plant to get to know.', facts:['◐ Low to indirect light','⌁ Let soil dry well between watering']}
  },
  medium: {
    little: {name:'Golden Pothos', image:'pothos-image', tag:'A FLEXIBLE FAVOURITE', description:'A trailing plant with cheerful leaves. Check the soil before watering and give it room to grow.', facts:['☼ Bright, indirect light','⌁ Water when the top soil dries']},
    some: {name:'Golden Pothos', image:'pothos-image', tag:'A FUN PLANT TO LEARN', description:'Watch its trailing vines grow and learn how light and watering affect new leaves.', facts:['☼ Bright, indirect light','⌁ Check soil moisture regularly']}
  },
  high: {
    little: {name:'Snake Plant', image:'snake-image', tag:'A LOW-FUSS OPTION', description:'A resilient-looking favourite. Keep it out of harsh, sudden sun and avoid soggy soil.', facts:['☼ Bright indirect light; acclimatize gradually','⌁ Let soil dry between watering']},
    some: {name:'Golden Pothos', image:'pothos-image', tag:'A LEAFY PROJECT', description:'Bright indirect light can support attractive growth. Avoid harsh direct sun that may scorch leaves.', facts:['☼ Bright, indirect light','⌁ Water after checking the soil']}
  }
};
$('#find-match').addEventListener('click', () => {
  const plant = plants[selections.light][selections.time];
  $('#result-name').textContent = plant.name;
  $('#result-image').className = `result-plant-image ${plant.image}`;
  $('#result-image').setAttribute('aria-label', plant.name);
  $('.match-tag').textContent = plant.tag;
  $('#result-description').textContent = plant.description;
  $('.result-meta').innerHTML = plant.facts.map(f => `<span>${f.replaceAll('&','&amp;').replaceAll('<','&lt;')}</span>`).join('');
  $('#finder-result').scrollIntoView({behavior:'smooth', block:'nearest'});
});

const advice = {
  yellow: {
    title:'Yellowing leaves: check the conditions first.',
    body:'Possible causes include soil staying too wet, inconsistent watering, low light, or normal ageing of an older leaf. Check soil moisture and drainage before changing your routine. One yellow leaf alone does not confirm a specific problem.'
  },
  droop: {
    title:'Drooping: check soil moisture before watering.',
    body:'Both very dry soil and waterlogged roots can cause drooping. Feel the soil, check that the pot drains freely, and consider whether the plant was recently moved or exposed to heat. Avoid adding water until you have checked.'
  },
  brown: {
    title:'Brown tips: look for patterns.',
    body:'Dry air, irregular watering, fertilizer or mineral buildup, and direct sun can contribute to brown tips. Check light exposure, watering habits, and drainage. Trim damaged tips only if you wish; the underlying cause matters more.'
  }
};
$$('.symptom').forEach(button => button.addEventListener('click', () => {
  const item = advice[button.dataset.symptom];
  $('#diagnosis-answer').innerHTML = `<strong>${item.title}</strong><p>${item.body}</p>`;
}));

const toast = $('#toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}
$$('.save-plant').forEach(button => button.addEventListener('click', () => {
  const saved = button.classList.toggle('saved');
  button.textContent = saved ? '♥' : '♡';
  button.setAttribute('aria-pressed', String(saved));
  showToast(saved ? `${button.dataset.plant} added to your favourites` : `${button.dataset.plant} removed from your favourites`);
}));

const tasks = $$('.task input');
function updateProgress() {
  const done = tasks.filter(t => t.checked).length;
  const percent = Math.round(done / tasks.length * 100);
  $('#progress-label').textContent = `${done} of ${tasks.length} complete`;
  $('#progress-percent').textContent = `${percent}%`;
  $('#progress-bar').style.width = `${percent}%`;
}
tasks.forEach(task => task.addEventListener('change', updateProgress));
$('#reset-tasks').addEventListener('click', () => {
  tasks.forEach(task => { task.checked = false; });
  updateProgress();
  showToast('Your checklist is ready for a fresh check-in.');
});

$$('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});
