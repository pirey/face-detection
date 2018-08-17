// credentials from https://cameria.herokuapp.com/
// {app_id:"18cac37a",app_key:"b6cd34e621dd6c06efde7e5a82419d68"}
export const APP_ID = '82fcd8fd'
export const APP_KEY = 'ffe68b916e42ac50cda93e9e6bcbbd6d'
export const GALLERY_NAME = 'phunsukhwangdu'

export function enroll ({ image, subjectId }) {
  return fetch('https://api.kairos.com/enroll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      app_id: APP_ID,
      app_key: APP_KEY
    },
    body: JSON.stringify({
      image,
      subject_id: subjectId,
      gallery_name: GALLERY_NAME
    })
  }).then(response => response.json())
}

export function recognize ({ image }) {
  return fetch('https://api.kairos.com/recognize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      app_id: APP_ID,
      app_key: APP_KEY
    },
    body: JSON.stringify({
      image,
      gallery_name: GALLERY_NAME
    })
  }).then(response => response.json())
}
