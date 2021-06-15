
export function convertToCSV(data, header) {
  const localHeader = header || Object.keys(data);
  let csvString = [];

  if (typeof localHeader[0] === 'object') {
    csvString = [localHeader.map(header => header.text).join(';')];
  } else {
    csvString = [localHeader.join(';')];
  }

  csvString = csvString.concat(
    data.map(obj => {
      let values = [];
      for (const prop of localHeader) {
        values = values.concat(obj[prop.value || prop]);
      }

      return values.join(';');
    })
  );

  return csvString.join('\n');
}

export function getQueryStringValueByName(param, url, replaceSpaces) {
  if (!url) {
    url = decodeURI(window.location.href);
  }

  param = param.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  var match = url.match('[?&]' + param + '=([^&]*)');
  return match ? (replaceSpaces ? match[1].replace('+', ' ') : match[1]) : null;
}