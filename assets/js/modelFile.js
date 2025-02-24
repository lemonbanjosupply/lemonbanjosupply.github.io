document.addEventListener('DOMContentLoaded', () => {
  const handSelect = document.getElementById('RightLeftSelect');
  const typeSelect = document.getElementById('banjoTypeSelect');
  const scaleSelect = document.getElementById('scaleSelect');
  const headstockSelect = document.getElementById('hsShapeSelect');

  handSelect.addEventListener('change', updateModel);
  typeSelect.addEventListener('change', updateModel);
  scaleSelect.addEventListener('change', updateModel);
  headstockSelect.addEventListener('change', updateModel);

  updateModel();

  function updateModel() {
    const hand = handSelect.value;
    const type = typeSelect.value;
	const scale = scaleSelect.value;
	const headstock = headstockSelect.value;

    const src = `assets/3DModels/${hand}/${type}/${scale}/${headstock}.glb`;

    const viewer = document.getElementById('viewer');
    viewer.setAttribute('src', src);
  }
});