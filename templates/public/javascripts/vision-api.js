window.addEventListener('load', () => {
  document.getElementById('vision-form-file-input').onchange = function(e) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('preview').setAttribute('src', e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const btn = document.getElementById('vision-form-submit');

  btn.addEventListener('click', evt => {
    const file = document.getElementById('vision-form-file-input');
    if (!file.files[0]) {
      alert('ファイルを選択してください');
      return;
    }

    btn.disabled = true;
    const type = document.getElementById('type-select').value;

    document.getElementById('vision-form-submit-text').style.display = 'none';
    document.getElementById('vision-form-submit-loading').style.display =
      'block';

    const body = new FormData();
    body.append('file', file.files[0]);
    const xhr = new XMLHttpRequest();
    xhr.open('post', `cloud-vision/detection?type=${type}`);
    xhr.responseType = 'json';
    xhr.send(body);

    xhr.onload = () => {
      const responseObj = xhr.response;
      const table = document.getElementById('vision-result-table-body');

      while (table.lastChild) {
        table.removeChild(table.lastChild);
      }

      if (
        type === 'LABEL_DETECTION' ||
        type === 'LANDMARK_DETECTION' ||
        type === 'LOGO_DETECTION'
      ) {
        responseObj.responses.forEach(response => {
          if (!Object.keys(response).length) {
            alert('該当する結果がありませんでした');
            return;
          }

          response[Object.keys(response)[0]].forEach((result, i) => {
            const tr = document.createElement('tr');

            const th = document.createElement('th');
            th.scope = 'row';
            th.innerHTML = i + 1;
            tr.appendChild(th);

            const description = document.createElement('td');
            description.innerHTML = result.description;
            tr.appendChild(description);

            const score = document.createElement('td');
            score.innerHTML = `${Math.floor(result.score * 10000) / 100}%`;
            tr.appendChild(score);

            table.appendChild(tr);
          });
        });
      }

      const divJson = document.getElementById('vision-json');
      divJson.textContent = '';
      divJson.insertAdjacentText(
        'afterbegin',
        JSON.stringify(responseObj, null, 2),
      );

      document.getElementById('vision-form-submit-text').style.display =
        'inline';
      document.getElementById('vision-form-submit-loading').style.display =
        'none';
      btn.disabled = false;
    };
  });
});
