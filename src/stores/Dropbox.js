import JSO from '../../bower_components/jso/build/jso'

const clientId = process.env.DROPBOX_CLIENT_ID

export function authorize () {
  let redirectUrl = window.location.origin + (window.location.path || '')
  let dropboxAuthorizer = new JSO({
    providerID: 'dropbox',
    client_id: clientId,
    redirect_uri: redirectUrl,
    authorization: 'https://www.dropbox.com/1/oauth2/authorize'
  })

  return dropboxAuthorizer.getToken()
}

export function get () { }
export function set (val) { }
