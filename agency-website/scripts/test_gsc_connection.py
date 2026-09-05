import os, json
from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY_PATH = os.path.join(os.path.dirname(__file__), '..', 'gsc-credentials.json')

def test_connection():
    if not os.path.exists(KEY_PATH):
        print(f"Error: {KEY_PATH} not found.")
        return

    scopes = ['https://www.googleapis.com/auth/webmasters.readonly']
    credentials = service_account.Credentials.from_service_account_file(KEY_PATH, scopes=scopes)
    service = build('searchconsole', 'v1', credentials=credentials)

    try:
        sites = service.sites().list().execute()
        print("Successfully authenticated with Google Search Console!")
        print("Available Properties in GSC:")
        entries = sites.get('siteEntry', [])
        if not entries:
            print("No verified sites found yet. Make sure to add the service account email as a User in Search Console Settings -> Users and permissions.")
        for site in entries:
            print(f"- {site['siteUrl']} (Permission: {site['permissionLevel']})")
    except Exception as e:
        print(f"Connection check result: {e}")

if __name__ == '__main__':
    test_connection()
